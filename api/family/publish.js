const NOTION_TOKEN = process.env.NOTION_TOKEN;

// IDs des 4 bases de données de visualisation
const DB = {
  VALISE:  '418887c5800f4e8487b4312baa5296aa',
  MAISON:  'f0d7cad4e9434a94be1d3fa5fdd60599',
  JOURNAL: 'fd4164c5f1894bdeafb6453383207d63',
  CAF:     'b5db87d6b7f04b7d91988a8a83f535ca',
};

const HEADERS = {
  'Authorization': `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
};

const rt = (str) => str
  ? [{ type:'text', text:{ content: String(str).slice(0,2000) } }]
  : [{ type:'text', text:{ content:'' } }];

const PRIO_MAP = { high:'haute', medium:'moyen', low:'optionnel' };
const TYPE_MAP = { feed:'Repas', diaper:'Change', sleep:'Sommeil' };

// ── Supprimer toutes les lignes d'une famille dans une base ──
async function clearFamily(dbId, familyCode) {
  const r = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method:'POST', headers:HEADERS,
    body: JSON.stringify({
      filter: { property:'Famille', rich_text:{ equals: familyCode } },
      page_size: 100,
    }),
  });
  const data = await r.json();
  const pages = data.results || [];
  await Promise.allSettled(
    pages.map(p =>
      fetch(`https://api.notion.com/v1/pages/${p.id}`, {
        method:'PATCH', headers:HEADERS,
        body: JSON.stringify({ archived: true }),
      })
    )
  );
}

// ── Créer une page dans une base ──
async function createPage(dbId, properties) {
  return fetch('https://api.notion.com/v1/pages', {
    method:'POST', headers:HEADERS,
    body: JSON.stringify({ parent:{ database_id: dbId }, properties }),
  });
}

// ── Écrire les articles Valise ou Maison ──
async function writeArticles(dbId, articles, familyCode) {
  await clearFamily(dbId, familyCode);
  const BATCH = 5;
  for (let i = 0; i < articles.length; i += BATCH) {
    await Promise.allSettled(
      articles.slice(i, i + BATCH).map(a => createPage(dbId, {
        'Nom':        { title: rt(a.nom) },
        'Famille':    { rich_text: rt(familyCode) },
        'Catégorie':  { rich_text: rt(a.categorie) },
        'Article ID': { rich_text: rt(a.id) },
        'Coché':      { checkbox: !!a.coche },
        'Masqué':     { checkbox: !!a.masque },
        'Priorité':   { select: { name: PRIO_MAP[a.priorite] || 'moyen' } },
        'Prix':       { number: typeof a.prix === 'number' ? a.prix : null },
        'Quantité':   { number: typeof a.qte === 'number' ? a.qte : null },
        'Stock':      { number: typeof a.stock === 'number' ? a.stock : null },
        'Magasin':    { rich_text: rt(a.magasin || '') },
        'Description':{ rich_text: rt(a.desc || '') },
      }))
    );
    if (i + BATCH < articles.length) await new Promise(r => setTimeout(r, 400));
  }
}

// ── Écrire le journal (30 derniers jours) ──
async function writeJournal(entries, familyCode) {
  await clearFamily(DB.JOURNAL, familyCode);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const recent = entries.filter(e => new Date(e.date) >= cutoff).slice(0, 200);
  const BATCH = 5;
  for (let i = 0; i < recent.length; i += BATCH) {
    await Promise.allSettled(
      recent.slice(i, i + BATCH).map(e => createPage(DB.JOURNAL, {
        'Titre':       { title: rt(`${e.baby} — ${TYPE_MAP[e.type]||e.type} — ${e.time}`) },
        'Famille':     { rich_text: rt(familyCode) },
        'Enfant':      { rich_text: rt(e.baby) },
        'Type':        { select: { name: TYPE_MAP[e.type] || e.type } },
        'Sous-type':   { rich_text: rt(e.subtype || '') },
        'Heure':       { rich_text: rt(e.time || '') },
        'Durée (min)': { number: e.duration ? parseInt(e.duration) : null },
        'Notes':       { rich_text: rt(e.notes || '') },
        'date:Date:start': e.date,
        'date:Date:is_datetime': 0,
      }))
    );
    if (i + BATCH < recent.length) await new Promise(r => setTimeout(r, 400));
  }
}

// ── Écrire les aides CAF ──
async function writeCAF(aids, familyCode, budgetDeclare) {
  await clearFamily(DB.CAF, familyCode);
  const totalAids = aids.filter(a=>typeof a.amount==='number').reduce((s,a)=>s+a.amount,0);
  const budgetEffectif = (budgetDeclare||0) + totalAids;
  await Promise.allSettled(
    aids.map(a => createPage(DB.CAF, {
      'Nom':             { title: rt(a.label || a.id) },
      'Famille':         { rich_text: rt(familyCode) },
      'Montant':         { number: typeof a.amount === 'number' ? a.amount : null },
      'Statut':          { select: { name: a.statut || 'À faire' } },
      'Catégorie':       { rich_text: rt(a.cat || '') },
      'Notes':           { rich_text: rt(a.note || '') },
      'Budget déclaré':  { number: budgetDeclare || null },
      'Budget effectif': { number: budgetEffectif || null },
    }))
  );
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code, valise=[], maison=[], journal=[], caf=[], budgetDeclare=null } = req.body;
  if (!code || code.length < 4) return res.status(400).json({ error: 'Code famille invalide' });

  // Réponse immédiate — traitement en arrière-plan
  res.json({ ok: true, status: 'publishing' });

  // Écriture asynchrone (non-bloquante pour le client)
  try {
    await Promise.allSettled([
      writeArticles(DB.VALISE,  valise,  code),
      writeArticles(DB.MAISON,  maison,  code),
      writeJournal(journal, code),
      writeCAF(caf, code, budgetDeclare),
    ]);
  } catch (e) {
    console.error('Publish error:', e.message);
  }
}
