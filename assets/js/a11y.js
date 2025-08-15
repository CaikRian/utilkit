function hexToRgb(hex){
  const v = hex.replace('#','');
  const bigint = parseInt(v.length===3 ? v.split('').map(c=>c+c).join('') : v, 16);
  return [(bigint>>16)&255, (bigint>>8)&255, bigint&255];
}
function relLuminance([r,g,b]){
  const srgb = [r,g,b].map(v=>v/255).map(v=> v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4));
  return 0.2126*srgb[0]+0.7152*srgb[1]+0.0722*srgb[2];
}
function contrastRatio(fg,bg){
  const L1 = relLuminance(hexToRgb(fg));
  const L2 = relLuminance(hexToRgb(bg));
  const lighter = Math.max(L1,L2), darker = Math.min(L1,L2);
  return (lighter + 0.05) / (darker + 0.05);
}
const fg = document.getElementById('fg');
const bg = document.getElementById('bg');
const out = document.getElementById('result');
document.getElementById('check').addEventListener('click', ()=>{
  const ratio = contrastRatio(fg.value, bg.value);
  const AA = ratio >= 4.5 ? 'PASS' : 'FAIL';
  const AAA = ratio >= 7 ? 'PASS' : 'FAIL';
  out.textContent = `Contraste: ${ratio.toFixed(2)}:1\nAA (normal): ${AA}\nAAA (normal): ${AAA}`;
});
