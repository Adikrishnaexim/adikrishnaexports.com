/* Translate button: our own visible dropdown drives Google Website Translator.
   Google's widget is loaded but hidden; picking a language here sets it and Google translates the page live.
   Edit LANGS to change the list. */
(function(){
  var wrap=document.querySelector('.gt-wrap'); if(!wrap)return;
  var LANGS=[['en','English'],['ar','العربية (Arabic)'],['fr','Français (French)'],['es','Español (Spanish)'],['de','Deutsch (German)'],['it','Italiano (Italian)'],['pt','Português (Portuguese)'],['ru','Русский (Russian)'],['zh-CN','中文 (Chinese)'],['ja','日本語 (Japanese)'],['ko','한국어 (Korean)'],['tr','Türkçe (Turkish)'],['nl','Nederlands (Dutch)'],['hi','हिन्दी (Hindi)'],['mr','मराठी (Marathi)'],['gu','ગુજરાતી (Gujarati)'],['bn','বাংলা (Bengali)'],['ta','தமிழ் (Tamil)'],['te','తెలుగు (Telugu)'],['ur','اردو (Urdu)'],['id','Bahasa Indonesia'],['vi','Tiếng Việt (Vietnamese)'],['th','ไทย (Thai)'],['sw','Kiswahili (Swahili)']];
  wrap.className+=' notranslate'; wrap.setAttribute('translate','no');
  var sel=document.createElement('select'); sel.className='gt-select'; sel.setAttribute('aria-label','Translate this page'); sel.title='Translate this page'; wrap.title='Translate this page';
  sel.innerHTML='<option value="">Select language</option>'+LANGS.map(function(l){return '<option value="'+l[0]+'">'+l[1]+'</option>';}).join('');
  var ico=wrap.querySelector('.gt-ico'); var lab=document.createElement('b'); lab.className='gt-label'; lab.textContent='Translate'; if(ico&&ico.nextSibling)wrap.insertBefore(lab,ico.nextSibling); else wrap.appendChild(lab);
  var box=document.getElementById('google_translate_element'); wrap.insertBefore(sel,box);

  function cookieLang(){var m=document.cookie.match(/googtrans=\/[^\/]*\/([^;]+)/);return m?m[1]:'';}
  function setCookie(v){
    var host=location.hostname, base='googtrans='+v+';path=/';
    document.cookie=base; if(host&&host.indexOf('.')>-1)document.cookie=base+';domain='+host;
  }
  function clearCookie(){
    var host=location.hostname, past=';expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    document.cookie='googtrans=;'+past; document.cookie='googtrans=;'+past+';domain='+host; document.cookie='googtrans=;'+past+';domain=.'+host;
  }
  var cur=cookieLang(); if(cur&&cur!=='en')sel.value=cur;

  sel.addEventListener('change',function(){
    var lang=sel.value; if(!lang)return;
    if(lang==='en'){clearCookie();location.reload();return;}
    var combo=document.querySelector('#google_translate_element select.goog-te-combo');
    if(combo){combo.value=lang;combo.dispatchEvent(new Event('change'));}
    else{ setCookie('/en/'+lang); location.reload(); }   // widget not ready yet: set cookie, Google applies it on load
  });
})();

function googleTranslateElementInit(){
  new google.translate.TranslateElement({
    pageLanguage:'en',
    includedLanguages:'en,ar,fr,es,de,it,pt,ru,zh-CN,ja,ko,tr,nl,hi,mr,gu,bn,ta,te,ur,id,vi,th,sw',
    layout:google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay:false
  },'google_translate_element');
}
(function(){
  if(!document.getElementById('google_translate_element'))return;
  var s=document.createElement('script');
  s.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async=true;
  s.onerror=function(){var sel=document.querySelector('.gt-select');if(sel){sel.disabled=true;sel.title='Translation service could not be reached';}};
  document.head.appendChild(s);
})();
