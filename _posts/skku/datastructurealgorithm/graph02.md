---
title: "[Data Structures & Algorithms] Graph"
categories:
  - Data Structure
  - Algorithm
tags:
  - Graph
toc: true
toc_sticky: true
toc_label: "Graph"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222598023-0eced08e-a03a-4366-a388-c9e2b218127b.png)

<br>

# Shortest Path (SP)

- 출발지(source)에서 도착지(destination)까지 (여러 path들 중에서) 길이가 가장 짧은 경로를 구하는 문제
- Graph의 각 edge에 weight (즉 거리)가 주어지고, 연결(connected) 되었다고 가정

- 다음의 2 가지 유형의 SP 문제가 있음.
  - (1) Single source / All destinations
    - Greedy Algorithm에 기반
    - Dijkstra Algorithm를 사용
  - (2) All pairs (= every vertex is a source and destination)
    - Dynamic Programming (동적 프로그래밍)에 기반

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236168427-86e9ebfe-606e-4b70-8da1-8a901abbf789.png">

- 1에서 7까지 shortest path는?
  - (1, 3), (3, 6), (6, 7) = 2 + 8 + 1 = 11

<br>

- SP에 Brute Force 를 적용시키면?

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236168714-e0789318-155a-49c3-ae8b-c7d6cd35e4f4.png">

Brute Force (무차별 전체 탐색 방식)을 적용하면 SP를 물론 찾음.
즉, 1 에서 7까지 모든 가능한 경로들을 탐색하여 이 중에서 최소
거리인 경로를 선택. 그러나 Too inefficient!

<br>

- SP에 단순한 Greedy를 적용시키면?

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236168871-7e1c862b-59e8-4f3d-b7ff-2fde9e749ad9.png">

다음과 같은 Greedy를 적용하면 항상 SP를 찾을 수 있을까?
“ 현재 vertex에서 인접한 edge들 중 smallest weight 를 항상 선택 "

답 : NO!
(1, 3), (3, 5), (5, 4), (4, 7) = 2 + 3 + 4 + 3 = 12

<br>

### Single Source / All Destinations SP

1에서부터 각 vertex까지 SP와 그 거리를 오름차순으로 차례대로 출력

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236169079-fb2aa477-f9b6-49a9-af8b-f7fe541c5339.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236169156-c4a5b00b-972e-4cc7-93a6-cef66bc02837.png">

<br>

### SP가 갖는 특성들

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236169217-9bfb4615-5421-4ac2-b385-6de53d983f30.png">

- 다음으로 길이가 긴 SP는 앞에 생성된 SP들 상의 vertex(들)만을 도중에 경유해야 함. (즉, 앞의 SP들 상에 없는 다른 vertex들은 경유 할 수 없음)
  - 예: Length 9인 SP가 경유한 vertex들은 3, 5이며, 이들은 앞의 SP들에 존재함.
  - 즉, 2, 3, 5 이외의 다른 vertex들(예: 6, 7 등)은 경유하지 못함.
- SP의 sub-path는 그 자체가 역시 SP이며, 이는 tree 이다.

<br>

# SP : Dijkstra’s Algorithm

- Starting from a source vertex v, find the shortest paths to other vertices at each step.
- Let **S** : set of vertices to which the shortest path from v is found. 
  - (Initially, **S** = {v})
- At each step, add each vertex into S (until **S** is full).

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236170273-611e59ee-4683-45f5-8e78-ba8f8243989e.png">

- Question:
  - 1) 각 단계에서 어떤 vertex를 선택해서 S에 추가할 것 인가?
  - 2) 각 단계에서 vertex를 추가한 후 어떤 작업을 할 것 인가?

<br>

- (1) At each step, **add** a vertex $u$ whose distance is **minimum.**
  - DIST[$u$] : Length of shortest path from $v$ to $u$, **going through only vertices** in $S$
  - COST[$u,w$] : weight of edge ($u, w$)
