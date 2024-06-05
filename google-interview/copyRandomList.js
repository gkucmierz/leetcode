
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
const copyRandomList = head => {
  if (!head) return null;
  const map = new Map();
  map.set(null, null);
  const copy = new Node();
  let src = head;
  let cpy = copy;
  let last = new Node();
  while (src) {
    cpy.val = src.val;
    cpy.next = new Node();
    cpy.random = src.random;
    map.set(src, cpy);
    last = cpy;
    cpy = cpy.next;
    src = src.next;
  }
  last.next = null;
  cpy = copy;
  while (cpy) {
    cpy.random = map.get(cpy.random);
    cpy = cpy.next;
  }
  return copy;
};
