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
  const bh = new ListNode(0, head);
  let p1 = bh;
  let p2 = bh;
  for (let i = 0; ; ++i) {
    if (!p1) break;
    p1 = p1.next;
    if (i > n) {
      p2 = p2.next;
    }
  }
  p2.next = p2.next?.next ?? null;
  return bh.next;
};
