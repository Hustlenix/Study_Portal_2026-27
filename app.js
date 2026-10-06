const topics = [
  {
    id:"letter", type:"fiction", no:"F.3", title:"The Letter", author:"Dhumaketu",
    teaser:"Ali’s long wait for Miriam’s letter turns into a lesson in empathy.",
    summary:"Coachman Ali, once a skilled hunter, changes after his daughter Miriam marries and moves away. He visits the post office daily for years, hoping for her letter. The staff mock him. Before dying, he gives Lakshmi Das five gold guineas and asks him to deliver Miriam’s letter if it arrives. Later, when the Postmaster anxiously waits for news of his own sick daughter, he finally understands Ali’s pain. Miriam’s letter arrives after Ali’s death and is placed on his grave.",
    keys:["Parental love and separation","Hope and patience","Empathy born through personal suffering","The post office staff’s insensitivity","Transformation of Ali and the Postmaster"],
    recall:"Hunter → Miriam leaves → daily wait → five guineas → Ali dies → Postmaster understands → letter reaches grave."
  },
  {
    id:"shady", type:"fiction", no:"F.4", title:"A Shady Plot", author:"Elsie Brown",
    teaser:"A ghost-story writer meets the ghost who has been supplying his ideas.",
    summary:"John Hallock is pressured by his publisher to produce another ghost story. A ghost named Helen appears and reveals that she and other ghosts form a Writers’ Inspiration Bureau. They are on strike because Ouija-board users keep summoning them. She asks John to stop people using Ouija boards. Unfortunately, John’s wife Lavinia buys one and hosts a Ouija-board party. The board repeatedly connects John with 'Helen', making Lavinia suspect him. When Helen finally appears before Lavinia, the misunderstanding is cleared and John gets inspiration for another story.",
    keys:["Humour through the supernatural","Writer’s block and inspiration","Misunderstanding between John and Lavinia","Ouija boards as the source of conflict","Irony: a ghost helps write ghost stories"],
    recall:"Jenkins wants story → Helen appears → ghosts on strike → Lavinia buys Ouija board → 'Helen' causes suspicion → ghost appears → marriage saved."
  },
  {
    id:"patol", type:"fiction", no:"F.5", title:"Patol Babu, Film Star", author:"Satyajit Ray",
    teaser:"A tiny film role becomes a test of professionalism and artistic integrity.",
    summary:"Patol Babu, once a passionate stage actor, is offered a small film role. He is initially excited but feels disappointed when he discovers his only dialogue is the word 'Oh!'. He remembers his mentor Gogon Pakrashi’s teaching that no role is too small for a true actor. Patol Babu studies the situation, rehearses many ways of saying the word, times his collision precisely and performs brilliantly. Satisfied by the quality of his work, he leaves without collecting his payment.",
    keys:["Professionalism and dedication","No role is insignificant","Artistic satisfaction above money","Preparation transforms a tiny role","Gogon Pakrashi’s influence"],
    recall:"Old theatre passion → tiny role → only 'Oh!' → mentor remembered → detailed rehearsal → perfect take → leaves without payment."
  },
  {
    id:"not-marble", type:"poetry", no:"P.8", title:"Not Marble, nor the Gilded Monuments", author:"William Shakespeare",
    teaser:"Poetry will preserve memory longer than monuments, war or time.",
    summary:"In Sonnet 55, Shakespeare claims that his verse will outlive marble monuments and the grand memorials of rulers. Time, war, fire and destruction may ruin physical structures, but the person celebrated in the poem will continue to live through poetry. The poem presents verse as a stronger form of immortality than material power.",
    keys:["Immortality through poetry","Power of art over time","Physical monuments are temporary","War destroys stone but not memory preserved in verse","Confident, celebratory tone"],
    recall:"Monuments decay → war destroys → verse survives → beloved lives in readers’ memory."
  },
  {
    id:"ozymandias", type:"poetry", no:"P.9", title:"Ozymandias", author:"P. B. Shelley",
    teaser:"A ruined statue exposes the emptiness of pride and political power.",
    summary:"A traveller describes the remains of a huge statue in a desert: two broken legs, a shattered face and a pedestal carrying the boast of King Ozymandias. The sculptor captured the ruler’s arrogance, but the king’s empire has disappeared. The vast, empty desert surrounding the ruins makes his claim to permanent greatness deeply ironic.",
    keys:["Pride and arrogance","Impermanence of political power","Time defeats human ambition","Irony between the boast and the ruins","The sculptor’s art survives the ruler’s empire"],
    recall:"Traveller → shattered statue → proud expression → boastful inscription → nothing remains → endless desert."
  },
  {
    id:"mariner", type:"poetry", no:"P.10", title:"The Rime of the Ancient Mariner", author:"S. T. Coleridge",
    teaser:"A senseless act against nature brings punishment, isolation and repentance.",
    summary:"An Ancient Mariner stops a Wedding Guest and tells of a disastrous sea voyage. An albatross appears and is welcomed as a good omen, but the Mariner inexplicably shoots it. The ship is becalmed and the sailors suffer terrible thirst. They blame the Mariner and hang the dead bird around his neck. Supernatural forces punish the crew; the Mariner is left isolated. When he spontaneously blesses the water-snakes, his attitude toward living creatures changes and the albatross falls from his neck. His lifelong penance is to retell the lesson of reverence for all life.",
    keys:["Crime, punishment and redemption","Respect for nature and all living creatures","Isolation and guilt","Supernatural atmosphere","Spiritual transformation"],
    recall:"Wedding Guest stopped → voyage → albatross welcomed → Mariner kills it → curse/thirst → crew dies → water-snakes blessed → repentance."
  },
  {
    id:"snake", type:"poetry", no:"P.11", title:"Snake", author:"D. H. Lawrence",
    teaser:"Instinctive admiration clashes with learned fear, leaving the speaker ashamed.",
    summary:"On a hot day, the speaker finds a snake drinking at his water-trough. He watches it with fascination and feels honoured by its visit. However, the 'voice of education' tells him that a poisonous snake should be killed. As the snake retreats, he throws a log at it. Immediately he regrets the act, calling it petty and wishing the snake would return. He compares it to a king in exile.",
    keys:["Conflict between instinct and social conditioning","Respect for nature","Regret after violence","The 'voice of education' as learned prejudice","Snake presented with dignity and majesty"],
    recall:"Hot day → snake drinks → speaker admires → education says kill → log thrown → shame → snake imagined as exiled king."
  },
  {
    id:"departed", type:"drama", no:"D.12", title:"The Dear Departed", author:"Stanley Houghton",
    teaser:"A supposedly dead father wakes to discover how greed has corrupted his family.",
    summary:"The Slaters believe Abel Merryweather has died and begin taking his possessions before the Jordans arrive. Amelia even transfers his bureau and clock downstairs. The two sisters argue over their father’s property rather than mourning him. Abel suddenly wakes and realizes what has happened. Disgusted by their selfishness, he decides to change his will and make new arrangements for his life, exposing the hypocrisy and greed of both families.",
    keys:["Greed and materialism","Hypocrisy in family relationships","Neglect of the elderly","Satire and dramatic irony","Abel’s awakening exposes everyone"],
    recall:"Abel presumed dead → Slaters steal possessions → Jordans arrive → families quarrel → Abel wakes → discovers greed → changes plans."
  },
  {
    id:"email", type:"writing", no:"W.1", title:"Email", author:"Writing Skill",
    teaser:"Short, purposeful and correctly structured communication.",
    summary:"Write a clear subject line, appropriate greeting, concise purpose, necessary details, action/request and polite closing. Keep tone suited to the recipient. Avoid chat abbreviations.",
    keys:["Specific subject","Purpose in first lines","Relevant details only","Polite request/action","Appropriate sign-off"],
    recall:"To → Subject → Greeting → Purpose → Details → Request → Closing."
  },
  {
    id:"leave", type:"writing", no:"W.2", title:"Leave Application", author:"Writing Skill",
    teaser:"A formal request that states reason, dates and duration precisely.",
    summary:"Address the appropriate school authority, give a direct subject, state the reason and exact leave period, request permission, and close respectfully. Do not over-explain.",
    keys:["Correct addressee","Exact dates/duration","Genuine concise reason","Polite request","Formal closing"],
    recall:"Address → Date → Subject → Salutation → reason + period → request → thanks → name/class."
  },
  {
    id:"complaint", type:"writing", no:"W.3", title:"Formal Complaint Letter", author:"Writing Skill",
    teaser:"State the problem with evidence, impact and a reasonable remedy.",
    summary:"Use full formal-letter layout. Identify the product/service/problem, give dates or evidence, explain the inconvenience, state the remedy you expect and request timely action. Remain factual and professional.",
    keys:["Formal layout","Specific facts/evidence","Impact of problem","Requested remedy","Courteous but firm tone"],
    recall:"Sender → Date → Receiver → Subject → problem → evidence → impact → remedy → close."
  },
  {
    id:"editor", type:"writing", no:"W.4", title:"Letter to the Editor", author:"Writing Skill",
    teaser:"Raise a public issue, explain its effects and recommend solutions.",
    summary:"Use formal-letter layout. Introduce the issue and why it matters to the public, support it with relevant observations, explain consequences, suggest practical measures and end with a call for awareness or action.",
    keys:["Public-interest issue","Clear causes/effects","Evidence or observations","Practical solutions","Call to action"],
    recall:"Issue → significance → causes/effects → solutions → public/authority action."
  },
  {
    id:"article", type:"writing", no:"W.5", title:"Article Writing", author:"Writing Skill",
    teaser:"A strong title, logical argument and memorable conclusion.",
    summary:"Begin with a title and byline. Use an engaging opening, develop the topic in organized paragraphs, support points with examples, give solutions or recommendations where relevant, and end with a clear concluding thought.",
    keys:["Title + byline","Engaging introduction","Logical paragraphs","Examples/evidence","Strong conclusion"],
    recall:"Title → Byline → Hook → Explain → Evidence → Solutions → Conclusion."
  },
  {
    id:"factual", type:"writing", no:"W.6", title:"Factual Description", author:"Writing Skill",
    teaser:"Objective description using precise, observable details.",
    summary:"Identify the person/place/object/process clearly, move from general information to specific features, follow a logical order, use precise vocabulary and avoid personal opinions unless the prompt requires them.",
    keys:["Objective tone","Logical order","Specific observable details","Accurate vocabulary","No unnecessary opinions"],
    recall:"Identify → overview → details in order → distinctive features → concise closing."
  },
  {
    id:"mcb234", type:"mcb", no:"MCB", title:"Main Course Book Units 2, 3 & 4", author:"MCB Focus",
    teaser:"Revise classroom tasks, source material and writing-linked exercises from these units.",
    summary:"Use Units 2, 3 and 4 of your Main Course Book as the source for classroom-based questions and writing practice. Revisit factual-information tasks, prompts, examples and teacher-marked exercises. The portal intentionally does not invent unit content that is not in your exact edition.",
    keys:["Units 2, 3 and 4 only","Re-read solved classroom tasks","Revise factual information","Connect unit prompts to writing formats","Prioritize teacher-marked work"],
    recall:"MCB 2 → MCB 3 → MCB 4 → marked exercises → writing-linked tasks."
  }
];

