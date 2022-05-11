# 一、链表

## 141 环形链表

方式1：通过map，记录每个node。重复则有环。否则无环

```js
var hasCycle = function (head) {
  if (!head) return false
  const map = new Map()
  map.set(head, true)
  let pre = head
  while(pre.next) {
    if(map.has(pre.next)) return true
    map.set(pre.next, true)
    pre = pre.next
  }
  return false
}
```

方式2：快慢指针，相遇有环，null无环


```js
var hasCycle = function(head) {
  if(!head)return false
  let pre=head, cur =head;
  while(cur.next && cur.next.next) {
    pre = pre.next
    cur = cur.next.next
    if(pre===cur) return true
  }
  return false
};
```

## 142 环形链表II

快慢指针相遇，重置其中一个节点，接着一起走，再次相遇为环起始点

```js
var detectCycle = function(head) {
  if (!head) return null
  let pre = head, cur = head
  while (cur.next && cur.next.next) {
    pre = pre.next
    cur = cur.next.next
    if (pre === cur) {
      pre = head
      while (pre !== cur) {
        pre = pre.next
        cur = cur.next
      }
      return cur
    }
  }
  return null
}
```

## 202 快乐数

一个每次平方 1 次，一个平方 2 次，只要不相遇并且不等于 1 就循环，循环结束后，判断是不是为 1，为 1 则是快乐数，否则就是无限循环不是快乐数

```js
function getNext (n) {
  let result = 0
  while (n) {
    result += (n % 10) * (n % 10)
    n = Math.floor(n / 10)
  }
  return result
}

var isHappy = function(n) {
  let pre = n, cur = getNext(getNext(n))
  while (pre !== cur && cur !== 1) {
    pre = getNext(pre)
    cur = getNext(getNext(cur))
  }
  return cur === 1
}
```

## 206 链表翻转

定义虚头，依次往后指向，注意保持更新next节点引用

```js
var reverseList = function(head) {
  if(!head) return null
  let ret = null, cur = head
  while(cur) {
    const temp = cur.next
    cur.next = ret
    ret = cur
    cur = temp
  }
  return ret
};
```

## 92 反转链表II

求出翻转的长度，记录翻转头结点的前一个节点，翻转后连接回来

```js
var reverseBetween = function (head, left, right) {
  if (!head) return null
  // 记录头结点
  const ret = new ListNode(null, head)
  let cur = ret
  // 统计反转次数
  const cnt = right - left + 1
  // 走到指定位置
  while (--left) {
    cur = cur.next
  }
  // 反转链表 连接链表
  cur.next = reverse(cur.next, cnt)
  // 返回头结点
  return ret.next
}
function reverse(head, cnt) {
  let pre = null, cur = head
  while(cnt--) {
    const next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  head.next = cur
  return pre
}
```

## 25 K 个一组翻转链表

声明计算是否满足k个，满足k个调用翻转n个节点函数 

```js
var reverseKGroup = function (head, k) {
  if (!head) return head
  const ret = new ListNode(null, head)
  let start = ret
  // 判断是否满足 k 个，满足则反转
  while (canReverse(start.next, k) && start.next) {
    start.next = reverse(start.next, k)
    let n = k
    while (n--) {
      start = start.next
    }
  }
  return ret.next
}
function reverse(head, k) {
  let pre = null,
    cur = head
  while (k--) {
    const next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  head.next = cur
  return pre
}
function canReverse(head, k) {
  let pre = head
  while (--k) {
    if (!pre || !pre.next) return false
    pre = pre.next
  }
  return true
}
```

## 61 旋转链表

连接链表为环形，移动n-k步，断开节点。注意取模，防止走多余的步数

```js
var rotateRight = function (head, k) {
  if (!head) return null
  let total = 1
  // 连成环
  let pre = head
  while (pre.next) {
    pre = pre.next
    total++
  }
  pre.next = head
  // 走到需要断开的节点前
  pre = head
  let cnt = total - (k % total)
  while (--cnt) {
    pre = pre.next
  }
  const res = pre.next
  // 断开环
  pre.next = null
  return res
}
```

## 24 两两交换链表的节点

```js
var swapPairs = function (head) {
  if (!head) null
  // 创建虚头
  const ret = new ListNode(null, head)
  let cur = ret
  while (1) {
    // 判断是否有下一个节点并且是否够 2 个
    if (!cur.next || !canReverse(cur)) break
    // 满足条件则交换
    cur.next = reverse(cur.next)
    // 交换结束后移动到下一次准备交换的位置
    let cnt = 2
    while (cnt--) {
      cur = cur.next
    }
  }
  return ret.next
}
function reverse(head) {
  let pre = null,
    cur = head
  let cnt = 2
  while (cnt--) {
    const next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  head.next = cur
  return pre
}
function canReverse(head) {
  let cur = head
  let cnt = 2
  while (cnt--) {
    cur = cur.next
    if (!cur) return false
  }
  return true
}
```

## 19 删除链表的倒数第N个节点

先让一个指针走n步，两个指针同时走，直到遇到null，前一个指针就是删除节点的前一个节点

```js
var removeNthFromEnd = function (head, n) {
  if (!head) return null
  // 创建虚头
  const ret = new ListNode(null, head)
  let pre = ret,
    cur = ret
  // 先走 n 步
  while(n--){
    cur = cur.next
  }
  // 如果 cur 走到底，pre 就到了需要删除节点的前一个
  while(cur.next) {
    pre = pre.next
    cur = cur.next
  }
  // 删除 next
  pre.next = pre.next.next
  return ret.next
}
```

## 83 删除链表重复节点

判断p后面的节点是否相同，相同就删除，不相同就让p往后走一步继续判断

```js
var deleteDuplicates = function (head) {
  if (!head) return null
  let p = head
  while (p.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next
    } else {
      p = p.next
    }
  }
  return head
}
```

## 82 删除链表重复节点II

定义 p 保存为查找开始的节点，判断 p 下一个节点是否重复，重复则可以定义一个 q 为找到下一个不重复的节点，让 p 指向找到的不重复节点

```js
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
```

# 队列

## 86 分隔链表

定义前链表和后链表，小于的放到前，其他放到后。最后连接两个链表

```js
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
```

## 138 复制带随机指针的链表

## 622 设计循环队列

## 641 设计双向循环队列

## 1670 设计前中后队列

## 933 最近请求次数

## 17.09 第k个数

## 859 亲密字符串

## 860 柠檬水找零

## 969 煎饼排序

## 621 任务调度

## 煎饼排序 [9, 8, 4, 1, 3, 2, 6, 5, 7]

![https://s4.ax1x.com/2021/12/22/T3AmxU.png](https://s4.ax1x.com/2021/12/22/T3AmxU.png)

# 栈

## 20 有效的括号

## 03.04 化栈为队

## 682 棒球比赛

## 844 比较含退格的字符串

## 946 验证栈序列

## 1021 删除最外层的括号

## 1249 移除无效括号

## 145 二叉树的后续遍历

## 331 验证二叉树的前列序列化

## 227 基本计算器

## 636 函数的独占时间

## 1124 表现良好的最好时间段