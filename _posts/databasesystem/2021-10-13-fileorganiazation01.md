---
title: "[Database System] File Organizations(1)"
categories:
  - Database System
tags:
  - Database System
  - File Organizations
  - Hashing File
  - Dense/Sparse Index
  - Clustered/Unclustered Index
  - Single-level Index
  - Multi-level Index
toc: true
toc_sticky: true
toc_label: "File Organizations"
toc_icon: "sticky-note"
---

# Database System

## Why Organizing Files?

- 파일 조직(File Organization)은 파일이 디스크에 저장될 때 파일의 레코드를 배치하는 방법
- 레코드를 배치하는 다양한 방법은 효율적으로 수행할 파일에 대해 다양한 연산을 제공
- DBMS는 여러 파일 조직을 지원. 많은 대안이 존재하며, 각각은 일부 연산에는 적합하지만 다른 연산에는 좋지 않음
- DBA의 역할은 예상되는 사용 패턴에 따라 각 파일에 적합한 조직을 선택하는 것

### Motivating Examples

- 전체 스캔이 필요한 SQL 쿼리를 보면
    - 고객 레코드가 임의의 순서로 저장된다고 가정 → 힙(Heap) 파일로 저장

```
    SELECT *
      FROM customer
```

- 이 힙(Heap) 파일은 모든 고객 레코드 모음에 대해 효율적으로 전체 스캔을 지원함

<br>

- 하지만 이 힙 파일이 다음 쿼리를 효율적으로 지원하는가?
    - 아니다 → 너무 느림

```
    SELECT *
      FROM customer
     WHERE age = 40
```

<br>

- 다음 두 쿼리를 보면

```
    SELECT cid, name
      FROM customer
     WHERE age > 40
```

```
    SELECT cid, name
      FROM customer
  ORDER BY age ASC
```

- 위의 두 쿼리 속도를 높이기 위해 고객 테이블을 구성하는 방법은 무엇인가?
    - 나이 값의 오름차순으로 고객 기록을 배치하고,
    - 인접한 실린더에 기록을 둔다 → Seek time 감소
    - (가능한 경우 레코드에 cid, name, age 필드만 포함)

<br>

- 파일 조직은 특정 쿼리를 효율적으로 만들기 위해 조정되지만 둘 이상의 쿼리 유형을 지원해야 하는 경우 문제가 발생할 수 있음

<br>

- 이 쿼리에는 **cid** 필드를 기준으로 정렬된 파일 조직이 필요

```
    SELECT cid, name, age
      FROM customer
     WHERE 100 < cid < 9999
```

- 고객 테이블에 대한 파일을 **age** 로 정렬하면 위 쿼리에 전혀 도움이 되지 않을 수 있음
- 만약 이 쿼리가 매우 중요하고 고객 파일 조직에서 지원을 못받는 경우 지원 데이터 구조인 **인덱스**를 구축하여 이 쿼리의 속도를 높일 수 있음


### Typical File Operations

- Scan: 파일의 모든 레코드를 읽음

```
    SELECT *
      FOMR R
```

- Equality Search: 파일에서 같음(=) 조건을 만족하는 레코드를 찾음

```
    SELECT *
      FROM R
     WHERE A = 30
```

- Range Search: 범위(<, >, <=, .. ) 조건을 만족하는 레코드를 찾음

```
    SELECT *
      FROM R
     WHERE A > 50
```

- Insert: 파일에 새로운 레코드를 삽입함

```
    INSERT INTO R
         VALUES < . . . >
```

- Delete: 파일에서 레코드를 삭제함

```
    DELETE FROM R
          WHERE A = 30
```

<br>

**질문: 그렇다면 어떤 파일 구성이 가장 적합한가??**

<br>

- 다음은 DBMS에서 지원하는 가장 일반적인 조직이다
    - Heap Files: 레코드가 무작위로(특정 순서 없이) 보관
    - Sorted Files: 레코드를 정렬된 순서로 보관
    - Hashing Files: 해쉬 기능을 이용하여 기록을 보관
    - Tree Indexed Files: 트리 인덱스를 사용하여 레코드를 보관


## Hashing File

### Hashing File

- 파일의 레코드는 **primary** 페이지와 **overflow**페이지의 **chain**으로 구성된 **버킷**(=페이지=블록)으로 정렬됨
- 레코드가 속한 버킷은 검색 값에 **해시 함수**를 적용하여 결정됩니다.
- h(X): 검색 값이 X인 레코드를 포함하는 버킷의 주소

