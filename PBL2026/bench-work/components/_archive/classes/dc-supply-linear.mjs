// Class instrument.dc-supply.linear@1: the trusted behaviour every linear DC bench supply component uses (the
// component standard §2, layer 1). A manifest names this class and gives the values; it never carries code.
// The base group follows IVI-4.4 IviDCPwrBase (voltage level, current limit, output enable) plus CV/CC; OVP is an
// optional group. One source for the law: the validator's golden tests and the bench both import this file.
//   Steady state into a resistive load R: CV while V_set / R ≤ I_lim, else CC with V = I_lim · R; the crossover is at
//   R = V_set / I_lim. With the OVP group, a set voltage above the OVP level trips the output off (latched).
//   The pass transistor dissipates (V_in − V_out) · I_out, V_in from the rail that serves V_out (tap switching).
export const CLASS = 'instrument.dc-supply.linear@1';

// what every member must declare (property → kind), and the optional groups with what each adds
export const REQUIRED = {
  properties: { vSet: 'setting', iLim: 'setting', power: 'state', output: 'state', mode: 'state', vOut: 'reading', iOut: 'reading' },
  controlled: ['vSet', 'iLim', 'power', 'output'],
  terminalNodes: ['+', '-'],
};
export const GROUPS = {
  ovp: { properties: { ovpLevel: 'setting' }, failures: ['ovpTrip'] },
};

// steady state; load in Ω, or 'open'
export function steady({ vSet, iLim, load, ovpLevel }) {
  if (ovpLevel != null && vSet > ovpLevel) return { vOut: 0, iOut: 0, mode: 'CV', output: 'off', fault: 'ovpTrip' };
  if (load === 'open' || !(load < Infinity)) return { vOut: vSet, iOut: 0, mode: 'CV', output: 'on' };
  const want = vSet / load;
  return want <= iLim ? { vOut: vSet, iOut: want, mode: 'CV', output: 'on' } : { vOut: iLim * load, iOut: iLim, mode: 'CC', output: 'on' };
}

// the pass transistor's dissipation, W; rails = [{ vOutUpTo, vIn }] in rising order
export function passPower(vOut, iOut, rails) {
  const r = rails.find((x) => vOut <= x.vOutUpTo + 1e-9) || rails[rails.length - 1];
  return Math.max(0, (r.vIn - vOut) * iOut);
}
