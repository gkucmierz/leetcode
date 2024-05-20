
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




/**
 * @param {string} s
 * @return {boolean}
 */
const checkRecord = s => {
  const absence = (s.match(/A/g) || []).length < 2;
  const notLate = (s.match(/LLL/) || []).length === 0;
  return absence && notLate;
};

checkRecord('PPALLP');
checkRecord('PPALLL');




/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
const reverseString = s => {
  const last = s.length - 1;
  const mid = s.length / 2 | 0;
  for (let i = 0; i < mid; ++i) {
    [s[i], s[last-i]] = [s[last-i], s[i]];
  }
  return s;
};

reverseString(["h","e","l","l","o"]);




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





/**
 * @param {number} n
 * @return {number}
 */
const rotatedDigits = (() => {
  const isGood = n => {
    const map = {
      2: 5,
      5: 2,
      6: 9,
      9: 6,
    };
    const str = n + '';
    if (str.match(/[347]/g)) return false;
    const rep = +str.replace(/[2569]/g, d => map[d]);
    return rep !== n;
  };
  return n => {
    let cnt = 0;
    for (let i = 1; i <= n; ++i) {
      if (isGood(i)) {
        ++cnt;
      }
    }
    return cnt;
  };
})();

rotatedDigits(10); // 4





const numSubmat = mat => {
  let sub = 0;
  let sum = 0;
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      mat[i][j] += mat[i][j] ? (mat[i][j - 1] || 0) : 0;
    }
  }
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      let len = Infinity;
      for (let k = i; len > 0 && k >= 0; k--) {
        len = Math.min(len, mat[k][j]);
        sum += len;
      }
    }
  }
  return sum;
};

numSubmat([[1,0,1],[1,1,0],[1,1,0]]); // 13
numSubmat([[0,1,1,0],[0,1,1,1],[1,1,1,0]]) // 24




/**
 * @param {number[][]} matrix
 * @return {number}
 */
const countSquares = matrix => {
  const sums = [];
  const takeSums = (y, x) => {
    if (x < 0) return 0;
    if (y < 0) return 0;
    return sums[y][x];
  };
  const h = matrix.length;
  const w = matrix[0].length;
  for (let y = 0; y < h; ++y) {
    sums[y] = [];
    for (let x = 0; x < w; ++x) {
      const up = y === 0 ? 0 : sums[y-1][x];
      const left = x === 0 ? 0 : sums[y][x-1];
      const upleft = (x === 0 || y === 0) ? 0 : sums[y-1][x-1];
      sums[y][x] = matrix[y][x] + up + left - upleft;
    }
  }
  const maxSize = Math.min(h, w);
  let cnt = 0;
  for (let size = 1; size <= maxSize; ++size) {
    const expected = size ** 2;
    for (let y = 0; y <= h - size; ++y) {
      for (let x = 0; x <= w - size; ++x) {
        const br = takeSums(y + size - 1, x + size - 1);
        const tl = takeSums(y - 1, x - 1);
        const tr = takeSums(y - 1, x + size - 1);
        const bl = takeSums(y + size - 1, x - 1);
        const sum = br + tl - tr - bl;
        if (sum === expected) cnt++;
      }
    }
  }
  return cnt;
};

countSquares([
  [0,1,1,1],
  [1,1,1,1],
  [0,1,1,1]
]); // 15
countSquares([
  [1,0,1],
  [1,1,0],
  [1,1,0]
]); // 7





// iterative solution:
function gcd(a, b) {
  if (a < 0) a = -a;
  if (b < 0) b = -b;
  if (b > a) {
    [a, b] = [b, a];
  }
  while (1) {
    if (b == 0) return a;
    a %= b;
    if (a == 0) return b;
    b %= a;
  }
}
/**
 * @param {number[]} deck
 * @return {boolean}
 */
const hasGroupsSizeX = deck => {
  const map = new Map();
  deck.map(val => {
    const cnt = map.get(val) ?? 0;
    map.set(val, cnt + 1);
  });
  const arr = [...map];
  const quant = arr.map(([_, q]) => q);
  const div = quant.reduce(gcd);
  return div > 1;
};

hasGroupsSizeX([1,2,3,4,4,3,2,1]);
hasGroupsSizeX([1,1,1,2,2,2,3,3]);
hasGroupsSizeX([0,0,0,1,1,1,2,2,2]);
hasGroupsSizeX([1]);
hasGroupsSizeX([1,1,1,1,2,2,2,2,2,2]);




/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return       -1 if num is higher than the picked number
 *            1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
const guessNumber = n => {  
  let min = 1;
  let max = 2 ** 31 - 1;
  let mid;
  while (1) {
    mid = Math.floor((min + max) / 2);
    const res = guess(mid);
    if (res < 0) {
      max = mid - 1;
    } else if (res > 0) {
      min = mid + 1;
    } else {
      return mid;
    }
  }
};





/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val === undefined ? 0 : val;
 *    this.children = children === undefined ? [] : children;
 * };
 */

/**
 * @param {Node[]} tree
 * @return {Node}
 */
const findRoot = nodes => {
  const refs = new Map();
  nodes.map(node => {
    node.children.map(child => {
      const cnt = refs.get(child) ?? 0;
      refs.set(child, cnt + 1);
    });
  });
  return nodes.filter(node => !refs.has(node))[0];
};




/**
 * @param {number[][]} accounts
 * @return {number}
 */
const maximumWealth = accounts => {
  return accounts.reduce((max, acc) => {
    const sum = acc.reduce((a, b) => a + b, 0);
    return sum > max ? sum : max;
  }, 0);
};

maximumWealth([[1,2,3],[3,2,1]]);
maximumWealth([[1,5],[7,3],[3,5]]);
maximumWealth([[2,8,7],[7,1,3],[1,9,5]]);





/**
 * @param {number} maxNumbers
 */
var PhoneDirectory = function(maxNumbers) {
  this._empty = new Map();
  for (let i = 0; i < maxNumbers; ++i) {
    this._empty.set(i, true);
  }
};
/**
 * @return {number}
 */
PhoneDirectory.prototype.get = function() {
  const arr = [...this._empty];
  if (arr.length === 0) return -1;
  const first = arr[0][0];
  this._empty.delete(first);
  return first;
};
/** 
 * @param {number} number
 * @return {boolean}
 */
PhoneDirectory.prototype.check = function(number) {
  return this._empty.has(number);
};
/** 
 * @param {number} number
 * @return {void}
 */
PhoneDirectory.prototype.release = function(number) {
  this._empty.set(number, true);
};
/** 
 * Your PhoneDirectory object will be instantiated and called as such:
 * var obj = new PhoneDirectory(maxNumbers)
 * var param_1 = obj.get()
 * var param_2 = obj.check(number)
 * obj.release(number)
 */
