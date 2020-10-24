
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = (head, n) => {
  let node = head;
  let cnt = 0;
  const map = new Map();
  while (node) {
    map.set(cnt++, node);
    node = node.next;
  }
  const del = map.size-n;
  if (del === 0) return head.next;
  map.get(del-1).next = map.get(del).next;
  return head;
};
