'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const path=require('node:path');
const core=require('../correction-core.js');
global.window={};
require('../corrections.js');
require('../official-2018.js');
require('../research-answers.js');
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
 const unverified={df2017u:{source:'rascunho',items:{11:'C'}}};
 const other=core.resolve(q('df2017u',11),curated,unverified);
 assert.equal(other.status,'informado_nao_verificado');
 assert.equal(other.hasVerifiedOfficial,false);
 assert.equal(core.evaluate(other,'C'),'acertou');
});
test('sem gabarito deve permanecer sem classificação de acerto',()=>{
 const c=core.resolve(q('df2017u',11),curated,{});
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
 assert.equal(items.length,23);
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
test('cobertura diferencia respostas oficiais, independentes e pendentes',()=>{
 const cov=core.coverage(questions.questions,curated);
 assert.deepEqual(cov,{total:1280,officialValid:194,officialAnnulled:5,commented:23,missingOfficial:1081,commentPending:1257,independent:13,unresolved:1068,withAnswer:212});
});
test('correção de itens CERTO/ERRADO aceita C e E',()=>{
 const c={key:'E',status:'informado_nao_verificado',isAnnulled:false,hasVerifiedOfficial:false};
 assert.equal(core.evaluate(c,'C'),'errou');assert.equal(core.evaluate(c,'E'),'acertou');
});

test('gabarito definitivo IADES 2018 inclui apenas 119 posições e mantém item 40 pendente',()=>{
 const k=curated.officialKeys.df2018.answers;
 assert.equal(Object.keys(k).length,119);
 assert.equal(k[3],'E');
 assert.equal(k[16],'E');
 assert.equal(k[90],'#');
 assert.equal(k[113],'#');
 assert.equal(k[40],undefined);
 assert.equal(core.resolve(q('df2018',40),curated,{}).status,'sem_gabarito');
 assert.equal(core.resolve(q('df2018',16),curated,{}).hasVerifiedOfficial,true);
});
test('resolução independente não é rotulada como oficial',()=>{
 const r=core.resolve(q('sp2023',12),curated,{});
 assert.equal(r.key,'C');
 assert.equal(r.status,'proposta_fundamentada');
 assert.equal(r.source,'analise_independente');
 assert.equal(r.hasVerifiedOfficial,false);
 assert.equal(r.hasTechnicalProposal,true);
 assert.equal(core.evaluate(r,'C'),'acertou');
 assert.equal(core.evaluate(r,'A'),'errou');
 assert.equal(core.optionStatus(r,'C'),'proposta');
});
test('resposta técnica fundamentada prevalece sobre cadastro pessoal, sem virar gabarito oficial',()=>{
 const r=core.resolve(q('df2024',2),curated,{df2024:{items:{2:'A'}}});
 assert.equal(r.key,'C');
 assert.equal(r.source,'analise_independente');
 assert.equal(r.discrepancy,true);
 assert.equal(r.hasVerifiedOfficial,false);
});
test('13 questões inéditas têm comentários em todas as alternativas, textos e URLs',()=>{
 const entries=Object.entries(curated.independentAnswers);
 assert.equal(entries.length,13);
 for(const [id,item] of entries){
  const question=questions.questions.find(x=>x.id===id);
  const comment=curated.comments[id];
  assert.ok(question&&comment,id);
  assert.ok(question.options.includes(item.answer),id);
  assert.equal(item.status,'proposta_fundamentada');
  assert.ok(Array.isArray(comment.references)&&comment.references.length,id);
  assert.ok(question.options.every(op=>comment.alternatives[op]&&comment.alternatives[op].length>45),id);
  for(const r of comment.references)assert.ok(r.url.startsWith('https://'),id);
 }
});
test('proposta com ambiguidade possível traz aviso e confiança reduzida',()=>{
 const r=core.resolve(q('df2024',1),curated,{});
 assert.equal(r.key,'D');
 assert.equal(r.possibleAmbiguity,true);
 assert.equal(r.confidence,'moderada');
});
