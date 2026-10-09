
'use strict';
/**
 * Real Chromium smoke tests for Maths Studio.
 * Run: npm install --no-save playwright && npx playwright install chromium
 *      node maths/tests/browser.test.cjs
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const {chromium}=require('playwright');
const dir=path.resolve(__dirname,'..');
const MIME={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 const pathPart=new URL(req.url,'http://localhost').pathname;
 const relative=decodeURIComponent(pathPart)==='/'?'index.html':decodeURIComponent(pathPart).replace(/^\/+/,'');
 const target=path.resolve(dir,relative);
 if(target!==dir&&!target.startsWith(dir+path.sep)){res.writeHead(403);res.end();return}
 let filename=target;try{if(fs.statSync(filename).isDirectory())filename=path.join(filename,'index.html')}catch{}
 try{const bytes=fs.readFileSync(filename);res.writeHead(200,{'Content-Type':MIME[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(bytes)}
 catch{res.writeHead(404);res.end('404')}
});
function waitClose(){return new Promise(resolve=>server.close(resolve))}
async function run(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const url='http://127.0.0.1:'+server.address().port+'/';
 const issues=[];let browser=null;let screenshotsDir=path.join(__dirname,'screenshots');
 fs.mkdirSync(screenshotsDir,{recursive:true});
 async function scenario(name,viewport,isMobile){
  const context=await browser.newContext({viewport,isMobile,hasTouch:isMobile,deviceScaleFactor:1,serviceWorkers:'allow'});
  const page=await context.newPage();
  const faults=[];
  page.on('pageerror',e=>faults.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(url)&&r.status()>=400)faults.push('HTTP '+r.status()+' '+r.url())});
  const snap=async suffix=>page.screenshot({path:path.join(screenshotsDir,name+'-'+suffix+'.png'),fullPage:true});
  try{
    await page.goto(url,{waitUntil:'networkidle'});
    await page.getByRole('heading',{name:/Understand the maths/i}).waitFor();
    assert.equal(await page.locator('.chapter-card').count(),10,'Ten chapter cards');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=3,'Page horizontal overflow '+overflow+' px on '+name);
    await snap('home');
    if(isMobile){
      await page.locator('#menu').click();
      await page.locator('#sidebar').evaluate(el=>{if(!el.classList.contains('open'))throw Error('Drawer failed to open')});
    }
    await page.locator('button[data-page="chapter"][data-chapter="quadratics"]').first().click();
    await page.getByRole('heading',{name:'Quadratic Equations',exact:true}).waitFor();
    await page.locator('button[data-action="hint"][data-qid="quadratics-c0"]').click();
    await page.locator('[data-question="quadratics-c0"]').getByText('Hint 1').waitFor();
    await page.locator('button[data-action="hint"][data-qid="quadratics-c0"]').click();
    await page.locator('[data-question="quadratics-c0"]').getByText('Hint 2').waitFor();
    await page.locator('button[data-action="answer"][data-qid="quadratics-c0"]').click();
    await page.locator('[data-question="quadratics-c0"]').getByText('Answer: 3 and 4').waitFor();
    await page.locator('button[data-action="got-it"][data-qid="quadratics-c0"]').click();
    const store=await page.evaluate(()=>JSON.parse(localStorage.getItem('hustlenix-maths-complete-v2')));
    assert.ok(store.solved.includes('quadratics-c0'),'Solved question persisted');
    await snap('chapter');
    await page.locator('button[data-action="chapter-test"]').click();
    assert.equal(await page.locator('.test-question').count(),3,'Three-question chapter check');
    await page.locator('.test-question').first().locator('input[type="radio"]').first().check();
    await page.locator('button[data-action="test-submit"]').click();
    await page.getByText('Correct:',{exact:false}).first().waitFor();
    await page.locator('button[data-action="test-reset"]').first().click();
    await page.locator('button[data-action="written-start"]').click();
    assert.equal(await page.locator('.test-question').count(),10,'Written 10-question exam');
    await page.locator('button[data-action="written-reveal"]').first().click();
    await page.locator('.test-question').first().getByText('Expected result:',{exact:false}).waitFor();
    await page.locator('button[data-action="written-reset"]').click();
    // Use main navigation to verify the full question bank and maths lab.
    if(isMobile){await page.locator('#menu').click()}
    await page.locator('button[data-page="practice"]').click();
    await page.locator('#practice-search').fill('probability');
    await page.getByText('matching problems',{exact:false}).first().waitFor();
    if(isMobile){await page.locator('#menu').click()}
    await page.locator('button[data-page="lab"]').click();
    await page.locator('button[data-action="lab-switch"][data-lab="ap"]').click();
    assert.ok((await page.locator('#lab-output').innerText()).includes('aₙ'),'AP output missing');
    await page.locator('#lab-a').fill('10');
    assert.ok((await page.locator('#lab-output').innerText()).includes('Sequence:'),'AP live update missing');
    await snap('math-lab');
    if(isMobile){
      const overflow2=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
      assert.ok(overflow2<=3,'Math lab horizontal overflow '+overflow2);
    }
    assert.deepEqual(faults,[],'Browser runtime errors');
    return {name,ok:true,viewport,errors:faults};
  }catch(e){
    try{await snap('failure')}catch{}
    return {name,ok:false,error:String(e.stack||e),errors:faults};
  }finally{await context.close()}
 }
 try{
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const cases=[];
  cases.push(await scenario('desktop',{width:1440,height:900},false));
  cases.push(await scenario('mobile',{width:390,height:844},true));
  for(const item of cases){
   console.log((item.ok?'PASS':'FAIL')+' '+item.name+(item.ok?'':' '+item.error));
   if(!item.ok)issues.push(item);
  }
  if(issues.length)throw Error(issues.length+' real-browser scenario(s) failed');
  console.log('Real Chromium browser tests PASS on desktop + mobile');
 }finally{if(browser)await browser.close();await waitClose()}
}
run().catch(e=>{console.error(e.stack||e);process.exitCode=1});
