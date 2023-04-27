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

# Graph

<img width="903" alt="image" src="https://user-images.githubusercontent.com/55765292/231732415-042bc376-47f4-47cd-8184-65f5da8ee37d.png">{: .align-center}

<br>

### Graph의 유래

- Euler Walk 문제 [1736]
: Starting from a land, is it possible to **return to starting** location after walking across **each** of the bridges **exactly once**?

<img width="903" alt="image" src="https://user-images.githubusercontent.com/55765292/231732612-08a4bd18-fba0-4728-884a-0cac4b5a92fe.png">{: .align-center}

<br>

### Graph의 정의

- **Graph* G = (V, E) where
  - V(G) : a nonempty set of **vertices**
  - E(G) : a (possible empty) set of **edges** $\subseteq$ (V  V)

<br>

➢ Undirected(무방향성) graph : Unordered: (u, v) = (v, u)
➢ Directed(방향성) graph : Ordered: (u, v) ≠ (u, v)

<img width="903" alt="image" src="https://user-images.githubusercontent.com/55765292/231733188-9a934f48-a7c6-4629-91bf-a26e1e5e066b.png">{: .align-center}

<br>

### Graph : 예

<img width="903" alt="image" src="https://user-images.githubusercontent.com/55765292/231733721-62b6ccc3-d11d-471e-8892-105d0ab417fe.png">{: .align-center}

<br>

<img width="903" alt="image" src="https://user-images.githubusercontent.com/55765292/231734017-6066a5ee-a65b-4b52-98d9-47c340d13be4.png">{: .align-center}

<br>

### Graph : 용어

- Adjacent (인접)
  - G2) vertex 1과 인접한 것은? {0, 3, 4} 
- Degree (of vertex) (Directed graph인 경우에는 In-degree와 Out-degree로 분류)
  - G1) all 3 
- Path (경로)
  - G2) 1에서 6까지의 path는? (1,0), (0, 2), (2, 6)
- Cycle
  - G1) O, G2) X, G3) O
- Subgraph

<img width="903" alt="image" src="https://user-images.githubusercontent.com/55765292/231734157-ed810428-8f51-4c5f-8309-34ce41dda8ca.png">{: .align-center}

<br>

### Graph : 유형

- Connected Graph (cf. Disconnected Graph)
  - (a), (b), (d), (e)
- Cyclic Graph
  - cycle을 포함함, (d), (e)
- Acyclic Graph
  - cycle을 포함안함, (a), (b), (c)
- Tree
  - Connected
  - Acyclic
  - (a), (b)
- Complete Graph

<img width="903" alt="image" src="https://user-images.githubusercontent.com/55765292/231734893-c6e5b4fd-f98a-4ce2-853f-c211382b8c3b.png">{: .align-center}

<br>

- Euler path
- Euler cycle
- Hamilton cycle
  - 도시를 한번씩...
  - 이동 비용 최적화 

<br>

### Graph의 구현 : Array 이용

- Adjacency Matrix (인접 행렬)
  - 2 차원 array : A (n, n) (단, n : vertex의 개수)
  - A (i, j) = 1 if vertex i and j is adjacent

<img width="276" alt="image" src="https://user-images.githubusercontent.com/55765292/234823583-f4509f89-c259-43c7-bff1-525e2d049c0e.png">

<img width="259" alt="image" src="https://user-images.githubusercontent.com/55765292/234823797-63979e3f-6c7d-4bda-a309-fb1f5b7f1965.png">

<img width="259" alt="image" src="https://user-images.githubusercontent.com/55765292/234823834-83ed5061-6b99-402d-a9de-1daa61410914.png">

<br>

### Graph의 구현 : Linked List 이용

- Adjacency List (인접 리스트)
  - AL[n]이라는 array (단, n : vertex의 개수)를 설정;
  - 각 vertex i 에 대해 다음과 같이 linked list를 생성;
    - 1) 각 AL[i]는vertex i에 대한 linked list의 첫번째 node를 가리킴.
    - 2) 각 node는 (Vertex, Link)로 구성됨.
    - 3) 각 linked list i 는 그 vertex i에 인접(adjacent)한 모든 vertex들을 연결함.
  - (참고 : 각 list의 인접한 vertex들은 일반적으로 정렬 안 함)

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234824362-332bd1c1-4be3-487d-87b9-f6564cd3ad08.png">

<br>

# Graph Traversal (순회)

- From a start vertex v, visit all vertices in a graph G that is reachable from v.
  - (참고: Tree : inorder, preorder, postorder, level order)
