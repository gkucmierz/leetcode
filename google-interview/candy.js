
/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy = ratings => {
  const candies = [];
  const map = new Map();
  for (let i = 0; i < ratings.length; ++i) {
    candies[i] = 1;
    if (i === 0) continue;
    if (ratings[i] > ratings[i-1]) {
      candies[i] = candies[i-1] + 1;
    }
  }
  for (let i = ratings.length - 2; i >= 0; --i) {
    if (ratings[i] > ratings[i+1]) {
      candies[i] = Math.max(candies[i+1] + 1, candies[i]);
    }
  }
  return candies.reduce((a, b) => a + b, 0);
};