![image](https://user-images.githubusercontent.com/55765292/136921763-d0345f4e-f27b-4a78-aaed-3e94c0e95d64.png){: width="80%" height="80%"}{: .align-center}

### Example: Hashing File

- primary 버킷에는 고객의 <이름, 나이, 급여> 레코드가 포함됨
    - overflow 버킷이 없다고 가정
- 데이터 레코드는 '나이'에 대한 해시 함수 h에 의해 저장
- '나이'에 해시 함수 **h**를 적용하면 해당 레코드가 속한 버킷을 직접 찾을 수 있음

![image](https://user-images.githubusercontent.com/55765292/136922328-d03e0042-6a08-4a17-a622-0514b2f540f8.png){: width="80%" height="80%"}{: .align-center}

### Hashing File (Contd.)

- 검색 값이 X인 레코드를 검색하려면
    - 검색 값 X에 해시 함수 h를 적용
    - 주소가 h(X)인 primary 버킷 페이지에 액세스하여 메인 메모리로 읽어들임
    - 메인 메모리의 이 페이지에서 값이 X인 레코드를 검색
    - (필요한 경우 overflow chain에 추가로 액세스)
- overflow chain이 없다고 가정하면 primary 페이지를 찾는 데 하나 또는 두 개의(디렉토리가 사용된 경우) 디스크 액세스만 허용
- 일반적으로 해싱 파일의 페이지는 80%로 채워져 향후 삽입을 위한 공간을 남기고 overflow를 최소화
- 오버플로가 없고 하나의 I/O가 있다고 가정하고 고급 해싱 파일에 대해서는 나중에 설명


## Indexes

### Concepts of Indexes

- **인덱스**는 전체 파일을 스캔하지 않고도 데이터에 대한 효율적인 액세스를 지원하는 데이터 조직 → 인덱스는 **검색 키** 필드의 선택 속도를 높임
    - 테이블의 모든 필드 집합(WHERE에 지정된 속성)은 테이블의 인덱스에 대한 검색 키가 될 수 있음
    - 참고: 여기서 검색키는 후보키와 다름

![image](https://user-images.githubusercontent.com/55765292/136924081-b620a2a0-387b-4f37-ab57-afe5287991c5.png){: width="80%" height="80%"}{: .align-center}

### Index: Index Entries

- 인덱스는 주어진 **검색 키** 값 **K**를 가진 많은 **인덱스 항목 K*의 모음**
- 인덱스 항목 K*로 저장되는 것은 무엇인가?
    - 검색 키 필드 K가 있는 실제 데이터 레코드
    - {**K**, 검색 키 값이 **K**인 데이터 레코드의 rid}
    - {**K**, 검색 키 **K**로 데이터 레코드의 rid 목록}

<br>

- 여기서, **rid**는 검색 키 값이 **K**인 데이터 레코드를 포함하는 블록(페이지)에 대한 포인터를 의미

![image](https://user-images.githubusercontent.com/55765292/136925161-9736dbd7-1d4d-4e0c-b046-c5537eedcdd3.png){: width="80%" height="80%"}{: .align-center}

- Alternative 1
    - 인덱스와 데이터(실제 레코드)가 함께 저장됨
    - 이 Alternative는 pointer lookups를 저장하여 직접적인 접근을 함
    - 주어진 데이터 레코드 모음에서 최대 하나의 인덱스가 대안 1을 사용할 수 있음 → 하나 이상일 경우 데이터 레코드가 중복되어 중복 저장 및 잠재적인 불일치
    - 데이터 레코드가 너무 크면 인덱스 항목이 포함된 페이지 수가 많을 수 있음 → 인덱스에 있는 보조 정보의 크기도 일반적으로 크다는 것을 의미
- Alternatives 2 and 3
    - 인덱스 데이터 항목은 데이터 레코드를 가리킴
    - 인덱스 항목 크기는 일반적으로 데이터 레코드 크기보다 훨씬 작음
    - 즉, 필요한 인덱스 페이지 수가 적음
    - 특히 검색 키가 작은 경우 대용량 데이터 레코드가 있는 대안 1보다 좋음
    - 대안 3은 대안 2보다 더 간결하지만 주어진 검색 키 값을 가진 데이터 레코드의 수에 따라 데이터 항목의 길이가 가변적

### Index Entries : Hashing File

- 데이터 파일에는 고객의 <이름, 나이, 급여> 레코드가 포함
    - 데이터 레코드를 '나이'에 대한 해시 함수 h1에 의해 저장
        - 인덱스 항목은 실제 데이터 레코드 ← Alternative 1
        - '나이'에 해시 함수 h1을 적용하면 해당 레코드가 속한 페이지를 직접 식별할 수 있음
    - 데이터 레코드를 '급여'에 대한 해시 함수 h2에 의해 저장
        - 인덱스 항목은 <급여, rid> ← Alternative 2
        - 인덱스 항목 중 rid는 검색 키 값이 '샐러리'인 레코드를 포함하는 페이지에 대한 포인터
- 이 파일 조직은 연령 및 급여 검색 값에 대한 평등 검색을 효율적으로 지원

![image](https://user-images.githubusercontent.com/55765292/137047082-94e28068-29b4-4177-9b32-5b230250d14d.png){: width="80%" height="80%"}{: .align-center}

### Primary/Secondary Index

- 검색 키가 **기본(Primary)** key를 포함하는 필드 집합인 경우 인덱스는 **Primary**임
- 다른 인덱스를 **보조(Secondary)** 인덱스라고 합니다. 대부분의 보조 인덱스에는 일반적으로 **중복** 항목이 포함되어 있음
- 대부분의 DMBS는 모든 관계에 대해 기본 키에 대한 인덱스(예: ORACLE의 unclustered B+ tree)를 자동으로 제공
- 기본 키가 포함되지 않은 검색 키에 자주 액세스하는 경우(예: join 작업을 위한 foreign keys) 사용자는 보조 인덱스를 명시적으로 제공해야 함
- 검색 키에 **후보(candidate)** 키가 포함된 경우 인덱스를 "unique"라고 함

### Dense/Sparse Index

- 데이터 파일의 모든 검색 키 값이 인덱스에 있으면 인덱스가 **밀집(Dense)**됨
    - 인덱스 데이터 항목은 각 데이터 레코드를 가리킴
    - Dense index는 많은 공간을 차지하지만 존재하지 않는 테스트가 필요하지 않음
    - 정렬되지 않은 데이터 파일은 밀집도가 높아야함
- 데이터 파일의 모든 검색 키 값이 인덱스에 있지 않은 경우 인덱스는 **희소(Sparse)**함
    - 인덱스 데이터 항목은 각 데이터 페이지를 가리킴
    - Sparse Index는 공간을 덜 차지하고 인덱스 검색은 더 빠르지만 부재(non-existence) 테스트가 필요
- Sparse Index는 디스크에 있는 데이터 파일의 고유한 물리적 순서(클러스터링)에 의존하기 때문에 파일에는 하나의 Sparse Index와 많은 Dense index가 있을 수 있음

### Clustered/Unclustered Index

- 파일의 데이터 레코드 순서가 인덱스의 인덱스 항목 순서와 '**동일**' 하거나 '**가까운**' 경우 인덱스가 **클러스터링되고(Clustered)** 그렇지 않으면 **클러스터링되지 않음(Unclustered)**
- 인덱스는 데이터 레코드가 검색 키를 기준으로 **정렬**된 경우에만 클러스터링될 수 있음
- 데이터 파일에는 Clustered Index가 **1개만** 포함될 수 있지만 Unclustered Index는 개수에 제한이 없음
- Clustered Index는 연속 데이터 레코드가 동일한 페이지에 있기 때문에 **빠른 범위 쿼리**를 제공
- 그러나 연속 데이터 레코드가 다른 페이지에 상주하기 때문에 Unclustered Index가 더 느림

---

![image](https://user-images.githubusercontent.com/55765292/137048889-5bfee479-10f1-4608-8ebd-6ede2f8defc6.png){: width="80%" height="80%"}{: .align-center}

Clustered/Sparse Index : Key{: .text-center}

<br>

![image](https://user-images.githubusercontent.com/55765292/137049057-8b39d0bc-3b86-4310-9162-cb4e4a7f10d2.png){: width="80%" height="80%"}{: .align-center}

Clustered/Sparse Index : Non-Key{: .text-center}

<br>

![image](https://user-images.githubusercontent.com/55765292/137049168-eec1c8bb-a494-4cda-8e67-3ee56cc5b79c.png)

Unclustered/Dense Index : Key{: .text-center}

<br>

![image](https://user-images.githubusercontent.com/55765292/137049392-7c6511e5-a77f-4e98-b45b-60e7db02c18a.png){: width="80%" height="80%"}{: .align-center}

Unclustered/Dense Index : Non-Key{: .text-center}

---

Indexing File : Exercise

- 고객 테이블
    - 고객(아이디, 이름, 나이, 전화번호, 급여)
    - 데이터 레코드 크기 = 100바이트, 고객 수 = 10^9개 레코드
    - 검색 키 크기(ID) = 6바이트, 포인터 크기 = 4바이트,
    - 블록 크기 = 1,024바이트. ID가 기본 키라고 가정

- 고객은 **정렬되지 않음**(**힙(heap)** 파일), **dense index**를 사용해야 함
    - 블록당 데이터 레코드는 몇 개인가?
        - 1024/100 = 10개 레코드/블록
    - 데이터 블록은 몇 개인가?
        - 10^9/10 = 10^8 데이터 블록
    - 인덱스 항목 크기는?
        - 6 + 4 = 10 바이트
    - 블록당 인덱스 항목은 몇개인가?
        - 1024/10 = 100 인덱스/블록
    - 인덱스 항목의 개수는?
        - Dense Index이므로 10^9 인덱스 항목
    - 인덱스 블록은 몇개 인가?
        - 10^9/100 = 10^7
    - 주어진 아이디의 고객을 찾기위한 디스크 액세스 수는?
        - 인덱스 파일에서 이진 검색(Binary Search): log2(10^7) = 15 액세스
    - 인덱싱을 하지않고 주어진 아이디의 고객을 찾기위한 디스크 액세스 수는?
        - 데이터 파일에서 순차 검색(Sequential Search): 10^8/2 = 50,000,000 액세스

---

Index File : Exercise

- 고객 테이블, SQL 쿼리
    - 고객(아이디, 이름, 나이, 전화번호, 급여)

```
    SELECT 이름, 전화번호
      FROM 고객
     WHERE 나이 > 50
       AND 급여 = 5000
```

- 고객은 '나이'별로 정렬, 그런 다음 두 개의 인덱스를 작성하여 이 쿼리에 효율적으로 답할 수 있음
    - '나이'에 대한 Sparse/Clustered index
    - '급여'에 대한 Dense/Unclustered index
- '나이'에 대한 인덱스를 사용하여 포인터를 찾음(나이 > 50인 모든 레코드)
- 그런 다음 '급여'에 대한 인덱스를 사용하여 포인터를 찾음(급여 = 5000 인 모든 레코드)
- 그런 다음 두 세트의 포인터를 교차하고 마지막으로 디스크에서 모든 정규화된 데이터 페이지를 가져옴

---

## Multi-Level Index

- 인덱스 파일이 정렬되기 때문에 인덱스 자체에 대한 또 다른 인덱스를 생성할 수 있음
- 원본 인덱스를 1단계 인덱스라고 하고, 1단계 인덱스에 대한 인덱스를 2단계 인덱스라고 함과 같이 계속 진행 
- 최상위 레벨의 모든 항목이 하나의 디스크 블록에 들어갈 때까지 이 과정을 반복
- Sparse index를 사용하여 i 번째 레벨 인덱스가 (i - 1) 레벨의 각 블록에 대해 하나의 항목을 갖도록 할 수 있음
- Multi-Level Index는 첫 번째 수준 인덱스가 둘 이상의 디스크 블록으로 구성되어 있는 한 모든 유형의 첫 번째 수준 인덱스(primary, secondary, dense, sparse)에 대해 생성할 수 있음

![image](https://user-images.githubusercontent.com/55765292/137051663-62df225a-9b99-4a42-a652-21f69d214f6a.png){: width="80%" height="80%"}{: .align-center}

Two-Level Index : Clustered{: .text-center}

### Multi-Level Index

- 각 페이지에 저장된 인덱스 항목의 수를 **fan-out(F)-분기율**이라고 함
    **F** = **B/Ri** where **B**: block size, **Ri**: data entry size
- 각 상위 수준은 **F** 요인만큼 데이터 항목 수를 **줄임**
- **F** 값은 **모든** 지수 수준에서 **동일**
- **r1** : 1단계 인덱스의 데이터 항목 수
```
           1레벨: r1/F 블록
           2레벨: r1/F2 블록
           3단계: r1/F3 블록
           
           . . .

           n 레벨: r1/Fn 블록
```
- 그러면 (r1/F^n) >= 1 따라서 검색 시간(n) = logF(r1)

---

Multi-Level Index : Exercise

- 고객 테이블
    - 고객(아이디, 이름, 나이, 전화번호, 급여)
    - 데이터 레코드 크기 = 100바이트, 고객 수 = 10^9개 레코드
    - 검색 키 크기(ID) = 6바이트, 포인터 크기 = 4바이트,
    - 블록 크기 = 1,024바이트. ID가 기본 키라고 가정
    
- 고객은 **정렬되지 않음**(**힙(heap)** 파일), **Multi-Level index**를 사용해야 함
    - fan-out?
        - 1024/10 = 100 인덱스/블록
    - 1 단계 인덱스 항목의 개수는?
        - 10^9 인덱스 항목
    - 1 단계 인덱스 블록의 개수?
        - 10^9/100 = 10^7 블록
    - 2 단계 인덱스 블록의 개수?
        - 10^7/100 = 10^5 블록
    - 3 단계 인덱스 블록의 개수?
        - 10^5/100 = 10^3 블록
    - 총 인덱스 단계는?
        - 5 단계
    - 주어진 아이디의 고객을 찾기위한 디스크 액세스 수는?
        - 인덱스 파일에서 이진 검색(Binary Search): logF(r1) = log100(10^9) = 5 액세스
    - single level index에서 주어진 아이디의 고객을 찾기위한 디스크 액세스 수는?
        - 데이터 파일에서 순차 검색(Sequential Search): log2(10^9) = 15 액세스
    
---
