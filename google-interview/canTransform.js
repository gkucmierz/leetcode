
/**
 * @param {string} start
 * @param {string} end
 * @return {boolean}
 */
const canTransform = (start, end) => {
  let [l, r] = [0, 0];
  for (let i = 0; i < start.length; ++i) {
    const s = start[i];
    const e = end[i];
    if (s === 'R') r++
    if (e === 'L') l++;
    if (r * l > 0) return false;
    if (e === 'R') r--;
    if (s === 'L') l--;
    if (r < 0) return false;
    if (l < 0) return false;
  }
  return r === 0 && l === 0;
};

canTransform("RXXLRXRXL", "XRLXXRRLX");
canTransform("LXXLXRLXXL", "XLLXRXLXLX");
canTransform('RL', 'LR');
canTransform("RLX", "XLR");