- Many problems can be solved using a graph traversal.
  - Is there a path from one vertex to another?
  - Is the graph connected?
  - Find a spanning tree.
  - Find an articulation point
- Two commonly used methods
  - Breadth First Search (BFS)
  - Depth First Search (DFS)

<br>

- DFS와 BFS
  - DFS는 stack, BFS는 queue으로 각각 구현
  - PREORDER 순회를 일반화 한 것이 DFS
  - Level Order 순회를 일반화 한 것이 BFS
- 방문된 vertex의 여부를 알기 위해 VISITED[ ]라는 array 사용
  - VISITED[ ]를 false로 모두 초기화;
  - VISITED[ i] 가 true면, vertex i 는 이미 방문했음.

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234825899-2f5ef915-47a2-404e-9021-0794eb241a31.png">

<br>

## Depth First Search (DFS)

- From current vertex **v**, we always visit a vertex adjacent from **v**.
- Visit all of **v**’s descendents before we move to an adjacent vertex.

```
DFS (v)
{
  Mark vertex v as visited.
  for (each unvisited vertex u adjacent from v)
    DFS (u);
}
```

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234826554-f4a62da4-34cd-40cf-a600-339015379b1d.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234827328-956c0132-f388-451f-a9eb-15ee7157f3fc.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234827642-eb2c285b-f2d0-438c-8e9d-919167dd023e.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234827707-0faf68cf-d916-4472-ad20-973e49e97f6c.png">

<br>

## BFS

- Visit **all adjacent** vertices of a vertex **before going** to the **next level**.

- BFS Algorithm
  - 1. Visit start vertex and insert it into queue;
  - 2. Repeat 1), 2), 3) until queue is **empty**.
    - 1) **Delete** a vertex from queue;
    - 2) **Visit** all of its adjacent vertices (if any);
    - 3) **Insert** all of newly visited vertices into queue;

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234828334-40b18105-7644-4d02-8672-03e8d7bb2612.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234829038-4f4a92ee-83be-427f-95c0-98426add91af.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234829090-67cdccf1-012e-4653-885d-eac7873b6484.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234829119-3c2cd7d4-bf98-49db-8d6d-4f7bac577204.png">

<br>

## Time Complexity : DFS / BFS

- Adjacency Matrix를 사용
  - O(n^2)
- Adjacency List를 사용
  - O(n + e)

<br>

## DFS & BFS : 연습

- 다음 각 graph에서 DFS와 BFS로 순회한 결과 (즉, 방문한 vertex와 edge들을 나열)를 모두 보여라.

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234829689-862e2846-18c4-4e3a-a3b5-de873cfbd9ab.png">

<br>

- DFS
  - A $\rightarrow$ B $\rightarrow$ D $\rightarrow$ C
  - A $\rightarrow$ C $\rightarrow$ D $\rightarrow$ B
- BFS
  - A $\rightarrow$ B $\rightarrow$ C $\rightarrow$ D
  - A $\rightarrow$ C $\rightarrow$ B $\rightarrow$ D 

- DFS
- BFS

<br>

## Graph Traversal : 응용

- From given vertex 2, can we reach vertex 7?
- Is this graph connected?

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234830954-f6b964b3-1639-4af8-a6f8-7043952e7b1e.png">

<br>

- BFS
  - VISTIED[] = {T, T, T, T, T, T, F, T, T, F, F}

<br>

# Spanning Tree (신장 트리)

## DFS

- 다음의 connected graph G에 DFS를 수행하면 (단, V0 에서 출발), 그 결과는 Tree 형태가 생성됨. 이를 DFS spanning tree G’라 함

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234831788-aebde811-dac1-4fa9-b05b-7c12f653c3f1.png">

<br>

## BFS

- 다음의 connected graph G에 BFS를 수행하면 (단, V0 에서 출발), 그 결과는 Tree 형태가 생성됨. 이를 BFS spanning tree G’라 함.

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234832395-1df42db8-e7b6-4c23-b7d7-771a0bd92479.png">

<br>

- **Spanning tree** G’ is a subgraph of G such that
  - (1) **V(G’) = V(G) = n** (n : vertex의 개수) (즉, G의 모든 vertex들을 포함)
  - (2) G’ is **connected**.
  - (3) G’ has (**n – 1**) edges. (즉, Acyclic Graph)
  - (4) If we add an edge into G’, then a **cycle** is generated.
  - (5) If we delete an edge from G’, then G’ is **disconnected**.

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234833047-055ed8d5-2a08-46ba-a392-de99e17721fd.png">

