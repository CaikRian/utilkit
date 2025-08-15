import { $, $$, trapFocus } from './utils.js';

// theme toggle
const themeBtn = $('#themeToggle');
const saved = localStorage.getItem('theme') || 'light';
if(saved === 'dark') document.documentElement.classList.add('dark');
themeBtn.setAttribute('aria-pressed', saved === 'dark' ? 'true' : 'false');
themeBtn.addEventListener('click', ()=>{
  const dark = document.documentElement.classList.toggle('dark');
  themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

// font size
const fontRange = $('#fontRange');
fontRange.addEventListener('input', ()=> document.documentElement.style.fontSize = fontRange.value + 'px');

// modal
const modal = document.querySelector('.modal');
const openModalBtn = $('#openModal');
const closeModalBtn = $('#closeModal');
let releaseTrap = ()=>{};
openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  releaseTrap = trapFocus(modal);
  closeModalBtn.focus();
});
closeModalBtn.addEventListener('click', () => { modal.classList.add('hidden'); releaseTrap(); openModalBtn.focus(); });
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !modal.classList.contains('hidden')){ closeModalBtn.click(); }});

// tabs
const tabs = $$('.tab');
const panels = $$('.panel');
tabs.forEach((tab, idx)=>{
  tab.addEventListener('click', ()=> activateTab(idx));
});
function activateTab(i){
  tabs.forEach((t, j)=>{
    const selected = i===j;
    t.setAttribute('aria-selected', selected ? 'true' : 'false');
    t.tabIndex = selected ? 0 : -1;
    panels[j].classList.toggle('hidden', !selected);
  });
}
activateTab(0);

// load cards from "API"
const grid = $('#grid');
let items = [];
async function load(){
  const r = await fetch('data/items.json');
  items = await r.json();
  render(items);
}
function render(list){
  grid.innerHTML = list.map(it => `
    <article class="card" data-tags="${it.tags.join(',')}">
      <h3>${it.name}</h3>
      <span class="badge">${it.tags.join(' • ')}</span>
      <p class="muted">${it.desc}</p>
    </article>
  `).join('');
}
load();

// filters
const search = $('#search');
const chips = $$('.chip');
function applyFilters(){
  const term = search.value.toLowerCase();
  const active = chips.find(c=>c.classList.contains('active')).dataset.tag;
  $$('#grid .card').forEach(card => {
    const matchesText = card.textContent.toLowerCase().includes(term);
    const tags = card.getAttribute('data-tags').split(',');
    const matchesTag = active==='all' || tags.includes(active);
    card.style.display = (matchesText && matchesTag) ? '' : 'none';
  });
}
search.addEventListener('input', applyFilters);
chips.forEach(ch => ch.addEventListener('click', ()=>{
  chips.forEach(c=>c.classList.remove('active'));
  ch.classList.add('active');
  applyFilters();
}));

// form validation
const form = $('#feedbackForm'), ok = $('#ok');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  let valid = true;
  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const msg = $('#msg').value.trim();
  $('#err-name').textContent = name ? '' : 'Informe seu nome';
  $('#err-email').textContent = /.+@.+\..+/.test(email) ? '' : 'E-mail inválido';
  $('#err-msg').textContent = msg ? '' : 'Escreva uma mensagem';
  valid = name && /.+@.+\..+/.test(email) && msg;
  if(valid){
    ok.textContent = 'Enviado! (demo)';
    form.reset();
    setTimeout(()=> ok.textContent = '', 1500);
  }
});
