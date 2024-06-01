/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isIsomorphic = (s, t, check = true) => {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (map.has(char)) {
      if (map.get(char) !== t[i]) return false;
    } else {
      map.set(char, t[i]);
    }
  }
  return check ? isIsomorphic(t, s, false) : true;
};
