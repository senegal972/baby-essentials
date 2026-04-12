const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID  = process.env.NOTION_DATABASE_ID;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const checks = {
    env_token:    !!NOTION_TOKEN,
    env_database: !!DATABASE_ID,
    notion_reach: false,
    db_readable:  false,
    ts: new Date().toISOString(),
  };

  if (!NOTION_TOKEN || !DATABASE_ID) {
    return res.json({ ok: false, checks, error: 'Variables env manquantes' });
  }

  try {
    // Test 1 : token valide (appel /v1/users/me)
    const userR = await fetch('https://api.notion.com/v1/users/me', {
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
      },
    });
    checks.notion_reach = userR.ok;

    // Test 2 : base Familles accessible
    const dbR = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 1 }),
    });
    checks.db_readable = dbR.ok;
    if (!dbR.ok) {
      const err = await dbR.json();
      checks.db_error = err?.message || String(dbR.status);
    }

    const allOk = Object.values(checks).every(v => v === true || typeof v === 'string');
    return res.json({
      ok: checks.notion_reach && checks.db_readable,
      checks,
    });
  } catch (e) {
    checks.network_error = e.message;
    return res.json({ ok: false, checks, error: e.message });
  }
}
