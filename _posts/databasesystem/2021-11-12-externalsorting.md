---
title: "[Database System] Extenal Sorting"
categories:
  - Database System
tags:
  - Database System
  - Extenal Sorting
toc: true
toc_sticky: true
toc_label: "Extenal Sorting"
toc_icon: "sticky-note"
---

# Database System

## Extenal Sorting

### Why Sorting

- Explicit Sorting

```
    SELECT name, address
      FROM Customers
  ORDER BY ID
```

```
    SELECT name, address
      FROM Customers
  GROUP BY age
```

<br>

- Implicit Sorting

```
    SELECT name
      FROM Persons
     WHERE age > 55
```

```
    SELECT DISTINCT rating
      FROM Customers
```

```
    SELECT C.name, P.name
      FROM Customers, Purchase
     WHERE Customer.ID = Purchase.ID
```

<br>

- 전체 컴퓨팅 시간의 대부분 40%가 정렬에 사용됩니다.
- 정렬은 computer science의 classic problem입니다. (50년 이상)

<br>

### Sorting

- Internal Sorting
    - 메인 메모리의 소량 데이터 정렬
    - Selection, Bubble, Insertion, Heap, Quick, Merge Sort 등
    - 주요 관심사: 비교 횟수, CPU비용
    - O(n^2) 또는 O(nlong2n)
- 외부 정렬
    - 디스크의 대용량 데이터를 정렬
    - 내부 정렬 알고리즘을 직접 사용할 수 없습니다.
        - ex) 1MB의 데이터를 1MB의 주 메모리로 정렬합니다.
    - 파일을 여러 개의 정렬된 하위 파일로 분할(=run)
    - 대부분의 DBMS는 자체 정렬 기능을 제공합니다.
    - 주요 관심사: 페이지 접근(page accesses) 횟수, (I/O 비용)

<br>

## Internal Sorting

### Example: Selection Sorting

