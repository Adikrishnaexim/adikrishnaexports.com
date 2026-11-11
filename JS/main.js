
/* ===== CONFIG: edit these for the client ===== */
const CONFIG = {
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",      // company story video
  formEndpoint: "",                                              // e.g. https://formspree.io/f/xxxx  (leave empty to use email fallback)
  email: "info@adikrishnafoods.com"                              // used when no endpoint is set
};

/* page paths: index.html is at the root, every other page is inside /pages/ */
const IN_PAGES=/\/pages\/[^\/]*$/.test(location.pathname), PG=IN_PAGES?'':'pages/', HOME=IN_PAGES?'../index.html':'index.html';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const open=m=>{m.classList.add('open');document.body.style.overflow='hidden'};
const close=()=>{$$('.modal.open').forEach(m=>m.classList.remove('open'));document.body.style.overflow='';$('#vf').src=''};

// mobile menu + mobile dropdowns
$('#burger').onclick=e=>{const o=$('#nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
$$('.dd>button').forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('open'));
document.addEventListener('click',e=>{if(!e.target.closest('.dd'))$$('.dd.open').forEach(d=>d.classList.remove('open'))});

// search
$('#sbtn').onclick=()=>{$('#search').classList.toggle('open');$('#sq').focus()};
$('#sform').onsubmit=e=>{e.preventDefault();const q=$('#sq').value.trim();if(!q)return;
  location.href=PG+'all-products.html?q='+encodeURIComponent(q)};

// quote modal
document.addEventListener('click',e=>{const el=e.target.closest('[data-quote]');if(!el)return;{
  e.preventDefault();
  if(el.dataset.p)$('#pc').value=el.dataset.p;$('#pn').value=el.dataset.item||'';$('#hs').value=el.dataset.hs||'';
  $('#m').value=el.dataset.item?'I would like a quote for: '+el.dataset.item+'\nQuantity: ':'';
  $('#ok').style.display='none';open($('#qm'));$('#n').focus()}});

$('#qf').onsubmit=async e=>{
  e.preventDefault();
  const d=Object.fromEntries(new FormData(e.target));
  if(CONFIG.formEndpoint){
    try{
      const r=await fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify(d)});
      if(!r.ok)throw 0;
      $('#ok').style.display='block';e.target.reset();return;
    }catch{alert('Could not send. Please email '+CONFIG.email);return}
  }
  const body=Object.entries(d).map(([k,v])=>k+': '+v).join('\n');
  location.href='mailto:'+CONFIG.email+'?subject='+encodeURIComponent('Quote request: '+d.category)+'&body='+encodeURIComponent(body);
  $('#ok').style.display='block';
};

// video
if($('#story'))$('#story').onclick=()=>{$('#vf').src=CONFIG.videoUrl+'?autoplay=1';open($('#vm'))};

// close handlers
$$('[data-close]').forEach(b=>b.onclick=close);
$$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)close()}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});

// currency: persisted preference (language is handled by Google Translate, see translate.js)
(function(){const s=$('#cur');if(!s)return;try{const v=localStorage.getItem('cur');if(v)s.value=v}catch{};
  s.onchange=()=>{try{localStorage.setItem('cur',s.value)}catch{}}})();

// active nav on click
$$('nav a').forEach(a=>a.addEventListener('click',()=>{$('#nav').classList.remove('open')}));

// ===== mobile: tab strip + quote button in menu (hidden on desktop by CSS) =====
(function(){
  const hd=document.querySelector('header');if(!hd)return;
  const tabs=[['Home','index.html'],['Profile','profile.html'],['Agro Products','products.html'],['Consumer Products','non-food-products.html'],['Private Label','private-label.html'],['Contact','contact.html']];
  const href=h=>h==='index.html'?HOME:PG+h;
  const cur=(location.pathname.split('/').pop()||'index.html');
  const st=document.createElement('div');st.className='mtabs';
  st.innerHTML=tabs.map(([n,h])=>`<a href="${href(h)}"${h===cur?' class="on" aria-current="page"':''}>${n}</a>`).join('');
  hd.appendChild(st);
  const on=st.querySelector('.on');if(on)st.scrollLeft=on.offsetLeft-16;
  const ul=document.querySelector('nav>ul');
  if(ul){const li=document.createElement('li');li.className='mq';li.innerHTML='<a class="btn" href="#" data-quote>✉️ Request a Quote</a>';ul.appendChild(li)}
})();

// ===== contact page form =====
(function(){
  const f=$('#cf');if(!f)return;
  const st=$('#cfs'),btn=f.querySelector('button[type=submit]');
  const show=(t,m)=>{st.className='cf-status '+t;st.textContent=m};
  f.onsubmit=async e=>{
    e.preventDefault();
    const d=Object.fromEntries(new FormData(f));
    if(d.website)return;            // spam trap
    delete d.website;
    if(!d.name.trim()||!/^\S+@\S+\.\S+$/.test(d.email.trim())){show('err','Please enter your name and a valid email address.');return}
    if(!d.message.trim()){show('err','Please write a short message.');return}
    btn.disabled=true;
    if(CONFIG.formEndpoint){
      try{
        const r=await fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify(d)});
        if(!r.ok)throw 0;
        show('ok','Thank you. Your message has been sent. We will reply within one business day.');f.reset();
      }catch{show('err','Could not send right now. Please email '+CONFIG.email)}
      btn.disabled=false;return;
    }
    const body=Object.entries(d).map(([k,v])=>k+': '+v).join('\n');
    location.href='mailto:'+CONFIG.email+'?subject='+encodeURIComponent(d.subject||'Website enquiry')+'&body='+encodeURIComponent(body);
    show('ok','Your email app should open with the message ready to send.');
    btn.disabled=false;
  };
})();