const writingGuides = [
  {id:"email",label:"Email",title:"Email",tips:["Keep the subject specific, not vague.","State the reason for writing immediately.","Use short paragraphs and a professional closing."],format:"To: recipient@example.com\nSubject: Clear purpose in one line\n\nDear Sir/Madam / Dear Ma’am,\n\nPurpose of the email.\nEssential details.\nRequest / next action.\n\nRegards,\nName"},
  {id:"leave",label:"Leave application",title:"Leave Application",tips:["Mention exact date(s) and number of days.","Use one clear reason.","Request permission; do not write an emotional essay."],format:"To\nThe Class Teacher / Principal\nSchool Name\n\nDate: DD Month YYYY\n\nSubject: Application for leave on ...\n\nRespected Ma’am/Sir,\n\nI request leave from ___ to ___ due to ___. I will complete the missed classwork promptly. Kindly grant me leave for the stated period.\n\nYours obediently,\nName\nClass / Section"},
  {id:"complaint",label:"Complaint letter",title:"Formal Letter — Complaint",tips:["Include purchase/service details where relevant.","Describe the defect or problem objectively.","Ask for a specific remedy: repair, replacement, refund or action."],format:"Sender's Address\nDate\nReceiver's Designation & Address\n\nSubject: Complaint regarding ...\n\nSir/Madam,\n\nOpening: what happened + when.\nDetails/evidence: order no., dates, defects, attempts made.\nImpact: inconvenience/loss.\nRequested action: clear remedy + reasonable time.\n\nYours sincerely,\nName"},
  {id:"editor",label:"Letter to editor",title:"Formal Letter — To the Editor",tips:["Choose an issue of public importance.","Explain effects on citizens, not only yourself.","End with feasible solutions and a call for action."],format:"Sender's Address\nDate\nThe Editor\nNewspaper Name\nCity\n\nSubject: Concern regarding ...\n\nSir/Madam,\n\nIntroduce the public issue.\nExplain causes and consequences with observations/examples.\nSuggest practical steps for authorities and citizens.\nClose with a request to highlight the issue.\n\nYours sincerely,\nName"},
  {id:"article",label:"Article",title:"Article Writing",tips:["Title should communicate the idea, not merely the topic word.","Use 3–5 coherent paragraphs.","Prefer analysis and examples over slogans."],format:"A STRONG, SPECIFIC TITLE\nBy Name\n\nHook / context: why this matters now.\n\nBody 1: main idea, cause or background.\nBody 2: effects, examples, evidence.\nBody 3: solutions / recommendations.\n\nConclusion: one clear final insight or call to action."},
  {id:"factual",label:"Factual description",title:"Factual Description",tips:["Observe before writing.","Use spatial or logical order.","Avoid exaggerated adjectives and personal judgement."],format:"TITLE / NAME OF SUBJECT\n\nIdentification: what / who / where.\nGeneral overview: function, purpose or appearance.\nSpecific details in logical order.\nDistinctive features / components / steps.\nConcise factual closing."}
];

