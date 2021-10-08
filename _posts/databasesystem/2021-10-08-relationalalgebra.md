---
title: "[Database System] Relational Algebra"
categories:
  - Database System
tags:
  - Database System
  - Relational Algebra
toc: true
toc_sticky: true
toc_label: "Relational Algebra"
toc_icon: "sticky-note"
---

# Database System

## Relational Algebra

- Relation database에 대해 **질의(query)** 처리 연산자들의 모임을 relation algebra라 함
- Query는 relation에서 원하는 정보를 **검색(retrieve)**하는 조건을 명시하는 명령문
- (1 개 혹은 여러 개의) **입력 relation**에 대해 질의 연산의 **결과**인 (1 개의) **출력 relation** 이 생성됨
- 기본적으로 8 개의 검색 연산자 들로 구성됨
- 이 연산자들은 Query language인 sQL의 검색 연산 과정을 실현하는데 매우 중요함

### Relation Data Operation

- Relation Data Operation
	- **원하는 데이터를 얻기 위해 Relation에 필요한 Query를 수행하는 것**으로, Data System의 구성 요소 중 **데이터 언어**의 역할을 한다
	- 관계 대수/관계 해석으로 나눌 수 있다 (기능과 표현력 측면에서 능력은 동등하다)
		- 관계 대수(Relational Algebra): 절차식 언어, 원하는 결과를 얻기 위해 데이터의 처리 과정을 순서대로 기술한다
		- 관계 해석(Relational Calculus): 비절차식 언어, 원하는 결과를 얻기 위해 처리를 원하는 데이터가 무엇인지만 기술한다

