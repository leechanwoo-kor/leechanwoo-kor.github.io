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

<br>

## Extenal Sorting

<br>

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

<br>

### Example: Selection Sorting

![image](https://user-images.githubusercontent.com/55765292/141417039-f905ca27-b834-45b1-af59-960ce3ed659a.png){: width="80%" height="80%"}{: .align-center}

<br>

### Example: Selection Sorting

- Bubble Sorting

![image](https://user-images.githubusercontent.com/55765292/141417104-9e3d2f02-a6e7-465f-ba59-a6f5d0a7e572.png){: width="80%" height="80%"}{: .align-center}

<br>

### Comparison: Internal Sorting

![image](https://user-images.githubusercontent.com/55765292/141417700-c3e08438-aa99-4c5a-b017-54ff9086c85c.png){: width="80%" height="80%"}{: .align-center}

- Cost facotr: 비교 작업의 수<br>

- Insertion 정렬은 작은 n에 가장 적합합니다.
- Quick 정렬은 평균적인 경우에 가장 좋습니다.
- Merge 정렬은 최악의 경우에 가장 좋지만 추가 공간이 필요합니다.
- Heap 정렬은 두 경우 모두에 적합하며 추가 공간이 필요하지 않습니다.

<br>

## External Sorting