const quizBank = [
  {q:"Why does the Postmaster finally understand Ali’s suffering?",a:["He reads Miriam’s old letter","His own daughter becomes ill and he waits anxiously for news","Lakshmi Das explains Ali’s past","Ali returns as a ghost"],correct:1,why:"Personal anxiety about his own daughter gives the Postmaster the empathy he previously lacked."},
  {q:"What does Ali give Lakshmi Das before disappearing from the post office?",a:["A hunting gun","Five gold guineas","Miriam’s address","A silver watch"],correct:1,why:"Ali gives Lakshmi Das five gold guineas and asks him to deliver Miriam’s letter when it arrives."},
  {q:"Why are Helen and the other ghosts on strike in A Shady Plot?",a:["They dislike writers","They are constantly summoned by Ouija-board users","They cannot enter John’s house","They want to scare Lavinia"],correct:1,why:"Ouija-board users keep disturbing the ghosts, leaving them no peace."},
  {q:"What changes Patol Babu’s attitude toward his one-word role?",a:["A promise of more money","A new costume","Remembering Gogon Pakrashi’s teaching","The director apologizes"],correct:2,why:"His mentor taught him that no role is too small for a true actor."},
  {q:"Why does Patol Babu leave without collecting payment?",a:["He is angry with the director","He forgets","His artistic satisfaction matters more than the money","He is offered a bigger role"],correct:2,why:"For Patol Babu, performing the tiny role perfectly becomes its own reward."},
  {q:"What central contrast drives Ozymandias?",a:["City and village","Youth and old age","The king’s boast and the ruined, empty landscape","Love and jealousy"],correct:2,why:"The proud claim of permanent greatness is undercut by the shattered statue and empty desert."},
  {q:"In Sonnet 55, what is presented as more enduring than monuments?",a:["Gold","Poetry","Royal armies","Paintings"],correct:1,why:"Shakespeare argues that verse preserves memory beyond stone, war and time."},
  {q:"What marks the Mariner’s spiritual change?",a:["He reaches land","He blesses the water-snakes spontaneously","He throws the albatross away","The Wedding Guest forgives him"],correct:1,why:"His spontaneous blessing shows renewed love for living creatures; the albatross then falls from his neck."},
  {q:"What does the 'voice of education' urge the speaker to do in Snake?",a:["Offer the snake milk","Run away","Kill the snake","Watch silently"],correct:2,why:"Learned social conditioning tells him a poisonous snake should be killed, conflicting with his admiration."},
  {q:"Why does the speaker regret throwing the log at the snake?",a:["The log breaks","He recognizes the act as petty and dishonourable","The snake attacks him","He is punished"],correct:1,why:"He feels ashamed that learned fear overcame his instinctive respect for the snake."},
  {q:"What primarily makes The Dear Departed a satire?",a:["A supernatural event","The family quarrels over Abel’s possessions while supposedly mourning him","Abel loses his memory","The play occurs in a courtroom"],correct:1,why:"The play mocks greed and hypocrisy through the family’s behaviour around Abel’s supposed death."},
  {q:"Which is the strongest subject line for a complaint letter?",a:["Problem","Hello","Complaint regarding defective mixer — Order 1842","Important!!!"],correct:2,why:"A strong subject states the exact issue clearly and professionally."},
  {q:"What belongs near the top of an article?",a:["Receiver’s postal address","Title and byline","Invoice number","Signature of the editor"],correct:1,why:"Article format begins with a relevant title and byline."},
  {q:"A factual description should mainly be:",a:["Emotional and persuasive","Objective and logically ordered","Humorous and conversational","Written as dialogue"],correct:1,why:"Its purpose is to present observable facts clearly, precisely and in a logical sequence."},
  {q:"In a letter to the editor, the strongest body structure is:",a:["Complaint only","Issue → effects → practical solutions","Greeting → joke → ending","Biography → quotation → apology"],correct:1,why:"A public-interest letter should explain the issue, its consequences and feasible action."},
  {q:"What does the ruined statue in Ozymandias most strongly symbolize?",a:["Permanent royal power","The permanence of wealth","The temporary nature of human power","Victory in war"],correct:2,why:"Time has destroyed the ruler’s empire despite his claims of unmatched greatness."}
];

