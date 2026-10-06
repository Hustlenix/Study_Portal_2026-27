(() => {
"use strict";

const advancedStateKey = "study-portal-2026-27-advanced";
let advancedState = JSON.parse(localStorage.getItem(advancedStateKey) || "{}");
advancedState.mastery = advancedState.mastery || {};
advancedState.totalAnswered = advancedState.totalAnswered || 0;
advancedState.totalCorrect = advancedState.totalCorrect || 0;

let data = null;
let smartQuiz = [];
let smartIndex = 0;
let smartScore = 0;
let smartAnswered = false;
let activeVoiceRecognition = null;

const $ = (id) => document.getElementById(id);
const saveAdvanced = () => localStorage.setItem(advancedStateKey, JSON.stringify(advancedState));
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

function engineReady() {
  return window.Module && typeof Module.ccall === "function";
}

function daysSince(timestamp) {
  if (!timestamp) return 30;
  return Math.max(0, Math.floor((Date.now() - timestamp) / 86400000));
}

function adaptiveWeight(topic) {
  const s = advancedState.mastery[topic] || {correct:0,wrong:0,streak:0,last:0};
  if (engineReady()) {
    try {
      return Module.ccall("adaptive_weight","number",["number","number","number","number"],
        [s.correct||0,s.wrong||0,s.streak||0,daysSince(s.last)]);
    } catch (_) {}
  }
  const attempts=(s.correct||0)+(s.wrong||0);
  const accuracy=attempts ? (s.correct||0)/attempts : .45;
  return Math.max(10,Math.round(100+(s.wrong||0)*22+(1-accuracy)*95+Math.min(daysSince(s.last),14)*4-Math.min(s.streak||0,8)*7+(attempts?0:55)));
}

function masteryScore(topic) {
  const s = advancedState.mastery[topic] || {correct:0,wrong:0,streak:0};
  if (engineReady()) {
    try { return Module.ccall("mastery_score","number",["number","number","number"],[s.correct||0,s.wrong||0,s.streak||0]); }
    catch (_) {}
  }
  const attempts=(s.correct||0)+(s.wrong||0);
  return attempts ? Math.max(0,Math.min(100,Math.round(100*(s.correct||0)/attempts+Math.min(s.streak||0,5)*3))) : 0;
}

function weightedSample(items, count, weakOnly=false) {
  const pool = items.map(x => ({...x, _w: adaptiveWeight(x.topic)}));
  if (weakOnly) {
    pool.sort((a,b)=>b._w-a._w);
    const weakTopics = new Set(pool.slice(0, Math.max(12,Math.floor(pool.length*.45))).map(x=>x.topic));
    return weightedSample(pool.filter(x=>weakTopics.has(x.topic)), count, false);
  }
  const out=[];
  while(pool.length && out.length<count){
    const total=pool.reduce((s,x)=>s+x._w,0);
    let r=Math.random()*total, pick=0;
    for(let i=0;i<pool.length;i++){ r-=pool[i]._w; if(r<=0){pick=i;break;} }
    out.push(pool.splice(pick,1)[0]);
  }
  return out;
}

async function loadData() {
  const status=$("dataStatus");
  try {
    const res=await fetch("generated/study-data.json",{cache:"no-store"});
    if(!res.ok) throw new Error("dataset not available");
    data=await res.json();
    if (typeof quizBank !== "undefined") {
      const existing = new Set(quizBank.map(x=>x.q));
      for (const item of data.questions) {
        if (!existing.has(item.prompt)) quizBank.push({q:item.prompt,a:item.options,correct:item.correct,why:item.explanation});
      }
    }
    status.textContent=`${data.question_count} questions loaded · Python-validated data · ${engineReady()?"C++/WASM adaptive engine":"JS fallback (WASM loading)"}`;
    $("questionCount").textContent=data.question_count;
    renderMastery();
  } catch (e) {
    status.textContent="Advanced dataset unavailable — base study portal still works.";
    $("questionCount").textContent="16+";
  }
}

window.addEventListener("study-engine-ready",()=>{
  if(data) $("dataStatus").textContent=`${data.question_count} questions loaded · Python-validated data · C++/WASM adaptive engine`;
  renderMastery();
});

function renderMastery(){
  if(!data) return;
  const topicNames = {
    letter:"The Letter",shady:"A Shady Plot",patol:"Patol Babu", "not-marble":"Sonnet 55",
    ozymandias:"Ozymandias",mariner:"Ancient Mariner",snake:"Snake",departed:"Dear Departed",
    email:"Email",leave:"Leave application",complaint:"Complaint letter",editor:"Letter to editor",
    article:"Article",factual:"Factual description"
  };
  const rows=Object.keys(data.topic_counts).map(topic=>{
    const score=masteryScore(topic), weight=adaptiveWeight(topic);
    return {topic,name:topicNames[topic]||topic,score,weight,attempts:(advancedState.mastery[topic]?.correct||0)+(advancedState.mastery[topic]?.wrong||0)};
  }).sort((a,b)=>b.weight-a.weight);
  const attempted=rows.filter(x=>x.attempts);
  const weak=attempted.length ? attempted[0] : rows[0];
  $("weakTopic").textContent=weak ? weak.name : "Start a drill";
  $("overallAccuracy").textContent=advancedState.totalAnswered ? Math.round(advancedState.totalCorrect/advancedState.totalAnswered*100)+"%" : "—";
  $("masteryList").innerHTML=rows.slice(0,6).map(r=>`
    <div class="mastery-row"><span>${escapeHtml(r.name)}</span><div><i style="width:${r.score}%"></i></div><b>${r.attempts?r.score+"%":"new"}</b></div>
  `).join("");
}

function startSmart(weakOnly=false){
  if(!data) return;
  smartQuiz=weightedSample(data.questions,20,weakOnly);
  smartIndex=0;smartScore=0;smartAnswered=false;
  $("smartIntro").hidden=true;$("smartBody").hidden=false;$("smartResult").hidden=true;
  renderSmartQuestion();
  $("smartDrill").scrollIntoView({behavior:"smooth",block:"center"});
}

function renderSmartQuestion(){
  smartAnswered=false;
  const item=smartQuiz[smartIndex];
  $("smartCounter").textContent=`${smartIndex+1} / ${smartQuiz.length}`;
  $("smartScore").textContent=`Score ${smartScore}`;
  $("smartQuestion").textContent=item.prompt;
  $("smartTopic").textContent=`${item.topic.replace("-"," ")} · ${item.difficulty}`;
  $("smartAnswers").innerHTML=item.options.map((x,i)=>`<button class="answer-btn" data-smart-answer="${i}"><span class="answer-key">${String.fromCharCode(65+i)}</span>${escapeHtml(x)}</button>`).join("");
  $("smartExplain").hidden=true;$("smartNext").hidden=true;
  $("smartProgress").style.width=((smartIndex+1)/smartQuiz.length*100)+"%";
}

function answerSmart(choice){
  if(smartAnswered) return;
  smartAnswered=true;
  const item=smartQuiz[smartIndex], ok=choice===item.correct;
  if(ok) smartScore++;
  const s=advancedState.mastery[item.topic] ||= {correct:0,wrong:0,streak:0,last:0};
  if(ok){s.correct++;s.streak++;}else{s.wrong++;s.streak=0;}
  s.last=Date.now();advancedState.totalAnswered++;if(ok)advancedState.totalCorrect++;
  saveAdvanced();
  document.querySelectorAll("[data-smart-answer]").forEach((b,i)=>{
    b.disabled=true;if(i===item.correct)b.classList.add("correct");if(i===choice&&i!==item.correct)b.classList.add("wrong");
  });
  $("smartExplain").textContent=(ok?"Correct. ":"Review this: ")+item.explanation;
  $("smartExplain").hidden=false;$("smartNext").hidden=false;
  renderMastery();
}

function finishSmart(){
  $("smartBody").hidden=true;$("smartResult").hidden=false;
  const pct=Math.round(smartScore/smartQuiz.length*100);
  $("smartResult").innerHTML=`<div class="result-score">${smartScore}/${smartQuiz.length}</div>
    <div class="result-copy">${pct>=85?"Strong. Switch to weak-area drilling.":pct>=65?"Useful pass. The engine has increased priority for your misses.":"Relearn the weak topics, then run another smart drill."}</div>
    <button class="primary-btn" id="smartRetry">Run another adaptive drill</button>`;
  $("smartRetry").onclick=()=>startSmart(false);
}

$("smartStart").onclick=()=>startSmart(false);
$("weakStart").onclick=()=>startSmart(true);
$("smartAnswers").addEventListener("click",e=>{const b=e.target.closest("[data-smart-answer]");if(b)answerSmart(Number(b.dataset.smartAnswer));});
$("smartNext").onclick=()=>{smartIndex++; smartIndex<smartQuiz.length?renderSmartQuestion():finishSmart();};

function speak(text, rate=1){
  if(!("speechSynthesis" in window)){ $("voiceStatus").textContent="Speech output is not supported in this browser."; return; }
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="en-IN";u.rate=rate;u.pitch=1;
  speechSynthesis.speak(u);
}

function stopVoice(){
  if("speechSynthesis" in window) speechSynthesis.cancel();
  if(activeVoiceRecognition){try{activeVoiceRecognition.stop();}catch(_){} activeVoiceRecognition=null;}
  $("voiceStatus").textContent="Voice stopped.";
}

function recognitionCtor(){return window.SpeechRecognition || window.webkitSpeechRecognition;}

function listenOnce(onText){
  const Ctor=recognitionCtor();
  if(!Ctor){$("voiceStatus").textContent="Speech recognition is unavailable here. Chrome/Android usually works best.";return;}
  const rec=new Ctor();activeVoiceRecognition=rec;rec.lang="en-IN";rec.interimResults=false;rec.maxAlternatives=3;
  $("voiceStatus").textContent="Listening… say A, B, C or D.";
  rec.onresult=(e)=>{const text=e.results[0][0].transcript.trim();$("voiceStatus").textContent='Heard: "'+text+'"';onText(text);};
  rec.onerror=(e)=>{$("voiceStatus").textContent="Microphone error: "+e.error;};
  rec.onend=()=>{activeVoiceRecognition=null;};
  rec.start();
}

function parseChoice(text, options){
  const t=text.toLowerCase().trim();
  const letterMap={a:0,ay:0,hey:0,b:1,bee:1,be:1,c:2,see:2,sea:2,d:3,dee:3};
  const first=t.replace(/[^a-z]/g,"").slice(0,3);
  if(letterMap[first]!==undefined) return letterMap[first];
  for(let i=0;i<4;i++){
    const clean=options[i].toLowerCase().replace(/[^a-z0-9 ]/g,"");
    if(t.includes(clean) || clean.includes(t)) return i;
  }
  return -1;
}

$("voiceReadCurrent").onclick=()=>{
  if(!smartQuiz.length || smartIndex>=smartQuiz.length){$("voiceStatus").textContent="Start a smart drill first.";return;}
  const x=smartQuiz[smartIndex];
  speak(x.prompt+". A. "+x.options[0]+". B. "+x.options[1]+". C. "+x.options[2]+". D. "+x.options[3],.92);
  $("voiceStatus").textContent="Reading the current question aloud.";
};
$("voiceAnswerCurrent").onclick=()=>{
  if(!smartQuiz.length || smartIndex>=smartQuiz.length){$("voiceStatus").textContent="Start a smart drill first.";return;}
  const x=smartQuiz[smartIndex];
  listenOnce(text=>{const c=parseChoice(text,x.options);if(c>=0)answerSmart(c);else $("voiceStatus").textContent='Could not map "'+text+'" to A/B/C/D. Try again.';});
};
$("voiceStop").onclick=stopVoice;

document.addEventListener("click",e=>{
  const open=e.target.closest("[data-open]");
  if(open){
    setTimeout(()=>{
      if(!$("modalVoiceBar")){
        const t = typeof topics!=="undefined" ? topics.find(x=>x.id===open.dataset.open) : null;
        if(!t) return;
        const bar=document.createElement("div");bar.id="modalVoiceBar";bar.className="modal-voice-bar";
        bar.innerHTML='<button class="primary-btn compact" id="readTopicAloud">▶ Read summary aloud</button><button class="ghost-btn compact" id="stopTopicVoice">Stop</button>';
        $("modalContent").appendChild(bar);
        $("readTopicAloud").onclick=()=>speak(t.title+". "+t.summary+". Key ideas. "+t.keys.join(". "),.94);
        $("stopTopicVoice").onclick=stopVoice;
      }
    },0);
  }
});

$("resetMastery").onclick=()=>{
  if(confirm("Reset adaptive quiz history and mastery data on this device?")){
    advancedState={mastery:{},totalAnswered:0,totalCorrect:0};saveAdvanced();renderMastery();
  }
};

loadData();
})();