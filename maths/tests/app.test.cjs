
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const source=file=>fs.readFileSync(path.join(root,file),'utf8');
const storage={};
const localStorage={getItem:key=>storage[key]||null,setItem:(key,value)=>storage[key]=value};
const handlers={},elements={};
const classList=()=>({contains:()=>false,add(){},remove(){},toggle:()=>true});
for(const id of ['sidebar','shade','menu','main-content','nav-main','nav-lessons','pct','pct-bar','breadcrumb','practice-search','chapter-filter','lab-a','lab-b','lab-c','lab-output','lab-plot']){
 const fields={id,textContent:'',innerHTML:'',style:{},classList:classList(),value:({ 'lab-a':'1','lab-b':'-5','lab-c':'6'})[id]||'',setAttribute(){},focus(){},setSelectionRange(){},addEventListener(name,fn){handlers[id+':'+name]=fn}};
 elements[id]=fields;
}
const document={getElementById:id=>elements[id]||(elements[id]={id,textContent:'',innerHTML:'',style:{},value:'',classList:classList()}),addEventListener:(name,fn)=>handlers['document:'+name]=fn};
const sandbox={document,localStorage,window:{scrollTo(){},print(){},speechSynthesis:{cancel(){},speak(){}},SpeechSynthesisUtterance:function(text){this.text=text}}};
for(const file of ['data.js','enrichment.js','coach-data.js','app.js'])vm.runInNewContext(source(file),sandbox,{filename:file,timeout:2500});
const click=(dataset,id)=>handlers['document:click']({target:{closest:()=>({dataset,id:id||''})}});
const html=()=>elements['main-content'].innerHTML;
const shown=(content)=>assert.ok(html().includes(content),'Expected UI text: '+content);
shown('Polynomials');
shown('10 chapters');
click({page:'chapter',chapter:'quadratics'});
shown('Your target');shown('WORKED EXAMPLE 1');shown('WORKED EXAMPLE 2');
shown('3-question chapter check');
click({action:'hint',qid:'quadratics-c0'});shown('Hint 1');
click({action:'hint',qid:'quadratics-c0'});shown('Hint 2');
click({action:'answer',qid:'quadratics-c0'});shown('Answer: 3 and 4');
click({action:'got-it',qid:'quadratics-c0'});
assert.ok(storage['hustlenix-maths-complete-v2'].includes('quadratics-c0'));
click({page:'due'});shown('Review what you learned');
click({page:'practice'});shown('70 written practice problems');
click({page:'formulas'});shown('Quadratic Equations');
click({page:'lab'});
for(const lab of ['quadratic','ap','trig']){
 click({action:'lab-switch',lab});
 assert.ok(elements['lab-output'].innerHTML.length>10,lab+' lab did not update');
}
click({page:'chapter',chapter:'quadratics'});click({action:'chapter-test'});
shown('QUESTION 3 / 3');
for(const id of ['quadratics-q0','quadratics-q1','quadratics-q2']){
 handlers['document:change']({target:{id:'',matches:()=>true,dataset:{testid:id},value:'0'}});
}
click({action:'test-submit'});shown('Correct:');
const saved=JSON.parse(storage['hustlenix-maths-complete-v2']);
assert.ok(saved.history.length>0,'MCQ score not saved');
assert.ok(saved.mistakes.some(id=>id.startsWith('quadratics-q')),'Incorrect MCQs should enter notebook');
click({page:'mistakes'});shown('Quadratic Equations');
click({action:'test-reset'});
click({action:'written-start'});shown('30 marks');shown('Q10 ·');
click({action:'written-reveal'});shown('Expected result:');
click({action:'written-reset'});
console.log('Interactive Maths Studio flows PASS: home, teaching, hints, confidence, spaced review, practice, formulas, all 3 labs, chapter test, mistakes and written exam.');