(단, $w$는 $S$에 포함이 안 된 vertex)
- (2) After adding $u$, **update** DIST[$w$] as follows;
  - DIST[$w$] = MIN {DIST[$w$], DIST[$u$] + COST[$u, w$]}

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236171029-d84f7ab5-c02b-407b-9eb3-4fa00cded88a.png">

<br>

- ① 은 (현재까지 알려진) $v$에서 $w$까지 SP의 길이; ① > ② 의 의미는 $v$에서 ($S$에 방금 추가된) $u$를 통한 $w$까지 SP의 길이가 더 작다는 것으로, DIST[$w$]를더 작은 새로운 값으로 갱신해야 함. ① <= ② 는 변화가 없다는 의미.

<br>

## SP : Example

- Find the shortest path from Boston to each of the other cities on the graph. (by increasing order)

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236171466-ed9fc261-ae6e-4710-bd03-b99860fd2576.png">

- 다음은 4 에서 (현재까지 알려진) 각 vertex w까지 SP의 길이로 초기화됨. 나머지 모든 vertex들은 거리를 (즉, 매우 큰 값을 의미)로 표현.

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236171869-a6727d83-0f0e-4d50-b4cc-68f205d0d933.png">

<br>

- 앞의 graph를 COST 라는 2차원 인접 행렬로 각 거리를 표현 한 것임. 여기서 빈 공간은 vertex i와 j가 인접 안 했으며, 로 가정.

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236171933-66540707-b66d-4053-91f1-4a65e39f1be5.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236172179-d273d5f8-b4ef-4257-a62a-767c5179f17f.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236172218-6a24c351-070a-4ec4-9f26-348189c5b363.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236172322-7840f1d1-f31e-4dd7-8bfb-39d2ab2ff4f4.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236172442-e1f6523a-65e5-48fd-95c7-82ccd51f369b.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236172497-821f4372-e16d-485d-a714-b897ac16d6cd.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236172700-55f5a6b1-8958-45cd-aafe-f9542dba4971.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236172802-fc6a81fa-5b53-4d1c-8024-bdce8d50e931.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236172859-321d077e-e69b-455e-9233-97e3f93ab33c.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236173042-1d51c40a-54ef-4508-8589-0fcd7ba79457.png">

<br>

## Dijkstra Algorithm

<br>

```
Shortest Path (v, COST, DIST, n)
  int S[n];                     / SP에 속하는지 여부를 나타내는 배열 S를 생성/
  for (i = 0; i < n; i++) do
  {
    S[i] = 0;                   / S를 0으로 모두 초기화/
    DIST[i] = COST[v,i]         / v는 source vertex; DIST를 초기화/
  }
  S[v] = 1;                     / v를 S에 추가/
  DIST[v] = 0;
  for (i = 0; i < n – 2; i++)
  {
    Choose u; DIST[u] = MIN{DIST[w]} with S[w] = 0; /최소값인 vertex를 선택/
    S[u] = 1; / u를 S에 추가함 /
    for all w with S[w] = 0 do / S에 없는 vertex들의 거리를 모두 갱신/
    DIST[w] = MIN{DIST[w], DIST[u] + COST[u,w]}
  }
```

- Time Complexity: $O(n^2)$

<br>

### Shortest Path: 연습

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236173858-eee01fde-67fb-45cf-95b5-952eedde2951.png">

<br>

시작점 1로부터 각 vertex까지의 SP를 구하는 과정에서 다음 DIST 가 바뀌는 값들과 선택한 vertex를 적고 거리를 오름차순으로 나열하라.

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236173930-5421cfa4-4386-44e7-b796-abb803f8beba.png">

<br>

# All Pairs Shortest Paths(SP)

- Find the shortest paths between all pairs of vertices
- Dijkstra 알고리즘을 source vertex를 매번 바꾸면서 n 번 호출.
- 시간 성능 : $O(n^3)$
- Dynamic Programming 에 기반을 둔 다른 알고리즘을 소개함. 이 방법이 보다 간결하고 알고리즘 작성이 쉬움.
- 편의상 vertex들을 0에서 (n – 1) 까지의 정수들로 표현한다고 가정
- 주어진 Graph를 다음의 인접 행렬로 표현하여 초기화
  - COST[i, j] = weight of <i, j> where i ≠ j
  - COST[i, j] = 0, where i = j
  - COST[i, j] = ∞ , where <i, j> ∉ E(G)

