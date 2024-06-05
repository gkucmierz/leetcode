
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = (coins, amount) => {
  if (amount === 0) return 0;
  const map = new Map();
  for (let i = 0; i <= amount; ++i) {
    let min = Infinity;
    for (const coin of coins) {
      const res = i - coin;
      if (res < 0) continue;
      if (res === 0) {
        min = 1;
        break;
      }
      if (!map.has(res)) continue;
      const cnt = map.get(res) + 1;
      if (cnt < min) min = cnt;
    }
    map.set(i, min);
  }
  const res = map.get(amount);
  return res === Infinity ? -1 : res;
};

coinChange([1,2,5], 11); // 3
coinChange([2], 3); // -1
coinChange([1], 0); // 0
coinChange([411,412,413,414,415,416,417,418,419,420,421,422], 9864);
coinChange([186,419,83,408],6249);
