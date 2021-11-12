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
