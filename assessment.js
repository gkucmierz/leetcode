
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
