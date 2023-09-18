---
title: "[Database] Entity Relationship(ER) Model"
categories:
  - database
tags:
  - Entity Relationship Model
  - ER Model
toc: true
toc_sticky: true
toc_label: "Basic Concepts"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3afe0a4-ef5a-4cbe-a983-bd03933e03ec)

<br>

# Database Design : 3 Steps

- Conceptual Design : ER Model
  - Describe data requirements of users
  - Both DBMS and H/W independent
  - High Level Conceptual Schema (= ER Diagram)
- Logical Design
  - Actual implementation using specific DBMS
  - DBMS dependent, but H/W independent
  - Logical (Low Level Conceptual) Schema
- Physical Design
  - Specify access paths, indexes, and file organizations
  - Both DBMS and H/W dependent
  - Physical(Internal) Schema

<br>

## Example: COMPANY Database

- Database Analysis Requirements : Company
  - Our company is organized into departments. Each department has a name, number and an only one employee who manages the department. (. . . . .)
  - Each department controls many projects. Each project is controlled by only one department. Each project has a name, number, location. (. . . . .)
  - We store each employee’s ssn, address, salary, sex, and birthdate. Each employee works for one department but may work on several projects. We keep track of the direct supervisor of each employee. (. . . . .)
  - Each employee has a number of dependents. For each dependent, we keep track of their name, sex, birth-date, and supported relationship to employee. (. . . . .)
  - . . . . . (etc.)

<br>

# Entity and Attribute

- Entity
  - Entity is a thing (or object) existing in a world.
- Attribute
  - Attributes are properties used to describe an entity.
 
<br>

## Types of Attributes

- **Simple** Attribute
  - An entity has a single value for the attribute.
- **Multi-Valued** Attribute
  - An entity has several (> 1) values for the attribute.
- **Composite** Attribute
  - An attribute is composed of other attributes.
- **Complex** Attribute
  - Composite + Multi-valued
- **Derived** Attribute
  - Value of an attribute is computed from another attribute.

<br>

## Entity Type and Key

- Entity Type
  - A collection of similar entities (= sharing the same attributes)
- Key
  - A set of attributes to identify each entity uniquely.
  - Every values in a key attribute must be distinct.
  - An entity type may have more than one key attributes.
- Examples of Key
  - EMPLOYEE의 key는?
  - STUDENT의 key는?
  - VEHICLE의 key는?

<br>

### Example: EMPLOYEE Entity Type

- EMPLOYEE
  - (SSN, Name, BirthDate, Age, Phone)

```
(1234567, Bob, 6-1-1977, 36, 290-7218),
(2345678, Abe, 6-1-1966, 47, {290-7118, 390-7118}),
(3456789, Eve, 5-1-1957, 57, 290-7230),
.
.
.
```

<br>

### ER Diagram : EMPLOYEE Entity Type

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/40facb51-c7dd-466a-8f74-e4a6e050b8de">

<br>

## Relationship (Type)

- Relationship
  - It connects (or relates) many entities.
- Relationship Type
  - A collection of similar relationships .
- Degree (of Relationship Type)
  - Unary (= Recursive) Relationship : Degree 1
  - Binary Relationship : Degree 2
  - Ternary Relationship : Degree 3

<br>

### WORK_FOR Relationship Type

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d09b5c2b-9845-4c38-9389-29ddfc452570">

<br>

### WORK_ON Relationship Type

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8b86955b-ee73-48a6-a224-be93968a7b4a">

<br>

### ER Diagram : WORK_FOR and WORK_ON

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/921459fe-3bfd-4ed5-8179-414aed1832e5">

<br>

## Constraints on Relationship(1)

- Mapping Constraints
  - : Express the number of entities to which another entity can be related via a relationship type.

<br>

- One to One (1 : 1)
- Many to One (M : 1)
- One to Many (1 : M)
- Many to Many (M : N)

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/607968ba-fdf6-41d5-b9c4-108ca69c3ece">

<br>

### WORK_FOR Relationship Type (M : 1)

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/30ba934a-17f9-40e4-9136-196649a814bd">

- “Each employee works for at one department, but each department can have many employees for it.”


<br>

### MANAGE Relationship Type (1 : 1)

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c495fa09-50eb-417a-b4e0-45d592346af1">

- “Each employee works for at one department, and each department has one employee for it.”

<br>

### WORK_ON Relationship Type (M : N)

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0894c1da-8dd8-41ce-8762-c92b2eb77115">

- “Each employee can work on many projects, and a project can have many working employees for it.

<br>

### ER Diagram : Mapping Constraints

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5a4139be-3e7e-40d1-b25e-a4e522c93676">

<br>

## Constraints on Relationship(2)

