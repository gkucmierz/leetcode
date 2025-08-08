
/**
 * @param {number} n
 * @return {number[][]}
 */
const generateMatrix = n => {
  const Y = 0;
  const X = 1;
  const m = [];
  for (let i = 0; i < n; ++i) {
    m[i] = [];
    for (let j = 0; j < n; ++j) {
      m[i][j] = 0;
    }
  }
  let y = 0;
  let x = 0;
  const dirs = [
    [ 0, 1],
    [ 1, 0],
    [ 0,-1],
    [-1, 0],
  ];
  let dirCnt = 0;
  let dir = dirs[dirCnt];
  let cnt = 1;
  let steps = n * n + 4 * n;
  while (steps--) {
    m[y][x] = cnt++;
    y += dir[Y];
    x += dir[X]
    if (m[y]?.[x] !== 0) {
      y -= dir[Y];
      x -= dir[X];
      --cnt;
      dir = dirs[++dirCnt%dirs.length];
      continue;
    }
    if (y >= n || y < 0) {
      y -= dir[Y];
      --cnt;
      dir = dirs[++dirCnt%dirs.length];
    }
    if (x >= n || x < 0) {
      x -= dir[X];
      --cnt;
      dir = dirs[++dirCnt%dirs.length];
    }
  }
  // return m.map(arr => arr.join(' '));
  return m;
};

generateMatrix(6);