const stateKey = "study-portal-2026-27";
let state = JSON.parse(localStorage.getItem(stateKey) || "{}");
state.done = state.done || {};
let currentFilter = "all";

const topicGrid = document.getElementById("topicGrid");
const modal = document.getElementById("topicModal");
const modalContent = document.getElementById("modalContent");

function save(){ localStorage.setItem(stateKey, JSON.stringify(state)); updateProgress(); }
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

function renderTopics(filter="all"){
  currentFilter = filter;
  const list = topics.filter(t => filter==="all" || t.type===filter);
  topicGrid.innerHTML = list.map(t=>`
    <article class="topic-card ${state.done[t.id] ? "done" : ""}">
      <div class="topic-top"><span class="topic-type">${esc(t.type)}</span><span class="topic-num">${esc(t.no)}</span></div>
      <h4>${esc(t.title)}</h4>
      <p>${esc(t.teaser)}</p>
      <div class="topic-actions">
        <button class="open-topic" data-open="${t.id}">Open revision →</button>
        <label class="done-label"><input type="checkbox" data-done="${t.id}" ${state.done[t.id] ? "checked" : ""}> Done</label>
      </div>
    </article>`).join("");

  document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>openTopic(b.dataset.open)));
  document.querySelectorAll("[data-done]").forEach(c=>c.addEventListener("change",()=>{
    state.done[c.dataset.done] = c.checked;
    save(); renderTopics(currentFilter);
  }));
}

