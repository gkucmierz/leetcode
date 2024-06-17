
// binary search array less element
const binarySearchL = (arr, target) => {
  let [a, b] = [0, arr.length];
  let lm;
  while (b - a > 0) {
    const mid = (a + b) / 2 | 0;
    const val = arr[mid];
    if (target <= val) {
      b = mid;
    } else if (val < target) {
      a = mid;
    }
    if (lm === mid) return mid;
    lm = mid;
  }
  return -1;
};

// binary search array greater element
const binarySearchG = (arr, target) => {
  let [a, b] = [0, arr.length];
  let lm;
  while (b - a > 0) {
    const mid = (a + b) / 2 | 0;
    const val = arr[mid];
    if (target >= val) {
      a = mid;
    } else if (val > target) {
      b = mid;
    }
    if (lm === mid) return mid + 1;
    lm = mid;
  }
  return 0;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const searchRange = (nums, target) => {
  const l = binarySearchL(nums, target);
  const g = binarySearchG(nums, target);
  if (nums[l+1] !== target) return [-1,-1];
  if (nums[g-1] !== target) return [-1,-1];
  return [l+1, g-1];
};

searchRange([5,7,7,8,8,10], 8); // [3,4]
searchRange([5,7,7,8,8,10], 6); // [-1,-1]
searchRange([], 0); // [-1,-1]
