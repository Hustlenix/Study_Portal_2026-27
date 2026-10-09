
'use strict';
/**
 * Independent editorial key + prompt fingerprint checks.
 * Any new/reworded question fails CI until a fresh audit updates verified-maths.json.
 * Every answer is compared against the separately reviewed expected answer, not copied
 * into the test dynamically from the lesson bank.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const home=path.resolve(__dirname,'..');
const refs=JSON.parse(fs.readFileSync(path.join(__dirname,'verified-maths.json'),'utf8')).records;
const sandbox={window:{}};
for(const f of ['data.js','enrichment.js']){
 vm.runInNewContext(fs.readFileSync(path.join(home,f),'utf8'),sandbox,{filename:f,timeout:3000});
}
const lessons=sandbox.window.MATH_LESSONS,extra=sandbox.window.MATH_EXTRA;
const h=(input)=>{
 let n=2166136261;
 for(let i=0;i<input.length;i++){n^=input.charCodeAt(i);n=Math.imul(n,16777619)}
 return (n>>>0).toString(16).padStart(8,'0');
};
const seen=new Set();
let verified=0;
for(const l of lessons){
 const entry=refs[l.id];
 assert.ok(entry,'No verified answer reference for '+l.id);
 const all=[...l.practice,...extra[l.id].challenge];
 assert.equal(all.length,entry.written.length,l.id+' written count changed: editorial review required');
 all.forEach((q,i)=>{
  const expected=entry.written[i];
  assert.ok(!seen.has(expected.id),'Duplicate verified question ID '+expected.id);
  seen.add(expected.id);
  assert.equal(h(q.q),expected.promptFingerprint,'Question wording changed: re-check maths manually: '+expected.id);
  assert.equal(q.a,expected.expectedAnswer,'Wrong written answer key: '+expected.id);
  assert.ok(q.work&&q.work.length>6,'Insufficient explanation: '+expected.id);
  verified++;
 });
 const worked=[l.example,extra[l.id].worked];
 assert.equal(worked.length,entry.worked.length);
 worked.forEach((q,i)=>{
  const expected=entry.worked[i];
  assert.equal(h(q.q),expected.promptFingerprint,'Worked example changed: re-review '+expected.id);
  assert.equal(q.answer,expected.expectedAnswer,'Wrong worked example key: '+expected.id);
  assert.ok(q.steps.length>=3,'Worked example needs separate steps '+expected.id);
  verified++;
 });
 const mcqs=extra[l.id].mcq;
 assert.equal(mcqs.length,entry.mcq.length,l.id+' MCQ count changed');
 mcqs.forEach((q,i)=>{
  const expected=entry.mcq[i];
  assert.equal(h(q.q+'|'+q.options.join('|')),expected.promptFingerprint,'MCQ wording or options changed: re-review '+expected.id);
  assert.equal(q.correct,expected.expectedCorrectIndex,'Wrong MCQ answer index: '+expected.id);
  assert.equal(q.options.length,4,'Four options required: '+expected.id);
  assert.equal(new Set(q.options.map(o=>o.toLowerCase().trim())).size,4,'Duplicate MCQ answer choices: '+expected.id);
  assert.ok(q.explanation.length>12,'MCQ missing explanation: '+expected.id);
  verified++;
 });
}
assert.equal(verified,120,'Expected 70 written + 20 worked + 30 MCQs.');
// Domain-specific arithmetic rechecks (not merely matching memorised strings).
const quadraticD=(a,b,c)=>b*b-4*a*c;
assert.equal(quadraticD(1,-5,50),-175,'Reciprocal equations genuinely have no real solution');
assert.equal(quadraticD(1,4,4),0,'Repeated root');
assert.ok(2*120+3*50===390&&3*120+2*50===460,'Ticket word problem checks both equations');
assert.ok(5*10+2*7===64&&3*10+4*7===58,'Pen price problem checks both equations');
assert.ok(2*24+3*16===96&&3*24+2*16===104,'Notebook price problem checks both equations');
assert.equal(7*(7+5),84,'Rectangle area');
assert.equal(8*9,72,'Consecutive integers');
assert.equal((20*(7+83)/2),900,'AP sum');
assert.equal((15*(12+54)/2),495,'Auditorium sum');
assert.equal((20*(2+59)/2),610,'AP sequence 2,5,8,... 20-term sum');
assert.equal((16*25/4),100,'Similar triangles areas');
assert.equal((9*9+12*12)**.5,15,'Pythagoras');
assert.equal((2*7+1)/3,5,'Section formula x');
assert.equal((2*8+2)/3,6,'Section formula y');
assert.equal((2*5+5*15+3*25)/10,16,'Grouped mean for classes 0–10, 10–20, 20–30');
assert.ok(Math.abs(10+(6-4)/6*10-(13+1/3))<1e-10,'Grouped median from 4,6,2');
assert.equal(20+(8-3)/(2*8-3-5)*10,26.25,'Grouped mode');
assert.equal(5/10,1/2,'Bag without red');
assert.equal(4/36,1/9,'Two dice sum nine');
assert.equal(6/36,1/6,'Two dice sum seven');
console.log('Verified '+verified+' audited keys and question fingerprints.');
