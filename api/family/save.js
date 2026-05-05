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

  // ⚠️ PROTECTION SERVEUR : ne jamais écraser une colonne existante non-vide
  // avec du vide. Si le client envoie un payload partiel (clé manquante ou
  // chaîne vide), on conserve la valeur déjà stockée dans Notion.
  // Cela évite la perte de données même si le client a un bug temporaire.

  // Pour appliquer cette règle, on doit d'abord lire l'état actuel de la page
  // si elle existe. La logique de recherche/upsert est plus bas, on la prépare ici.
  let existingPageId = req.body.pageId || null;
  let existingProps  = null;

  try {
    if (!existingPageId) {
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
        existingPageId = searchData.results[0].id;
        existingProps  = searchData.results[0].properties;
      }
    } else {
      // pageId connu → récupérer les props pour vérifier
      const fetchR = await fetch(`https://api.notion.com/v1/pages/${existingPageId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
        },
      });
      if (fetchR.ok) {
        const pageData = await fetchR.json();
        existingProps  = pageData.properties;
      }
    }
  } catch (e) {
    // Best-effort : si le pré-fetch échoue, on continue mais sans la protection
    // (le client garde le filet local de toute façon)
    existingProps = null;
  }

  // Helper : renvoie true si la colonne Notion existante a du contenu utile
  function existingNonEmpty(notionField) {
    if (!existingProps) return false;
    const prop = existingProps[notionField];
    if (!prop?.rich_text) return false;
    const text = prop.rich_text.map(t => t.plain_text || '').join('');
    return text.length > 0;
  }

  // Remplir chaque colonne séparément depuis data, avec protection
  const skippedColumns = [];
  for (const [localKey, notionField] of Object.entries(FIELD_MAP)) {
    const incoming = data?.[localKey];
    const incomingHasContent = incoming != null && String(incoming).length > 0;

    if (incomingHasContent) {
      // Cas normal : on a du contenu → on écrit
      properties[notionField] = { rich_text: toRichText(String(incoming)) };
    } else if (existingNonEmpty(notionField)) {
      // ⚠️ PROTECTION : Notion a du contenu mais le client n'en envoie pas
      //               → ne pas inclure cette propriété dans le PATCH
      //               → la valeur Notion existante est préservée
      skippedColumns.push({ field: notionField, key: localKey, reason: 'client_empty_cloud_has_data' });
    } else {
      // Les deux sont vides → écrire vide est sans risque
      properties[notionField] = { rich_text: toRichText('') };
    }
  }

  try {
    let pageId = existingPageId;

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
      protected: skippedColumns,         // colonnes préservées par la protection serveur
      protectedCount: skippedColumns.length,
    });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
