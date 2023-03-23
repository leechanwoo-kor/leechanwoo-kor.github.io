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

<br>

# Linked List

- Linked list는 여러 개의 연결된 **node** 들로 구성됨
- 각 node는 LINK라는 pointer를 추가로 갖음
- 각 LINK는 다음 node의 주소 값을 갖음
- Node들을 run time때 사용자가 원할 때 할당 받고 혹은 반환함
- Node들의 주소가 (array와 달리) 순차적이지 않음
- Linked list의 size를 미리 정할 필요 없음
- Linked list의 첫번째 node를 가리키는 pointer가 존재
- Linked list의 마지막 node의 LINK에는 NULL이라는 주소 값이 존재

<br>

### Array vs Linked List

예 : (bat, cat, fat, hat, mat, ..., sat, vat)

- Array 표현

<img width="736" alt="image" src="https://user-images.githubusercontent.com/55765292/227162884-ef1d07cc-c61c-4adf-bb12-3dcf7b857487.png">{: .align-center}

<br>

- Linked list 표현

<img width="893" alt="image" src="https://user-images.githubusercontent.com/55765292/227163124-217958da-0de8-4588-a61c-f577df1263a5.png">{: .align-center}

<br>

## Array 성능 분석

다음 Array 연산들에 대한 Time 성능 분석은?

- (1) Retrieve (A, i) : Read a value X at $i^th$ position in array A
- (2) Store (A, i, X) : Write a value X at $i^th$ position in array A
  - Compile time때 index i에 대한 address를 미리 계산
  - Direct Access로 very efficient. O(1) - constant
- (3) Insert (A, i, X): Insert a value X at $i^th$ position in array A
  - $i^th$ 위치 다음에 여유 공간을 만들기 위해 위치 i 의 값은 (i + 1)로, (i + 1)의 값은 (i + 2)로, . . . 각각 뒤로 이동하는 data shift 발생
  - Inefficient. O(n)
- (4) Delete (A, i): Delete a value at $i^th$ position in array A.
  - $i^th$ 위치에 지운 빈 공간을 채우기 위해 위치 i 의 값은 (i – 1)로, (i – 1)의 값은 (i - 2)로, . . . 각각 앞으로 이동하는 data shift 발생
  - Inefficient. O(n)

<br>

### Array : Insert/Delete

- Insert ‘eat’ between ‘cat’ and ‘fat’
  ; 여유 공간을 만들기 위해 fat, hat, ... vat 은 각각 뒤로 이동하는 data shift 발생

<br>

- Delete ‘fat’ from the list
  ; 빈 공간을 채우기 위해 hat, ... vat 은 각각 앞으로 이동하는 data shift 발생

<br>

## Linked-List 성능 분석

다음 Linked List 연산들에 대한 Time 성능 분석은?

- (1) Retrieve (A, i) : Read a value X at $i^th$ node in linked list A
- (2) Store (A, i, X) : Write a value X at $i^th$ node in linked list A
  - Run time때 할당 받은 pointer index 변수를 통해 node 를 접근
  - Indirect Access로 inefficient. O(1)
- (3) Insert (A, i, X): Insert a value X at $i^th$ node in linked list A
  - 할당된 새로운 node에 여유 공간이 있으므로 X를 삽입한 후, pointer 값을 조절. 뒤로 이동해야 하는 data shift 발생하지 않음.
  - Efficient. O(1)
- (4) Delete (A, i): Delete a value at $i^th$ node in array A.
  - $i^th$ node에서 X를 삭제한 후 pointer 값을 조절한 후, 삭제된 node를 반환. 앞으로 이동해야 하는 data shift 발생하지 않음.
  - Efficient. O(1)

<br>

### Linked List: Insert

- Insert ‘eat’ between ‘cat’ and ‘fat’

<br>



<br>

- (1) Pointer 변수 p에 새로운 node 할당 받은 후, 이 node에 ‘eat’ 를 저장함.
- (2) p의 LINK에 ‘cat’ node의 LINK 값 (즉, ‘fat’ node의 주소)을 assign함.
- (3) ‘cat’ node의 LINK에 pointer p의 값 (즉, ‘eat’ node의 주소) 을 assign.
  (이때 ‘cat’ node는 더 이상 fat node를 가리키지 않음)

<br>

### Linked List: Delete

- Delete ‘fat’ from the list

<br>



<br>

- (1) p는 삭제되는 ‘fat’ node를 가리키고 있음. p의 LINK 값을 이 node의 바로 앞인 ‘cat’ node의 LINK에 assign함.
  (이때 ‘cat’ node는 더 이상 fat node를 가리키지 않고, hat node를 가리킴)
- (2) 이제 ‘fat’ node는 삭제 되었고, 필요 없으므로 storage로 반환

<br>



# Array와 Linked Lists 비교

<br>

### Arrays

- 정적 메모리 할당(Static Memory Allocation)
- 낭비 공간 혹은 모자라는 공간이 생길 수 있음.
- 데이터 사이즈가 예측되는 경우 사용
- Index를 통해 직접 검색
- 검색 위주의 응용인 경우 매우 효율적
- 삽입/삭제가 빈번할 경우 비효율적
- 선형 자료구조는 효율적으로 표현하나 복잡한 구조는 어려움.

<br>

### Linked Lists

- 동적 메모리 할당(Dynamic Memory Allocation)
- 데이터 사이즈가 예측이 안되는 경우 사용
- Pointer를 통해 간접 검색
- 삽입/삭제가 빈번할 경우에 효율적
- Link의 추가 사용으로 node에 추가 공간 발생
- 복잡한 자료구조도 보편적으로 표현 가능
- 프로그램 코딩과 디버깅이 복잡하고 어려움.
