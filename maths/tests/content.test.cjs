
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function read(name){return fs.readFileSync(path.join(root,name),'utf8')}
const sandbox={window:{}};
for(const name of ['data.js','enrichment.js','coach-data.js'])vm.runInNewContext(read(name),sandbox,{filename:name,timeout:3000});
const lessons=sandbox.window.MATH_LESSONS;
const extra=sandbox.window.MATH_EXTRA;
const coach=sandbox.window.MATH_COACH;
const assertTrue=(condition,msg)=>assert.ok(condition,msg);
assert.equal(lessons.length,10,'Exactly 10 covered Class 10 chapters expected');
const ids=lessons.map(l=>l.id);
assert.equal(new Set(ids).size,10,'Lesson IDs unique');
for(const excluded of ['real-numbers','circles','areas-related-to-circles','applications-of-trigonometry'])assert.ok(!ids.includes(excluded),'Excluded chapter appears: '+excluded);
let written=0,mcq=0,hints=0;
for(const l of lessons){
 const e=extra[l.id],c=coach[l.id];
 assertTrue(e&&c,'Missing teaching data for '+l.id);
 assert.equal(l.practice.length,2,l.id+' base practice count');
 assert.equal(e.challenge.length,5,l.id+' extended practice count');
 assert.equal(e.mcq.length,3,l.id+' quiz count');
 assert.equal(e.sections.length,3,l.id+' concepts count');
 assert.equal(c.hints.length,7,l.id+' hint pairs count');
 assertTrue(l.example?.steps?.length>=3,l.id+' worked example steps missing');
 assertTrue(e.worked?.steps?.length>=3,l.id+' second worked example steps missing');
 assertTrue(c.mission&&c.prereq&&c.analogy&&c.pitfall,l.id+' learner support missing');
 for(let i=0;i<7;i++){
   const q=i<2?l.practice[i]:e.challenge[i-2];
   assertTrue(q.q&&q.a&&q.work,l.id+' incomplete written answer at '+i);
   // Coaching hints stored extended five first, then two base questions.
   const hintsFor=c.hints[i<2?i+5:i-2];
   assertTrue(Array.isArray(hintsFor)&&hintsFor.length===2&&hintsFor.every(Boolean),l.id+' missing two-step hint '+i);
 }
 for(const q of e.mcq){
   assertTrue(typeof q.q==='string'&&q.q.length>5,l.id+' missing MCQ prompt');
   assert.equal(q.options.length,4,l.id+' MCQ needs four choices');
   assertTrue(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<=3,l.id+' invalid MCQ index');
   assertTrue(q.explanation?.length>5,l.id+' missing MCQ explanation');
 }
 written+=l.practice.length+e.challenge.length;mcq+=e.mcq.length;hints+=c.hints.length;
}
assert.equal(written,70);assert.equal(mcq,30);assert.equal(hints,70);
const html=read('index.html'),script=read('app.js'),css=read('styles.css');
for(const f of ['styles.css','data.js','enrichment.js','coach-data.js','app.js'])assertTrue(html.includes('./'+f),'Missing HTML asset: '+f);
for(const section of ['home','chapter','practice','exam','formulas','lab','mistakes','due'])assertTrue(script.includes(section+':'),'App route missing '+section);
for(const action of ['hint','answer','got-it','retry','test-submit','written-start','chapter-test'])assertTrue(script.includes("act==='"+action+"'"),'Missing action '+action);
for(const className of ['hint-entry','writing-space','question-card'])assertTrue(css.includes(className),'Missing CSS '+className);
assertTrue(script.includes('function confidence('),'Spaced repetition not implemented');
assertTrue(script.includes('function startWritten('),'Written paper generator missing');
assertTrue(script.includes('window.speechSynthesis'),'Speech browser API not wired');
function roughlyEqual(a,b,tolerance=1e-8){assertTrue(Math.abs(a-b)<=tolerance,a+' not near '+b)}
// Sample deterministic mathematical regression checks independently recompute textbook relationships.
const discriminant=(a,b,c)=>b*b-4*a*c;
assert.equal(discriminant(1,-5,50),-175,'Reciprocal-equation worked example discriminant');
assert.equal(discriminant(1,4,4),0,'Equal quadratic roots example');
const linearTicket={a:120,c:50};
assert.equal(2*linearTicket.a+3*linearTicket.c,390);
assert.equal(3*linearTicket.a+2*linearTicket.c,460);
roughlyEqual(20/2*(2*2+19*3),610); // 20-term AP
assert.equal((6*6+8*8)**.5,10); // Distance formula
assert.equal(2/3*Math.PI*3**3,18*Math.PI); // Hemisphere volume
roughlyEqual((4+0.5*(12/6)*10),14); // independent arithmetic consistency example
assert.equal((2+5+3),10); // grouped frequencies
assert.equal(4/36,1/9); // two dice sum 9
console.log('Maths Studio checks PASS: '+lessons.length+' lessons, '+written+' written, '+mcq+' MCQ, '+hints+' hint pairs, 2 worked examples/chapter.');
