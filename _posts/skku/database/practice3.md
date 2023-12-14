### 1. 다음 ‘지점’ weak entity type을 SQL CREATE TABLE 명령어를 이용하여 Table 구조로 변환하라. 모든 제약조건(key, foreign key, NOT NULL, . .등)들과 참조 무결성 위반 Trigger Action 명령어들을 모두 명시할 것. 단, 한 은행에 속한 지점들은 같은 지점번호를 가질 수 없다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b6619e33-46da-4623-97eb-e3d9e340e63f)

```
CREATE TABLE 지점 (
  지점명 : CHAR(10)
  지점번호 : INTEGER NOT NULL
  은행명 : CHAR(10) NOT NULL
  PRIMARY KEY (지점번호, 은행명)
  FOREIGN KEY 은행명 REFERENCES 은행
  CASCADE ON DELETE
  CASCADE ON UPDATE
)
```

- 지점은 weak entity type임
- 따라서 (지점번호, 은행명)이 primary key이고, 반드시 NON NULL로 명시
- 만약 어떤 은행 tuple이 delete되면 이를 참조한 지점 tuple들 역시 함께 삭제되어야 하므로 반드시 CASCADE로 명시해야 함
  - 그 이유는 weak entity의 존재는 owner에 종속되는 Existence Dependency 때문
  - Update인 경우도 마찬가지
 
<br>

### 2. SQL에서 사용되는 table은 그 안에 중복되는 (즉, 동일한 값을 갖는) tuple(= row)들을 허용한다. (참고로 relation은 모든 tuple들이 상이하다.) 왜 허용을 하는지 그 이유를 상세히 설명하라.

SQL does not remove duplicate tuples in query result: Why?
- Duplicate removal is expensive; (Sort and elimination cost!)
- Users want to see duplicate tuples in the result of query.
- When aggregate function (ie., sum, avg) is applied, we need to keep duplicated tuples.

<br>

### 3. SQL에서 사용하는 NULL 값의 3 가지 유형에 대해 각각 설명하라.

NULL represents missing values; It has 3 different meanings :
(1) Unknown (exists, but unknown):
- Someone has ‘blood-type’, but currently is not known.
(2) Unavailable (exists, but is withheld):
- Someone has ‘phone-number’ but does not want it to be listed.
(3) No applicable (undefined or non-existent):
- ‘spouse’ may be NULL for unmarried someone.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/61748fb2-9813-41a1-8dac-3a4bbd041dc6)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f6f19f88-43d9-4180-bd86-69d4988a36d3)

<br>

### 4. 앞의 그림 3.6의 COMPANY 데이터베이스를 참조하여, 다음 각 query에 대해 SQL 명령문을 작성하고, 각 query의 결과값이 무엇인지 적어라. 

**(1) Retrieve the names of employees in department 5 who work more than 10 hours per week on the 'ProductX' project.**

```
  SELECT LNAME, FNAME
    FROM EMPLOYEE, WORKS_ON, PROJECT
   WHERE DNO = 5 AND SSN = ESSN AND PNO = PNUMBER
     AND PNAME = 'ProductX' AND HOURS > 10
```

```
Result:
Smith John
English Joyce
```

**(2) Retrieve the average salary of all female employees.**

```
  SELECT AVG(SALARY)
    FROM EMPLOYEE
   WHERE SEX = ‘F’
```

```
Result:
31000
```

**(3) Retrieve the total salary of all male employees who work for research department.**

```
  SELECT SUM (SALARY)
    FROM EMPLOYEE, DEPARTMENT
   WHERE Sex = ‘M’ AND Dname = ‘Research’
     AND Dno = Dnumber
```

```
Result: 108,000
```

**(4) For each department, retrieve the department name, and the average salary of employees working in that department.**

```
  SELECT DNAME, AVG (SALARY)
    FROM DEPARTMENT, EMPLOYEE
   WHERE DNUMBER = DNO
GROUP BY DNAME
```

```
Result: Research 33,250
Administration 31000,
Headquarters 55000
```

**(5) For each department whose average employee salary is more than $32000, retrieve the department name and the number of employees working for that department.**

