const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID  = process.env.NOTION_DATABASE_ID;

function chunkRichText(str) {
  const chunks = [];
  for (let i = 0; i < str.length; i += 1900)
    chunks.push({ type: 'text', text: { content: str.slice(i, i + 1900) } });
  return chunks.length ? chunks : [{ type: 'text', text: { content: '' } }];
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code, familyName, pageId, data } = req.body;
  if (!code || code.length < 4) return res.status(400).json({ error: 'Code famille invalide' });

  const jsonStr    = JSON.stringify(data || {});
  const properties = {
    'Code Famille': { title: [{ type: 'text', text: { content: code.toUpperCase() } }] },
    'Nom Famille':  { rich_text: [{ type: 'text', text: { content: (familyName || '').slice(0, 200) } }] },
    'Données':      { rich_text: chunkRichText(jsonStr) },
  };

  try {
    let r;
    if (pageId) {
      // Mise à jour de la page existante
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
      // Création d'une nouvelle entrée
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
    return res.json({ ok: true, pageId: result.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
