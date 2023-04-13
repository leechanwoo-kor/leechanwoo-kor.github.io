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






