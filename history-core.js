/* Histórico de estudo: funções puras. Não altera enunciados ou tentativas. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.AtlasHistoryCore=api})(typeof globalThis==='object'?globalThis:null,function(){
 'use strict';
 function text(s){return String(s==null?'':s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
 function when(value){const n=Date.parse(value||'');return Number.isFinite(n)?n:0}
 function datePart(value){const n=when(value);if(!n)return '';const d=new Date(n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
 function entries(questions,attempts,evaluate,resolve){
  const result=[];for(const q of questions){const arr=attempts&&attempts[q.id];if(!Array.isArray(arr))continue;for(let i=0;i<arr.length;i++){const a=arr[i];if(!a||typeof a!=='object')continue;const r=resolve(q);result.push({id:q.id,q,attempt:a,index:i,at:a.at||'',timestamp:when(a.at),result:evaluate(r,a.answer),official:!!r.hasVerifiedOfficial,annulled:!!r.isAnnulled})}}
  return result.sort((a,b)=>b.timestamp-a.timestamp||a.id.localeCompare(b.id)||b.index-a.index);
 }
 function filtered(all,filters,getExam,getTopic){
  const f=filters||{};let source=all;
  if(f.view!=='all'){const seen=new Set();source=all.filter(item=>{if(seen.has(item.id))return false;seen.add(item.id);return true})}
  return source.filter(row=>{
   const q=row.q,e=getExam(q),topic=getTopic(q),a=row.attempt;
   if(f.exam&&q.exam!==f.exam)return false;
   if(f.year&&String(e.year)!==String(f.year))return false;
   if(f.topic&&topic!==f.topic)return false;
   if(f.result&&row.result!==f.result)return false;
   if(f.from&&datePart(row.at)<f.from)return false;
   if(f.to&&datePart(row.at)>f.to)return false;
   if(f.search&&!text([q.num,q.search,q.stem_original,topic,e.title,e.program,a.answer].join(' ')).includes(text(f.search)))return false;
   return true;
  });
 }
 function stats(all){const unique=new Set(all.map(x=>x.id)),correct=all.filter(x=>x.result==='acertou'),wrong=all.filter(x=>x.result==='errou');return{attempts:all.length,distinct:unique.size,correct:correct.length,wrong:wrong.length,annulled:all.filter(x=>x.annulled).length,unverified:all.filter(x=>x.result==='sem_gabarito').length}}
 return{entries,filtered,stats,datePart};
});
