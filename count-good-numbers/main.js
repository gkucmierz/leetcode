
const count = n => {
  const start = n === 1 ? 0 : 10 ** (n-1);
  const end = 10 ** n;
  const sets = [
    new Set([0,2,4,6,8]),
    new Set([2,3,5,7]),
  ];
  let cnt = 0;
  for (let i = start; i < end; ++i) {
    const is = [...i+''].every((d, di) => {
      return sets[di%2].has(+d);
    });
    if (is) cnt++;
  }
  return cnt;
};

const count2 = n => {
  n = BigInt(n);
  const mod = 10n ** 9n + 7n;
  if (n === 1n) return 5n;
  return (5n ** (n/2n) * 4n ** ((n+1n)/2n)) % mod;
};

const getPowMod = (ZERO, ONE, TWO, floor) => {
  return (base, exponent, modulus = null) => {
    if (modulus === null) return base ** exponent;
    if (modulus === ONE) return ZERO;
    let result = ONE;
    base = base % modulus;
    while (exponent > ZERO) {
      if (exponent % TWO === ONE) {
        result = (result * base) % modulus;
      }
      exponent = floor(exponent / TWO);
      base = (base * base) % modulus;
    }
    return result;
  };
};

const powMod = getPowMod(0, 1, 2, n => Math.floor(n));
const powModBI = getPowMod(0n, 1n, 2n, n => n);

const countGoodNumbers = n => {
  n = BigInt(n);
  const fives = (n+1n)/2n;
  const fours = (n) / 2n;
  const mod = 10n ** 9n + 7n;
  return Number((powModBI(5n, fives, mod) * powModBI(4n, fours, mod)) % mod);
};

for (let i = 1; i < 10; ++i) {
  console.log(i, count(i), countGoodNumbers(i));
}

countGoodNumbers(50);
countGoodNumbers(1);
