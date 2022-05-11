/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  if (!head) return null
  // 定义 q 节点放小于 x 的节点, h 放其他节点
  const q = new ListNode(0, null)
  const h = new ListNode(0, null)
  // qq 指向 q 链表最后一个节点， hh 指向 h 链表最后一个节点
  let qq = q
  let hh = h
  // cur 表示当前在查看的节点
  let cur = head
  while (cur) {
    // 小于放到 q 中，否则放到 h 中
    if (cur.val < x) {
      qq.next = cur
      qq = qq.next
    } else {
      hh.next = cur
      hh = hh.next
    }
    cur = cur.next
  }
  // 防止环形链表，h 节点末尾赋值 null
  hh.next = null
  // 连接 q 和 h 节点
  qq.next = h.next
  return q.next
}
// @lc code=end
