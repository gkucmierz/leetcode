
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





// not optimal O(n log n); can be O(n)
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const wiggleSort = nums => {
  const sort = nums.sort((a, b) => a - b);
  let first = true;
  const res = [];
  while (sort.length) {
    const num = first ? nums.shift() : nums.pop();
    res.push(num);
    first = !first;
  }
  res.map(num => nums.push(num));
  return nums;
};

wiggleSort([3,5,2,1,6,4]);
wiggleSort([3,5,2,1,6,4]);
wiggleSort([6,6,5,6,3,8]);






/**
 * @param {string} num
 * @return {boolean}
 */
const isStrobogrammatic = num => {
  const map = {
    6: '9',
    9: '6',
    8: '8',
    0: '0',
    1: '1',
  };
  const rev = [...num].map(digit => {
    return (digit in map) ? map[digit] : '-';
  }).reverse().join('');
  return num === rev;
};

isStrobogrammatic('69');
isStrobogrammatic('88');
isStrobogrammatic('962');

  



/**
 * @param {number} length
 */
const SnapshotArray = function(length) {
  this._idxs = [];
  this._args = [];
  this._idx = 0;
  this._snap2indx = new Map();
  this._snapIdx = 0;
};
/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function(index, val) {
  this._idxs[this._idx] = index;
  this._args[this._idx] = val;
  this._idx++;
};
/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function() {
  this._snap2indx.set(this._snapIdx, this._idx);
  return this._snapIdx++;
};
/** 
 * @param {number} index 
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function(index, snap_id) {
  const lastIdx = this._snap2indx.get(snap_id) - 1;
  const idx = this._idxs.lastIndexOf(index, lastIdx);
  if (lastIdx < 0) return 0;
  return idx === -1 ? 0 : this._args[idx];
};

// const sa = new SnapshotArray(3);
// sa.set(0, 5);
// sa.snap();
// sa.set(0, 6);
// sa.get(0, 0);

// ["SnapshotArray","snap","get","get","set","get","set","get","set"]
// [[2],[],[1,0],[0,0],[1,8],[1,0],[0,20],[0,0],[0,7]]
const sa = new SnapshotArray(2);
sa.snap();
sa.get(1, 0);
sa.get(0, 0);
sa.set(1, 8);
sa.get(1, 0);





/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
const solution = isBadVersion => {
  // https://github.com/gkucmierz/algorithms/blob/main/js/natural_search.js
  const naturalSearch = (cond, retFirstTrue = true) => {
    let min = 1;
    let max = 1;
    while(1) {
      const stop = cond(max);
      if (stop) break;
      min = max;
      max *= 2;
    }
    let mid;
    while (1) {
      mid = Math.floor((min + max) / 2);
      const stop = cond(mid);
      if (stop) {
        max = mid;
      } else {
        min = mid;
      }
      const diff = max - min;
      if (max - min <= 1) {
        return retFirstTrue ? max : min;
      }
    }
  };
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
    return naturalSearch(isBadVersion);
  };
};

solution(n => n >= 4)(5); // 4
solution(n => n >= 1)(1); // 1
solution(n => n >= 4)(4); // 1
solution(n => n >= 2126753390)(1702766719); // 1




/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
const matrixBlockSum = (mat, k) => {
  const h = mat.length;
  const w = mat[0].length;
  const addSums = [];
  const takeSum = (y, x) => {
    if (y < 0 || x < 0) return 0;
    if (y + 1 >= h) y = h - 1;
    if (x + 1 >= w) x = w - 1;
    return addSums[y][x];
  };
  for (let y = 0; y < h; ++y) {
    addSums[y] = [];
    for (let x = 0; x < w; ++x) {
      const top = y === 0 ? 0 : addSums[y-1][x];
      const left = x === 0 ? 0 : addSums[y][x-1];
      const topleft = (x === 0 || y === 0) ? 0 : addSums[y-1][x-1];
      addSums[y][x] = top + left - topleft + mat[y][x];
    }
  }
  const res = [];
  for (let y = 0; y < h; ++y) {
    res[y] = [];
    for (let x = 0; x < w; ++x) {
      res[y][x] = [
        takeSum(y + k, x + k),
        takeSum(y - k - 1, x - k - 1),
        -takeSum(y + k, x - k - 1),
        -takeSum(y - k - 1, x + k),
      ].reduce((a, b) => a + b);
    }
  }
  return res;
};

matrixBlockSum([[1,2,3],[4,5,6],[7,8,9]], 1);
matrixBlockSum([[1,2,3],[4,5,6],[7,8,9]], 2);
matrixBlockSum([[67,64,78],[99,98,38],[82,46,46],[6,52,55],[55,99,45]], 3);





/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
const addToArrayForm = (num, k) => {
  let carry = 0;
  const rev = num.reverse();
  let i = 0;
  while (k || i < num.length) {
    const mod = k % 10;
    let n = (num[i] ?? 0) + mod + carry;
    if (n >= 10) {
      n -= 10;
      carry = 1;
    } else {
      carry = 0;
    }
    num[i++] = n;
    k = (k - mod) / 10;
  }
  if (carry) rev.push(1);
  return rev.reverse();
};

addToArrayForm([2,1,5], 806);
addToArrayForm([9,9,9,9,9,9,9,9,9,9], 1);





/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} from
 * @param {number} to
 * @return {TreeNode}
 */
