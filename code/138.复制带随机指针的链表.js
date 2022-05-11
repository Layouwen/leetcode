/*
 * @lc app=leetcode.cn id=138 lang=javascript
 *
 * [138] 复制带随机指针的链表
 */

// @lc code=start
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
var copyRandomList = function (head) {
  if (!head) return null
  // 在每个节点后面复制一个一样的节点
  let p = head,
    q
  while (p) {
    q = new Node(p.val, p.next, p.random)
    q.next = p.next
    p.next = q
    p = q.next
  }
  // 修正复制出来节点的 random 指向
  p = head.next
  while (p) {
    if (p.random) {
      p.random = p.random.next
    }
    p = p.next
    if (p) {
      p = p.next
    }
  }
  // 1, 11, 2, 22, 3, 33
  // 拆分链表
  const newHead = head.next
  p = head
  while (p) {
    q = p.next
    p.next = q.next
    if (p.next) {
      q.next = p.next.next
    }
    p = p.next
  }
  return newHead
}
// @lc code=end
