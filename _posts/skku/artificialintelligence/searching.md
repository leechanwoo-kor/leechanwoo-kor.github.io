---
title: "[Artificial Intelligence] Solving problems by Searching"
categories:
  - Artificial Intelligence
tags:
  - Artificial Intelligence
toc: true
toc_sticky: true
toc_label: "Solving problems by Searching"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

<br>

# Solving problems by Searching

## Problem Solving

### The 8-Puzzle:
- 3 x 3 board with eight numbered tiles and a blank space

![image](https://user-images.githubusercontent.com/55765292/222054652-ede556f8-7c0e-4574-a1fc-d0100261a202.png){: .align-center}

<br>

### Cryptarithmetic Problem

![image](https://user-images.githubusercontent.com/55765292/222054705-6efc06bc-1292-48a9-b0e6-8c673acc12b8.png){: .align-center}

- Assign a decimal digit to each of the letter in such a way thatanswer to the problem is correct.
- If the same letter occurs more than once, it must be assigned same digit each time.
- No two different letters may be assigned same digit

<br>

## 2.1 Well-defined problems and solution

<br>

- Basic elements of a problem definition: states and actions
  - Initial state
  - Operator: description of an action in terms of which state will be reached by carrying out the action in a particular state
  - Goal test: agent can apply a single state description to determine if it is a goal state.
    - explicit set of possible goal states
    - specified by abstract property
  - Path cost function: a function that assigns a cost to a path

- State space: set of all states reachable from the initial state by any sequence of actions.
- Path: any sequence of actions leading one state to another.
- Solution : a path from the initial state to goal state

<br>

## 2.2 Example Problems

- The 8-Puzzle:
  - 3 x 3 board with eight numbered tiles and a blank space

![image](https://user-images.githubusercontent.com/55765292/222054652-ede556f8-7c0e-4574-a1fc-d0100261a202.png){: .align-center}

- States: a state description specifies the location of each of the eight tiles.
- Operators: blank moves left,right,up or down
- Goal test: state matches the goal configuration
- Path cost: each step costs 1.
  - path cost is the length of the cost

<br>

### Search Tree for the 8 puzzle problem

- States: a state description specifies the location of robot, sensory input values
- Operators: move north, south, east, west
- Goal test: state matches the goal location
- Path cost: each step costs 1 Path cost is the length of the path

![image](https://user-images.githubusercontent.com/55765292/222057967-47bc28aa-a4e0-443c-bc89-8c45ce3555b7.png){: .align-center}

<br>

### Robot in a Two Dimensional Grid World

- Boundary
- Solid object
- The robot senses whether the eight surrounding cells are free for it to occupy

![image](https://user-images.githubusercontent.com/55765292/223384894-63b7c893-f405-4794-89b7-21bbca3e82e8.png){: .align-center}

- Large, unmovable objects(obstacles)
- Move from start state to the goal state avoiding obstacles
- Robot is able to sense whether or not the eight cells surrounding it are free
- Sensory inputs: s1,s2,…,s8. Either 0 or 1, 0 if cell is free
- Four actions - move north, south, east, west

<br>

- States: a state description specifies the location of robot, sensory input values
- Operators: move north, south, east, west
- Goal test: state matches the goal location
- Path cost: each step costs 1. Path cost is the length of the path

<br>

### Travelling Salesperson Problem

- Each city must be visited exactly once.
- The aim is to find shortest path.
- In Romania Map
- State: in Oradea, visited {Arad, Sibiu}

![image](https://user-images.githubusercontent.com/55765292/223385383-9e473d84-c1e3-4737-b922-a5d0a403782e.png)

<br>

## Search Tree and Graph

- Find a path from Arad to Bucharest
  - initial state Arad
  - after expanding Arad
  - after expanding Sibiu

<br>

#### Tree search example

![image](https://user-images.githubusercontent.com/55765292/223387254-87a01aac-611f-4400-b8f0-b76810839456.png)

<br>

![image](https://user-images.githubusercontent.com/55765292/223387436-a972b22d-f0b6-445b-8922-37fc374fda98.png){: .align-center}

<br>

## Search Tree and Graph

<br>

### Generating Action Sequences

- Apply operators to the current state => generate new set of states. : Expanding state
- Choose a state
- Test if this is a goal state
- If it is not expand it.
- Choosing → testing → Expanding

- **The choice of which state to expand first is determined by the
search strategy**

<br>

### Search Strategies

- To formalize a little we can define four criteria used to measure search strategies
  - Completeness : Is the strategy guaranteed to find a solution?
  - Time Complexity : How long does it take to find a solution?
  - Space Complexity : How much memory does it take to perform the search?
  - Optimality : Does the strategy find the optimal solution where there are several solutions?

<br>

### Graph Notation

- Consists of nodes
- Connected by arcs
- Directed arc
- Nodes: states
- Arcs: operators
- Parent node
- Child node
- Edges: undirected graph
- Directed tree: each node(except one) has exactly one parent
- Root node

<br>

### Search Tree and Graph

- Node in the tree having no successors: leaf node
- Depth of node: 0 for root node $depth$(node)= $depth$(parent)+1
- Undirected tree is an undirected graph in which there is one and only one path along edges between any pair of nodes
- If all nodes except leaf nodes have the same number $b$ of successors, $b$ is called $branching factor$ of the tree

<br>

- A sequence of nodes $(n_1, n_2, \dots, n_k)$
  Path of length $k-1$ from node to $n_1$ to $n_k$
- If a path exists from node $n_i$ to $n_j$ , then $n_j$ is accessible from node $n_i$
- $C(a)$: cost of an arc $a$
- Cost of a path between two nodes: sum of the costs of all of the arcs connecting nodes on the path
- Optimal path: path having minimal cost

<br>

#### Graph

![image](https://user-images.githubusercontent.com/55765292/223391792-110185eb-d64a-4892-bd4c-58a3f17fd758.png){: .align-center}

<br>



## Search Strategies

<br>

### Uninformed Search (Blind Search)

- No information about the number of steps or the path cost from the current state to the goal
- Distinguish goal state from a non goal state
- No preference among Sibiu, Timisoara, Zerind

<br>

### Informed Search (Heuristic Search)

- Since Bucharest is southeast of Arad, and Sibiu is in that direction, so it is likely to be the best choice.
- Uninformed search strategies are distinguished by the order in which nodes are expanded.

<br>

### Breadth First Search (BFS)

- Root node is expanded first
- All nodes generated by the root node are expanded next, and their successors
- All nodes at depth d in search tree are expanded before the nodes at depth $d+1$
- Considers all the paths of length 1 then all those of length 2, and so on.

<br>

- If there are several solutions, it find the shallowest goal state first
- Complete
- **Optimal** provided the path cost is a nondecreasing function of the depth of the node
- Why it is not always the strategy of choice?

<br>

![image](https://user-images.githubusercontent.com/55765292/223393515-b91fb20f-e559-4887-b43c-d3b39aa58559.png){: .align-center}

<br>

- Assume branching factor is $b$
- Suppose that solution has a path length of $d$
- Maximum number of nodes expanded before finding a solution
  $1+b+b^2+b^3+ \dots + b^d$
- Exponential complexity (Time and Space) $O(b^d)$
  - Depth $d$ =12
  - Assuming branch factor $b$ =10, 1000 nodes/second, 100 bytes/node
  - Time: 35 years, Memory: 111 tera bytes

<br>

### Uniform cost search

- Expand the lowest cost node measured by path cost $g(n)$
- Breadth first search is uniform cost search with $g(n)=d(n)$
- Finds cheapest solution provided that the cost of a path never decrease as we go along the path.(i.e. every operator has a nonnegative cost)

$g(Successor(n)) >= g(n)$

- for every node $n$

<br>

#### Route Finding Problem

<img width="476" alt="image" src="https://user-images.githubusercontent.com/55765292/223396891-c659863e-d472-48d9-bf50-5e41ae0d4a07.png">{: .align-center}

<br>

### Depth-first search (DFS)

- Expand one of the nodes at the deepest level of the tree.
- When the search hits a dead end (a non goal node with no expansion) ,search go back and expand nodes at shallower levels.
- Modest memory requirements.
- $bm$ nodes
- $b$: branching factor, $m$ :maximum depth

<br>

- Time complexity
- For problems that have many solutions, depth first may be faster than breadth-first
- Get stuck: infinite depth
- Not complete
- Not optimal

<br>

#### Depth-First Search with a depth-limit

<img width="723" alt="image" src="https://user-images.githubusercontent.com/55765292/223398204-fa3a6249-359f-42e7-ac86-d1710f2eeba6.png">{: .align-center}

<br>

<img width="707" alt="image" src="https://user-images.githubusercontent.com/55765292/223399322-aab246d9-d455-49a3-a820-103376604bda.png">

<br>

### Depth-limited search.
- Impose a cutoff on the maximum depth of a path
- Map of Romania, 20 cities
- Solution must be of length 19 at the longest
- Complete
- Not optimal
- If we choose depth limit that is too small,
  - Complete? Optimal?
- Time complexity $O(b^l)$
- Space complexity $O(bl)$
- $l$: depth limit

<br>



