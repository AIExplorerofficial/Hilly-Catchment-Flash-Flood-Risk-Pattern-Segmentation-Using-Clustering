(async()=>{
const J=f=>fetch(`data/${f}.json`).then(r=>r.json()),$=s=>document.querySelector(s);
const [cells,lab,fa]=await Promise.all(['cells','labels','final_assignments'].map(J));
const med=a=>{a=[...a].sort((x,y)=>x-y);const m=a.length>>1;return a.length%2?a[m]:(a[m-1]+a[m])/2},mean=a=>a.reduce((s,v)=>s+v,0)/a.length;
const ZO=['plains','foothill','mid_hill','high_hill'],ZL={plains:'Plains',foothill:'Foothills',mid_hill:'Mid hills',high_hill:'High hills'};
// Problem: one threshold applied to every cell
const calc=()=>{const T=+$('#thr').value;$('#thr-v').textContent=T;
 $('#thr-bars').innerHTML=ZO.map(z=>{const c=cells.filter(x=>x.elev_zone===z),hi=100*c.filter(x=>x.p99_wetday>T).length/c.length;
 return `<div class="trow"><span>${ZL[z]} <small>(${c.length})</small></span><div class="tbar"><i class="over" style="width:${hi}%"></i><i class="under" style="width:${100-hi}%"></i></div><b>${hi.toFixed(0)}%</b></div>`}).join('')};
$('#thr').oninput=calc;calc();
// Solution: zone-specific thresholds
const id2c=new Map(lab.full.cell_ids.map((id,i)=>[+id,lab.full.euc_k4[i]]));
cells.forEach(c=>c.z=id2c.get(c.cell_id));
const U=med(cells.map(c=>c.p99_wetday)),gapU=mean(cells.map(c=>Math.abs(c.p99_wetday-U)));
const COL=['#c09151','#b65b3d','#365b4c','#527d87'],
ACT=['Little local rainfall extreme. Flood concern is mostly water arriving from upstream: link to river-gauge and upstream-zone alerts.',
'Priority zone for dense rain gauges and the most sensitive daily-rainfall alerts: strongest rainfall tail and most heavy-rain days.',
'Steep, persistently wet terrain. Moderate daily extremes, but slope makes saturated-ground and runoff effects matter: mid-level threshold.',
'Cold-arid plateau. Rain extremes are rare, so rainfall alerts add little; snow, glacier and temperature monitoring matter more.'];
let gapZ=0,rows='';
[0,1,2,3].forEach(k=>{const c=cells.filter(x=>x.z===k),t=med(c.map(x=>x.p99_wetday));gapZ+=c.reduce((s,x)=>s+Math.abs(x.p99_wetday-t),0);
 rows+=`<tr><td><i class="key"><i style="background:${COL[k]}"></i></i><b>${fa.find(r=>r.dataset==='full'&&r.k===4&&r.cluster===k).name}</b></td><td>${c.length} (${(100*c.length/cells.length).toFixed(0)}%)</td><td><b>${t.toFixed(0)} mm</b></td><td>${med(c.map(x=>x.heavy_days_per_yr)).toFixed(1)}</td><td>${mean(c.map(x=>x.slope_mean)).toFixed(0)}°</td><td>${ACT[k]}</td></tr>`});
gapZ/=cells.length;
$('#zone-table').innerHTML=`<table class="zt"><tr><th>ZONE</th><th>CELLS</th><th>SCREENING THRESHOLD (median P99)</th><th>HEAVY DAYS / YR</th><th>MEAN SLOPE</th><th>MONITORING APPROACH</th></tr>${rows}</table>`;
$('#gap-u').textContent=U.toFixed(0);$('#gap-uv').textContent=gapU.toFixed(1);$('#gap-zv').textContent=gapZ.toFixed(1);$('#gap-red').textContent=(100*(1-gapZ/gapU)).toFixed(0)+'%';
$('#zone-map').innerHTML=cells.map(c=>`<rect x="${(c.lon-75.5)*80}" y="${(33.5-c.lat)*80}" width="19" height="19" fill="${COL[c.z]}"><title>Cell ${c.cell_id} · zone ${c.z}</title></rect>`).join('');
})();
