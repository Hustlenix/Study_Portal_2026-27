/* Maths Studio theme preference. No cookies, tracking, or external dependencies. */
(function(){
  'use strict';
  var KEY='maths-studio-theme';
  var root=document.documentElement;
  var media=window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function stored(){
    try{var value=window.localStorage.getItem(KEY);return value==='light'||value==='dark'?value:null}catch(e){return null}
  }
  function preferred(){return stored()||(media&&media.matches?'dark':'light')}
  function setTheme(theme,save){
    theme=theme==='dark'?'dark':'light';
    root.setAttribute('data-theme',theme);
    root.style.colorScheme=theme;
    var themeColor=document.querySelector('meta[name="theme-color"]');
    if(themeColor)themeColor.setAttribute('content',theme==='dark'?'#13151c':'#f5f2e9');
    var control=document.getElementById('theme-toggle');
    if(control){
      control.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');
      control.setAttribute('aria-pressed',String(theme==='dark'));
      control.setAttribute('title',theme==='dark'?'Switch to light mode':'Switch to dark mode');
      var icon=control.querySelector('.theme-icon');
      var label=control.querySelector('.theme-label');
      if(icon)icon.textContent=theme==='dark'?'☀':'☾';
      if(label)label.textContent=theme==='dark'?'Light mode':'Dark mode';
    }
    if(save){try{window.localStorage.setItem(KEY,theme)}catch(e){}}
  }
  setTheme(preferred(),false);
  document.addEventListener('DOMContentLoaded',function(){
    setTheme(preferred(),false);
    var control=document.getElementById('theme-toggle');
    if(control)control.addEventListener('click',function(){
      setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark',true);
    });
  });
  if(media){
    var changed=function(){if(!stored())setTheme(preferred(),false)};
    if(typeof media.addEventListener==='function')media.addEventListener('change',changed);
    else if(typeof media.addListener==='function')media.addListener(changed);
  }
})();
