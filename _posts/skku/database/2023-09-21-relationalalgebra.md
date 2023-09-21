---
title: "[Database] Relational Algebra"
categories:
  - Database
tags:
  - Relational Algebra
toc: true
toc_sticky: true
toc_label: "Basic Concepts"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3afe0a4-ef5a-4cbe-a983-bd03933e03ec)

<br>

# Relational Algebra

- Relation database 에 대해 **질의(query)** 처리 연산자들의 모임을 relational algebra 라 함.
- Query는 relation에서 원하는 정보를 **검색(retrieve)**하는 조건을 명시하는 명령문
- (1 개 혹은 여러 개의) **입력 relation**에 대해 질의 연산의 **결과**인 (1 개의) **출력 relation** 이 생성됨.
- 기본적으로 8 개의 검색 연산자들로 구성됨.
- 이 연산자들은 Query language인 SQL의 검색 연산 과정을 실현하는데 매우 중요함.

<br>

- Query Operators
  – SELECT($\sigma$)
  – PROJECT ($\pi$)
  – Set Operators : UNION($\cup$), DIFFERENCE(–), INTERSECTION($\cap$)
  – Cross Produt($\times$)
  – JOIN($\bowtie$)
  – DIVISION($\div$)

<br>

# SELECT ($\sigma$)

- SELECT($\sigma$)는 단일 relation에서 주어진 조건을 만족하는 tuple들만을 선택하여 출력.
- 표기 방법 : $\sigma_{<condition>} (R)$
  - R 은 relation 이름, <condition>은 조건식
  - <condition>은 term들을 AND, OR, NOT 등으로 연결
  - 각 term은 다음과 같이 표현.
    - attribute op value
    - attribute op attribute
- 단, op 는 {=, $\neq$, >, $\geq$, <, $\leq$} 의 비교 연산자

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/21814c69-fc1a-47df-af33-c27c174f0a28">

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a0238438-ae75-42c2-a213-6c94800e85a7">

<br>

# PROJECT ($\pi$)

- PROJECT($\pi$)는 단일 relation에서 원하는 attribute들만을 출력
- 표기 방법 : $\pi$ <list> (R)
  - <list>는 relation R에서 원하는 attribute들 리스트.
  - 이 리스트에 없는 attribute들은 소거되어서 결과에 나옴.
  - Relation을 수직 분할(vertical partition) 함.
  - 즉 relation의 attribute들이 여러 개의 그룹으로 분할 됨.
  - 예 : employee들을 {SSN, name, age}, {SSN, name, salary} 2 개의 그룹들로 분할;

<br>

- PROJECT는 연산 결과에서 중복(duplicated) tuple들이 발생되면, 이들을 하나만 생성되게 소거함.
- 그 이유는 relation은 “set of tuples” 로 정의되기 때문
  - : “All tuples in a relation must be distinct”
- Question : 실제 응용에서 중복 tuple들을 꼭 소거할 필요가 있을 까? SQL 에서는 어떨까?
- |$\pi$ <list> (R)| ≤ |R|
- If <list> includes a key of R, then |$\pi$ <list> (R)| = |R|
  - 예: $\pi$ <SSN, age> (EMPLOYEE)

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/47a1be9f-cf03-4200-80a9-c17b3469dbc3">

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2e2fe5d9-0306-4670-b075-07fb0cba595b">

<br>

# How to Express?

- Relational algebra의 2 가지 표현 방식
  - (1) 연산들을 nesting하여 한꺼번에 표현.
  - (2) 한번에 하나씩 연산들을 표현하면서 단계별로 표현.
  - (단, 이 경우 중간 결과를 저장하기 위한 relation 이름 지정 필요)
- 예:
  - Get the salary of employees who work in department # 5.
  - 방식 (1) : $\pi_{salary} (\sigma_{DNO=5} (EMPLOYEE))$
  - 방식 (2) : DEP5_EMPS $\leftarrow$ $\sigma_{DNO=5} (EMPLOYEE)$
  - RESULT $\leftarrow$ $\pi_{salary} (DEP5_EMPS)$

<br>

# UNION ($\cup$)
- R $\cup$ S includes all tuples that are either in relation R or in S.
  - R $\cup$ S = {t | t $\in$ R or t $\in$ S}