const correctBinaryTree = root => {
  const map = new Map();
  const checkLvls = (node, lvl = 0) => {
    if (!node) return;
    map.set(node, lvl++);
    checkLvls(node.left, lvl);
    checkLvls(node.right, lvl);
  };
  checkLvls(root);
  const fix = (node, lvl = 0) => {
    if (!node) return true;
    if (!fix(node.left, lvl + 1)) {
      node.left = null;
    }
    if (map.get(node.right) === lvl) {
      return false;
    } else {
      if (!fix(node.right, lvl + 1)) {
        node.right = null;
      }
    }
    return true;
  };
  fix(root);
  return root;
};






/**
 * @param {string} s
 * @return {number[]}
 */
const diStringMatch = s => {
  const arr = new Array(s.length + 1).fill(0).map((_, i) => i);
  const dcnt = [...s].filter(ch => ch === 'D').length;
  const res = [];
  let p = dcnt;
  res.push(arr.splice(p, 1)[0]);
  for (const ch of s) {
    if (ch === 'D') --p;
    res.push(arr.splice(p, 1)[0]);
  }
  return res;
};

diStringMatch('IDID');
diStringMatch('III');
diStringMatch('DDI');




/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */
const minDominoRotations = (tops, bottoms) => {
  const size = tops.length;
  const map = new Map();
  const inc = val => {
    const cnt = map.get(val) ?? 0;
    map.set(val, cnt + 1);
  };
  for (let i = 0; i < size; ++i) {
    const [t, b] = [tops[i], bottoms[i]];
    if (t !== b) inc(b);
    inc(t);
  }
  const first = [...map].sort((a, b) => b[1] - a[1])[0];
  if (first[1] < size) return -1;
  const val = first[0];
  let [tcnt, bcnt] = [0, 0];
  for (let i = 0; i < size; ++i) {
    const [t, b] = [tops[i], bottoms[i]];
    if (t === val) ++tcnt;
    if (b === val) ++bcnt;
  }
  return size - Math.max(tcnt, bcnt);
};

minDominoRotations([2,1,2,4,2,2], [5,2,6,2,3,2]);
minDominoRotations([3,5,1,2,3], [3,6,3,3,4]);





// not correct space complexity
/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
const duplicateZeros = arr => {
  const res = [];
  let skip = 0;
  for (let i = 0; res.length < arr.length; ++i) {
    const val = arr[i];
    res.push(val);
    if (val === 0 && res.length < arr.length) {
      res.push(val);
    }
  }
  for (let i = 0; i < res.length; ++i) {
    arr[i] = res[i];
  }
  return arr;
};

duplicateZeros([1,0,2,3,0,4,5,0]);
duplicateZeros([1,2,3]);
duplicateZeros([0, 0, 0]);
duplicateZeros([8,4,5,0,0,0,0,7]);
duplicateZeros([0,4,1,0,0,8,0,0,3]);
duplicateZeros([9,9,9,4,8,0,0,3,7,2,0,0,0,0,9,1,0,0,1,1,0,5,6,3,1,6,0,0,2,3,4,7,0,3,9,3,6,5,8,9,1,1,3,2,0,0,7,3,3,0,5,7,0,8,1,9,6,3,0,8,8,8,8,0,0,5,0,0,0,3,7,7,7,7,5,1,0,0,8,0,0]);





/**
 * @param {string} s
 * @param {string[]} words
 * @return {string}
 */
