---
title: "[Artificial Intelligence] Heuristic search"
categories:
  - Artificial Intelligence
tags:
  - Artificial Intelligence
  - Heuristic search
toc: true
toc_sticky: true
toc_label: "Heuristic search"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

<br>

# Heuristic search

<br>

## Using Evaluation Functions
- Heuristic(evaluation) function $\hat{f}$ ,to decide which node is the best one to expand next
- Function is based on information specific to the problem domain
- Real valued function of state descriptions
- Expand next the node n having the smallest value of $\hat{f}(n)$-> best-first search or heuristic search
- Terminate when the node to be expanded next is goal node

<br>

### From Arad to Bucharest

<img width="912" alt="image" src="https://user-images.githubusercontent.com/55765292/224974536-eb213e5d-94da-407e-b9a8-705f8c9f402e.png">{: .align-center}

<br>

<img width="844" alt="image" src="https://user-images.githubusercontent.com/55765292/224975022-ef549e86-e0ff-4d9e-9ab5-d0dd8eb6dc25.png">{: .align-center}

<br>

### 8-puzzle

<img width="745" alt="image" src="https://user-images.githubusercontent.com/55765292/224975893-066f47b0-fe7d-40ca-8e05-f9e1dbe2ee7b.png">{: .align-center}

- The number of misplaced tiles (not including the blank) //TODO

<br>

## Admissibility of $A^{\*}$

- Conditions for $A^{\*}$ to find minimal cost path
  - Each node in the graph has a finite number of successors
  - All arcs in graph have costs greater than positive amount $e$
  - Optimistic estimator: for all nodes $n$ in search graph,

$\hat{h}(n) <= h(n)$

It is not difficult to satisfy lower bound condition

<br>

- Theorem
  - Under the conditions on graphs and on $\hat{h}, if there is a path with finite cost from start node to goal node, A* is guranteed to terminate with a minimal cost path to goal

<br>

**More Informed**

Two versions of $A^{\*}$
- $A1^{\*}$, $A2^{\*}$, If for all non goal nodes, $\hat{h_1} < \hat{h_2}$
  $A2^{\*}$ is more informed than $A1^{\*}$
- Theorem.
- If $A2^{\*}$ is more informed then at the termination of their search on any graph, every node expanded by $A2^{\*}$ is also expanded by $A1^{\*}$

<br>

**Heuristics for 8-puzzle**

- The **Manhattan Distance**(not including the blank)

<img width="309" alt="image" src="https://user-images.githubusercontent.com/55765292/226569967-37ca4b0a-037d-4863-9a7b-b200ad9f6e54.png">{: .align-center}

<br>

<img width="307" alt="image" src="https://user-images.githubusercontent.com/55765292/226570107-e6ee07a8-2bf4-475b-9e3d-cc61417a4157.png">{: .align-center}

<br>

- In this case, only the “3”, “8” and “1” tiles are misplaced, by 2, 3, and 3 squares respectively, so the heuristic function evaluates to 8.
- In other words, the heuristic is telling us, that it thinks a solution is available in just 8 more moves.

<br>

- Notation: h(n), h(current state) = 8 

<br>

- Seek an function whose $\hat{h}$ values are as close as possible to those of actual h function
- Most informed algorithm, $\hat{h} = h$

<br>

### Relationships among Search Algorithms

<img width="618" alt="image" src="https://user-images.githubusercontent.com/55765292/226570813-0d08cffb-ccc1-4b51-87e1-be28d8453e14.png">{: .align-center}

<br>

### Heuristic Functions and Search Efficiency

- 8-Puzzle
- W(n) = sum of the number of tiles in the wrong place
- Allow tile to move directly to goal square
- Sum of the distances that each tile is from its goal square
- Tiles move to an adjacent square even though there may be a tile.
- Relaxed Model

<br>

### Efficiency of $A^{\*}$

- Cost(length) of the path found
- Number of nodes expanded in finding the path
- Computational effort required to compute $\hat{h}$

<br>

## Search Example-Image segmentation

- Graph G=(N,U): a set of nodes N and a set U of arcs $(n_i, n_j)$
- In a directed arc $n_i$ is called parent and $n_j$ is called successor
- Expansion: identifying successors of a node
- Starting (0 or *root*) level, last (*goal*) level
- Cost $c(n_i, n$j)_ associated with an arc
- Path $n_1, n_2, \dots, n_k$, with each $ni$, being a successor of $ni-1$ Cost of a path is the sum of costs of the arcs constituting the path
- Edge element defined between two neighbor pixels p and q
  $(x_p,y_q),(x_q,y_p)$
- Associate cost with an edge element $H:7$
  $c(p,q) = H −[f(p) − f(q)]$

<br>

<img width="931" alt="image" src="https://user-images.githubusercontent.com/55765292/226572295-88e87769-af59-4ded-bcf5-497672f6e3ca.png">{: .align-center}

<br>

<img width="931" alt="image" src="https://user-images.githubusercontent.com/55765292/226572336-ae2342ca-cdd0-4f0b-9ec0-2ff46b47ffa0.png">{: .align-center}
