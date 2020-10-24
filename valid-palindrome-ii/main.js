
/**
 * @param {string} s
 * @return {boolean}
 */
const validPalindrome = (s, rev = true) => {
  const len = s.length;
  const half = len / 2 | 0;
  let skip = 0;
  for (let i = 0; i < half; ++i) {
    if (s[i+skip] !== s[len-i-1]) {
      if (skip) {
        return rev && validPalindrome([...s].reverse().join(''), false);
      }
      skip = 1;
      --i;
    }
  }
  return true;
};
