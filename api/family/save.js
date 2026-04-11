const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID  = process.env.NOTION_DATABASE_ID;

// Correspondance clé localStorage → colonne Notion
const FIELD_MAP = {
  'tn_family_v6':  'Famille',
  'tn_caf_v6':     'CAF',
  'tn_declared_v6':'Budget',
  'cl6':           'Valise Coches',
  'cl6x':          'Valise Perso',
  'cl6h':          'Valise Masques',
  'hm6':           'Maison Coches',
  'hm6x':          'Maison Perso',
  'hm6h':          'Maison Masques',
  'tl6':           'Journal',
  'tn_ov_v6':      'Overrides',
};

// Notion rich_text : max 2000 chars/bloc, max 100 blocs → 200 000 chars max
function toRichText(str) {
  if (!str) return [{ type: 'text', text: { content: '' } }];
  const chunks = [];
  for (let i = 0; i < str.length; i += 1900)
    chunks.push({ type: 'text', text: { content: str.slice(i, i + 1900) } });
  return chunks.slice(0, 100); // limite Notion
}

function detectDevice(ua) {
  if (!ua) return 'Inconnu';
  if (/android/i.test(ua))  return 'Android';
  if (/iphone|ipad/i.test(ua)) return 'iOS';
  if (/windows/i.test(ua))  return 'Windows';
  if (/mac/i.test(ua))      return 'Mac';
  return 'Autre';
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code, familyName, data, syncVersion = 0 } = req.body;
  if (!code || code.length < 4) return res.status(400).json({ error: 'Code famille invalide' });

  const ua       = req.headers['user-agent'] || '';
  const appareil = detectDevice(ua);
  const syncAt   = new Date().toISOString();
  const newVersion = (syncVersion || 0) + 1;

  // Construire les propriétés Notion avec une colonne par groupe
  const properties = {
    'Code Famille': { title: [{ type: 'text', text: { content: code.toUpperCase() } }] },
    'Nom Famille':  { rich_text: toRichText((familyName || '').slice(0, 200)) },
    'Sync Version': { number: newVersion },
    'Sync Appareil':{ rich_text: toRichText(appareil) },
    'Sync At':      { rich_text: toRichText(syncAt) },
  };

  // Remplir chaque colonne séparément depuis data
  for (const [localKey, notionField] of Object.entries(FIELD_MAP)) {
    const val = data?.[localKey];
    properties[notionField] = { rich_text: toRichText(val || '') };
  }

  try {
    // Chercher d'abord si la famille existe déjà (évite les doublons de race condition)
    let pageId = req.body.pageId || null;

    if (!pageId) {
      const searchR = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: { property: 'Code Famille', title: { equals: code.toUpperCase() } },
          page_size: 1,
        }),
      });
      const searchData = await searchR.json();
      if (searchData.results?.length > 0) {
        pageId = searchData.results[0].id;
      }
    }

    let r;
    if (pageId) {
      // Mise à jour — PATCH
      r = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      });
    } else {
      // Création — POST
      r = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parent: { database_id: DATABASE_ID }, properties }),
      });
    }

    if (!r.ok) {
      const err = await r.json();
      return res.status(500).json({ error: 'Notion error', details: err });
    }

    const result = await r.json();
    return res.json({
      ok: true,
      pageId: result.id,
      syncVersion: newVersion,
      syncAt,
      syncAppareil: appareil,
    });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
