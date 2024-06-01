
/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstringTwoDistinct = s => {
  const map = new Map();
  let dc = 0;
  let [lp, rp] = [-1, -1];
  let best = 0;
  while (rp < s.length) {
    if (dc <= 2) {
      const char = s[++rp];
      const cnt = (map.get(char) ?? 0) + 1;
      map.set(char, cnt);
      if (cnt === 1) ++dc;
    } else {
      const char = s[++lp];
      const cnt = (map.get(char) ?? 0) - 1;
      map.set(char, cnt);
      if (cnt === 0) --dc;
    }
    if (dc > 2) continue;
    const len = rp - lp;
    if (len > best) best = len;
  }
  return Math.min(s.length, best);
};

lengthOfLongestSubstringTwoDistinct('eceba'); // ece
lengthOfLongestSubstringTwoDistinct('ccaabbb'); // aabbb
lengthOfLongestSubstringTwoDistinct('a');
