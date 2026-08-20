const navToggle=document.querySelector('.nav-toggle');
const mainNav=document.querySelector('.main-nav');
navToggle?.addEventListener('click',()=>{const open=mainNav?.classList.toggle('open');navToggle.setAttribute('aria-expanded',open?'true':'false')});
mainNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');navToggle?.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
