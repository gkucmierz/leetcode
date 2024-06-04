
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
const diameterOfBinaryTree = root => {
  let max = 0;
  const loop = node => {
    if (!node) return 0;
    const lval = loop(node.left);
    const rval = loop(node.right);
    const val = lval + 1 + rval;
    if (val > max) max = val;
    return Math.max(lval, rval) + 1;
  };
  loop(root);
  return max - 1;
};
