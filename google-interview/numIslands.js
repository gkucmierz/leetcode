
/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = grid => {
  const h = grid.length;
  const w = grid[0].length;
  const fill = (i, y, x) => {
    if (x < 0 || x >= w) return false;
    if (y < 0 || y >= h) return false;
    if (grid[y][x] !== '1') return false;
    grid[y][x] = i;
    [
      [ 0, 1],
      [ 0,-1],
      [ 1, 0],
      [-1, 0]
    ].map(([yd, xd]) => {
      fill(i, y + yd, x + xd);
    });
    return true;
  };
  let i = 0;
  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      if (fill(i, y, x)) ++i;
    }
  }
  return i;
};

numIslands([
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]); // 1

numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]); // 3