- Participation Constraints
  - Total (= Mandatory)
  - Every entity must participate (in a relationship).
  - It is not allowed that there are any entities not participating in relationship.
- Partial (= Optional)
  - Some entities may not participate.
 
<br>

### WORK_FOR Relationship Type (Total : Total)

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/32a3102c-9e2f-41c5-83a6-3d595cbffd5b">

- Every employee must work for some department.
- Every department must have employee working for it.

<br>

### MANAGE Relationship Type (Partial : Total)

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c58a05b2-eb19-4398-8f6e-9a11d6c1bf76">

- Not every employee needs to manage a department.
- But every department must have some manager for it.

<br>

### ER Diagram : Total/Partial Constraints

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/741aa1dd-05d6-4b4f-b341-8793c76c1308">

<br>

### Exercises : Relationship

- Show examples of each of the following relationships; 

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/42361d02-b1fb-45df-b5a8-29e573a896fb">

<br>

## Constraints on Relationship(3)

- (Min, Max) Constraints
  - Assign (min, max) to each entity type.
  - min means “at least”; max means “at most”
  - min = 0 means partial
  - min > 0 means total
  - min  max; min  0; n  max  1

<br>

### ER Diagram : (Min, Max) Constraints

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/46aeb7fb-6151-47c2-91e9-0583c6b7e7d6">

<br>

- Each department must have exactly one manager and each employee can manage at most one department
- Each employee must work for exactly one department, but each department must have maximum 30 employees

<br>

# Recursive Relationship

- Relationship with degree 1 is called recursive(unary).
- Both participating entity types are the same.
- Examples of Recursive Relationships
  - 사람과 사람들 간의 관계
  - 과목과 과목들 간의 관계
  - 부품과 부품들 간의 관계
- 참여하는 양쪽의 동일한 entity type들을 구분하기 위해 서로의 고유한 다른 role (역할)들이 필요함.
- ER diagram 그릴 때 각 role 들을 모두 표기함

<br>

## Recursive Relationship : SUPERVISE

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dc62be68-22b9-4aa9-9616-5cb4c2d6ace2">

<br>

### Recursive Relationship 1 : M

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/26a1741e-8884-4e5c-b077-f8be59b5b037">

<br>

### Recursive Relationship 1 : 1

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/db28e118-a441-4f76-a014-657b1089d16c">

<br>

### Recursive Relationship M : N

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/82d55f0a-c920-40ef-bcfa-9773eb4d3236">

<br>

## Weak Entity Types

- In real world, some entity type may not have its key.
- An entity type that does not have a key, is called a **weak** entity type.
- To identify weak entities uniquely, we must find its **owner (= strong)** entity type.
- Owner entity type has a weak relationship with weak entity type;
- Owner has always its own key

<br>

### Weak Entity Types : Example

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2a3ea7b6-5966-474b-a375-bdc08e79c969">

- ‘pname’ is almost a key for players, but there may be two with the same name.
- ‘pnumber’ is certainly a key within a same team. But players on two different teams could have the same number.
- How to identify players uniquely?
  - Player들과 relationship을 갖는 Team들을 찾아 냄.
  - 이들 team들은 key가 존재하고 이를 owner라 함.

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/016f7611-9830-481b-b369-09fe0380c9d2">

- “Players” (by double box) is a **weak** entity type.
- “Teams” is an **owner** (= identifying) entity type.
  - : It has its own key “(team) name”
- “Plays-On” (by double diamond) is a **weak** relationship.

<br>

### Weak Entity Type : Properties

- Weak entity type은 Owner와 M : 1 (1 : 1) 관계
- Weak entity type은 항상 total participation
- Weak entity type의 Key는?
  - Key of Owner + Partial Key of Weak entity type
  - (Partial key는 owner key의 도움을 받아 weak entity들을 식별할 수 있는 일종의 부분 key를 의미)
- Existence Dependency
  - (Weak entity의 존재는 owner에 종속됨. 만약 어떤 owner entity가 DB에서 삭제되면, 이와 relationship 을 갖는 weak entity들 모두 역시 삭제되어야 함)

<br>

- ⚫ “Teams” 의 key는?
- “Players” 의 partial key는?
- “Players” 의 key는?
- 만약 어떤 team이 해체 (즉 DB에서 삭제)된다면?

<br>

### Weak Entity Types : Exercise

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f136db46-043b-448a-a0dd-4df05ed99378">

<br>

- 어느 회사 사원들의 가족(DEPENDENT)들임.
- 이들의 key를 찾을 수 없음.
- 위의 ER Diagram을 완성시켜라. (Owner Entity type? 즉, 이 가족들을 부양하는 사원(EMPLOYEE))

<br>

