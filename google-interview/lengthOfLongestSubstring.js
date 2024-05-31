
/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = s => {
  const map = new Map();
  let best = 0;
  let p = -1;
  for (let i = 0; i < s.length; ++i) {
    const char = s[i];
    if (!map.has(char)) {
      map.set(char, i);
    } else {
      const chIdx = map.get(char);
      if (chIdx > p) p = chIdx;
      map.set(char, i);
    }
    const size = i - p;
    if (size > best) best = size;
  }
  return best;
};

lengthOfLongestSubstring('abcabcbb');
lengthOfLongestSubstring('bbbbb');
lengthOfLongestSubstring('pwwkew');
lengthOfLongestSubstring('tmmzuxt'); // 5
