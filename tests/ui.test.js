'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const dataset=require('../atlas_iades_1280_transcritas.json');
const read=f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8');
function launch(seed){
 const nodes={},listeners={},stored=seed||{},cls={add(){},remove(){},toggle(){}};
 const doc={
  documentElement:{dataset:{}},body:{classList:cls},
  getElementById(id){if(!nodes[id])nodes[id]={id,textContent:'',innerHTML:'',value:'',classList:cls,style:{},clientWidth:680,appendChild(){},getContext(){return{drawImage(){},strokeRect(){}}}};return nodes[id]},
  querySelectorAll(){return[]},addEventListener(t,fn){listeners[t]=fn},
  createElement(tag){return{tagName:tag,click(){},setAttribute(){},style:{}}}
 };
 const wnd={IADES_DATA:dataset,addEventListener(){},scrollTo(){},devicePixelRatio:1};
 const storage={getItem(k){return stored[k]||null},setItem(k,v){stored[k]=v}};
 const sandbox={window:wnd,document:doc,localStorage:storage,console,setTimeout(){return 1},clearTimeout(){},setInterval(){return 1},clearInterval(){},confirm(){return true},Date,URL,Blob,Map,Set,Image:class{},navigator:{}};
 vm.createContext(sandbox);
 for(const file of ['corrections.js','official-2018.js','research-answers.js','correction-core.js','history-core.js','app.js'])vm.runInContext(read(file),sandbox,{filename:file});
 const action=(action,other={})=>{assert.ok(listeners.click);listeners.click({target:{closest(){return{dataset:{action,...other}}}}})};
 return{nodes,stored,action,change:(id,value)=>{nodes[id]=Object.assign(nodes[id]||{},{value});listeners.change({target:{id,value}})},input:(id,value)=>{nodes[id]=Object.assign(nodes[id]||{},{value});listeners.input({target:{id,value}})},html:()=>nodes.content.innerHTML,view:()=>nodes['current-page'].textContent};
}
test('todas as telas abrem com o acervo carregado, sem bloqueio',()=>{
 const a=launch();
 assert.match(a.nodes.loaded.textContent,/1.280 questões/);
 for(const page of ['home','bank','exams','sim','review','weak','fav','stats','history','keys','imports','settings']){
  a.action('go',{page});
  assert.ok(a.html().length>80,page);
  assert.ok(a.view()!=='Carregando o acervo',page);
 }
});
test('estudo livre revela imediatamente a resposta correta e explicações individuais',()=>{
 const a=launch();
 a.action('openq',{id:'df2026-001'});
 a.action('draft',{value:'A'});
 a.nodes.confidence={value:'certeza'};
 a.action('submit');
 const h=a.html();
 assert.match(h,/Sua resposta/);assert.match(h,/Resposta de referência/);
 assert.match(h,/ERROU/);assert.match(h,/GABARITO OFICIAL DEFINITIVO/);
 assert.match(h,/Fundamentação/);assert.match(h,/Análise individual das alternativas/);
 assert.match(h,/Alternativa A/);assert.match(h,/Alternativa D/);
 assert.match(h,/Consultar fontes utilizadas/);
 assert.equal(JSON.parse(a.stored.atlas_sesdf_study_v2).attempts['df2026-001'][0].answer,'A');
});
test('questão anulada mostra anulação e não falsa correção',()=>{
 const a=launch();a.action('openq',{id:'df2026-013'});a.action('draft',{value:'A'});a.action('submit');
 assert.match(a.html(),/QUESTÃO ANULADA/);
 assert.match(a.html(),/Nenhuma alternativa é considerada correta/);
});
test('questão sem gabarito não inventa uma alternativa correta',()=>{
 const a=launch();a.action('openq',{id:'df2017u-011'});a.action('draft',{value:'C'});a.action('submit');
 assert.match(a.html(),/GABARITO NÃO LOCALIZADO/);
 assert.match(a.html(),/não será contada como acerto ou erro/);
});
test('gabarito alterado da questão 78 é C, com justificativa',()=>{
 const a=launch();a.action('openq',{id:'df2026-078'});a.action('draft',{value:'B'});a.action('submit');
 assert.match(a.html(),/retificado pela banca/);assert.match(a.html(),/Resposta de referência/);
 assert.match(a.html(),/Análise individual das alternativas/);
 assert.match(a.html(),/soro pela via venosa/);
});
test('simulado não revela gabarito antes de encerrar e libera revisão ao final',()=>{
 const a=launch();a.action('startexam',{exam:'df2026'});
 a.action('draft',{value:'D'});a.action('submit');
 assert.match(a.html(),/revelados ao finalizar o simulado/);
 assert.doesNotMatch(a.html(),/Análise individual das alternativas/);
 for(let n=0;n<80;n++)a.action('next');
 assert.equal(a.view(),'Resultado do estudo');
 assert.match(a.html(),/Gabarito e comentários após o simulado/);
 a.action('reviewresult',{id:'df2026-001'});
 assert.match(a.html(),/Análise individual das alternativas/);
 assert.match(a.html(),/ACERTOU/);
 a.action('backdone');
 assert.equal(a.view(),'Resultado do estudo');
});
test('histórico permite reabrir o comentário sem produzir outra tentativa',()=>{
 const a=launch();
 a.action('openq',{id:'df2026-001'});a.action('draft',{value:'D'});a.action('submit');
 a.action('go',{page:'bank'});
 a.action('reviewpast',{id:'df2026-001'});
 assert.match(a.html(),/Fundamentação/);
 const history=JSON.parse(a.stored.atlas_sesdf_study_v2).attempts['df2026-001'];
 assert.equal(history.length,1);
});

