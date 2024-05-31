/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = arr => {
  let [p0, p1] = [0, arr.length - 1];
  const area = (p0, p1) => {
    return (p1 - p0) * Math.min(arr[p0], arr[p1]);
  };
  let best = area(p0, p1);
  while (p0 < p1) {
    if (arr[p0] < arr[p1]) {
      p0++;
    } else {
      p1--;
    }
    const max = area(p0, p1);
    if (max > best) best = max;
  }
  return best;
};

maxArea([1,8,6,2,5,4,8,3,7]); // 49
maxArea([1,1]); // 1
maxArea([1,3,2,5,25,24,5]); // 24