```
  SELECT DNAME, COUNT(*)
    FROM DEPARTMENT, EMPLOYEE
   WHERE DNUMBER = DNO
GROUP BY DNAME
  HAVING AVG SALARY > 30000
```

```
Result: Research 4
Headquarters 1
```

**(6) Find the names of employees that are directly supervised by 'Franklin Wong’.**

```
  SELECT E.LNAME, E.FNAME
    FROM EMPLOYEE AS E, EMPLOYEE AS S
   WHERE (S.FNAME = 'Franklin’) AND (S.LNAME = 'Wong’)
     AND (E.SUPERSSN = S.SSN)
```

```
Result:
Smith John,
Narayan Ramesh,
English Joyce
```

**(7) For each project, list the project name and the total hours per week (by all employees) spent on that project.**

```
  SELECT PNAME, SUM(HOURS)
    FROM PROJECT, WORKS_ON
   WHERE PNUMBER = PNO
GROUP BY PNAME
```

```
Result: ProductX 52.5
ProductY 37.5
ProductZ 50.0
Computerization 55.0
Reorganization 25.0
Newbenefits 55.0
```

**(8) Retrieve the names of employees who do not work on any project.**

```
  SELECT LNAME, FNAME
    FROM EMPLOYEE
   WHERE NOT EXISTS ( SELECT *
                        FROM WORKS_ON
                       WHERE ESSN = SSN )
```

```
Result:
(empty)
```

**(9) List the names of employees who have a dependent with the same first name as themselves.**

```
  SELECT LNAME, FNAME
    FROM EMPLOYEE, DEPENDENT
   WHERE (SSN = ESSN) AND (FNAME = DEPENDENT_NAME )
```

Another possible SQL query uses nesting as follows:

```
  SELECT LNAME, FNAME
    FROM EMPLOYEE
   WHERE EXISTS ( SELECT *
                    FROM DEPENDENT
                   WHERE FNAME = DEPENDENT_NAME AND SSN = ESSN )
```

```
Result: (empty)
```

### 5. 다음은 어느 대학교에 관한 base table들이며, 물리적으로 저장되어 있다. 밑줄 그은 부분이 primary key 이다.

    학생 (**학번**, 학생명, 패스워드)
    등록 (**학번**, **과목명**, 학점)
    동아리 (**학생명**, **동아리명**, **가입년도**)

**(1) 위로부터 “등록한 학생들 중에서 B 학점을 받은 학생들의 정보”에 대한 view를 다음과 같이 정의했다고 하자.**

    B-학생(학번, 학생명, 과목명)

**만약 위의 view에서 <5000, 홍길동, DB>라는 tuple을 delete했다고 할 때, 이 갱신을 수락할 수 있는가 혹은 없는가? 해당되는 이유를 설명하라.**

위의 경우에 5000번 학번을 가진 홍길동이라는 학생이 이 학교에서 유일하다. 따라서 등록 테이블에서 <5000, DB, B>를 삭제하면 된다. 만약 이 학생이 학교를 그만 두었다면, 학생 테이블에서도 삭제한다. 따라서 갱신 가능하다.

**(2) 위로부터 “학생들 중에서 동아리에 가입한 학생들의 정보”에 대한 view를 다음과 같이 정의했다고 하자.**

    동아리-학생(학생명, 패스워드, 동아리명)

**만약 위의 view에서 <김철수, cskim@ece.skku, 테니스>라는 tuple을 delete 했다고 할 때, 이 갱신을 수락할 수 있는가 혹은 없는가? 해당되는 이유를 설명하라.**

위의 경우에 동아리-학생 테이블에서 다음과 같이 같은 이름을 가진 김철수 학생들이 존재할 수 있다.

|학생명|패스워드|동아리명|
|:---:|:------:|:-------:|
|김철수|cskim@ece.|테니스|
|김철수|cskim@math|테니스|
|김철수|cskim@ie|수영|
|홍길동|kdhong@ece|테니스|

여기서 base table 학생 혹은 동아리에서 문제에 주어진 학생의 tuple을 삭제해야 하는데, 여러 경우가 발생하는데, 어떤 경우에도 만족이 안 된다. 그 이유는 view를 만들 때 base table에 있는 key를 가져와야 하기 때문이다. 따라서 갱신 불가능하다. 위의 예제에 대해 base table을 만들어 직접 연습해볼 것. 참고로 PK와 FK 사이의 제약조건을 나타내는 referential integrity는 여기서 관련이 없는 사항이므로, 언급할 필요가 없다.