test('histórico mostra resposta anterior, gabarito e comentários sem registrar nova tentativa',()=>{
 const a=launch();
 a.action('openq',{id:'df2026-001'});
 a.action('draft',{value:'A'});
 a.action('submit');
 const before=JSON.parse(a.stored.atlas_sesdf_study_v2);
 assert.equal(before.attempts['df2026-001'].length,1);
 const savedSession=JSON.stringify(before.session);
 a.action('go',{page:'history'});
 assert.match(a.html(),/Histórico de questões respondidas/);
 assert.match(a.html(),/Questão 1/);
 assert.match(a.html(),/Errou/);
 a.action('histopen',{id:'df2026-001',attempt:'0'});
 assert.equal(a.view(),'Revisar questão');
 assert.match(a.html(),/Questão e alternativas originais/);
 assert.match(a.html(),/Sua resposta/);
 assert.match(a.html(),/GABARITO OFICIAL DEFINITIVO/);
 assert.match(a.html(),/Fundamentação/);
 const after=JSON.parse(a.stored.atlas_sesdf_study_v2);
 assert.equal(after.attempts['df2026-001'].length,1);
 assert.equal(JSON.stringify(after.session),savedSession);
});
test('histórico permite consultar cada tentativa repetida separadamente',()=>{
 const a=launch();
 a.action('openq',{id:'df2026-001'});
 a.action('draft',{value:'A'});
 a.action('submit');
 a.action('go',{page:'bank'});
 a.action('openq',{id:'df2026-001'});
 a.action('draft',{value:'D'});
 a.action('submit');
 a.action('go',{page:'history'});
 assert.match(a.html(),/2 de 2/);
 assert.doesNotMatch(a.html(),/tentativa 1 de 2/);
 a.change('histview','all');
 assert.match(a.html(),/tentativa 1 de 2/);
 assert.match(a.html(),/tentativa 2 de 2/);
 a.action('histopen',{id:'df2026-001',attempt:'0'});
 assert.match(a.html(),/ERROU/);
 a.action('histattempt',{attempt:'1'});
 assert.match(a.html(),/ACERTOU/);
 assert.match(a.html(),/tentativa 2 de 2/);
 assert.equal(JSON.parse(a.stored.atlas_sesdf_study_v2).attempts['df2026-001'].length,2);
});
test('filtros do histórico por prova, resultado e período funcionam',()=>{
 const a=launch();
 a.action('openq',{id:'df2026-001'});a.action('draft',{value:'A'});a.action('submit');
 a.action('go',{page:'bank'});
 a.action('openq',{id:'df2017u-011'});a.action('draft',{value:'C'});a.action('submit');
 a.action('go',{page:'history'});
 assert.match(a.html(),/Questão 1/);
 a.change('histresult','errou');
 assert.match(a.html(),/1 registro\(s\)/);
 a.change('histexam','df2017u');
 assert.match(a.html(),/Nenhuma tentativa corresponde aos filtros/);
 a.change('histresult','sem_gabarito');
 assert.match(a.html(),/1 registro\(s\)/);
 a.change('histfrom','2099-01-01');
 assert.match(a.html(),/Nenhuma tentativa corresponde aos filtros/);
 a.action('histclear');
 assert.match(a.html(),/2 registro\(s\)/);
});
test('consulta ao histórico durante simulado não revela gabarito nem interrompe a sessão',()=>{
 const a=launch();
 a.action('startexam',{exam:'df2026'});
 a.action('draft',{value:'A'});a.action('submit');
 a.action('go',{page:'history'});
 assert.match(a.html(),/Simulado em andamento/);
 assert.match(a.html(),/Gabarito: Oculto/);
 a.action('histopen',{id:'df2026-001',attempt:'0'});
 assert.doesNotMatch(a.html(),/GABARITO OFICIAL DEFINITIVO/);
 assert.match(a.html(),/Simulado em andamento/);
 a.action('go',{page:'home'});a.action('resume');
 assert.equal(a.view(),'Resolver');
 assert.match(a.html(),/revelados ao finalizar o simulado/);
 for(let i=0;i<80;i++)a.action('next');
 a.action('go',{page:'history'});
 assert.match(a.html(),/Errou/);
 a.action('histopen',{id:'df2026-001',attempt:'0'});
 assert.match(a.html(),/GABARITO OFICIAL DEFINITIVO/);
});
test('o histórico permanece disponível após recarregar o aplicativo com o mesmo armazenamento',()=>{
 const seed={};const a=launch(seed);
 a.action('openq',{id:'df2026-001'});a.action('draft',{value:'D'});a.action('submit');
 const b=launch(seed);b.action('go',{page:'history'});
 assert.match(b.html(),/Questão 1/);
 assert.match(b.html(),/Acertou/);
 b.action('histopen',{id:'df2026-001',attempt:'0'});
 assert.match(b.html(),/ACERTOU/);
});

