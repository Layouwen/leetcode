/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
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
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head) return null
  let ret = new ListNode(0, head)
  let p = ret,
    q
  // 只要 p 有下一个节点就一直循环
  while (p.next) {
    // 判断 p 后面的节点有没有重复
    if (p.next.next && p.next.val === p.next.next.val) {
      // 发现重复的话，就定义 q 节点，找到不重复的节点赋值给 q
      q = p.next.next
      while (q && q.val === p.next.val) {
        q = q.next
      }
      // 将 p 的下一个节点移动到不重复的节点 q 上
      p.next = q
    } else {
      // 如果 p 后面的节点没有重复，则直接往后走
      p = p.next
    }
  }
  return ret.next
}
// @lc code=end
