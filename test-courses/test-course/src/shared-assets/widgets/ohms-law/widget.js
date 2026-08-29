/**
 * Ohm's law, for the dummy-load worked example.
 *
 * A separate file rather than an inline script: course content is served with
 * `script-src 'self'` and inline execution is refused. Every widget in every
 * course has to be written this way.
 */
const $ = (id) => document.getElementById(id)
const fmt = (x, unit) =>
  x >= 1000 ? (x / 1000).toFixed(2) + ' k' + unit : x.toFixed(x < 10 ? 2 : 1) + ' ' + unit

function update () {
  const v = parseFloat($('v').value)
  const i = parseFloat($('i').value)

  if (!isFinite(v) || !isFinite(i) || i <= 0 || v <= 0) {
    $('r').textContent = $('p').textContent = $('rating').textContent = '—'
    $('warn').hidden = true
    return
  }

  const r = v / i
  const p = v * i
  // Derate by two: a resistor run at its rating gets hot enough to matter,
  // and a dummy load is on for minutes, not milliseconds.
  const rating = p * 2

  $('r').textContent = fmt(r, 'Ω')
  $('p').textContent = fmt(p, 'W')
  $('rating').textContent = fmt(rating, 'W')

  const warn = $('warn')
  if (p > 25) {
    warn.hidden = false
    warn.textContent = 'That is ' + p.toFixed(1) + ' W in one resistor. Use a chassis-mount '
      + 'wirewound on a heatsink, or split it across several — a bare resistor here will burn.'
  } else if (p > 5) {
    warn.hidden = false
    warn.textContent = 'Over 5 W. This wants a wirewound part, and it will get hot enough to '
      + 'mark the bench. Stand it off the surface.'
  } else {
    warn.hidden = true
  }
}

for (const el of [$('v'), $('i')]) el.addEventListener('input', update)
update()
