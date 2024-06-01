

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number[][]}
 */
const findMissingRanges = (nums, lower, upper) => {
  const ranges = [[lower, upper]];
  let p = 0;
  const dropRange = p => {
    if (ranges[p][0] > ranges[p][1]) {
      ranges.splice(p, 1);
      return 1;
    }
    return 0;
  };
  nums.map(n => {
    const b = n === ranges[p][0];
    const e = n === ranges[p][1];
    const i = n > ranges[p][0] && n < ranges[p][1];
    if (b) {
      ranges[p][0] = n + 1;
      p -= dropRange(p);
    } else if(e) {
      ranges[p][1] = n - 1;
      p -= dropRange(p);
    } else if (i) {
      const end = ranges[p][1];
      ranges[p][1] = n - 1;
      p -= dropRange(p);
      ranges[++p] = [n + 1, end];
      p -= dropRange(p);
    }
  });
  return ranges;
};

findMissingRanges([], 0, 1);
findMissingRanges([], 0, 6);
findMissingRanges([0,1,3,50,75], 0, 99);
findMissingRanges([], 1, 1);
findMissingRanges([-1], -2, -1); // [[-2, -2]]
findMissingRanges([-1], -1, 0); // [[0, 0]]

