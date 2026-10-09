
/* Guided single-player learning workflow inspired by classroom formative assessment.
   Educational mechanics only: no hardware, multiplayer, gamified clicker or cloud telemetry. */
(function(){
'use strict';
const lessons=window.MATH_LESSONS||[], extra=window.MATH_EXTRA||{}, coach=window.MATH_COACH||{};
const KEY='maths-guided-study-v1';
const clean=x=>String(x??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const raw=()=>{try{const d=JSON.parse(localStorage.getItem(KEY)||'{}');return d&&typeof d==='object'&&!Array.isArray(d)?d:{}}catch{return {}}};
let data=raw();
if(!data.responses||typeof data.responses!=='object')data.responses={};
if(!data.homeworkDone||typeof data.homeworkDone!=='object')data.homeworkDone={};
if(!data.chapter||!lessons.some(x=>x.id===data.chapter))data.chapter='quadratics';
if(!Number.isInteger(data.stage)||data.stage<0||data.stage>3)data.stage=0;
let view='path';
let focusMsg='';
const truth={
polynomials:{q:'A quadratic polynomial can have at most two distinct real zeroes.',correct:0,why:'A polynomial of degree two has at most two distinct real roots.'},
linear:{q:'Two distinct parallel straight lines have infinitely many common solutions.',correct:1,why:'Distinct parallel lines never intersect, so they have no common solution.'},
quadratics:{q:'If D = b² − 4ac is negative, a quadratic has no real roots.',correct:0,why:'A negative discriminant makes the square root non-real.'},
ap:{q:'The common difference of an arithmetic progression can be negative.',correct:0,why:'A decreasing AP such as 10, 7, 4 has d = −3.'},
triangles:{q:'The ratio of areas of similar triangles always equals their side ratio.',correct:1,why:'Their area ratio is the square of the ratio of corresponding sides.'},
trig:{q:'The hypotenuse in a right triangle lies opposite the right angle.',correct:0,why:'The side opposite 90° is always the hypotenuse.'},
coordinate:{q:'The distance between two distinct points can be negative.',correct:1,why:'Distance is a nonnegative length. Only coordinate differences may be negative.'},
mensuration:{q:'Volume is measured in square units such as cm².',correct:1,why:'Volume uses cubic units such as cm³; surface area uses square units.'},
statistics:{q:'For grouped median, cf refers to cumulative frequency before the median class.',correct:0,why:'The grouped-data median formula uses cumulative frequency before the median class.'},
probability:{q:'The probability of an impossible event is zero.',correct:0,why:'No equally likely outcomes satisfy an impossible event.'}
};
function save(){try{localStorage.setItem(KEY,JSON.stringify({responses:data.responses,homeworkDone:data.homeworkDone,chapter:data.chapter,stage:data.stage}))}catch{}}
function lesson(id){return lessons.find(l=>l.id===id)||lessons[0]}
function qid(id,i){return id+'-'+i}
function getQ(id,i){
 if(i===3){const t=truth[id];return {q:t.q,options:['True','False'],correct:t.correct,explanation:t.why}}
 const mcq=extra[id]?.mcq?.[i];return mcq||{q:'No question available.',options:[],correct:-1,explanation:''}
}
function response(id,i){return data.responses[qid(id,i)]||null}
function chapterStats(id){
 let attempted=0,firstRight=0,completed=0,help=0,needsReview=0;
 for(let i=0;i<4;i++){
  const r=response(id,i);
  if(!r)continue;
  if(r.attempts>0){attempted++;if(r.firstCorrect===true)firstRight++;}
  if(r.correct)completed++;
  if(r.helped)help++;
  if(r.firstCorrect===false||r.helped)needsReview++;
 }
 return {attempted,firstRight,completed,help,needsReview};
}
function totals(){
 return lessons.reduce((a,l)=>{
  const s=chapterStats(l.id);
  a.completed+=s.completed;a.attempted+=s.attempted;a.firstRight+=s.firstRight;a.help+=s.help;a.review+=s.needsReview;
  if(s.completed===4)a.chapters++;
  return a;
 },{completed:0,attempted:0,firstRight:0,help:0,review:0,chapters:0});
}
function button(label,action,attrs='',classes='button light'){return '<button class="'+classes+'" type="button" data-flow-action="'+clean(action)+'" '+attrs+'>'+label+'</button>'}
function bar(n,max){return '<div class="flow-meter" role="progressbar" aria-valuemin="0" aria-valuemax="'+max+'" aria-valuenow="'+n+'"><span style="width:'+(n/max*100)+'%"></span></div>'}
function home(){
 const t=totals();
 return '<div class="flow-hero"><div><span class="eyebrow">SOLO STUDY / STEP-BY-STEP LEARNING</span><h1>Learn it. Check it. Fix the gaps.</h1><p>Read one small concept, answer an immediate check, understand the result and get targeted notebook practice. No live class, clicker hardware, points, or multiplayer.</p><div class="actions">'+button('Continue guided learning','continue','','button highlight')+button('Review learning insights','insights')+'</div></div><div class="flow-hero-aside"><span class="eyebrow">YOUR LEARNING RECORD</span><strong>'+t.completed+' <small>/ 40 checks completed</small></strong>'+bar(t.completed,40)+'<p>'+t.chapters+' chapters completed · '+t.review+' checks need extra work</p></div></div>'+
 '<div class="flow-steps">'+[['01','STUDY','Short explanation and worked example'],['02','ANSWER','A–D or True/False checkpoint'],['03','UNDERSTAND','Instant feedback and optional help'],['04','REINFORCE','Personalised written homework']].map(x=>'<div><small>'+x[0]+'</small><strong>'+x[1]+'</strong><span>'+x[2]+'</span></div>').join('')+'</div>'+
 '<section class="section"><div class="section-heading"><div><div class="eyebrow">SELECT A CHAPTER</div><h2>One concept at a time.</h2><p>Each chapter has three short concept lessons and one final true/false check.</p></div></div><div class="flow-chapters">'+lessons.map(l=>{const s=chapterStats(l.id);return '<button class="flow-chapter" type="button" data-flow-action="choose" data-chapter="'+l.id+'"><span class="eyebrow">'+clean(l.code)+' / CLASS 10</span><strong>'+clean(l.title)+'</strong><p>'+clean(coach[l.id]?.mission||l.hook)+'</p>'+bar(s.completed,4)+'<small>'+s.completed+'/4 completed '+(s.needsReview?'· '+s.needsReview+' need revision':'')+'</small></button>'}).join('')+'</div></section>';
}
function path(){
 const l=lesson(data.chapter),i=data.stage,s=chapterStats(l.id),c=coach[l.id]||{},q=getQ(l.id,i),r=response(l.id,i),note=i===3?{title:'Bring it together',explain:'Use the ideas you just studied. Now decide whether the statement is true or false, and explain your reason on paper.',example:l.example.q,method:l.example.steps.join(' ')}:extra[l.id].sections[i];
 const isCorrect=!!r?.correct,answered=r?.attempts>0,fail=r?.lastCorrect===false,canNext=isCorrect||i===3;
 let opts=q.options.map((o,index)=>'<button type="button" class="flow-option '+(answered&&index===r.choice?(r.lastCorrect?'is-correct':'is-incorrect'):'')+'" data-flow-action="answer" data-choice="'+index+'" '+(isCorrect?'disabled':'')+'><span class="flow-option-letter">'+(i===3?(index?'F':'T'):String.fromCharCode(65+index))+'</span><span>'+clean(o)+'</span></button>').join('');
 const done=lesson(data.chapter).id;
 return '<div class="flow-breadcrumb">'+button('← All chapters','overview')+'<span>/</span><strong>'+clean(l.title)+'</strong></div>'+
 '<div class="flow-learning-head"><div><span class="eyebrow">GUIDED LEARNING · '+clean(l.title.toUpperCase())+'</span><h1>'+clean(l.title)+'</h1><p>'+clean(c.mission||l.hook)+'</p></div><span class="pill">'+s.completed+' / 4 checks passed</span></div>'+
 '<div class="flow-stage-tabs" aria-label="Lesson steps">'+[0,1,2,3].map(n=>'<button type="button" class="'+(i===n?'active':'')+'" data-flow-action="stage" data-stage="'+n+'" aria-current="'+(i===n?'step':'false')+'"><span>'+(response(done,n)?.correct?'✓':n+1)+'</span>'+(n===3?'Quick recap':'Concept '+(n+1))+'</button>').join('')+'</div>'+
 '<div class="flow-lesson-grid"><article class="panel flow-lesson"><span class="eyebrow">A / UNDERSTAND THE IDEA</span><h2>'+clean(note.title)+'</h2><p class="flow-intuition">'+clean(note.explain)+'</p><div class="flow-example"><strong>Example</strong><p>'+clean(note.example)+'</p></div><div class="flow-method"><strong>How to approach it</strong><p>'+clean(note.method)+'</p></div>'+(c.prereq?'<p class="flow-prereq"><strong>If you are stuck:</strong> '+clean(c.prereq)+'</p>':'')+'</article>'+
 '<article class="panel flow-assessment"><div class="eyebrow">B / CHECK YOUR UNDERSTANDING</div><h2>One question. Immediate feedback.</h2><p class="flow-question">'+clean(q.q)+'</p><div class="flow-options" role="group" aria-label="Choose an answer">'+opts+'</div>'+
 (r?.helped?'<div class="flow-hint"><strong>Study help</strong><p>'+clean(note.method)+'</p><p>Return to the example above and identify the formula or relationship before answering.</p></div>':'')+
 (answered?'<div class="flow-feedback '+(r.lastCorrect?'correct':'incorrect')+'" role="status"><strong>'+(r.lastCorrect?'Correct — you understood this check.':'Not quite — use this explanation and try again.')+'</strong><p>'+clean(q.explanation)+'</p>'+(r.firstCorrect===false||r.helped?'<small>This concept is recorded for additional practice, even if you correct it on the next attempt.</small>':'')+'</div>':'')+
 '<div class="flow-actions">'+button('I need help','help','', 'button light')+(i>0?button('← Previous','back'):'')+
 (isCorrect?(i===3?button('See my study plan →','homework','','button highlight'):button('Next concept →','next','','button highlight')):'')+
 '</div></article></div>'+
 '<div class="flow-study-note"><strong>Learning rule:</strong> Attempt before revealing help. Wrong answers are useful—they determine which questions appear in your follow-up practice. You can repeat any step without penalties.</div>';
}
function weaknesses(){
 const graded=lessons.map(l=>({lesson:l,stats:chapterStats(l.id)}));
 return graded.filter(x=>x.stats.needsReview>0).sort((a,b)=>b.stats.needsReview-a.stats.needsReview);
}
function homeworkItems(){
 const weak=weaknesses();
 const focus=weak.length?weak.map(x=>x.lesson):lessons.filter(l=>chapterStats(l.id).completed<4).slice(0,3);
 const selected=focus.length?focus:[lesson(data.chapter)];
 let items=[];
 for(const l of selected){
  const qs=[...(l.practice||[]),...(extra[l.id]?.challenge||[])];
  const weakMode=chapterStats(l.id).needsReview>0;
  const order=weakMode?[0,2,3,5,6]:[3,4,5,6,0];
  for(const idx of order.slice(0,weakMode?2:1)){
   if(qs[idx])items.push({id:l.id+'-home-'+idx,chapter:l.id,title:l.title,q:qs[idx].q,answer:qs[idx].a,work:qs[idx].work});
  }
  if(items.length>=10)break;
 }
 return items.slice(0,10);
}
function homework(){
 const weak=weaknesses(),items=homeworkItems();
 return '<div class="eyebrow">PERSONALISED FOLLOW-UP / NO LEADERBOARD</div><h1 class="page-title">Your next practice tasks.</h1><p class="lede">Generated from the chapter checks you answered incorrectly or requested help with. Work in a notebook, then check your existing question bank for solutions.</p>'+
 (weak.length?'<div class="flow-review-reason"><strong>Why these chapters?</strong><p>'+weak.map(w=>clean(w.lesson.title)+' ('+w.stats.needsReview+' learning gaps)').join(' · ')+'</p></div>':'<div class="flow-review-reason"><strong>Getting started</strong><p>You have not flagged any weak checks yet. This plan uses uncompleted chapters until you take more diagnostics.</p></div>')+
 '<div class="flow-homework-list">'+items.map((q,index)=>'<div class="flow-task"><div><span class="eyebrow">TASK '+(index+1)+' · '+clean(q.title)+'</span><p>'+clean(q.q)+'</p><details><summary>Check answer and method</summary><strong>'+clean(q.answer)+'</strong><p>'+clean(q.work)+'</p></details></div><label class="flow-task-check"><input data-flow-homework="'+clean(q.id)+'" type="checkbox" '+(data.homeworkDone[q.id]?'checked':'')+'><span>Attempted</span></label></div>').join('')+'</div>'+
 '<div class="actions" style="margin-top:20px">'+button('Return to guided learning','continue','','button highlight')+button('See understanding report','insights')+'</div>';
}
function insights(){
 const t=totals(),rows=lessons.map(l=>({l,s:chapterStats(l.id)}));
 const score=t.attempted?Math.round(t.firstRight/t.attempted*100):null;
 return '<div class="eyebrow">YOUR SOLO LEARNING REPORT</div><h1 class="page-title">Know what to revise next.</h1><p class="lede">Only your own local responses. This is a formative practice report, not a predicted board-exam score or AI grading.</p>'+
 '<div class="flow-stats"><div class="panel"><small>CHECKS COMPLETED</small><strong>'+t.completed+'/40</strong></div><div class="panel"><small>FIRST-TRY ACCURACY</small><strong>'+(score===null?'—':score+'%')+'</strong></div><div class="panel"><small>HELP REQUESTS</small><strong>'+t.help+'</strong></div><div class="panel"><small>CHAPTERS DONE</small><strong>'+t.chapters+'/10</strong></div></div>'+
 '<section class="section"><div class="section-heading"><div><div class="eyebrow">SCORECARD BY CHAPTER</div><h2>Progress by concept.</h2></div></div><div class="flow-insight-list">'+rows.map(({l,s})=>'<button type="button" class="flow-insight-row" data-flow-action="choose" data-chapter="'+l.id+'"><div><strong>'+clean(l.title)+'</strong><small>'+s.firstRight+'/'+s.attempted+' correct first attempts '+(s.needsReview?'· '+s.needsReview+' flagged':'')+'</small></div>'+bar(s.completed,4)+'<span>'+s.completed+'/4 →</span></button>').join('')+'</div></section>'+
 '<div class="flow-review-reason"><strong>Suggested next action</strong><p>'+(weaknesses().length?'Revisit '+clean(weaknesses()[0].lesson.title)+' first and practise its written problems.':'Take a chapter you have not completed yet, then use its feedback to identify your weak points.')+'</p></div>'+
 '<div class="actions">'+button('Open targeted practice','homework','','button highlight')+button('Continue learning','continue')+'</div>';
}
function render(which){
 view=which||view;
 if(view==='path'&&data.stage>3)data.stage=0;
 if(view==='lesson')return path();
 if(view==='homework')return homework();
 if(view==='insights')return insights();
 return home();
}
function handle(el){
 const a=el.dataset.flowAction;
 if(!a)return null;
 if(a==='overview')view='path';
 else if(a==='continue')view='lesson';
 else if(a==='choose'){data.chapter=el.dataset.chapter;data.stage=0;view='lesson';save()}
 else if(a==='stage'){data.stage=Math.max(0,Math.min(3,Number(el.dataset.stage)||0));view='lesson';save()}
 else if(a==='next'){data.stage=Math.min(data.stage+1,3);view='lesson';save()}
 else if(a==='back'){data.stage=Math.max(data.stage-1,0);view='lesson';save()}
 else if(a==='insights')view='insights';
 else if(a==='homework')view='homework';
 else if(a==='help'){
  const id=qid(data.chapter,data.stage),r=data.responses[id]||{attempts:0,correct:false,firstCorrect:null};
  r.helped=true;data.responses[id]=r;save();
 }else if(a==='answer'){
  const idx=Number(el.dataset.choice);
  const q=getQ(data.chapter,data.stage);
  if(!Number.isInteger(idx)||idx<0||idx>=q.options.length)return null;
  const id=qid(data.chapter,data.stage),r=data.responses[id]||{attempts:0,firstCorrect:null,correct:false,helped:false};
  if(r.correct)return view;
  const correct=idx===q.correct;
  if(r.attempts===0)r.firstCorrect=correct;
  r.attempts+=1;r.correct=correct;r.lastCorrect=correct;r.choice=idx;r.time=Date.now();
  data.responses[id]=r;save();
 }else return null;
 return view;
}
function handleChange(el){
 const id=el.dataset.flowHomework;
 if(!id)return false;
 data.homeworkDone[id]=!!el.checked;save();return true;
}
window.MATH_STUDY_FLOW={render,handle,handleChange,stats:totals,chapterStats,get state(){return {chapter:data.chapter,stage:data.stage,view}},getResponse:(id,i)=>response(id,i)};
})();