function openTopic(id){
  const t = topics.find(x=>x.id===id);
  if(!t) return;
  modalContent.innerHTML = `
    <span class="modal-kicker">${esc(t.type)} · ${esc(t.no)}</span>
    <h2>${esc(t.title)}</h2>
    <p><strong>${esc(t.author)}</strong></p>
    <h3>60-second summary</h3>
    <p>${esc(t.summary)}</p>
    <h3>Scoring ideas</h3>
    <ul>${t.keys.map(k=>`<li>${esc(k)}</li>`).join("")}</ul>
    <div class="recall-box"><b>Closed-book recall chain</b><p>${esc(t.recall)}</p></div>
  `;
  modal.showModal();
}

document.getElementById("modalClose").addEventListener("click",()=>modal.close());
modal.addEventListener("click",e=>{ if(e.target===modal) modal.close(); });

document.getElementById("filters").addEventListener("click",e=>{
  const b = e.target.closest("[data-filter]"); if(!b) return;
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active")); b.classList.add("active");
  renderTopics(b.dataset.filter);
});

function updateProgress(){
  const done = topics.filter(t=>state.done[t.id]).length;
  const pct = Math.round(done/topics.length*100);
  document.getElementById("progressPercent").textContent = pct+"%";
  document.getElementById("progressText").textContent = `${done} of ${topics.length} complete`;
  document.getElementById("progressRing").style.setProperty("--p",pct);
}
document.getElementById("resetProgressBtn").addEventListener("click",()=>{
  if(confirm("Reset all English progress on this device?")){ state.done={}; save(); renderTopics(currentFilter); }
});
document.getElementById("startNextBtn").addEventListener("click",()=>{
  const next = topics.find(t=>!state.done[t.id]) || topics[0];
  openTopic(next.id);
});

const dt = new Date();
document.getElementById("todayLabel").textContent = dt.toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short"})+" · Exam mode";

