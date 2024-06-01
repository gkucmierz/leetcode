const Heap = (valFn = n => n) => {
  const arr = [-1];
  const up = idx => {
    while (idx > 1) {
      const ni = idx / 2 | 0;
      if (valFn(arr[idx]) < valFn(arr[ni])) {
        [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
      }
      idx = ni;
    }
    return idx;
  };
  return {
    add: el => up(arr.push(el) - 1),
    take: () => {
      const len = arr.length;
      if (len <= 1) return [][0];
      let idx = 1;
      const res = arr[idx];
      while (idx < len) {
        const ia = idx * 2;
        const ib = idx * 2 + 1;
        if (ia >= len) break;
        if (ib >= len || valFn(arr[ia]) < valFn(arr[ib])) {
          arr[idx] = arr[ia];
          idx = ia;
        } else {
          arr[idx] = arr[ib];
          idx = ib;
        }
      }
      if (idx === arr.length - 1) {
        arr.pop();
      } else {
        arr[idx] = arr.pop();
        up(idx);
      }
      return res;
    },
    size: () => arr.length - 1,
    data: () => arr.slice(1),
  };
};

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
const kClosest = (points, k) => {
  const heap = Heap(obj => obj.dist);
  points.map(coord => {
    const dist = coord[0] ** 2 + coord[1] ** 2;
    heap.add({ dist, coord });
  });
  const res = [];
  for (let i = 0; i < k; ++i) {
    res.push(heap.take().coord);
  }
  return res;
};

kClosest([[1,3],[-2,2]], 1); // [[-2,2]]
kClosest([[3,3],[5,-1],[-2,4]], 2); // [[3,3],[-2,4]]
