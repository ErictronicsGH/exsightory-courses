// Builds u016-preview.html from u016-preview.src.html, injecting D1·070's Flow paragraphs verbatim from the notes,
// so the stop captions can never drift from the owner's text. Run: node make_u016.mjs
import fs from 'fs';
const here = new URL('.', import.meta.url);
const src = fs.readFileSync(new URL('u016-preview.src.html', here), 'utf8');
const md = fs.readFileSync(new URL('../../notes/Day01/070-adc-input/en.md', here), 'utf8');
const cards = md.split(/^## /m).slice(1).map(s => {
  const m = s.match(/```flow\r?\n([\s\S]*?)```/);
  const paras = m[1].trim().split(/\r?\n\s*\r?\n/).map(p => p.replace(/\s*\r?\n\s*/g, ' ').trim());
  return {
    title: s.split(/\r?\n/)[0].trim(),
    paras: paras.map(p => ({ cues: [...p.matchAll(/\[\[(\w+)\]\]/g)].map(x => x[1]), text: p.replace(/\[\[\w+\]\]\s*/g, '').trim() })),
  };
});
if (cards.length !== 8) throw new Error('expected 8 cards, got ' + cards.length);
const json = JSON.stringify(cards).replace(/</g, '\\u003c');
fs.writeFileSync(new URL('u016-preview.html', here), src.replace('__FLOW_JSON__', json));
console.log('u016-preview.html built:', cards.map((c, i) => `card ${i + 1} ${c.paras.length} ¶`).join(', '));
