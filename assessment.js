
/**
 * @param {string} s
 * @return {string}
 */
const removeOuterParentheses = s => {
  let lvl = 0;
  const res = [];
  for (const p of s) {
    const last = lvl;
    lvl += p === '(' ? 1 : -1;
    if (Math.min(lvl, last) > 0) res.push(p);
  }
  return res.join('');
};

removeOuterParentheses('(()())(())');
removeOuterParentheses('(()())(())(()(()))')
removeOuterParentheses('()()');




//  2: A1
//  3: A1 B1
//  4: A1 B1 A1
//  5: A1 B1 A1 B1
//  6: A3 B1 A1
//  7: A1 B3 A1 B1
//  8: A1 B1 A3 B1 A1
//  9: A3 B3 A1 B1
// 10: A5 B1 A1 B1 A1

/**
 * @param {number} n
 * @return {boolean}
 */
const divisorGame = n => {
  return n % 2 === 0;
};

divisorGame(2);
divisorGame(3);



/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern = s => {
  return /^(.+)(\1+)$/.test(s);
};

repeatedSubstringPattern('abab');
repeatedSubstringPattern('aba');
repeatedSubstringPattern('abcabcabcabc');