const tabs = document.getElementById("writingTabs");
const guide = document.getElementById("writingGuide");
function showGuide(id){
  const g = writingGuides.find(x=>x.id===id);
  document.querySelectorAll(".writing-tab").forEach(x=>x.classList.toggle("active",x.dataset.guide===id));
  guide.innerHTML = `<span class="eyebrow">Format first</span><h4>${esc(g.title)}</h4>
  <ul>${g.tips.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><div class="format-box">${esc(g.format)}</div>`;
}
tabs.innerHTML = writingGuides.map((g,i)=>`<button class="writing-tab ${i===0?"active":""}" data-guide="${g.id}">${esc(g.label)}</button>`).join("");
tabs.addEventListener("click",e=>{const b=e.target.closest("[data-guide]"); if(b)showGuide(b.dataset.guide);});
showGuide("email");

let remaining = 25*60, timerId = null;
function renderTimer(){const m=Math.floor(remaining/60),s=remaining%60;document.getElementById("timerDisplay").textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;}
document.getElementById("timerToggle").addEventListener("click",()=>{
  const btn=document.getElementById("timerToggle");
  if(timerId){clearInterval(timerId);timerId=null;btn.textContent="Start";return;}
  btn.textContent="Pause";
  timerId=setInterval(()=>{remaining--;renderTimer();if(remaining<=0){clearInterval(timerId);timerId=null;remaining=0;renderTimer();btn.textContent="Start";alert("Focus sprint complete. Close the notes and recall the topic for 2 minutes.");}},1000);
});
document.getElementById("timerReset").addEventListener("click",()=>{if(timerId)clearInterval(timerId);timerId=null;remaining=25*60;renderTimer();document.getElementById("timerToggle").textContent="Start";});

let quiz=[],qi=0,score=0,answered=false;
function shuffled(arr){return [...arr].sort(()=>Math.random()-.5);}
document.getElementById("startQuizBtn").addEventListener("click",startQuiz);
function startQuiz(){
  quiz=shuffled(quizBank).slice(0,10);qi=0;score=0;answered=false;
  document.getElementById("quizIntro").hidden=true;document.getElementById("quizResult").hidden=true;document.getElementById("quizBody").hidden=false;
  renderQuestion();
}
function renderQuestion(){
  answered=false;const item=quiz[qi];
  document.getElementById("quizCounter").textContent=`${qi+1} / ${quiz.length}`;
  document.getElementById("quizScore").textContent=`Score ${score}`;
  document.getElementById("quizProgress").style.width=`${((qi+1)/quiz.length)*100}%`;
  document.getElementById("quizQuestion").textContent=item.q;
  document.getElementById("quizExplain").hidden=true;document.getElementById("nextQuestionBtn").hidden=true;
  document.getElementById("quizAnswers").innerHTML=item.a.map((x,i)=>`<button class="answer-btn" data-answer="${i}">${esc(x)}</button>`).join("");
}
document.getElementById("quizAnswers").addEventListener("click",e=>{
  const b=e.target.closest("[data-answer]");if(!b||answered)return;answered=true;
  const item=quiz[qi],chosen=Number(b.dataset.answer);
  document.querySelectorAll(".answer-btn").forEach((btn,i)=>{btn.disabled=true;if(i===item.correct)btn.classList.add("correct");if(i===chosen&&i!==item.correct)btn.classList.add("wrong");});
  if(chosen===item.correct)score++;
  const ex=document.getElementById("quizExplain");ex.textContent=item.why;ex.hidden=false;
  document.getElementById("quizScore").textContent=`Score ${score}`;
  document.getElementById("nextQuestionBtn").hidden=false;
});
document.getElementById("nextQuestionBtn").addEventListener("click",()=>{qi++; if(qi<quiz.length)renderQuestion();else finishQuiz();});
function finishQuiz(){
  document.getElementById("quizBody").hidden=true;const result=document.getElementById("quizResult");result.hidden=false;
  const msg=score>=9?"Excellent. Do only targeted revision now.":score>=7?"Solid. Revisit the questions you hesitated on.":score>=5?"Decent base. Do another literature pass before retesting.":"Stop testing for now. Relearn the weak chapters, then return.";
  result.innerHTML=`<div class="result-score">${score}/10</div><div class="result-copy">${msg}</div><button class="primary-btn" id="retryQuizBtn">Take another test</button>`;
  document.getElementById("retryQuizBtn").addEventListener("click",startQuiz);
}

renderTopics();
updateProgress();
renderTimer();
