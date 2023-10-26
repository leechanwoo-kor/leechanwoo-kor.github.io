![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b927cd78-32c4-48af-8bb8-11a672925627)# 1. 다음 relation은 모두 4 개의 tuple들로만 이루어졌다고 가정한다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/13f45497-f354-40fb-adb4-c83fda2247d6)

<br>

- (1) Super key가 될 수 있는 것을 (모두 찾아) 명시하라.
  - {A, C}, {D}, {A, B, C, D}, {A, C, D}, {A, B, C}, {A, C, D}, {A, B, D}, {A, C, D}, {A, D}, {B, D}, {B, C, D}, {C, D}
- (2) Key가 될 수 있는 것을 (모두 찾아) 명시하라. 그리고 (적절한 가정하에서)primary key를 명시하라.
  - {A, C}, {D}
  - Primary Key : {D} (Single key를 선택하는 것이 좋음. 그 이유는?)
- (3) 위의 relation에 새로운 tuple을 insert 할 때 Key Integrity와 Entity Integrity를 각각 위반하는 예를 보여라. 그리고 Key Integrity와 Entity Integrity 모두를 위반하는 예를 보여라.
  - Key Integrity 위반:
    - Insert <a1, b2, c1, d5>, Insert <a3, b2, c1, d1>, . . 등
  - Entity Integrity 위반:
    - Insert <a4, b2, c1, NULL>, Insert <a4, b2, c2, NULL>, .
  - Key/Entity Integrity 모두 위반 :
    - Insert <a1, b2, c1, NULL>, Insert <a2, b2, c1, NULL>, . . 등
 
<br>

# 2. 다음은 Relation들이 준수해야 하는 무결성(integrity) 제약조건이다. 각 무결성의 의미가 무엇인지 설명하라.
- Key Integrity
- Entity Integrity
- Referential Integrity

<br>

# 3. 다음 relation들을 참조하라. 단, 밑줄은 Primary Key를 나타낸다.

학생(**학번**, 학생명, 전공)
수강(**학번, 과목번호**)
과목(**과목번호**, 과목명, 학점)

- (1) Foreign key들을 명시하라.
  - 학생: 없음
  - 수강: 학번, 과목번호
  - 과목: 없음
- (2) 만약 어떤 과목 정보(예:과목번호)이 변경된다면 어떤 일이 발생하는가?
  - 어떤 과목의 번호가 100번에서 200번으로 변경되면, 수강에서 100번을 참조한 tuple들은 참조 무결성 위반됨
- (3) 만약 어떤 학생이 삭제된다면 어떤 일이 발생하는가?
  - 어떤 학생이(예: 학번 123456)이 삭제된다면, 수강에서 이 학번을 참조한 tuple들은 참조 무결성 위반됨

<br>

# 4. 다음의 relation들을 참조하여 Foreign Key를 나타내라. 단, 밑줄은 Primary Key를 나타낸다.

서적 (**서적번호**, 서적명, 가격)
저자 (**저자명**, 주소, 전화)
저서 (**서적번호, 저자명**)
서적사본 (**서적번호, 도서관명**, 사본갯수)
대여 (**서적번호, 도서관명, 카드번호**, 대여일, 반환일)
도서관 (**도서관명**, 주소)
대여자 (**카드번호**, 이름, 주소, 전화)

- Foreign key들은 다음과 같음.
  - ‘저서’ 에서 {서적번호}, {저자명} (2개)
  - ‘서적사본’ 에서 {서적번호}, {도서관명} (2개)
  - ‘대여’ 에서 {서적번호}, {도서관명}, {카드번호} (3개)
 
<br>

# 5. 다음의 relation들과 주어진 제약조건을 참조하라.

선수 (선수명, 소속팀명, 나이)
자동차 (번호판, 모델명, 소유자명, 직장명)

제약조건:
1) 자동차의 소유자명과 선수의 선수명은 서로 같은 data type이다.
2) 자동차의 직장명과 선수의 소속팀명은 서로 같은 data type이다.
3) 자동차는 {소유자명, 직장명} 값을 통해 선수들을 참조한다.
4) 선수의 유일한 key는 {선수명, 소속팀명} 이고, 자동차의 유일한 key는 번호판이다.
5) 각 선수는 최대 2 대의 자동차를 소유하고, 각 자동차의 소유자는 단 한 명이며 반드시 있어야 한다.

<br>

## 5.1. 위의 각 relation에 tuple들의 예를 각각 5 개 이상 기입하라.

- 선수

|선수명|소속팀명|나이|
|:---:|:---:|:---:|
|김철수|삼성|25|
|홍길동|LG|30|
|김철수|LG|25|
|홍길동|삼성|28|
|홍길동|SK|33|

- 자동차

