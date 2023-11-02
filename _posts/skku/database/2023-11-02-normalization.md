---
title: "[Database] Normalization"
categories:
  - Database
tags:
  - Normalization
toc: true
toc_sticky: true
toc_label: "Normalization"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3afe0a4-ef5a-4cbe-a983-bd03933e03ec)

<br>

# Main Issues:

- What problems are caused by **redundancy**?
- What is criteria for **good** relation?
- What is **functional dependency**?
  - Concepts of FDs
  - Inference Rules for FDs
  - Closure Property
  - Relationship : FD and Key
- What is **normalization**?
  - First Normal Form (1NF)
  - Second Normal Form (2NF)
  - Third Normal Form (3NF)
  - Boyce Codd Normal Form (BCNF)
 
<br>

## Relational Design : Normalization

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7cb595f5-d633-4019-afd9-ca297c2f74e0">

<br>

## Problems : Bad Relational Schema

- For a “badly” designed relation, the following problems occur:
  - **Redundancy**: The same information is repeated.
  - **Insert Anomaly**: We can not insert new information.
  - **Delete Anomaly**: We may lose unwanted information.
  - **Update Anomaly**: We need to change it in many places.
 
<br>

## “Bad” Relation: Example

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/59607097-2a2c-4678-bb2a-1307163bc458">

<br>

### Problems

- Redundancy: Each department information is repeated as the number of employees work for it.
- Insert Anomaly: Suppose that we insert new department; Then, we can not insert that department if some employee is not assigned to it. Why?
- Delete Anomaly: Suppose that we delete some department; Then, we may lose all employee information working for it. What if we delete last employee working for department?
- Update Anomaly: Suppose that we change the name of some department; Then, it may cause this update to be made for every employee working for it.

<br>

### Solution : Decomposition

- We decompose Bad relation as follows:

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/25b580ed-51cc-4eb6-89b5-822ca5665427">

<br>

- Are these two relations good?
- Can we recover original information exactly?

- Those two relations are good because:
- **No Redundancy** : Each department information occurs only once.
- **No Insert Anomaly** : We can insert new department even though no employee is assigned to it.
- **No Delete Anomaly** : Even if we delete some department, we still can keep all the employees working for it.
- **No Update Anomaly** : We can change the name of department only once.

<br>

### Other “Bad” Relation: Example

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0cac32ca-e842-4809-b45c-924fc2e4105c">

<br>

### Guidelines : Designing Relational Schema

- Guideline 1: Design a relational schema with good information; In good relations, there are no **redundancy** and no **insertion, deletion, update anomalies.**
- Guideline 2: Design a relational schema so that they can be joined with appropriate joining pair attributes (**primary key, foreign key**). Otherwise, the join results may contain **spurious tuples.**
- Guideline 3: (If possible) **avoid** placing attributes in a relation whose values may frequently be **NULL**.

<br>

# Functional Dependency (FD)

- A Functional dependency (FD) is used to specify formal measures of the "**goodness**" of relational designs.
- FDs are **constraints** that are derived from the **meaning** and inter-relationships of the attributes.
- FDs are derived from the **real-world constraints** on the attributes.
- FDs and keys are used to define **normal forms** for relations.

<br>

- A FD **X** → **Y** in a relation R is defined as: For any two tuples **t1** and **t2** in R, if **t1[X] = t2[X]** holds, then **t1[Y] = t2[Y]** also holds where **X, Y** : a set of attributes in R.
- Whenever two tuples have the same value for **X**, they also must have the same value for **Y**.
- Value(s) of **X** uniquely (functionally) decides the value(s) of **Y**.
- If X → Y holds in R, this does not say that Y → X holds.
- If every tuple for X has distinct value(s), then X can decide any attribute(s) in R; Why?

<br>

## FD : Example

- Given a tuple and the value(s) of X, we can decide the corresponding value of Y .

