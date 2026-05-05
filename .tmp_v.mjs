import { writeFileSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CDP_PORT = 9344;
const URL = 'http://localhost:5174/';
const W = parseInt(process.argv[2] || '390', 10);
const LANG = process.argv[3] || 'el';
const SECTION = process.argv[4] || 'header';
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userData = join(tmpdir(), 'edge-cdp-' + Date.now());
mkdirSync(userData, { recursive: true });
const proc = spawn(edge, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--no-first-run', '--no-default-browser-check',
  `--window-size=${W},900`,
  `--remote-debugging-port=${CDP_PORT}`,
  `--user-data-dir=${userData}`,
  'about:blank',
], { stdio: 'ignore' });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function main() {
  let targets;
  for (let i = 0; i < 50; i++) { try { const r = await fetch(`http://127.0.0.1:${CDP_PORT}/json`); targets = await r.json(); if (targets.length) break; } catch {} await sleep(200); }
  const target = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pending = new Map();
  ws.onmessage = (ev) => { const m=JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const {resolve,reject}=pending.get(m.id); pending.delete(m.id); m.error?reject(new Error(JSON.stringify(m.error))):resolve(m.result); } };
  const send = (m, p={}) => new Promise((r, j) => { const i=++id; pending.set(i,{resolve:r,reject:j}); ws.send(JSON.stringify({id:i,method:m,params:p})); });
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: 900, deviceScaleFactor: 2, mobile: W < 980 });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate', { url: URL });
  await new Promise((resolve) => { const h=(ev)=>{const m=JSON.parse(ev.data);if(m.method==='Page.loadEventFired'){ws.removeEventListener('message',h);resolve();}}; ws.addEventListener('message',h); });
  await send('Runtime.evaluate', { expression: `localStorage.setItem('site_lang','${LANG}'); location.reload();` });
  await sleep(3500);
  await send('Runtime.evaluate', { expression: `document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));` });
  await sleep(700);

  let clip;
  if (SECTION === 'header') {
    clip = { x:0, y:0, width:W, height:120, scale:2 };
  } else {
    await send('Runtime.evaluate', { expression: `document.getElementById('${SECTION}').scrollIntoView({block:'start'});` });
    await sleep(400);
    const r = await send('Runtime.evaluate', { expression: `(()=>{const el=document.getElementById('${SECTION}'); const r=el.getBoundingClientRect(); return JSON.stringify({y:Math.round(r.top+window.scrollY),h:Math.round(r.height)});})()`, returnByValue: true });
    const o = JSON.parse(r.result.value);
    clip = { x:0, y:o.y, width:W, height:Math.min(o.h, 2200), scale:1 };
  }
  const shot = await send('Page.captureScreenshot', { format:'png', captureBeyondViewport: true, clip });
  writeFileSync(`./.tmp_v_${W}_${LANG}_${SECTION}.png`, Buffer.from(shot.data, 'base64'));
  console.log('saved', W, LANG, SECTION);
  ws.close(); proc.kill(); process.exit(0);
}
main().catch(e => { console.error(e); proc.kill(); process.exit(1); });