<br>

## Dynamic Programming (동적 프로그래밍)

- ‘다음 단계로 진행하기 위해 계획한다’는 의미로 ‘동적 계획법’이라고도 함
- 주어진 문제를 해결하기 위한 과정을 여러 단계로 나눈 후 하나의 단계에서 다음 단계로 진행하면서 나타나는 정보를 이용하여 전체 문제를 해결하는 알고리즘
- 이전 단계에서 계산된 중간 결과를 현재 단계에서 사용할 수 있음. 즉 재사용을 함으로서 최적화를 위한 문제해결 기법 중 하나
- Dynamic Programming의 예
  - Fibonacci Number
  - Matrix Chain Products
  - Warshall Algorithm
  - All Pairs Shortest Paths

<br>

### Ak [i, j]의 정의

- $A^k$ [i, j] 의 정의 (단, i, j, k는 0과 n -1 까지에 있는 임의의 정수)
  - $A^k [i, j]$ : Vertex i에서 j까지의 Shortest Path(SP)의 길이
  - (단, i 에서 j까지 도착할 때까지 k 보다 큰 어떠한 vertex도 경유하면 안 됨)

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236174966-8043dadb-2882-41df-b45a-00c382dc59af.png">

- 즉, Ak [i, j]는 vertex i에서 출발해서 j 에 도착했을 때의 SP의 거리
  - 조건 : 단, 중간에 경유하는 모든 vertex들은 k 이하이어야 함;
  - 즉, vertex 0, 1, . . . , k 들만 경유해야 함;
  - 즉, k 보다 큰 k+1, k+2, k+3, . . . 들 중 어떠한 것들도 경유하면 안 됨

<br>

- $Ak [i, j]$ 의 의미
  - k = -1 : $A^{-1}[i, j]$ = COST[i, j] (즉 어떤 vertex도 경유하면 안 됨)
  - k = 0 : $A^0[i, j]$ (즉 vertex 0만 경유)
  - k = 1 : $A^1[i, j]$ (즉 vertex 0, 1만 경유)
  - k = 2 : $A^2[i, j]$ (즉 vertex 0, 1, 2만 경유)
  - . . . . . . . .
  - k = n-1 : $A^{n-1}[i, j]$ (즉 모든 vertex 0, 1, 2, . . . , n-1을 경유 가능)
- **최종 목표**: $A^{n-1} [i, j]$를 계산함 (단, i은 start, j는 destination)
- 즉, 이는 임의의 각 vertex i 에서 임의의 각 vertex j 까지 Shortest Path의 거리로서, 단 도중에 경유하는 vertex들은 어떤 것이든 상관없다. 

<br>

### $A^k [i, j]$의 계산 방법

- $A^k [i, j]$ (for k = 0, 1, . . n-1)를 계산하는 방법

- Case 1: vertex k를 경유하지 않음
  - (즉, i에서 j까지 k를 경유 안 함; 도중에 0, 1, . . . , (k - 1) 들만 경유함)
  - $A^k [i, j] = A^{k-1} [i, j]$
- Case 2: vertex k를 경유함.
  - (즉, i에서 j까지 k를 경유함; 도중에 0, 1, . . . , (k - 1) 들만 경유함)
  - $A^k [i, j] = A^{k-1}[i, k] + A^{k-1} [k, j]$
- 위의 2 가지 경우를 비교하여, 다음과 같이 최소값을 선택함.
  - $A^k [i, j] = min { A^{k-1} [i, j], A^{k-1}[i, k] + A^{k-1} [k, j] }$

<br>

## All Pairs SP Algorithm