<br>

# Weighted Graph

- Weighted Graph : 각 edge에 weight(가중치)를 부여한 graph (가중치의 예 : 거리, 건설비용, 등)

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234834216-f15776ba-da33-4186-9cc0-9de165194add.png">

<br>

## Minimum Spanning Tree (MST)

- 예 : 비행기 노선 망 설계
  - 최소 비용으로 모든 공항을 연결하는 노선
  - 모든 공항을 다 연결하는데 필요한 노선이 최소 몇 개 필요하나?
- Minimum Spanning Tree (최소 신장 트리)
  - Spanning tree들 중 weight의 총 합(total sum)이 가장 적은 것.
  - 모든 vertex들을 다 연결하여야 함.
  - Cycle이 발생하면 (비용을 줄이기 위해) 이를 무조건 제거.
  - 어느 edge를 제거하는 것이 전체 비용을 최소화할 수 있는지?
  - (n – 1) 개의 edge들이면 충분 (단, n : vertex 개수)

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234834868-075962bd-d8ef-4f0c-a26b-ec027a7dbc75.png">

<br>

### Greedy (탐욕)Algorithm

- (문제를 푸는 과정에서) 가장 좋아 보이는(looks best right now) 이득을 먼저 취하는 방식
- 현재 상태에서 전역적(global)인 이득은 예측할 수 없음. 그러나 나중에 전체적으로 크게 봐도 이득이 된다는 접근 방식
- 항상 Best Solution을 보장하지는 않지만, 어떤 경우에는 보장함.
- 다음 문제에서 “greedy” 한 선택은 무엇일까? 그리고 이 선택이 Best Solution을 제공할 까?
  - Road Driving
  - Knapsack(배낭) 문제
  - Shortest Paths
  - MST

<br>

# MST Algorithms

- (1) Kruskal’s Algorithm
- (2) Prim’s Algorithm
- (3) Sollin’s Algorithm (각자 공부! : 교재 혹은 Google 참조)

<br>

- 위의 방식 모두 Greedy Algorithm에 기반을 둠.
- 위의 방식 모두 Optimal Solution (즉, MST가 항상 보장됨)을 항상 제공함.

<br>

## Kruskal’s Algorithm

- n 개의 vertex들로부터 시작 (단, edge는 0 개)
- 현 시점에서 가장 smallest edge를 우선적으로 선택 : Greedy!! (단, cycle을 유발하는 것은 제외함)
- 중간 과정에 forest (즉, 여러 개의 tree들의 집합)이 생성됨.
- 최종적으로 선택된 edge들이 총 (n – 1)개이면 종료됨

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234836890-7951d89b-61a4-4f56-b12a-97fcb39cfa68.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234836913-d950b263-3a7d-411f-aef0-163a3d92fbe5.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234836949-0313c24c-aa4f-4ac2-86ca-5ed43e52d64d.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234836973-c2989074-b260-4b45-bee5-e90c40e9ce43.png">

<br>

```
T = ∅;
while (T contains fewer than n – 1 edges) and (E is not empty) do
{
choose a minimum weighted edge (u, v) from E;
delete it from E;
if ((u, v) does not create a cycle in T) add (u, v) to T;
else discard (u, v);
}
If (T contains fewer than n - 1 edges)
print (“no spanning tree”);
```

- E : Graph G의 edge들의 집합
- T : MST 의 edge들의 집합

<br>

## Prim’s Algorithm

- n 개의 vertex들로부터 시작 (단, edge는 0 개)
- Start vertex를 임의로 선정. (아무런 vertex에서 출발해도 무관)
- 현재까지 연결된 tree 안의 각 vertex에 인접한 edge들 중 smallest 인 것을 선택. 단, cycle을 유발하는 것은 제외함.
- 이런 식으로 1-vertex-tree, 2-vertex-tree, . . ., n-vertex-tree 까지 만든 후 알고리즘은 종료됨.
- Kruskal 방식과는 달리 계산 중간 과정에 항상 tree 형태가 유지됨.

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234838415-9bf4a49a-0ce3-47dc-914c-4112c052faaf.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234838487-bb1823c7-04c8-4150-8dfe-0f29cd9e07ff.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234838527-0e729b9c-b3cd-4aea-98ba-df6a95abc7d1.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234838651-1bc14f26-7844-473a-ac2c-3d477d864765.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234838681-9389fb1c-3984-47e3-860a-5d493ab85627.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234838759-c44d019c-c03a-4c2f-9cb4-a904c12a7b08.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234838779-5fd703fb-fbd0-4a67-9bf8-02427f9e6ddb.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234838821-cbabd81e-314f-47c1-b0f1-55aac3796a5f.png">

