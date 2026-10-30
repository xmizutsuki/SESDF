/* Atlas IADES — regras puras de correção, separadas do banco de provas. */
(function(root,factory){var core=factory();if(typeof module==='object'&&module.exports)module.exports=core;if(root)root.AtlasCorrectionCore=core})(typeof globalThis==='object'?globalThis:null,function(){
 'use strict';
 function normalizeChoice(a){if(a==null)return null;var v=String(a).trim().toUpperCase();return /^[A-E#]$/.test(v)?v:null}
 function resolve(q,curated,user){var off=curated&&curated.officialKeys&&curated.officialKeys[q.exam], official=normalizeChoice(off&&off.answers&&off.answers[q.num]);var source='';var status='sem_gabarito',value=null,meta=null;
  if(official){value=official;status=official==='#'?'anulada':'oficial_definitivo';source='iades';meta=off.source;}
  else{var u=user&&user[q.exam],custom=normalizeChoice(u&&u.items&&u.items[q.num]);if(custom){value=custom;status=custom==='#'?'anulada_informada':'informado_nao_verificado';source='usuario';meta=u.source||null;}}
  var note=curated&&curated.comments&&curated.comments[q.id]||null;
  return{key:value,status:status,source:source,sourceMeta:meta,comment:note,wasChanged:!!(off&&Array.isArray(off.changed)&&off.changed.includes(q.num)),hasVerifiedOfficial:source==='iades',isAnnulled:value==='#'};
 }
 function evaluate(resolved,answer){var a=normalizeChoice(answer);if(resolved.isAnnulled)return'anulada';if(!a||a==='#'||a==='?')return a==='?'?'nao_sei':'nao_respondida';if(!resolved.key)return'sem_gabarito';if(a===resolved.key)return'acertou';return'errou'}
 function optionStatus(resolved,letter){if(resolved.isAnnulled)return'anulada';if(!resolved.key)return'pendente';if(letter===resolved.key)return resolved.hasVerifiedOfficial?'oficial':'informada';return resolved.hasVerifiedOfficial?'nao_assinalar':'nao_assinalar_informada'}
 function canReveal(session,questionId){if(!session)return true;var resp=session.responses&&session.responses[questionId];return !!resp&&(session.feedback!==false||session.resultsReleased===true)}
 function coverage(qs,curated){var out={total:qs.length,officialValid:0,officialAnnulled:0,commented:0,missingOfficial:0,commentPending:0};qs.forEach(function(q){var r=resolve(q,curated,null);if(r.hasVerifiedOfficial){if(r.isAnnulled)out.officialAnnulled++;else out.officialValid++;}else out.missingOfficial++;var c=r.comment;if(c&&c.status==='comentario_fundamentado'&&c.alternatives&&q.options&&q.options.every(function(op){return typeof c.alternatives[op]==='string'&&c.alternatives[op].trim()})&&Array.isArray(c.references)&&c.references.length)out.commented++;else out.commentPending++;});return out}
 return{normalizeChoice:normalizeChoice,resolve:resolve,evaluate:evaluate,optionStatus:optionStatus,canReveal:canReveal,coverage:coverage};
});
