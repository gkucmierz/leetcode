
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const splitArray = (nums, k) => {
  let max = 0;
  let sum = 0;
  for (const n of nums) {
    sum += n;
    if (n > max) max = n;
  }
  const splitMax = max => {
    let sum = 0;
    let cnt = 1;
    for (let n of nums) {
      if (sum + n > max) {
        sum = n;
        ++cnt;
      } else {
        sum += n;
      }
    }
    return cnt;
  };
  let a = max;
  let b = sum;
  let last;
  while (a < b) {
    const mid = (a + b) / 2 | 0;
    const val = splitMax(mid);
    if (k >= val) {
      b = mid;
    } else if (val > k) {
      a = mid;
    }
    if (last === mid) return mid + 1;
    last = mid;
  }
  return last ?? a;
};

splitArray([7,2,5,10,8], 2); // 18
splitArray([1,2,3,4,5], 2); // 9
splitArray([1,4,4], 3); // 4
splitArray([0]); // 0
