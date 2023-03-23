---
title: "[Data Structures & Algorithms] Array and Linked List"
categories:
  - Data Structure
  - Algorithm
tags:
  - Array
  - Linked List
toc: true
toc_sticky: true
toc_label: "Array and Linked List"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222598023-0eced08e-a03a-4366-a388-c9e2b218127b.png)

<br>

# What is Array?
◆ Array
A set of pairs, <index, value>, such that each index has a
value associated with it.
▪ 연속적(= consecutive)인 memory space들을 compile time
때 할당 받음.
▪ Memory location의 address가 순차적임.
▪ 일단 array size가 정해지면, run time 중에 크기를 바꿀 수 없음.
즉, 선언문에서 size를 다시 조정해야 함.
◆ 예 : int list[5]
▪ Compile time 때 5 개의 memory 공간을 할당.
▪ list[0]부터 시작하여 list[1], list[2], . . , list[4] 까지
연속적인 주소를 가짐.
