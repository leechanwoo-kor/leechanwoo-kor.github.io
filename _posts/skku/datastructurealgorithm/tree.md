---
title: "[Data Structures & Algorithms] Tree"
categories:
  - Data Structure
  - Algorithm
tags:
  - Tree
toc: true
toc_sticky: true
toc_label: "Tree"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222598023-0eced08e-a03a-4366-a388-c9e2b218127b.png)

<br>

# Tree

### Binary Tree Traversal (순회)

- Each node in a binary tree is visited once.
- Produce a linear order for the information in a binary tree.
- Traversal 방식 : 4 가지
  - **INORDER** : Left, Visit, Right (LVR)
  - **PREORDER** : Visit, Left, Right (VLR)
  - **POSTORDER** : Left, Right, Visit (LRV)

(단, Left는 현재 node의 왼 쪽으로 이동 <br>
Visit는 현재 node를 방문함. <br>
Right는 현재 node의 오른 쪽으로 이동)

<br>

<img width="933" alt="image" src="https://user-images.githubusercontent.com/55765292/230337559-0b5e6967-7af4-416b-982c-711e275c1e43.png">

<br>

<img width="482" alt="image" src="https://user-images.githubusercontent.com/55765292/230337959-387bf639-faed-48b0-bc14-3fe16f98330e.png">

<br>

#### INORDER : Recursive Version

- 처음에 ptr은 root를 가리킴.

```
INORDER(ptr)
{
  if (ptr <> NULL)
  {
    INORDER (ptr -> left_child)
    print(ptr -> data)
    INORDER (ptr -> right_child)
  }
}
```

<br>

<img width="928" alt="image" src="https://user-images.githubusercontent.com/55765292/230339223-d3856066-35e2-4fd5-81da-d7288edefbdd.png">

<br>

<img width="928" alt="image" src="https://user-images.githubusercontent.com/55765292/230340094-6bd499ba-55c6-4b1d-bc9f-b8e43617de21.png">

<br>

<img width="635" alt="image" src="https://user-images.githubusercontent.com/55765292/230341546-66532409-e2c2-4e71-9efa-225725e4ca18.png">

<br>

#### INORDER : Iterative Version

```
INORDER (tree_ptr ptr)
tree_ptr stack [MAX_STACK_SIZE];
top = -1;
{ loop
    while (ptr <> NULL)
      { top = top + 1;
        if (top >= MAX_STACK_SIZE – 1) stack is full;
        STACK[top] = ptr;
        ptr = ptr -> left_child; }
    if (top == -1) return;
    ptr = STACK[top];
    top = top – 1;
    print(ptr -> data);
    ptr = ptr -> right_child;
  forever
}
```

<br>

#### INORDER : 성능 분석

- We need a stack to return to previously visited nodes safely.
- Address of every node in a binary tree is placed on stack once.
- Time 분석
  - Let n : the number of nodes in a binary tree
  - Every node is pushed and popped; n times
  - ptr will be NULL once for every (n + 1) NULL links
  - 즉, O(n)
- Space 분석
  - Stack size는 binary tree의 height h 만큼 필요.
  - 즉, log2
  - $log_2(n+1) \leq h \leq n$

<br>

### PREORDER / POSTORDER

```
PREORDER (ptr)
  {
    if (ptr <> NULL)
      {
        print(ptr->data)
        PREORDER(ptr->left_child)
        PREORDER(ptr ->right_child)
      }
  }
```

```
POSTORDER (ptr)
  {
    if (ptr <> NULL)
      {
        POSTORDER(ptr->left_child)
        POSTORDER(ptr ->right_child)
        print(ptr->data)
      }
  }
```

<br>

<img width="953" alt="image" src="https://user-images.githubusercontent.com/55765292/230342879-52b80e45-e0cf-453a-b506-1cbc61ad7539.png">

<br>

<img width="953" alt="image" src="https://user-images.githubusercontent.com/55765292/230343605-ce757b75-907b-48fc-865f-d8a7baaa7a76.png">