test('resolução técnica não oficial aparece após responder e explica todas as alternativas',()=>{
 const a=launch();
 a.action('openq',{id:'sp2023-012'});
 a.action('draft',{value:'A'});a.action('submit');
 assert.match(a.html(),/RESOLUÇÃO TÉCNICA — NÃO OFICIAL/);
 assert.match(a.html(),/Confiança da análise/);
 assert.match(a.html(),/RESPOSTA TÉCNICA PROPOSTA — NÃO OFICIAL/);
 assert.match(a.html(),/Lei nº 8.142/);
 assert.match(a.html(),/Alternativa E/);
});
test('resolução ainda inexistente não inventa gabarito nem bloqueia avanço',()=>{
 const a=launch();
 a.action('openq',{id:'df2017u-011'});
 a.action('draft',{value:'C'});a.action('submit');
 assert.match(a.html(),/GABARITO NÃO LOCALIZADO/);
 assert.match(a.html(),/não será contada como acerto ou erro/);
 a.action('next');
 assert.equal(a.view(),'Resolver');
});
test('página de gabaritos lista separadamente chave oficial e propostas técnicas não oficiais',()=>{
 const a=launch();
 a.action('go',{page:'keys'});
 a.change('keyexam','df2024');
 assert.match(a.html(),/respostas técnicas NÃO OFICIAIS/);
 assert.match(a.html(),/2 C/);
 a.change('keyexam','df2018');
 assert.match(a.html(),/119 posições identificadas/);
 assert.match(a.html(),/gabarito oficial/);
});
