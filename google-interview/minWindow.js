/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = (s, t) => {
  const set = new Set([...t]);
  const map = new Map();
  [...t].map(char => {
    const cnt = map.get(char) ?? 0;
    map.set(char, cnt + 1);
  });
  let best = '';
  let bestLen = Infinity;
  let [lp, rp] = [-1, -1];
  let left = map.size;
  while (lp < s.length) {
    const edge = rp + 1 === s.length;
    if (left > 0 && !edge) {
      const char = s[++rp];
      if (set.has(char)) {
        const cnt = (map.get(char) ?? 0) - 1;
        map.set(char, cnt);
        if (cnt === 0) --left;
      }
    } else {
      const char = s[++lp];
      if (set.has(char)) {
        const cnt = (map.get(char) ?? 0) + 1;
        map.set(char, cnt);
        if (cnt === 1) ++left;
      }
    }
    const slice = s.slice(lp+1, rp+1);
    if (left === 0) {
      if (slice.length < bestLen) {
        best = slice;
        bestLen = slice.length;
      }
    }
  }
  return best;
};

minWindow('ADOBECODEBANC', 'ABC'); // BANC
minWindow('a', 'a'); // a
minWindow('a', 'aa'); //
