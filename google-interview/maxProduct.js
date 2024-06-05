
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxProduct = nums => {
  if (nums.length === 1 && nums[0] === 0) return 0;
  const chunks = nums.reduce((chunks, n) => {
    const last = chunks.at(-1);
    if (n === 0) {
      if (last.length > 0) chunks.push([]);
    } else {
      last.push(n);
    }
    return chunks;
  }, [[]]);
  const maxs = chunks.map(arr => {
    if (arr.length === 1 && arr[0] < 0) return arr[0];
    let prod = 1;
    let max = -Infinity;
    for (let i = 0; i < arr.length; ++i) {
      const val = arr[i];
      prod *= val;
      if (prod > max) max = prod;
    }
    if (prod > 0) return max;
    for (let i = 0; i < arr.length; ++i) {
      const val = arr[i];
      prod /= val;
      if (prod > max) max = prod;
      if (val < 0) return max;
    }
  });
  const max = Math.max(...maxs);
  return max < 0 && maxs.length > 1 ? 0 : max;
};

maxProduct([2,3,-2,4]); // 6
maxProduct([-2,0,-1]); // 0
maxProduct([-2,3,-1,4,-3,0,3,4]) // 36
maxProduct([-2]); // -2
maxProduct([0]); // 0
