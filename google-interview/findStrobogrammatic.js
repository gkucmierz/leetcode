
/**
 * @param {number} n
 * @return {string[]}
 */
const findStrobogrammatic = n => {
  const chars = '06189';
  const zero = '0';
  const same = new Set([...'018']);
  const mirr = new Set([...'69']);
  const inv = ch => ch === '6' ? '9' : '6';
  const res = [];
  const loop = (n, prefix = '', suffix = '') => {
    if (n <= 0) return res.push(prefix + suffix);
    if (n === 1) {
      [...same].map(char => loop(n - 1, prefix + char + suffix));
      return;
    }
    [...chars].map(char => {
      if (same.has(char)) {
        if (prefix === '' && char === zero) return;
        loop(n - 2, prefix + char, char + suffix);
      } else if (mirr.has(char)) {
        loop(n - 2, prefix + char, inv(char) + suffix);
      }
    });
  };
  loop(n);
  return res;
};

findStrobogrammatic(2); // ["11","69","88","96"]
findStrobogrammatic(1); // ["0","1","8"]
