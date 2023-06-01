---
title: "[Data Structures & Algorithms] Searching"
categories:
  - Data Structure
  - Algorithm
tags:
  - Searching
toc: true
toc_sticky: true
toc_label: "Hashing"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222598023-0eced08e-a03a-4366-a388-c9e2b218127b.png)

<br>

# Types of Searching

- (Basic) Search Using Linear Structures
  - Linear Search, $O(n)$
  - Binary Search, $O(\log_2n)$ (단, 정렬)
- Search Using Tree Structures
  - Binary Search Tree
  - AVL Tree
  - 2-3 Tree
  - 2-3-4 Tree
  - Red Black Tree
  - Multi-Way Tree 

<br>

# Binary Search Tree (BST)

- Average Case에는 O(log2n)이 보장됨.
- Worst case에는 Binary Tree의 모양이 한 쪽 혹은 지그재그로 기울어져 O(n)이 되어 성능이 저하됨
- BST의 형태를 그대로 유지하면서, Insert되는 입력 데이터의 형태 혹은 순서에 상관없이 worst case에도 O(log2n)을 보장할 수 있도록 함.
- 해결책: **“Balanced” **

<br>

## BST : General Case

- Keys = (Jan, Feb, Mar, Apr, May, Jun, July, Aug, Sep, Oct, Nov, Dec)

<br>

<img width="960" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/90338086-721d-4ac7-9dfc-7e799968cdd8">

<br>

## BST : Worst Case

- Keys = (Apr, Aug, Dec, Feb, Jan, July, June, Mar, May, Nov, Oct, Sep) 

<br>

<img width="960" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ff19443a-d46a-45e2-97ed-6bc3fc50470c">

<br>

## BST : Best Case

- Keys = (July, Feb, May, Aug, Jan, Mar, Oct, Apr, Dec, Jun, Nov, Sep) 

<br>

<img width="960" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/67f0453d-ea3a-4955-883b-fa7235815d4d">

<br>

## Balanced Trees

- Balancing
  - Balance factor(BF) = $H_L – H_R$
    - (단, HL과 HR은 각 node의 Left subtree와 Right subtree의 높이(height))
  - Balanced Tree : |BF| $\leqq$ 1 for all nodes
    - (즉, 모든 node의 BF는 1 이하; BF = +1, 0, -1)

<br>

<img width="960" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1b0da8a1-7b54-4dc5-8dee-3926a0493bce">

<br>

### Testing Balanced Trees

<br>

<img width="960" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/74430264-13e7-4f01-9eb3-fd65bffb2e90">

<br>

# AVL Tree (by Adelson-Velskii and Landis)

- (1) Binary Search Tree
- (2) Balanced Tree

---

- Root에서 모든 leaf node까지의 Height를 Minimize함.
- Insertion 혹은 Deletion으로 인해 어떤 node의 Balance가 깨지면,
  - (즉 BF가 +2 혹은 -2가 되면) Height를 조정해서 Rebalancing 함.
- Worst Case에도 항상 $O(log2n)$을 보장
- 실제 프로그래밍 관점에서는 coding이 복잡함.
- Rebalancing Overhead가 요구됨.

---

- Testing AVL Trees

<img width="960" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f4436775-c508-4dc1-8992-d0b891591fb0">

<br>

## Insert : AVL Tree

- BST FIND 알고리즘을 이용하여 새로운 key X가 삽입될 위치를 탐색;
  - 해당되는 leaf node에 X를 삽입함
- X가 삽입 된 node로 인해 tree의 균형이 위반되었는지를 점검;
  - 만약 어떤 node가 unbalanced 이면 (BF = 2 or -2), rebalance it
  - 즉 unbalanced node의 BF가 2 미만이 되도록 함
  - 이를 위해 unbalanced node에 대해 회전(rotation)를 수행함
- 즉, 매번 삽입 연산이 발생할 때 마다 tree의 균형을 점검하여, 위반시에는 회전(rotation)를 수행함.
  - 4 가지 유형의 rotation이 있음
  - Balance 점검 및 회전 비용이 추가로 발생함
  - 그러나 항상 Balanced tree를 유지하므로 tree가 worst case인 O(n) 형태로 가는 것을 방지할 수 있음

<br>

### Types of Insertions**

