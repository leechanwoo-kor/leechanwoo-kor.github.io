---
title: "[Data Structures & Algorithms] Sorting (2)"
categories:
  - Data Structure
  - Algorithm
tags:
  - Sorting
toc: true
toc_sticky: true
toc_label: "Sorting (2)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222598023-0eced08e-a03a-4366-a388-c9e2b218127b.png)

<br>

# Optimal Sorting Time (How fast can we sort?)

- (지금까지 배운) Selection, Bubble, Insertion, Quick Sort 모두 Worst case에 O(n^2) 임.
- 여기서 “optimal”은 worst case에 우리가 기대할 수 있는 최적의 (the best possible) 시간을 의미함.
- 비교(comparison)과 교환(swap) 연산만을 허용한다고 할 때, optimal sorting time은 $O(n \cdot \log_2n)$로 알려져 있음.
- 이에 대한 증명은 Sorting 과정을 묘사하는 Decision Tree을 이용함.
  - n 개의 key들 K1, K2, K3, . . . Kn 가 있다고 가정
  - 각 node는 2 개의 key들 간에 크기 비교를, 각 branch는 비교 결과를 의미함.

<br>

- 예 : 3 개의 key {K1, K2, K3} 에 대한 Decision Tree
- 각 leaf에 최종 sort 결과가 있으며, sorting 알고리즘은 이 곳에서 종료됨.
- 총 6 (= 3!) 개의 leaf들은 모두 다르며, 이들은 valid한 sorting 알고리즘의 모든 sorting 결과들을 보여줌.
- Root에서 각 leaf까지의 길이가 총 비교 횟수가 됨; 여기서 최대 길이는 3.
- 참고로 이 tree는 8 개의 leaf를 갖는 Full binary tree보다 leaf 개수가 적음.

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8d2088fa-ae16-4249-b53d-221e0390a5a2">

<br>

- Root에서 가장 아래에 있는 leaf까지의 길이가 worst case에 비교 횟수가 됨.
- 즉, decision tree의 높이(height)가 worst case의 비교 회수임.
- n 개의 key를 갖는 decision tree는 n! 개의 leaf (= sorting 결과)들을 가짐.
- Height가 h인 binary tree에서 leaf의 최대 개수는 2h-1 (즉, Full 인 경우).
- Decision tree 역시 binary tree의 일종임.
  - 따라서, 2h-1 >= n!
  - n! = n(n-1)(n-2)…3 2 1 >= (n/2)^(n/2) (by Stirling의 공식)
  - 따라서, h >= (n/2)log2 (n/2) = O(nlog2n) 

<br>

