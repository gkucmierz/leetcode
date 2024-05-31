

// https://github.com/gkucmierz/algorithms/blob/main/js/big_int.js
const BigInt = function BigInt(n = '0') {
  const str = (n.join && n.join`` || n + '').replace(/^0+/, '') || '0';
  const sign = str[0] === '-' && +n !== 0;
  const arr = [...str.replace(/^\-/, '')].map(n => +n);

  const calcDbl = bi => {
    return [1, 2, 3].reduce(([dbl, acc]) => {
      acc = acc.add(acc);
      return [[...dbl, acc], acc];
    }, [[bi], bi])[0];
  };

  const add = n => {
    const bi = BigInt(n);
    const [arr1, arr2] = [arr, bi._arr()];
    const [len1, len2] = [arr.length, bi._arr().length];
    const [sgn1, sgn2] = [sign ? -1 : 1, bi._sign() ? -1 : 1];
    const max = Math.max(len1, len2);
    const res = [];
    let carr = 0;
    for (let i = 1; i <= max; ++i) {
      res[max-i] = sgn1 * (arr1[len1 - i] || 0) + sgn2 * (arr2[len2 - i] || 0) + carr;
      if (10 <= res[max-i]) {
        res[max-i] -= 10;
        carr = 1;
      } else if(res[max-i] < 0) {
        res[max-i] += 10;
        carr = -1;
      } else {
        carr = 0;
      }
    }
    if (carr === 1) res.unshift(1);
    const resStr = res.join``.replace(/^0+/, '') || '0';
    if (carr === -1) return BigInt('-' + BigInt('1'+'0'.repeat(res.length)).sub(resStr));
    return BigInt(resStr);
  };
  const sub = n => {
    return add(('-'+BigInt(n).toString()).replace(/^\-\-/, ''));
  };
  const mul = n => {
    const bi = BigInt(n);
    const [arr1, arr2] = [arr, bi._arr()];
    const [len1, len2] = [arr.length, bi._arr().length];
    const [sgn1, sgn2] = [sign ? -1 : 1, bi._sign() ? -1 : 1];
    const dbl = calcDbl(BigInt(arr1));
    const mul = arr2.reduceRight((acc, n, i, arr) => {
      const sum = [...n.toString(2)].reduce((sum, bit, i, arr) => {
        return bit === '1' ? sum.add(dbl[arr.length-i-1]) : sum;
      }, BigInt(0));
      return acc.add(sum+'0'.repeat(arr.length-i-1));
    }, BigInt(0));
    return BigInt((sgn1*sgn2 === -1 ? '-' : '') + mul);
  };
  const div = n => {
    const bi = BigInt(n);
    const [arr1, arr2] = [arr, bi._arr()];
    const [len1, len2] = [arr.length, bi._arr().length];
    const [sgn1, sgn2] = [sign ? -1 : 1, bi._sign() ? -1 : 1];
    const res = arr1.reduce(([dnd, res], n) => {
      dnd.push(n);
      if (dnd.length < len2) return [dnd, res];
      let tmp = BigInt(dnd);
      let cnt = 0;
      do {
        ++cnt;
        tmp = tmp.sub(arr2);
      } while (!tmp._sign());
      cnt -= 1;
      tmp = tmp.add(arr2);
      // if (cnt) res.push(cnt);
      return [tmp._arr(), res];
    }, [[], []])[1];
    return BigInt((sgn1*sgn2 === -1 ? '-' : '') + (res.join`` || '0'));
  };
  const isZero = arr.length === 1 && arr[0] === 0;
  const isPositive = !sign;
  const isNegative = sign;
  const _sign = () => sign;
  const _arr = () => arr;
  const toString = () => (sign ? '-' : '') + arr.join``;
  const valueOf = toString;
  return {
    add, sub, mul, div,
    isZero, isPositive, isNegative,
    toString, valueOf,
    _sign, _arr
  };
};

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const multiply = (num1, num2) => {
  return BigInt(num1).mul(num2).toString();
};

multiply('123', '456');