- Duplicate tuples are eliminated.
- Get the SSNs of all employees who either work in department 5 or whose salary is greater than $30,000.
  - DEP5_EMPS $\leftarrow$  SSN ( DNO=5 (EMPLOYEE))
  - HIGH_SAL_EMPS $\leftarrow$  SSN ( SALARY > 30000 (EMPLOYEE))
  - RESULT $\leftarrow$ DEP5_EMPS  HIGH_SAL_EMPS 

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a38f5c6f-ddb5-4fbd-81e5-ebad2daf4887">

<br>

# INTERSECTION ()

- R  S includes all tuples that are in both R and S.
  - R  S = {t | t  R and t  S}
- Duplicate tuples are eliminated.
- Get the SSNs of all employees who work in department 5 and whose salary is greater than $30,000.
  - DEP5_EMPS  SSN ( DNO = 5 (EMPLOYEE))
  - HIGH_SAL_EMPS  SSN (SALARY > 30000 (EMPLOYEE))
  - RESULT  DEP5_EMPS  HIGH_SAL_EMPS

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c3b43ff2-4cf3-4c38-a136-0828729c8926">

<br>

# DIFFERENCE (–)

- R – S includes all tuples that are in R, but not in S.
  - R – S = {t | t  R and t  S}
- Duplicate tuples are eliminated.
- Get the SSNs of all employees who work in department 5, but whose salary is not greater than $30,000.
  - DEP5_EMPS  SSN ( DNO=5 (EMPLOYEE))
  - HIGH_SAL_EMPS  SSN (SALARY > 30000 (EMPLOYEE))
  - RESULT  DEP5_EMPS – HIGH_SAL_EMPS

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b4ad13fc-6a80-4f6c-a883-bde08a0595a6">

<br>

# Cross Product (x)

- R x S combines both tuples from relation R and S.
  - R x S = {rs | r  R and s  S}
- 즉, R (A1, A2, . . ., Am) x S (B1, B2, . . ., Bn) 의 결과는 Q (A1, A2, . . ., Am, B1, B2, . . ., Bn)로 정의됨. 단,
  - (1) Q는 (m + n) 개의 attribute들을 가짐.
  - (2) Q는 R과 S에 속한 각 tuple들을 모두 연결하여 합침
- If R has m tuples (|R| = m 로 표기) and S has n tuples, then, |R x S| = m * n .

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/53a6b4ae-5982-49f8-9e73-24e8f04476e7">

<br>

# JOIN ( )

- R(A1, A2, . . ., An)과 S(B1, B2, . . ., Bm)의 JOIN은 다음과 같이 표기.
  - R S
- R과 S의 JOIN 결과인 Q (A1, A2, . . ., An, B1, B2, . . ., Bm)는 단,
  - (1) Q는 (m + n) 개의 attribute들을 가짐.
  - (2) Q는 R과 S에 속한 각 tuple들 중 join condition을 만족하는 것들만 연결하여 합침.
- <join condition>은 다음과 같이 표현.
  - Ai op Bj (단, op ∊ {=, , >, , <, })
- Ai 와 Bj 는 join attribute라 하며, 각각 R과 S에 속하고, Ai 와 Bj 는 서로 같은 domain을 가짐.

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a7acdaec-bbe5-49a7-989a-1882a312fb6b">

<br>

## Condition Join

- Get flights information connecting from Seoul to Guam.

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/232db8e2-b191-40da-852b-427d7a556e34">

<br>

## Equi-Join

- Get managers information for each department.

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a41630b7-3b80-4260-be32-9b88ee1b1ce9">

<br>

## Equi-Join : Self Join

- Get the names and ages of direct supervisors of employees with age = 52.

<br>

<img width="1103" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a29676a7-52e3-45ba-8f81-ec82adbf088d">

<br>

### Exercise

<img width="1100" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/59fb4336-d96d-4cbc-b349-b4aae45a53d5">

<br>

- Get SIDs of students who enroll courses;
  - $\pi_{SID} (ENROLL)$
- Get names of students who enroll courses;
  -  sname (ENROLL STUDENT) ⋈ SID = SID
- Get names of students who enroll “DB” course;
  -  sname (( cname=DB (COURSE)) ENROLL STUDENT)) CID = CID SID = SID

<br>

