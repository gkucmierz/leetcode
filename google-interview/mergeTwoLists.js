
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
const mergeTwoLists = (list1, list2) => {
  const nodes = [list1, list2];
  const head = new ListNode(-1);
  let node = head;
  while (1) {
    if (nodes[1] === null) nodes.pop();
    if (nodes[0] === null) nodes.shift();
    if (nodes.length === 0) break;
    nodes.sort((a, b) => a.val - b.val);
    node.next = nodes[0];
    node = node.next;
    nodes[0] = nodes[0].next;
  }
  return head.next;
};