|번호판|모델|소유자명|직장명|
|:---:|:---:|:---:|:---:|
|123|모닝|김철수|삼성|
|234|모닝|홍길동|LG|
|345|소나타|김철수|LG|
|456|소나타|홍길동|삼성|
|567|소나타|홍길동|SK|

<br>

## 5.2. 위의 relation에서 primary key와 foreign key를 명시하라.

- 선수 :
  - Primary Key: {선수명, 소속팀명}
  - Foreign Key: 없음
- 자동차 :
  - Primary Key: {번호판}
  - Foreign Key: {소유자명, 직장명}

## 5.3. 위의 relation들을 ER schema로 변환하여 그려라. 즉 원래의 ER schema가 무엇이었는지 그려라. 

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0b6152a4-36db-418f-bbf9-7523bdc47eb5)

<br>

- 선수의 PK는 {선수명, 소속팀명}, 자동차의 PK는 {번호판};
- ER schema에는 FK를 명시하지 않음. 즉 선수와 자동차의 relationship만 도출함. FK는 이 ER schema를 relation 구조로 변환하는 과정에서 도출됨.

<br>

# 6. 다음의 각 연산을 수행한 결과에 생성될 수 있는 tuple의 최소 개수와 최대 개수를 각각 계산하라. Relation R1 과 R2의 tuple 개수는 각각 N1 과 N2이고, N1 > N2 > 0 이다.

- (1) R1 – R2
  - 최소: N1 - N2
  - 최대: N1
- (2) R1 ∪ R2
  - 최소: N1
  - 최대: N1 + N2
- (3) R1 ⋈ R2
  - 최소: 0
  - 최대: N1 * N2

<br>

# 7. 다음 각 연산을 Relation R에 수행한 결과에 생성되는 tuple들의 최소 개수와 최대 개수를 각각 계산하라. 단 R의 tuple들의 수는 N이다. (단 A, B는 R에 있는 임의의 attribute 이름이다.)

- (1) $\sigma_{A=5 AND B=5}(R)$
  - 최소: 0 개
  - 최대: N 개
- (2) $\pi_{A, B}(R)$
  - 최소: 1 개
  - 최대: N 개

<br>

# 8. 다음 relation 들을 참조하여, 각 query를 relational algebra 식으로 표현하라.

교수 (교수명, 나이)
수강 (학번, 과목번호)
학생 (학번, 학생명)
강의 (교수명, 과목번호)

## 8.1. ‘김응모’가 강의하는 과목들을 강의하는 교수들의 이름을 검색하라.

$T = \pi_{과목번호}(\sigma_{교수명=김응모}(강의))$ // 김응모가 강의하는 과목들의 과목번호들
$Result = \pi_{교수명} (T \bowtie_{과목번호=과목번호} 강의)$ // T에 있는 과목들을 강의하는 교수명들

## 8.2. ‘김응모’가 강의하지 않는 과목들만을 모두 듣는 학생들의 이름을 검색하라.

- $T1 = \pi_{과목번호} (강의)$ // 현재 개설된 모든 과목들의 과목번호들
- $T2 = \pi_{과목번호} (\sigma_{교수명=김응모}(강의))$ // 김응모가 강의하는 과목들의 과목 번호들
- $T3 = T1 - T2$ // 김응모가 강의하지 않는 과목들의 과목번호들
- $T4 = (수강 \bowtie_{과목번호=과목번호} T2)$ // 김응모가 강의하는 과목들을 듣는 학생들
- $T5 = 수강 - T4$ // 김응모가 강의하지 않는 과목들을 듣는 (모든) 학생들
- $T6 = T5 ÷ T2$ // 김응모가 강의하지 않는 과목들만을 모두 듣는 학생들
- $Result = \pi_{학생명} (T6 \bowtie_{학번=학번} 학생)$ // 김응모가 강의하지 않는 과목들만을 모두 듣는 학생들 이름

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/961332c1-a505-4149-8fa6-1da619c2d276)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/761a0f94-2a17-4780-a71d-bcad9a9e8507)

<br>

# 9. 앞의 그림 3.6의 COMPANY 데이터베이스를 참조하여, 다음 각 query에 대해 Relational Algebra 명령문을 작성하고, 각 query의 결과값이 무엇인지 적어라.

## 9.1. Retrieve the names of employees in department 5 who work more than 10 hours per week on the 'ProductX' project

- $TEMP1 = (\sigma_{Pname='ProductX'} (PROJECT)) \bowtie_{Pnumber=Pno} (WORKS_ON)$
- $TEMP2 = EMPLOYEE \bowtie_{SSN=ESSN} (\sigma_{Hours > 10} (TEMP1))$
- $RESULT = \pi_{Lname, Fname} (\sigma_{DNO=5} (TEMP2))$

- Result:

|Lname|Fname|
|:---:|:---:|
|Smith|John|
|English|Joyce|

<br>

## 9.2. Retrieve the names of employees that are directly supervised by 'Franklin Wong'.

