
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = nums => {
  let sum = 0;
  let max = -Infinity;
  for (const n of nums) {
    sum += n;
    if (sum > max) max = sum;
    if (sum < 0) sum = 0;
  }
  return max;
};

maxSubArray([-2,1,-3,4,-1,2,1,-5,4]); // 6
maxSubArray([1]); // 1
maxSubArray([5,4,-1,7,8]); // 23
maxSubArray([-1]);
