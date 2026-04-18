const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID  = process.env.NOTION_DATABASE_ID;

// Correspondance colonne Notion → clé localStorage
const FIELD_MAP = {
  'Famille':        'tn_family_v6',
  'CAF':            'tn_caf_v6',
  'Budget':         'tn_declared_v6',
  'Valise Coches':  'cl6',
  'Valise Perso':   'cl6x',
  'Valise Masques': 'cl6h',
  'Maison Coches':  'hm6',
  'Maison Perso':   'hm6x',
  'Maison Masques': 'hm6h',
  'Journal':        'tl6',
  'Overrides':      'tn_ov_v6',
};

function readRichText(prop) {
  if (!prop?.rich_text) return null;
  const raw = prop.rich_text.map(t => t.plain_text).join('');
  return raw || null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { code } = req.query;
  if (!code || code.length < 4) return res.status(400).json({ error: 'Code famille invalide' });

  try {
    const versionOnly = req.query.versionOnly === '1';

    const r = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: { property: 'Code Famille', title: { equals: code.toUpperCase() } },
        sorts:  [{ timestamp: 'last_edited_time', direction: 'descending' }],
        page_size: 1,
      }),
    });

    if (!r.ok) {
      const err = await r.json();
      return res.status(500).json({ error: 'Notion error', details: err });
    }

    const notionData = await r.json();
    if (notionData.results.length === 0) return res.json({ found: false });

    const page  = notionData.results[0];
    const props = page.properties;
    const syncVersion  = props['Sync Version']?.number   ?? 0;
    const syncAt       = readRichText(props['Sync At'])   ?? null;
    const syncAppareil = readRichText(props['Sync Appareil']) ?? null;
    const nomFamille   = readRichText(props['Nom Famille'])   ?? null;

    // Mode versionOnly : retourner seulement les métadonnées (léger, pour le focus check)
    if (versionOnly) {
      return res.json({ found: true, pageId: page.id, syncVersion, syncAt, syncAppareil, nomFamille });
    }

    // Lire chaque groupe séparément
    const data = {};
    for (const [notionField, localKey] of Object.entries(FIELD_MAP)) {
      const val = readRichText(props[notionField]);
      // Retourner null explicitement si vide (permet au client d'effacer le local)
      data[localKey] = val ?? null;
    }

    return res.json({
      found:         true,
      pageId:        page.id,
      data,
      syncVersion,
      syncAt,
      syncAppareil,
      nomFamille,
    });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