```
All Pairs Shortest Path (COST, A, n)
  for (i = 0; i < n; i++)
  {
    for (j = 0; j< n; j++)
      A[i, j] = COST[i, j] / COST를 A로 복사하여 초기화/
  for (k = 0; k < n ; k++) / 각 경유 vertex k에 대해/
    for (i = 0; i < n ; i++) / 각 출발 vertex i에 대해 /
      for (j = 0; j < n ; j++) / 각 도착 vertex j에 대해/
        Ak [i, j] = min {Ak-1 [i, j], Ak-1[i, k] + Ak-1 [k, j]
  }
```

- 위 알고리즘은 Dijkstra 알고리즘 (구현이 복잡함)을 n 번 호출하는 방식보다 더 간결함.
- Dynamic programming 방식에 기반을 두며, 현재 단계에서의 계산 결과가 다음 단계에 사용하기 위해 저장됨.
- All Pairs SP 알고리즘 시간 성능 : $O(n^3)$

## All Pairs SP : Exercise

- 다음 graph로부터 shortest path들을 구하라. 단, 모든 각 vertex가 source 이면서 destination 임.

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236176863-7eefcffa-a5e2-4113-bc49-35baa52b7610.png">

- 최종 목표: $A^{n-1} [i, j] = A^2 [i, j]$를 구하는 것;
  - 이를 위해, 주어진 $A^{-1}[i, j]$로 부터, $A^0[i, j], A^1[i, j], A^2[i, j]$ 를 차례대로 구해야 함.

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236177504-d56b8c46-9c79-4cb7-829a-77a5b234ffbd.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236177605-b232ee31-85fd-4a68-ae42-b4ca23d4f950.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236177756-6400212e-f050-4a0c-bcae-c1cf5db3d09f.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236177785-b13d4e0a-c354-4cf2-9fe2-1702eb5e9912.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236177820-4e2d1363-ffe4-4753-a40d-4965fec2fdbf.png">

<br>

# AOV Network

- Directed graph로 표현됨.
- 각 vertex에 activity을 부여. 여기서 activity는 수행해야 할 ‘작업’ 등을 의미; 예 : 수업, 공정, 공사, 등
- 각 edge는 2 개의 activity들 간의 선행 관계(precedence relation)를 의미
- 즉, edge <i, j>에서, activity i 를 j 보다 먼저 수행하여야 함.
  - 여기서 i 를 선행자(predecessor), j 를 후속자(successor)라고 함
  - 즉, 작업 j는 작업 i 를 먼저 수행하기 전에는 시작할 수 없음.

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236178200-17df7326-885d-4a0b-b314-01ab22ccf08c.png">

<br>

## AOV Networks : 예 (선수과목 관계)

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236178308-8bdd1f4d-2b1b-46de-8b51-98ba168a5def.png">

<br>

- 어느 학과의 과목들 간의 선수 과목들의 리스트이고, 이를 AOV Network로 표현한 것임. 졸업을 하기 위해 어떤 순서로 과목들을 수강해야 하는지?

<br>

# Topological Sort (위상 정렬)

- AOV network의 모든 vertex 들을 선행 관계 순서로 비교하여 차례대로 출력하여 정렬함.
- 각 단계에서 선행자가 없는 vertex를 아무거나 선택하여 출력한 후, 이 vertex (진출하는 edge들도 모두 함께)를 graph로 부터 제거함.
- 모든 각 vertex가 선행자가 있으면 Cycle이 발생; 이 경우는 불가능한 작업이므로 에러 메시지 출력.
- 모든 값들이 서로 다 비교되는 것이 아님. 따라서 정렬 결과가 여러 개 존재함. 이를 partial order 라고 함.
- 참고로 모든 값들이 다 비교되는 경우, 이를 total order라 함.
- 연습 : Partial order와 total order의 예를 들어라. 

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236179049-80b7c32a-3e7e-40cf-80a7-92a0c5740d52.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236179109-e7c76d52-e273-4e75-8dda-1c3efb9b03bb.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236179686-bb2b9895-46bc-4915-8d5c-ae30f793755c.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236179731-156e51b7-a1cc-4bb5-bcf5-c6ad56008c25.png">

<br>

## Topological Sort : 구현

