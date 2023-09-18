![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e4f7a7e8-b81c-43b5-be0e-d85e20014537)---
title: "[Database] Relational Model"
categories:
  - Database
tags:
  - Relational Model
toc: true
toc_sticky: true
toc_label: "Basic Concepts"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3afe0a4-ef5a-4cbe-a983-bd03933e03ec)

<br>

# Relational Model

- Relational database is a most widely used model.
- Relational DBMS
  - MySQL, DB2, Oracle, Sybase, SQL server, ...
- This model is based on the concept of a “relation”.
- A relation is a mathematical concept based on a “set”.
- Advantages of Relational Model
  - Simple (user friendly) data structure
  - Provide Data Abstraction
  - Provide Data Independence
  - Provide High-level programming
 
<br>

## Definition

- Formally, given sets $D_1, D_2, \dots, D_n$, a **relation r** is a subset of $D_1 \times D_2 \times \dots \times D_n$. (x : Cartesian Product)
- Here, $< a_1, a_2, \dots, a_n >$ where each $a_i \in D_i$ is called a **tuple.**
- In other words, a relation is a finite set of tuples.
- Example : Let D1 = {0, 1}, D2 = {a ,b, c}; Then, D1 x D2
  - r1 = {<0, a>, <0, b>, <1, c>} is one possible relation.
  - r2 = {<1, a>, <1, b>} may be another relation
 
<br>

- Another Example : Student
  - stud_name = {abe, cal, bob, ann}
  - dept_name = {physics, math, computer}
  - gender = {male, female}
- r = {(abe, computer, male), (cal, physics, male), (ann, math, female), (bob, math, male)} is a relation over stud_name $\times$ dept_name $\times$ gender
- (abe, computer, male) is an example of tuple. Thus, this relation **r** consists of 4 tuples;
- Show another examples of relations;

<br>

## Table 표현

- We can represent relation as “**table**”; A table consists of **rows** and **columns**.
- Each **row** corresponds to a **tuple**; It represents “entity” or “relationship”.
- Each **column** corresponds to an **attribute**; It represents structure of table.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/890971d8-5219-42dd-9d87-a5107b0c7f1a)

<br>

## Properties of Relation

- The number of tuples in a relation is **finite**.
- The order of tuples in a relation is **not** important.
- Any duplicated tuples in a relation are **not** allowed.
- Each attribute in a relation must have a **distinct** name.
- Values of Attributes:
  - (1) Values of each attribute must be **atomic**(indivisible).
    - Intersection of row and column has **single** value.
    - Multi-valued(or composite) attribute are not allowed.
  - (2) Special value “**NULL**” is allowed.
    - NULL means “unknown”, “unavailable”, or “undefined”.
   
<br>

## Relation : Another Example

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8781ae2f-66d6-49aa-85e5-77e25ade4b8d)

<br>

- Order of tuples does not matter; All tuple are distinct.
- Each attribute has only single value.
- Some attributes has NULL values.

<br>

# Keys

...
