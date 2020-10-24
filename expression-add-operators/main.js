
/**
 * @param {string} num
 * @param {number} target
 * @return {string[]}
 */
const addOperators = (num, target) => {
  const digits = [...num].map(n => +n);
  const ops = [...'+-*'];
  const res = [];
  const opsMap = {
    '*': (a, b) => a * b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
  };

  const calcOp = (arr, ops) => {
    const len = arr.length;
    for (let i = 1; i < len; i += 2) {
      const op = arr[i];
      if (ops.includes(op)) {
        const val = opsMap[op](arr[i-1], arr[i+1]);
        arr.splice(i - 1, 3, val);
        i -= 2;
      }
    }
  };

  const addRes = candidate => {
    const joined = candidate.join('');
    calcOp(candidate, ['*']);
    calcOp(candidate, ['+', '-']);
    if (candidate[0] === target) res.push(joined);
  };

  const loop = (d, res) => {
    const next = d.shift();
    if (typeof next === 'undefined') return addRes(res);
    ops.map(op => loop(d.slice(), [...res, op, next]));
    const resClone = res.slice();
    const lastNum = resClone.pop();
    if (lastNum === 0) return;
    resClone.push(+[lastNum, next].join(''));
    loop(d.slice(), resClone);
  };

  loop(digits.slice(1), [digits[0]]);

  return res;
};