- Adjacency List로 구현한다고 가정; 즉, 각 vertex는 이와 인접한 vertex들을 모두 linked list로 연결
- 각 Vertex가 선행자가 있음 혹은 없음을 검증하기 위해, 각 vertex의 In-degree를 count 라는 field에 초기화.
- Count가 0 (즉, 선행자가 없음)인 vertex를 임의로 아무거나 선택해서 출력한 후, linked list를 따라가면서 해당되는 각 vertex의 count 값을 1 씩 감소
- 만약 어떤 순간에 모든 vertex의 count 값이 0이 아니면,(즉, 모든 vertex에 선행자가 존재) cycle이 존재하므로 에러 메시지 출력함. 

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236179939-46b655d5-bffe-4bd7-be89-3b1bc0ccbc59.png">

<br>

- Count (즉, V0의 indegree)가 0인 V0를 선택한 후, 해당 linked list를 따라 가면서, vertex 1, 2, 3의 count를 차례대로 각각 1 씩 감소
  - 즉, V0가 graph에서 삭제되었음을 의미함

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236180051-a35aa995-8cf3-4b5e-89a6-cfd44e4aa21e.png">

- V0가 삭제된 후, vertex 1, 2, 3의 count는 각각 0 으로 갱신되었음.
- 이제 이들 vertex 중 임의로 하나를 선택한 후 (예: v2), 해당 linked list를 따라 가면서, vertex 4, 5 의 count를 차례대로 각각 1 씩 감소 (이후 과정은 생략!) 

<br>

# Activity On Edge (AOE) Networks

- Weighted Directed graph로 표현됨
- 각 edge에 activity와 이와 연관된 weight 을 함께 부여.
- 여기서 weight는 그 activity를 수행하는데 걸리는 시간을 의미함.
- 각 vertex는 해당 activity들의 종료를 의미하는 사건(event)를 의미함.
- 즉, 한 event는 그 vertex로 진입하는 모든 activity들이 종료되는 시점에서 발생함.
- start 에서 finish까지의 총 프로젝트를 수행하는데 activity들을 수행하는데 걸리는 최소한의 총 시간은? 이를 더 단축하려면?
- 예: 건물 공사, 다리 공사, . .
- 사례: 미국 국방부 missile 시스템 (3년 단축)

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236180225-82181aed-af7e-4c95-aedf-482e6d8bfab5.png">

<br>

- V4는 a4와 a5가 종료되었다는 event를 의미함.
- a1, a2, a3는 순서에 상관없이 동시에 수행할 수 있음.
- a7와 a8은 V4가 발생한 후(즉, a4와 a5 모두 종료한 후)에만 시작 가능.

<br>

## Critical Path

- Minimum time required to complete the project
- Length of the longest path from start to finish vertex.
- V0, V1, V4, V6, V8 혹은 V0, V1, V4, V7, V8 (2 개가 존재)
- Total length time = 18

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236181015-87537dfb-43e3-4e0e-bf0a-4f63e6fa94f1.png">

<br>

- How to find critical path(s) efficiently?

## Earliest/Latest Time

- Earliest time
  - Event Vi 가 발생할 수 있는 가장 이른(earliest) 시간
  - Length of the longest path from the start V0 to Vi
  - 즉 Vi 로부터 진출하는 모든 activity들을 시작할 수 있는 가장 이른 시간
  - 각 event와 activity에 대한 earliest time을 각각 ee[ ]와 ea[ ] 로 표기
- Latest time for activity ai
  - Activity ai 를 시작할 수 있는 가장 늦은(latest) 시간
    - (단, 프로젝트 전체 수행시간을 초과하지 않음)
  - 각 event와 activity에 대한 latest time을 각각 le[ ]와 la[ ] 로 표기

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236181889-f70c5c3e-608d-4f2a-a5af-4fca6216dee4.png">

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236182020-939b2a5c-6208-4775-88fe-da71aaa752e1.png">

<br>

....

<br>

<img width="950" alt="image" src="https://user-images.githubusercontent.com/55765292/236182356-4f79dc2e-faa6-4ec4-b20f-494fa7fb7d4b.png">




