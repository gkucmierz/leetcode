// binary search array less or equal element
const binarySearchLE = (arr, target) => {
  let [a, b] = [0, arr.length];
  let lm;
  while (b - a > 0) {
    const mid = (a + b) / 2 | 0;
    const val = arr[mid];
    if (target < val) {
      b = mid;
    } else if (val <= target) {
      a = mid;
    }
    if (lm === mid) return mid;
    lm = mid;
  }
  return -1;
};

// binary search array greater or equal element
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
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
const insert = (intervals, newInterval) => {
  if (intervals.length === 0) return [newInterval.slice()];
  const getArr = idx => new Proxy([], {
    get(target, prop) {
      if (prop === 'length') return intervals.length;
      return intervals[+prop][idx];
    }
  });
  intervals.splice(0, 0, [-Infinity, -Infinity]);
  intervals.splice(intervals.length, 0, [Infinity, Infinity]);
  const left = binarySearchGE(getArr(1), newInterval[0]);
  const right = binarySearchLE(getArr(0), newInterval[1]);
  const begin = Math.min(newInterval[0], intervals[left][0]);
  const end = Math.max(newInterval[1], intervals[right][1]);
  intervals.splice(left, right - left + 1, [begin, end]);
  intervals.pop();
  intervals.shift();
  return intervals;
};