- R = (A, B, C, D, E)
  - FD : (1) A → B
  - (2) C → D
 
<br>

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ccce4b83-f388-4b42-9d2e-820f4a812ebc">

<br>

- R = (A, B, C, D, E)
  - FD : (1) A → {B, D}
  - (2) {B, C} → E
 
<br>

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0c42ea0f-5d56-4bc6-8e2b-2e852d1f8cc4">

<br>

### FD : 실제 예 (1)

- FD는 한 relation에서 실세계의 제약조건을 반영. DB Designer는 이러한 제약조건을 FD로 변환하여 정의;

STUDENT(ID, club, prof#, course#, major)

- Each student joins only one club.
  - ID → club
- Each student has only one major.
  - ID → major
- Each professor teaches only one course.
  - prof# → course#
 
<br>

- FD는 relation 안의 모든 tuple들이 항상 만족해야 하는 조건.

<br>

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6a2eb1a6-53ff-481d-9f43-b0002a73e367">

<br>

- 만약 새로운 tuple <Eve, Dance, John, OS, . . >을 insert 한다면?

- (참고로) 여기서 Key는 무엇인지?

<br>

### FD : 실제 예 (2)

Student(S#, C#, sname, age, cname, credit, grade, D#, dname, office)

- Each student has only one his/her name and age.
  - S# → {sname, age}
- Each course has only one its name and credit.
  - C# → {cname, credit}
- Each student belongs to only one department.
  - S# → D#
- Each department has only one its name and office.
  - D# → {dname, office}
- For each student and his/her taken course, only one grade exists.
  - {S#, C#} → grade
 
<br>

### FD : 실제 예 (3)

- 다음의 각 FD가 만족되는지 검증하라.

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/04b9c9ab-3ded-4dc8-a4d0-458119a6df38">

<br>

1) SSN → name ? answer : ___
2) position → phone ? answer : ___
3) phone → position ? answer : ___
4) {position, phone} → phone ? answer : __

<br>

# Normalization

<br>

## History

- E. F. Codd : English Computer Scientist; While working for IBM, he first proposed the process of normalization and established normal forms: 1NF, 2NF, 3NF, BCNF; “ A Relational Model of Data for Large Shared Data Banks”
- “There is, in fact, a very simple elimination procedure which we shall call normalization. Through decomposition, nonsimple domains are replaced by ”domains whose elements are atomic (= non-decomposable) values.”

<br>

## Normalization

- Normalization:
  - Process of **decomposing "bad“** relations into “smaller”, but “**good**”(no redundancy, no anomalies) relations
- Normal forms:
  - First Normal Form (1NF)
  - Second Normal Form (2NF)
  - Third Normal Form (3NF)
  - Boyce Codd Normal Form (BCNF)
  - Fourth Normal Form (4NF)
- 2NF, 3NF, BCNF: based on **keys** and **FDs**.
- 4NF: based on **keys** and **MVDs**.

<br>

## First Normal Form (1NF)

- A relation **R** is **1NF** if
  - each tuple must be identified by primary key;
  - each attribute must have **atomic (= only one)** value;
- In other words, **R** does not allow
  - multi-valued attribute
  - composite attribute
c) Combination of a) and b): “Nested relation”

<br>

- Consider a PERSON relation; This is not in 1NF because {phones} is multi-valued attribute.

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cb52cf7a-6522-4e84-a169-67a5cb589003">

<br>

- There are 3 methods to normalize into 1NF.

<br>

### Convert into 1NF : Method A

- Method A: Expand the key so that there is a separate tuple for each phone number;

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/830719c1-b33f-464e-905d-920c74f4e942">

<br>

- The following problems may occur;
  - Primary key is changed as {SSN, phones}.
  - Redundancy: Same information(SSN, name, age) is repeated.
  - Anomalies may occur.
 
<br>

### Convert into 1NF : Method B

