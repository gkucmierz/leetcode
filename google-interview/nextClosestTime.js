/**
 * @param {string} time
 * @return {string}
 */
const nextClosestTime = time => {
  const MAX = 24 * 60;
  const toScalar = str => {
    const [h, s] = str.split(':').map(n => +n);
    return h * 60 + s;
  };
  const target = toScalar(time);
  const digits = [...new Set([...time.replace(':', '')])];
  const size = digits.length;
  const len = size ** 4;
  let best = Infinity;
  let res;
  for (let i = 0 ; i < len; ++i) {
    let n = i;
    const candidate = [];
    for (let j = 0; j < 4; ++j) {
      const mod = n % size;
      candidate.push(digits[mod]);
      n = (n - mod) / size;
    }
    const h = candidate[0] + candidate[1];
    const s = candidate[2] + candidate[3];
    if (+h > 23) continue;
    if (+s > 59) continue;
    const timeStr = `${h}:${s}`;
    const scalar = toScalar(timeStr);
    let diff = scalar - target;
    if (diff <= 0) diff += MAX;
    if (diff < best) {
      best = diff;
      res = timeStr;
    }
  }
  return res;
};

nextClosestTime('19:34');
nextClosestTime('23:59');
nextClosestTime('00:00');