![image](https://user-images.githubusercontent.com/55765292/136483190-fb90907c-1ae7-447d-81ea-81c61335b84b.png){: width="80%" height="80%"}{: .align-center}


- 원하고자 하는 데이터를 **쉽고, 빠르고, 정확하게** 얻고자 사용한다
- 새로운 데이터 언어 제안 시, 해당 데이터 언어의 **유용성을 검증하는 기준**
- 관계 대수나 해석으로 기술할 수 있는 모든 query를 기술할 수 있으면 데이터 언어를 **관계적으로 완전(Relationally Complete)**하다고 판단할 수 있다

### Relational Algebra

- Relational Algebra
	- Relation을 다루는 연산으로, **검색 질의를 기술**하는데 사용한다
	- **절차식 언어**이다 (User가 원하는 결과를 위해 어떤 연산을 수행해야 할 지 system에 알려준다)
	- **간단**하며 **명시적(Powerful)** 표현을 사용한다
	- **폐쇄 특성(Closure Property)**을 가진다
	- 대표 연산자는 8개로, 일반 집합 연산자 4개와 순수 관계 연산자 4개로 분류할 수 있다
	- **피연산자의 특성** 두가지
		- Variables that stand for relations(relation을 나타내는 변수)
		- Constants which are finite relation(유한한 relation의 상수)

## Normal Set Operator

- 일반 집합 연산자
	- Relation이 Tuple의 **set**이라는 개념을 이용하며, 수학의 집합 연산자를 차용한다
	- 조건: 피연산자가 두 개이며, **합병가능(Union-compatible)이어야 한다
	- **합병가능(Union-compatible)
		- 필드 수가 같아아 한다 (속성의 개수)
		- 왼쪽에서 부터 오른쪽으로 차례대로 대응하는 필드의 동일한 도메인을 가지고 있어야 한다 (도메인이 같으면 이름은 달라도 됨)

<br>

- Union (R ⋃ S)
	- 릴레이션 R과 S의 합집합 반환
	- R ⋃ S = {t │ t ∈ R ∨ t ∈ S} (∨, OR이다)
- Intersection (R ⋂ S)
	- 릴레이션 R과 S의 교집합 반환
	- R ⋂ S = {t │ t ∈ R ∧ t ∈ S} (∧, AND이다)
- Difference  (R − S)
	- 릴레이션 R과 S의 차집합 반환
	- R − S = {t │ t ∈ R ∧ t ∉ S}
- Cartesian Product (R ⨉ S)
	- 릴레이션 R과 S의 각 tuple들을 모두 연결
	- R ⨉ S = {r·S │ t ∈ R ∧ s ∈ S}

---

### UNION

![image](https://user-images.githubusercontent.com/55765292/136485887-db38fced-4ddd-44a3-80a6-3546e4331bf1.png){: width="80%" height="80%"}{: .align-center}

- │R ⋃ S│ ≤ │R│ ÷ │S│
- 차수: R과 S의 차수와 같다
- 교환/결합법칙 성립

---

### INTERSECTION

![image](https://user-images.githubusercontent.com/55765292/136486096-ae8ce6da-ce8c-4d19-9141-5aa0f77a0b69.png){: width="80%" height="80%"}{: .align-center}

- │R ⋂ S│ ≤ MIN{│R│, │S│}
- 차수: R과 S의 차수와 같다
- 교환/결합법칙 성립

---

### DIFFERENCE

![image](https://user-images.githubusercontent.com/55765292/136486241-9809d98d-b39b-4532-94b7-443852c81493.png){: width="80%" height="80%"}{: .align-center}

- │R − S│ ≤ │R│
- 차수: R과 S의 차수와 같다
- 교환/결합법칙 불가

---

### CARTESIAN PRODUCT

![image](https://user-images.githubusercontent.com/55765292/136486438-a779a9ba-b111-48cd-9ce1-5d1aca87e831.png){: width="80%" height="80%"}{: .align-center}

- │R ⨉ S│ = │R│ ⨉ │S│
- R과 S의 차수를 더한 값
- 교환/결합법칙 성립

**💡**<br>
Cartesian Product는 두 Relation의 구조가 달라도 가능하다<br>
{: .notice--primary}


## Pure Relational Operator

- 순수 관계 연산자
	- Relation의 **구조**와 **특성**을 이용하는 연산자이다

<br>

- Selection(σ)
	- 표현: σ조건(R)
	- 릴레이션 R에서 **조건(Predicate)**을 만족하는 tuples 반환
- Projection(π)
	- 표현: π칼럼(R)
	- 릴레이션 R에서 주어진 column으로만 구성된 tuple 반환
- Join(⨝)
	- 표현: R⨝S
	- 릴레이션 R, S의 특정 column(들)을 비교하여, 조건에 알맞는 컴포넌트가 있다면 그 컴포넌트(들)의 tuples 반환
- Division(÷)
	- 표현: R÷S
	- 릴레이션 S의 모든 tuple과 관련이 있는 릴레이션 R의 tuples 반환
- Rename(ρ)
	- 표현: ρ S(x1, x2, ...)(R)
	- 릴레이션 R을 S로 개명, 각 attribute를 x1, x2, ... 로 개명

---

### SELECTION

![image](https://user-images.githubusercontent.com/55765292/136487240-9a06f22d-d433-4454-8b43-8e425e3ab3b7.png){: width="80%" height="80%"}{: .align-center}

- 하나의 Relation에서만 수행되는 연산
- 조건식(Predicate)에는 비교연산자(＞, ≥, ＝, ≠, ≤, ＜)와 논리연산자(, ) 이용
- 수평적 부분 집합 개념

---

### PROJECTION

![image](https://user-images.githubusercontent.com/55765292/136487706-d57fd7ee-213f-48a6-9570-385a33544b60.png){: width="80%" height="80%"}{: .align-center}

- 하나의 Relation에서만 수행하는 연산
- 수직적 부분집합 개념

---

### JOIN

![image](https://user-images.githubusercontent.com/55765292/136487770-cfca1d85-2433-45f0-98fc-50ecfed33a8a.png){: width="80%" height="80%"}{: .align-center}

- Join
	- 릴레이션 R 하나로는 원하는 Data를 얻지 못하여 관련있는 여러 Relation들을 함께 사용해야 하는 경우 사용
	- **자연 조인(Natural Join)**이라고도함
- Theta-Join
	- 이러한 조인 연산에, **θ(조건; Predicate)**을 부여해 조건을 만족하는 tuples를 반환
	- 조건(Predicate)은 **비교연산자(＞, ≥, ＝, ≠, ≤, ＜)**을 의미한다
- Equi-Join
	- θ연산자가 **등호(＝)**일 때의 세타 조인을 말한다

---

### DIVISION

![image](https://user-images.githubusercontent.com/55765292/136488106-e289661d-1eb0-47f8-a8e8-31b6ecd6a884.png){: width="80%" height="80%"}{: .align-center}

- 릴레이션 R이 릴레이션 S의 모든 column을 포함하고 있어야 연산 가능 (R⊃S)

---

### RENAME

![image](https://user-images.githubusercontent.com/55765292/136488240-714c017f-b11a-4c9b-a3eb-b7bead46a458.png){: width="80%" height="80%"}{: .align-center}

- 각 combining시 **Name conflict(이름 충돌)**이 그림과 같이 빈번히 일어날 수 있다
	- 이는 User, DBA 모두에게 모호할 수 있어, 명시적으로 이름을 바꾸는 데 사용한다

**💡**<br>
Bag vs Set<br>
초기 DBMS는 Bag를 이용한 data modeling을 하였다<br>
Bag은 한마디로, 중복을 허용하는 집합 개념이다<br>
그렇기 때문에 implementation 관점에서,<br>
Set을 이용한 것보다 효율이 좋다<br>
(두 Relation을 합칠 경우 복사해서 붙여넣기만 하면 된다)<br>
현재는 Data의 종류에 따라 저장 방법이 매우 다르므로<br>
이 두가지를 적절히 사용한다 (All과 Distinct 개념)<br>
{: .notice--primary}

---
