const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID  = process.env.NOTION_DATABASE_ID;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { code } = req.query;
  if (!code || code.length < 4) return res.status(400).json({ error: 'Code famille invalide' });

  try {
    const r = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: { property: 'Code Famille', title: { equals: code.toUpperCase() } }
      }),
    });

    if (!r.ok) {
      const err = await r.json();
      return res.status(500).json({ error: 'Notion error', details: err });
    }

    const data = await r.json();
    if (data.results.length === 0) return res.json({ found: false });

    const page    = data.results[0];
    const rawData = (page.properties['Données']?.rich_text || []).map(t => t.plain_text).join('');

    let parsed = {};
    try { parsed = rawData ? JSON.parse(rawData) : {}; } catch {}

    return res.json({ found: true, pageId: page.id, data: parsed });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
