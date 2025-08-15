export const $ = (q, el=document) => el.querySelector(q);
export const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));
export function trapFocus(container){
  const focusables = $$('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])', container);
  if(!focusables.length) return ()=>{};
  const first = focusables[0], last = focusables[focusables.length-1];
  function onKey(e){
    if(e.key !== 'Tab') return;
    if(e.shiftKey && document.activeElement === first){ last.focus(); e.preventDefault(); }
    else if(!e.shiftKey && document.activeElement === last){ first.focus(); e.preventDefault(); }
  }
  container.addEventListener('keydown', onKey);
  return ()=> container.removeEventListener('keydown', onKey);
}
