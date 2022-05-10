/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
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
  let p = head
  while (p.next) {
    // 发现 p 与下一个重复则直接删除
    if (p.val === p.next.val) {
      p.next = p.next.next
    } else {
      // 如果不重复则往后走一步
      p = p.next
    }
  }
  return head
}
// @lc code=end
