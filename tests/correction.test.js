'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const path=require('node:path');
const core=require('../correction-core.js');
global.window={};
require('../corrections.js');
const curated=global.window.ATLAS_CORRECTIONS;
const questions=require('../atlas_iades_1280_transcritas.json');
function q(exam,num){return questions.questions.find(x=>x.exam===exam&&x.num===num)}
test('acervo possui 1.280 questões distintas em 13 provas, sem mudar os originais',()=>{
 assert.equal(questions.questions.length,1280);
 assert.equal(questions.exams.length,13);
 assert.equal(new Set(questions.questions.map(x=>x.id)).size,1280);
 assert.equal(questions.exams.reduce((sum,e)=>sum+e.expected,0),1280);
 assert.ok(q('df2026',1).stem_original);
 assert.equal(q('df2026',78).alternatives_original.C,'soro pela via venosa.');
});
test('gabarito definitivo possui 80 posições válidas, 77 respostas e 3 anuladas',()=>{
 const off=curated.officialKeys.df2026.answers;
 assert.equal(Object.keys(off).length,80);
 assert.deepEqual(Object.entries(off).filter(([,v])=>v==='#').map(([n])=>Number(n)),[13,71,72]);
 assert.equal(off[78],'C');
 assert.equal(off[1],'D');
});
test('classificação acerto e erro vem do gabarito, nunca da alternativa selecionada',()=>{
 const a=core.resolve(q('df2026',1),curated,{});
 assert.equal(a.status,'oficial_definitivo');
 assert.equal(a.key,'D');
 assert.equal(core.evaluate(a,'D'),'acertou');
 assert.equal(core.evaluate(a,'A'),'errou');
 assert.equal(core.evaluate(a,'?'),'nao_sei');
});
test('anulações não contam como acerto nem erro',()=>{
 for(const n of [13,71,72]){
  const c=core.resolve(q('df2026',n),curated,{});
  assert.equal(c.isAnnulled,true);
  assert.equal(core.evaluate(c,'A'),'anulada');
  assert.equal(core.optionStatus(c,'B'),'anulada');
 }
});
test('gabarito informado pelo usuário não substitui fonte oficial',()=>{
 const wrong={df2026:{source:'rascunho',items:{1:'A',78:'B'}}};
 assert.equal(core.resolve(q('df2026',1),curated,wrong).key,'D');
 assert.equal(core.resolve(q('df2026',78),curated,wrong).key,'C');
 const unverified={df2018:{source:'rascunho',items:{1:'C'}}};
 const other=core.resolve(q('df2018',1),curated,unverified);
 assert.equal(other.status,'informado_nao_verificado');
 assert.equal(other.hasVerifiedOfficial,false);
 assert.equal(core.evaluate(other,'C'),'acertou');
});
test('sem gabarito deve permanecer sem classificação de acerto',()=>{
 const c=core.resolve(q('df2018',2),curated,{});
 assert.equal(c.status,'sem_gabarito');
 assert.equal(core.evaluate(c,'C'),'sem_gabarito');
 assert.equal(core.optionStatus(c,'C'),'pendente');
});
test('simulado oculta respostas antes do encerramento e libera depois',()=>{
 const session={feedback:false,responses:{'df2026-001':'A'}};
 assert.equal(core.canReveal(session,'df2026-001'),false);
 session.resultsReleased=true;
 assert.equal(core.canReveal(session,'df2026-001'),true);
 assert.equal(core.canReveal({feedback:true,responses:{'df2026-001':'A'}},'df2026-001'),true);
 assert.equal(core.canReveal({feedback:true,responses:{}},'df2026-001'),false);
});
test('comentários completos cadastrados possuem as quatro alternativas e links verificáveis',()=>{
 const items=Object.entries(curated.comments);
 assert.equal(items.length,8);
 for(const [id,item] of items){
  const question=questions.questions.find(x=>x.id===id);
  assert.ok(question,id);
  assert.equal(item.status,'comentario_fundamentado');
  for(const op of question.options)assert.ok(item.alternatives[op]?.length>18,id+' '+op);
  assert.ok(item.references.length>0,id);
  for(const ref of item.references)assert.ok(/^https:\/\//.test(ref.url),id);
  assert.ok(item.summary.length>30&&item.memory.length>10,id);
 }
});
test('resoluções das questões anuladas e retificada permanecem identificadas',()=>{
 for(const n of [13,71,72])assert.ok(curated.comments['df2026-'+String(n).padStart(3,'0')].summary.startsWith('ANULADA'));
 assert.equal(curated.officialKeys.df2026.changed[0],78);
});
test('cobertura correta: 77 gabaritos válidos, 3 anulados, 8 comentários',()=>{
 const cov=core.coverage(questions.questions,curated);
 assert.deepEqual(cov,{total:1280,officialValid:77,officialAnnulled:3,commented:8,missingOfficial:1200,commentPending:1272});
});
test('correção de itens CERTO/ERRADO aceita C e E',()=>{
 const c={key:'E',status:'informado_nao_verificado',isAnnulled:false,hasVerifiedOfficial:false};
 assert.equal(core.evaluate(c,'C'),'errou');assert.equal(core.evaluate(c,'E'),'acertou');
});
