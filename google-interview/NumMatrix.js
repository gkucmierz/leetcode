
const QuickSum = arr => {
  const roundExp = n => Math.ceil(Math.log(n)/Math.log(2));
  const size = 2 ** roundExp(arr.length);
  const subSums = [arr];
  while (1) {
    const a = subSums[subSums.length-1];
    const len = a.length;
    const next = [];
    for (let i = 0; i < len; i += 2) {
      next.push(a[i] + (a[i+1] ?? 0));
    }
    subSums.push(next);
    if (next.length === 1) break;
  }

  const upTo = n => {
    let exp = roundExp(++n);
    let sum = 0;
    if (n === 2 ** exp) return subSums[exp][0];
    for (let i = 0; i < exp; ++i) {
      sum += n % 2 !== 0 ? subSums[i][n-1] : 0;
      n = Math.floor(n / 2);
    }
    return sum;
  };

  const fromTo = (n, m) => {
    return upTo(m) - upTo(n) + arr[n];
  };

  const update = (n, val) => {
    const diff = val - arr[n];
    subSums.map(sums => {
      sums[n] += diff;
      n = n / 2 | 0;
    });
  };

  return { upTo, fromTo, update };
};

/**
 * @param {number[][]} matrix
 */
const NumMatrix = function(matrix) {
  this.rows = [];
  for (let i = 0; i < matrix.length; ++i) {
    this.rows[i] = QuickSum(matrix[i]);
  }
};

/** 
 * @param {number} row 
 * @param {number} col 
 * @param {number} val
 * @return {void}
 */
NumMatrix.prototype.update = function(row, col, val) {
  this.rows[row].update(col, val);
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  let sum = 0;
  for (let i = row1; i <= row2; ++i) {
    sum += this.rows[i].fromTo(col1, col2);
  }
  return sum;
};

const numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e. sum of the left red rectangle)
numMatrix.update(3, 2, 2);       // matrix changes from left image to right image
numMatrix.sumRegion(2, 1, 4, 3); // return 10 (i.e. sum of the right red rectangle)