const addBoldTag = (s, words) => {
  const mergeOverlaps = ranges => {
    for (let i = 1; i < ranges.length; ++i) {
      if (ranges[i][0] <= ranges[i-1][1]) {
        ranges[i][0] = ranges[i-1][0];
        ranges[i][1] = Math.max(ranges[i][1], ranges[i-1][1]);
        ranges.splice(i-1, 1);
        --i;
      }
    }
    return ranges;
  };
  const ranges = words.map(word => {
    let i = 0;
    const ranges = [];
    while (1) {
      const idx = s.indexOf(word, i);
      if (idx === -1) break;
      ranges.push([idx, idx + word.length]);
      i = idx + 1;
    }
    return mergeOverlaps(ranges);
  });
  const concat = [].concat(...ranges);
  const sort = concat.sort((a, b) => a[0] - b[0]);
  const merged = mergeOverlaps(sort);
  if (merged.length === 0) return s;
  const res = [];
  if (merged.length) {
    res.push(s.slice(0, merged[0][0]));
    res.push('<b>', s.slice(merged[0][0], merged[0][1]), '</b>');
  }
  for (let i = 1; i < merged.length; ++i) {
    res.push(s.slice(merged[i-1][1], merged[i][0]));
    res.push('<b>', s.slice(merged[i][0], merged[i][1]), '</b>');
  }
  if (merged.length) {
    res.push(s.slice(merged.at(-1)[1]));
  }
  return res.join('');
};

addBoldTag("abcxyz123", ["abc","123"]);
addBoldTag("aaabbb", ["aa","b"]);
addBoldTag("aaabbcc", ["aaa","aab","bc","aaabbcc"]);
addBoldTag("aaabbcc", []);
addBoldTag("aaabbcc", ['d']);






/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number[][]}
 */
const findMissingRanges = (nums, lower, upper) => {
  const ranges = [[lower, upper]];
  let p = 0;
  const dropRange = p => {
    if (ranges[p][0] > ranges[p][1]) {
      ranges.splice(p, 1);
      return 1;
    }
    return 0;
  };
  nums.map(n => {
    const b = n === ranges[p][0];
    const e = n === ranges[p][1];
    const i = n > ranges[p][0] && n < ranges[p][1];
    if (b) {
      ranges[p][0] = n + 1;
      p -= dropRange(p);
    } else if(e) {
      ranges[p][1] = n - 1;
      p -= dropRange(p);
    } else if (i) {
      const end = ranges[p][1];
      ranges[p][1] = n - 1;
      p -= dropRange(p);
      ranges[++p] = [n + 1, end];
      p -= dropRange(p);
    }
  });
  return ranges;
};

findMissingRanges([], 0, 1);
findMissingRanges([], 0, 6);
findMissingRanges([0,1,3,50,75], 0, 99);
findMissingRanges([], 1, 1);
findMissingRanges([-1], -2, -1); // [[-2, -2]]
findMissingRanges([-1], -1, 0); // [[0, 0]]





/**
 * @param {number} size
 */
const MovingAverage = function(size) {
  this._size = size;
  this._vals = [];
};
/** 
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function(val) {
  this._vals.push(val);
  if (this._vals.length > this._size) {
    this._vals.shift();
  }
  return this._vals.reduce((a, b) => a + b, 0) / this._vals.length;
};
/** 
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */





/**
 * @param {number[][]} mat
 * @return {number}
 */
const longestLine = mat => {
  const h = mat.length;
  const w = mat[0].length;
  let max = 0;
  // horiz
  for (let y = 0; y < h; ++y) {
    let cnt = 0;
    for (let x = 0; x < w; ++x) {
      cnt = mat[y][x] === 1 ? cnt + 1 : 0;
      if (cnt > max) max = cnt;
    }
  }
  // vert
  for (let x = 0; x < w; ++x) {
    let cnt = 0;
    for (let y = 0; y < h; ++y) {
      cnt = mat[y][x] === 1 ? cnt + 1 : 0;
      if (cnt > max) max = cnt;
    }
  }
  // diag
  for (let x = 1 - h; x < w; ++x) {
    let [cnt0, cnt1] = [0, 0];
    for (let y = 0; y < h; ++y) {
      const vx = x + y;
      if (vx < 0 || vx >= w) continue;
      cnt0 = mat[y][vx] === 1 ? cnt0 + 1 : 0;
      cnt1 = mat[h - y - 1][vx] === 1 ? cnt1 + 1 : 0;
      if (cnt0 > max) max = cnt0;
      if (cnt1 > max) max = cnt1;
    }
  }
  return max;
};

longestLine([[0,1,1,0],[0,1,1,0],[0,0,0,1]]);
longestLine([[1,1,1,1],[0,1,1,0],[0,0,0,1]]);