## Attributes on Relationship : Example

- We want add “grade” attribute; Where to attach?
- Thus, a relationship can also have its own attributes;
- Sometimes, it is useful to attach an attribute to relationship;

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b3e301b5-9c55-4ac5-a8d0-33e926244077">

<br>

## Subclass and Superclass

- 일반적으로 한 entity type은 여러 개의 의미있는 이에 속한 sub-entity type 들로 group화 할 수 있음.
- 예 : EMPLOYEE를 다음과 같이 group화 함.
  - {SECRETARY, ENGINEER, TECHNICIAN}
  - Each of these groupings is a subset of EMPLOYEE entities
  - Each of these grouping is called a subclass of EMPLOYEE
  - EMPLOYEE is the superclass for each of these subclasses

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f986a463-2dbc-4ffa-ab24-b31eb203ba7a">

<br>

- Subclass와 superclass 관계를 IS-A (혹은 Inclusion) relationship 라고 함. IS-A는 로, Inclusion은 로 표기함
- Subclass에 속한 한 entity는 superclass에 속한 어떤 entity와 실제로는 같은 entity임.
- Subclass에 속한 모든 entity들은 superclass에 속해야 함. (즉, subclass에 속했지만, superclass에는 속하지 않은 entity는 존재할 수 없음)
- Superclass에 속한 모든 entity들이 반드시 어떤 subclass에 속할 필요는 없음.

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8a0c23a9-18c3-46c2-bb84-739a586329f7">

- Relationship between subclass and superclass : **IS_A**
  - SECRETARY “eve” IS-A EMPLOYEE “eve”;
  - ENGINEER “joe” IS-A EMPLOYEE “joe”;
  - TECHNICIAN “bob” IS-A EMPLOYEE “bob”;

<br>

- 각 subclass는 superclass 보다 더 적은 entity들을 가짐.
- 각 Subclass는 superclass 보다 더 많은 attribute들을 가짐
  - (즉 superclass의 attribute들 외에 자신만의 고유한 attribute들을 추가로 가질 수 있음.)
- 예 : 각 class는 다음의 attribute들을 가짐.
  - EMPLOYEE : {SSN, Name, Age, Phone}
  - SECREATRY : {SSN, Name, Age, Phone} ∪ {Type-Speed}
  - ENGINEER : {SSN, Name, Age, Phone} ∪ {Eng-Type}
  - TECHINICIAN : {SSN, Name, Age, Phone} ∪ {T-Grade}
- 위의 요구사항을 어떻게 ER modeling 할까?

<br>

# Inheritance

- An entity that is member of a subclass inherits all attributes of the entity as a member of the superclass
- It also inherits all relationships
- It also inherits all functions (= programs)
- It also has its own relationship with other classes
  - Example: BELONG-TO_UNION of SALARY_EMP
- By inheritance, we can reuse existing ER schema for building new ER schema;
  - (Thus, we can avoid unnecessary database redesign.)

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9b9874ff-4109-48bb-ba00-b5aef8749a88">

<br>

- Each subclass SECRETARY, ENGINEER, TECHINICAIN inherits all attributes from its superclass EMPLOYEE

<br>

## Multiple Inheritance

- Single Inheritance
  - Every subclass has only one superclass.
  - It forms a class hierarchy (= like tree).
- Multiple Inheritance
  - A subclass can have more than one superclasses.
  - A subclass can inherit attributes of each of its superclasses.
- 즉, 각 superclass는 자기 자신 고유의 이질적인 특성들을 가질 수 있음.

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/38c0b7f4-fc83-41e5-b98b-86747a5a9843">

- A subclass STUD-ASSISTANT can inherit all attributes from both EMPLOYEE and STUDENT superclasses. 

<br>

# Specialization

- Process of defining a set of subclasses from superclass
- Top-Down (= Refinement) Modeling
- Based on IS_A relationship
- A subclass inherits attributes of its **all direct** or **indirect** superclasses
- Example: {SECRETARY, ENGINEER, TECHNICIAN} is a specialization of EMPLOYEE based upon job type.
- Example: {SALARY_EMP, HOURLY_EMP} is a specialization of EMPLOYEE based in payment type

<br>

## Specialization : Company

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dbc27d97-1117-41fc-a85c-4546f235f0f0">

<br>

## Specialization : University

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3ca941d1-9289-4535-9052-69dc7f4af0d5">

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/17e6c723-cd91-4239-a4b0-39d76f75017d">

<br>

# Example

- ER Diagram : COMPANY Databases

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e1972097-c5b2-48aa-884b-fb61303c2005">

<br>

- ER Diagram : BANK Databases

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c63fdba7-4856-46f0-98df-241fbe13b4bc">
