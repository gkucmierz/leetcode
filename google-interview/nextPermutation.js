/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const nextPermutation = nums => {
  let i = nums.length - 2;
  for (; i >= 0; --i) {
    const curr = nums[i];
    const next = nums[i+1];
    if (curr >= next) continue;
    let min = next;
    let minIdx = i + 1
    let j = i + 1;
    for (;j < nums.length; ++j) {
      const val = nums[j];
      if (val <= curr) continue;
      if (val < min) {
        min = val;
        minIdx = j;
      }
    }
    // swap
    nums[i] = min;
    nums[minIdx] = curr;
    break;
  }
  const sort = nums.slice(i + 1).sort((a, b) => a - b);
  for (let j = 0; j < sort.length; ++j) {
    nums[i + 1 + j] = sort[j];
  }
  return nums
};

// nextPermutation([1, 1]); // 1 1
// nextPermutation([1,5,1]); // 5 1 1
nextPermutation([5,1,1]); // 1 1 5
// nextPermutation([1,2,3]);
// nextPermutation([3,2,1]); // 1 2 3
// nextPermutation([2,3,1]); // 3 1 2
// nextPermutation([1,3,2]); // 2 1 3


// nextPermutation([1, 2, 3, 4]);
// nextPermutation([1, 2, 4, 3]);
// nextPermutation([1, 3, 2, 4]);
// nextPermutation([1, 3, 4, 2]);
// nextPermutation([1, 4, 2, 3]);
// nextPermutation([1, 4, 3, 2]);
// nextPermutation([2, 1, 3, 4]);
// ...
// nextPermutation([4, 3, 2, 1]);