- $TEMP1 = \pi_{SSN} (\sigma_{Fname = 'Franklin' AND Lname = 'Wong'} (EMPLOYEE))$
- $TEMP2 = (EMPLOYEE) \bowtie_{SuperSSN = SSN} (TEMP1)$
- $RESULT = \pi_{Lname, Fname} (TEMP2)$

<br>

## 9.3. Retrieve the names of employees who have a dependent with the same sex as themselves.

- $TEMP1 = (EMPLOYEE) \bowtie_{(SSN = ESSN) AND (sex = sex)} (DEPENDENT)$
- $RESULT = \pi_{Lname, Fname} (TEMP1)$

- Result:

|Lname|Fname|
|:---:|:---:|
|Smith|John|
|Franklin|Wong|

<br>

## 9.4. Retrieve the names of employees who work on every project whose location is in ‘Houston’.

- $TEMP1 = \pi_{ESSN, Pno} (WORKS_ON)$
- $TEMP2 = \pi Pnumber(\sigma_{ Plocation = ‘Houston'} (PROJECT))$
- $TEMP3 = TEMP1 \div TEMP2$
- $RESULT = \pi_{Lname, Fname} (EMPLOYEE \bowtie_{SSN = ESSN} TEMP3)$

- Result:

|Lname|Fname|
|:---:|:---:|
|Franklin|Wong|

<br>

## 9.5. List the names of department managers who have no dependents.

- $TEMP1 = \pi_{Mgr-SSN} (DEPARTMENT)$
- $TEMP2 = \pi_{ESSN} (DEPENDENT)$
- $TEMP3 = TEMP1 – TEMP2$
- $RESULT = \pi_{Lname, Fname} (EMPLOYEE \bowtie_{SSN = Mgr-SSN} TEMP3)$

- Result:

|Lname|Fname|
|:---:|:---:|
|Borg|James|

<br>

## 9.6. Retrieve the names and addresses of employees who work on at least one project located in Houston, but whose department has no location in Houston.F

- $TEMP1 = \pi_{ESSN} (WORKS_ON \bowtie_{Pno=Pnumber} (\sigma_{Plocation='Houston’} (PROJECT)))$
- $TEMP2 = \pi_{Dnumber}(DEPARTMENT) – \pi_{Dnumber}(\sigma_{Dlocation='Houston'} (DEPARTMENT))$
- $TEMP3 = \pi_{SSN}(EMPLOYEE \bowtie_{Dno = Dnumber} (TEMP2))$
- $TEMP4 = TEMP1 \cap TEMP3$
- $RESULT = \pi_{Lname,Fname,Address} (EMPLOYEE \bowtie_{SSN = ESSN} TEMP4)$

- Result:

|Lname|Fname|Address|
|:---:|:---:|:---:|
|Wallace|Jennifer|291 Berry, Bellaire, TX|

<br>

## 9.7. Retrieve the last names of employees who do not work on any project.

- $TEMP1 = \pi_{SSN} (EMPLOYEE)$
- $TEMP2 = \pi_{ESSN} (WORKS_ON)$
- $TEMP3 = TEMP1 – TEMP2$
- $RESULT = \pi_{Lname} (EMPLOYEE \bowtie_{SSN = SSN} (TEMP3))$

- Result: Empty

|Lname|
|:---:|
|NULL|

<br>

# 10. 다음의 ER schema를 relational schema로 변환하라. 각 relation schema 에서 반드시 PK를 명시하고, FK (혹시 있는 경우만)를 또한 명시할 것

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/617c8aa1-79c8-4763-8d46-b17ff42646e3)

<br>

- BANK (**Code**, Name, Addr), FK: 없음
- BANK_BRANCH (**Branch-No, Code**, Addr),  FK: {Code}
- ACCOUNT (**AccNo**, Balance, Type, Branch-No, Code), FK: {BranchNo, Code}
- CUSTOMER (**SSN**, Name, Phone, Age), FK: 없음
- A-C (**Acc-No, SSN**), FK: {AccNo}, {SSN}
- LOAN (**Loan-No, Branch-No, Code, Amount, Type**), FK: {BranchNo, Code}
- L-C (**LoanNo, SSN**), FK: {LoanNo}, {SSN}

<br>

# 11. 다음의 relation들을 참조하여, 아래의 각 relational algebra 표현식과 동등한 SQL 표현식으로 변환하라.

R (A, B, C)
S (D, E, F)

- (1) $\pi_{A}(R)
  - SELECT DISTINCT A FROM R
- (2) $\sigma_{A = 17} ((\sigma_{C = 17} (R)))$
  - SELECT * FROM R WHERE C = 17 AND A = 17
- (3) $\pi_{A, F} (\sigma_{C = D} (R × S))$
  - SELECT A, F FROM R, S WHERE R.C = S.D