![image](https://user-images.githubusercontent.com/55765292/141417039-f905ca27-b834-45b1-af59-960ce3ed659a.png){: width="50%" height="50%"}{: .align-center}

<br>

### Example: Bubble Sorting

![image](https://user-images.githubusercontent.com/55765292/141417104-9e3d2f02-a6e7-465f-ba59-a6f5d0a7e572.png){: width="50%" height="50%"}{: .align-center}

<br>

### Comparison: Internal Sorting

<br>

![image](https://user-images.githubusercontent.com/55765292/141417700-c3e08438-aa99-4c5a-b017-54ff9086c85c.png){: width="80%" height="80%"}{: .align-center}

- Cost facotr: 비교 작업의 수<br>

- Insertion 정렬은 작은 n에 가장 적합합니다.
- Quick 정렬은 평균적인 경우에 가장 좋습니다.
- Merge 정렬은 최악의 경우에 가장 좋지만 추가 공간이 필요합니다.
- Heap 정렬은 두 경우 모두에 적합하며 추가 공간이 필요하지 않습니다.

<br>

## External Sorting

- 크기가 사용 가능한 메인 메모리 공간(즉, 데이터 크기 >> 메모리 크기)을 초과하는 레코드 파일을 정렬하려면 어떻게 해야할까?
- 내부 정렬을 사용하여 다음 파일을 정렬할 수 있을까?
    - 파일 크기는 1GB입니다.(각 100바이트에 10^7개의 레코드)
    - 사용 가능한 메인 메모리 크기는 50MB입니다.
    - 페이지 크기: 4,096(2^12)바이트
    - 한 페이지에 40개의 레코드 저장, 이 파일에는 **250,000**페이지가 필요합니다.
    - 메인 메모리는 **12,800**페이지를 저장할 수 있습니다.(=50*20^20/2^12)
- 전체 파일이 메인 메모리에 맞지 않더라도 정렬할 수 있습니다.
    1. 더 작은 하위 파일로 나눕니다.
    2. 이 하위 파일을 정렬합니다. 정렬된 각 서브파일을 "**실행(run)**"이라고 합니다.
    3. 최소 크기의 메인 메모리를 사용하여 merge 실행
- 디크스와 메인 메모리 사이에서 각 페이지를 여러번 이동해야 합니다.

<br>

- 외부 정렬에 대한 접근 방식
    1. 3페이지의 버퍼 공간이 모두 사용 가능한 경우에도 임의 크기의 파일 정렬이 가능합니다.
    2. 더 크고 따라서 더 현실적인 버퍼 크기(예: **B > 3**페이지)를 효과적으로 사용하도록 이 알고리즘을 수정합니다.
- 외부 정렬 최적화
    1. I/O 수 감소
    2. 평균 I/O 비용 절감
- 주요 관심사는 I/O 수를 줄이는 것입니다.

<br>

### Two-Way Sort

- Pass 0 : 페이지 읽기, 정렬, 쓰기: **정렬** 단계
    - **하나**의 버퍼 페이지가 사용됩니다.
    - 많은 정렬된 **실행**이 생성됩니다.
- Pass 1, 2, ... : 한번에 두 개의 **실행** 병합 : **병합** 단계
    - **세 개**의 버퍼 페이지가 사용되었습니다. (입력용 2개, 출력용 1개)

![image](https://user-images.githubusercontent.com/55765292/141429720-4ab22f12-b99f-4ad6-b8d4-142782acc514.png){: width="50%" height="50%"}{: .align-center}

<br>

![image](https://user-images.githubusercontent.com/55765292/141429886-b735073a-92b5-4104-9df9-1ca47dc0f607.png){: width="50%" height="50%"}{: .align-center}

- 참고: 실행은 (많은) 정렬된 페이지가 있는 논리적 청크입니다.

<br>

![image](https://user-images.githubusercontent.com/55765292/141430120-9b26ddff-a727-49bd-931d-7b357e31a009.png){: width="50%" height="50%"}{: .align-center}

- 참고: 실제 정렬은 패스 0에서 한 번만 발생합니다. 각 병합 패스 후에 실행 크기는 두 배가되지만 실행 수는 절반으로 줄어듭니다.

---

- **N** 페이지의 파일을 정렬하려면 각 패스에서 **N** 페이지를 **읽고** 정렬/병합하고 N 페이지를 다시 **작성**합니다.
    - **2 * N** 패스당 I/O 작업
- 병합 패스 수(k = 1, 2, 3, ...)?
    - pass k 이후 실행 횟수 = N/2^k = 1, 따라서 k = log2N
- 정렬/병합 패스의 수(k = 0, 1, 2, 3, ...)?
    - **1 (pass 0) + log2N (pass 1, ..., pass k)**
- 총 I/O 작업 수
    - **2 * N * (1 + log2N)**
- 예를 들어, N = 7
    - (1 + log2(7)) = 4 pass; 각 패스에서 7페이지를 읽고 씁니다.
    - 총 2 * 7 * 4 = 56 I/O;
    - N = 8인 경우 64개의 I/O가 필요합니다.

<br>

### Multi-Way Sort

- 지금까지 3페이지의 버퍼 공간만 사용했습니다.
- 훨씬 더 **큰** 버퍼 페이지 풀(예: **B** 버퍼 페이지)을 어떻게 효과적으로 사용할 수 있을까?
- 주요 고려 사항
    1. 메모리 내 정렬 중에 전체 버퍼 공간(예: **B** 페이지)을 사용하여 **초기 실행 횟수를 줄입니다.**
    2. 한 번에 **두 개 이상의 실행**(예: B-1개의 실행)을 병합하여 **패스 수를 줄입니다.**

![image](https://user-images.githubusercontent.com/55765292/141431732-4b31e598-6f05-4bdd-844c-d4ea8ac157c7.png){: width="50%" height="50%"}{: .align-center}

- 가능한 한 큰 초기 실행 크기를 구성
- Pass 0 (**정렬**) : **B** 버퍼 페이지를 사용하여 **N** 페이지를 정렬합니다.
- 각각 **B** 페이지의 **N/B** 정렬 실행을 생성합니다.

![image](https://user-images.githubusercontent.com/55765292/141432072-005574cd-6e74-432e-8c79-72d233697123.png){: width="50%" height="50%"}{: .align-center}

- 정렬된 하위 목록을 하나의 긴 정렬 목록으로 구성합니다.
- 1, 2, ..., K (**병합**) : 병합은 **(B-1)**개의 **INPUT 버퍼**를 사용하여 실행됩니다.
- 병합된 데이터가 디스크에 기록되기 때문에 **하나의 OUTPUT 버퍼**로 충분합니다.

---

```
Algorithm Multi-Way Sort (file)
    // 디스크에 있는 파일이 주어지면 B 버퍼 페이지를 사용하여 정렬합니다.
    // B 페이지 길이의 실행을 생성합니다. Pass 0;
    B 페이지를 메모리로 읽고, 정렬하고, 실행을 기록합니다.
    // 병합은 한 번에 하나의 실행만 남을 때 까지 더 긴 실행을 생성합니다.
    While(이전 패스의 실행 횟수 > 1)
        // Pass 1, 2, 3, ..., k
        While(이전 패스에서 병합할 실행이 있음)
            다음 실행 선택(이전 패스에서)
            각 실행을 입력 버퍼로 읽습니다.
            실행을 출력 버퍼에 병합합니다.
            출력 버퍼를 한 번에 한 페이지씩 디스크에 강제로 저장합니다.
    End;
```

---

![image](https://user-images.githubusercontent.com/55765292/141433351-d7abe6a0-4289-4f05-93af-efa914641083.png){: width="50%" height="50%"}{: .align-center}

- **초기 정렬 실행 횟수 (Pass 0)**
    - 메인 메모리에서 사용 가능한 **B** 페이지를 사용하여 Pass 0 동안 **N** 페이지를 읽고 내부 정렬을 사용하여 정렬합니다.
        - **Pass 0** → Input : **N**개의 정렬되지 않은 페이지, Output : **N/B** 정렬된 실행
            1. **N** 페이지를 읽습니다.
            2. 메인 메모리의 레코드를 정렬합니다.
            3. 정렬된 페이지를 디스크에 기록합니다. (결과적으로 **N/B** 실행)
        - 이 패스는 버퍼 공간의 **B페이지**를 사용합니다.
    - 초기 실행 횟수 : **N/B**
- **병합 패스 수 (Pass 1, 2, ...)**
    - 초기 **N1 = N/B** 실행으로 **한 번에** **B-1** 페이지를 병합할 수 있습니다.
        - **Pass** k → Input : **N1/(B-1)^k-1** 실행, Output : **N1/(B-1)^k** 정렬 실행
- **패스 수** : **1 + logB-1(N1) = 1 + logB-1(N/B)**
- **총 I/O 작업 수** : **2 * N * (1 + logB-1(N/B))**

---

- **B** = 5 버퍼 페이지, **N** 108 페이지
    - Pass 0 : 정렬
        - 108/5; 각각 5페이지씩 22회 정렬 실행(마지막 실행은 3페이지)
    - Pass 1 : 4-way merge(4방향 병합)
        - 22/4; 각각 20페이지씩 6회 정렬됨(마지막 실행은 8페이지)
    - Pass 2 : 4-way merge(4방향 병합)
        - 2개의 정렬된 실행, 하나는 80페이지, 다른 하나는 28페이지
    - Pass 3 : 
        - 108페이지의 정렬된 파일
- 총 I/O 비용 패스 수
    - 각 패스에서 108페이지를 읽고 씁니다.
        - 비용 = 2 * N * (패스 수) = 2 * 108 * (1 + log4(22)) = 864

---

![image](https://user-images.githubusercontent.com/55765292/141436094-fa952dde-f1e2-41fa-8830-d68981fa4da9.png){: width="50%" height="50%"}{: .align-center}

---

- two-way merge(양방향 병합) 정렬(B = 3)과 비교하여 I/O 절감이 상당할 수 있습니다.
- 버퍼 크기 B에 대한 패스 수 = 3, 129,257 페이지

<br>

![image](https://user-images.githubusercontent.com/55765292/141436284-17c26312-db19-4466-b727-b038f567c3dd.png){: width="50%" height="50%"}{: .align-center}

<br>

### Exercise: Multi-Way Sort

(a) 10,000 페이지와 3개의 버퍼 페이지가 있는 파일
(b) 20,000 페이지와 5개의 버퍼 페이지가 있는 파일
(c) 2,000,000페이지와 17개의 버퍼 페이지가 있는 파일


- Pass 0 에서 몇 개 의 실행을 만들 것인가?

<details>
<summary>접기/펼치기</summary>
<div markdown="1">

(a) 10000/3 = 3334개의 정렬된 실행
(b) 20000/5 = 4000개의 정렬된 실행
(c) 2000000/17 = 117648개의 정렬된 실행

</div>
</details>


- 파일을 완전히 정렬하는 데 몇 번의 패스가 필요한가?

<details>
<summary>접기/펼치기</summary>
<div markdown="1">

(a) log2(3334) + 1 = 13 패스
(b) log4(4000) + 1 = 7 패스
(c) log16(117648) + 1 = 6 패스

</div>
</details>


- 파일 정렬에 소요되는 총 I/O 비용은 얼마 인가?

<details>
<summary>접기/펼치기</summary>
<div markdown="1">

(a) 2 * 10000 * 13 = 260,000
(b) 2 * 20000 * 7 = 280,000
(c) 2 * 2000000 * 6 = 24,000,000

</div>
</details>
