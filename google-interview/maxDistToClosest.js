
/**
 * @param {number[]} seats
 * @return {number}
 */
const maxDistToClosest = seats => {
  let cnt = 0;
  let max = 0;
  const updateMax = (cnt, edge = false) => {
    const dist = edge ? cnt : Math.ceil(cnt / 2);
    if (dist > max) max = dist;
  };
  for (let i = 0; i < seats.length; ++i) {
    if (seats[i] === 0) {
      ++cnt;
    } else {
      updateMax(cnt, cnt === i);
      cnt = 0;
    }
  }
  updateMax(cnt, true);
  return max;
};

maxDistToClosest([1,0,0,0,1,0,1]); // 2
maxDistToClosest([1,0,0,0]); // 3
maxDistToClosest([0,0,0,1,0,1]); // 2