<br>

```
T = ∅;
TV = {0}; /start를 vertex 0으로 가정/
while (T contains less than n - 1 edges) do
{
Choose a minimum weighted edge (u, v) such that
u ∈ TV and v ∉ TV; /즉, cycle이 형성안 됨)
if (there is no such edge) break;
else add v to TV;
}
if (T contains fewer than n - 1 edges) print (“no spanning tree”);
```

- T : MST의 tree edge들의 집합
- TV : MST 의 vertex들의 집합

- MST Algorithm : 구현
- While loop을 매번 수행할 때 마다, 다음을 check해야 함;
1) (u, v)가 minimum weighted edge 인가?
✓ edge들을 Min Heap에 저장한 후, 차례대로 delete 함.
✓ O(log2e)
2) (u, v)가 cycle을 형성하나?
✓ u와 v가 모두 같은 component( 혹은 집합)에 속하면 cycle (Kruskal 방식)
✓ u와 v가 모두 한 TV에 속하면 cycle (Prim 방식)
✓ union-find algorithm을 사용
✓ O(log2e)
▪ 총 수행 시간 = while loop 회수 * Checking 회수 = O(elog2e)

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234839063-46f27b18-1075-44ba-996a-3bd47a77e507.png">

<br>

# Bi-Connected (이중 연결) Graph

- Articulation point (AP : 단절점)
  - Graph G에서 어떤 vertex v를 삭제했을 때, 2 개 이상의 그룹으로 분리되는 경우 (즉, 연결이 끊김), v를 G의 단절점(AP)이라 함.
- Bi-Connected (이중 연결) Graph
- 모든 vertex pair들을 연결하는 path가 2 개 이상인 graph
- 어떠한 AP도 존재하지 않는 graph.
- 즉, 어떠한 vertex를 삭제하더라도 그 결과는 항상 connected 임.
  - 예: 항공 노선 (A → B → C)에서 공항 B에 장애가 있을 시, 다른 경로를 통해 C에 도달할 수 있는 노선의 설계가 필요

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234839192-f76fca46-376b-4b9e-a57d-b99b85b3ec64.png">

<br>

## Finding AP : DFS 이용

- Graph G의 AP들을 찾기 위해 다음과 같이 DFS를 이용
- DFS를 이용하여 G에서 임의의 vertex에서 출발하여 순회함. 그 결과는 DFS Spanning Tree T 가 생성됨.
- G에는 있었는데 T에는 누락된 edge들을 존재함.
  - 이를 Back Edge (혹은 Escape Edge)라고 함.
- 어떤 vertex가 삭제될 때, 분리된 graph들이 이러한 Back Edge들을 통해 (탈출!) 연결될 수 있음.

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234839842-48be9794-ba6e-40de-9a8c-5dc9d6733051.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234839893-c8ec69a3-7b49-48d8-aa1e-7b1a75608ba1.png">

<br>

예: 3은 자식이 2 개인 root이므로 AP임. 4는 후손 1과 back edge (1, 3)로 된 경로를 통해 조상 3에 도달하므로 AP가 아님. 1은 후손 0이 있으나, 1의 조상들로 연결하는 back edge가 없으므로 AP 임. 0, 9, 8은 leaf이므로 모두 AP가 아님. 5, 7도 역시 AP임.

<br>

- DFS Spanning Tree에서 vertex u 가 다음 조건들 중 하나만 만족하면, 이는 단절점(AP)임.
  - 1) u 가 2 개 이상의 child 들을 갖는 root 임.
  - 2) u 가 다음 조건을 만족하는 최소한 1 개 이상의 자식 w를 가짐.
- 조건 : w와 (만약 w의 후손이 있다면) w의 후손들과 back edge로만 이루어진 path를 통해 u의 조상에게 도달하지 못 함.
- 참조: u가 만약 조상이 없으면 u는 root이므로 OK. 역시 u가 자식이 없으면 u는 leaf이므로 OK.

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234840878-920a0110-d246-4039-b1b2-c0e85d17a6e4.png">

<br>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/55765292/234840920-429c51ef-5a20-4b07-9d32-2beb75d56415.png">



