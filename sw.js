const CACHE='atlas-sesdf-web-v5';
const BASE=['./','./index.html','./app.js','./history-core.js','./correction-core.js','./corrections.js','./official-2018.js','./official-2019-2020.js','./official-2021.js','./official-2017d.js','./official-2022.js','./official-2024.js','./official-2019-nef.js','./secondary-2023.js','./preliminary-2017u.js','./research-answers.js','./atlas_iades_1280_transcritas.json','./styles.css','./data.js','./manifest.webmanifest','./icon.svg'];
const ZIPLIB='https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(BASE);try{await c.add(ZIPLIB)}catch(e){}await self.skipWaiting()})());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('atlas-sesdf-web-')&&k!==CACHE)await caches.delete(k);await self.clients.claim()})());
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin&&url.href!==ZIPLIB)return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);const cached=await cache.match(event.request);if(url.href===ZIPLIB&&cached)return cached;try{const response=await fetch(event.request);if(response.ok||response.type==='opaque')cache.put(event.request,response.clone());return response}catch(e){return cached||Response.error()}})());
});