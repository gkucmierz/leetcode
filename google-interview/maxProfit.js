
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = prices => {
  const mins = [prices[0]];
  for (let i = 1; i < prices.length; ++i) {
    mins[i] = Math.min(mins[i-1], prices[i]);
  }
  const maxs = [];
  maxs[prices.length-1] = prices.at(-1);
  for (let i = prices.length - 2; i >= 0; --i) {
    maxs[i] = Math.max(maxs[i+1], prices[i]);
  }
  let best = 0;
  for (let i = 1; i < prices.length; ++i) {
    const profit = maxs[i] - mins[i-1];
    if (profit > best) best = profit;
  }
  return best;
};

maxProfit([7,1,5,3,6,4]); // 5
maxProfit([7,6,4,3,1]); // 0
