---
title: "[Data Structures & Algorithms] Queue"
categories:
  - Data Structure
  - Algorithm
tags:
  - Queue
toc: true
toc_sticky: true
toc_label: "Stack"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222598023-0eced08e-a03a-4366-a388-c9e2b218127b.png)

<br>

# Queue

- list의 양 쪽 끝을 각각 front와 rear가 가리키는 구조
- Insertion은 rear에서, deletion은 front에서 발생
- front와 rear을 제외한 다른 item들은 직접 접근할 수 없음.
- 어느 item이 먼저 remove되는지?
: **FIFO (First-In First-Out)**

<br>

<img width="944" alt="image" src="https://user-images.githubusercontent.com/55765292/228795511-66fbd12f-0bf4-4fad-a102-00fc44d03dad.png">

<br>

- 1차원 array를 이용하여 다음과 같이 선언.

data type queue[Max_Q_Size]
예: char queue[20],
int queue[50], . .

- 여기서 data type은 int, real, char, . . 등 중 모두 선택 가능하며, Max_Q_Size는 queue의 최대 사용 공간을 의미.
- front와 rear로 명명된 2 개의 variable를 이용.
- 최초에 항상 front와 rear를 각각 -1로 초기화하고, 이는 queue가 empty 상태임을 나타냄

##  Insert / Delete

Delete (int front, int rear)
if (front == rear)
return queue_empty;
front = front + 1
X = queue[front];

Insert (int rear, char X)
if (rear == MAX_Q_Size - 1)
return queue_full;
rear = rear + 1
queue[rear] = X

- INSERT : Insert an item X into a queue.
- DELETE : Delete an item X from a queue.
- 참고: 반드시 queue full 과 queue empty 조건을 명시 요함. 아니면 overflow와 underflow 오류 각각 발생

<br>

- Insert(A), Insert(B), Insert(C); Delete; Delete;
- 참조: front 값은 실제의 front 보다 항상 1이 적음.

queue[4]

<br>

<img width="611" alt="image" src="https://user-images.githubusercontent.com/55765292/228796913-888afdb9-fedc-442c-a7f9-21ca4b2383b0.png">

<br>

- 가장 먼저 삽입된 데이터가 먼저 삭제되는 FIFO(First In First Out) 특성을 가짐. 즉 First Come First Service!

<br>

Insert(A), Insert(B), Insert(C); Insert(D); Delete; Delete;
▪ 이 시점에서 Insert(E)가 가능하나? No! (rear 값(3)이 이미 full 상태)
▪ rear 값이 full임에도 불구하고, queue에는 빈 공간들이 있음

## Circular Queue



