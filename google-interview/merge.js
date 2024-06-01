/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = intervals => {
  if (intervals.length === 0) return [];
  const sort = intervals.sort((a, b) => a[0] - b[0]);
  const merged = [sort.shift()];
  while (sort.length) {
    const int = sort.shift();
    const lm = merged.at(-1);
    if (lm[1] >= int[0]) {
      lm[1] = Math.max(lm[1], int[1]);
    } else {
      merged.push(int);
    }
  }
  return merged;
};

merge([[1,3],[2,6],[8,10],[15,18]]); // [[1,6],[8,10],[15,18]]
merge([[1,4],[4,5]]); // [[1,5]]
merge([[1,4],[2,3]]); // [[1,4]]