- Method B; If maximum number of phone values(say, 3) is known, replace phone attribute by 3 atomic attributes.

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5dee41c6-2d4a-475c-a64a-2b5379c04111">

<br>

- The following problems may occur;
  - Many null values exist.
  - Spurious semantics about ordering among phone values.
  - Hard to query.
  - Hard to redesign ; What if few more phones are added?
 
<br>

### Convert into 1NF : Method C

- Method C; Remove phones attribute that violates 1NF and place it in a separate relation; Decompose it!

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/befac8d3-814b-4dc7-856a-68fa17fb1457">

<br>

- Method C is the best; Completely general!
  - No redundancy
  - No anomalies
  - Easy to query.
  - Easy to redesign
 
<br>

### More than 1 Multivalued Attributes

- Consider a PERSON relation; It has 2 multivalued attributes;
  - PERSON(SSN, {hobbies}, {phones})
- Suppose we use method A;
  - PERSON(SSN, hobbies, phones)
  - Key is a {all attributes};
  - Lots of redundancy! All possible of combination of values for every ID.
- We recommend Method C;
  - PERSON1(SSN, hobbies)
  - PERSON2(SSN, phones)

<br>

### Nested Relations

- Consider STUDENT relation; This is not in 1NF because {transcript} is multi-valued/composite attribute; That means “Nested Relation (= Relation within relation)”!

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3c87ceb0-36a5-44d5-9072-275662902c40">

<br>

- Remove nested relation transcript and put it in separated relation;
  - STUDENT(ID, name)
  - TRANSCRIPT(ID, course, year, grade)

<br>

# Normalization : 기본 개념

- (지금부터) 모든 relation은 1NF라고 가정함.
- Redundancy와 Anomaly 현상은 “bad” FD들이 존재할 때 발생함;
- 이러한 “bad” FD들을 단계별로 찾아내서 소거하는 것이 정규화의 기본 개념. 다음은 전형적인“bad” FD들;
  - Key에 부분 종속되는 FD들을 소거 : 2NF
  - Key에 이행 종속되는 FD 들을 소거 : 3NF
  - Super Key가 아닌 것에 종속되는 FD들을 소거 : BCNF

<br>

## Partial Dependency (부분 종속)

- An attribute that is a member of some key is called a **prime** attribute. An attribute that is not a member of any key is **non-prime** attribute.
- Given FD X → Y, Y is **partially dependent** on X if there exists FD such that Y is dependent of a proper subset of X.

<br>

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9d8b0e24-7786-4dac-8161-883b28fabcd9">

<br>

## Second Normal Form (2NF)

- A relation R is 2NF if any non-prime attribute is not partially dependent of any key.

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/98f97ed2-09de-4f77-aec6-da7e193a391a">

<br>

### 2NF : Example

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/59b83fd1-0a42-4987-878b-83740f852c29">

<br>

- Is this relation in 2NF?
- No! Why? Non-prime attribute ‘ename’ is partially dependent on key ‘{SSN, PNO}’ because {SSN, PNO} → ename also holds. and 2) SSN → ename is given,
- Each of non-prime attributes {pname, location} is partially dependent on key {SSN, PNO} because {SSN, PNO} → pname, {SSN, PNO} → location also holds and 3) PNO → {pname, location} is given

<br>

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0e74660d-dc6c-4b76-a2a8-4eb7362694cf">

<br>

## Transitive Dependency (이행종속)

- Given FD X → Z, Z is transitive dependent on X if there exist FDs such that X → Y and Y → Z

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/25ee50e5-b8af-440f-b98f-8ff447a39be4">

<br>

## Third Normal Form (3NF)

- A relation R is 3NF if any non-prime attribute is not transitive dependent of any key.

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7bef3c47-f7d9-40b3-a40a-a6ba105f3503">

<br>

- A relation R is 3NF if for every FD : X → A,
  - (1) X is a super key,
    - (= X contains any key)
  - (2) A is a prime attribute
    - (= A is a member of some key)
   
