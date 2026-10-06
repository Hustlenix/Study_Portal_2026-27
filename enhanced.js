(() => {
"use strict";
const KEY="study-portal-2026-27-advanced";
let state=JSON.parse(localStorage.getItem(KEY)||"{}");
state.mastery ||= {}; state.totalAnswered ||= 0; state.totalCorrect ||= 0;
state.flash ||= {}; state.written ||= {}; state.viva ||= {}; state.studyDays ||= [];
let data=null, smartQuiz=[], smartIndex=0, smartScore=0, smartAnswered=false, recognition=null;
let labTopic="letter", flashIndex=0, shortIndex=0, vivaIndex=0, currentMode="learn", autoNarrate=false;
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const topicNames={letter:"The Letter",shady:"A Shady Plot",patol:"Patol Babu","not-marble":"Sonnet 55",ozymandias:"Ozymandias",mariner:"Ancient Mariner",snake:"Snake",departed:"Dear Departed",email:"Email",leave:"Leave Application",complaint:"Complaint Letter",editor:"Letter to Editor",article:"Article",factual:"Factual Description"};
function engineReady(){return window.Module&&typeof Module.ccall==="function";}
function ccall(name,args,vals,fallback){if(engineReady()){try{return Module.ccall(name,"number",args.map(()=> "number"),vals);}catch(_){}}return fallback();}
function daysSince(ts){return ts?Math.max(0,Math.floor((Date.now()-ts)/86400000)):30;}
function adaptiveWeight(topic){const s=state.mastery[topic]||{correct:0,wrong:0,streak:0,last:0};return ccall("adaptive_weight",[0,0,0,0],[s.correct||0,s.wrong||0,s.streak||0,daysSince(s.last)],()=>{const a=(s.correct||0)+(s.wrong||0),acc=a?(s.correct||0)/a:.45;return Math.max(10,Math.round(100+(s.wrong||0)*22+(1-acc)*95+Math.min(daysSince(s.last),14)*4-Math.min(s.streak||0,8)*7+(a?0:55)));});}
function masteryScore(topic){const s=state.mastery[topic]||{correct:0,wrong:0,streak:0};return ccall("mastery_score",[0,0,0],[s.correct||0,s.wrong||0,s.streak||0],()=>{const a=(s.correct||0)+(s.wrong||0);return a?Math.min(100,Math.round(100*(s.correct||0)/a+Math.min(s.streak||0,5)*3)):0;});}
function nextInterval(topic){const s=state.mastery[topic]||{wrong:0,streak:0};const m=masteryScore(topic);return ccall("next_interval_days",[0,0,0],[m,s.streak||0,s.wrong||0],()=>m<40?0:m<60?1:m<75?2:m<90?5:10);}
function recordStudy(){const d=new Date().toISOString().slice(0,10);if(!state.studyDays.includes(d)){state.studyDays.push(d);state.studyDays=state.studyDays.slice(-60);save();}}
function streak(){let n=0,d=new Date();for(;;){const k=d.toISOString().slice(0,10);if(state.studyDays.includes(k)){n++;d.setDate(d.getDate()-1);}else break;}return n;}

function voiceRate(){return Number($("voiceRate")?.value||0.95);}
function selectedVoice(){const name=$("voiceSelect")?.value;return speechSynthesis.getVoices().find(v=>v.name===name);}
function speak(text,onend){if(!("speechSynthesis" in window)){setVoiceStatus("Speech output is not available in this browser.");return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-IN";u.rate=voiceRate();const v=selectedVoice();if(v)u.voice=v;if(onend)u.onend=onend;speechSynthesis.speak(u);}
function stopVoice(){if("speechSynthesis" in window)speechSynthesis.cancel();if(recognition){try{recognition.stop();}catch(_){}recognition=null;}setVoiceStatus("Voice stopped.");}
function setVoiceStatus(t){const e=$("voiceStatus");if(e)e.textContent=t;const l=$("labVoiceStatus");if(l)l.textContent=t;}
function populateVoices(){if(!("speechSynthesis" in window)||!$("voiceSelect"))return;const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang));const old=$("voiceSelect").value;$("voiceSelect").innerHTML=vs.map(v=>`<option value="${esc(v.name)}">${esc(v.name)} · ${esc(v.lang)}</option>`).join("");if(vs.some(v=>v.name===old))$("voiceSelect").value=old;}
if("speechSynthesis" in window){speechSynthesis.onvoiceschanged=populateVoices;setTimeout(populateVoices,100);}

function recognitionCtor(){return window.SpeechRecognition||window.webkitSpeechRecognition;}
function listen(prompt,onText){const C=recognitionCtor();if(!C){setVoiceStatus("Speech recognition is unavailable here. Chrome on Android/desktop generally supports it best.");return;}if(recognition)try{recognition.stop();}catch(_){}const r=new C();recognition=r;r.lang="en-IN";r.interimResults=false;r.continuous=false;r.maxAlternatives=3;setVoiceStatus(prompt||"Listening…");r.onresult=e=>{const t=e.results[0][0].transcript.trim();setVoiceStatus('Heard: "'+t+'"');onText(t);};r.onerror=e=>setVoiceStatus("Microphone: "+e.error);r.onend=()=>{recognition=null;};r.start();}
function normalize(s){return String(s).toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
function parseChoice(text,options){const t=normalize(text);const map={a:0,ay:0,hey:0,b:1,bee:1,be:1,c:2,see:2,sea:2,d:3,dee:3};const first=t.replace(/[^a-z]/g,"").slice(0,3);if(map[first]!==undefined)return map[first];for(let i=0;i<4;i++){const o=normalize(options[i]);if(t===o||t.includes(o)||o.includes(t))return i;}return -1;}

async function loadData(){
  try{
    const r=await fetch("generated/study-data.json",{cache:"no-store"});if(!r.ok)throw new Error("dataset");
    data=await r.json();
    if(typeof quizBank!=="undefined"){const seen=new Set(quizBank.map(x=>x.q));for(const q of data.questions)if(!seen.has(q.prompt))quizBank.push({q:q.prompt,a:q.options,correct:q.correct,why:q.explanation});}
    $("dataStatus").textContent=`${data.question_count} MCQs · ${data.total_study_items} total study prompts · Python validated · ${engineReady()?"C++/WASM active":"WASM loading"}`;
    $("questionCount").textContent=data.question_count;
    if($("totalStudyItems"))$("totalStudyItems").textContent=data.total_study_items;
    fillTopicSelect(); renderMastery(); renderLab(); recordStudy(); renderDayStats();
  }catch(e){$("dataStatus").textContent="Advanced dataset unavailable — base portal still works.";}
}
window.addEventListener("study-engine-ready",()=>{if(data)$("dataStatus").textContent=`${data.question_count} MCQs · ${data.total_study_items} total study prompts · Python validated · C++/WASM active`;renderMastery();});

function fillTopicSelect(){
  const keys=Object.keys(data.topics);
  $("labTopic").innerHTML=keys.map(k=>`<option value="${k}">${esc(data.topics[k].title)}</option>`).join("");
  $("labTopic").value=labTopic;
}
function setMode(mode){
  currentMode=mode;
  document.querySelectorAll("[data-lab-mode]").forEach(b=>b.classList.toggle("active",b.dataset.labMode===mode));
  document.querySelectorAll(".lab-pane").forEach(p=>p.hidden=p.dataset.pane!==mode);
  renderLab();
}
function renderLab(){
  if(!data)return;const t=data.topics[labTopic];if(!t)return;
  $("labTitle").textContent=t.title;$("labCategory").textContent=t.category;
  if(currentMode==="learn"){
    $("learnPane").innerHTML=`<div class="learn-grid"><div><span class="eyebrow">60-second lesson</span><p class="lesson-copy">${esc(t.lesson.summary)}</p><div class="recall-strip"><b>Recall chain</b><span>${esc(t.lesson.recall)}</span></div></div><aside><span class="eyebrow">Exam keywords</span><div class="keyword-cloud">${t.lesson.keywords.map(x=>`<span>${esc(x)}</span>`).join("")}</div><span class="eyebrow block-gap">Themes</span><ul class="compact-list">${t.lesson.themes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><div class="answer-frame"><b>Answer frame</b><p>${esc(t.lesson.answer_frame)}</p></div></aside></div><div class="lab-actions"><button class="primary-btn compact" id="readLesson">▶ Read lesson</button><button class="secondary-btn compact" id="readRecall">Read recall chain</button></div>`;
    $("readLesson").onclick=()=>speak(t.title+". "+t.lesson.summary+". Exam keywords: "+t.lesson.keywords.join(", ")+".");
    $("readRecall").onclick=()=>speak("Recall chain. "+t.lesson.recall,.9);
    if(autoNarrate)speak(t.title+". "+t.lesson.summary,.95);
  } else if(currentMode==="flash"){
    const cards=t.flashcards;flashIndex%=cards.length;const c=cards[flashIndex];
    $("flashPane").innerHTML=`<div class="flash-progress">${flashIndex+1} / ${cards.length}</div><button class="flash-card" id="flashCard"><span class="eyebrow">Recall before revealing</span><strong>${esc(c.front)}</strong><div id="flashBack" hidden><i></i><p>${esc(c.back)}</p></div></button><div class="lab-actions"><button class="ghost-btn compact" id="flashAgain">Again</button><button class="secondary-btn compact" id="flashReveal">Reveal</button><button class="primary-btn compact" id="flashGood">Got it</button><button class="ghost-btn compact" id="flashRead">🔊 Read</button></div>`;
    const reveal=()=>{$("flashBack").hidden=false;};$("flashCard").onclick=reveal;$("flashReveal").onclick=reveal;
    $("flashAgain").onclick=()=>gradeFlash(false);$("flashGood").onclick=()=>gradeFlash(true);$("flashRead").onclick=()=>speak(c.front+". "+c.back);
  } else if(currentMode==="written"){
    const items=t.short_answers;shortIndex%=items.length;const x=items[shortIndex];
    $("writtenPane").innerHTML=`<span class="eyebrow">Write from memory</span><h4>${esc(x.q)}</h4><textarea id="writtenDraft" rows="7" placeholder="Write your answer here. Keep it exam-length and point-focused."></textarea><div class="lab-actions"><button class="primary-btn compact" id="checkWritten">Check against points</button><button class="ghost-btn compact" id="readWrittenQ">🔊 Read question</button></div><div id="writtenRubric" hidden></div>`;
    $("readWrittenQ").onclick=()=>speak(x.q);
    $("checkWritten").onclick=()=>checkWritten(x);
  } else if(currentMode==="viva"){
    const items=t.viva;vivaIndex%=items.length;const x=items[vivaIndex];
    $("vivaPane").innerHTML=`<div class="viva-orb" aria-hidden="true"><i></i><i></i><i></i></div><span class="eyebrow">Voice viva</span><h4>${esc(x.q)}</h4><p>Answer naturally in 20–40 seconds. The portal checks whether your response covers the key ideas; it does not judge accent.</p><div class="lab-actions"><button class="primary-btn compact" id="vivaCoach">▶ Ask me + listen</button><button class="secondary-btn compact" id="vivaListen">🎤 Answer now</button><button class="ghost-btn compact" id="vivaModel">Show model</button></div><div id="vivaFeedback" class="viva-feedback" hidden></div>`;
    $("vivaCoach").onclick=()=>speak(x.q,()=>listen("Listening to your answer…",text=>scoreViva(x,text)));
    $("vivaListen").onclick=()=>listen("Listening to your answer…",text=>scoreViva(x,text));
    $("vivaModel").onclick=()=>{$("vivaFeedback").hidden=false;$("vivaFeedback").innerHTML=`<b>Model answer</b><p>${esc(x.answer)}</p>`;speak(x.answer,.93);};
  }
}
function gradeFlash(good){state.flash[labTopic] ||= {good:0,again:0};state.flash[labTopic][good?"good":"again"]++;save();recordStudy();flashIndex++;renderLab();}
function checkWritten(x){const txt=$("writtenDraft").value.trim(),n=normalize(txt);const hits=x.points.filter(p=>n.split(" ").some(w=>normalize(p).includes(w)&&w.length>4)).length;const rating=txt.length>170?3:txt.length>90?2:txt.length>20?1:0;const score=ccall("written_self_score",[0,0,0],[hits,x.points.length,rating],()=>Math.round((hits/x.points.length)*75+rating*(25/3)));state.written[labTopic] ||= [];state.written[labTopic].push({at:Date.now(),score});save();recordStudy();$("writtenRubric").hidden=false;$("writtenRubric").innerHTML=`<div class="practice-score">${score}%</div><b>Scoring points to include</b><ul>${x.points.map(p=>`<li>${esc(p)}</li>`).join("")}</ul><details><summary>Model answer</summary><p>${esc(x.model)}</p></details><button class="primary-btn compact" id="nextWritten">Next question</button>`; $("nextWritten").onclick=()=>{shortIndex++;renderLab();};}
function scoreViva(x,text){const n=normalize(text),hits=x.keywords.filter(k=>n.includes(normalize(k))).length,words=n?n.split(" ").length:0;const score=ccall("viva_score",[0,0,0],[hits,x.keywords.length,words],()=>Math.min(100,Math.round((hits/x.keywords.length)*80+Math.min(20,words*.9))));state.viva[labTopic] ||= [];state.viva[labTopic].push({at:Date.now(),score});save();recordStudy();const missing=x.keywords.filter(k=>!n.includes(normalize(k)));$("vivaFeedback").hidden=false;$("vivaFeedback").innerHTML=`<div class="practice-score">${score}%</div><b>Your transcript</b><p>${esc(text)}</p><b>Key ideas covered: ${hits}/${x.keywords.length}</b>${missing.length?`<p class="missing">Add: ${missing.map(esc).join(", ")}</p>`:""}<details><summary>Compare with model answer</summary><p>${esc(x.answer)}</p></details><button class="primary-btn compact" id="nextViva">Next viva</button>`; $("nextViva").onclick=()=>{vivaIndex++;renderLab();};}
$("labTopic").addEventListener("change",e=>{labTopic=e.target.value;flashIndex=shortIndex=vivaIndex=0;renderLab();});
document.querySelectorAll("[data-lab-mode]").forEach(b=>b.onclick=()=>setMode(b.dataset.labMode));
$("autoNarrate").onchange=e=>{autoNarrate=e.target.checked;setVoiceStatus(autoNarrate?"Auto narration is on.":"Auto narration is off.");};
$("voiceStop").onclick=stopVoice;$("labStopVoice").onclick=stopVoice;

function weightedSample(items,count,weakOnly=false){const pool=items.map(x=>({...x,_w:adaptiveWeight(x.topic)}));if(weakOnly){pool.sort((a,b)=>b._w-a._w);const wt=new Set(pool.slice(0,Math.max(16,Math.floor(pool.length*.42))).map(x=>x.topic));return weightedSample(pool.filter(x=>wt.has(x.topic)),count,false);}const out=[];while(pool.length&&out.length<count){const total=pool.reduce((s,x)=>s+x._w,0);let r=Math.random()*total,p=0;for(let i=0;i<pool.length;i++){r-=pool[i]._w;if(r<=0){p=i;break;}}out.push(pool.splice(p,1)[0]);}return out;}
function startSmart(weakOnly=false){if(!data)return;smartQuiz=weightedSample(data.questions,20,weakOnly);smartIndex=0;smartScore=0;$("smartIntro").hidden=true;$("smartBody").hidden=false;$("smartResult").hidden=true;renderSmartQuestion();$("smartDrill").scrollIntoView({behavior:"smooth",block:"start"});}
function renderSmartQuestion(){smartAnswered=false;const x=smartQuiz[smartIndex];$("smartCounter").textContent=`${smartIndex+1} / ${smartQuiz.length}`;$("smartScore").textContent=`Score ${smartScore}`;$("smartQuestion").textContent=x.prompt;$("smartTopic").textContent=`${topicNames[x.topic]||x.topic} · ${x.difficulty}`;$("smartAnswers").innerHTML=x.options.map((o,i)=>`<button class="answer-btn" data-smart-answer="${i}"><span class="answer-key">${String.fromCharCode(65+i)}</span>${esc(o)}</button>`).join("");$("smartExplain").hidden=true;$("smartNext").hidden=true;$("smartProgress").style.width=((smartIndex+1)/smartQuiz.length*100)+"%";if(autoNarrate)speak(x.prompt+". A. "+x.options[0]+". B. "+x.options[1]+". C. "+x.options[2]+". D. "+x.options[3],.92);}
function answerSmart(choice){if(smartAnswered)return;smartAnswered=true;const x=smartQuiz[smartIndex],ok=choice===x.correct;if(ok)smartScore++;const s=state.mastery[x.topic] ||= {correct:0,wrong:0,streak:0,last:0};if(ok){s.correct++;s.streak++;}else{s.wrong++;s.streak=0;}s.last=Date.now();state.totalAnswered++;if(ok)state.totalCorrect++;save();recordStudy();document.querySelectorAll("[data-smart-answer]").forEach((b,i)=>{b.disabled=true;if(i===x.correct)b.classList.add("correct");if(i===choice&&i!==x.correct)b.classList.add("wrong");});$("smartExplain").textContent=(ok?"Correct. ":"Review this: ")+x.explanation;$("smartExplain").hidden=false;$("smartNext").hidden=false;renderMastery();if(autoNarrate)speak((ok?"Correct. ":"Not quite. ")+x.explanation,.96);}
function finishSmart(){$("smartBody").hidden=true;$("smartResult").hidden=false;const pct=Math.round(smartScore/smartQuiz.length*100);$("smartResult").innerHTML=`<div class="result-score">${smartScore}/${smartQuiz.length}</div><div class="result-copy">${pct>=85?"Strong. Run weak-area mode once, then stop drilling.":pct>=65?"Good pass. The engine has raised priority for your misses.":"Relearn the top two weak topics in Study Lab, then test again."}</div><button class="primary-btn" id="smartRetry">Another adaptive drill</button>`;$("smartRetry").onclick=()=>startSmart(false);}
$("smartStart").onclick=()=>startSmart(false);$("weakStart").onclick=()=>startSmart(true);$("smartAnswers").addEventListener("click",e=>{const b=e.target.closest("[data-smart-answer]");if(b)answerSmart(Number(b.dataset.smartAnswer));});$("smartNext").onclick=()=>{smartIndex++;smartIndex<smartQuiz.length?renderSmartQuestion():finishSmart();};
$("voiceReadCurrent").onclick=()=>{if(!smartQuiz.length)return setVoiceStatus("Start a smart drill first.");const x=smartQuiz[smartIndex];speak(x.prompt+". A. "+x.options[0]+". B. "+x.options[1]+". C. "+x.options[2]+". D. "+x.options[3],.92);setVoiceStatus("Reading the current question.");};
$("voiceAnswerCurrent").onclick=()=>{if(!smartQuiz.length)return setVoiceStatus("Start a smart drill first.");const x=smartQuiz[smartIndex];listen("Listening… say A, B, C or D.",t=>{const c=parseChoice(t,x.options);c>=0?answerSmart(c):setVoiceStatus("I could not map that to A/B/C/D. Try again.");});};

function renderMastery(){if(!data)return;const rows=Object.keys(data.topics).map(topic=>{const s=state.mastery[topic]||{};return{topic,name:data.topics[topic].title,score:masteryScore(topic),weight:adaptiveWeight(topic),attempts:(s.correct||0)+(s.wrong||0),days:nextInterval(topic)}}).sort((a,b)=>b.weight-a.weight);const weak=rows.find(x=>x.attempts)||rows[0];$("weakTopic").textContent=weak?weak.name:"Start a drill";$("overallAccuracy").textContent=state.totalAnswered?Math.round(state.totalCorrect/state.totalAnswered*100)+"%":"—";$("masteryList").innerHTML=rows.slice(0,6).map(r=>`<div class="mastery-row"><span>${esc(r.name)}</span><div><i style="width:${r.score}%"></i></div><b>${r.attempts?r.score+"%":"new"}</b></div>`).join("");if($("priorityQueue"))$("priorityQueue").innerHTML=rows.slice(0,4).map((r,i)=>`<button data-priority-topic="${r.topic}"><span>0${i+1}</span><b>${esc(r.name)}</b><small>${r.attempts?(r.days===0?"review now":"review in "+r.days+"d"):"not tested yet"}</small></button>`).join("");document.querySelectorAll("[data-priority-topic]").forEach(b=>b.onclick=()=>{labTopic=b.dataset.priorityTopic;$("labTopic").value=labTopic;setMode("learn");$("studyLab").scrollIntoView({behavior:"smooth"});});}
function renderDayStats(){if($("studyStreak"))$("studyStreak").textContent=streak()+"d";}

document.addEventListener("click",e=>{const open=e.target.closest("[data-open]");if(open)setTimeout(()=>{const t=typeof topics!=="undefined"?topics.find(x=>x.id===open.dataset.open):null;if(!t||$("modalVoiceBar"))return;const bar=document.createElement("div");bar.id="modalVoiceBar";bar.className="modal-voice-bar";bar.innerHTML='<button class="primary-btn compact" id="readTopicAloud">▶ Read summary</button><button class="ghost-btn compact" id="stopTopicVoice">Stop</button>';$("modalContent").appendChild(bar);$("readTopicAloud").onclick=()=>speak(t.title+". "+t.summary+". Key ideas. "+t.keys.join(". "),.94);$("stopTopicVoice").onclick=stopVoice;},0);});
$("resetMastery").onclick=()=>{if(confirm("Reset adaptive, flashcard, written and viva history on this device?")){state={mastery:{},totalAnswered:0,totalCorrect:0,flash:{},written:{},viva:{},studyDays:[]};save();renderMastery();renderDayStats();}};
if($("examSprint"))$("examSprint").onclick=()=>{if(!data)return;const weakest=Object.keys(data.topics).sort((a,b)=>adaptiveWeight(b)-adaptiveWeight(a))[0];labTopic=weakest;$("labTopic").value=weakest;setMode("learn");$("studyLab").scrollIntoView({behavior:"smooth"});};

loadData();populateVoices();
})();