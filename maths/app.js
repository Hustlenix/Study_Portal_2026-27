
(function(){
'use strict';
const lessons=window.MATH_LESSONS||[],extra=window.MATH_EXTRA||{},coach=window.MATH_COACH||{},dom=id=>document.getElementById(id);
const esc=v=>String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const get=id=>lessons.find(x=>x.id===id)||lessons[0];
const progressKey='hustlenix-maths-complete-v2';
let saved={};try{saved=JSON.parse(localStorage.getItem(progressKey)||'{}')}catch(e){}
const state={page:'home',id:'quadratics',done:new Set(saved.done||[]),mistakes:new Set(saved.mistakes||[]),review:saved.review||{},mastery:saved.mastery||{},history:saved.history||[],solved:new Set(saved.solved||[]),revealed:new Set(),hint:{},filter:'all',level:'all',search:'',limit:12,exam:null,examSize:10,quizResult:null,writtenTest:null};
const exercises=lessons.flatMap(l=>[...l.practice.map((q,i)=>({...q,chapter:l.id,title:l.title,id:l.id+'-b'+i,level:i?'medium':'easy'})),...(extra[l.id]?.challenge||[]).map((q,i)=>({...q,chapter:l.id,title:l.title,id:l.id+'-c'+i}))]);
const mcqs=lessons.flatMap(l=>(extra[l.id]?.mcq||[]).map((q,i)=>({...q,chapter:l.id,title:l.title,id:l.id+'-q'+i})));
const reviewMCQ=q=>({...q,q:q.q+' ('+q.options.map((o,i)=>String.fromCharCode(65+i)+': '+o).join(' · ')+')',a:String.fromCharCode(65+q.correct)+'. '+q.options[q.correct],work:q.explanation,level:'medium'});
const lookup=Object.fromEntries([...exercises,...mcqs.map(reviewMCQ)].map(q=>[q.id,q]));
const today=()=>Math.floor(Date.now()/86400000);
const dueIds=()=>Object.keys(state.review).filter(id=>state.review[id].next<=today()&&lookup[id]);
const masteredCount=()=>lessons.filter(l=>(state.mastery[l.id]?.correct||0)>=2).length;
function confidence(qid,correct){
  const prior=state.review[qid]||{interval:0,reps:0,next:today()};
  const reps=correct?(prior.reps||0)+1:0;
  const intervals=[0,1,3,7,14,30,60];
  const interval=correct?intervals[Math.min(reps,intervals.length-1)]:0;
  state.review[qid]={reps,interval,next:today()+interval,last:today()};
  if(correct){state.solved.add(qid);state.mistakes.delete(qid)}else state.mistakes.add(qid);
  persist();
}
function persist(){try{localStorage.setItem(progressKey,JSON.stringify({done:[...state.done],mistakes:[...state.mistakes],review:state.review,mastery:state.mastery,history:state.history.slice(-40),solved:[...state.solved]}))}catch(e){}}
function getHints(q){
 const matched=q.id.match(/-(b|c)([0-9]+)$/),pairs=coach[q.chapter]?.hints||[];
 if(!matched)return [];
 const offset=matched[1]==='b'?5:0;
 return pairs[offset+Number(matched[2])]||[];
}
function levelText(q){return state.solved.has(q.id)?'✓ Practised':state.mistakes.has(q.id)?'↻ Review again':q.level}

function button(text,action,type,attrs){return '<button type="button" class="button '+(type||'')+'" data-action="'+action+'" '+(attrs||'')+'>'+text+'</button>'}
function header(title,over,desc){return '<div class="eyebrow">'+esc(over)+'</div><h1 class="page-title">'+esc(title)+'</h1><p class="lede">'+esc(desc)+'</p>'}
function section(title,over,desc){return '<div class="section-heading"><div><div class="eyebrow">'+esc(over)+'</div><h2>'+esc(title)+'</h2>'+(desc?'<p>'+esc(desc)+'</p>':'')+'</div></div>'}
function renderNav(){
const tabs=[['home','⌂','Overview'],['chapter','▤','Learn chapters'],['practice','✎','Question bank'],['exam','☑','Mock tests'],['formulas','∑','Formula library'],['lab','⌁','Math playground'],['mistakes','↻','Mistake notebook'],['due','◷','Due for review']];
dom('nav-main').innerHTML=tabs.map(t=>'<button class="nav-item '+(state.page===t[0]?'active':'')+'" data-page="'+t[0]+'"><span style="font-size:17px;width:19px">'+t[1]+'</span><strong>'+t[2]+'</strong></button>').join('');
dom('nav-lessons').innerHTML=lessons.map(l=>'<button class="chapter-item '+(state.page==='chapter'&&state.id===l.id?'active':'')+'" data-page="chapter" data-chapter="'+l.id+'"><span class="num">'+esc(l.code)+'</span><strong>'+esc(l.title)+'</strong><span class="done-dot">'+(state.done.has(l.id)?'✓':'')+'</span></button>').join('');
dom('pct').textContent=Math.round(state.done.size/10*100)+'%';
dom('pct-bar').style.width=(state.done.size/10*100)+'%';
dom('breadcrumb').textContent='CLASS 10 / MATHEMATICS / '+(state.page==='chapter'?get(state.id).title.toUpperCase():state.page.toUpperCase());
}
function navigate(page,id){
state.page=page;if(id)state.id=id;
if(page==='practice'&&id)state.filter=id;
render();window.scrollTo({top:0,behavior:'auto'});
dom('sidebar').classList.remove('open');dom('shade').classList.remove('show');dom('menu').setAttribute('aria-expanded','false');
}
function render(){renderNav();dom('main-content').innerHTML=({home:home,chapter:chapter,practice:practice,exam:exam,formulas:formulas,lab:lab,mistakes:mistakes,due:due}[state.page]||home)();if(state.page==='lab')computeLab();}
function home(){
const undone=lessons.find(l=>!state.done.has(l.id))||lessons[0];
return '<section class="hero"><div><div class="eyebrow" style="color:#d0e8a4">CBSE CLASS 10 · PERSONALISED MATHS PORTION</div><h1>Understand the maths.<br><span>Not just the formula.</span></h1><p>A complete revision workspace for every included chapter: plain-language concepts, solved methods, self-checks, question bank, mock tests and a maths playground. Take your time—there is no 20-minute study restriction.</p><div class="actions">'+button('Continue: '+esc(undone.title),'continue','highlight')+button('Explore the questions','to-practice','light')+'</div></div><aside class="hero-card"><small>YOUR CHAPTER PROGRESS</small><b>'+state.done.size+' / 10</b><div class="hero-meter"><i style="width:'+(state.done.size/10*100)+'%"></i></div><p style="font-size:12px;margin:12px 0 0">Progress is saved locally in this browser.</p></aside></section>'+
'<div class="notice"><b>Excluded by your exam portion:</b> Real Numbers, Some Applications of Trigonometry, Circles and Areas Related to Circles. Ten other Class 10 chapters are covered here.</div>'+
'<section class="section"><div class="grid three"><div class="panel stat"><span class="symbol">▤</span><div><strong>10</strong><span>full chapter guides</span></div></div><div class="panel stat"><span class="symbol">✎</span><div><strong>'+exercises.length+'</strong><span>written problems with solutions</span></div></div><div class="panel stat"><span class="symbol">✓</span><div><strong>'+mcqs.length+'</strong><span>auto-marked MCQs</span></div></div></div></section>'+
'<section class="section">'+section('All the chapters, in one place','CHAPTER LIBRARY','Pick any lesson, learn it from zero, then practise independently.')+
'<div class="chapter-grid">'+lessons.map(l=>'<button class="chapter-card" data-page="chapter" data-chapter="'+l.id+'"><span class="chapter-n">CHAPTER '+esc(l.code)+' <span style="float:right">'+(state.done.has(l.id)?'✓ COMPLETE':'OPEN ↗')+'</span></span><h3>'+esc(l.title)+'</h3><p>'+esc(l.hook)+'</p><footer><span>'+esc(l.tag)+'</span><span>3 explanations · 2 examples</span></footer><div class="progress-track"><i style="width:'+(state.done.has(l.id)?100:0)+'%"></i></div></button>').join('')+'</div></section>'+
'<section class="section"><div class="grid two"><div class="panel"><div class="eyebrow">LEARN HOW TO LEARN</div><h2 style="margin-top:9px">A method that actually works</h2><div class="concept-stack">'+['Understand the story behind the formula','Copy and explain a fully worked answer','Solve seven problems without stopping','Check your solutions; save mistakes'].map((t,i)=>'<div class="concept"><span class="concept-index">0'+(i+1)+'</span><div><h3>'+esc(t)+'</h3><p>'+['Don’t memorise symbols before you know what they mean.','Notice how every line follows from the previous one.','Use paper. Revealing all solutions immediately reduces learning.','Wrong answers show what to revise tomorrow.'][i]+'</p></div></div>').join('')+'</div></div><div class="panel"><div class="eyebrow">READY TO TEST YOURSELF?</div><h2 style="margin-top:9px">Mixed-chapter quizzes</h2><p class="muted">Take a 10-, 20-, or 30-question MCQ test. Immediate score and detailed answer explanations.</p><div class="actions" style="margin:21px 0">'+button('Start 10 MCQs','test-start','','data-size="10"')+button('Full 30 MCQs','test-start','light','data-size="30"')+'</div><div class="why"><strong>Save hard questions</strong><p>Use the “Save mistake” control under any written question, then review your personalised mistake notebook.</p></div></div></div></section>';
}
function diagram(id){
const wrap=x=>'<div class="figure"><svg role="img" aria-label="'+esc(id)+' visual diagram" viewBox="0 0 340 185" xmlns="http://www.w3.org/2000/svg">'+x+'</svg></div>';
const axis='<path d="M20 157H318 M85 177V15" stroke="#92a999" stroke-width="2"/>';
if(id==='quadratics'||id==='polynomials')return wrap(axis+'<path d="M34 22Q155 278 285 22" stroke="#257155" stroke-width="4" fill="none"/><circle cx="90" cy="157" r="5" fill="#d9874c"/><circle cx="234" cy="157" r="5" fill="#d9874c"/><text x="227" y="142" font-size="13">zero</text>');
if(id==='linear')return wrap(axis+'<path d="M30 174L280 22" stroke="#257155" stroke-width="4"/><path d="M30 24L285 168" stroke="#d9874c" stroke-width="4"/><circle cx="160" cy="95" r="6" fill="#204e3a"/><text x="174" y="84" font-size="12">solution</text>');
if(id==='ap')return wrap('<line x1="16" y1="164" x2="322" y2="164" stroke="#a5bbab" stroke-width="2"/>'+[35,60,85,110,135].map((h,i)=>'<rect x="'+(28+i*59)+'" y="'+(164-h)+'" width="40" height="'+h+'" rx="5" fill="'+(i%2?'#84b59a':'#397b5c')+'"/><text x="'+(33+i*59)+'" y="179" font-size="12">'+(3+i*4)+'</text>').join(''));
if(id==='triangles')return wrap('<path d="M165 14L25 164H315Z" fill="#e7f4e5" stroke="#407d60" stroke-width="3"/><path d="M105 79H228" stroke="#d9874c" stroke-width="4"/><text x="157" y="12">A</text><text x="12" y="177">B</text><text x="320" y="177">C</text><text x="91" y="76">D</text><text x="232" y="76">E</text><text x="150" y="108" font-size="12">parallel</text>');
if(id==='trig')return wrap('<path d="M60 158V21L288 158Z" fill="#e7f4e5" stroke="#407d60" stroke-width="3"/><path d="M60 138H80V158" fill="none" stroke="#407d60" stroke-width="2"/><text x="33" y="91">P</text><text x="166" y="178">B</text><text x="176" y="77">H</text><text x="265" y="151">θ</text>');
if(id==='coordinate')return wrap(axis+'<path d="M107 119L245 38" stroke="#257155" stroke-width="4"/><circle cx="107" cy="119" r="6" fill="#d9874c"/><circle cx="245" cy="38" r="6" fill="#d9874c"/><text x="90" y="140">A</text><text x="255" y="32">B</text>');
if(id==='mensuration')return wrap('<ellipse cx="165" cy="47" rx="92" ry="25" fill="#dcefdc" stroke="#2e7452" stroke-width="3"/><path d="M73 47V135A92 25 0 0 0 257 135V47" fill="#c3e2cf" stroke="#2e7452" stroke-width="3"/><text x="188" y="41">r</text><text x="268" y="96">h</text>');
if(id==='statistics')return wrap('<path d="M27 164H312" stroke="#8da598" stroke-width="2"/>'+[40,92,144,196,248].map((x,i)=>'<rect x="'+x+'" y="'+(161-[22,70,128,88,40][i])+'" width="40" height="'+[22,70,128,88,40][i]+'" fill="'+(i===2?'#dfa26b':'#77af93')+'"/>').join(''));
if(id==='probability')return wrap('<rect x="47" y="40" rx="15" width="105" height="105" fill="#e6f2e0" stroke="#377258" stroke-width="3"/><rect x="195" y="40" rx="15" width="105" height="105" fill="#e6f2e0" stroke="#377258" stroke-width="3"/>'+[[99,90],[221,70],[274,116]].map(p=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="7" fill="#377258"/>').join(''));
return '';
}
function worked(w,index,l){
return '<article class="panel worked"><div><div class="eyebrow">WORKED EXAMPLE '+index+'</div><h3>'+esc(w.q)+'</h3><ol>'+w.steps.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol><div class="answer-bar">Answer: '+esc(w.answer)+'</div></div><div>'+diagram(l.id)+'<div class="why" style="margin-top:13px"><strong>Core formula</strong><p class="formula-chip">'+esc(l.formula)+'</p></div></div></article>';
}
function chapter(){
const l=get(state.id),x=extra[l.id]||{},idx=lessons.findIndex(t=>t.id===l.id),done=state.done.has(l.id),c=coach[l.id]||{};
return '<div class="chapter-head"><div><div class="eyebrow">CHAPTER '+l.code+' / 10 · '+esc(l.tag)+'</div><h1>'+esc(l.title)+'</h1><p>'+esc(l.hook)+'</p></div><div class="chapter-tools">'+button(done?'✓ Reviewed':'Mark as reviewed','mark-done',done?'highlight':'light')+button('Next chapter →','shift-chapter','','data-offset="1"')+'</div></div><div class="path"><span>01 / UNDERSTAND</span><span>02 / SEE EXAMPLES</span><span>03 / SOLVE SEVEN</span><span>04 / REVISE</span></div>'+
'<div class="panel" style="background:#e4f1e5;border-color:#d0e5d5"><div class="eyebrow">THE ENTIRE IDEA IN PLAIN ENGLISH</div><h2 style="font-size:24px;margin:12px 0">'+esc(l.tiny)+'</h2><p>'+esc(c.analogy||l.hook)+'</p><div class="grid two" style="margin-top:18px"><div class="why"><strong>Your target</strong><p>'+esc(c.mission||l.hook)+'</p></div><div class="why"><strong>Before you start</strong><p>'+esc(c.prereq||'Revise basic calculations.')+'</p></div></div></div>'+
'<section class="section">'+section('Three ideas you must know','A / THE EXPLANATION','Every new idea comes with an example and a method you can repeat.')+'<div class="concept-stack">'+(x.sections||[]).map((s,i)=>'<article class="panel concept"><span class="concept-index">0'+(i+1)+'</span><div><h3>'+esc(s.title)+'</h3><p>'+esc(s.explain)+'</p><div class="try"><strong>FOR EXAMPLE</strong>'+esc(s.example)+'</div><div class="method" style="margin-top:13px"><strong>Do it like this:</strong> '+esc(s.method)+'</div></div></article>').join('')+'</div></section>'+
'<section class="section">'+section('Two step-by-step solutions','B / WORKED EXAMPLES','Try to predict the next step before scrolling.')+'<div class="grid">'+worked(l.example,1,l)+worked(x.worked,2,l)+'</div></section>'+
'<div class="exam-tip"><strong>Exam mistake to avoid</strong><p>'+esc(l.trap)+'</p></div>'+
'<section class="section">'+section('Seven questions. One uninterrupted round.','C / PRACTICE','Solve in a rough notebook. Reveal solutions after attempting—not before.')+'<div class="study-grid">'+exercises.filter(q=>q.chapter===l.id).map(question).join('')+'</div></section>'+
'<div class="sticky-actions"><span class="muted" style="font-size:12px">Finish this chapter at your own pace.</span><div class="actions">'+button('← Previous','shift-chapter','light','data-offset="-1"')+button(done?'✓ Reviewed':'Mark as reviewed','mark-done','highlight')+button('Next →','shift-chapter','','data-offset="1"')+'</div></div>';
}
function question(q){
 const revealed=state.revealed.has(q.id),marked=state.mistakes.has(q.id),hints=getHints(q),hintCount=state.hint[q.id]||0,review=state.review[q.id];
 return '<article class="question-card" data-question="'+esc(q.id)+'"><div class="question-head"><span class="question-no">'+esc(q.title)+(state.solved.has(q.id)?' · ✓ solved':'')+'</span><span class="difficulty '+esc(q.level)+'">'+esc(levelText(q))+'</span></div><h3>'+esc(q.q)+'</h3>'+
 (hintCount?'<div class="hint-stack">'+hints.slice(0,hintCount).map((h,i)=>'<div class="hint-entry"><strong>Hint '+(i+1)+'</strong>'+esc(h)+'</div>').join('')+'</div>':'')+
 (revealed?'<div class="answer-reveal"><b>Answer: '+esc(q.a)+'</b><p>'+esc(q.work)+'</p></div>':'')+
 '<div class="question-foot">'+(hints.length&&hintCount<hints.length?button('Need a hint? ('+(hintCount+1)+'/'+hints.length+')','hint','light small','data-qid="'+q.id+'"'):'')+
 button(revealed?'Hide solution':'Reveal worked answer','answer','light small','data-qid="'+q.id+'"')+
 (revealed?button('✓ Solved independently','got-it','highlight small','data-qid="'+q.id+'"')+button('↻ Need more practice','retry','light small','data-qid="'+q.id+'"'):'')+
 button(marked?'✓ Flagged':'Flag difficult','mistake','ghost small','data-qid="'+q.id+'"')+'</div>'+
 (review?'<div class="review-date">Next review: '+(review.next<=today()?'due now':new Date(review.next*86400000).toLocaleDateString('en-IN',{day:'numeric',month:'short'}))+'</div>':'')+
 '</article>';
}
function practice(){
const set=exercises.filter(q=>(state.filter==='all'||state.filter===q.chapter)&&(state.level==='all'||state.level===q.level)&&(!state.search||(q.q+' '+q.title+' '+q.work).toLowerCase().includes(state.search.toLowerCase())));
return header('70 written practice problems.','QUESTION BANK / WRITE FIRST, CHECK AFTER','Use the hints before revealing a full worked answer. After solving, schedule the next review or flag the question to practise again.')+
'<div class="filters"><div class="actions"><label class="field">Search questions<input class="search-input" id="practice-search" type="search" placeholder="e.g. quadratic, area..." value="'+esc(state.search)+'"></label><label class="field">Choose chapter<select id="chapter-filter"><option value="all">All 10 chapters</option>'+lessons.map(l=>'<option value="'+l.id+'" '+(state.filter===l.id?'selected':'')+'>'+esc(l.title)+'</option>').join('')+'</select></label></div><div class="level-filter">'+['all','easy','medium','hard'].map(v=>'<button class="chip '+(state.level===v?'active':'')+'" data-action="level" data-level="'+v+'">'+(v==='all'?'All levels':v.toUpperCase())+'</button>').join('')+'</div></div>'+
'<div class="section-heading"><p>'+set.length+' matching problems · showing '+Math.min(set.length,state.limit)+'</p>'+button('Print worksheet','print','light small')+'</div>'+
'<div class="study-grid">'+set.slice(0,state.limit).map(question).join('')+'</div>'+(set.length>state.limit?'<div style="text-align:center;margin:23px 0">'+button('Load more questions','more','light')+'</div>':'');
}
function mistakes(){
 const set=Object.keys(lookup).filter(id=>state.mistakes.has(id)).map(id=>lookup[id]);
 return header('Your mistake notebook.','PERSONALISED REVISION / STORED IN BROWSER','Both self-flagged questions and wrong answers from completed MCQ tests appear here. Solve again, then click “Solved independently”.')+
 (set.length?'<div class="actions" style="margin:20px 0">'+button('Show all saved answers','all-mistakes','light')+button('Remove all flags','clear-mistakes','ghost')+'</div><div class="study-grid">'+set.map(question).join('')+'</div>':'<div class="panel" style="padding:32px"><h2>Nothing to revisit yet.</h2><p class="muted">Hard questions and incorrectly answered quiz items are collected here for later practice.</p>'+button('Open question bank','to-practice')+'</div>');
}
function due(){
 const set=dueIds().map(id=>lookup[id]);
 return header('Review what you learned.','SPACED REVISION / REPEAT BEFORE YOU FORGET','A solved question comes back after 1, 3, 7, 14, 30 and 60 days, based on your successful reviews. Questions you found difficult are due immediately.')+
 '<div class="grid three" style="margin:20px 0">'+
 '<div class="panel stat"><span class="symbol">◷</span><div><strong>'+set.length+'</strong><span>questions due today</span></div></div>'+
 '<div class="panel stat"><span class="symbol">✓</span><div><strong>'+state.solved.size+'</strong><span>questions solved independently</span></div></div>'+
 '<div class="panel stat"><span class="symbol">▤</span><div><strong>'+masteredCount()+'</strong><span>chapters with demonstrated MCQ proficiency</span></div></div></div>'+
 (set.length?'<div class="study-grid">'+set.map(question).join('')+'</div>':'<div class="panel"><h2>All caught up for today.</h2><p class="muted">When you solve a question, tap “Solved independently” to schedule spaced review.</p>'+button('Practise more','to-practice')+'</div>');
}
function formulas(){
return header('Formula library.','EVERY INCLUDED CHAPTER / ONE REFERENCE','The formulas that unlock common Class 10 questions. Remember why they work, not only how they look.')+
'<div class="formula-list">'+lessons.map(l=>'<article class="panel"><div class="eyebrow">CHAPTER '+l.code+'</div><h3 style="margin:8px 0 12px">'+esc(l.title)+'</h3><div class="formula-chip" style="background:#edf4e9;border-radius:10px;padding:12px">'+esc(l.formula)+'</div><ul style="padding-left:18px;color:#5e7469;font-size:13px">'+l.rules.map(r=>'<li style="margin:7px 0">'+esc(r)+'</li>').join('')+'</ul>'+button('Learn this chapter →','to-chapter','light small','data-chapter="'+l.id+'"')+'</article>').join('')+'</div>'+
'<section class="section"><article class="panel"><div class="eyebrow">TRIG VALUES YOU NEED TO KNOW</div><h2>0°, 30°, 45°, 60°, 90°</h2><div class="table-wrap"><table class="values"><thead><tr><th>Angle</th><th>0°</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th></tr></thead><tbody><tr><td>sin</td><td>0</td><td>1/2</td><td>1/√2</td><td>√3/2</td><td>1</td></tr><tr><td>cos</td><td>1</td><td>√3/2</td><td>1/√2</td><td>1/2</td><td>0</td></tr><tr><td>tan</td><td>0</td><td>1/√3</td><td>1</td><td>√3</td><td>undefined</td></tr></tbody></table></div></article></section>'+
'<div class="actions">'+button('Print formulas','print','light')+'</div>';
}
function exam(){
let test=state.exam;
if(!test)return header('Mock test lab.','SELF CHECK / MARKED INSTANTLY','Tests sample questions across included chapters. Work without checking notes, then reveal explanations for every answer.')+
'<section class="section">'+section('Choose your test length','MCQ MODE','All tests contain original concept and calculation questions.')+
'<div class="grid three">'+[10,20,30].map(n=>'<button class="test-choice '+(state.examSize===n?'active':'')+'" data-action="test-size" data-size="'+n+'"><strong>'+n+' questions</strong><small>'+Math.round(n*1.5)+' minutes suggested · mixed topics</small></button>').join('')+'</div><div style="margin:22px 0">'+button('Start '+state.examSize+'-question mock test →','test-start','','data-size="'+state.examSize+'"')+'</div></section>'+
'<div class="why"><strong>Real examination technique</strong><p>Use pencil and paper to work out answers first. Each MCQ checks a small idea. The app saves neither personal information nor your written workings.</p></div>';
let score=0;if(state.quizResult){test.questions.forEach(q=>{if(test.answers[q.id]===q.correct)score++})}
return '<div class="section-heading"><div><div class="eyebrow">ASSESSMENT MODE · '+test.questions.length+' QUESTIONS</div><h1 style="margin:7px 0">'+(state.quizResult?'Your results':'Maths mixed quiz')+'</h1><p class="muted">'+(state.quizResult?'Read each explanation and revise weaker chapters.':'Select one option for each question. Submit whenever you are done.')+'</p></div><div class="actions">'+button('Start a new quiz','test-reset','light')+'</div></div>'+
(state.quizResult?'<div class="score"><small>YOUR RESULT</small><b>'+score+' / '+test.questions.length+' correct · '+Math.round(score/test.questions.length*100)+'%</b><span>'+ (score===test.questions.length?'Excellent accuracy. Increase difficulty with written problems.':score>test.questions.length/2?'Review your incorrect responses below.':'Revise the chapter concepts first, then retake the quiz.') +'</span></div>':'')+
test.questions.map((q,i)=>'<article class="test-question"><span class="eyebrow">QUESTION '+(i+1)+' / '+test.questions.length+' · '+esc(q.title)+'</span><h3>'+esc(q.q)+'</h3>'+q.options.map((option,n)=>'<label class="choice '+(state.quizResult?(n===q.correct?'right':test.answers[q.id]===n?'wrong':''):'')+'"><input type="radio" name="'+q.id+'" value="'+n+'" data-testid="'+q.id+'" '+(test.answers[q.id]===n?'checked':'')+' '+(state.quizResult?'disabled':'')+'><span>'+String.fromCharCode(65+n)+'. '+esc(option)+'</span></label>').join('')+(state.quizResult?'<div class="test-explain"><strong>Correct: '+String.fromCharCode(65+q.correct)+'</strong> — '+esc(q.explanation)+'</div>':'')+'</article>').join('')+
'<div class="sticky-actions"><span class="muted" style="font-size:12px">'+Object.keys(test.answers).length+' / '+test.questions.length+' answered</span><div class="actions">'+(state.quizResult?button('Try another test','test-reset','highlight'):button('Submit test and show explanations','test-submit','highlight'))+'</div></div>';
}
function startTest(n){
const byChapter=lessons.map(l=>(extra[l.id]?.mcq||[]).map((q,i)=>({...q,chapter:l.id,title:l.title,id:l.id+'-q'+i})));
const buckets=byChapter.map(arr=>arr.slice().sort(()=>Math.random()-.5)),pick=[];
for(let i=0;i<3&&pick.length<n;i++)for(const bucket of buckets){if(bucket[i]&&pick.length<n)pick.push(bucket[i])}
state.exam={questions:pick,answers:{}};state.quizResult=null;navigate('exam');
}
function lab(){
return header('Math playground.','INTERACTIVE LEARNING / CHANGE THE VALUES','Change numbers yourself and watch how formulas work. Three interactive mini-labs help you connect the method to the answer.')+
'<div class="grid three">'+[['quadratic','Quadratic roots'],['ap','Arithmetic progression'],['trig','Right triangle ratios']].map(x=>'<button class="test-choice '+(state.lab===x[0]?'active':'')+'" data-action="lab-switch" data-lab="'+x[0]+'"><strong>'+x[1]+'</strong><small>Change inputs and see each step</small></button>').join('')+'</div>'+
'<article class="panel" style="margin-top:17px"><div id="lab-inner">'+labForm()+'</div></article>';
}
function labForm(){
const t=state.lab||'quadratic';
if(t==='ap')return '<div class="eyebrow">VISUALISE A SEQUENCE</div><h2>Arithmetic progression builder</h2><p class="muted">Choose first term a, common difference d and number of terms n.</p><div class="form-row"><label class="field">First term a<input id="lab-a" type="number" value="3" step="any"></label><label class="field">Difference d<input id="lab-b" type="number" value="4" step="any"></label><label class="field">Terms n<input id="lab-c" type="number" value="10" min="1" max="100" step="1"></label></div><div class="lab-output" id="lab-output" aria-live="polite"></div>';
if(t==='trig')return '<div class="eyebrow">DRAW A RIGHT TRIANGLE</div><h2>SOH–CAH–TOA explorer</h2><p class="muted">Enter perpendicular/opposite and base/adjacent lengths (positive numbers).</p><div class="form-row"><label class="field">Opposite P<input id="lab-a" type="number" value="3" min="0.01" step="any"></label><label class="field">Adjacent B<input id="lab-b" type="number" value="4" min="0.01" step="any"></label></div><div class="lab-output" id="lab-output" aria-live="polite"></div><div id="lab-plot" class="lab-plot"></div>';
return '<div class="eyebrow">DISCOVER ROOTS WITH THE DISCRIMINANT</div><h2>Quadratic equation explorer</h2><p class="muted">For ax² + bx + c = 0, change the coefficients and watch the roots and graph.</p><div class="form-row"><label class="field">Coefficient a<input id="lab-a" type="number" value="1" step="any"></label><label class="field">Coefficient b<input id="lab-b" type="number" value="-5" step="any"></label><label class="field">Coefficient c<input id="lab-c" type="number" value="6" step="any"></label></div><div class="lab-output" id="lab-output" aria-live="polite"></div><div id="lab-plot" class="lab-plot"></div>';
}
function computeLab(){
if(state.page!=='lab')return;
const t=state.lab||'quadratic',a=Number(dom('lab-a')?.value),b=Number(dom('lab-b')?.value),c=Number(dom('lab-c')?.value);
const out=dom('lab-output'),plot=dom('lab-plot');if(!out)return;
if(t==='ap'){
 if(!Number.isFinite(a)||!Number.isFinite(b)||!Number.isInteger(c)||c<1||c>100){out.textContent='Choose finite numbers and an integer n between 1 and 100.';return}
 const last=a+(c-1)*b,sum=c/2*(2*a+(c-1)*b),display=Array.from({length:Math.min(c,14)},(_,i)=>(a+i*b).toLocaleString('en-IN')).join(', ');
 out.innerHTML='<strong>aₙ = '+last.toLocaleString('en-IN')+' · Sₙ = '+sum.toLocaleString('en-IN')+'</strong><div>Sequence: '+esc(display)+(c>14?', …':'')+'</div><em>aₙ = a + (n − 1)d · Sₙ = n[2a + (n − 1)d] / 2</em>';return;
}
if(t==='trig'){
 if(!(a>0&&b>0&&Number.isFinite(a)&&Number.isFinite(b))){out.textContent='Enter two positive side lengths.';if(plot)plot.innerHTML='';return}
 const h=Math.hypot(a,b),f=n=>Number(n.toFixed(4)).toString();
 out.innerHTML='<strong>Hypotenuse H = '+f(h)+'</strong>sin θ = P/H = '+f(a/h)+' · cos θ = B/H = '+f(b/h)+' · tan θ = P/B = '+f(a/b)+'<br><em>θ ≈ '+f(Math.atan2(a,b)*180/Math.PI)+'° (angle next to B)</em>';
 if(plot)plot.innerHTML='<svg viewBox="0 0 340 225" role="img" aria-label="Right triangle with sides '+esc(f(a))+', '+esc(f(b))+', '+esc(f(h))+'"><path d="M65 188V30L293 188Z" fill="#e1f2de" stroke="#2d7453" stroke-width="3"/><path d="M65 173H80V188" fill="none" stroke="#2d7453"/><text x="19" y="111" font-size="14">P='+esc(f(a))+'</text><text x="151" y="207" font-size="14">B='+esc(f(b))+'</text><text x="177" y="95" font-size="14">H='+esc(f(h))+'</text><text x="275" y="179" font-size="16">θ</text></svg>';return;
}
if(!Number.isFinite(a)||!Number.isFinite(b)||!Number.isFinite(c)||a===0){out.textContent='a must be nonzero and all coefficients must be finite numbers.';if(plot)plot.innerHTML='';return}
const D=b*b-4*a*c,fix=n=>Number(n.toFixed(5)).toString(),v=-b/(2*a);
let roots=D<0?'No real roots':D===0?'One repeated real root: x = '+fix(v):'Two real roots: x = '+fix((-b+Math.sqrt(D))/(2*a))+' and x = '+fix((-b-Math.sqrt(D))/(2*a));
out.innerHTML='<strong>D = b² − 4ac = '+fix(D)+'</strong><div>'+esc(roots)+'</div><em>Vertex at x = −b/(2a) = '+fix(v)+' · quadratic: '+esc(a+'x² + ('+b+')x + ('+c+')')+'</em>';
if(plot){const padX=Math.max(4,Math.min(30,Math.sqrt(Math.abs(D)||1)/Math.max(1,Math.abs(a)))+2),lo=v-padX,hi=v+padX;const ys=Array.from({length:101},(_,i)=>{const x=lo+(hi-lo)*i/100;return a*x*x+b*x+c});const bottom=Math.min(0,...ys),top=Math.max(0,...ys),range=Math.max(1,top-bottom),toX=x=>20+(x-lo)/(hi-lo)*300,toY=y=>190-(y-bottom)/range*170;const curve=ys.map((y,i)=>(i?'L':'M')+toX(lo+(hi-lo)*i/100).toFixed(2)+','+toY(y).toFixed(2)).join(' ');plot.innerHTML='<svg viewBox="0 0 340 215" role="img" aria-label="Graph of the current quadratic equation"><line x1="20" y1="'+toY(0)+'" x2="320" y2="'+toY(0)+'" stroke="#a5bbae"/><line x1="'+toX(0)+'" y1="15" x2="'+toX(0)+'" y2="190" stroke="#b3c6b5"/><path d="'+curve+'" stroke="#256c52" stroke-width="3" fill="none"/><circle cx="'+toX(v)+'" cy="'+toY(a*v*v+b*v+c)+'" r="5" fill="#d68d55"/><text x="19" y="206" font-size="11">x: '+fix(lo)+'</text><text x="248" y="206" font-size="11">'+fix(hi)+'</text></svg>'}
}
function eventAction(el){
const act=el.dataset.action;
if(act==='continue'){navigate('chapter',(lessons.find(l=>!state.done.has(l.id))||lessons[0]).id)}
if(act==='to-practice')navigate('practice');
if(act==='to-chapter')navigate('chapter',el.dataset.chapter);
if(act==='mark-done'){if(state.done.has(state.id))state.done.delete(state.id);else state.done.add(state.id);persist();render()}
if(act==='shift-chapter'){const pos=lessons.findIndex(l=>l.id===state.id);navigate('chapter',lessons[(pos+Number(el.dataset.offset)+lessons.length)%lessons.length].id)}
if(act==='answer'){const id=el.dataset.qid;if(state.revealed.has(id))state.revealed.delete(id);else state.revealed.add(id);render()}
if(act==='hint'){const id=el.dataset.qid,q=lookup[id];state.hint[id]=Math.min((state.hint[id]||0)+1,getHints(q).length);render()}
if(act==='got-it'){confidence(el.dataset.qid,true);render()}
if(act==='retry'){confidence(el.dataset.qid,false);render()}
if(act==='mistake'){const id=el.dataset.qid;if(state.mistakes.has(id))state.mistakes.delete(id);else state.mistakes.add(id);persist();render()}
if(act==='level'){state.level=el.dataset.level;state.limit=12;render()}
if(act==='more'){state.limit+=12;render()}
if(act==='all-mistakes'){Object.keys(lookup).filter(id=>state.mistakes.has(id)).forEach(id=>state.revealed.add(id));render()}
if(act==='clear-mistakes'){state.mistakes.clear();persist();render()}
if(act==='print')window.print();
if(act==='test-size'){state.examSize=Number(el.dataset.size);render()}
if(act==='test-start')startTest(Number(el.dataset.size||state.examSize));
if(act==='test-submit'){state.quizResult=true;render();window.scrollTo({top:0,behavior:'smooth'})}
if(act==='test-reset'){state.exam=null;state.quizResult=null;navigate('exam')}
if(act==='lab-switch'){state.lab=el.dataset.lab;render()}
}
document.addEventListener('click',event=>{
const el=event.target.closest('button');if(!el)return;
if(el.id==='menu'){const open=!dom('sidebar').classList.contains('open');dom('sidebar').classList.toggle('open',open);dom('shade').classList.toggle('show',open);el.setAttribute('aria-expanded',String(open));return}
if(el.dataset.page){navigate(el.dataset.page,el.dataset.chapter);return}
if(el.dataset.action)eventAction(el);
});
dom('shade').addEventListener('click',()=>{dom('sidebar').classList.remove('open');dom('shade').classList.remove('show');dom('menu').setAttribute('aria-expanded','false')});
document.addEventListener('change',e=>{
if(e.target.id==='chapter-filter'){state.filter=e.target.value;state.limit=12;render()}
if(e.target.matches('input[data-testid]')&&state.exam&&!state.quizResult){state.exam.answers[e.target.dataset.testid]=Number(e.target.value)}
});
document.addEventListener('input',e=>{
 if(['lab-a','lab-b','lab-c'].includes(e.target.id))computeLab();
 if(e.target.id==='practice-search'){
   state.search=e.target.value;
   const caret=e.target.selectionStart;
   state.limit=12;render();
   const input=dom('practice-search');
   if(input){input.focus();try{input.setSelectionRange(caret,caret)}catch(_){}}
 }
});
render();
})();
