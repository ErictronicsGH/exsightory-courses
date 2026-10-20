// Rasterise SVG stills to PNG (beside each SVG) in one hidden offscreen Electron window (InsightDemo's electron.exe).
// usage: electron.exe shoot-svg.js [outdir] a.svg b.svg …   (any argument not ending in .svg is ignored)
// Each SVG is wrapped in an HTML file and opened with loadFile (a data URL fails for long SVGs). See memory prototype-capture.md.
const { app, BrowserWindow } = require('electron');
const fs = require('fs'); const path = require('path');
const files = process.argv.slice(2).filter(f => f.toLowerCase().endsWith('.svg'));
app.commandLine.appendSwitch('force-device-scale-factor', '1');
app.whenReady().then(async () => {
  const win = new BrowserWindow({ width: 1920, height: 1080, show: false, webPreferences: { offscreen: true } });
  for (const f of files) {
    const svg = fs.readFileSync(f, 'utf8');
    const m = /viewBox='0 0 (\d+) (\d+)'|viewBox="0 0 (\d+) (\d+)"/.exec(svg);
    const w = +(m[1] || m[3]), h = +(m[2] || m[4]);
    win.setContentSize(w, h);
    const html = f.replace(/\.svg$/i, '.__shoot.html');
    fs.writeFileSync(html, `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#05070B;overflow:hidden}svg{display:block;width:${w}px;height:${h}px}</style>${svg}`);
    await win.loadFile(html);
    await new Promise(r => setTimeout(r, 900));
    const img = await win.webContents.capturePage({ x: 0, y: 0, width: w, height: h });
    fs.writeFileSync(f.replace(/\.svg$/i, '.png'), img.toPNG());
    fs.unlinkSync(html);
    console.log('shot', path.basename(f));
  }
  app.quit();
});
