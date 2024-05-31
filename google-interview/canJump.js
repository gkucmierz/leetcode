/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = nums => {
  let far = nums[0];
  for (let i = 0; i <= far; ++i) {
    if (i >= nums.length) return true;
    const max = nums[i] + i;
    if (max > far) far = max;
  }
  return far + 1 >= nums.length;
};

canJump([2,3,1,1,4]);
canJump([3,2,1,0,4]);
