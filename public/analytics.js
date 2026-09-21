// Anonymous browser and session identifiers only; no names, email or IP storage.
const prefix='lampiao-analytics-';
let memoryVisitor=crypto.randomUUID(),memorySession=null,pending=false;
function read(key){try{return localStorage.getItem(prefix+key)}catch{return null}}
function write(key,value){try{localStorage.setItem(prefix+key,value)}catch{}}
async function countVisit(){
  if(document.visibilityState!=='visible'||pending)return;
  pending=true;
  try{
    let visitor=read('visitor')||memoryVisitor;write('visitor',visitor);
    let session;try{session=JSON.parse(read('session')||'null')}catch{}
    session=session||memorySession;
    if(!session||Date.now()-session.last>30*60*1000)session={id:crypto.randomUUID(),last:Date.now(),counted:false};
    session.last=Date.now();memorySession=session;write('session',JSON.stringify(session));
    if(session.counted)return;
    const response=await fetch('/api/visit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitor,session:session.id}),keepalive:true,credentials:'same-origin'});
    if(response.ok){session.counted=true;write('session',JSON.stringify(session))}
  }catch{/* Analytics must never interrupt the game. */}finally{pending=false}
}
countVisit();
document.addEventListener('visibilitychange',countVisit);
setInterval(countVisit,60000);
