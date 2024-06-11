
/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = n => {
  const max = 2 ** (n*2);
  const res = [];
  for (let i = 0; i < max; ++i) {
    const par = [];
    let open = 0;
    for (let j = 0; j < n * 2; ++j) {
      if (i & (1<<j)) {
        open--;
        if (open < 0) break;
        par.push(')');
      } else {
        open++;
        par.push('(');
      }
    }
    if (open === 0 && par.length === n * 2) {
      res.push(par.join(''));
    }
  }
  return res;
};
