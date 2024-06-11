
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const numberOfPatterns = (min, max) => {
  const OVER_KEY = 10;
  const conv = (a, b) => a + b * OVER_KEY;
  const lines = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  const forbid = new Map();
  lines.map(([a, mid, b]) => {
    forbid.set(conv(a, b), mid);
    forbid.set(conv(b, a), mid);
  });
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const loop = (left, len, last = OVER_KEY ** 2) => {
    if (len > max) {
      return 0;
    }
    let cnt = len >= min ? 1 : 0;
    for (const n of [...left]) {
      const mid = forbid.get(conv(last, n)) ?? OVER_KEY;
      if (left.has(mid)) continue;
      left.delete(n);
      cnt += loop(left, len + 1, n);
      left.add(n);
    }
    return cnt;
  };
  return loop(new Set(keys), 0);
};

numberOfPatterns(1, 1); // 9
numberOfPatterns(1, 2); // 65
numberOfPatterns(4, 9); // 389112