<br>

### 3NF : Example

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c0e116aa-c111-4f82-ab6f-e95a19284187">

<br>

- Is this relation 3NF?
- No! Why? Non-prime attribute ‘dname’ is transitive dependent on key ‘SSN’ because SSN → dname also holds.
- In other words, in 2) DNO → dname, ‘DNO’ is not a super key and also, ‘dname’ is not a prime attribute;

<br>

- We decompose as follows:

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/41f5cb04-bbc2-41e8-b7fb-62189b4933c0">

<br>

## Normalization : Exercise

### Normalization : Exercise (1)

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5c98d4fc-e6f6-47f8-82bc-752e95d36983">

<br>

- What is key? Key = {ID, course}
- This relation is not in 2NF because non-prime attribute {dept} is partially dependent on key {ID, course}
- We have the following problems: Explain!
  - Redundancy
  - Insert Anomaly
  - Delete Anomaly
  - Update Anomaly
 
<br>

### Normalization : Exercise (2)

- We decompose STUDENT as follows:

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/db610fb8-b3fa-4998-b285-db0cc37112df">

<br>

- In both relations, no more problems in 2NF; Explain!
  - No Redundancy
  - No Insert Anomaly
  - No Delete Anomaly
  - No Update Anomaly
 
<br>

### Normalization : Exercise (3)

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8ea22028-9228-4eb3-b096-6cdda036a912">

<br>

- This relation is not in 3NF because non-prime attribute ‘college’ is transitive dependent on key = {ID};
- In other words, in 2) dept → college, ‘dept’ is not a super key; also, ‘college’ is not a prime attribute.
- We still have the following problems: Explain!
  - Redundancy
  - Insert Anomaly
  - Delete Anomaly
  - Update Anomaly
 
<br>

### Normalization : Exercise (4)

- We decompose STUDENT2 as follows:

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e2c78ed5-ae96-4db8-85a4-45b532f56703">

<br>

- In the both relations, no more problems; Explain!
  - No Redundancy
  - No Insert Anomaly
  - No Delete Anomaly
  - No Update Anomaly
 
<br>

# Boyce-Codd Normal Form (BCNF)

- A relation R is in BCNF if for every FD : X → A, X is a super key
- In other words, all FDs that hold over R satisfy super key constraints

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b41d411e-b607-481d-840d-e6fdf4446f71">

<br>

## BCNF : Example

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/df842dae-852e-446c-9400-c97f27f5f168">

<br>

- There are 2 keys; {student, course}, {student, prof}
- This relation is in 3NF, but not BCNF; Why?
  - In 2) prof → course, ‘prof’ is not a super key;
- We still have redundancy problem: The same ‘course’ name is repeated many times. And any anomalies?

<br>

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a21830aa-f50c-4a1d-bf90-a5b50d4e203c">

<br>

- We decompose as follows:

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bf1399dd-7129-45a6-9836-b2bca84e783b">

<br>

- In both BCNF relations, there exists no more any redundancy and no more anomaly problems.

<br>

## Why BCNF?

- Every BCNF guarantees no redundancy and no anomalies caused by FDs.
  – Since X is a super key, the two tuples must be identical (y1 = y2, z1 = z2); But this is not allowed. Why?

<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/50fb40c9-e8e4-4e4f-ad32-06f76f14bc77">

<br>

- Suppose R is a binary relation; R = (A, B)
  - Does R satisfy 2NF?
  - Does R satisfy 3NF?
  - Does R satisfy BCNF?
 
<br>

- Normalization : Exercise
  - Consider the following CAR relation;
 
<img width="1079" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/51ddfa06-f446-42f0-bad5-6ecb4f071997">

<br>

- Decompose the above CAR relation with
  - no redundancy
  - no insert anomaly
  - no delete anomaly
  - no update anomaly
 
<br>

