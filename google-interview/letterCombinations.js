
/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = digits => {
  if (digits === '') return [];
  const map = [
    '',
    '', 'abc', 'def',
    'ghi', 'jkl', 'mno',
    'pqrs', 'tuv', 'wxyz'
  ];
  const res = [];
  const loop = (n, begin = '') => {
    if (n >= digits.length) return res.push(begin);
    [...map[digits[n]]].map(c => loop(n + 1, begin + c));
  };
  loop(0);
  return res;
};
