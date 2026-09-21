const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const security={'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY','X-Robots-Tag':'noindex, nofollow'};
function json(body,status=200){return new Response(JSON.stringify(body),{status,headers:{...security,'Content-Type':'application/json; charset=utf-8'}})}
async function hash(value){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function authorized(request,env){
  const token=request.headers.get('Authorization')?.replace(/^Bearer /,'')||'';
  if(!env.ANALYTICS_ADMIN_HASH||token.length!==43)return false;
  const actual=await hash(token);const expected=env.ANALYTICS_ADMIN_HASH;
  let diff=actual.length^expected.length;
  for(let i=0;i<actual.length;i++)diff|=actual.charCodeAt(i)^(expected.charCodeAt(i)||0);
  return diff===0;
}
function db(env){if(!env.DB)throw new Error('Database unavailable');return env.DB}
function recifeDay(){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Recife',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
export default {async fetch(request,env){
  const url=new URL(request.url);
  try{
    if(url.pathname==='/api/visit'){
      if(request.method!=='POST')return json({error:'Método não permitido'},405);
      const origin=request.headers.get('Origin');
      if(origin!==url.origin||request.headers.get('Sec-Fetch-Site')==='cross-site')return json({error:'Origem inválida'},403);
      if(!request.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'Formato inválido'},415);
      if(Number(request.headers.get('Content-Length')||0)>512)return json({error:'Pedido inválido'},413);
      const raw=await request.text();if(raw.length>512)return json({error:'Pedido inválido'},413);
      let body;try{body=JSON.parse(raw)}catch{return json({error:'Pedido inválido'},400)}
      if(!body||!uuid.test(body.visitor||'')||!uuid.test(body.session||''))return json({error:'Pedido inválido'},400);
      await db(env).prepare('INSERT OR IGNORE INTO visits (session_id, visitor_hash, day, created_at) VALUES (?, ?, ?, ?)').bind(body.session,await hash(body.visitor),recifeDay(),new Date().toISOString()).run();
      return new Response(null,{status:204,headers:security});
    }
    if(url.pathname==='/api/stats'){
      if(!await authorized(request,env))return json({error:'Acesso reservado. Abra seu link exclusivo.'},401);
      if(request.method!=='GET')return json({error:'Método não permitido'},405);
      const today=recifeDay();
      const results=await db(env).batch([
        db(env).prepare('SELECT COUNT(*) AS visits, COUNT(DISTINCT visitor_hash) AS visitors, MIN(created_at) AS since FROM visits'),
        db(env).prepare('SELECT COUNT(*) AS visits, COUNT(DISTINCT visitor_hash) AS visitors FROM visits WHERE day = ?').bind(today),
        db(env).prepare("SELECT day, COUNT(*) AS visits, COUNT(DISTINCT visitor_hash) AS visitors FROM visits WHERE day >= date(?, '-29 days') GROUP BY day ORDER BY day").bind(today),
      ]);
      return json({total:results[0].results[0],today:results[1].results[0],days:results[2].results,todayDate:today,updatedAt:new Date().toISOString()});
    }
    if(url.pathname==='/painel'||url.pathname==='/painel/')return new Response(DASHBOARD,{headers:{...security,'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"}});
    if(url.pathname==='/robots.txt')return new Response('User-agent: *\nDisallow: /painel\nDisallow: /api/\n',{headers:{'Content-Type':'text/plain'}});
    if(url.pathname==='/'||url.pathname==='/index.html')return new Response(HOME,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}});
    if(url.pathname.startsWith('/api/'))return json({error:'Não encontrado'},404);
    if(env.ASSETS)return env.ASSETS.fetch(request);
    return new Response('Não encontrado',{status:404});
  }catch(error){console.error('Analytics request failed',error?.message);return json({error:'Não foi possível carregar agora. Tente novamente.'},503)}
}};
