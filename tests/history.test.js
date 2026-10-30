'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const core=require('../history-core.js');
const cc=require('../correction-core.js');
const dataset=require('../atlas_iades_1280_transcritas.json');
global.window={};require('../corrections.js');
const curated=window.ATLAS_CORRECTIONS;
const q=dataset.questions.find(x=>x.id==='df2026-001');
const other=dataset.questions.find(x=>x.id==='df2018-001');
const exam=x=>dataset.exams.find(e=>e.id===x.exam);
const resolve=x=>cc.resolve(x,curated,{});
const evaluate=(r,a)=>cc.evaluate(r,a);
const sample={
 [q.id]:[
 {answer:'A',at:'2026-10-20T12:00:00.000Z',mode:'Estudo livre'},
 {answer:'D',at:'2026-10-22T15:30:00.000Z',mode:'Revisão'}
 ],
 [other.id]:[{answer:'C',at:'2026-10-25T10:00:00.000Z',mode:'Estudo'}]
};
test('indexa todas as tentativas sem modificar dados de origem',()=>{
 const original=JSON.stringify(sample);
 const rows=core.entries([q,other],sample,evaluate,resolve);
 assert.equal(rows.length,3);
 assert.equal(rows[0].q.id,other.id);
 assert.equal(rows[1].attempt.answer,'D');
 assert.equal(rows[2].attempt.answer,'A');
 assert.equal(JSON.stringify(sample),original);
});
test('última resposta por questão e todas as tentativas são visões diferentes',()=>{
 const rows=core.entries([q,other],sample,evaluate,resolve);
 const latest=core.filtered(rows,{view:'latest'},exam,x=>x.topic);
 const all=core.filtered(rows,{view:'all'},exam,x=>x.topic);
 assert.equal(latest.length,2);
 assert.equal(all.length,3);
 assert.equal(latest.find(x=>x.id===q.id).attempt.answer,'D');
});
test('filtro por gabarito, prova, data, ano e texto',()=>{
 const rows=core.entries([q,other],sample,evaluate,resolve);
 assert.equal(core.filtered(rows,{view:'all',result:'errou'},exam,x=>x.topic).length,1);
 assert.equal(core.filtered(rows,{view:'all',result:'acertou'},exam,x=>x.topic).length,1);
 assert.equal(core.filtered(rows,{view:'all',result:'sem_gabarito'},exam,x=>x.topic).length,1);
 assert.equal(core.filtered(rows,{view:'all',exam:'df2018'},exam,x=>x.topic).length,1);
 assert.equal(core.filtered(rows,{view:'all',year:'2026'},exam,x=>x.topic).length,2);
 assert.equal(core.filtered(rows,{view:'all',from:'2026-10-21',to:'2026-10-24'},exam,x=>x.topic).length,1);
 assert.equal(core.filtered(rows,{view:'all',search:'dengue'},exam,x=>x.topic).length,2);
});
test('indicadores de histórico representam tentativas reais, não apenas percentual',()=>{
 const all=core.entries([q,other],sample,evaluate,resolve);
 assert.deepEqual(core.stats(all),{attempts:3,distinct:2,correct:1,wrong:1,annulled:0,unverified:1});
});
test('não exclui tentativas mais antigas ao pesquisar todas as tentativas',()=>{
 const all=core.entries([q,other],sample,evaluate,resolve);
 const list=core.filtered(all,{view:'all',exam:'df2026'},exam,x=>x.topic);
 assert.deepEqual(list.map(x=>x.index),[1,0]);
 assert.deepEqual(list.map(x=>x.attempt.answer),['D','A']);
});
