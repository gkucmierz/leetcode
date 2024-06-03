
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {
  let sum = new ListNode(0);
  const head = sum;
  let carry = 0;
  while (l1 || l2) {
    if (!l1) l1 = new ListNode(0);
    if (!l2) l2 = new ListNode(0);
    let s = l1.val + l2.val + carry;
    if (s >= 10) {
      s -= 10;
      carry = 1;
    } else {
      carry = 0;
    }
    sum.next = new ListNode(s);
    sum = sum.next;
    l1 = l1.next;
    l2 = l2.next;
  }
  if (carry) {
    sum.next = new ListNode(carry);
  }
  return head.next;
};
