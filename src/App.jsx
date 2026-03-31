import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --aq:#5BBEC2;--aq-p:#E0F5F6;--aq-l:#A8E0E3;
      --pe:#F09E72;--pe-p:#FFF0E9;
      --sa:#7DAF9E;--sa-p:#E6F4EE;
      --vi:#A98FCC;
      --am:#D49A28;--am-p:#FFF4D8;
      --rd:#D45252;--rd-p:#FFECEC;
      --bl:#5A90C8;--bl-p:#E6F0FA;
      --gr:#2B8A4A;--gr-p:#E2F5EA;
      --pu:#7C5CBF;--pu-p:#EDE7F6;
      --cr:#FDFAF7;--wh:#FFFFFF;
      --g50:#FAF9F7;--g100:#F4F3F1;--g200:#E6E4E1;
      --g300:#CCCAC6;--g400:#9C9994;--g600:#686460;--g800:#2C2A28;
      --sh1:0 2px 8px rgba(0,0,0,.055);--sh2:0 6px 22px rgba(0,0,0,.085);
      --r1:8px;--r2:14px;--r4:30px;
      --ff:'DM Sans',system-ui,sans-serif;--fs:'DM Serif Display',Georgia,serif;
    }
    html{font-size:16px;-webkit-font-smoothing:antialiased}
    body{font-family:var(--ff);background:var(--cr);color:var(--g800);overflow-x:hidden}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--g200);border-radius:99px}
    @keyframes fU{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fI{from{opacity:0}to{opacity:1}}
    @keyframes sU{from{transform:translateY(100%)}to{transform:translateY(0)}}
    @keyframes cP{0%{transform:scale(0)rotate(-12deg);opacity:0}60%{transform:scale(1.15)rotate(2deg)}100%{transform:scale(1)rotate(0)}}
    @keyframes pls{0%,100%{opacity:1}50%{opacity:.45}}
    @keyframes wPls{0%,100%{box-shadow:0 0 0 0 rgba(212,82,82,.28)}50%{box-shadow:0 0 0 5px rgba(212,82,82,0)}}
    .fu{animation:fU .4s cubic-bezier(.22,1,.36,1) forwards}
    .grain::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
      background:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.028'/%3E%3C/svg%3E");opacity:.5}
    .cb{width:22px;height:22px;border-radius:7px;border:2px solid var(--g300);display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;background:var(--wh);cursor:pointer}
    .cb.on{background:var(--aq);border-color:var(--aq);animation:cP .3s cubic-bezier(.22,1,.36,1)}
    .cb svg{opacity:0;transform:scale(0);transition:.16s}.cb.on svg{opacity:1;transform:scale(1)}
    .pt{height:5px;background:var(--g200);border-radius:99px;overflow:hidden}
    .pf{height:100%;border-radius:99px;transition:width .5s cubic-bezier(.22,1,.36,1)}
    .tag{display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:99px;font-size:10px;font-weight:700;letter-spacing:.2px;white-space:nowrap}
    .t-hi{background:var(--rd-p);color:var(--rd)}
    .t-md{background:var(--am-p);color:var(--am)}
    .t-lo{background:var(--sa-p);color:var(--sa)}
    .t-st{background:var(--bl-p);color:var(--bl)}
    .t-ca{background:var(--sa-p);color:#2B6650}
    .t-mi{background:var(--rd-p);color:var(--rd);animation:wPls 2s infinite}
    .t-stk{background:#E2F5EA;color:#2B8A4A}
    .t-stk-p{background:#FFF4D8;color:#A06010}
    .bnav{position:fixed;bottom:0;left:0;right:0;height:68px;z-index:100;background:rgba(253,250,247,.92);backdrop-filter:blur(22px);border-top:1px solid rgba(255,255,255,.6);display:flex;align-items:center;justify-content:space-around;padding:0 2px 4px}
    .nb{display:flex;flex-direction:column;align-items:center;gap:2px;padding:5px 7px;border-radius:var(--r1);border:none;background:none;cursor:pointer;transition:.16s;min-width:42px}
    .nb.on{background:var(--aq-p)}
    .nbl{font-size:8px;font-weight:700;letter-spacing:.4px;color:var(--g400);text-transform:uppercase}
    .nb.on .nbl{color:var(--aq)}
    .inp{width:100%;padding:10px 13px;border-radius:var(--r1);border:1.5px solid var(--g200);font-family:var(--ff);font-size:13.5px;color:var(--g800);background:var(--wh);outline:none;transition:.18s}
    .inp:focus{border-color:var(--aq);box-shadow:0 0 0 3px rgba(91,190,194,.12)}
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:9px 16px;border-radius:var(--r1);border:none;cursor:pointer;font-family:var(--ff);font-size:12.5px;font-weight:600;transition:all .16s}
    .bp{background:var(--aq);color:var(--wh);box-shadow:0 4px 12px rgba(91,190,194,.28)}
    .bp:hover{background:#4AADB1;transform:translateY(-1px)}
    .bs{background:var(--wh);color:var(--g800);border:1.5px solid var(--g200)}
    .bs:hover{border-color:var(--aq);color:var(--aq)}
    .bg{background:transparent;color:var(--g600)}
    .mbd{position:fixed;inset:0;background:rgba(0,0,0,.35);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:flex-end;justify-content:center}
    @media(min-width:640px){.mbd{align-items:center}}
    .msh{background:var(--wh);border-radius:var(--r4) var(--r4) 0 0;padding:24px 20px 38px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto}
    @media(min-width:640px){.msh{border-radius:var(--r4)}}
    .ic{background:var(--wh);border-radius:var(--r2);border:1.5px solid var(--g200);padding:12px 14px;transition:all .18s}
    .ic:hover{border-color:var(--aq-l);box-shadow:var(--sh1)}
    .ic.done{background:var(--g50);opacity:.65}
    .ic.warn{border-color:#EDD060;background:#FFFCEE}
    .ic.stocked{border-color:rgba(43,138,74,.3);background:#F6FBF8}
    .urgent-item{background:var(--wh);border-radius:var(--r1);padding:10px 12px;border:1.5px solid var(--rd-p);display:flex;align-items:center;gap:9px;cursor:pointer;transition:all .18s;text-align:left;width:100%}
    .urgent-item:hover{border-color:var(--rd);box-shadow:var(--sh1);transform:translateY(-1px)}
    .db-wrap{background:rgba(255,255,255,.85);border-radius:var(--r2);border:2px solid rgba(255,255,255,.6);padding:14px 16px;backdrop-filter:blur(8px);transition:all .2s}
    .db-wrap:focus-within{border-color:rgba(255,255,255,.9);box-shadow:0 0 0 3px rgba(255,255,255,.25)}
    .db-input{font-size:28px;font-weight:800;color:var(--g800);border:none;outline:none;background:transparent;font-family:var(--ff);width:100%;padding:2px 0}
    .db-input::placeholder{color:var(--g300);font-size:22px}
    .fam-card{background:rgba(255,255,255,.15);border-radius:var(--r2);border:2px solid rgba(255,255,255,.3);padding:12px 14px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:10px}
    .fam-card:hover{background:rgba(255,255,255,.25);border-color:rgba(255,255,255,.5)}
    .child-chip{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:99px;font-size:10px;font-weight:700;background:rgba(255,255,255,.2);color:var(--wh)}
    .child-tab-btn{padding:6px 14px;border-radius:99px;border:1.5px solid var(--g200);background:var(--wh);color:var(--g600);font-family:var(--ff);font-size:11.5px;font-weight:700;cursor:pointer;transition:.16s;white-space:nowrap;flex-shrink:0}
    .child-tab-btn.on{background:var(--pu-p);border-color:var(--pu);color:var(--pu)}
    .aid-row{background:var(--wh);border-radius:var(--r2);border:1.5px solid var(--g200);padding:12px 14px;box-shadow:var(--sh1);margin-bottom:8px}
    .aid-inp{border:1.5px solid var(--g200);border-radius:var(--r1);padding:6px 10px;font-family:var(--ff);font-size:15px;font-weight:700;color:var(--gr);width:110px;text-align:right;outline:none;background:var(--gr-p);transition:.18s}
    .aid-inp:focus{border-color:var(--gr);box-shadow:0 0 0 2px rgba(43,138,74,.12)}
    .link-btn{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:var(--r1);font-size:10.5px;font-weight:700;color:var(--bl);background:var(--bl-p);border:1px solid rgba(90,144,200,.3);cursor:pointer;font-family:var(--ff);transition:.16s}
    .link-btn:hover{background:var(--bl);color:var(--wh)}
    .export-action{width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:var(--r2);cursor:pointer;font-family:var(--ff);transition:all .18s;border:1.5px solid}
    .export-action:hover{transform:translateY(-1px);box-shadow:var(--sh1)}
    select.inp{appearance:auto}
  `}</style>
);

/* ══════ HELPERS ══════ */
const fmtEur = n => n==null?"—":n.toLocaleString("fr-FR",{minimumFractionDigits:0,maximumFractionDigits:0})+" €";
const fmtDate = s => { if(!s)return""; try{return new Date(s).toLocaleDateString("fr-FR",{day:"2-digit",month:"long",year:"numeric"})}catch{return s} };
const parseAmt = str => { if(str===""||str==null)return null; const n=parseFloat(String(str).replace(",",".")); if(isNaN(n)||n<0||n>9999999)return null; return Math.round(n*100)/100; };
const effQty = (item, nb=1) => {
  const raw = typeof item.qty==="number" && item.qty>0 ? item.qty : 1;
  if (!item.qtyPerBaby || nb<=0) return raw;
  const byBaby = item.qtyPerBaby * nb;
  // Si l'article a été édité manuellement et que qty diverge de qtyPerBaby×nb → qty prime
  if (item._rev && byBaby !== raw) return raw;
  return byBaby;
};
function calcCatTotal(items,nb=1){return items.reduce((s,i)=>{ if(!i||i.isPlaceholder||i.price==null)return s; return s+i.price*effQty(i,nb); },0)}
function calcCatToBuy(items,nb=1){return items.reduce((s,i)=>{ if(!i||i.isPlaceholder||i.price==null)return s; const q=effQty(i,nb); const st=Math.min(typeof i.stock==="number"?i.stock:0,q); return s+i.price*(q-st); },0)}

/* ══════════════════════════════════════════════════════════════
   AUTH & CLOUD SYNC
   3 modes :
   - null      → WelcomeScreen (premier lancement)
   - 'guest'   → localStorage uniquement (éphémère, test)
   - 'account' → localStorage + sync window.storage partagé
                 par code famille (accès multi-appareils)
   ══════════════════════════════════════════════════════════════ */
const SESSION_KEY = 'be_session_v1';
// Toutes les clés à synchroniser vers le cloud
const SYNC_KEYS = [
  'cl6','cl6x','hm6','hm6x','tl6',
  'tn_family_v6','tn_declared_v6','tn_caf_v6',
  'tn_ov_v6','tn_au_v6'
];

function cloudKey(code, key) {
  return `be_${code}_${key}`;
}

function useAuth() {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
    catch { return null; }
  });
  // session = null | { mode:'guest' } | { mode:'account', code, familyName }

  const [loading,    setLoading]    = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle|syncing|synced|error
  const [syncMsg,    setSyncMsg]    = useState('');

  const saveSession = useCallback(sess => {
    setSession(sess);
    if (sess) localStorage.setItem(SESSION_KEY, JSON.stringify(sess));
    else      localStorage.removeItem(SESSION_KEY);
  }, []);

  /* ── Charger les données cloud vers localStorage ── */
  const loadFromCloud = useCallback(async code => {
    if (!window.storage) return;
    for (const key of SYNC_KEYS) {
      try {
        const r = await window.storage.get(cloudKey(code, key), true);
        if (r?.value) localStorage.setItem(key, r.value);
      } catch {}
    }
  }, []);

  /* ── Envoyer localStorage vers le cloud ── */
  const syncToCloud = useCallback(async (code, silent=false) => {
    if (!window.storage || !code) return;
    if (!silent) { setSyncStatus('syncing'); setSyncMsg('Synchronisation…'); }
    try {
      for (const key of SYNC_KEYS) {
        const val = localStorage.getItem(key);
        if (val) await window.storage.set(cloudKey(code, key), val, true);
      }
      setSyncStatus('synced');
      setSyncMsg(`Synchronisé ${new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}`);
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch {
      setSyncStatus('error');
      setSyncMsg('Erreur de synchronisation');
    }
  }, []);

  /* ── Auto-sync toutes les 60s en mode compte ── */
  useEffect(() => {
    if (session?.mode !== 'account') return;
    const t = setInterval(() => syncToCloud(session.code, true), 60000);
    return () => clearInterval(t);
  }, [session, syncToCloud]);

  /* ── Actions publiques ── */
  const loginGuest = useCallback(() => {
    saveSession({ mode: 'guest' });
  }, [saveSession]);

  const loginAccount = useCallback(async (rawCode, familyName) => {
    const code = rawCode.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,16);
    if (code.length < 4) return { ok:false, error:'Le code famille doit contenir au moins 4 caractères (lettres et chiffres).' };
    setLoading(true);
    await loadFromCloud(code);           // charge depuis cloud → localStorage
    const sess = { mode:'account', code, familyName: (familyName||'Ma Famille').trim() };
    saveSession(sess);
    setLoading(false);
    return { ok:true };
  }, [loadFromCloud, saveSession]);

  const logout = useCallback(async () => {
    if (session?.mode === 'account') await syncToCloud(session.code, true);
    saveSession(null);
  }, [session, syncToCloud, saveSession]);

  const manualSync = useCallback(() => {
    if (session?.mode === 'account') syncToCloud(session.code);
  }, [session, syncToCloud]);

  return { session, loading, syncStatus, syncMsg,
           loginGuest, loginAccount, logout, manualSync };
}

/* ══════ WELCOME SCREEN ══════ */
function WelcomeScreen({ auth }) {
  const [code,   setCode]   = useState('');
  const [fname,  setFname]  = useState('');
  const [error,  setError]  = useState('');
  const [loading, setLoading] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => { setTimeout(()=>codeRef.current?.focus(), 400); }, []);

  async function handleLogin() {
    if (code.length < 4) { setError("Le code famille doit contenir au moins 4 caractères."); return; }
    setLoading(true); setError('');
    const r = await auth.loginAccount(code, fname);
    if (!r.ok) { setError(r.error); setLoading(false); }
  }

  if (auth.loading) return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"linear-gradient(140deg,#5BBEC2,#7DAF9E,#F09E72)",gap:16}}>
      <div style={{fontSize:48}}>👶</div>
      <p style={{color:"var(--wh)",fontWeight:700,fontSize:16}}>Chargement de vos données…</p>
      <div style={{width:48,height:4,borderRadius:99,background:"rgba(255,255,255,.3)",overflow:"hidden"}}>
        <div style={{height:"100%",width:"60%",background:"var(--wh)",borderRadius:99,animation:"fU .8s ease infinite alternate"}}/>
      </div>
    </div>
  );

  /* ── ÉCRAN DE CONNEXION UNIQUE ── */
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#5BBEC2 0%,#7DAF9E 50%,#F09E72 100%)",display:"flex",flexDirection:"column",overflowY:"auto"}}>
      {/* Bulles décoratives */}
      <div style={{position:"fixed",width:180,height:180,borderRadius:"50%",top:"-50px",left:"-50px",background:"rgba(255,255,255,.07)",pointerEvents:"none"}}/>
      <div style={{position:"fixed",width:120,height:120,borderRadius:"50%",top:"8%",right:"-40px",background:"rgba(255,255,255,.07)",pointerEvents:"none"}}/>

      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 20px 48px",position:"relative",zIndex:1}}>

        {/* Logo + titre */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:76,height:76,borderRadius:20,background:"rgba(255,255,255,.28)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,margin:"0 auto 14px",boxShadow:"0 8px 24px rgba(0,0,0,.14)"}}>
            👶
          </div>
          <h1 style={{fontFamily:"var(--fs)",fontSize:32,color:"var(--wh)",lineHeight:1.15,marginBottom:6}}>
            Baby<br/><em>Essentials</em>
          </h1>
          <p style={{fontSize:12.5,color:"rgba(255,255,255,.78)",lineHeight:1.6,maxWidth:260}}>
            Préparez sereinement l'arrivée de votre bébé — listes, budget, aides CAF et suivi.
          </p>
        </div>

        {/* CARTE CONNEXION */}
        <div style={{background:"var(--wh)",borderRadius:"var(--r4)",padding:"26px 22px",width:"100%",maxWidth:420,boxShadow:"0 16px 48px rgba(0,0,0,.22)",marginBottom:14}}>

          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
            <span style={{fontSize:26}}>🔐</span>
            <div>
              <h2 style={{fontFamily:"var(--fs)",fontSize:20,lineHeight:1.2}}>Connexion</h2>
              <p style={{fontSize:11,color:"var(--g400)"}}>Compte famille · Synchronisé · Multi-appareils</p>
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:13}}>

            {/* Identifiant */}
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{fontSize:10.5,fontWeight:800,color:"var(--g600)",textTransform:"uppercase",letterSpacing:.6}}>
                Identifiant famille <span style={{color:"var(--rd)"}}>*</span>
              </label>
              <input
                ref={codeRef}
                className="inp"
                value={code}
                placeholder="ex : MARTIN2025"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                style={{fontSize:17,fontWeight:800,letterSpacing:2,textTransform:"uppercase",padding:"13px 14px"}}
                onChange={e=>{ setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"")); setError(""); }}
                onKeyDown={e=>e.key==="Enter"&&handleLogin()}
              />
              <p style={{fontSize:10,color:"var(--g400)"}}>4–16 caractères · lettres et chiffres uniquement</p>
            </div>

            {/* Nom famille (optionnel) */}
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{fontSize:10.5,fontWeight:800,color:"var(--g600)",textTransform:"uppercase",letterSpacing:.6}}>
                Nom de la famille <span style={{color:"var(--g300)",fontWeight:400,textTransform:"none"}}>(optionnel)</span>
              </label>
              <input
                className="inp"
                value={fname}
                placeholder="ex : Famille Dupont"
                style={{fontSize:14}}
                onChange={e=>{ setFname(e.target.value); setError(""); }}
                onKeyDown={e=>e.key==="Enter"&&handleLogin()}
              />
            </div>

            {/* Erreur */}
            {error&&(
              <div style={{padding:"10px 13px",background:"var(--rd-p)",borderRadius:"var(--r1)",border:"1px solid rgba(212,82,82,.3)"}}>
                <p style={{fontSize:12,color:"var(--rd)",fontWeight:600}}>⚠ {error}</p>
              </div>
            )}

            {/* BOUTON SE CONNECTER */}
            <button
              className="btn bp"
              style={{padding:"14px",fontSize:15,fontWeight:800,marginTop:2,boxShadow:"0 6px 20px rgba(91,190,194,.4)",opacity:loading?0.7:1}}
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "⏳ Connexion en cours…" : "🔑 Se connecter"}
            </button>
          </div>

          {/* Info */}
          <div style={{marginTop:16,padding:"11px 13px",background:"var(--aq-p)",borderRadius:"var(--r1)",border:"1px solid rgba(91,190,194,.3)"}}>
            <p style={{fontSize:11,color:"#186068",lineHeight:1.65}}>
              💡 <b>Première fois ?</b> Inventez un identifiant (ex: DUPONT2025) — votre compte est créé automatiquement.<br/>
              👥 <b>Partenaire ?</b> Même identifiant = mêmes données partagées.
            </p>
          </div>
        </div>

        {/* Mode sans compte */}
        <button
          onClick={auth.loginGuest}
          style={{width:"100%",maxWidth:420,padding:"13px 16px",background:"rgba(255,255,255,.15)",backdropFilter:"blur(10px)",border:"2px solid rgba(255,255,255,.45)",borderRadius:"var(--r2)",cursor:"pointer",fontFamily:"var(--ff)",transition:"all .18s",textAlign:"center"}}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.25)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.15)"}
        >
          <p style={{fontSize:13,fontWeight:800,color:"var(--wh)",marginBottom:2}}>🕵️ Continuer sans compte</p>
          <p style={{fontSize:10.5,color:"rgba(255,255,255,.72)"}}>Données locales uniquement · aucune inscription</p>
        </button>

        <p style={{fontSize:9.5,color:"rgba(255,255,255,.45)",textAlign:"center",marginTop:14,lineHeight:1.6,maxWidth:320}}>
          Sans compte, vos données restent sur cet appareil et peuvent être perdues en cas de nettoyage du navigateur.
        </p>
      </div>
    </div>
  );
}

/* ══════ ACCOUNT MODAL (gestion depuis l'app) ══════ */
function AccountModal({ auth, onClose }) {
  const { session, syncStatus, syncMsg, manualSync, logout } = auth;
  const isGuest   = session?.mode === 'guest';
  const isAccount = session?.mode === 'account';

  return (
    <div className="mbd" style={{animation:"fI .26s ease forwards"}} onClick={onClose}>
      <div className="msh" style={{animation:"sU .36s cubic-bezier(.22,1,.36,1) forwards",maxWidth:480}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <h3 style={{fontFamily:"var(--fs)",fontSize:21}}>
            {isGuest ? "Mode Invité" : `${session?.familyName||"Ma Famille"}`}
          </h3>
          <button className="btn bg" onClick={onClose} style={{fontSize:21,padding:"0 4px"}}>×</button>
        </div>

        {/* Guest banner */}
        {isGuest && (<>
          <div style={{padding:"12px 14px",background:"var(--am-p)",borderRadius:"var(--r2)",border:"1.5px solid rgba(212,154,40,.35)",marginBottom:14}}>
            <p style={{fontSize:12.5,fontWeight:700,color:"var(--am)",marginBottom:4}}>⚠ Mode Invité — Données locales uniquement</p>
            <p style={{fontSize:11.5,color:"var(--g600)",lineHeight:1.6}}>
              Vos données sont stockées <b>uniquement sur cet appareil</b>. Elles seront perdues si vous videz le cache, changez de navigateur ou d'appareil.
            </p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
            {[
              {e:"❌",t:"Pas de synchronisation entre appareils"},
              {e:"❌",t:"Partage impossible avec votre partenaire"},
              {e:"❌",t:"Données perdues si cache effacé"},
              {e:"✅",t:"Aucune inscription requise"},
              {e:"✅",t:"Parfait pour tester l'application"},
            ].map(r=>(
              <div key={r.t} style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:13}}>{r.e}</span>
                <span style={{fontSize:12,color:"var(--g600)"}}>{r.t}</span>
              </div>
            ))}
          </div>
          <button className="btn bp" style={{width:"100%",marginBottom:8}} onClick={()=>{onClose();logout();}}>
            👨‍👩‍👧 Passer à un compte famille
          </button>
        </>)}

        {/* Account info */}
        {isAccount && (<>
          <div style={{padding:"12px 14px",background:"var(--gr-p)",borderRadius:"var(--r2)",border:"1.5px solid rgba(43,138,74,.3)",marginBottom:14}}>
            <p style={{fontSize:12.5,fontWeight:700,color:"var(--gr)",marginBottom:6}}>✅ Compte Famille Actif</p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <p style={{fontSize:11.5,color:"var(--g600)"}}>Code famille :</p>
                <p style={{fontSize:20,fontWeight:800,letterSpacing:2,color:"var(--g800)",marginTop:2}}>{session.code}</p>
              </div>
              <div style={{textAlign:"right"}}>
                <p style={{fontSize:9.5,color:"var(--g400)",textTransform:"uppercase",fontWeight:700}}>Statut sync</p>
                <div style={{display:"flex",alignItems:"center",gap:5,marginTop:3}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:syncStatus==="synced"?"var(--gr)":syncStatus==="syncing"?"var(--am)":syncStatus==="error"?"var(--rd)":"var(--g300)"}}/>
                  <span style={{fontSize:10.5,fontWeight:700,color:"var(--g600)"}}>{syncMsg||"—"}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
            {[
              {e:"✅",t:"Données synchronisées automatiquement"},
              {e:"✅",t:"Accessible depuis n'importe quel appareil"},
              {e:"✅",t:"Partageable avec votre code famille"},
              {e:"✅",t:"Sauvegarde cloud automatique toutes les 60s"},
            ].map(r=>(
              <div key={r.t} style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:13}}>{r.e}</span>
                <span style={{fontSize:12,color:"var(--g600)"}}>{r.t}</span>
              </div>
            ))}
          </div>

          {/* Share code */}
          <div style={{padding:"12px 14px",background:"var(--aq-p)",borderRadius:"var(--r2)",border:"1.5px solid rgba(91,190,194,.3)",marginBottom:14}}>
            <p style={{fontSize:11.5,fontWeight:700,color:"var(--aq)",marginBottom:4}}>👥 Inviter votre partenaire</p>
            <p style={{fontSize:11,color:"var(--g600)",lineHeight:1.6}}>
              Communiquez-lui le code <b>{session.code}</b>. Il lui suffit d'ouvrir l'application et d'entrer ce code pour accéder aux mêmes données.
            </p>
          </div>

          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <button className="btn bp" style={{flex:1}} onClick={manualSync} disabled={syncStatus==="syncing"}>
              {syncStatus==="syncing"?"⏳ Sync…":"🔄 Synchroniser maintenant"}
            </button>
          </div>
        </>)}

        {/* Données */}
        <button className="btn bs" style={{width:"100%",marginBottom:8,fontSize:12}} onClick={()=>{ onClose(); /* DataModal ouvert depuis MainApp */ window._openDataModal?.(); }}>
          💾 Mes données — Sauvegarder / Restaurer
        </button>

        <button className="btn" onClick={()=>{onClose();logout();}}
          style={{width:"100%",background:"var(--rd-p)",color:"var(--rd)",border:"1px solid rgba(212,82,82,.3)",fontSize:12}}>
          {isGuest ? "↩ Retour à l'écran d'accueil" : "🚪 Déconnexion (les données restent dans le cloud)"}
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DATA MANAGER — Sauvegarde · Restauration · Copie
   Toutes les clés applicatives exposées à l'utilisateur
   ══════════════════════════════════════════════════════════════ */
const DATA_KEYS = [
  { key:'tn_family_v6',    label:'👨‍👩‍👧 Fiche famille'       },
  { key:'tn_declared_v6',  label:'💶 Budget déclaré'          },
  { key:'tn_caf_v6',       label:'💰 Aides CAF'               },
  { key:'hm6',             label:'🏠 Maison — Cochés'         },
  { key:'hm6x',            label:'🏠 Maison — Articles perso' },
  { key:'cl6',             label:'🧳 Valise — Cochés'         },
  { key:'cl6x',            label:'🧳 Valise — Articles perso' },
  { key:'tl6',             label:'📊 Journal quotidien'       },
  { key:'tn_ov_v6',        label:'✏️ Modifications articles'  },
  { key:'tn_au_v6',        label:'📋 Journal des éditions'    },
];

function buildBackupJSON(session) {
  const data = {};
  DATA_KEYS.forEach(({ key }) => {
    const v = localStorage.getItem(key);
    if (v) try { data[key] = JSON.parse(v); } catch { data[key] = v; }
  });
  return {
    _app:     "Baby Essentials",
    _version: "v6",
    _date:    new Date().toISOString(),
    _mode:    session?.mode || "guest",
    _family:  session?.familyName || null,
    data,
  };
}

function restoreFromJSON(obj) {
  const results = [];
  if (!obj?.data) throw new Error("Format de sauvegarde invalide.");
  for (const [key, val] of Object.entries(obj.data)) {
    try {
      localStorage.setItem(key, typeof val === "string" ? val : JSON.stringify(val));
      results.push({ key, ok: true });
    } catch (e) {
      results.push({ key, ok: false, error: e.message });
    }
  }
  return results;
}

function dataSizeLabel(key) {
  const v = localStorage.getItem(key);
  if (!v) return null;
  const kb = (new Blob([v]).size / 1024).toFixed(1);
  return `${kb} Ko`;
}

/* ── DataModal ── */
function DataModal({ auth, onClose }) {
  const { session } = auth;
  const [view,       setView]       = useState("overview"); // overview | export | import | raw
  const [feedback,   setFeedback]   = useState(null);
  const [importLog,  setImportLog]  = useState(null);
  const [rawKey,     setRawKey]     = useState(DATA_KEYS[0].key);
  const fileRef = useRef(null);

  const msg = useCallback((text, type="ok") => {
    setFeedback({ text, type });
    setTimeout(() => setFeedback(null), 4000);
  }, []);

  /* Calcul taille totale */
  const totalSize = useMemo(() => {
    let bytes = 0;
    DATA_KEYS.forEach(({ key }) => {
      const v = localStorage.getItem(key);
      if (v) bytes += new Blob([v]).size;
    });
    return (bytes / 1024).toFixed(1);
  }, [view]);

  /* ── Télécharger JSON ── */
  const handleDownload = useCallback(() => {
    try {
      const obj  = buildBackupJSON(session);
      const str  = JSON.stringify(obj, null, 2);
      const blob = new Blob([str], { type: "application/json" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      const date = new Date().toISOString().slice(0,10);
      a.href     = url;
      a.download = `baby-essentials-backup-${date}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      msg("✅ Fichier téléchargé — conservez-le précieusement !");
    } catch (e) {
      msg("Erreur téléchargement : " + e.message, "warn");
    }
  }, [session, msg]);

  /* ── Copier JSON dans presse-papiers ── */
  const handleCopyJSON = useCallback(async () => {
    const str = JSON.stringify(buildBackupJSON(session), null, 2);
    let ok = false;
    if (navigator?.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(str); ok = true; } catch {}
    }
    if (!ok) {
      const el = document.createElement("textarea");
      el.value = str; el.style.cssText = "position:fixed;top:-9999px";
      document.body.appendChild(el); el.focus(); el.select();
      try { ok = document.execCommand("copy"); } finally { document.body.removeChild(el); }
    }
    msg(ok ? "✅ JSON copié dans le presse-papiers !" : "Sélectionnez le texte brut et copiez manuellement.", ok?"ok":"warn");
  }, [session, msg]);

  /* ── Importer depuis fichier JSON ── */
  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const obj = JSON.parse(ev.target.result);
        if (obj._app !== "Baby Essentials") throw new Error("Ce fichier n'est pas une sauvegarde Baby Essentials.");
        const results = restoreFromJSON(obj);
        setImportLog({ date: obj._date, family: obj._family, results });
        msg(`✅ ${results.filter(r=>r.ok).length} sections restaurées — rechargez la page pour voir les changements.`);
      } catch (err) {
        msg("Erreur : " + err.message, "warn");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }, [msg]);

  /* ── Vue données brutes ── */
  const rawValue = useMemo(() => {
    const v = localStorage.getItem(rawKey);
    if (!v) return "(vide)";
    try { return JSON.stringify(JSON.parse(v), null, 2); }
    catch { return v; }
  }, [rawKey, view]);

  return (
    <div className="mbd" style={{animation:"fI .26s ease forwards"}} onClick={onClose}>
      <div className="msh" style={{animation:"sU .36s cubic-bezier(.22,1,.36,1) forwards",maxWidth:500}} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div>
            <h3 style={{fontFamily:"var(--fs)",fontSize:21}}>Mes Données</h3>
            <p style={{fontSize:11,color:"var(--g400)",marginTop:2}}>Sauvegarde · Restauration · Export brut</p>
          </div>
          <button className="btn bg" onClick={onClose} style={{fontSize:21,padding:"0 4px"}}>×</button>
        </div>

        {/* Tabs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:3,padding:3,background:"var(--g100)",borderRadius:"var(--r1)",marginBottom:14}}>
          {[{k:"overview",l:"📊 Vue d'ensemble"},{k:"export",l:"💾 Sauvegarder"},{k:"import",l:"📂 Restaurer"}].map(t=>(
            <button key={t.k} onClick={()=>setView(t.k)} style={{padding:"7px 4px",borderRadius:"var(--r1)",border:"none",cursor:"pointer",fontFamily:"var(--ff)",fontSize:10.5,fontWeight:700,transition:".15s",
              background:view===t.k?"var(--wh)":"transparent",color:view===t.k?"var(--g800)":"var(--g400)",
              boxShadow:view===t.k?"var(--sh1)":"none"}}>
              {t.l}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback&&<div style={{padding:"9px 12px",borderRadius:"var(--r1)",marginBottom:12,fontSize:12,fontWeight:600,
          background:feedback.type==="warn"?"var(--am-p)":"var(--gr-p)",
          color:feedback.type==="warn"?"var(--am)":"var(--gr)",
          border:`1px solid ${feedback.type==="warn"?"rgba(212,154,40,.3)":"rgba(43,138,74,.3)"}`}}>
          {feedback.text}
        </div>}

        {/* ── VUE D'ENSEMBLE ── */}
        {view==="overview"&&(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {/* Stockage */}
            <div style={{padding:"12px 14px",background:"var(--g50)",borderRadius:"var(--r2)",border:"1.5px solid var(--g200)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <p style={{fontSize:12,fontWeight:800,color:"var(--g800)"}}>📦 Stockage local (localStorage)</p>
                <span style={{fontSize:11,fontWeight:800,color:"var(--aq)",padding:"2px 8px",borderRadius:99,background:"var(--aq-p)"}}>{totalSize} Ko utilisés</span>
              </div>
              {DATA_KEYS.map(({key,label})=>{
                const sz = dataSizeLabel(key);
                const has = !!localStorage.getItem(key);
                return (
                  <div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:"1px solid var(--g200)"}}>
                    <span style={{fontSize:11.5,color:has?"var(--g800)":"var(--g300)"}}>{label}</span>
                    <span style={{fontSize:10,fontWeight:700,color:has?"var(--g600)":"var(--g300)",padding:"1px 7px",borderRadius:99,background:has?"var(--g100)":"transparent"}}>
                      {sz||"vide"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Explication stockage */}
            <div style={{padding:"11px 13px",background: session?.mode==="account"?"var(--gr-p)":"var(--am-p)",borderRadius:"var(--r2)",border:`1.5px solid ${session?.mode==="account"?"rgba(43,138,74,.3)":"rgba(212,154,40,.35)"}`}}>
              <p style={{fontSize:11.5,fontWeight:700,color:session?.mode==="account"?"var(--gr)":"var(--am)",marginBottom:5}}>
                {session?.mode==="account"?"☁️ Mode Compte — Double stockage":"🕵️ Mode Invité — Stockage local uniquement"}
              </p>
              {session?.mode==="account"
                ? <p style={{fontSize:11,color:"var(--g600)",lineHeight:1.65}}>
                    Les données sont stockées <b>sur cet appareil (localStorage)</b> ET dans le <b>cloud (window.storage Anthropic)</b>.<br/>
                    Synchronisation automatique toutes les 60 secondes et à chaque changement d'onglet.<br/>
                    Code famille : <b style={{letterSpacing:1}}>{session.code}</b>
                  </p>
                : <p style={{fontSize:11,color:"var(--g600)",lineHeight:1.65}}>
                    Les données vivent <b>uniquement dans ce navigateur</b>, dans la mémoire locale (localStorage).<br/>
                    Elles seront <b>perdues</b> si vous videz le cache ou changez d'appareil.<br/>
                    Sauvegardez régulièrement via l'onglet "Sauvegarder".
                  </p>
              }
            </div>

            {/* Bouton données brutes */}
            <button className="btn bs" style={{fontSize:11.5}} onClick={()=>setView("raw")}>
              🔍 Voir les données brutes (JSON)
            </button>
          </div>
        )}

        {/* ── EXPORT / SAUVEGARDE ── */}
        {view==="export"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{padding:"12px 14px",background:"var(--aq-p)",borderRadius:"var(--r2)",border:"1.5px solid rgba(91,190,194,.3)",marginBottom:4}}>
              <p style={{fontSize:12,fontWeight:700,color:"var(--aq)",marginBottom:4}}>💾 Sauvegarder toutes vos données</p>
              <p style={{fontSize:11,color:"var(--g600)",lineHeight:1.65}}>
                Génère un fichier <b>.json</b> contenant <b>toutes vos données</b> : famille, budget, aides CAF, valise, maison, journal.<br/>
                Conservez ce fichier en lieu sûr (Google Drive, iCloud, email à vous-même…).
              </p>
              <p style={{fontSize:10,color:"var(--g400)",marginTop:5}}>Taille estimée : {totalSize} Ko</p>
            </div>

            {/* Télécharger */}
            <button onClick={handleDownload} style={{display:"flex",alignItems:"center",gap:12,padding:"15px 16px",borderRadius:"var(--r2)",cursor:"pointer",border:"none",background:"var(--aq)",color:"var(--wh)",fontFamily:"var(--ff)",fontWeight:700,fontSize:14,boxShadow:"0 4px 12px rgba(91,190,194,.3)",transition:"all .18s"}}>
              <span style={{fontSize:26}}>⬇️</span>
              <div style={{flex:1,textAlign:"left"}}>
                <p>Télécharger la sauvegarde (.json)</p>
                <p style={{fontSize:10.5,opacity:.8,fontWeight:400,marginTop:2}}>Fichier horodaté · Restaurable à tout moment</p>
              </div>
            </button>

            {/* Copier JSON */}
            <button onClick={handleCopyJSON} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:"var(--r2)",cursor:"pointer",border:"1.5px solid var(--g200)",background:"var(--wh)",fontFamily:"var(--ff)",fontWeight:600,fontSize:13,transition:"all .18s"}}>
              <span style={{fontSize:22}}>📋</span>
              <div style={{flex:1,textAlign:"left"}}>
                <p style={{color:"var(--g800)"}}>Copier le JSON dans le presse-papiers</p>
                <p style={{fontSize:10.5,color:"var(--g400)",marginTop:2}}>À coller dans un éditeur de texte ou un email</p>
              </div>
            </button>

            <div style={{padding:"10px 12px",background:"var(--sa-p)",borderRadius:"var(--r1)",border:"1px solid rgba(125,175,158,.3)"}}>
              <p style={{fontSize:11,color:"#2B6650",lineHeight:1.6}}>
                💡 <b>Fréquence recommandée :</b> sauvegardez à chaque étape importante (après avoir rempli la valise, après un achat groupé…). Renommez le fichier avec la date pour vous y retrouver.
              </p>
            </div>
          </div>
        )}

        {/* ── IMPORT / RESTAURATION ── */}
        {view==="import"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{padding:"12px 14px",background:"var(--am-p)",borderRadius:"var(--r2)",border:"1.5px solid rgba(212,154,40,.35)"}}>
              <p style={{fontSize:12,fontWeight:700,color:"var(--am)",marginBottom:4}}>⚠️ Restauration — Écrase les données actuelles</p>
              <p style={{fontSize:11,color:"var(--g600)",lineHeight:1.65}}>
                Sélectionnez un fichier <b>.json</b> précédemment exporté depuis Baby Essentials.<br/>
                Les données actuelles seront <b>remplacées</b> par celles du fichier.<br/>
                Après restauration, <b>rechargez la page</b> pour voir les changements.
              </p>
            </div>

            {/* Sélecteur de fichier */}
            <input ref={fileRef} type="file" accept=".json,application/json" style={{display:"none"}} onChange={handleFileChange}/>
            <button onClick={()=>fileRef.current?.click()} style={{display:"flex",alignItems:"center",gap:12,padding:"15px 16px",borderRadius:"var(--r2)",cursor:"pointer",border:"1.5px dashed var(--aq)",background:"var(--aq-p)",fontFamily:"var(--ff)",fontWeight:700,fontSize:14,transition:"all .18s"}}>
              <span style={{fontSize:26}}>📂</span>
              <div style={{flex:1,textAlign:"left"}}>
                <p style={{color:"var(--aq)"}}>Choisir un fichier de sauvegarde…</p>
                <p style={{fontSize:10.5,color:"var(--g400)",fontWeight:400,marginTop:2}}>Format : baby-essentials-backup-YYYY-MM-DD.json</p>
              </div>
            </button>

            {/* Log de restauration */}
            {importLog&&(
              <div style={{padding:"12px 14px",background:"var(--gr-p)",borderRadius:"var(--r2)",border:"1.5px solid rgba(43,138,74,.3)"}}>
                <p style={{fontSize:12,fontWeight:700,color:"var(--gr)",marginBottom:6}}>
                  ✅ Restauration effectuée
                </p>
                {importLog.date&&<p style={{fontSize:10.5,color:"var(--g600)",marginBottom:6}}>
                  Sauvegarde du {new Date(importLog.date).toLocaleString("fr-FR",{day:"2-digit",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})}
                  {importLog.family&&` — ${importLog.family}`}
                </p>}
                {importLog.results.map(r=>(
                  <div key={r.key} style={{display:"flex",gap:6,fontSize:11,marginBottom:2}}>
                    <span>{r.ok?"✓":"✗"}</span>
                    <span style={{color:r.ok?"var(--gr)":"var(--rd)"}}>{DATA_KEYS.find(d=>d.key===r.key)?.label||r.key}</span>
                  </div>
                ))}
                <p style={{fontSize:10.5,color:"var(--am)",fontWeight:700,marginTop:8}}>
                  ⚠️ Rechargez la page (F5 / ↺) pour que les données s'affichent.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── DONNÉES BRUTES ── */}
        {view==="raw"&&(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <button onClick={()=>setView("overview")} className="btn bg" style={{padding:"4px 8px",fontSize:11}}>← Retour</button>
              <select className="inp" style={{fontSize:12,padding:"6px 10px",flex:1}} value={rawKey} onChange={e=>setRawKey(e.target.value)}>
                {DATA_KEYS.map(({key,label})=>(
                  <option key={key} value={key} disabled={!localStorage.getItem(key)}>{label}{!localStorage.getItem(key)?" (vide)":""}</option>
                ))}
              </select>
            </div>
            <p style={{fontSize:10,color:"var(--g400)"}}>Taille : {dataSizeLabel(rawKey)||"vide"}</p>
            <textarea readOnly value={rawValue} onClick={e=>e.target.select()}
              style={{width:"100%",height:220,padding:"10px",borderRadius:"var(--r1)",border:"1.5px solid var(--g200)",fontFamily:"'Courier New',monospace",fontSize:10,resize:"vertical",color:"var(--g600)",background:"var(--g50)",outline:"none",lineHeight:1.5}}/>
            <p style={{fontSize:10,color:"var(--g400)"}}>Cliquez dans la zone → Ctrl+A → Ctrl+C pour tout copier</p>
          </div>
        )}

        <button className="btn bs" style={{width:"100%",marginTop:10}} onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

/* ══════ EXPORT FUNCTIONS ══════ */

function generateShareText(family, db, cafAids, cl, home, nbChildren) {
  const date = new Date().toLocaleDateString("fr-FR", {day:"2-digit",month:"long",year:"numeric"});
  const childrenLabel = family.children.map(c=>c.prenom||"Bébé").join(" & ") || "Bébé(s)";
  const totalToBuy = cl.grandToBuy + home.grandToBuy;
  const totalValue = cl.grandTotal + home.grandTotal;
  const delta = db.val ? totalToBuy - db.val : null;
  const bar = "─".repeat(38);

  let t = `🍼 BABY ESSENTIALS — ${date}\n${bar}\n\n`;

  /* Famille */
  t += `👨‍👩‍👧 FAMILLE\n`;
  family.children.forEach((c,i)=>{
    const ico = c.sexe==="f"?"👧":c.sexe==="m"?"👦":"👶";
    t += `  ${ico} ${c.prenom||`Bébé ${i+1}`}${c.nom?` ${c.nom}`:""}`;
    if(c.ddn_prevue) t += ` · Naissance prévue : ${fmtDate(c.ddn_prevue)}`;
    if(c.ddn)        t += ` · Né(e) le ${fmtDate(c.ddn)}`;
    if(c.poids_naissance) t += ` · ${c.poids_naissance}g`;
    t += "\n";
  });
  t += "\n";

  /* Budget */
  t += `💶 BUDGET\n`;
  if(db.val)  t += `  Déclaré  : ${fmtEur(db.val)}\n`;
  t += `  À acheter : ${fmtEur(totalToBuy)}\n`;
  if(totalValue>totalToBuy) t += `  Éco. stock : ${fmtEur(totalValue-totalToBuy)}\n`;
  if(delta!==null) t += `  Écart     : ${delta>0?"+":""}${fmtEur(delta)}\n`;
  if(cafAids.totalAids>0) t += `  Aides CAF : +${fmtEur(cafAids.totalAids)} → Budget effectif : ${fmtEur((db.val||0)+cafAids.totalAids)}\n`;
  t += "\n";

  /* Aides CAF */
  const filledAids = cafAids.aids.filter(a=>typeof a.amount==="number"&&a.amount>=0);
  if(filledAids.length>0){
    t += `💰 AIDES CAF & PRESTATIONS\n`;
    filledAids.forEach(a=>{
      t += `  ${a.icon} ${a.label} : ${a.amount===0?"Gratuit":fmtEur(a.amount)}\n`;
    });
    t += "\n";
  }

  /* Valise */
  t += `🧳 VALISE MATERNITÉ — ${cl.stats.done}/${cl.stats.total} articles (${cl.stats.pct}%)\n`;
  CLINIC_CATS.forEach(cat=>{
    const items=[...cat.items,...cl.cx.filter(x=>x.cid===cat.id)];
    const done=items.filter(i=>cl.ck[i.id]).length;
    t += `\n  ${cat.emoji} ${cat.label} — ${done}/${items.length}\n`;
    items.forEach(item=>{
      const r=cl.res(item); const q=effQty(r,nbChildren);
      t += `    ${cl.ck[item.id]?"✓":"□"} ${r.text}`;
      if(r.urgent) t += " 🚨";
      if(r.price) t += ` (${fmtEur(r.price*q)})`;
      t += "\n";
    });
  });
  t += "\n";

  /* Maison */
  t += `🏠 ESSENTIELS MAISON — ${home.stats.done}/${home.stats.total} articles (${home.stats.pct}%)\n`;
  HOME_CATS.forEach(cat=>{
    const items=[...cat.items,...home.cx.filter(x=>x.cid===cat.id)].filter(i=>!i.isPlaceholder);
    if(!items.length) return;
    const done=items.filter(i=>home.ck[i.id]).length;
    const catBuy=home.catToBuy[cat.id]??0;
    t += `\n  ${cat.emoji} ${cat.label} — ${done}/${items.length}${catBuy>0?` | À acheter : ${fmtEur(catBuy)}`:""}\n`;
    items.forEach(item=>{
      const r=home.res(item); const q=effQty(r,nbChildren);
      const st=Math.min(r.stock||0,q); const toBuy=q-st;
      t += `    ${home.ck[item.id]?"✓":"□"} ${r.text}`;
      if(r.urgent) t += " 🚨";
      if(r.price&&toBuy>0) t += ` (${fmtEur(r.price*toBuy)})`;
      if(st>0) t += ` [📦 ${st} en stock]`;
      t += "\n";
    });
  });

  t += `\n${bar}\nGénéré par Baby Essentials · ${date}`;
  return t;
}

function generatePrintHTML(family, db, cafAids, cl, home, nbChildren) {
  const now = new Date();
  const date = now.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const childrenLabel = family.children.map(c=>c.prenom||"Bébé").join(" & ")||"Bébé(s)";
  const totalToBuy = cl.grandToBuy+home.grandToBuy;
  const totalValue = cl.grandTotal+home.grandTotal;
  const delta = db.val ? totalToBuy-db.val : null;
  const isOver = delta!==null&&delta>0;

  const chk = ok => ok
    ? `<span style="color:#2B8A4A;font-size:13px">✓</span>`
    : `<span style="color:#CCCAC6;font-size:13px">□</span>`;

  const pri = p => p==="high"?`<span class="tag-hi">Priorité</span>`:p==="low"?`<span class="tag-lo">Optionnel</span>`:"";

  /* ── Clinic rows ── */
  let clinicHTML = "";
  CLINIC_CATS.forEach(cat=>{
    const items=[...cat.items,...cl.cx.filter(x=>x.cid===cat.id)];
    const done=items.filter(i=>cl.ck[i.id]).length;
    clinicHTML += `<tr class="cat-head"><td colspan="5">${cat.emoji} ${cat.label} <span class="prog">${done}/${items.length}</span></td></tr>`;
    items.forEach(item=>{
      const r=cl.res(item); const q=effQty(r,nbChildren);
      const val=r.price?fmtEur(r.price*q):"—";
      clinicHTML += `<tr class="${cl.ck[item.id]?"done":""}">
        <td class="tc">${chk(!!cl.ck[item.id])}</td>
        <td>${r.text}${r.urgent?" <span class='urg'>🚨 URGENT</span>":""}</td>
        <td class="tc">${pri(r.priority)}</td>
        <td class="tc num">×${q}</td>
        <td class="tc num">${val}</td>
      </tr>`;
    });
  });

  /* ── Home rows ── */
  let homeHTML = "";
  HOME_CATS.forEach(cat=>{
    const items=[...cat.items,...home.cx.filter(x=>x.cid===cat.id)].filter(i=>!i.isPlaceholder);
    if(!items.length) return;
    const done=items.filter(i=>home.ck[i.id]).length;
    const catBuy=home.catToBuy[cat.id]??0;
    homeHTML += `<tr class="cat-head"><td colspan="5">${cat.emoji} ${cat.label} <span class="prog">${done}/${items.length}</span>${catBuy>0?` <span class="price-badge">${fmtEur(catBuy)} à acheter</span>`:""}</td></tr>`;
    items.forEach(item=>{
      const r=home.res(item); const q=effQty(r,nbChildren);
      const st=Math.min(r.stock||0,q); const toBuy=Math.max(0,q-st);
      const buyVal=r.price?fmtEur(r.price*toBuy):"—";
      homeHTML += `<tr class="${home.ck[item.id]?"done":""}">
        <td class="tc">${chk(!!home.ck[item.id])}</td>
        <td>${r.text}${r.urgent?" <span class='urg'>🚨</span>":""}${st>0?` <span class="stk">📦 ${st} en stock</span>`:""}</td>
        <td class="tc">${pri(r.priority)}</td>
        <td class="tc num">×${q}</td>
        <td class="tc num">${buyVal}</td>
      </tr>`;
    });
  });

  /* ── CAF rows ── */
  const filledAids=cafAids.aids.filter(a=>typeof a.amount==="number");
  let cafHTML=filledAids.map(a=>`<tr>
    <td style="padding:5px 8px">${a.icon} ${a.label}</td>
    <td style="padding:5px 8px;color:#686460;font-size:11px">${a.note}</td>
    <td style="padding:5px 8px;text-align:right;font-weight:700;color:#2B8A4A">${a.amount===0?"Gratuit":fmtEur(a.amount)}</td>
  </tr>`).join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Baby Essentials — ${now.toLocaleDateString("fr-FR")}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;font-size:12px;color:#2C2A28;background:#fff;padding:20px}
  h1{font-family:Georgia,serif;font-size:22px;color:#5BBEC2;margin-bottom:2px}
  h2{font-size:14px;font-weight:700;color:#2C2A28;margin:18px 0 8px;padding-bottom:4px;border-bottom:2px solid #5BBEC2}
  h3{font-size:12px;font-weight:700;color:#686460;margin:10px 0 5px}
  .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;padding-bottom:12px;border-bottom:2px solid #E6E4E1}
  .date{font-size:10px;color:#9C9994;text-align:right}
  .budget-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px}
  .bcard{padding:8px 10px;border-radius:6px;border:1px solid #E6E4E1;background:#FAF9F7}
  .bcard-label{font-size:9px;text-transform:uppercase;letter-spacing:.6px;color:#9C9994;font-weight:700;margin-bottom:3px}
  .bcard-val{font-size:15px;font-weight:800}
  .over{color:#D49A28}.ok{color:#2B8A4A}.neutral{color:#2C2A28}
  .fam-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:14px}
  .fam-card{padding:8px 10px;border:1px solid #E6E4E1;border-radius:6px;background:#FAF9F7}
  .fam-name{font-size:13px;font-weight:700;margin-bottom:3px}
  .fam-detail{font-size:10px;color:#686460}
  table{width:100%;border-collapse:collapse;margin-bottom:12px;font-size:11px}
  th{background:#F4F3F1;padding:6px 8px;text-align:left;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#686460}
  td{padding:5px 8px;border-bottom:1px solid #F4F3F1}
  tr.done td{color:#9C9994;text-decoration:line-through}
  tr.cat-head td{background:#E0F5F6;font-weight:700;font-size:11.5px;color:#186068;padding:6px 8px;page-break-after:avoid}
  .tc{text-align:center;width:28px}
  .num{text-align:right;width:70px;font-weight:700}
  .prog{font-size:10px;color:#9C9994;font-weight:400;margin-left:6px}
  .price-badge{font-size:10px;background:#E2F5EA;color:#2B8A4A;padding:1px 6px;border-radius:99px;margin-left:6px;font-weight:700}
  .stk{font-size:9px;background:#E2F5EA;color:#2B8A4A;padding:1px 5px;border-radius:99px;font-weight:700;margin-left:4px}
  .urg{font-size:9px;background:#FFECEC;color:#D45252;padding:1px 5px;border-radius:99px;font-weight:700;margin-left:4px}
  .tag-hi{font-size:9px;background:#FFECEC;color:#D45252;padding:1px 5px;border-radius:99px;font-weight:700}
  .tag-lo{font-size:9px;background:#E6F4EE;color:#7DAF9E;padding:1px 5px;border-radius:99px;font-weight:700}
  .section-total{text-align:right;padding:6px 8px;font-size:11px;font-weight:700;color:#2B8A4A;background:#F6FBF8;border-radius:0 0 6px 6px;margin-top:-4px}
  .footer{margin-top:20px;padding-top:10px;border-top:1px solid #E6E4E1;font-size:9px;color:#9C9994;text-align:center}
  @media print{
    body{padding:10px}
    .no-print{display:none}
    h2{page-break-before:auto}
    tr.cat-head{page-break-inside:avoid}
  }
</style>
</head>
<body>
  <!-- HEADER -->
  <div class="header">
    <div>
      <h1>🍼 Baby Essentials</h1>
      <p style="font-size:11px;color:#686460">Rapport complet — ${childrenLabel}</p>
    </div>
    <div class="date">Généré le ${date}</div>
  </div>

  <!-- FAMILLE -->
  <h2>👨‍👩‍👧 Famille</h2>
  <div class="fam-grid">
    ${family.children.map(c=>{
      const ico=c.sexe==="f"?"👧":c.sexe==="m"?"👦":"👶";
      return `<div class="fam-card">
        <div class="fam-name">${ico} ${c.prenom||"Bébé"}${c.nom?` ${c.nom}`:""}</div>
        ${c.ddn_prevue?`<div class="fam-detail">📅 Naissance prévue : ${fmtDate(c.ddn_prevue)}</div>`:""}
        ${c.ddn?`<div class="fam-detail">🎂 Né(e) le : ${fmtDate(c.ddn)}</div>`:""}
        ${c.poids_naissance?`<div class="fam-detail">⚖️ Poids : ${c.poids_naissance} g</div>`:""}
        ${c.taille_naissance?`<div class="fam-detail">📏 Taille : ${c.taille_naissance} cm</div>`:""}
        ${c.carnet?`<div class="fam-detail" style="margin-top:4px">📒 ${c.carnet.slice(0,80)}${c.carnet.length>80?"…":""}</div>`:""}
      </div>`;
    }).join("")}
  </div>

  <!-- BUDGET -->
  <h2>💶 Résumé Budgétaire</h2>
  <div class="budget-grid">
    ${db.val?`<div class="bcard"><div class="bcard-label">Déclaré</div><div class="bcard-val neutral">${fmtEur(db.val)}</div></div>`:""}
    <div class="bcard"><div class="bcard-label">À acheter</div><div class="bcard-val ${isOver?"over":"ok"}">${fmtEur(totalToBuy)}</div></div>
    ${delta!==null?`<div class="bcard"><div class="bcard-label">Écart</div><div class="bcard-val ${isOver?"over":"ok"}">${delta>0?"+":""}${fmtEur(delta)}</div></div>`:""}
    ${totalValue>totalToBuy?`<div class="bcard"><div class="bcard-label">Éco. stock</div><div class="bcard-val" style="color:#5A90C8">${fmtEur(totalValue-totalToBuy)}</div></div>`:""}
    ${cafAids.totalAids>0?`<div class="bcard"><div class="bcard-label">Aides CAF</div><div class="bcard-val ok">+${fmtEur(cafAids.totalAids)}</div></div>`:""}
    ${cafAids.totalAids>0&&db.val?`<div class="bcard" style="border-color:#2B8A4A"><div class="bcard-label">Budget effectif</div><div class="bcard-val ok">${fmtEur(db.val+cafAids.totalAids)}</div></div>`:""}
  </div>

  <!-- CAF AIDS -->
  ${filledAids.length>0?`
  <h2>💰 Aides CAF & Prestations Sociales</h2>
  <table>
    <thead><tr><th>Aide</th><th>Note</th><th style="text-align:right">Montant</th></tr></thead>
    <tbody>${cafHTML}</tbody>
  </table>`:""}

  <!-- VALISE -->
  <h2>🧳 Valise Maternité — ${cl.stats.done}/${cl.stats.total} articles (${cl.stats.pct}%)</h2>
  <table>
    <thead><tr><th class="tc">✓</th><th>Article</th><th class="tc">Priorité</th><th class="tc num">Qté</th><th class="tc num">Valeur</th></tr></thead>
    <tbody>${clinicHTML}</tbody>
  </table>
  ${cl.grandToBuy>0?`<div class="section-total">Total Valise à acheter : ${fmtEur(cl.grandToBuy)}</div>`:""}

  <!-- MAISON -->
  <h2>🏠 Essentiels Maison — ${home.stats.done}/${home.stats.total} articles (${home.stats.pct}%)</h2>
  <table>
    <thead><tr><th class="tc">✓</th><th>Article</th><th class="tc">Priorité</th><th class="tc num">Qté</th><th class="tc num">À acheter</th></tr></thead>
    <tbody>${homeHTML}</tbody>
  </table>
  ${home.grandToBuy>0?`<div class="section-total">Total Maison à acheter : ${fmtEur(home.grandToBuy)}</div>`:""}

  <div class="footer">
    Baby Essentials · Rapport généré le ${date} · ${nbChildren} enfant${nbChildren>1?"s":""}
  </div>

</body>
</html>`;
}

/* ══════ useFamily ══════ */
const mkChild = idx => ({ id:`c${Date.now()}${idx}`, prenom:"", nom:"", sexe:"?", ddn_prevue:"", ddn:"", poids_naissance:"", taille_naissance:"", notes:"", carnet:"" });
function useFamily() {
  const KEY="tn_family_v6";
  const [children,setChildren]=useState(()=>{try{const s=JSON.parse(localStorage.getItem(KEY));if(Array.isArray(s)&&s.length>0)return s}catch{}return [mkChild(0)]});
  useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(children))}catch{}},[children]);
  const nbChildren=children.length;
  const addChild=useCallback(()=>{if(children.length<6)setChildren(p=>[...p,mkChild(p.length)])},[children.length]);
  const updateChild=useCallback((id,f)=>setChildren(p=>p.map(c=>c.id===id?{...c,...f}:c)),[]);
  const removeChild=useCallback(id=>{if(children.length>1)setChildren(p=>p.filter(c=>c.id!==id))},[children.length]);
  return {children,nbChildren,addChild,updateChild,removeChild};
}

function useDeclaredBudget() {
  const KEY="tn_declared_v6";
  const [raw,setRaw]=useState(()=>{try{return localStorage.getItem(KEY)||""}catch{return ""}});
  const [val,setVal]=useState(()=>{try{return parseAmt(localStorage.getItem(KEY)||"")}catch{return null}});
  const [err,setErr]=useState(null);
  const onChange=useCallback(str=>{setRaw(str);const n=parseAmt(str);if(str===""){setVal(null);setErr(null);return}if(n===null){setErr("Entrez un montant positif");return}setErr(null);setVal(n);try{localStorage.setItem(KEY,str)}catch{}},[]);
  const onBlur=useCallback(()=>{const n=parseAmt(raw);if(n!==null){setRaw(String(n));setErr(null)}else if(raw!=="")setErr("Montant invalide")},[raw]);
  return {raw,val,err,onChange,onBlur};
}

const CAF_DEFAULTS=[
  {id:"caf1",label:"Prime à la naissance (jumeaux × 2)",amount:2100,note:"2 × 1 050 € — sous conditions de revenus",icon:"🎁",cat:"Naissance",url:"https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/petite-enfance/la-prime-a-la-naissance-ou-a-l-adoption"},
  {id:"caf2",label:"Allocations familiales (mensuel)",amount:null,note:"Montant variable selon revenus et âge des enfants",icon:"📅",cat:"Mensuel",url:"https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/enfant-et-jeune/les-allocations-familiales"},
  {id:"caf3",label:"PAJE — Prestation d'accueil jeune enfant",amount:null,note:"Aide à la naissance + complément libre choix",icon:"👶",cat:"Naissance",url:"https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/petite-enfance/la-prestation-d-accueil-du-jeune-enfant-paje"},
  {id:"caf4",label:"Complément mode de garde (CMG)",amount:null,note:"Si assistante maternelle ou crèche",icon:"🏠",cat:"Garde",url:"https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/petite-enfance/la-prestation-d-accueil-du-jeune-enfant-paje"},
  {id:"caf5",label:"APL — Aide au logement (mensuel)",amount:null,note:"Si éligible selon votre logement et revenus",icon:"🏡",cat:"Logement",url:"https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement-et-cadre-de-vie/l-aide-personnalisee-au-logement-apl"},
  {id:"caf6",label:"Prime d'activité (mensuel)",amount:null,note:"Selon vos revenus d'activité professionnelle",icon:"💼",cat:"Revenus",url:"https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/emploi-et-formation/la-prime-d-activite"},
  {id:"caf7",label:"PMI — Puéricultrice à domicile",amount:0,note:"Service gratuit — PMI de votre commune",icon:"🏥",cat:"Services",url:"https://www.service-public.fr/particuliers/vosdroits/F2621"},
  {id:"caf8",label:"Jumeaux & Plus — Réseau familles",amount:0,note:"Adhésion association familles multiples",icon:"👥",cat:"Services",url:"https://www.jumeaux-et-plus.fr"},
  {id:"caf9",label:"Économie location équipement lourd",amount:null,note:"Estimation vs achat neuf (poussette, lit…)",icon:"🚼",cat:"Économies",url:"https://www.leboncoin.fr/recherche?category=6"},
];
function useCAFAids() {
  const KEY="tn_caf_v6";
  const [aids,setAids]=useState(()=>{try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(Array.isArray(s))return s}catch{}return CAF_DEFAULTS.map(a=>({...a}))});
  useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(aids))}catch{}},[aids]);
  const updateAid=useCallback((id,rawVal)=>{const n=parseAmt(rawVal);setAids(prev=>prev.map(a=>a.id===id?{...a,amount:n!=null?n:null}:a))},[]);
  const totalAids=useMemo(()=>aids.reduce((s,a)=>s+(typeof a.amount==="number"&&a.amount>0?a.amount:0),0),[aids]);
  return {aids,updateAid,totalAids};
}

const HOME_CATS=[
  {id:"h_sleep",label:"Sommeil",emoji:"🌙",color:"#5BBEC2",items:[
    {id:"hs1",text:"Lits / Berceaux ⭐",qty:1,qtyPerBaby:1,price:150,priority:"high",urgent:true,desc:"Norme EN 716"},
    {id:"hs2",text:"Matelas neufs respirants",qty:1,qtyPerBaby:1,price:80,priority:"high",desc:"Anti-étouffement — jamais d'occasion"},
    {id:"hs3",text:"Draps housses",qty:2,qtyPerBaby:2,price:10,priority:"high",stock:2},
    {id:"hs4",text:"Alèses imperméables",qty:2,qtyPerBaby:2,price:8,priority:"high"},
    {id:"hs5",text:"Gigoteuses 0-3 mois",qty:2,qtyPerBaby:2,price:25,priority:"high",stock:1},
    {id:"hs6",text:"Babyphone HD",qty:1,price:80,priority:"high"},
    {id:"hs7",text:"Doudou",qty:1,qtyPerBaby:1,price:null,priority:"medium",missingPrice:true},
    {id:"hs8",text:"Veilleuse douce",qty:1,price:null,priority:"medium",missingPrice:true},
    {id:"hs9",text:"Machine à bruit blanc",qty:1,price:null,priority:"low",missingPrice:true},
  ]},
  {id:"h_hygiene",label:"Hygiène & Change",emoji:"🧴",color:"#F09E72",items:[
    {id:"hh1",text:"Table à langer pliable",qty:1,price:60,priority:"high",stock:1},
    {id:"hh2",text:"Baignoire bébé",qty:1,price:40,priority:"high"},
    {id:"hh3",text:"Capes de bain à capuche",qty:1,qtyPerBaby:1,price:12,priority:"high"},
    {id:"hh4",text:"Couches nouveau-né",qty:24,price:25,priority:"high",desc:"⚠ 24×25€ = 600€"},
    {id:"hh5",text:"Crème change (oxyde de zinc)",qty:3,price:8,priority:"high"},
    {id:"hh6",text:"Thermomètre de bain numérique",qty:1,price:15,priority:"medium"},
    {id:"hh7",text:"Sérum physiologique",qty:2,price:5,priority:"high"},
    {id:"hh8",text:"Coupe-ongles bébé sécurisé",qty:1,price:10,priority:"medium"},
    {id:"hh9",text:"Mouche-bébé électrique",qty:1,price:15,priority:"high"},
  ]},
  {id:"h_clothes",label:"Vêtements",emoji:"👗",color:"#A98FCC",items:[
    {id:"hc1",text:"Bodies cache-cœur",qty:6,qtyPerBaby:6,price:5,priority:"high"},
    {id:"hc2",text:"Pyjamas",qty:5,qtyPerBaby:5,price:15,priority:"high"},
    {id:"hc3",text:"Chaussettes",qty:4,qtyPerBaby:4,price:3,priority:"medium"},
    {id:"hc4",text:"Bonnets",qty:2,qtyPerBaby:2,price:8,priority:"medium"},
    {id:"hc5",text:"Bavoirs imperméables",qty:5,qtyPerBaby:5,price:4,priority:"high"},
    {id:"hc6",text:"Langes coton",qty:12,qtyPerBaby:12,price:6,priority:"high"},
    {id:"hc7",text:"Pantalon",qty:2,qtyPerBaby:2,price:null,priority:"low",missingPrice:true},
  ]},
  {id:"h_feed",label:"Alimentation",emoji:"🍼",color:"#7DAF9E",items:[
    {id:"hf1",text:"Biberons",qty:4,qtyPerBaby:4,price:8,priority:"high"},
    {id:"hf2",text:"Coussin allaitement",qty:1,price:50,priority:"high",stock:1},
    {id:"hf3",text:"Tire-lait double (location)",qty:1,price:200,priority:"high",desc:"Location remboursée CPAM"},
    {id:"hf4",text:"Chauffe-biberon Perfect Prep",qty:1,price:60,priority:"high"},
    {id:"hf5",text:"Stérilisateur",qty:1,price:80,priority:"high"},
    {id:"hf6",text:"Lait 1er âge (stock)",qty:4,price:30,priority:"high"},
    {id:"hf7",text:"Balance bébé",qty:1,price:40,priority:"medium"},
  ]},
  {id:"h_mobil",label:"Mobilité ⭐",emoji:"🚗",color:"#D49A28",items:[
    {id:"hm1",text:"Poussette nacelle",qty:1,price:1200,priority:"high",urgent:true,store:"Aubert",desc:"Vérifier largeur portes !"},
    {id:"hm2",text:"Siège auto iSOFIX 0+ dos-route",qty:1,qtyPerBaby:1,price:350,priority:"high",urgent:true,store:"Norauto"},
    {id:"hm3",text:"Écharpe de portage",qty:1,price:100,priority:"medium",store:"Minipouce"},
    {id:"hm4",text:"Sac à langer XXL",qty:1,price:60,priority:"high",store:"Amazon"},
    {id:"hm5",text:"Transat",qty:1,qtyPerBaby:1,price:null,priority:"medium",missingPrice:true},
  ]},
  {id:"h_access",label:"Accessoires",emoji:"🛍️",color:"#CC9ABB",items:[
    {id:"ha_ph",text:"[À compléter]",qty:null,price:null,priority:"medium",isPlaceholder:true,desc:"Ajoutez vos accessoires via le bouton ci-dessous."},
  ]},
  {id:"h_health",label:"Santé & Sécurité",emoji:"🏥",color:"#5A90C8",items:[
    {id:"hsa1",text:"Thermomètre rectal électronique",qty:1,price:null,priority:"high"},
    {id:"hsa2",text:"Doliprane nourrissons (ordonnance)",qty:1,price:null,priority:"high"},
    {id:"hsa3",text:"Vitamine D gouttes",qty:1,price:null,priority:"high"},
    {id:"hsa4",text:"Détecteur de fumée chambre bébé",qty:1,price:null,priority:"high"},
    {id:"hsa5",text:"Numéros urgence (15, 18, 3114)",qty:1,price:null,priority:"high"},
  ]},
  {id:"h_mom",label:"Récupération Maman",emoji:"💜",color:"#CC9ABB",items:[
    {id:"hmo1",text:"Gaine post-partum (si césarienne)",qty:1,price:null,priority:"high"},
    {id:"hmo2",text:"Coussin protection cicatrice voiture",qty:1,price:null,priority:"high"},
    {id:"hmo3",text:"Protège-nipples en silicone",qty:1,price:null,priority:"medium"},
    {id:"hmo4",text:"Batch cooking au congélateur",qty:1,price:null,priority:"high"},
    {id:"hmo5",text:"Organisation aide à domicile",qty:1,price:null,priority:"high"},
  ]},
];
const CLINIC_CATS=[
  {id:"cl_docs",label:"Documents",emoji:"📋",color:"#5BBEC2",items:[
    {id:"cd1",text:"Carte Vitale & mutuelle",qty:1},{id:"cd2",text:"Carte d'identité / passeport",qty:2},
    {id:"cd3",text:"Carnet de maternité",qty:1},{id:"cd4",text:"Carnet de santé",qty:1,qtyPerBaby:1},
    {id:"cd5",text:"Formulaire reconnaissance anticipée",qty:1},{id:"cd6",text:"Plan de naissance",qty:1},
  ]},
  {id:"cl_mom",label:"Pour Maman",emoji:"🌸",color:"#F09E72",items:[
    {id:"cm1",text:"Traitements personnels",qty:1},{id:"cm2",text:"Vêtements / pyjamas souples",qty:3,price:12},
    {id:"cm3",text:"Soutiens-gorge allaitement",qty:3,price:18},{id:"cm4",text:"Nécessaire toilette",qty:1,price:15},
    {id:"cm5",text:"Bas de contention prescrits",qty:2,price:8},{id:"cm6",text:"Chaussons",qty:1,price:10},
    {id:"cm7",text:"Slips jetables",qty:8,price:1},{id:"cm8",text:"Serviettes hygiéniques",qty:1,price:8},
    {id:"cm9",text:"Coussin d'allaitement",qty:1},{id:"cm10",text:"Gourde",qty:1,price:12},
    {id:"cm11",text:"Stylo",qty:1,price:2},{id:"cm12",text:"Divertissement + casque audio",qty:1},
  ]},
  {id:"cl_babies",label:"Pour Bébé(s)",emoji:"👶",color:"#7DAF9E",items:[
    {id:"cb1",text:"Pyjamas velours/coton",qty:3,qtyPerBaby:3,price:15},{id:"cb2",text:"Bodies manches longues",qty:3,qtyPerBaby:3,price:8},
    {id:"cb3",text:"Brassières de laine",qty:2,qtyPerBaby:2,price:6},{id:"cb4",text:"Bonnets",qty:1,qtyPerBaby:1,price:5},
    {id:"cb5",text:"Chaussettes",qty:2,qtyPerBaby:2,price:3},{id:"cb6",text:"Serviettes éponge",qty:1,qtyPerBaby:1,price:8},
    {id:"cb7",text:"Gigoteuse",qty:1,qtyPerBaby:1,price:25},{id:"cb8",text:"Couverture",qty:1,price:20},
    {id:"cb9",text:"Couches nouveau-né",qty:1,price:12},{id:"cb10",text:"Tenue de départ",qty:1,qtyPerBaby:1,price:20},
    {id:"cb11",text:"Savon doux + thermomètre bain",qty:1,price:20},{id:"cb12",text:"Thermomètre électronique",qty:1,price:15},
    {id:"cb13",text:"Bavoirs et langes coton",qty:2,qtyPerBaby:2,price:4},
  ]},
  {id:"cl_birth",label:"Sac Salle de Naissance",emoji:"👜",color:"#A98FCC",items:[
    {id:"cbb1",text:"Tenue complète nouveau-né",qty:1,qtyPerBaby:1,price:15},{id:"cbb2",text:"Tenue confortable maman",qty:1},
    {id:"cbb3",text:"Brumisateur d'eau",qty:1,price:5},{id:"cbb4",text:"Divertissement + casque",qty:1},
    {id:"cbb5",text:"Stylo",qty:1,price:2},
  ]},
  {id:"cl_partner",label:"Pour le Partenaire",emoji:"🤝",color:"#5A90C8",items:[
    {id:"cp1",text:"Vêtements de rechange",qty:2},{id:"cp2",text:"Trousse de toilette",qty:1},
    {id:"cp3",text:"Chargeur + batterie externe",qty:1},{id:"cp4",text:"Encas et boissons",qty:1,price:15},
    {id:"cp5",text:"Siège auto groupe 0 (OBLIGATOIRE)",qty:1,qtyPerBaby:1},
  ]},
];

/* ══════ EDIT ENGINE ══════ */
const APP_V="v6",OV_KEY="tn_ov_v6",AU_KEY="tn_au_v6",MAX_H=20,MAX_A=200;
const ED_F=["text","qty","qtyPerBaby","price","stock","priority","urgent","store","desc"];
const PRI=["high","medium","low"];
function validateEdit(cur,f){const e=[];for(const k of["id","_appVersion","_history"])if(k in f)e.push(`"${k}" immuable.`);const uk=Object.keys(f).filter(k=>!ED_F.includes(k));if(uk.length)e.push(`Champ(s) inconnu(s): ${uk.join(", ")}.`);if(cur.isPlaceholder)e.push("Placeholder non modifiable.");if("text" in f){const t=String(f.text||"").trim();if(t.length<2)e.push("Nom: 2 car. min.");if(t.length>120)e.push("Nom: 120 car. max.")}if("qty" in f&&f.qty!==null&&(!Number.isInteger(f.qty)||f.qty<1||f.qty>999))e.push("qty: entier 1–999.");if("stock" in f&&f.stock!==null&&(!Number.isInteger(f.stock)||f.stock<0||f.stock>999))e.push("stock: entier 0–999.");if("price" in f&&f.price!==null&&(typeof f.price!=="number"||f.price<0||f.price>99999))e.push("price: 0–99 999.");if("priority" in f&&!PRI.includes(f.priority))e.push(`priority: ${PRI.join(", ")}.`);if("urgent" in f&&typeof f.urgent!=="boolean")e.push("urgent: booléen.");return{valid:e.length===0,errors:e}}
const rdOv=()=>{try{return JSON.parse(localStorage.getItem(OV_KEY)||"{}")}catch{return{}}};
const wrOv=a=>{const o=rdOv();o[a.id]=a;localStorage.setItem(OV_KEY,JSON.stringify(o))};
const mgOv=b=>{const p=rdOv()[b.id];return p?{...b,...p}:b};
const apAu=e=>{try{const l=JSON.parse(localStorage.getItem(AU_KEY)||"[]");localStorage.setItem(AU_KEY,JSON.stringify([e,...l].slice(0,MAX_A)))}catch{}};
function editArticle(id,upd,opts={}){const{appVersion=APP_V,editedBy="user",getArticle,saveArticle}=opts;if(appVersion!==APP_V)return{ok:false,error:{message:`Version "${APP_V}" attendue.`}};const cur=getArticle(id);if(!cur)return{ok:false,error:{message:`Article "${id}" introuvable.`}};if(cur.isPlaceholder)return{ok:false,error:{message:"Placeholder non modifiable."}};const{valid,errors}=validateEdit(cur,upd);if(!valid)return{ok:false,error:{message:errors.join(" · ")}};const chg=Object.keys(upd).filter(k=>JSON.stringify(cur[k])!==JSON.stringify(upd[k]));if(chg.length===0)return{ok:false,error:{message:"Aucune modification."}};const snap=Object.fromEntries(chg.map(k=>[k,cur[k]]));const hist=Array.isArray(cur._history)?cur._history:[];const rev=(cur._rev??0)+1,at=new Date().toISOString();const ep="price" in upd?upd.price:cur.price;const nx={...cur,...upd,missingPrice:ep===null||ep===undefined,_appVersion:APP_V,_rev:rev,_editedAt:at,_editedBy:editedBy,_history:[{rev:cur._rev??0,editedAt:at,editedBy,changedFields:chg,snapshot:snap},...hist].slice(0,MAX_H)};try{saveArticle(nx)}catch(e){return{ok:false,error:{message:`Erreur: ${e.message}`}}}apAu({articleId:id,rev:cur._rev??0,editedAt:at,editedBy,changedFields:chg});return{ok:true,data:nx}}

/* ══════ HOOKS ══════ */
function useToast(){const[t,sT]=useState([]);const push=useCallback((msg,type="success")=>{const id=Date.now();sT(p=>[...p,{id,msg,type}]);setTimeout(()=>sT(p=>p.filter(x=>x.id!==id)),3200)},[]);return{toasts:t,push}}
function useCL(key,cats,nbChildren=1){
  const[ck,setCk]=useState(()=>{try{return JSON.parse(localStorage.getItem(key)||"{}")}catch{return{}}});
  const[cx,setCx]=useState(()=>{try{return JSON.parse(localStorage.getItem(key+"x")||"[]")}catch{return[]}});
  const[ovR,setOvR]=useState(0);
  useEffect(()=>{localStorage.setItem(key,JSON.stringify(ck))},[ck,key]);
  useEffect(()=>{localStorage.setItem(key+"x",JSON.stringify(cx))},[cx,key]);
  const toggle=useCallback(id=>setCk(p=>({...p,[id]:!p[id]})),[]);
  const addCx=useCallback((cid,txt,qty,desc)=>setCx(p=>[...p,{id:`cx${Date.now()}`,cid,text:txt,qty:parseInt(qty)||1,desc,price:null,stock:0,priority:"medium"}]),[]);
  const removeCx=useCallback(id=>{setCx(p=>p.filter(c=>c.id!==id));setCk(p=>{const n={...p};delete n[id];return n})},[]);
  const res=useCallback(item=>{if(String(item.id).startsWith("cx"))return item;return mgOv(item)},[ovR]);// eslint-disable-line
  const editItem=useCallback((id,fields,editedBy="user")=>{const isC=String(id).startsWith("cx");if(isC){let cur=null;setCx(prev=>{cur=prev.find(a=>a.id===id)??null;return prev});return editArticle(id,fields,{appVersion:APP_V,editedBy,getArticle:()=>cur,saveArticle:up=>setCx(prev=>prev.map(a=>a.id===id?up:a))})}const base=cats.flatMap(c=>c.items).find(a=>a.id===id);return editArticle(id,fields,{appVersion:APP_V,editedBy,getArticle:()=>base?mgOv(base):null,saveArticle:up=>{wrOv(up);setOvR(r=>r+1)}})},[cats]);
  const stats=useMemo(()=>{const all=cats.flatMap(c=>[...c.items.map(i=>res(i)),...cx.filter(x=>x.cid===c.id)]);const real=all.filter(i=>!i.isPlaceholder);const done=real.filter(i=>ck[i.id]).length;return{total:real.length,done,pct:real.length?Math.round((done/real.length)*100):0}},[cats,cx,ck,res]);
  const grandTotal=useMemo(()=>cats.reduce((s,cat)=>{const items=[...cat.items.map(i=>res(i)),...cx.filter(x=>x.cid===cat.id)];return s+calcCatTotal(items,nbChildren)},0),[cats,cx,res,nbChildren]);
  const grandToBuy=useMemo(()=>cats.reduce((s,cat)=>{const items=[...cat.items.map(i=>res(i)),...cx.filter(x=>x.cid===cat.id)];return s+calcCatToBuy(items,nbChildren)},0),[cats,cx,res,nbChildren]);
  const catTotals=useMemo(()=>{const m={};cats.forEach(cat=>{const it=[...cat.items.map(i=>res(i)),...cx.filter(x=>x.cid===cat.id)];m[cat.id]=calcCatTotal(it,nbChildren)});return m},[cats,cx,res,nbChildren]);
  const catToBuy=useMemo(()=>{const m={};cats.forEach(cat=>{const it=[...cat.items.map(i=>res(i)),...cx.filter(x=>x.cid===cat.id)];m[cat.id]=calcCatToBuy(it,nbChildren)});return m},[cats,cx,res,nbChildren]);
  return{ck,toggle,cx,addCx,removeCx,editItem,res,stats,grandTotal,grandToBuy,catTotals,catToBuy};
}

/* ══════ ATOMS ══════ */
const Tick=()=>(<svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const Ring=({pct,size=56,color="#5BBEC2"})=>{const r=(size-8)/2,c=2*Math.PI*r;return(<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E6E4E1" strokeWidth="4.5"/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4.5" strokeDasharray={c} strokeDashoffset={c-(pct/100)*c} strokeLinecap="round" style={{transition:"stroke-dashoffset .6s cubic-bezier(.22,1,.36,1)"}}/></svg>)};

function DeclaredBudgetField({db,label="Budget que vous êtes prêts à allouer",onDark=false}){
  const ref=useRef(null);
  return(<div className="db-wrap" style={onDark?{background:"rgba(255,255,255,.12)",border:"2px solid rgba(255,255,255,.25)"}:{}}>
    <label htmlFor="db-g" style={{fontSize:10,fontWeight:800,letterSpacing:1.2,textTransform:"uppercase",color:onDark?"rgba(255,255,255,.7)":"var(--g400)",display:"block",marginBottom:4}}>{label}</label>
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <span style={{fontSize:24,fontWeight:800,color:onDark?"rgba(255,255,255,.5)":"var(--g300)"}}>€</span>
      <input id="db-g" ref={ref} className="db-input" style={{color:onDark?"var(--wh)":"var(--g800)"}} type="text" inputMode="decimal" value={db.raw} placeholder="Saisissez votre budget…" onChange={e=>db.onChange(e.target.value)} onBlur={db.onBlur} onKeyDown={e=>{if(e.key==="Enter"){db.onBlur();ref.current?.blur()}}}/>
    </div>
    {db.err?<p style={{fontSize:11,color:"var(--rd)",marginTop:3,fontWeight:600}}>⚠ {db.err}</p>
    :<p style={{fontSize:10,color:onDark?"rgba(255,255,255,.5)":"var(--g400)",marginTop:3}}>{db.val?`${fmtEur(db.val)} enregistré · modifiable à tout moment`:"Ce champ est libre — saisissez votre enveloppe disponible"}</p>}
  </div>);
}

function EcartCard({declaredBudget,totalToBuy,totalValue,totalCAFAids=0}){
  if(!declaredBudget||declaredBudget<=0)return(<div style={{borderRadius:"var(--r2)",padding:"14px 16px",background:"var(--g100)",border:"1.5px solid var(--g200)"}}>
    <p style={{fontSize:11.5,fontWeight:700,color:"var(--g400)",marginBottom:2}}>💡 Saisissez votre budget pour voir l'écart</p>
    <p style={{fontSize:10.5,color:"var(--g400)"}}>Entrez un montant dans le champ ci-dessus.</p>
  </div>);
  const delta=totalToBuy-declaredBudget,pctUsed=Math.round((totalToBuy/declaredBudget)*100),isOver=delta>0,saving=totalValue-totalToBuy;
  return(<div style={{borderRadius:"var(--r2)",padding:"14px 16px",background:isOver?"var(--am-p)":"var(--gr-p)",border:`1.5px solid ${isOver?"rgba(212,154,40,.4)":"rgba(43,138,74,.3)"}`}} aria-live="polite" aria-atomic="true">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
      <div><p style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:.8,color:isOver?"var(--am)":"var(--gr)",marginBottom:2}}>{isOver?"⚠ Dépassement":"✓ Dans le budget"}</p>
        <p style={{fontSize:10.5,color:"var(--g600)"}}>Stock déduit · {pctUsed}% du budget utilisé</p></div>
      <p style={{fontSize:24,fontWeight:800,color:isOver?"var(--am)":"var(--gr)",lineHeight:1}}>{delta>0?"+":""}{fmtEur(delta)}</p>
    </div>
    <div style={{height:8,background:"rgba(0,0,0,.08)",borderRadius:99,overflow:"hidden",marginBottom:10}}>
      <div style={{height:"100%",width:`${Math.min(100,pctUsed)}%`,background:isOver?"var(--am)":"var(--gr)",borderRadius:99,transition:"width .6s"}}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5}}>
      {[{l:"Déclaré",v:fmtEur(declaredBudget),c:"inherit"},{l:"À acheter",v:fmtEur(totalToBuy),c:isOver?"var(--am)":"var(--gr)"},{l:"Restant",v:fmtEur(-delta),c:delta>0?"var(--rd)":"var(--gr)"},{l:"Éco stock",v:saving>0?fmtEur(saving):"—",c:"var(--bl)"}].map(p=>(
        <div key={p.l} style={{textAlign:"center",padding:"6px 2px",background:"rgba(255,255,255,.5)",borderRadius:"var(--r1)"}}>
          <p style={{fontSize:8.5,fontWeight:800,textTransform:"uppercase",letterSpacing:.4,opacity:.65,marginBottom:2}}>{p.l}</p>
          <p style={{fontSize:11,fontWeight:800,color:p.c}}>{p.v}</p>
        </div>
      ))}
    </div>
    {totalCAFAids>0&&(<div style={{marginTop:9,padding:"7px 10px",background:"rgba(255,255,255,.6)",borderRadius:"var(--r1)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:10.5,color:"var(--gr)",fontWeight:700}}>✓ Avec aides CAF ({fmtEur(totalCAFAids)})</span>
      <span style={{fontSize:12,fontWeight:800,color:(delta-totalCAFAids)>0?"var(--am)":"var(--gr)"}}>{(delta-totalCAFAids)>0?"+":""}{fmtEur(delta-totalCAFAids)}</span>
    </div>)}
  </div>);
}

function ItemCard({item,checked,onToggle,onRemove,onEdit,showP=false,nbChildren=1}){
  if(item.isPlaceholder)return(<div className="ic warn" style={{borderStyle:"dashed"}}><p style={{fontSize:12.5,color:"var(--am)",fontWeight:700}}>⚠ Données manquantes</p><p style={{fontSize:11.5,color:"var(--g600)",marginTop:3,lineHeight:1.55}}>{item.desc}</p></div>);
  const qty=effQty(item,nbChildren),stock=Math.min(typeof item.stock==="number"?item.stock:0,qty),toPurchase=Math.max(0,qty-stock);
  const fullStk=stock>=qty,partStk=stock>0&&stock<qty;
  const lineVal=item.price!=null?item.price*qty:null,lineBuy=item.price!=null?item.price*toPurchase:null;
  return(<div className={`ic ${checked?"done":""} ${item.missingPrice?"warn":""} ${fullStk&&!checked?"stocked":""}`} style={{position:"relative"}}>
    {item._rev&&<span style={{position:"absolute",top:8,right:8,fontSize:9,padding:"1px 6px",borderRadius:99,background:"var(--aq-p)",color:"var(--aq)",fontWeight:700}}>v{item._rev}</span>}
    <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
      <div className={`cb ${checked?"on":""}`} onClick={()=>onToggle(item.id)}><Tick/></div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,alignItems:"center"}}>
          <span style={{fontSize:13.5,fontWeight:500,color:checked?"var(--g400)":"var(--g800)",textDecoration:checked?"line-through":"none",lineHeight:1.4}}>{item.text}</span>
          {item.urgent&&<span className="tag t-hi" style={{fontSize:9}}>URGENT</span>}
          {qty>1&&<span style={{fontSize:10,padding:"1px 7px",background:"var(--g100)",borderRadius:99,color:"var(--g600)",fontWeight:700}}>{item.qtyPerBaby?`${qty} (${item.qtyPerBaby}×${nbChildren})`:`×${qty}`}</span>}
          {item.priority&&<span className={`tag t-${item.priority==="high"?"hi":item.priority==="medium"?"md":"lo"}`}>{item.priority==="high"?"Priorité":item.priority==="medium"?"Moyen":"Optionnel"}</span>}
          {item.store&&<span className="tag t-st">🏪 {item.store}</span>}
          {item.missingPrice&&<span className="tag t-mi">Prix manquant</span>}
          {fullStk&&<span className="tag t-stk">📦 En stock ({stock})</span>}
          {partStk&&<span className="tag t-stk-p">📦 {stock}/{qty} en stock</span>}
        </div>
        {showP&&item.price!=null&&(<div style={{display:"flex",gap:6,alignItems:"center",marginTop:4,flexWrap:"wrap"}}>
          <span style={{fontSize:10.5,color:"var(--g400)"}}>{fmtEur(item.price)} × {qty}</span>
          {lineVal!=null&&<><span style={{fontSize:10,color:"var(--g300)"}}>=</span><span style={{fontSize:11,fontWeight:700,color:"var(--g400)",textDecoration:stock>0?"line-through":"none",padding:"1px 6px",background:"var(--g100)",borderRadius:99}}>{fmtEur(lineVal)}</span></>}
          {stock>0&&toPurchase>0&&<><span style={{fontSize:10,color:"var(--gr)"}}>→</span><span style={{fontSize:11,fontWeight:800,color:"var(--gr)",padding:"1px 7px",background:"var(--gr-p)",borderRadius:99}}>{fmtEur(lineBuy)}</span></>}
          {fullStk&&<span style={{fontSize:11,fontWeight:800,color:"var(--gr)",padding:"1px 7px",background:"var(--gr-p)",borderRadius:99}}>✓ 0 € à acheter</span>}
        </div>)}
        {item.desc&&<p style={{fontSize:11,color:item.missingPrice?"var(--am)":"var(--g400)",marginTop:3,lineHeight:1.5}}>{item.desc}</p>}
      </div>
      <div style={{display:"flex",gap:3,flexShrink:0}}>
        {onEdit&&!item.isPlaceholder&&<button className="btn bg" style={{padding:"2px 6px",fontSize:13}} onClick={()=>onEdit(item)}>✏</button>}
        {onRemove&&<button className="btn bg" style={{padding:"1px 5px",fontSize:14,color:"var(--g300)"}} onClick={()=>onRemove(item.id)}>×</button>}
      </div>
    </div>
  </div>);
}

function EditModal({item,onSave,onClose}){
  const[f,setF]=useState({text:item.text??"",qty:item.qty??"",price:item.price??"",stock:item.stock??0,priority:item.priority??"medium",urgent:item.urgent??false,store:item.store??"",desc:item.desc??""});
  const[errors,setErrors]=useState([]);
  const previewVal=f.qty!==""&&f.price!==""?parseInt(f.qty)*parseFloat(f.price):null;
  const previewBuy=previewVal!=null?Math.max(0,parseInt(f.qty)-(parseInt(f.stock)||0))*parseFloat(f.price):null;
  function submit(){    const fields={
      text:f.text.trim(),
      qty:f.qty!==""?parseInt(f.qty):null,
      qtyPerBaby:null,          // ← effacé : qty manuel prime sur qtyPerBaby×nbEnfants
      price:f.price!==""?parseFloat(f.price):null,
      stock:parseInt(f.stock)||0,
      priority:f.priority,
      urgent:f.urgent,
      store:f.store.trim()||null,
      desc:f.desc.trim()||null
    };
    const{valid,errors:ve}=validateEdit(item,fields);if(!valid){setErrors(ve);return}onSave(item.id,fields)}
  return(<div className="mbd" style={{animation:"fI .26s ease forwards"}} onClick={onClose}>
    <div className="msh" style={{animation:"sU .36s cubic-bezier(.22,1,.36,1) forwards",maxWidth:500}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
        <div><h3 style={{fontFamily:"var(--fs)",fontSize:19}}>Modifier l'article</h3><p style={{fontSize:11,color:"var(--g400)",marginTop:2}}>{item.id}{item._rev?` · rév. ${item._rev}`:""}</p></div>
        <button className="btn bg" onClick={onClose} style={{fontSize:21,padding:"0 4px"}}>×</button>
      </div>
      {errors.length>0&&<div style={{marginBottom:12,padding:"10px 12px",background:"var(--rd-p)",borderRadius:"var(--r1)"}}>{errors.map((e,i)=><p key={i} style={{fontSize:11,color:"var(--rd)"}}>• {e}</p>)}</div>}
      <div style={{display:"flex",flexDirection:"column",gap:11}}>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          <label style={{fontSize:11,fontWeight:700,color:"var(--g600)",textTransform:"uppercase",letterSpacing:.5}}>Nom *</label>
          <input className="inp" value={f.text} onChange={e=>{setErrors([]);setF(p=>({...p,text:e.target.value}))}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            <label style={{fontSize:11,fontWeight:700,color:"var(--g600)",textTransform:"uppercase",letterSpacing:.5}}>Quantité nécessaire</label>
            <input className="inp" type="number" min="1" max="999" value={f.qty} placeholder="null" onChange={e=>{setErrors([]);setF(p=>({...p,qty:e.target.value}))}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            <label style={{fontSize:11,fontWeight:700,color:"var(--gr)",textTransform:"uppercase",letterSpacing:.5}}>📦 Déjà en stock</label>
            <input className="inp" type="number" min="0" max="999" value={f.stock} placeholder="0" style={{borderColor:"rgba(43,138,74,.4)",background:"#F6FBF8"}} onChange={e=>{setErrors([]);setF(p=>({...p,stock:e.target.value}))}}/>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          <label style={{fontSize:11,fontWeight:700,color:"var(--g600)",textTransform:"uppercase",letterSpacing:.5}}>Prix unitaire €</label>
          <input className="inp" type="number" min="0" step="0.01" value={f.price} placeholder="null" onChange={e=>{setErrors([]);setF(p=>({...p,price:e.target.value}))}}/>
        </div>
        {previewVal!=null&&!isNaN(previewVal)&&(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div style={{padding:"8px 12px",background:"var(--g100)",borderRadius:"var(--r1)"}}><p style={{fontSize:9.5,color:"var(--g400)",fontWeight:700,textTransform:"uppercase",marginBottom:2}}>Valeur totale</p><p style={{fontSize:14,fontWeight:800,color:"var(--g600)"}}>{fmtEur(previewVal)}</p></div>
          <div style={{padding:"8px 12px",background:"var(--gr-p)",borderRadius:"var(--r1)"}}><p style={{fontSize:9.5,color:"var(--gr)",fontWeight:700,textTransform:"uppercase",marginBottom:2}}>À acheter</p><p style={{fontSize:14,fontWeight:800,color:"var(--gr)"}}>{fmtEur(previewBuy??0)}</p></div>
        </div>)}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            <label style={{fontSize:11,fontWeight:700,color:"var(--g600)",textTransform:"uppercase",letterSpacing:.5}}>Priorité</label>
            <select className="inp" value={f.priority} onChange={e=>setF(p=>({...p,priority:e.target.value}))}><option value="high">Priorité haute</option><option value="medium">Moyen</option><option value="low">Optionnel</option></select>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            <label style={{fontSize:11,fontWeight:700,color:"var(--g600)",textTransform:"uppercase",letterSpacing:.5}}>Magasin</label>
            <input className="inp" value={f.store} placeholder="Aubert, Amazon…" onChange={e=>setF(p=>({...p,store:e.target.value}))}/>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          <label style={{fontSize:11,fontWeight:700,color:"var(--g600)",textTransform:"uppercase",letterSpacing:.5}}>Description ({f.desc.length}/280)</label>
          <textarea className="inp" rows={2} value={f.desc} style={{resize:"vertical"}} onChange={e=>setF(p=>({...p,desc:e.target.value}))}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div className={`cb ${f.urgent?"on":""}`} onClick={()=>setF(p=>({...p,urgent:!p.urgent}))} style={{flexShrink:0}}><Tick/></div>
          <span style={{fontSize:13,fontWeight:500}}>Marquer comme URGENT</span>
        </div>
        <div style={{display:"flex",gap:8}}><button className="btn bp" style={{flex:1}} onClick={submit}>✓ Enregistrer</button><button className="btn bs" onClick={onClose}>Annuler</button></div>
      </div>
    </div>
  </div>);
}

function AddModal({cid,clabel,onAdd,onClose}){
  const[txt,setT]=useState("");const[qty,setQ]=useState(1);const[desc,setD]=useState("");
  return(<div className="mbd" style={{animation:"fI .26s ease forwards"}} onClick={onClose}>
    <div className="msh" style={{animation:"sU .36s cubic-bezier(.22,1,.36,1) forwards"}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h3 style={{fontFamily:"var(--fs)",fontSize:19}}>Ajouter un article</h3>
        <button className="btn bg" onClick={onClose} style={{fontSize:21,padding:"0 4px"}}>×</button>
      </div>
      <p style={{fontSize:11.5,color:"var(--g600)",marginBottom:12}}>Catégorie : <b>{clabel}</b></p>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        <input className="inp" placeholder="Nom de l'article *" value={txt} onChange={e=>setT(e.target.value)} autoFocus/>
        <input className="inp" type="number" placeholder="Quantité" min={1} value={qty} onChange={e=>setQ(e.target.value)} style={{width:110}}/>
        <textarea className="inp" placeholder="Description / note" value={desc} onChange={e=>setD(e.target.value)} rows={2} style={{resize:"vertical"}}/>
        <button className="btn bp" onClick={()=>{if(txt.trim()){onAdd(cid,txt.trim(),qty,desc.trim());onClose()}}}>✓ Ajouter</button>
      </div>
    </div>
  </div>);
}

function Toasts({toasts}){return(<div style={{position:"fixed",top:64,right:16,left:16,zIndex:300,pointerEvents:"none",display:"flex",flexDirection:"column",gap:6}}>
  {toasts.map(t=>(<div key={t.id} style={{padding:"10px 14px",borderRadius:"var(--r1)",fontSize:12.5,fontWeight:600,background:t.type==="error"?"var(--rd-p)":t.type==="warn"?"var(--am-p)":"var(--sa-p)",color:t.type==="error"?"var(--rd)":t.type==="warn"?"var(--am)":"#2B6650",border:`1px solid ${t.type==="error"?"rgba(212,82,82,.3)":t.type==="warn"?"rgba(212,154,40,.3)":"rgba(125,175,158,.4)"}`,animation:"fU .3s both",boxShadow:"var(--sh2)"}}>{t.type==="error"?"✗ ":t.type==="warn"?"⚠ ":"✓ "}{t.msg}</div>))}
</div>)}

/* ══════ FAMILY MODAL ══════ */
function FamilyField({ label, value, onChange, type="text", placeholder="", style={} }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      <label style={{fontSize:10.5,fontWeight:700,color:"var(--g600)",textTransform:"uppercase",letterSpacing:.5}}>{label}</label>
      <input className="inp" type={type} placeholder={placeholder} value={value||""} style={{fontSize:13,...style}} onChange={onChange}/>
    </div>
  );
}
const SEXE_ICONS={m:"👦",f:"👧","?":"👶"};
function FamilyModal({family,onClose}){
  const{children,nbChildren,addChild,updateChild,removeChild}=family;
  const[active,setActive]=useState(children[0]?.id??null);
  const child=children.find(c=>c.id===active)??children[0];
  const upd=useCallback(k=>e=>{ updateChild(child.id,{[k]:e.target.value}) },[child?.id,updateChild]);
  return(<div className="mbd" style={{animation:"fI .26s ease forwards"}} onClick={onClose}>
    <div className="msh" style={{animation:"sU .36s cubic-bezier(.22,1,.36,1) forwards",maxWidth:520}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div><h3 style={{fontFamily:"var(--fs)",fontSize:21}}>Ma Famille</h3><p style={{fontSize:11,color:"var(--g400)",marginTop:2}}>{nbChildren} enfant{nbChildren>1?"s":""} · Les quantités s'adaptent automatiquement</p></div>
        <button className="btn bg" onClick={onClose} style={{fontSize:21,padding:"0 4px"}}>×</button>
      </div>
      <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:16,paddingBottom:4}}>
        {children.map((c,i)=>(<button key={c.id} className={`child-tab-btn ${active===c.id?"on":""}`} onClick={()=>setActive(c.id)}>{SEXE_ICONS[c.sexe||"?"]} {c.prenom||`Bébé ${i+1}`}</button>))}
        {nbChildren<6&&<button className="child-tab-btn" onClick={addChild} style={{borderStyle:"dashed"}}>+ Ajouter</button>}
      </div>
      {child&&(<div style={{display:"flex",flexDirection:"column",gap:10}}>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          <label style={{fontSize:10.5,fontWeight:700,color:"var(--g600)",textTransform:"uppercase",letterSpacing:.5}}>Sexe</label>
          <div style={{display:"flex",gap:8}}>
            {[{v:"f",l:"Fille 👧"},{v:"m",l:"Garçon 👦"},{v:"?",l:"Inconnu 👶"}].map(opt=>(
              <button key={opt.v} onClick={()=>updateChild(child.id,{sexe:opt.v})} style={{padding:"6px 14px",borderRadius:99,border:"1.5px solid",fontSize:12,cursor:"pointer",fontWeight:700,transition:".16s",borderColor:child.sexe===opt.v?"var(--pu)":"var(--g200)",background:child.sexe===opt.v?"var(--pu-p)":"var(--wh)",color:child.sexe===opt.v?"var(--pu)":"var(--g600)"}}>{opt.l}</button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <FamilyField label="Prénom" value={child.prenom} onChange={upd("prenom")} placeholder="ex : Emma"/>
          <FamilyField label="Nom de famille" value={child.nom} onChange={upd("nom")} placeholder="ex : Martin"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <FamilyField label="Date naissance prévue" value={child.ddn_prevue} onChange={upd("ddn_prevue")} type="date"/>
          <FamilyField label="Date naissance réelle" value={child.ddn} onChange={upd("ddn")} type="date"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <FamilyField label="Poids naissance (g)" value={child.poids_naissance} onChange={upd("poids_naissance")} type="number" placeholder="ex : 3400"/>
          <FamilyField label="Taille naissance (cm)" value={child.taille_naissance} onChange={upd("taille_naissance")} type="number" placeholder="ex : 50"/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          <label style={{fontSize:10.5,fontWeight:700,color:"var(--pu)",textTransform:"uppercase",letterSpacing:.5}}>📒 Carnet de santé — Notes</label>
          <textarea className="inp" rows={3} placeholder="Vaccins, rendez-vous, observations médicales, groupes sanguins…" value={child.carnet||""} style={{resize:"vertical",fontSize:12.5,borderColor:"rgba(124,92,191,.3)",background:"var(--pu-p)"}} onChange={e=>updateChild(child.id,{carnet:e.target.value})}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          <label style={{fontSize:10.5,fontWeight:700,color:"var(--g600)",textTransform:"uppercase",letterSpacing:.5}}>Notes libres</label>
          <textarea className="inp" rows={2} placeholder="Particularités, allergies, informations diverses…" value={child.notes||""} style={{resize:"vertical",fontSize:12.5}} onChange={e=>updateChild(child.id,{notes:e.target.value})}/>
        </div>
        {nbChildren>1&&(<button className="btn" onClick={()=>{removeChild(child.id);setActive(children.find(c=>c.id!==child.id)?.id)}} style={{background:"var(--rd-p)",color:"var(--rd)",border:"1px solid rgba(212,82,82,.3)",fontSize:12}}>🗑 Supprimer {child.prenom||"cet enfant"}</button>)}
        <div style={{padding:"10px 12px",background:"var(--g50)",borderRadius:"var(--r1)",border:"1px solid var(--g200)"}}>
          <p style={{fontSize:10.5,color:"var(--g600)",lineHeight:1.6}}>
            {child.prenom&&<><b>{child.prenom}{child.nom?` ${child.nom}`:""}</b> · </>}
            {child.ddn_prevue&&<>Naissance prévue le {fmtDate(child.ddn_prevue)} · </>}
            {child.ddn&&<>Né(e) le {fmtDate(child.ddn)} · </>}
            {child.poids_naissance&&<>{child.poids_naissance} g · </>}
            {child.taille_naissance&&<>{child.taille_naissance} cm</>}
          </p>
          {nbChildren>1&&<p style={{fontSize:10,color:"var(--pu)",fontWeight:700,marginTop:4}}>ℹ️ {nbChildren} enfants — quantités "par enfant" multipliées par {nbChildren}</p>}
        </div>
      </div>)}
      <button className="btn bp" style={{width:"100%",marginTop:14}} onClick={onClose}>✓ Enregistrer la fiche famille</button>
    </div>
  </div>);
}

/* ══════ EXPORT MODAL ══════
   Méthodes robustes pour l'environnement sandbox :
   • Impression  : iframe caché injecté dans le DOM + contentWindow.print()
   • Copie       : execCommand('copy') comme fallback à navigator.clipboard
   • Partage     : navigator.share si dispo, sinon textarea sélectionnable
   ════════════════════════════════════════════════════════════════════════ */
function ExportModal({ onClose, family, db, cafAids }) {
  const { nbChildren } = family;
  const cl   = useCL("cl6", CLINIC_CATS, nbChildren);
  const home = useCL("hm6", HOME_CATS, nbChildren);

  const [tab,       setTab]       = useState("print"); // "print" | "share"
  const [feedback,  setFeedback]  = useState(null);    // { msg, type }
  const [printing,  setPrinting]  = useState(false);
  const textareaRef = useRef(null);

  const shareText = useMemo(
    () => generateShareText(family, db, cafAids, cl, home, nbChildren),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [family.children, db.val, cafAids.totalAids, cl.stats.pct, home.stats.pct]
  );

  const msg = useCallback((text, type="ok") => {
    setFeedback({ text, type });
    setTimeout(() => setFeedback(null), 4000);
  }, []);

  /* ── Impression via iframe caché ── */
  const handlePrint = useCallback(() => {
    setPrinting(true);
    try {
      const html = generatePrintHTML(family, db, cafAids, cl, home, nbChildren);
      // Remove the auto-print script — we trigger print ourselves
      const safeHtml = html.replace(/<script>[\s\S]*?<\/script>/g, "");

      const iframe = document.createElement("iframe");
      iframe.setAttribute("title", "baby-essentials-print");
      iframe.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;border:0;pointer-events:none;z-index:-1";
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) {
        msg("Impossible d'accéder à la fenêtre d'impression — essayez depuis un navigateur (Chrome, Firefox, Safari)", "warn");
        setPrinting(false);
        document.body.removeChild(iframe);
        return;
      }

      doc.open();
      doc.write(safeHtml);
      doc.close();

      // Wait for images / fonts to load before printing
      setTimeout(() => {
        try {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          msg("✅ Fenêtre d'impression ouverte — choisissez « Enregistrer en PDF » pour un PDF");
        } catch (e) {
          msg("Erreur impression : " + e.message, "warn");
        }
        setPrinting(false);
        setTimeout(() => {
          try { document.body.removeChild(iframe); } catch {}
        }, 5000);
      }, 700);
    } catch (e) {
      msg("Erreur : " + e.message, "warn");
      setPrinting(false);
    }
  }, [family, db, cafAids, cl, home, nbChildren, msg]);

  /* ── Copie universelle ──
     1. navigator.clipboard.writeText  (HTTPS moderne)
     2. document.execCommand('copy')    (fallback universel)
     3. Sélection manuelle du textarea  (dernier recours)
  */
  const copyText = useCallback(async (text) => {
    // Method 1 — modern API
    if (navigator?.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(text); return "ok"; } catch {}
    }
    // Method 2 — execCommand fallback
    const el = document.createElement("textarea");
    el.value = text;
    el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0;font-size:12px";
    document.body.appendChild(el);
    el.focus();
    el.select();
    try {
      const ok = document.execCommand("copy");
      document.body.removeChild(el);
      if (ok) return "ok";
    } catch { document.body.removeChild(el); }
    // Method 3 — select the visible textarea so user can Ctrl+C
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
    return "manual";
  }, []);

  const handleCopy = useCallback(async () => {
    const result = await copyText(shareText);
    if (result === "ok") {
      msg("✅ Rapport copié dans le presse-papiers !");
    } else {
      msg("Sélectionnez le texte ci-dessous puis Ctrl+C / ⌘C", "warn");
    }
  }, [shareText, copyText, msg]);

  /* ── Partage natif (mobile) ── */
  const handleShare = useCallback(async () => {
    if (typeof navigator?.share === "function") {
      try {
        await navigator.share({ title: "🍼 Baby Essentials", text: shareText });
        msg("✅ Partagé !");
        return;
      } catch (e) {
        if (e.name === "AbortError") return; // user cancelled
      }
    }
    // Fallback : copy
    handleCopy();
  }, [shareText, handleCopy, msg]);

  const selectAll = useCallback(() => {
    textareaRef.current?.focus();
    textareaRef.current?.select();
  }, []);

  return (
    <div className="mbd" style={{animation:"fI .26s ease forwards"}} onClick={onClose}>
      <div className="msh" style={{animation:"sU .36s cubic-bezier(.22,1,.36,1) forwards",maxWidth:500}} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div>
            <h3 style={{fontFamily:"var(--fs)",fontSize:21}}>Exporter & Partager</h3>
            <p style={{fontSize:11,color:"var(--g400)",marginTop:2}}>Rapport structuré comme l'application</p>
          </div>
          <button className="btn bg" onClick={onClose} style={{fontSize:21,padding:"0 4px"}}>×</button>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,padding:"4px",background:"var(--g100)",borderRadius:"var(--r1)",marginBottom:14}}>
          {[{k:"print",l:"🖨️ Imprimer / PDF"},{k:"share",l:"📱 Partager / Copier"}].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"8px",borderRadius:"var(--r1)",border:"none",cursor:"pointer",fontFamily:"var(--ff)",fontSize:12,fontWeight:700,transition:".15s",
              background:tab===t.k?"var(--wh)":"transparent",color:tab===t.k?"var(--g800)":"var(--g400)",
              boxShadow:tab===t.k?"var(--sh1)":"none"}}>
              {t.l}
            </button>
          ))}
        </div>

        {/* Feedback bar */}
        {feedback && (
          <div style={{padding:"9px 12px",borderRadius:"var(--r1)",marginBottom:12,fontSize:12,fontWeight:600,
            background:feedback.type==="warn"?"var(--am-p)":"var(--gr-p)",
            color:feedback.type==="warn"?"var(--am)":"var(--gr)",
            border:`1px solid ${feedback.type==="warn"?"rgba(212,154,40,.3)":"rgba(43,138,74,.3)"}`}}>
            {feedback.text}
          </div>
        )}

        {/* ── PRINT TAB ── */}
        {tab==="print" && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>

            {/* Summary preview */}
            <div style={{padding:"12px 14px",background:"var(--aq-p)",borderRadius:"var(--r2)",border:"1.5px solid rgba(91,190,194,.3)"}}>
              <p style={{fontSize:10,fontWeight:800,color:"var(--aq)",textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Contenu du rapport</p>
              {[
                {e:"👨‍👩‍👧",l:"Famille",v:family.children.map(c=>c.prenom||"Bébé").join(" & ")||"—"},
                {e:"💶",l:"Budget déclaré",v:db.val?fmtEur(db.val):"Non défini"},
                {e:"💰",l:"Aides CAF",v:cafAids.totalAids>0?`+${fmtEur(cafAids.totalAids)}`:"—"},
                {e:"🧳",l:"Valise",v:`${cl.stats.done}/${cl.stats.total} (${cl.stats.pct}%)`},
                {e:"🏠",l:"Maison",v:`${home.stats.done}/${home.stats.total} (${home.stats.pct}%)`},
              ].map(r=>(
                <div key={r.l} style={{display:"flex",justifyContent:"space-between",fontSize:11.5,marginBottom:3}}>
                  <span style={{color:"var(--g600)"}}>{r.e} {r.l}</span>
                  <span style={{fontWeight:700,color:"var(--g800)"}}>{r.v}</span>
                </div>
              ))}
            </div>

            {/* Print button */}
            <button onClick={handlePrint} disabled={printing}
              style={{display:"flex",alignItems:"center",gap:12,padding:"16px",borderRadius:"var(--r2)",cursor:printing?"wait":"pointer",border:"none",background:"var(--aq)",color:"var(--wh)",fontFamily:"var(--ff)",fontWeight:700,fontSize:14,boxShadow:"0 4px 12px rgba(91,190,194,.35)",transition:"all .18s",opacity:printing?.7:1}}>
              <span style={{fontSize:24}}>{printing?"⏳":"🖨️"}</span>
              <div style={{flex:1,textAlign:"left"}}>
                <p>{printing?"Génération en cours…":"Imprimer / Sauvegarder en PDF"}</p>
                <p style={{fontSize:10.5,opacity:.8,marginTop:2,fontWeight:400}}>Rapport complet A4 · Famille · Budget · Aides · Valise · Maison</p>
              </div>
            </button>

            <div style={{padding:"9px 12px",background:"var(--g50)",borderRadius:"var(--r1)",border:"1px solid var(--g200)"}}>
              <p style={{fontSize:11,color:"var(--g600)",lineHeight:1.7}}>
                💡 <b>Créer un PDF :</b> Dans la boîte d'impression → Destination → <b>"Enregistrer en PDF"</b><br/>
                (Chrome/Edge) ou <b>"Ouvrir dans Aperçu"</b> (Safari) ou <b>"Imprimer dans un fichier"</b> (Firefox)
              </p>
            </div>
          </div>
        )}

        {/* ── SHARE TAB ── */}
        {tab==="share" && (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>

            {/* Native share */}
            <button onClick={handleShare}
              style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:"var(--r2)",cursor:"pointer",border:"1.5px solid rgba(124,92,191,.35)",background:"var(--pu-p)",fontFamily:"var(--ff)",fontWeight:600,transition:"all .18s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <span style={{fontSize:26}}>📤</span>
              <div style={{flex:1,textAlign:"left"}}>
                <p style={{fontSize:13.5,fontWeight:800,color:"var(--pu)"}}>Partager sur les réseaux</p>
                <p style={{fontSize:10.5,color:"var(--g600)",marginTop:2}}>WhatsApp · Messenger · Telegram · Mail · SMS (mobile)</p>
              </div>
              <span style={{fontSize:16,color:"var(--pu)"}}>→</span>
            </button>

            {/* Copy */}
            <button onClick={handleCopy}
              style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:"var(--r2)",cursor:"pointer",border:"1.5px solid rgba(43,138,74,.35)",background:"var(--gr-p)",fontFamily:"var(--ff)",fontWeight:600,transition:"all .18s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <span style={{fontSize:26}}>📋</span>
              <div style={{flex:1,textAlign:"left"}}>
                <p style={{fontSize:13.5,fontWeight:800,color:"var(--gr)"}}>Copier le rapport</p>
                <p style={{fontSize:10.5,color:"var(--g600)",marginTop:2}}>Presse-papiers → À coller dans n'importe quelle app</p>
              </div>
              <span style={{fontSize:16,color:"var(--gr)"}}>→</span>
            </button>

            {/* Textarea fallback — always visible, always works */}
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <p style={{fontSize:11,fontWeight:700,color:"var(--g600)"}}>Texte brut à copier</p>
                <button onClick={selectAll} className="btn bs" style={{padding:"4px 10px",fontSize:10.5,border:"1.5px solid var(--g200)"}}>
                  Tout sélectionner
                </button>
              </div>
              <textarea
                ref={textareaRef}
                readOnly
                value={shareText}
                onClick={selectAll}
                style={{width:"100%",height:170,padding:"10px",borderRadius:"var(--r1)",border:"1.5px solid var(--g200)",fontFamily:"'Courier New',monospace",fontSize:10,resize:"vertical",color:"var(--g600)",background:"var(--g50)",outline:"none",lineHeight:1.55,cursor:"text"}}
              />
              <p style={{fontSize:10,color:"var(--g400)"}}>
                Cliquez dans la zone → <b>Ctrl+A</b> / <b>⌘A</b> pour tout sélectionner → <b>Ctrl+C</b> / <b>⌘C</b> pour copier
              </p>
            </div>
          </div>
        )}

        <button className="btn bs" style={{width:"100%",marginTop:14}} onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

/* ══════ AIDES PAGE ══════ */
function AidesPage({ cafAids, db }) {
  const { aids, updateAid, totalAids } = cafAids;
  const [localVals, setLocalVals] = useState(() => Object.fromEntries(aids.map(a => [a.id, a.amount!=null?String(a.amount):""])));
  const netBudget = db.val && db.val > 0 ? db.val + totalAids : null;
  const cats = [...new Set(aids.map(a=>a.cat))];
  const openLink = useCallback(url => { if(url) try { window.open(url, "_blank", "noopener,noreferrer") } catch {} }, []);

  return(<div style={{paddingBottom:96}}>
    <div style={{background:"linear-gradient(135deg,#E2F5EA,#B8E8C8)",padding:"28px 18px 22px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-20,right:-20,width:120,height:120,borderRadius:"50%",background:"rgba(43,138,74,.1)"}}/>
      <p style={{fontSize:10.5,fontWeight:800,letterSpacing:1.8,color:"var(--gr)",textTransform:"uppercase",marginBottom:5}}>Revenus & Aides sociales</p>
      <h1 style={{fontFamily:"var(--fs)",fontSize:26,lineHeight:1.22,marginBottom:6}}>Aides CAF<br/><em>& Prestations</em></h1>
      <p style={{fontSize:11.5,color:"var(--g600)",lineHeight:1.6,marginBottom:14}}>Ces montants sont des <b>aides perçues</b> — pas des dépenses. Cliquez sur un montant pour le modifier.</p>
      <div style={{background:"rgba(255,255,255,.75)",borderRadius:"var(--r2)",padding:"13px 15px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <p style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:.8,color:"var(--gr)"}}>Total aides estimées</p>
          <p style={{fontSize:22,fontWeight:800,color:"var(--gr)"}}>{fmtEur(totalAids)}</p>
        </div>
        {netBudget&&(<div style={{padding:"8px 10px",background:"var(--gr-p)",borderRadius:"var(--r1)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><p style={{fontSize:10,fontWeight:700,color:"var(--gr)"}}>Budget effectif (déclaré + aides)</p>
              <p style={{fontSize:10,color:"var(--g400)"}}>{fmtEur(db.val)} + {fmtEur(totalAids)}</p></div>
            <p style={{fontSize:18,fontWeight:800,color:"var(--gr)"}}>{fmtEur(netBudget)}</p>
          </div>
        </div>)}
      </div>
    </div>
    <div style={{padding:"12px 15px 0"}}>
      <div style={{padding:"9px 12px",background:"var(--bl-p)",borderRadius:"var(--r1)",border:"1px solid rgba(90,144,200,.3)",marginBottom:12}}>
        <p style={{fontSize:11,color:"var(--bl)",lineHeight:1.6}}>ℹ️ <b>Montants variables selon vos revenus.</b> Utilisez les liens officiels pour simuler vos droits, puis saisissez les montants estimés dans les champs verts.</p>
      </div>
      {cats.map(cat=>{
        const catAids=aids.filter(a=>a.cat===cat);
        return(<div key={cat} style={{marginBottom:14}}>
          <p style={{fontSize:9.5,fontWeight:800,letterSpacing:1.2,color:"var(--g400)",textTransform:"uppercase",marginBottom:7}}>{cat}</p>
          {catAids.map(aid=>(
            <div key={aid.id} className="aid-row" style={{animation:"fU .3s both"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <span style={{fontSize:20,flexShrink:0,marginTop:1}}>{aid.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:13,fontWeight:600,color:"var(--g800)",marginBottom:2}}>{aid.label}</p>
                  <p style={{fontSize:10.5,color:"var(--g400)",lineHeight:1.4,marginBottom:6}}>{aid.note}</p>
                  {aid.url&&(<button className="link-btn" onClick={()=>openLink(aid.url)}>🔗 Consulter le site officiel</button>)}
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                  <label htmlFor={`aid-${aid.id}`} style={{fontSize:9,fontWeight:700,color:"var(--gr)",textTransform:"uppercase",letterSpacing:.5}}>Montant €</label>
                  <div style={{display:"flex",alignItems:"center",gap:3}}>
                    <span style={{fontSize:12,color:"var(--g300)"}}>€</span>
                    <input id={`aid-${aid.id}`} className="aid-inp" type="text" inputMode="decimal" value={localVals[aid.id]??""} placeholder="—"
                      aria-label={`Montant ${aid.label}`}
                      onChange={e=>{setLocalVals(p=>({...p,[aid.id]:e.target.value}));updateAid(aid.id,e.target.value)}}
                      onBlur={e=>{const n=parseAmt(e.target.value);if(n!=null)setLocalVals(p=>({...p,[aid.id]:String(n)}))}}/>
                  </div>
                  {typeof aid.amount==="number"&&aid.amount>0&&<span style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:"var(--gr-p)",color:"var(--gr)",fontWeight:800}}>+{fmtEur(aid.amount)}</span>}
                  {typeof aid.amount==="number"&&aid.amount===0&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:99,background:"var(--aq-p)",color:"var(--aq)",fontWeight:700}}>Gratuit</span>}
                </div>
              </div>
            </div>
          ))}
        </div>);
      })}
      <div style={{padding:"14px 16px",background:"var(--gr-p)",borderRadius:"var(--r2)",border:"2px solid rgba(43,138,74,.3)",marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:db.val?8:0}}>
          <div><p style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:.8,color:"var(--gr)"}}>Total aides CAF estimées</p></div>
          <p style={{fontSize:24,fontWeight:800,color:"var(--gr)"}}>{fmtEur(totalAids)}</p>
        </div>
        {db.val&&db.val>0&&(<div style={{paddingTop:8,borderTop:"1px solid rgba(43,138,74,.2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <p style={{fontSize:11,color:"var(--gr)",fontWeight:700}}>Budget effectif (budget + aides)</p>
          <p style={{fontSize:16,fontWeight:800,color:"var(--gr)"}}>{fmtEur(db.val+totalAids)}</p>
        </div>)}
        {!db.val&&<p style={{fontSize:10.5,color:"var(--g400)",marginTop:4}}>💡 Saisissez votre budget sur l'Accueil pour voir le budget effectif.</p>}
      </div>
    </div>
  </div>);
}

/* ══════ CLINIC PAGE ══════ */
function ClinicPage({db,family,autoOpenCat,clearAutoOpen}){
  const{nbChildren,children}=family;
  const cl=useCL("cl6",CLINIC_CATS,nbChildren);
  const[add,setAdd]=useState(null),[open,setOpen]=useState(null),[editItem,setEI]=useState(null);
  const{toasts,push}=useToast();
  useEffect(()=>{if(autoOpenCat){setOpen(autoOpenCat);clearAutoOpen?.();setTimeout(()=>document.getElementById(`cat-${autoOpenCat}`)?.scrollIntoView({behavior:"smooth"}),150)}},[autoOpenCat]);
  function handleSave(id,fields){const r=cl.editItem(id,fields);if(r.ok){push(`Mis à jour : ${r.data.text}`);setEI(null)}else push(r.error.message,"error")}
  const childrenLabel=children.map(c=>c.prenom||"Bébé").join(" & ")||"Bébé(s)";
  return(<div style={{paddingBottom:96}}>
    <div style={{background:"linear-gradient(135deg,#D8F2F3,#FFF0E9)",padding:"28px 18px 22px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-28,right:-18,width:120,height:120,borderRadius:"50%",background:"rgba(91,190,194,.13)"}}/>
      <p style={{fontSize:10.5,fontWeight:800,letterSpacing:1.8,color:"var(--aq)",textTransform:"uppercase",marginBottom:5}}>CHU Toulouse</p>
      <h1 style={{fontFamily:"var(--fs)",fontSize:26,lineHeight:1.22,marginBottom:13}}>Valise de<br/><em>Maternité</em></h1>
      <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:14}}>
        <div style={{position:"relative"}}><Ring pct={cl.stats.pct} size={52} color="#5BBEC2"/>
          <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"var(--aq)"}}>{cl.stats.pct}%</span></div>
        <div><p style={{fontSize:17,fontWeight:800}}>{cl.stats.done}/{cl.stats.total}</p><p style={{fontSize:11.5,color:"var(--g600)"}}>pour {childrenLabel}</p></div>
        {cl.grandTotal>0&&<div style={{marginLeft:"auto",textAlign:"right"}}>
          <p style={{fontSize:9,color:"var(--g600)",fontWeight:700,textTransform:"uppercase"}}>Valeur totale</p>
          <p style={{fontSize:12,fontWeight:700,color:"var(--g600)",textDecoration:cl.grandToBuy<cl.grandTotal?"line-through":"none"}}>{fmtEur(cl.grandTotal)}</p>
          {cl.grandToBuy<cl.grandTotal&&<p style={{fontSize:9,color:"var(--gr)",fontWeight:700}}>📦 {fmtEur(cl.grandTotal-cl.grandToBuy)} stock</p>}
          <p style={{fontSize:9,color:"var(--aq)",fontWeight:700,textTransform:"uppercase",marginTop:3}}>À acheter</p>
          <p style={{fontSize:15,fontWeight:800,color:"var(--aq)"}}>{fmtEur(cl.grandToBuy)}</p>
        </div>}
      </div>
      <DeclaredBudgetField db={db} label="Budget déclaré (Valise + Maison)" onDark/>
      {cl.stats.pct===100&&<div style={{marginTop:10,padding:"9px 13px",background:"rgba(91,190,194,.22)",borderRadius:"var(--r1)",fontSize:13,fontWeight:600,color:"#186068"}}>🎉 Valise prête !</div>}
    </div>
    <div style={{margin:"12px 15px 0",padding:"9px 12px",background:"rgba(91,190,194,.1)",borderRadius:"var(--r1)",border:"1px solid rgba(91,190,194,.25)"}}>
      <p style={{fontSize:11,color:"#186068",lineHeight:1.6}}>📋 <b>CHU Toulouse :</b> Sac séparé salle de naissance — 1 seul sac petite taille accepté dans le bloc.</p>
    </div>
    <div style={{padding:"12px 15px 0"}}>
      {CLINIC_CATS.map((cat,ci)=>{
        const allItems=[...cat.items,...cl.cx.filter(x=>x.cid===cat.id)];
        const done=allItems.filter(i=>cl.ck[i.id]).length,pct=allItems.length?Math.round((done/allItems.length)*100):0;
        const catTotal=cl.catTotals[cat.id]??0,catBuy=cl.catToBuy[cat.id]??0,isO=open===cat.id;
        return(<div key={cat.id} id={`cat-${cat.id}`} style={{marginBottom:9,borderRadius:"var(--r2)",overflow:"hidden",border:"1.5px solid var(--g200)",background:"var(--wh)",boxShadow:"var(--sh1)",animation:`fU .36s ${ci*.05}s both`}}>
          <div style={{padding:"12px 14px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",background:isO?`${cat.color}10`:"var(--wh)"}} onClick={()=>setOpen(isO?null:cat.id)}>
            <span style={{fontSize:18}}>{cat.emoji}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
                  <span style={{fontWeight:600,fontSize:13}}>{cat.label}</span>
                  {catBuy>0&&<span style={{fontSize:10,padding:"1px 8px",borderRadius:99,background:"var(--sa-p)",color:"#2B6650",fontWeight:800}}>{fmtEur(catBuy)}</span>}
                </div>
                <span style={{fontSize:11,color:"var(--g400)",fontWeight:700}}>{done}/{allItems.length}</span>
              </div>
              <div className="pt"><div className="pf" style={{width:`${pct}%`,background:cat.color}}/></div>
            </div>
            <span style={{fontSize:16,color:"var(--g400)",transform:isO?"rotate(180deg)":"none",transition:".16s"}}>⌄</span>
          </div>
          {isO&&(<div style={{padding:"0 14px 14px",display:"flex",flexDirection:"column",gap:6}}>
            {catTotal>0&&<div style={{padding:"7px 11px",background:"var(--sa-p)",borderRadius:"var(--r1)",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
              <span style={{fontSize:11,color:"#2B6650",fontWeight:700}}>💶 {cat.label}</span>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                {catTotal>catBuy&&<span style={{fontSize:10,color:"var(--g400)",textDecoration:"line-through"}}>{fmtEur(catTotal)}</span>}
                {catTotal>catBuy&&<span style={{fontSize:9,color:"var(--gr)",fontWeight:700}}>📦 {fmtEur(catTotal-catBuy)}</span>}
                <span style={{fontSize:14,fontWeight:800,color:"#2B6650"}}>{fmtEur(catBuy)}</span>
              </div>
            </div>}
            {allItems.map(item=>(<ItemCard key={item.id} item={cl.res(item)} checked={!!cl.ck[item.id]} onToggle={cl.toggle} showP nbChildren={nbChildren} onEdit={i=>setEI(cl.res(i))} onRemove={cl.cx.find(x=>x.id===item.id)?cl.removeCx:null}/>))}
            <button className="btn bs" style={{marginTop:2,fontSize:12}} onClick={()=>setAdd({cid:cat.id,cl:cat.label})}>+ Ajouter un article</button>
          </div>)}
        </div>);
      })}
    </div>
    {add&&<AddModal cid={add.cid} clabel={add.cl} onAdd={cl.addCx} onClose={()=>setAdd(null)}/>}
    {editItem&&<EditModal item={editItem} onSave={handleSave} onClose={()=>setEI(null)}/>}
    <Toasts toasts={toasts}/>
  </div>);
}

/* ══════ HOME PAGE ══════ */
function HomePage({db,family,autoOpenCat,clearAutoOpen}){
  const{nbChildren,children}=family;
  const home=useCL("hm6",HOME_CATS,nbChildren);
  const[add,setAdd]=useState(null),[open,setOpen]=useState(null);
  const[filter,setFilter]=useState("all"),[showP,setShowP]=useState(true);
  const[editItem,setEI]=useState(null);
  const{toasts,push}=useToast();
  const childrenLabel=children.map(c=>c.prenom||"Bébé").join(" & ")||"Bébé(s)";
  useEffect(()=>{if(autoOpenCat){setOpen(autoOpenCat);clearAutoOpen?.();setTimeout(()=>document.getElementById(`hcat-${autoOpenCat}`)?.scrollIntoView({behavior:"smooth"}),150)}},[autoOpenCat]);
  function handleSave(id,fields){const r=home.editItem(id,fields);if(r.ok){push(`Mis à jour : ${r.data.text}`);setEI(null)}else push(r.error.message,"error")}
  const stockSaving=home.grandTotal-home.grandToBuy;
  return(<div style={{paddingBottom:96}}>
    <div style={{background:"linear-gradient(135deg,#FFF0E9,#D8F2F3)",padding:"28px 18px 22px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-18,right:18,width:100,height:100,borderRadius:"50%",background:"rgba(240,158,114,.17)"}}/>
      <p style={{fontSize:10.5,fontWeight:800,letterSpacing:1.8,color:"var(--pe)",textTransform:"uppercase",marginBottom:5}}>Essentiels · {APP_V}</p>
      <h1 style={{fontFamily:"var(--fs)",fontSize:26,lineHeight:1.22,marginBottom:13}}>Maison<br/><em>pour {childrenLabel}</em></h1>
      <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:14}}>
        <div style={{position:"relative"}}><Ring pct={home.stats.pct} size={52} color="#F09E72"/>
          <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"var(--pe)"}}>{home.stats.pct}%</span></div>
        <div><p style={{fontSize:17,fontWeight:800}}>{home.stats.done}/{home.stats.total}</p><p style={{fontSize:11.5,color:"var(--g600)"}}>articles acquis</p></div>
        {home.grandTotal>0&&<div style={{marginLeft:"auto",textAlign:"right"}}>
          <p style={{fontSize:9,color:"var(--g600)",fontWeight:700,textTransform:"uppercase"}}>Valeur totale</p>
          <p style={{fontSize:12,fontWeight:700,color:"var(--g600)",textDecoration:stockSaving>0?"line-through":"none"}}>{fmtEur(home.grandTotal)}</p>
          {stockSaving>0&&<p style={{fontSize:9,color:"var(--gr)",fontWeight:700}}>📦 {fmtEur(stockSaving)} stock</p>}
          <p style={{fontSize:9,color:"var(--pe)",fontWeight:700,textTransform:"uppercase",marginTop:3}}>À acheter</p>
          <p style={{fontSize:15,fontWeight:800,color:"var(--pe)"}}>{fmtEur(home.grandToBuy)}</p>
        </div>}
      </div>
      <DeclaredBudgetField db={db} label="Budget déclaré (Valise + Maison)" onDark/>
    </div>
    <div style={{display:"flex",gap:6,padding:"11px 15px 0",overflowX:"auto"}}>
      {[{k:"all",l:"Tout"},{k:"high",l:"🔴 Priorité"},{k:"pending",l:"⬜ À acquérir"},{k:"price",l:"💶 Avec prix"},{k:"stock",l:"📦 En stock"},{k:"warn",l:"⚠️ Alertes"}].map(f=>(
        <button key={f.k} onClick={()=>setFilter(f.k)} style={{padding:"5px 11px",borderRadius:99,border:"1.5px solid",fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,borderColor:filter===f.k?"var(--pe)":"var(--g200)",background:filter===f.k?"var(--pe-p)":"var(--wh)",color:filter===f.k?"var(--pe)":"var(--g600)"}}>
          {f.l}
        </button>
      ))}
      <button onClick={()=>setShowP(p=>!p)} style={{padding:"5px 11px",borderRadius:99,border:"1.5px solid var(--g200)",fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,background:"var(--wh)",color:"var(--g600)"}}>{showP?"Masquer prix":"Voir prix"}</button>
    </div>
    <div style={{padding:"11px 15px 0"}}>
      {HOME_CATS.map((cat,ci)=>{
        let items=[...cat.items,...home.cx.filter(x=>x.cid===cat.id)];
        if(filter==="high") items=items.filter(i=>i.priority==="high");
        if(filter==="pending") items=items.filter(i=>!home.ck[i.id]&&!i.isPlaceholder);
        if(filter==="price") items=items.filter(i=>i.price!=null);
        if(filter==="stock") items=items.filter(i=>(i.stock||0)>0);
        if(filter==="warn") items=items.filter(i=>i.missingPrice||i.isPlaceholder);
        if(items.length===0)return null;
        const real=items.filter(i=>!i.isPlaceholder),done=real.filter(i=>home.ck[i.id]).length;
        const pct=real.length?Math.round((done/real.length)*100):0;
        const catTotal=home.catTotals[cat.id]??0,catBuy=home.catToBuy[cat.id]??0;
        const sharePct=home.grandTotal>0?Math.round((catTotal/home.grandTotal)*100):0;
        const budgetPct=db.val&&db.val>0?Math.round((catBuy/db.val)*100):null;
        const isO=open===cat.id;
        return(<div key={cat.id} id={`hcat-${cat.id}`} style={{marginBottom:9,borderRadius:"var(--r2)",overflow:"hidden",border:"1.5px solid var(--g200)",background:"var(--wh)",boxShadow:"var(--sh1)",animation:`fU .36s ${ci*.045}s both`}}>
          <div style={{padding:"12px 14px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",background:isO?`${cat.color}0F`:"var(--wh)"}} onClick={()=>setOpen(isO?null:cat.id)}>
            <span style={{fontSize:18}}>{cat.emoji}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap",minWidth:0}}>
                  <span style={{fontWeight:600,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{cat.label}</span>
                  {catBuy>0&&<span style={{fontSize:10,padding:"1px 7px",borderRadius:99,fontWeight:800,background:"var(--sa-p)",color:"#2B6650"}}>{fmtEur(catBuy)}</span>}
                  {catBuy<catTotal&&catTotal>0&&<span className="tag t-stk">📦</span>}
                  {sharePct>0&&<span style={{fontSize:10,padding:"1px 7px",borderRadius:99,fontWeight:800,background:sharePct>30?"var(--rd-p)":sharePct>20?"var(--am-p)":"var(--g100)",color:sharePct>30?"var(--rd)":sharePct>20?"var(--am)":"var(--g600)"}}>{sharePct}%</span>}
                  {budgetPct!=null&&<span style={{fontSize:10,padding:"1px 7px",borderRadius:99,fontWeight:800,background:"var(--aq-p)",color:"var(--aq)"}}>{budgetPct}% budget</span>}
                </div>
                <span style={{fontSize:10.5,color:"var(--g400)",fontWeight:700,flexShrink:0,marginLeft:4}}>{done}/{real.length}</span>
              </div>
              <div className="pt"><div className="pf" style={{width:`${pct}%`,background:cat.color}}/></div>
            </div>
            <span style={{fontSize:16,color:"var(--g400)",transform:isO?"rotate(180deg)":"none",transition:".16s"}}>⌄</span>
          </div>
          {isO&&(<div style={{padding:"0 14px 14px",display:"flex",flexDirection:"column",gap:6}}>
            {catBuy>0&&<div style={{padding:"8px 11px",background:"var(--sa-p)",borderRadius:"var(--r1)",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
              <span style={{fontSize:11.5,fontWeight:700,color:"#2B6650"}}>💶 {cat.label} — À acheter</span>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                {catBuy<catTotal&&<span style={{fontSize:10,color:"var(--g400)",textDecoration:"line-through"}}>{fmtEur(catTotal)}</span>}
                <span style={{fontSize:14,fontWeight:800,color:"#2B6650"}}>{fmtEur(catBuy)}</span>
              </div>
            </div>}
            {items.map(item=>(<ItemCard key={item.id} item={home.res(item)} checked={!!home.ck[item.id]} onToggle={home.toggle} showP={showP} nbChildren={nbChildren} onEdit={i=>setEI(home.res(i))} onRemove={home.cx.find(x=>x.id===item.id)?home.removeCx:null}/>))}
            <button className="btn bs" style={{marginTop:2,fontSize:12}} onClick={()=>setAdd({cid:cat.id,cl:cat.label})}>+ Ajouter un article</button>
          </div>)}
        </div>);
      })}
    </div>
    {add&&<AddModal cid={add.cid} clabel={add.cl} onAdd={home.addCx} onClose={()=>setAdd(null)}/>}
    {editItem&&<EditModal item={editItem} onSave={handleSave} onClose={()=>setEI(null)}/>}
    <Toasts toasts={toasts}/>
  </div>);
}

/* ══════ TRACKER ══════ */
const FT=["Sein G","Sein D","Biberon","Mixte"],DT=["Pipi 🌊","Selle 💩","Mixte 💦"];
function TrackerPage({family}){
  const BB=family.children.map((c,i)=>c.prenom||`Bébé ${i+1}`);
  const[logs,setLogs]=useState(()=>{try{return JSON.parse(localStorage.getItem("tl6")||"[]")}catch{return[]}});
  const[modal,setM]=useState(null),[form,setF]=useState({});
  const today=new Date().toISOString().split("T")[0];
  const todayStr=new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"});
  const tl=logs.filter(l=>l.date===today);
  const save=nl=>{setLogs(nl);localStorage.setItem("tl6",JSON.stringify(nl))};
  const addLog=(type,baby,data)=>{save([{id:Date.now(),date:today,time:new Date().toTimeString().slice(0,5),type,baby,...data},...logs].slice(0,600));setM(null);setF({})};
  const COLORS=["var(--aq)","var(--pe)","var(--sa)","var(--vi)","var(--am)","var(--bl)"];
  const bc=b=>COLORS[BB.indexOf(b)%COLORS.length];
  const te=t=>t==="feed"?"🍼":t==="diaper"?"🩲":"💤";
  const tl2=t=>t==="feed"?"Repas":t==="diaper"?"Change":"Sommeil";
  const stats=BB.map(baby=>({baby,feeds:tl.filter(l=>l.baby===baby&&l.type==="feed").length,diapers:tl.filter(l=>l.baby===baby&&l.type==="diaper").length,sleepMin:tl.filter(l=>l.baby===baby&&l.type==="sleep"&&l.duration).reduce((a,l)=>a+parseInt(l.duration||0),0)}));
  return(<div style={{paddingBottom:96}}>
    <div style={{background:"linear-gradient(135deg,#E6F4EE,#FFF0E9,#D8F2F3)",padding:"30px 18px 26px"}}>
      <p style={{fontSize:10.5,fontWeight:800,letterSpacing:1.8,color:"var(--sa)",textTransform:"uppercase",marginBottom:5}}>Journal quotidien</p>
      <h1 style={{fontFamily:"var(--fs)",fontSize:26,lineHeight:1.22,marginBottom:3}}>Suivi de<br/><em>{BB.join(" & ")}</em></h1>
      <p style={{fontSize:12,color:"var(--g600)",textTransform:"capitalize"}}>{todayStr}</p>
    </div>
    <div style={{padding:"12px 15px 0",display:"grid",gridTemplateColumns:BB.length>2?"1fr 1fr 1fr":"1fr 1fr",gap:9}}>
      {stats.map(s=>(<div key={s.baby} style={{background:"var(--wh)",borderRadius:"var(--r2)",padding:"12px 13px",border:`2px solid ${bc(s.baby)}20`,boxShadow:"var(--sh1)"}}>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:9}}><div style={{width:7,height:7,borderRadius:"50%",background:bc(s.baby)}}/>
          <span style={{fontSize:12.5,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.baby}</span></div>
        {[["🍼","Repas",s.feeds],["🩲","Changes",s.diapers],["💤","Sommeil",s.sleepMin?`${s.sleepMin}min`:"—"]].map(([e,l,v])=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}><span style={{color:"var(--g600)"}}>{e} {l}</span><b>{v}</b></div>
        ))}
      </div>))}
    </div>
    <div style={{padding:"12px 15px 0"}}>
      <p style={{fontSize:10,fontWeight:800,letterSpacing:1.3,color:"var(--g400)",textTransform:"uppercase",marginBottom:9}}>Enregistrer rapidement</p>
      <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(BB.length*3,6)},1fr)`,gap:6}}>
        {BB.flatMap(baby=>["feed","diaper","sleep"].map(type=>(
          <button key={`${baby}-${type}`} className="btn bs" style={{flexDirection:"column",padding:"8px 3px",gap:3,fontSize:9.5,borderColor:`${bc(baby)}40`}} onClick={()=>{setM({type,baby});setF({})}}>
            <span style={{fontSize:16}}>{te(type)}</span>
            <span style={{color:bc(baby),fontWeight:800,fontSize:8.5,overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"}}>{baby.split(" ")[0]}</span>
            <span style={{color:"var(--g600)"}}>{tl2(type)}</span>
          </button>
        )))}
      </div>
    </div>
    <div style={{padding:"12px 15px 0"}}>
      <p style={{fontSize:10,fontWeight:800,letterSpacing:1.3,color:"var(--g400)",textTransform:"uppercase",marginBottom:9}}>Aujourd'hui ({tl.length})</p>
      {tl.length===0?(<div style={{textAlign:"center",padding:"28px 0",color:"var(--g400)"}}><div style={{fontSize:32,marginBottom:7}}>👶</div><p style={{fontSize:13}}>Aucune entrée</p></div>):(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {tl.map(log=>(<div key={log.id} style={{background:"var(--wh)",borderRadius:"var(--r1)",padding:"10px 12px",border:"1.5px solid var(--g200)",display:"flex",alignItems:"center",gap:10,animation:"fU .26s both"}}>
            <span style={{fontSize:17}}>{te(log.type)}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:10,fontWeight:800,padding:"1px 6px",borderRadius:99,background:`${bc(log.baby)}18`,color:bc(log.baby)}}>{log.baby}</span>
                <span style={{fontSize:12.5,fontWeight:600}}>{tl2(log.type)}</span>
                {log.subtype&&<span style={{fontSize:11,color:"var(--g400)"}}>{log.subtype}</span>}
                {log.duration&&<span style={{fontSize:11,color:"var(--g400)"}}>{log.duration}min</span>}
              </div>
              {log.notes&&<p style={{fontSize:11,color:"var(--g400)",marginTop:2}}>{log.notes}</p>}
            </div>
            <span style={{fontSize:11,color:"var(--g400)"}}>{log.time}</span>
            <button className="btn bg" style={{padding:"1px 4px",fontSize:14,color:"var(--g300)"}} onClick={()=>save(logs.filter(l=>l.id!==log.id))}>×</button>
          </div>))}
        </div>
      )}
    </div>
    {modal&&(<div className="mbd" style={{animation:"fI .26s ease forwards"}} onClick={()=>setM(null)}>
      <div className="msh" style={{animation:"sU .36s cubic-bezier(.22,1,.36,1) forwards"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h3 style={{fontFamily:"var(--fs)",fontSize:19}}>{te(modal.type)} {tl2(modal.type)} — {modal.baby}</h3>
          <button className="btn bg" onClick={()=>setM(null)} style={{fontSize:21,padding:"0 4px"}}>×</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {modal.type==="feed"&&<div><label style={{fontSize:11.5,fontWeight:700,color:"var(--g600)",display:"block",marginBottom:6}}>Type de repas</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{FT.map(t=><button key={t} onClick={()=>setF(f=>({...f,subtype:t}))} style={{padding:"6px 12px",borderRadius:99,border:"1.5px solid",fontSize:12.5,cursor:"pointer",fontWeight:600,borderColor:form.subtype===t?"var(--aq)":"var(--g200)",background:form.subtype===t?"var(--aq-p)":"var(--wh)",color:form.subtype===t?"var(--aq)":"var(--g600)"}}>{t}</button>)}</div></div>}
          {modal.type==="diaper"&&<div><label style={{fontSize:11.5,fontWeight:700,color:"var(--g600)",display:"block",marginBottom:6}}>Type de change</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{DT.map(t=><button key={t} onClick={()=>setF(f=>({...f,subtype:t}))} style={{padding:"6px 12px",borderRadius:99,border:"1.5px solid",fontSize:12.5,cursor:"pointer",fontWeight:600,borderColor:form.subtype===t?"var(--pe)":"var(--g200)",background:form.subtype===t?"var(--pe-p)":"var(--wh)",color:form.subtype===t?"var(--pe)":"var(--g600)"}}>{t}</button>)}</div></div>}
          {modal.type==="sleep"&&<div><label style={{fontSize:11.5,fontWeight:700,color:"var(--g600)",display:"block",marginBottom:6}}>Durée (minutes)</label>
            <input className="inp" type="number" min={1} placeholder="Ex : 45" value={form.duration||""} onChange={e=>setF(f=>({...f,duration:e.target.value}))} style={{width:130}}/></div>}
          <div><label style={{fontSize:11.5,fontWeight:700,color:"var(--g600)",display:"block",marginBottom:6}}>Note (optionnel)</label>
            <input className="inp" placeholder="Observations…" value={form.notes||""} onChange={e=>setF(f=>({...f,notes:e.target.value}))}/></div>
          <button className="btn bp" onClick={()=>addLog(modal.type,modal.baby,form)}>Enregistrer</button>
        </div>
      </div>
    </div>)}
  </div>);
}

/* ══════ DASHBOARD ══════ */
function DashPage({setTab,db,cafAids,family,navigateTo,setFamilyOpen,setExportOpen}){
  const{nbChildren,children}=family;
  const cl  =useCL("cl6",CLINIC_CATS,nbChildren);
  const home=useCL("hm6",HOME_CATS,nbChildren);
  const totalToBuy=home.grandToBuy+cl.grandToBuy,totalValue=home.grandTotal+cl.grandTotal;
  const urgents=useMemo(()=>[
    ...CLINIC_CATS.flatMap(c=>c.items.filter(i=>i.priority==="high"&&!cl.ck[i.id]&&!i.isPlaceholder&&i.urgent).map(i=>({...i,catId:c.id,catEmoji:c.emoji,tabTarget:"clinic"}))),
    ...HOME_CATS.flatMap(c=>c.items.filter(i=>i.priority==="high"&&!home.ck[i.id]&&!i.isPlaceholder&&i.urgent).map(i=>({...i,catId:c.id,catEmoji:c.emoji,tabTarget:"home"}))),
  ].slice(0,6),[cl.ck,home.ck]);
  const childrenLabel=children.map(c=>c.prenom||"Bébé").join(" & ")||"Bébé(s)";
  const firstExpected=children.find(c=>c.ddn_prevue)?.ddn_prevue;
  return(<div style={{paddingBottom:96}}>
    <div style={{background:"linear-gradient(140deg,#5BBEC2,#7DAF9E,#F09E72)",padding:"32px 18px 24px",position:"relative",overflow:"hidden"}}>
      {[{w:85,t:"6%",l:"70%"},{w:50,t:"52%",l:"87%"},{w:120,t:"-10%",l:"60%"}].map((b,i)=>(
        <div key={i} style={{position:"absolute",borderRadius:"50%",width:b.w,height:b.w,top:b.t,left:b.l,background:"rgba(255,255,255,.09)"}}/>
      ))}
      <p style={{fontSize:10.5,fontWeight:800,letterSpacing:2,color:"rgba(255,255,255,.78)",textTransform:"uppercase",marginBottom:6}}>Bonjour 👋</p>
      <h1 style={{fontFamily:"var(--fs)",fontSize:28,color:"var(--wh)",lineHeight:1.2,marginBottom:14}}>Baby<br/><em>Essentials</em></h1>
      <div className="fam-card" style={{marginBottom:14}} onClick={()=>setFamilyOpen(true)}>
        <span style={{fontSize:22}}>{nbChildren>1?"👨‍👩‍👧‍👦":"👶"}</span>
        <div style={{flex:1,minWidth:0}}>
          <p style={{fontSize:12.5,fontWeight:800,color:"var(--wh)",marginBottom:3}}>{childrenLabel||"Complétez la fiche famille →"}</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {nbChildren>1&&<span className="child-chip">{nbChildren} enfants</span>}
            {firstExpected&&<span className="child-chip">📅 {fmtDate(firstExpected)}</span>}
            {children.filter(c=>c.carnet).length>0&&<span className="child-chip">📒 Carnet</span>}
            {!childrenLabel.trim()&&<span className="child-chip">Appuyer pour renseigner</span>}
          </div>
        </div>
        <span style={{fontSize:14,color:"rgba(255,255,255,.6)"}}>✏</span>
      </div>
      <DeclaredBudgetField db={db} label="Budget que vous êtes prêts à allouer" onDark/>
    </div>
    <div style={{padding:"12px 15px 0"}}><EcartCard declaredBudget={db.val} totalToBuy={totalToBuy} totalValue={totalValue} totalCAFAids={cafAids.totalAids}/></div>
    <div style={{margin:"10px 15px 0"}}>
      <button onClick={()=>setTab("aides")} style={{width:"100%",padding:"11px 14px",background:"var(--gr-p)",border:"1.5px solid rgba(43,138,74,.3)",borderRadius:"var(--r2)",cursor:"pointer",display:"flex",alignItems:"center",gap:10,textAlign:"left",transition:"all .16s"}}>
        <span style={{fontSize:20}}>💰</span>
        <div style={{flex:1}}><p style={{fontSize:12,fontWeight:700,color:"var(--gr)"}}>Aides CAF & Prestations sociales</p>
          <p style={{fontSize:10.5,color:"var(--g600)",marginTop:1}}>{cafAids.totalAids>0?`${fmtEur(cafAids.totalAids)} d'aides estimées → budget effectif : ${fmtEur((db.val||0)+cafAids.totalAids)}`:"Saisissez vos aides pour voir votre budget effectif →"}</p></div>
        <span style={{fontSize:14,color:"var(--gr)"}}>→</span>
      </button>
    </div>
    <div style={{padding:"12px 15px 0"}}>
      <p style={{fontSize:10,fontWeight:800,letterSpacing:1.5,color:"var(--g400)",textTransform:"uppercase",marginBottom:9}}>Avancement</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
        {[{l:"Valise maternité",pct:cl.stats.pct,done:cl.stats.done,total:cl.stats.total,color:"#5BBEC2",e:"🧳",tab:"clinic",toBuy:cl.grandToBuy,value:cl.grandTotal},
          {l:"Essentiels maison",pct:home.stats.pct,done:home.stats.done,total:home.stats.total,color:"#F09E72",e:"🏠",tab:"home",toBuy:home.grandToBuy,value:home.grandTotal}].map(card=>(
          <div key={card.tab} onClick={()=>setTab(card.tab)} style={{background:"var(--wh)",borderRadius:"var(--r2)",padding:"14px",boxShadow:"var(--sh1)",border:"1.5px solid var(--g200)",cursor:"pointer",transition:".16s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=card.color;e.currentTarget.style.transform="translateY(-2px)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--g200)";e.currentTarget.style.transform="translateY(0)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <span style={{fontSize:21}}>{card.e}</span>
              <div style={{position:"relative"}}><Ring pct={card.pct} size={40} color={card.color}/>
                <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:card.color}}>{card.pct}%</span></div>
            </div>
            <p style={{fontSize:12.5,fontWeight:700,marginBottom:2}}>{card.l}</p>
            <p style={{fontSize:11,color:"var(--g400)",marginBottom:4}}>{card.done}/{card.total} articles</p>
            {card.value>0&&(
              <div style={{background:"var(--g50)",borderRadius:"var(--r1)",padding:"6px 8px",fontSize:10.5}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                  <span style={{color:"var(--g400)"}}>Valeur totale</span>
                  <span style={{fontWeight:700,color:"var(--g600)",textDecoration:card.value>card.toBuy?"line-through":"none"}}>{fmtEur(card.value)}</span>
                </div>
                {card.value>card.toBuy&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                  <span style={{color:"var(--gr)"}}>📦 En stock</span>
                  <span style={{fontWeight:700,color:"var(--gr)"}}>{fmtEur(card.value-card.toBuy)}</span>
                </div>}
                <div style={{display:"flex",justifyContent:"space-between",paddingTop:3,borderTop:"1px solid var(--g200)",marginTop:1}}>
                  <span style={{fontWeight:700,color:card.color}}>À acheter</span>
                  <span style={{fontWeight:800,color:card.color}}>{fmtEur(card.toBuy)}</span>
                </div>
                {db.val&&card.toBuy>0&&<div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                  <span style={{color:"var(--g400)"}}>% du budget</span>
                  <span style={{fontWeight:700,color:"var(--g400)"}}>{Math.round((card.toBuy/db.val)*100)}%</span>
                </div>}
              </div>
            )}
            <div className="pt" style={{marginTop:7}}><div className="pf" style={{width:`${card.pct}%`,background:card.color}}/></div>
          </div>
        ))}
      </div>
    </div>
    {urgents.length>0&&(<div style={{padding:"12px 15px 0"}}>
      <p style={{fontSize:10,fontWeight:800,letterSpacing:1.3,color:"var(--g400)",textTransform:"uppercase",marginBottom:9}}>🚨 Urgent — Cliquez pour accéder</p>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {urgents.map(item=>(
          <button key={item.id} className="urgent-item" onClick={()=>navigateTo(item.tabTarget,item.catId)}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"var(--rd)",flexShrink:0,animation:"pls 1.5s infinite"}}/>
            <span style={{fontSize:17,flexShrink:0}}>{item.catEmoji}</span>
            <div style={{flex:1,minWidth:0}}>
              <p style={{fontSize:12.5,fontWeight:600}}>{item.text}</p>
              <p style={{fontSize:10.5,color:"var(--g600)",marginTop:1}}>{item.tabTarget==="home"?"🏠 Maison":"🧳 Valise"}{item.store&&` · 🏪 ${item.store}`}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0}}>
              {item.price&&effQty(item,nbChildren)&&<span style={{fontSize:11,fontWeight:800,color:"var(--g600)"}}>{fmtEur(item.price*effQty(item,nbChildren))}</span>}
              <span style={{fontSize:10,color:"var(--aq)",fontWeight:700}}>Voir →</span>
            </div>
          </button>
        ))}
      </div>
    </div>)}
    {/* Quick access — 6 items in 3×2 */}
    <div style={{padding:"12px 15px 0"}}>
      <p style={{fontSize:10,fontWeight:800,letterSpacing:1.3,color:"var(--g400)",textTransform:"uppercase",marginBottom:9}}>Accès rapide</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
        {[
          {e:"👨‍👩‍👧",l:"Famille",fn:()=>setFamilyOpen(true),bg:"var(--pu-p)",c:"var(--pu)"},
          {e:"💰",l:"Aides CAF",fn:()=>setTab("aides"),bg:"var(--gr-p)",c:"var(--gr)"},
          {e:"🧳",l:"Valise",fn:()=>setTab("clinic"),bg:"var(--aq-p)",c:"var(--aq)"},
          {e:"🏠",l:"Maison",fn:()=>setTab("home"),bg:"var(--pe-p)",c:"var(--pe)"},
          {e:"📊",l:"Journal",fn:()=>setTab("tracker"),bg:"var(--sa-p)",c:"var(--sa)"},
          {e:"📤",l:"Exporter",fn:()=>setExportOpen(true),bg:"#EDE7F6",c:"var(--pu)"},
        ].map(a=>(
          <button key={a.l} onClick={a.fn} style={{background:a.bg,border:"none",borderRadius:"var(--r2)",padding:"14px 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,transition:"all .14s"}}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            <span style={{fontSize:22}}>{a.e}</span>
            <span style={{fontSize:10,fontWeight:800,color:a.c}}>{a.l}</span>
          </button>
        ))}
      </div>
    </div>
  </div>);
}

/* ══════ ROOT ══════ */
const TABS=[{id:"dashboard",l:"Accueil",e:"🏡"},{id:"aides",l:"Aides",e:"💰"},{id:"clinic",l:"Valise",e:"🧳"},{id:"home",l:"Maison",e:"🏠"},{id:"tracker",l:"Journal",e:"📊"}];

export default function App(){
  const auth = useAuth();

  /* Si pas encore de session → écran d'accueil */
  if (!auth.session) return (<><G/><WelcomeScreen auth={auth}/></>);

  return <MainApp auth={auth}/>;
}

/* ── Application principale (rendue seulement si session active) ── */
function MainApp({ auth }) {
  const { session, syncStatus, syncMsg, manualSync } = auth;
  const isGuest   = session?.mode === 'guest';
  const isAccount = session?.mode === 'account';

  const[tab,setTab]=useState("dashboard");
  const db=useDeclaredBudget();
  const cafAids=useCAFAids();
  const family=useFamily();
  const[familyOpen,setFamilyOpen]=useState(false);
  const[exportOpen,setExportOpen]=useState(false);
  const[accountOpen,setAccountOpen]=useState(false);
  const[dataOpen,setDataOpen]=useState(false);
  const[autoOpenCats,setAutoOpenCats]=useState({});

  /* Pont window → AccountModal "Mes données" */
  useEffect(()=>{
    window._openDataModal = () => setDataOpen(true);
    return () => { delete window._openDataModal; };
  },[]);
  const navigateTo=useCallback((tabId,catId)=>{setTab(tabId);if(catId)setAutoOpenCats(p=>({...p,[tabId]:catId}))},[]);
  const clearAutoOpen=useCallback(tabId=>setAutoOpenCats(p=>({...p,[tabId]:null})),[]);

  /* Sync vers cloud à chaque changement de tab (heuristique légère) */
  useEffect(()=>{
    if (isAccount) manualSync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tab]);

  return(<>
    <G/>
    <div className="grain" style={{minHeight:"100vh",maxWidth:480,margin:"0 auto",position:"relative"}}>

      {/* ── Bannière invité ── */}
      {isGuest&&(
        <div style={{background:"var(--am-p)",borderBottom:"1px solid rgba(212,154,40,.3)",padding:"6px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
          <p style={{fontSize:10.5,color:"var(--am)",fontWeight:700}}>🕵️ Mode invité — données locales uniquement</p>
          <button onClick={()=>setAccountOpen(true)} style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:"var(--am)",color:"var(--wh)",border:"none",cursor:"pointer",fontWeight:700,whiteSpace:"nowrap"}}>
            Créer un compte →
          </button>
        </div>
      )}

      {/* ── Top bar ── */}
      <div style={{position:"sticky",top:0,zIndex:50,background:"rgba(253,250,247,.92)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,.6)",padding:"8px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,var(--aq),var(--pe))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>👶</div>
          <span style={{fontFamily:"var(--fs)",fontSize:15}}>Baby Essentials</span>
        </div>
        <div style={{display:"flex",gap:5,alignItems:"center"}}>
          {/* Indicateur compte / sync */}
          <button onClick={()=>setAccountOpen(true)} style={{fontSize:10,padding:"2px 8px",borderRadius:99,fontWeight:800,border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4,
            background: isAccount?"var(--gr-p)":"var(--am-p)",
            color:       isAccount?"var(--gr)":"var(--am)"}}>
            {isAccount
              ? <>
                  <div style={{width:6,height:6,borderRadius:"50%",background:syncStatus==="synced"?"var(--gr)":syncStatus==="syncing"?"var(--am)":"var(--g300)"}}/>
                  {session.familyName||session.code}
                </>
              : "🕵️ Invité"
            }
          </button>
          <button onClick={()=>setFamilyOpen(true)} style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:"var(--pu-p)",color:"var(--pu)",fontWeight:800,border:"none",cursor:"pointer"}}>
            {family.children.map(c=>c.prenom||"👶").join(" & ")||`${family.nbChildren} bébé${family.nbChildren>1?"s":""}`}
          </button>
          {db.val&&<span style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:"var(--aq-p)",color:"var(--aq)",fontWeight:800}}>{fmtEur(db.val)}</span>}
          <button onClick={()=>setDataOpen(true)} title="Mes données — Sauvegarder / Restaurer" style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:"var(--sa-p)",color:"var(--gr)",fontWeight:800,border:"none",cursor:"pointer"}}>
            💾
          </button>
          <button onClick={()=>setExportOpen(true)} style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:"var(--pu-p)",color:"var(--pu)",fontWeight:800,border:"none",cursor:"pointer"}}>
            📤
          </button>
        </div>
      </div>

      {tab==="dashboard"&&<DashPage setTab={setTab} db={db} cafAids={cafAids} family={family} navigateTo={navigateTo} setFamilyOpen={setFamilyOpen} setExportOpen={setExportOpen}/>}
      {tab==="aides"    &&<AidesPage cafAids={cafAids} db={db}/>}
      {tab==="clinic"   &&<ClinicPage db={db} family={family} autoOpenCat={autoOpenCats["clinic"]} clearAutoOpen={()=>clearAutoOpen("clinic")}/>}
      {tab==="home"     &&<HomePage db={db} family={family} autoOpenCat={autoOpenCats["home"]} clearAutoOpen={()=>clearAutoOpen("home")}/>}
      {tab==="tracker"  &&<TrackerPage family={family}/>}

      <div className="bnav">
        {TABS.map(t=>(<button key={t.id} className={`nb ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>
          <span style={{fontSize:19,lineHeight:1}}>{t.e}</span><span className="nbl">{t.l}</span>
        </button>))}
      </div>

      {familyOpen &&<FamilyModal  family={family} onClose={()=>setFamilyOpen(false)}/>}
      {exportOpen &&<ExportModal  onClose={()=>setExportOpen(false)} family={family} db={db} cafAids={cafAids}/>}
      {accountOpen&&<AccountModal auth={auth} onClose={()=>setAccountOpen(false)}/>}
      {dataOpen   &&<DataModal    auth={auth} onClose={()=>setDataOpen(false)}/>}
    </div>
  </>);
}
