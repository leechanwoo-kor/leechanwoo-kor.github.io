---
title: "[Data Structures & Algorithms] Basic Concepts"
categories:
  - Data Structure
  - Algorithm
tags:
  - Data Structure
  - Algorithm
toc: true
toc_sticky: true
toc_label: "Basic Concepts"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222598023-0eced08e-a03a-4366-a388-c9e2b218127b.png)

<br>

# Basic Concepts

<br>

## Concepts: Algorithm

- Algorithm 정의
  - Algorithm is a step-by-step procedure for solving a problem in a finite amount of time. It consists of :
    - instructions
    - input data
    - output data

- Algorithm 표현
  - Programming language (C, Java, Python...)
  - Pseudo Code
    - High-level Description
    - Hides algorithm implementations

<br>

### Example: GCD Algorithm
- Problem: Compute Greatest Common Divisor
- Input: integer L, S
- Output: GCD of (L, S)
- Method: Euclid Algorithm

![image](https://user-images.githubusercontent.com/55765292/222598402-8ac557d9-502c-4cbd-b820-3f2e9b07ae23.png){: .align-center}

- Test: GCD(36, 24)=?, GCD(1989, 1590)=?, GCD(84687624, 38742620)=?


<br>

### Examples: Searching Algorithm
- Problem:Find value X among randomly stored values.
- Input: n integers in array A[0..n-1]
- Output: Value X in A[0..n-1]
- Method: Linear Search

![image](https://user-images.githubusercontent.com/55765292/222598875-c9dcce6d-487b-404e-91df-b948a8058864.png){: .align-center}

<br>

### Examples: Find Max Algorithm
- Problem:Find the maximum value
- Input: n integers in array A[0..n-1]
- Output: Maximum value of A[0..n-1]
- Method: Naïve Algorithm

![image](https://user-images.githubusercontent.com/55765292/222599107-7ed3a62d-f0cc-41fe-89e6-1d2f9a2c83e4.png){: .align-center}

<br>

### Example: Sorting Algorithm
- Problem: Sorting integers
- Input: n unsorted integers in array A[0..n-1]
- Output: n sorted integers in array A[0..n-1]
- Method: Selection Sort

![image](https://user-images.githubusercontent.com/55765292/222599378-a7db16c2-7969-45d1-ba14-5bdfd14ae14e.png){: .align-center}

<br>

## Concepts: Data Structures
- Data Structure
  - How do we store (input/output) data in computer?
  - We need to organize data in memory efficiently.
    - 예: Matrix를 memory에 어떻게 저장?
    - 예: Road map을 memory에 어떻게 저장?
  - Every algorithm uses some collections of data structures.
- Two typical types
  - Linear types: Stored in linear order
    - 예: Array, Linked Lists, Stacks, Queues
  - Non-Linear Types: Stored in non-linear order
    - 예: Trees, Graphs

![image](https://user-images.githubusercontent.com/55765292/222599531-6d0fec46-2999-4d09-9a5f-03fb3aba5442.png){: .align-center}


