
const CACHE='maths-studio-v4';
const STATIC=['./','./index.html','./styles.css','./data.js','./enrichment.js','./coach-data.js','./guided-study.js','./app.js','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('maths-studio-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin||!url.pathname.includes('/maths/'))return;
 event.respondWith(fetch(event.request).then(response=>{
   if(response&&response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{}))}
   return response;
 }).catch(async()=>{
   const match=await caches.match(event.request);
   if(match)return match;
   if(event.request.mode==='navigate')return caches.match('./index.html');
   return Response.error();
 }));
});
