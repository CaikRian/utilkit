const hud = document.getElementById('hud');
function writeHUD(data){
  hud.textContent = `LCP: ${data.lcp?.toFixed(2) ?? '-'}ms  |  FID: ${data.fid?.toFixed(2) ?? '-'}ms  |  CLS: ${(data.cls ?? 0).toFixed(3)}`;
}
const data = { lcp: null, fid: null, cls: 0 };

// Largest Contentful Paint
try{
  const lcpObs = new PerformanceObserver((list)=>{
    const entries = list.getEntries();
    const last = entries[entries.length - 1];
    data.lcp = last.renderTime || last.loadTime || last.startTime;
    writeHUD(data);
  });
  lcpObs.observe({ type: 'largest-contentful-paint', buffered: true });
}catch{}

// First Input Delay (Event Timing)
try{
  const fidObs = new PerformanceObserver((list)=>{
    const e = list.getEntries()[0];
    if(e) { data.fid = e.processingStart - e.startTime; writeHUD(data); fidObs.disconnect(); }
  });
  fidObs.observe({ type: 'first-input', buffered: true });
}catch{}

// Cumulative Layout Shift
try{
  let cls = 0;
  const clsObs = new PerformanceObserver((list)=>{
    for(const e of list.getEntries()){
      if(!e.hadRecentInput) { cls += e.value; }
    }
    data.cls = cls;
    writeHUD(data);
  });
  clsObs.observe({ type: 'layout-shift', buffered: true });
}catch{}

writeHUD(data);
