---
title: "[Database] Relational Schema Design ER to Relational Mapping"
categories:
  - Database
tags:
  - Relational Schema Design
  - ER
  - Relational Mapping
toc: true
toc_sticky: true
toc_label: "Relational Schema Design"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3afe0a4-ef5a-4cbe-a983-bd03933e03ec)

<br>

**ER schema**

<img width="1033" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/26b1f34c-4781-415c-85a5-8e18ee2fa4fb">

<br>

**Mapping Result : Relational schema**

<img width="1033" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2d35cb54-6ca0-4e17-a74f-031a7ec790a7">

<br>

**What to Map?**

- (Regular) Entity Types
- Weak Entity Types
- Binary 1 : M Relationships
- Binary M : N Relationships
- Binary 1 : 1 Relationships
- Recursive Relationships
- Multi-Valued Attributes
- Superclass/Subclass : IS-A Relationship

<br>

**Mapping Guidelines**

- Need to satisfy the following constraints;
  - 1 : M, M : N, 1 : 1 relationship
  - Total / Partial participation
  - Key Integrity
  - Referential Integrity
- Avoid many null values.
- Consider performance (= retrieval time).
- Avoid redundancy

<br>

# Entity Types

- For regular entity type E, create a relation R that includes all the simple attributes of E.
- Choose one of the keys of E as primary key (PK) for R.
- If the chosen key of E is composite, the set of simple attributes that form it will together form the PK of R.
- Each entity in E corresponds a row (tuple) in R
- Each attribute in E corresponds a column (attribute) in R

<br>

<img width="1033" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5990403f-1d2b-45c4-8458-2fea1a2f43c9">

<br>

# Weak Entity Types

- For weak entity type W, create a relation R and include all the attributes of W.
- Find W’s owner entity type E;
- Include as foreign key (FK) of R the PK of the owner E.
- PK of R is {PK of owner E, partial key of R}

<br>

<img width="1033" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7ace6dfa-dba4-4a0d-a8f6-1611d0fce502">

<br>

# 1 : M Relationship

## Total/Total

- Case 1 : Both sides are ‘Total’:
  - For 1 : M relationship R, create a relation S representing the entity type at the “M-side” of the relationship.
- Include as FK in S the PK of the relation T that represents the entity type at the “1 – side”.
  - : Why? This is because we must satisfy key integrity;
- Include any simple attributes of the 1 : M relationship as attributes of S.

<br>

<img width="1040" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ef91c361-4d4c-4c9e-a300-f08a180569fa">

<br>


## Partial/Partial

- Case 2 : Both sides are ‘Partial’
  - For 1 : M relationship R, create a new relation S to represent R.
- Include as FK in S the PKs of each relations that represent the participating entity types;
  - : Why? This is because we need to avoid many null values.)
- Also, include any simple attributes of the relationship type R as attributes of S.

<br>

<img width="1040" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ac136b2f-1432-416a-a7a4-c6e365ad4339">

<br>

<img width="1040" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/43d39f9f-a8cf-4923-9dbe-3f36eeaa4991">

<br>

# M : N Relationship

- For M : N relationship R, create a new relation S to represent R.
- Include as FK in S the PKs of each relations that represent the participating entity types;
- The combination of each FKs will form the PK of S.
- Also, include any simple attributes of the M : N relationship type as attributes of S.

<br>

<img width="1040" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/adb24edd-66d9-4f00-bcc3-e5385487f19d">

<br>

# 1 : 1 Relationship

For 1 : 1 relationship R, create the relations S and T that correspond to the entity types participating in R.

- Case 1. Foreign Key : Two Relations
  - The one side (say, S) is total and the other side (say, T) is partial.
  - Include as FK in relation S the PK of relation T.
- Case 2. Merge relations : Single Relation
  - Both sides (say, S and T) are total.
  - Merge two relations S and T and their relationship into a single relation.
- Case 3. Create a new relation : Three Relations
  - Both sides (say, S and T) are partial.
  - Create a new relation R by including the PKs of the relations S and T. 

<br>

<img width="1040" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/11d64580-1d23-430d-b879-29d5b5d9cdbb">

<br>

<img width="1040" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/41fca175-46ea-4a26-8717-ba4711a159b4">

<br>

<img width="1040" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/356ff30a-7c74-4b85-ab27-0f7ce46856dc">

<br>

# Recursive

## 1 : M Relationship

<img width="1061" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/78de2d34-04b7-4461-ae88-1e8ba44c34de">

<br>

## 1 : 1 Relationship

<img width="1061" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/36728bef-d7c2-4b5b-8d71-90707002fc4a">

<br>

## M : N Relationship

<img width="1061" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ebaca484-919f-4028-9074-b59536c4c8a8">

<br>

## Recursive Relationship: Exercise

<img width="1061" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/58adf3aa-23d0-4c27-870f-2479e9bd7499">

<br>

# Multi-Valued Attributes

- For each multi-valued attribute A, create a new relation R.
- R includes the attribute A, plus the PK K of the relation S that represents the entity type including A. Then, remove A from the relation S.
- The PK of R is {A, K} where K is FK.
- If the multi-valued attribute is composite, we include its simple components.

<br>

<img width="1061" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b4ee1582-f101-4e5b-9d77-17589acc8f67">

<br>
