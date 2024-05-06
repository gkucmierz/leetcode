
/**
 * @param {string} s
 * @return {string}
 */
const removeOuterParentheses = s => {
  let lvl = 0;
  const res = [];
  for (const p of s) {
    const last = lvl;
    lvl += p === '(' ? 1 : -1;
    if (Math.min(lvl, last) > 0) res.push(p);
  }
  return res.join('');
};

removeOuterParentheses('(()())(())');
removeOuterParentheses('(()())(())(()(()))')
removeOuterParentheses('()()');




//  2: A1
//  3: A1 B1
//  4: A1 B1 A1
//  5: A1 B1 A1 B1
//  6: A3 B1 A1
//  7: A1 B3 A1 B1
//  8: A1 B1 A3 B1 A1
//  9: A3 B3 A1 B1
// 10: A5 B1 A1 B1 A1

/**
 * @param {number} n
 * @return {boolean}
 */
const divisorGame = n => {
  return n % 2 === 0;
};

divisorGame(2);
divisorGame(3);



/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern = s => {
  return /^(.+)(\1+)$/.test(s);
};

repeatedSubstringPattern('abab');
repeatedSubstringPattern('aba');
repeatedSubstringPattern('abcabcabcabc');



/**
 * @param {number[]} nums
 * @return {number}
 */
const findPeakElement = nums => {
  const len = nums.length;
  const get = n => n < 0 || n >= len ? -Infinity : nums[n];
  let a = 0;
  let b = len - 1;
  let cnt = 100;
  while (--cnt) {
    const mid = Math.floor((a + b + cnt % 2) / 2);
    if (get(mid) < get(mid+1)) {
      a = mid;
    } else {
      if (get(mid-1) < get(mid)) return mid;
      b = mid;
    }
  }
};

findPeakElement([1,2,3,1]);
findPeakElement([1,2,1,3,5,6,4]);
findPeakElement([0,1,2,3,4]);
findPeakElement([4,3,2,1,0]);



/**
 * @param {number[]} bulbs
 * @param {number} k
 * @return {number}
 */
const kEmptySlots = (bulbs, k) => {
  const len = bulbs.length;
  const arr = new Uint8Array(len);
  for (let day = 0; day < len; ++day) {
    const bi = bulbs[day] - 1;
    arr[bi] = 1;
    
    const li = bi - k - 1;
    if (li >= 0 && arr[li] === 1) {
      let left = true;
      for (let idx = li + 1; idx < bi; ++idx) {
        if (arr[idx] === 0) continue;
        left = false;
        break;
      }
      if (left) return day + 1;
    }
    
    const ri = bi + k + 1;
    if (ri < len && arr[ri] === 1) {
      let right = true;
      for (let idx = ri - 1; idx > bi; --idx) {
        if (arr[idx] === 0) continue;
        right = false;
        break;
      }
      if (right) return day + 1;
    }
  }
  return -1;
};

kEmptySlots([1,3,2], 1);
kEmptySlots([1,2,3], 1);
kEmptySlots([3,9,2,8,1,6,10,5,4,7], 1);



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




/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const networkDelayTime = (times, n, k) => {
  const map = new Map();
  times.map(([s, t, w]) => {
    const node = map.get(s) || new Map();
    map.set(s, node);
    node.set(t, w);
  });
  const res = new Map();
  res.set(k, 0);
  const checkList = [[k, 0]];
  while (checkList.length) {
    const [node, sum] = checkList.pop();
    [...(map.get(node) || [])].map(([target, weight]) => {
      const dist = sum + weight;
      const val = res.get(target);
      if (typeof val === 'undefined' || val > dist) {
        res.set(target, dist);
        checkList.push([target, dist]);
      }
    });
  }
  const resArr = [...res];
  if (resArr.length < n) return -1;
  return Math.max(...resArr.map(([t, w]) => w), -1);
};

// networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2);
// networkDelayTime([[1,2,1]], 2, 1), 1;
networkDelayTime([[1,2,1]], 2, 2), -1;
// networkDelayTime([[1,2,1],[2,1,3]], 2, 2);
// networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2);
// networkDelayTime([[1,2,1],[2,3,2],[1,3,4]], 3, 1);
// networkDelayTime([[1,2,1],[2,3,2],[1,3,1]], 3, 2);
