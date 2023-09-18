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

-  Super key (“Unique”)
  - A set of attributes **K** of a relation R such that no two tuples in R must have the same value for **K.**
  - Values of **K** can identify all tuples in R uniquely.
- Key (“Unique” + “Minimal”)
  - A "minimal" superkey **K** that does not does not contain a subet of attributes that is itself a super key.
  - Removal of any attribute from **K** results in a set of attributes that is no more a superkey.
- Every key is super key, but reverse is not true.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8ede3fd8-16e8-40b5-9354-065d67624c91)

<br>

- What is Key(s)? What is super key(s)?
  - Every student’s SSN value must be distinct;
  - There may have the same student’s names, but with distinct addresses.
  - There may have the same addresses, but with distinct student’s names.
  - But there must not have same student’s name with same addresses. (or same addresses with the same names)

<br>

- Candidate Key
  - A relation may have more than one key; In this case, each of the keys called a **candidate** key;
    - (1) **Simple** Key
    - (2) **Composite** Key : Key which consists of 2 or more attributes;
    - (3) **Compound** Key : Composite + each attribute is simple key.
- Primary Key
  - A key chosen among candidate keys (by designer) for identification in practice (**PK**는 밑줄(underline)로 표시함)
  - Every relation must have its own primary key.
- Foreign Key
  - (will explain later)

<br>

## Exercise

- Consider the following “Company” relations:
  - EMPLOYEE (eno, ename, age, addr, super_eno, work_dno)
  - DEPARTMENT (dno, dname, phone, mgr_eno)
  - PROJECT (pno, pname, control_dno)
  - WORK-ON (eno, pno, hours)
- Under your assumptions, answer the following questions:
  - (1) Find (all) keys.
  - (2) Specify primary keys.
  - (3) Find (all) super keys
 
<br>

## Good Primary Keys

- Stable : Do not change over the life of the database
- Definitive : Values always exist
- Numeric : ID ‘12345’ is better than name ‘michael Jordan’
- Minimal : Fewest attributes as possible ( 3 or fewer)
- Short : Are not too long length (bytes)
- Security : No sensitive information hidden

<br>

# (Relational) Integrity Constraints

- Integrity Constraints are conditions that must be satisfied by all relations; There are three main types of constrains;
  - **Key** Integrity
  - **Entity** Integrity
  - **Referential** Integrity
- Key Integrity
  - Given any key **K**, for any two tuples t1 and t2 in a relation R, t1[**K**] $neq$ t2[K**]**.
- Entity Integrity
  - **Primary key** in a relation R must not contain **null** values in any tuple in R; That means; t[**PK**] $neq$ null for any tuple t

<br>

## Key/Entity Integrity

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d7cf7c26-f8de-4e9e-8b72-1deccc682711)

<br>

- 다음 각 연산에서 key integrity, entity integrity의 위반 유무를 판단하라. (단, Primary Key = {SSN})
  - Insert a student with <papa jones, 489-22-1100, 290-7118, . . >
  - Insert a student with <papa jones, null, 29-0-7118, null, . . . >
  - Insert a student with <mama jones, 123-45-678, null, null, null, . . >
  - Update Charles Cooper’s SSN by 533-69-1238.
  - Delete students with GPA = 3.25.
 
<br>

# Referential Integrity

- This is used to specify a **relationship** among tuples in relations.
- When **referencing** relation **R1** wants to relate the **referenced** relation R2, you must include a **common** attribute(s).
- The common attribute in **referenced** relation R2 is **Primary Key (PK)**.
- The common attribute in **referencing** relation R1 is called **Foreign Key (FK)**.
- Tuples in **referencing** relation R1 have **FK** that reference the **PK** of **referenced** relation R2.

<br>

- 다음 ER Diagram을 relation 구조로 표현하라.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d8db59a4-a47f-4717-8778-3c1546ca4f1b)

<br>

- The value in **FK** of referencing relation **R1** must be either:
  - (1) an existing value of the corresponding primary key PK in the **referenced** relation R2, (In case (1), every FK values in referencing relation R1 must exist in PK in the referenced relation R2)
  - (2) a null value (In case (2), the FK in R1 should not be a part of its own primary key.) 

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3988eb8f-369f-4a3c-b208-bce45ed068b8)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/aae54eae-5763-4afa-89dd-a8eadad15803)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/db90f59b-e11b-4ef3-968b-73d82292571b)

- Referencing and referenced relation is the same.
- 한 relation의 FK가 자기 자신의 relation의 PK를 참조함.
  - What is **PK**?
  - What is **FK**?

<br>

## Violating Referential Integrity
  
- Referential integrity could be violated by following cases;
  - **Case 1** : **DELETE** or **UPDATE** tuples from **referenced** relation
  - **Case 2** : **INSERT** tuple into **referencing** relation
- If integrity violated, several optional actions can be taken:
  - (1) **Reject** the operation, and explain user why;
  - (2) **Perform** the operation, but ask user to correct it;
  - (3) **Trigger** additional actions, and ask system to correct it;
    - by CASCADE, SET NULL, SET DEFAULT

<br>

- 다음 각 연산에서 referential integrity의 위반 유무를 판단하라.
  - Insert <77777, sam, eagles> into PLAYER
  - Delete <55555, sam, padres> from PLAYER
  - Delete <twins, MN> from TEAM
  - Update tname “dogers” by “winners” from TEAM
  - Insert <55555, bob, 77777> into EMPLOYEE
  - Delete <12345, Bob, 22> from STUDENT
  - Update CID CS200 by CS300 from COURSE
  - Delete <34567, Jim, 30> from STUDENT

<br>

## Exercise

- Consider the following “Company” relations:
  - EMPLOYEE (eno, ename, age, addr, super_eno, work_dno)
  - DEPARTMENT (dno, dname, phone, mgr_eno)
  - PROJECT (pno, pname, control_dno)
  - WORK-ON (eno, pno, hours)
- Under your assumptions, answer following questions: (We assume: Underlined are primary keys)
  - (1) Find foreign keys.
  - (2) Specify referencing/referenced relations

<br>

- 다음 relation들에서 foreign key를 명시하라.
  - Note : FK와 이와 상응하는 PK가 반드시 이름이 같을 필요 없음;

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e962a7ee-990e-41c8-a71f-20d229a0d747)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ed11416c-7f0e-4b82-88bc-5e3039bb1e55)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fe74d02c-2167-4759-a370-1b404c917b4b)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/52c68287-9774-4d3a-8c12-8a5e939a3e53)

<br>

- Draw a relational schema diagram by specifying the FKs.
  - BRANCH (branch-name, branch-city, assets)
  - LOAN (loan-number, branch-name, amount)
  - ACCOUNT (account_number, branch-name, balance)
  - DEPOSITOR (customer-name, account-number)
  - BORROWER (customer-name, loan-number)
  - CUSTOMER (customer-name, customer-street, customer-city)
 
