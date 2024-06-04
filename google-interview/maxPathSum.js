
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
 * @return {number}
 */
const maxPathSum = root => {
  let max = -Infinity;
  const loop = (node, lvl) => {
    if (!node) return 0;
    const lmax = loop(node.left, lvl + 1);
    const rmax = loop(node.right, lvl + 1);
    const sum = Math.max(lmax + node.val + rmax, lmax + node.val, node.val + rmax, node.val);
    if (sum > max) max = sum;
    let nmax = Math.max(lmax, rmax);
    return Math.max(nmax + node.val, node.val);
  };
  loop(root, 0);
  return max;
};