- 2 가지 주목할 node들
  - X : newly inserted node
  - A : the nearest ancestor of X whose BF becomes ± 2
    - (즉, A는 Balance를 위반한 node로서, 새로 삽입된 node X 로부터 위 쪽으로 가장 가까운 곳에 (이는 회전 비용을 줄이기 위함) 위치한 조상(부모, 조부모, . . 등)
- 4 가지 삽입 유형(Insertion Types)
  - LL : X는 A의 Left subtree의 Left subtree인 곳으로 삽입됨.
  - LR : X는 A의 Left subtree의 Right subtree인 곳으로 삽입됨.
  - RR : X는 A의 Right subtree의 Right subtree인 곳으로 삽입됨.
  - RL : X는 A의 Right subtree의 Left subtree인 곳으로 삽입됨.

---

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/00ab3325-c3de-4ded-9893-a0b8574d9e56">

---

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e3789360-82a3-4ef4-8b61-540a89fa951d">

<br>

### Left/Right Balancing

- Left Balancing
  - A의 Left subtree로 X가 삽입됨
  - A의 Left subtree의 Height가 더 높아짐
  - LL/LR Rotation을 이용하여 좌우 균형을 조절
  - LL rotation: Right rotation(시계 방향 회전)
  - LR rotation: Left rotation(반시계 방향 회전) + Right rotation
- Right Balancing
  - A의 Right subtree로 X가 삽입됨
  - A의 Right subtree의 Height가 더 높아짐
  - RR/RL Rotation을 이용하여 좌우 균형을 조절
  - RR rotation: Left rotation(반시계 방향 회전)
  - RL rotation: Right rotation(시계 방향 회전) + Left rotation
- Left Balancing과 Right Balancing은 서로 대칭 관계. 

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/950dbca6-d339-4fcf-9c37-2a6d14f7a8ec">

---

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4566411d-03db-463e-871b-86bf907401ab">

<br>

#### Insertions : Exercise

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/900d4f68-0ada-4417-9ad9-bc41fd320b79">

<br>

#### AVL Tree : Exercise

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b32abb56-100a-4b89-9ae0-df3b72c871a9">

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/35f92fdd-0904-49b9-bb8b-8a116405342a">

<br>

### Performance: AVL Tree

- n 개의 node를 갖는 AVL tree의 높이(h)는 최대 1.44 log2(n+2).
- n 개의 node를 갖는 Binary Tree의 높이(h)는 최소 log2(n+1).
- n 개의 key를 갖는 AVL tree에서의 Worst case에 검색 시간(즉 h)은?
  - log2(n+1) <= h <= 1.44 log2(n+2)
- AVL tree에서의 Find, Insert, Delete 모두 O(log2n).
- 경험적 연구(empirical studies)에 의하면, key들을 무작위로 삽입(random insertions) 한 경우 다음과 같은 결과를 얻음.
  - No rebalancing : 53.6% probability
  - LL/RR (single rotation) : 23.2%
  - LR/RL (double rotation) : 23.2%

<br>

## 2-3 Tree

- 2-3 Tree는 다음 2 가지 유형의 node들로 구성됨;
- 2-node는 다음의 특성을 가짐;
  - 각 node는 1 개의 key X를 갖음.
  - 각 node는 2 개의 child를 갖음.
  - Left child의 모든 key 값들은 X보다 작다.
  - Right child의 모든 key 값들은 X보다 크다.
- 3-node는 다음의 특성을 가짐;
  - 각 node는 2 개의 key X, Y (단, X < Y)를 갖음.
  - 각 node는 3 개의 child를 갖음.
  - Left child의 모든 key 값들은 X보다 작다.
  - Middle child의 모든 key 값들은 X보다 크고, Y보다 작다 .
  - Right child의 모든 key 값들은 Y보다 크다.
- 2-3 Tree에서 각 node의 Balancing Factor(BF)가 모두 0이다.
  - 완벽한 균형(completely balanced)를 갖는 tree 형태임.
  - 즉, root에서 각 leaf node들까지 거리가 모두 같음.

<br>

**2-3 Tree : 예**

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3f947f0a-fd59-42e8-8958-6717d8495bd6">

<br>

### Find : 2-3 Tree

- 2-3 Tree로부터 원하는 key 값 K를 갖는 node를 search; Binary Search Tree에서의 탐색과 유사함;
  - Root로 부터 출발하여 내려오면서 각 node의 key들과 X를 비교
  - 2-node 인 경우는 left 혹은 right link 중 선택
  - 3-node 인 경우는 left, middle 혹은 right link 중 선택
  - 위의 과정을 계속 반복함
  - Worst case의 탐색 시간은 2-3 tree의 최대 높이임

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/655fbb74-a010-4a6b-bc43-d5a0f5941bd7">

<br>

### Insert : 2-3 Tree

- 새로운 Key K를 2-3 Tree에 Insert ; 우선 FIND 알고리즘을 이용하여 삽입 위치를 탐색; 삽입은 항상 해당되는 leaf node에서 발생 다음 2 가지 경우가 발생;
- Leaf node가 2-node 일 때;
  - 이 경우는 하나의 여유 공간이 있음.
  - 그냥 K를 삽입하면 완료!
- Leaf node가 3-node 일 때;
  - 이 경우는 여유 공간이 없음.
  - Overflow 발생 (즉 K를 삽입 후 이 node에 key가 3 개 생김)
  - Middle key를 parent로 move up함.
  - 새로운 node를 할당 받은 후, 나머지 key들을 각각 양쪽 node
    - (즉 기존 node와 새로운 node)에 배분하여 분기(Split) 시킴.
  - 최종적으로 parent node의 link를 새로 조정.

<br>

- Insert 39 : There is a space; Just insert it.
- Insert 38 :
  - There is no space (= overflow);
  - Move middle key (39) up to its parent and split 38 and 40.
- Insert 37 : There is a space; Just insert it

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f80b2716-fee8-44f1-b45c-c072ba59718c">

<br>

- Insert 36 :
  - There is no space (= overflow);
  - Move middle key (37) up to its parent and split 36 and 38;
  - Overflow again;
  - Move middle key (37) up to its parent and split 30 and 39

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4aebc365-b4ef-44d0-8ff4-a07a682b4b9e">

<br>

- After 35, 34, 33 inserted, then insert 32
  - “Move middle key Up” is propagated until root.
  - Need to create a new root; Height of tree is increased by 1. 

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/371adef0-a656-4e7e-8b61-2d21eaf580d2">

<br>

### Delete : 2-3 Tree

...

<br>

### BST vs 2-3 Tree

- BST는 key가 tree의 맨 아래의 leaf node로 삽입될 때 마다, height가 1 증가됨. (즉 검색 시간이 매번 1 번씩 늘어나 성능 급격히 저하됨)
- 2-3 tree는 leaf node에서 root 까지 위로 split이 연속해서 발생하는 worst case에만, height가 1 증가 됨. 이 경우는 흔치 않으므로, 일반적으로 height가 증가하지 않음.
- 2-3 tree는 삽입시에는 Split을 통해, 삭제시에는 merge를 통해 항상 BF가 깨지지 않고 완벽한 균형이 유지됨. 즉, 높이가 최대 +1 증가, -1 감소.
- 2-3 tree는 Node Split을 통해, 삭제시에는 Node Merge를 통해 항상 Balance가 깨지지 않고 완벽한 균형이 유지됨.
- 따라서 2-3 tree가 BST, AVL Tree 보다 검색시간에서 우수함. 단 다음과 같은 추가 비용들이 필요함.
  - Space waste in nodes (즉 2-node에서 link 낭비)
  - Node split costs (즉 3-node에서 overflow 발생)

<br>

## 2-3-4 Tree

- 2-3-4 Tree는 다음과 같이 4-node를 추가한 것 이외에는, 2-3 tree와 동일함;
- 4-node는 다음의 특성을 가짐;
  - 각 node는 3 개의 key X, Y, Z (단, X < Y < Z)를 갖음.
  - 각 node는 4 개의 child를 갖음.
  - Left child의 모든 key 값들은 X보다 작다.
  - Left Middle child의 모든 key 값들은 X보다 크고, Y보다 작다.
  - Right Middle child의 모든 key 값들은 Y보다 크고, Z보다 작다.
  - Right child의 모든 key 값들은 Z보다 크다. 

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7bc47a54-cec2-443f-9c1b-8e8a2e16593a">

<br>

### Insert : 2-3-4 Tree (Top-Down 방식)

- 2-3 tree에서의 Insert 방식은 상향식(Bottom-Up) 임. 즉 node split이 leaf 에서 root 방향으로 split을 반복하며 계속 move up하면서 발생함.
- 이 과정은 도중에 2-node, 3-node를 만나거나, root까지 올라가면 정지함.
- 2-3-4 tree에서는 일반적으로 하향식(Top-Down)으로, 이를 방지함.
- 즉 root에서부터 삽입 위치를 찾으려고 move down하는 도중에 4-node를 만날 때 마다, 이를 split하여 4-node를 모두 제거하여 여유 공간을 확보함.
- 즉 하나의 insertion 작업이 tree의 형태를 바꾸면서 move down 하면서, 동시에 leaf node에서 insertion이 발생함

<br>

- 2-node 혹은 3-node로의 Insert는 여유 공간이 있으므로 간단함;
  - (즉, 2-node는 2 개, 3 node는 1 개의 공간). 그냥 Insert 하면 끝; 이 경우 2-node는 3-node로, 3-node는 4-node로 각각 바뀜.
- 4-node로의 Insert는 이미 full인 상태로 공간이 없으므로 복잡함;
  - Insert하기 전에 4-node를 2 개의 node들로 split 함. 3 가지 경우를 고려

<br>

# 성능비교

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/87243598-1cbf-4ecc-afdf-de871220f76c">

<br>

