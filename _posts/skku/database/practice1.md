# 1. 기존의 OS가 DB를 관리하는 File System과 비교하여, DBMS가 제공하는 다음의 각 기능 및 장점이 무엇인지에 대해 설명하라.

- Provide Data Abstraction
- Control Data Redundancy
- Enforce Data Integrity Checking
- Manage Database on Persistent Storage
- Provide Efficient Query Processing
- Control Concurrent Data Access
- Provide Data Backup and Recovery
- Restricting Unauthorized Data Access
- Provide Multiple User Interfaces

<br>

# 2. Database는 서로 관련이 있는 data의 모임으로 정의된다. Database가 갖는 다음 각 특성에 대해 설명하라.

- Very Large Volume
- Persistence: (Hard) Disk Resident
- Operational: Retrieve, Insert, Delete, Update
- Shared by Multiple Users

<br>

# 3. DB System의 Three-Level Schema 구조를 도시하여 그려라.

1) 각 schema에 대해 설명하라.
- Conceptual Schema는 다수 사용자가 사용하는 전체적인 DB 구조의 의미를 개념적으로 (What meaning of DB) 묘사
- Physical Schema는 다수 사용자가 사용하는 DB가 Disk에 어떠한 방식으로 저장되는지 (How to store DB)를 묘사
- External Schema는 각 특정 사용자가 원하는 부분적인 DB를 (View of DB) 묘사
2) 각 schema에 대해 실제 적절한 예를 들어 설명하라.
- 아래 그림 참조
3) Logical Independency가 무엇이고, 왜 중요한지 설명하라.
- Conceptual Schema를 변경했을 씨 External Schema에 영향을 미치지 않는 능력
- 즉 Conceptual Schema가 변경되어도 기존에 정의된 External Schema를 그대로 사용할 수 있음
4) Physical Independency가 무엇이고, 왜 중요한지 설명하라.
- Physical Schema를 변경했을 시 Conceptual Schema에 영향을 미치지 않는 능력
- 즉 Physical Schema가 변경되어도 기존에 정의된 Conceptual Schema를 그대로 사용할 수 있음
5) 이 구조가 제공하는 장/단점에 대해 각각 설명하라
- Multiple user views들을 제공
- Higher level schema가 lower level schema를 은폐시킴으로서 Data Abstraction을 사용자에게 제공
- 즉 application program들과 physical database를 분리 시켜줌

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d791d8a1-177e-4c19-9d77-6fa34c9ac5fc)

<br>

# 4. 다음의 요구 사항 분석을 참조하여 ER Schema(diagram)을 그려라.

- 교재(text)는 과목(course) 에서 사용되는(use) 책이다. 과목은 교재를 사용 안 할 수도 있지만, 5 개 교재 한도내에서 사용한다.
- 교재는 반드시 정확히 1개의 과목에서만 사용된다.
- 강사(instructor)는 2개에서 4개까지의 과목들을 가르친다(teach).
- 과목은 정확히 1명의 강사만 할당된다.
- 강사는 교재를 채택(adopt) 할 필요는 없으나 교재의 개수는 상관없다.
- 교재는 최대 1명의 강사에 의해 채택된다.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/627e33e1-0c4e-4dfa-bc87-c24e780606e0)

<br>

# 5. 다음의 요구 사항 분석을 참조하여 ER Schema(diagram)을 그려라.

- 각 과목은 과목번호, 과목명, 강사, 학점의 attribute들로 구성된다.
- 각 과목의 과목번호는 모두 상이하다.
- 어떤 과목은 이를 담당하는 강사가 여러 명 존재한다.
- 어떤 과목들은 이 과목을 듣기 위해 이수해야 하는 선수과목들이 있다.
- 어떤 과목들은 다른 과목들을 듣기 위한 선수과목으로 사용된다.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/45448cf0-d542-4819-83f1-08ea49d6d1c4)

<br>

# 6.

## 6.1. 배우와 제작사라는 두 개의 entity type에 대해 다음의 요구사항을 참조하여 ER schema를 그려라. (단, Total/Partial 참여, 몇 대 몇 인지의 관계, Key 등을 명시할 것)
- 각 배우는 ‘배우명’ 과 ‘생년월일’ 의 두 개의 attribute들로 구성된다.
- 같은 제작사에는 같은 ‘배우명’ 을 갖는 배우들은 없으나, 같은 ‘생년월일’ 을 갖는 배우들이 있을 수 있다.
- 다른 제작사들 간에는 같은 ‘배우명’ 을 갖는 배우들이 있을 수 있다.
- 각 제작사는 ‘제작사명’ 이라는 하나의 attribute로 구성되며, 같은 ‘제작사명’ 을 갖는 제작사들은 없다.
- 각 배우는 반드시 소속되는 제작사가 있어야 한다.
- 각 배우는 단 한 개의 제작사에 소속되며, 각 제작사는 여러 배우가 있다.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3f372025-5fd8-41ea-9a19-afe1a54730be)

