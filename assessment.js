
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



/**
 * @param {number[]} nums
 * @return {number}
 */
const findPeakElement = nums => {
  const len = nums.length;
  const get = n => n < 0 || n >= len ? -Infinity : nums[n];
  let a = 0;
  let b = len - 1;
  let cnt = 100;
  while (--cnt) {
    const mid = Math.floor((a + b + cnt % 2) / 2);
    if (get(mid) < get(mid+1)) {
      a = mid;
    } else {
      if (get(mid-1) < get(mid)) return mid;
      b = mid;
    }
  }
};

findPeakElement([1,2,3,1]);
findPeakElement([1,2,1,3,5,6,4]);
findPeakElement([0,1,2,3,4]);
findPeakElement([4,3,2,1,0]);