# DIVISION ()
⚫ Division : R(Z)  S(X) = T(Y) where X ⊆ Z;
- Let Y = Z – X; Thus, Z = X ∪ Y;
(즉, Y는 relation S에는 없고, R에만 속한 attribute(s))
⚫ 위 DIVISION 연산의 결과는 relation T(Y) 임. 단,
- T(Y) includes a tuple t if tuples tR appear in R with
tR[Y] = t and with tR[X] = tS
for every tuple tS
in S.
- For a tuple t to appear in T(Y), the values in t must
appear in R in combination with every tuple in S.
⚫ DIVISION is useful for special kind of query that satisfy
“all …. condition”

<br>

<img width="1100" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7b559c2b-80e6-465e-a2cd-8de5232a6398">

<br>

- Get SSNs of employees who work on all the projects

<img width="1100" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/554930ba-fe44-4484-ac42-a62a0c7b1ceb">

<br>

## DIVISION : Exercise

<img width="1100" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/96e5fec0-7a5b-4b21-93db-1cbf8651e28d">

<br>

# Relational Algebra : Exercise

- Consider the following Company relational schema:
  - EMPLOYEE (eno, ename, age, super_eno, work_dno)
  - DEPARTMENT (dno, dname, phone, mgr_eno)
  - PROJECT (pno, pname, control_dno)
  - WORK-ON (eno, pno, hours)
- Construct relational algebra commands for following queries:
  - (1) Get names of employees whose age is 50.
  - (2) Get names of employees who work for ‘research’ department.
  - (3) Get names of employees who are supervised by ‘john’.
  - (4) Get names of managers of employees who work on ‘big data’ project.
  - (5) Get names of supervisors of employees who work on projects controlled by department 5.

<br>

<img width="1100" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/55911833-a825-4ae0-9ebc-2d1f77cd530f">

<br>

<img width="1100" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e84d9cd4-2aba-4e5b-8589-24adfa8624bd">

<br>

<img width="1100" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3dec121-4fbd-4787-b72c-dde40a4d7eba">

<br>

# Exercise : Queries

- Q1 : Retrieve the name and address of employees who work for the ‘Research’ department.
  - RESEAR_DEPT   DNAME=’Research’ (DEPARTMENT)
  - RESEAR_EMPS  (RESEAR_DEPT EMPLOYEE)
  - RESULT   FNAME, LNAME, ADDRESS (RESEAR_EMPS)
- Q2 : Retrieve the names of employees who have no dependents.
  - ALL_EMPS   SSN (EMPLOYEE)
  - EMPS_WITH_DEPS(SSN)   ESSN(DEPENDENT)
  - EMPS_WITHOUT_DEPS  (ALL_EMPS – EMPS_WITH_DEPS)
  - RESULT   LNAME, FNAME (EMPS_WITHOUT_DEPS EMPLOYEE)

<br>

- Q3 : Retrieve the name of employees who work on all the projects controlled by department 5.
  - DEPT5_PROJ (PNO)   PNUMBER ( DNUM = 5 (PROJECT))
  - EMP_PROJ (SSN, PNO)   ESSN, PNO (WORK_ON)
  - RESULT_EMP_SSN  EMP_PROJ  DEPT5_PROJ
  - RESULT   LNAME, FNAME (RESULT_EMP_SSN EMPLOYEE)
- Q4 : Retrieve the name of managers who have at least one dependent.
  - MGR (SSN)   MGRSSN (DEPARTMENT)
  - EMP_WITH_DEP (SSN)   ESSN (DEPENDENT)
  - MGR_WITH_DEP  MGR  EMP_WITH_DEP
  - RESULT   LNAME, FNAME (MGR_WITH_DEP EMPLOYEE)
 
<br>

Q5 : 위치가 Houston인 부서에서 근무하고 급여가 35,000보다 적게 받는 사원들의 부양가족들의 이름을 구하라.
Q6 : 남자 사원들의 직속 상사이면서, 각 부서의 manager가 수행하는 프로젝트의 이름과 위치를 구하라.
Q7 : Alice의 부모 (단, Alice와 성별이 다름)의 직속 상사가 근무하는 부서의 manager의 이름을 구하라.
Q8 : 본인의 직속 상사와 급여가 같은 사원들의 SSN을 구하라.
Q9 : Research 부서에서 근무하는 여자 사원들이 모두 담당해서 수행하는 프로젝트들의 이름을 구하라.
Q10 : 모든 사원들의 SSN, 이름, 급여, 주소를 구하라. 단, 이들 중 manager가 있다면 이들의 SSN, 이름, 주소, 급여, 관리 부서명도 함께 구해야 함. 
