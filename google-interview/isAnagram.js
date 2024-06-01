
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = (s, t) => {
  const sort = s => [...s].sort((a, b) => a.localeCompare(b)).join('');
  return sort(s) === sort(t);
};

isAnagram("anagram", "nagaram"); // true
isAnagram("rat", "car"); // false
