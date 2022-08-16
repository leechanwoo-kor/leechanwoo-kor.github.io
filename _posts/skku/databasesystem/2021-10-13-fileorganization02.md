---
title: "[Database System] File Organizations(2)"
categories:
  - Database System
tags:
  - Database System
  - File Organizations
  - Tree Indexing File
toc: true
toc_sticky: true
toc_label: "File Organizations"
toc_icon: "sticky-note"
---

# Database System

## Tree Indexing File

- Index entries(인덱스 항목)은 **multi-level** index를 기반으로 **트리(tree)**를 사용하여 구성됨
- 검색키로 정렬되고 또 검색키로도 활용됨
- 트리의 각 노드는 디스크의 페이지에 해당되고 인덱스 항목은 검색 키 값을 기준으로 정렬된 순서로 정렬
- 리프(Leaf) 페이지에는 인덱스 항목이 포함되어 있고 리프가 아닌 페이지에는 검색 키 값으로 구분된 노드 포인터가 포함됨
- 모든 검색은 루트(Root) 노드에서 시작되며 리프가 아닌 페이지의 페이지 내용은 또 리프 노드로 이어짐

### Tree Indexing File

- 인덱스 파일은 다음과 같은 노드(페이지) 구조의 **multi-way searching tree**임

![image](https://user-images.githubusercontent.com/55765292/137068148-f55341c5-c933-4dcd-93e2-fa094b672540.png){: width="80%" height="80%"}{: .align-center}

- K1, K2, ..., Km-1: 검색 값 (정렬됨)
- P0, P1, ..., Pm: 트리(인덱스) 포인터
- K1 < K2 < ... < Km-1

- 예를 들어, m = 4

![image](https://user-images.githubusercontent.com/55765292/137068371-72de3e6a-1c7f-40bf-b66f-0e45fe45551d.png){: width="50%" height="50%"}{: .align-center}

---

- 고객 파일은 'age'인 트리 인덱스로 저장됨

![image](https://user-images.githubusercontent.com/55765292/137068560-19ae897f-8d4e-4d28-be4e-0f6020ed1f7b.png){: width="80%" height="80%"}{: .align-center}

- 검색을 위한 디스크 액세스 수는 루트에서 리프까지의 경로 거리(자격 있는 레코드가 있는 리프 페이지 수를 더한 값)과 같음
    - equality search(i.e., age = 46), 4 액세스
    - range search(i.e., 26 < age < 50), 5 액세스

### Searching Cost : Tree Indexing File

- **N**을 데이터 파일의 페이지 수라고 하고 **F**를 **fanout**(= 리프가 아닌 (인덱스) 노드당 평균 자식 수)로 함
- 루트에서 시작하여 N · (1/F) 크기의 하위 트리로 이어짐
- 트리를 검색할 때 검색 공간은 F의 인수만큼 감소함 / F: N · (1/F) · (1/F) ···
- 인덱스 검색은 검색 공간이 1이 되면 **t** 단계 후에 종료됨
- (즉, 인덱스 리프 수준에 도달했고 원하는 레코드가 포함됨 데이터 페이제를 찾았을 때)
    - (N · (1/F)^t = 1); Thus, t = logF(N)
- 일반적으로 F는 100보다 훨씬 큼
- 즉, 높이가 4인 트리에는 1억 개(100^4)의 리프 페이지가 포함되어 있음
- 따라서 1억 개의 리프 페이지를 검색하려면 4번의 액세스가 필요함
- binary search와 비교 log2(10^8): 25이상의 액세스(I/Os)

### B+ Tree

- B+ 트리는 트리 인덱스에서 가장 보편적으로 사용
- B+ 트리에서 모든 리프 노드는 **같은 레벨**이며 **균형**이 잡혀있음
    - 루트에서 부터의 거리(높이)가 모두 같아서 균형이 맞다고 함
- 루트를 제외한 각각의 노드는 최소 50%를 사용
- B+ 트리에서 검색, 삽입 및 삭제를 위한 I/O 비용은 **logF(N)**으로 제한 됨
    - 여기서 **n/2 <= F <= n** (**n**: maximum fanout)
- 즉, N이 리프 페이지 수인경우 트리 h의 높이는 logF(N)
- 모든 리프 노드는 **double-linked list(이중 연결 목록)**, 이른바 **sequence set(시퀀스 집합)**으로 연결됨
    - 이를 통해서 효율적인 **range search**를 지원

### Clustered/Unclustered B+ Tree

- 데이터 레코드가 힙 파일에 저장되어 있다고 가정
- Clustered index를 만드려면 먼저 힙파일을 정렬해야함

![image](https://user-images.githubusercontent.com/55765292/137073851-7a20520c-5bd1-4c0c-9677-8009b3ac8066.png){: width="80%" height="80%"}{: .align-center}


## Comparing File Organizations

- File Organizations
    - Heap file
    - Sorted file
    - Clustered B+ tree
    - Unclustered B+ Tree
    - Unclustered Hash File
- Operations
    - Scan
    - Equality Search
    - Range Search
    - Insert
    - Delete

### Cost Model for Our Analysis

- 비용 평가를 위한 매개변수
    - B : 파일의 데이터 페이지 수
    - R : 데이터 페이지당 레코드 수
    - D : 디스크 페이지를 읽거나 쓰는 평균 시간
    - F : B+ 트리의 평균 팬아웃(= 각 노드의 자식 수)
    - Mp : 일치하는(= 조건 충족) 페이지 수
    - MR : 일치하는 레코드 수

- example) B = 105; R = 10; D = 10ms; F = 133; MP = 100; MR = 10,000

- 평균 사례 분석을 기반으로 I/O 비용(CPU 시간 무시)만 고려

---

Example: File Operations

- Scan
```
    SELECT *
      FROM Customer
```
- Equality Search
```
    SELECT *
      FROM Customer
     WHERE ID = 345678
```
- Range Search
```
    SELECT *
      FROM Customer
     WHERE 3456789 < ID < 3556790
```
- Insert
```
    INSERT INTO R
         VALUES < . . . >
```
- Delete
```
    DELETE FROM Customer
          WHERE ID = 345678
```

### Heap File

- B = 10^5; R = 10; D = 10ms; F = 133; MP = 100; MR = 10,000
    - Scan : **BD**
    - Equality Search : **0.5BD**
    - Range Search : **BD**
    - Insert : **2D** (레코드가 파일 끝에 삽입되었다고 가정)
    - Delete : **(Linear Search) + D = (0.5BD) + D** (여유 공간을 회수하기 위해 압축이 없다고 가정)

### Sorted File

- B = 10^5; R = 10; D = 10ms; F = 133; MP = 100; MR = 10,000
    - Scan : **BD**
    - Equality Search : **(log2(B))D**
    - Range Search : **(log2(B) + Mp)D**, 여기서 **Mp** : 일치하는 페이지 수
    - Insert : **Binary Search((log2(B))D) + 2(0.5BD)** (레코드의 절반이 이동되었다고 가정)
    - Delete : **Binary Search((log2(B))D) + 2(0.5BD)** (레코드의 절반이 이동되었다고 가정)

### Clustered B+ Tree

- 대안(1)을 사용한다고 가정
    - 데이터 레코드는 리프 페이지에 저장
- 클러스터링되어 있으므로 데이터 파일이 이미 정렬되어 있음
- B+ 트리의 페이지가 67%(2/3) 찼다고 가정 (**F = 0.67**)
- 따라서 리프 페이지 수는 **1.5B**
    - 인덱싱이 없는 파일보다 페이지가 더 많음

- Scan:
    - 모든 리프(데이터) 페이지를 스캔합니다.
    - 비용 : **(1.5B)D**
    - 힙 파일보다 효율성이 떨어짐

- Equality Search:
    - 원하는 레코드가 포함된 리프 페이지를 찾음
    - 루트에서 리프 페이지로 모든 페이지를 가져옴
        - 검색 시간은 트리의 높이
    - 비용 : **(logF(1.5B))D**
    - 검색 키에 키가 없는 경우 모든 정규화된 레코드는 서로 인접해야 함
        - 순서대로 몇 페이지만 가져옴
    - Sorted file 보다 훨씬 빠름

- Range Search:
    - 원하는 레코드가 포함된 첫 번째 리프 페이지를 찾음
        - 또한 equality search 알고리즘을 사용
    - 그 후 리프 페이지는 규정되지 않은 레코드가 발견될 때까지 순차적으로 검색
    - 비용 : **(logF(1.5B) + ​​Mp)D**, 여기서 Mp: 일치하는 페이지 수
    - 다른 파일보다 훨씬 빠름

- Insert:
    - 레코드를 삽입하려면 올바른 리프 페이지를 찾아야 합니다
        - Equality search을 사용
    - 오버플로가 없다고 가정
        - 즉, 리프 페이지에는 새 레코드를 위한 충분한 공간이 있음 (즉, 33% 비어 있음)
    - 비용 : **(logF(1.5B))D + D**
    - 오버플로가 발생하면?? (나중에)

- Delete:
    - 레코드를 삭제하려면 올바른 리프 페이지를 찾아야 함
        - Equality search을 사용
    - 언더플로가 없다고 가정
        - 즉, 리프 페이지는 레코드를 삭제한 후에도 50% 가득 찬 상태를 유지
    - 비용 : **(logF(1.5B))D + D**
    - 언더플로가 발생하면?? (나중에)

### Unclustered B+ Tree

- 대안(2)을 사용한다고 가정
    - 즉, 인덱스 항목 <K, rid>는 리프 페이지에 저장
- 또한 인덱스의 각 항목이 데이터 레코드의 **1/10** 크기라고 가정
- 일반적으로 B+ 트리의 페이지는 67(2/3)% 차있음 (**F** = 0.67)
- 따라서 리프 페이지 수는 **0.1(1.5B) = 0.15B**
- 클러스터되지 않기 때문에 데이터 레코드가 정렬되지 않음 (힙 파일)

- Scan:
    - 모든 리프(인덱스) 페이지(**0.15B**)를 스캔한 다음 각 인덱스 항목에 대한 데이터 레코드를 가져옴
        - 모든 데이터 페이지를 검사해야 함(**BR**)
    - 비용 : **(0.15B + BR)D**
    - 힙 파일보다 훨씬 덜 효율적입니다

- Equality Search:
    - 원하는 인덱스 항목이 포함된 리프 페이지를 찾음
    - 루트에서 리프 페이지로 모든 페이지를 가져옴
        - 검색 시간은 나무의 높이입니다.
    - 리프 페이지를 찾으면 데이터 파일에서 한 번 더 가져와야 함
    - 비용 : **(logF(0.15B) + 1)D**
    - Sorted file 보다 훨씬 빠름

- Range Search:
    - 원하는 항목이 포함된 첫 번째 리프 페이지를 찾음
        - Equality search을 사용
    - 그 후, 정규화되지 않은 인덱스 엔트리가 발견될 때까지 인덱스 엔트리 페이지가 순차적으로 검색됨
    - 각 인덱스 항목에 대해 해당 데이터 레코드에 대해 하나의 페치가 필요
    - 비용 : **(logF(0.15B) + MR)D 여기서 MR : 일치하는 레코드 수**
    - 다른 파일보다 매우 느림

- Insert:
    - 먼저 레코드를 힙 파일에 삽입
    - 해당 데이터 항목을 삽입할 올바른 리프 페이지 찾기 (**logF(0.15B)**)
    - 그리고 다음을 작성 (1)
    - 오버플로가 없다고 가정
        - 즉, 리프 페이지에 충분한 공간이 있음
    - 비용 : **(logF(0.15B) + 3)D**
    - 오버플로가 발생하면?? (나중에)

- Delete:
    - 먼저 힙 파일에서 레코드를 삭제하고 올바른 리프 페이지를 찾아야 함
        - Equality search을 사용
    - 언더플로가 없다고 가정
        - 즉, 리프 페이지는 레코드를 삭제한 후에도 50% 가득 찬 상태를 유지
    - 비용 : **(logF(0.15B) + 3)D**
    - 언더플로가 발생하면?? (나중에)

### Unclustered Hashing File

- 대안(2)을 사용한다고 가정
    - 인덱스 항목 <K, rid>는 해시 디렉토리 페이지에 저장됨
- 인덱스의 각 항목이 데이터 레코드의 **1/10** 크기라고 가정
- 일반적으로 페이지가 80% 차있음 (오버플로를 최소화하기 위해)
- 따라서 인덱스 페이지 수는 **1.25(0.1B) = 0.125B**
- 오버플로 체인이 없는 정적 해싱을 가정
- 클러스터되지 않기 때문에 데이터 레코드가 정렬되지 않음 (힙 파일)

- Scan:
    - 모든 데이터 항목(**0.125B**)을 스캔하고 각 인덱스 항목에 대해 해당 레코드(**BR**)에 대해 한 번 가져옴
    - 비용 : **(0.125B + BR)D**

- Equality Search:
    - 올바른 색인 항목 찾기(1)
        - 해당 데이터 페이지 가져오기(1)
    - 비용 : **2D**
    - 다른 파일보다 매우 빠름

- Range Search
    - 전체 힙 파일을 스캔해야 함
    - 비용 : **BD**

- Insert
    - 힙 파일에 레코드 삽입(2)
    - 읽기/쓰기 해시 버킷(2)
    - 비용 : **4D**

- Delete
    - 데이터 레코드 및 인덱스 항목 찾기(2)
    - 둘 다 다시 쓰기 (2)
    - 비용 : **4D**

### Cost : Comparison of #I/Os

![image](https://user-images.githubusercontent.com/55765292/137081058-e1861524-75b0-44ad-9342-39a29edf6d2d.png){: width="80%" height="80%"}{: .align-center}

---
Exercise : Compute Actual I/O Costs

![image](https://user-images.githubusercontent.com/55765292/137081058-e1861524-75b0-44ad-9342-39a29edf6d2d.png){: width="80%" height="80%"}{: .align-center}

- 각 파일/각 작업에 대한 I/O 비용을 계산
    - 파일에는 10^9개의 레코드가 있음
    - 레코드 크기 = 100바이트
    - 디스크 페이지 = 1,024바이트
    - F = 100; D = 10ms; MP = 1,000; MR = 100,000;
    - 오버플로/언더플로가 없다고 가정
---

### Summary : Comparison of I/O Costs

- Heap File
    - 스캔 및 빠른 삽입 지원
    - 동등, 범위 검색 및 삭제가 느림

- Sorted File
    - 검색 속도가 힙 파일보다 빠름
    - 삽입/삭제에 비용이 많이 듭니다.

- Clustered B+ Tree 
    - 모두에게 효율적입니다! 검색/삽입/삭제
    - 유지 관리가 복잡함

- Unclustered B+ Tree/Hashing
    - 동등/삽입/삭제에 효율적
    - 평등 검색에는 해싱이 최고!
    - 스캔 및 범위 검색에 적합하지 않음

### Comparison of Files

- No Index vs With Index

- Hash vs B+ Tree

- Sorted File vs B+ Tree 

- Unclustered vs Clustered 

- Single Index vs Composite Index (나중에)

---

Exercise : File Selection

다음 SQL 쿼리를 지원하기 위해 적절한 파일 구성을 제안
    - 인덱스가 필요한가?
    - 그렇다면 어떤 종류의 인덱스여야 하는가?
    - B+ Tree or Hash?
    - Clustered or Nonclustered?

```
    SELECT name, phone
      FROM Customer
```
- 전체 파일을 스캔하기만 하면 됨
    - Heap File(No Index)

```
    SELECT name, phone
      FROM Customer
     WHERE age > 50
```
- 정적인 파일이며 대부분 읽기 전용이고 삽입/삭제가 거의 발생하지 않음
    - Sorted File(No Index)

```
    SELECT name, phone
      FROM Customer
     WHERE age = 50
```
- 인덱스가 필요한가? Hash or B+ Tree?
    - 'age'에 대한 Hash 인덱스

```
    SELECT name, phone
      FROM Customer
     WHERE age > 50
```
- 인덱스가 필요한가? Hash or B+ Tree?
    - 'age'에 대한 B+ tree 인덱스
- 만약 이미 'age'로 정렬이 되어있다면?
    - 'age'에 대한 Clustered B+ tree 인덱스
- 만약 age > 12 라면?
    - Heap File (No Index)

```
    SELECT name, phone
      FROM Customer
     WHERE ID = 1234567
```
- 인덱스가 필요한가? Hash or B+ Tree?, Clustered or Unclustered?
    - 'ID'에 대한 Unclustered Hash 인덱스

```
    SELECT name, phone
      FROM Customer
     WHERE age > 50
       AND ID = 1234567
       AND salary < 50000
```
- 각 어트리뷰트에 대한 인덱스는? (이미 'salary'로 정렬되어 있다고 가정)
    - 'age'에 대한 B+ tree 인덱스
    - 'ID'에 대한 Hash 인덱스
    - 'salary'에 대한 Clustered B+ tree 인덱스

---
