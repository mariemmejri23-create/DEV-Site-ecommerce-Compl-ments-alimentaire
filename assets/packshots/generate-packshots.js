const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const ST = {
  'Préconception': { bg: '#EFE9F7', c: '#B9A7D6', d: '#7E6AA6' },
  '1er trimestre': { bg: '#FBEDE5', c: '#F4D6C6', d: '#C9826B' },
  '2e trimestre': { bg: '#F7E4DB', c: '#C9826B', d: '#A9624C' },
  '3e trimestre': { bg: '#E7EFE6', c: '#8FA68E', d: '#4F7A5A' },
  'Allaitement': { bg: '#E6EFF5', c: '#A7C4D6', d: '#4E7891' },
  'Toutes étapes': { bg: '#F5EFE7', c: '#E3B6A1', d: '#A9624C' },
};
const P = [
  ['preconception-essentiel', 'Préconception', 'Préconception<br>Essentiel', 'Préconception', '30 gélules'],
  ['prenatal-complet-t1', '1er trimestre', 'Prénatal<br>Complet T1', '1er trimestre', '30 gélules'],
  ['prenatal-complet-t2', '2e trimestre', 'Prénatal<br>Complet T2', '2e trimestre', '60 gélules'],
  ['prenatal-complet-t3', '3e trimestre', 'Prénatal<br>Complet T3', '3e trimestre', '60 gélules'],
  ['omega-3-dha-maman', '3e trimestre', 'Oméga-3<br>DHA Maman', 'Grossesse &amp; allaitement', '60 capsules'],
  ['allaitement-douceur', 'Allaitement', 'Allaitement<br>Douceur', 'Allaitement', '60 gélules'],
  ['fer-doux', 'Toutes étapes', 'Fer<br>Doux', 'Toutes étapes', '30 gélules'],
  ['magnesium-serenite', 'Toutes étapes', 'Magnésium<br>Sérénité', 'Toutes étapes', '60 gélules'],
];
const PACKS = [
  ['pack-preconception', 'Préconception', 'Pack Préconception', [P[0], P[4]]],
  ['pack-2e-trimestre', '2e trimestre', 'Pack 2e trimestre', [P[2], P[7]]],
  ['pack-allaitement', 'Allaitement', 'Pack Allaitement', [P[5], P[6]]],
];
const moons = (col) => {
  let s = '';
  for (let i = 0; i < 9; i++) {
    const t = i / 8, x = 10 + t * 180, y = 34 - Math.sin(t * Math.PI * 0.9 + 0.2) * 22, r = 3 + t * 5;
    const a = (0.35 + t * 0.65).toFixed(2);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${col}" fill-opacity="${a}"/>`;
  }
  return `<svg width="150" height="34" viewBox="0 0 200 46">${s}</svg>`;
};
const bottle = (p, scale = 1) => {
  const s = ST[p[1]];
  return `<div class="bottle" style="transform:scale(${scale})">
    <div class="cap"></div><div class="neck"></div>
    <div class="body">
      <div class="label" style="border-top:10px solid ${s.c}">
        ${moons(s.d)}
        <div class="brand">Neuf Lunes</div>
        <div class="rule" style="background:${s.c}"></div>
        <div class="pname">${p[2]}</div>
        <div class="stage" style="background:${s.c};color:${p[1] === '1er trimestre' ? '#2F2A26' : '#fff'}">${p[3]}</div>
        <div class="foot">${p[4]}<br>Complément alimentaire</div>
      </div>
      <div class="shine"></div>
    </div></div>`;
};
const page = (stageKey, inner) => {
  const s = ST[stageKey];
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600&family=DM+Sans:wght@500;700&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:1000px;height:1250px;background:${s.bg};position:relative;overflow:hidden;font-family:'DM Sans',sans-serif;color:#2F2A26}
.blob{position:absolute;border-radius:50%}
.stage-wrap{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;gap:40px;padding-bottom:190px}
.ground{position:absolute;left:50%;bottom:150px;width:760px;height:90px;transform:translateX(-50%);background:radial-gradient(ellipse at center,rgba(47,42,38,.16),rgba(47,42,38,0) 70%)}
.bottle{display:flex;flex-direction:column;align-items:center;transform-origin:bottom center}
.cap{width:250px;height:92px;border-radius:18px 18px 8px 8px;background:linear-gradient(90deg,#d9cfc4,#f3ede6 45%,#cfc4b8);box-shadow:inset 0 -6px 0 rgba(0,0,0,.06)}
.cap{background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.035) 0 4px,transparent 4px 10px),linear-gradient(90deg,#d9cfc4,#f3ede6 45%,#cfc4b8)}
.neck{width:270px;height:18px;background:#efe9e1;border-radius:4px}
.body{position:relative;width:400px;height:600px;border-radius:70px 70px 46px 46px;background:linear-gradient(90deg,#efe9e2 0%,#ffffff 38%,#fbf8f4 62%,#e6dfd6 100%);box-shadow:0 30px 60px rgba(47,42,38,.12);display:flex;align-items:center;justify-content:center;overflow:hidden}
.label{width:340px;height:420px;background:#FBF7F2;border-radius:10px;display:flex;flex-direction:column;align-items:center;padding:34px 24px 26px;text-align:center;box-shadow:0 0 0 1px rgba(47,42,38,.05)}
.brand{font-family:'Fraunces',serif;font-weight:600;font-size:34px;letter-spacing:.2px;margin-top:4px}
.rule{width:56px;height:3px;border-radius:3px;margin:18px 0 20px}
.pname{font-family:'Fraunces',serif;font-weight:400;font-size:36px;line-height:1.12}
.stage{margin-top:20px;padding:7px 16px;border-radius:999px;font-weight:700;font-size:15px;letter-spacing:.3px}
.foot{margin-top:auto;font-size:13px;font-weight:500;color:#6E645C;letter-spacing:.6px;text-transform:uppercase;line-height:1.6}
.shine{position:absolute;top:0;left:52px;width:26px;height:100%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.55),rgba(255,255,255,0))}
.title{position:absolute;top:70px;left:0;right:0;text-align:center;font-family:'Fraunces',serif;font-weight:600;font-size:44px}
.sub{position:absolute;top:132px;left:0;right:0;text-align:center;font-size:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${s.d}}
</style></head><body>
<div class="blob" style="width:620px;height:620px;right:-140px;top:120px;background:${s.c};opacity:.35"></div>
<div class="blob" style="width:420px;height:420px;left:-120px;bottom:120px;background:#fff;opacity:.55"></div>
<div class="ground"></div>
${inner}
</body></html>`;
};
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(() => chromium.launch());
  const pg = await b.newPage({ viewport: { width: 1000, height: 1250 } });
  const jobs = [];
  for (const p of P) jobs.push([p[0], page(p[1], `<div class="stage-wrap">${bottle(p)}</div>`)]);
  for (const [slug, st, title, items] of PACKS)
    jobs.push([slug, page(st, `<div class="title">${title}</div><div class="sub">Cure de 30 jours · -15 %</div><div class="stage-wrap" style="gap:0">${bottle(items[0], 0.82)}<div style="width:0;margin-left:-40px"></div>${bottle(items[1], 0.74)}</div>`)]);
  for (const [slug, html] of jobs) {
    await pg.setContent(html, { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: `${slug}.jpg`, type: 'jpeg', quality: 86 });
  }
  await b.close();
  console.log('done', jobs.length);
})();
