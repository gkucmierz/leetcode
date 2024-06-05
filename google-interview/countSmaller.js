
// https://github.com/gkucmierz/utils/blob/main/src/binary-search.mjs#L41C48-L57C3
const binarySearchGE = (arr, target) => {
  let [a, b] = [0, arr.length];
  let lm;
  while (b - a > 0) {
    const mid = (a + b) / 2 | 0;
    const val = arr[mid];
    if (target > val) {
      a = mid;
    } else if (val >= target) {
      b = mid;
    }
    if (lm === mid) return mid + 1;
    lm = mid;
  }
  return 0;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const countSmaller = nums => {
  const res = [];
  const arr = [];
  while (nums.length) {
    const n = nums.pop();
    const idx = binarySearchGE(arr, n);
    res.push(idx);
    arr.splice(idx, 0, n);
  }
  return res.reverse();
};

countSmaller([5,2,6,1]);