<br>

- 배우들은 key를 찾을 수 없으므로 Weak Entity Type; 제작사는 Owner.

<br>

## 6.2. 배우의 key가 무엇인지 명시하라.
- 제작사의 key = {제작사명}; 배우의 key = {배우명, 제작사명};
- 단, {배우명}은 partial key

<br>

## 6.3. 만약 어떤 제작사가 DB에서 삭제되면, 어떤 일이 발생하는지 설명하라.
- 어떤 제작사가 삭제되면, 그 제작사에 속한 배우들의 정보도 함께 삭제됨. (Owner와 관계가 없는 weak entity는 존재할 수 없음)

<br>

# 7.

## 7.1. 다음의 ER schema를 참조하여 이 DB의 요구 사항이 무엇이었는지를 문장 형태로 설명하라

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4b0deda7-40d0-4a25-8905-60c32131dd47)

<br>

- 각 사원(employee)는 최대 2개의 부서에서 근무(work)할 수 있지만, 어떠 부서에서는 근무하지 않을 수 있다.
- 각 부서(department)는 반드시 근무하는 사원이 있어야 하며, 최대 10명까지 가능하다.
- 각 부서(department)는 반드시 전화(phone)가 있어야 하며, 최대 3대까지 가능하다.
- 각 전화(phone)는 반드시 단 1 개의 부서에서만 사용된다.
- 각 전화(phone)는 반드시 사원에게 할당되어야 하며, 최대 10명의 사원들에게 할당된다.
- 각 사원(employee)은 반드시 전화가 있어야 하며, 최대 6대의 전화가 할당된다.

<br>

## 7.2. 위의 ER schema를 Total/Partial 제약조건과, m : n, 1 : m, 1 : 1 등의 제약조건을 이용하여 동등하게 다시 그려라.

- min = 0 means partial
- min > 0 means total

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6f447e56-750e-4a4f-a6f4-abb40edd71cb)

<br>

# 8. 다음은 전국의 대학생들을 Weak Entity Type 으로 나타낸 것임. 이들을 식별할 수 있도록 각자의 가정하에 위의 ERD를 완성하라.

- Colleges의 key = {cname}
- Students의 key = {sid, cname}, sid: Partial Key

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e69a6709-c605-4583-bf48-ffc05835262d)

<br>

# 9. 아래에서 A와 B의 관계가 다음 중 어느 것인지 X로 표시하라.

1) A has relationship with B
2) A is an attribute of B
3) A is specialization of B
4) A is generalization of B

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ad507626-b5ad-4462-bf0f-1de4bea33eab)

<br>

# 10. 다음의 ER schema를 참조하라. 각 교수는 여러 개의 과목들을 가르치지만, 각 과목은 단 한 명의 교수가 가르친다.

## 10.1. 이 ER schema에서 발생하는 문제점들을 모두 찾아 설명하라.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3335969c-ed72-410b-b26a-ae4f1c58e7a5)

- a) 동일한 교수 정보(주소, 전화)가 여러 번 (그 교수가 담당하는 과목의 수만큼) 반복되는 중복(redundancy) 현상이 발생함.
- b) 교수 정보 update시에 중복된 데이터를 일일이 다 찾아서 반영해야 함.
- c) 만약 새로운 교수가 부임했을 때 이 교수가 그 당시 과목을 담당하지 못한 경우, 이 교수의 정보를 반영할 수 없다. 그 이유는 ??
- d) 어떤 교수의 정보가 삭제되는 경우, 이 교수가 가르치는 과목들의 정보 (과목명)도 함께 삭제되어 유실된다.

## 10.2. 10.1.에서 언급한 문제점들이 발생하지 않도록 아래의 ER schema를 변경해서 다시 그려라. (힌트: entity type을 하나 더 만들 것)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c7da969b-61a5-4f87-824f-40a21973727b)

- 위와 같이 ‘교수’ 의 entity type 을 따로 만들어 ‘과목’과 relationship을 설정한다.
- 이렇게 하면 10.1에서 설명한 문제점들이 소거됨.
- 따라서 이 schema가 앞의 것보다 “redundancy” 측면에서 더 좋은 것임.
- 여기서 교수의 key는 적절한 가정하에 정할 것.

<br>

# 11. 다음의 ER schema를 참조하여 이 DB의 의미를 해석하라

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8c811036-2415-4af2-831f-a8ee0217aed4)

- 약의 처방 및 유통에 대한 간략한 데이터 모델링; 구체적 답안은 생략