<br>

### 6. 다음 3 개의 tuple들로 된 R(A, B, C)을 참조하라.

|A|B|C|
|-|-|-|
|1|2|3|
|4|2|3|
|5|3|3|

**(1) R에서 성립하는 Functional Dependency(FD) 들을 모두 나열하라. (단 X → Y에서 Y ⊆ X인 trivial FD의 형태는 제외하라.)**
- A → B, A → C, B → C, {A, B} → C, {A, C} → B

**(2) R에서 성립하지 않는 FD들을 모두 나열하라.**
- B → A, C → A, C → B, {B, C} → A

**(3) R에 <1, 3, 3> tuple을 insert 했을 때, (1)에서 나열한 것들 중에서, FD의 정의를 위반하는 것들을 나열하라.**
- A → B, {A, C} → B

<br>

### 7. (1) 다음의 학생 relation에 주어진 각 제약조건을 FD로 표현하라.

    학생(학번, 전공, 지도교수)

**a) 각 전공에 대해, 각 학생은 단 1 명의 지도 교수를 갖는다.**
**b) 각 지도교수는 단 1 개의 전공을 지도한다.**

1) {학번, 전공} → 지도교수
2) 지도교수 → 전공

**(2) 위의 제약조건들을 모두 만족하는 tuple들의 예를 6 개 이상 적어라.**

|학번|전공|지도교수|
|:--:|:--:|:-----:|
|100|컴공|김응모|
|100|전기|홍길동|
|200|전자|정태명|
|300|컴공|김응모|
|300|전기|홍길동|
|400|전자|정태명|
|500|컴공|김응모|

(3) 위 relation에서 어느 정보가 중복(redundant)인지 설명하라.

- 어떤 교수가 여러 번 나오면 (예: 김응모가 n번 (지도학생이 n명이므로), 그 교수의 전공도 n번 출현함). 즉 각 교수의 전공 정보가 그 교수가 지도하는 학생 수만큼 여러 번 반복됨

### 8. Relation R에 대해 FD들의 집합 F가 다음과 같다고 하자. 여기서 R의 Key는 {A}, {E}, {B, C}, {C, D} 이고, 모두 4 개이다.

R = (A, B, C, D, E)
F: 
1) A → {B, C}
2) {C, D} → E
3) B → D
4) E → A

**(1) R은 2NF를 만족하는가 혹은 아닌가? 이유를 설명하라.**
- R은 2NF 만족한다. 각 FD의 우변이 모두 prime이므로 2NF의 정의를 따져 볼 필요가 없으므로 자동으로 만족함.

**(2) R은 3NF를 만족하는가 혹은 아닌가? 이유를 설명하라.**
- R은 3NF 만족한다. 각 FD의 우변이 모두 prime이므로 3NF 만족함. 혹은 FD 1), 2), 4)는 모두 좌변이 super key이고 3)은 우변이 prime attribute 이기 때문.

**(3) R은 BCNF를 만족하는가 혹은 아닌가? 이유를 설명하라.**
- R은 BCNF 위반한다. 그 이유는 FD 3)B → D 에서 좌변이 super key가 아니므로 R은 BCNF를 위반한다. 여기서 참고로 FD 3)에서 중복 정보가 발생하는 것을 주목하자.

<br>

### 9. 다음의 자동차 relation에서 FD들의 집합 F는 다음과 같다. 여기서 Key는 {모델명, 기통수} 이다.

    자동차(모델명, 기통수, 원산지, 세금, 수수료)
    
F : 
1) {모델명, 기통수} → 원산지
2) {모델명, 기통수} → 세금
3) {모델명, 기통수} → 수수료
4) 기통수 → 수수료
5) 원산지 → 세금

**(1) 위의 제약조건들을 모두 만족하는 tuple들의 예를 6 개 이상 적어라.**
**(2) 위로부터 발생하는 Redundancy와 Anomaly 현상을 모두 설명하라.**
**(3) 위의 현상이 발생하지 않도록 단계별로 정규화(2NF, 3NF. . .) 하라.**
