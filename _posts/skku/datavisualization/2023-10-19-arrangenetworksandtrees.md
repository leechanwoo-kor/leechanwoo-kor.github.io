---
title: "[Data Visualization] Arrange Networks and Trees"
categories:
  - Data Visualization
tags:
  - Arrange Networks
  - Arrange Trees
toc: true
toc_sticky: true
toc_label: "Arrange Networks and Trees"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/159c74c5-0bd2-45f3-939a-f150d8fe4cd8)

<br>

# Networks and Trees

- A **network** (or graph) is made up of nodes and links and specifies the relationship between two or more nodes.
  - Trees do not have cycles.
- Nodes and links can have attributes independently.
- Example: social network on Facebook
  - Node: accounts (people, organizations, or pages)
  - Link: friendship (or subscription)
  - Node attributes: name, photo, website_url, ...
  - Link attributes: last interaction time, ...

<br>

## Network Visualization in InfoVis

- Network visualization is one of the oldest research areas in InfoVis.
- Flight network
- Road network (junctions and roads)
- World Wide Web
- Social networks
- Biological pathways
- Bitcoin Transactions
- Artificial Neural Networks

<br>

# Two Families of Visualization

- **Node link diagram**
  - Uses the connection channels
- **Adjacency Matrix**
- The big question: which is better?
  - Scalability
  - Effectiveness
  - Interactivity

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5d88ee6d-7039-4132-a6d0-e9b7b79f32a8)

<br>

## Node Link Diagram

- In a node link diagram, nodes are drawn as point marks and the links connecting them are drawn as line marks.
- Triangular vertical node link layout
- Spline radial layout

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/849154b6-db82-4819-8854-3b6a36754b15)

<br>

### Vertical Node-Link Layout

- Root on the top
- Leaves on the bottom
- Vertial spatial position shows **depth**
- Horizon tal spatial position does not encode an attribute.
  - Chosen by a layout algorithm

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4ad8e9cd-7f92-4455-af7b-f6d877ba3158)

<br>

### Horizontal Node-Link Layout

- Word Tree

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/28e9ed19-81f4-4148-9efc-eeb5d417fc41)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ed5d6435-3bc0-4eed-a618-4d4b408777d5)

<br>

### Radial Layout

- The distance away from the center shows **depth**
- Vertical & horizontal spatial positions are chosen by a layout algorithm to avoid overlap.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5df15a3b-ef9a-4bed-81b6-28ee7079d3cf)

<br>

### Scalability

- The naïve node-link diagrams are useful for a tree with a few hundred nodes.
- For bigger trees, we need aggregate edges.

<br>

- Toward Better Scalability

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1e8b01c0-c7c5-4722-92a8-48343a47e702)

<br>

### Networks

- What tasks do users want to perforn on graphs?
  - Task taxonomy of graph visualization
- **Topology-based tasks** (can be well supported by node link diagrams)
  - Find the set of nodes adjacent to a node.
  - How many nodes are adjacent to a node?
- **Attribute-based tasks**
  - Find the nodes having a specific attribute value.
- **Browsing tasks**
  - Follow a given path.
- See Lee et al., “Task taxonomy for graph visualization” for more details.

<br>

## Node-link Diagrams for Graphs

- How to determine the position of nodes?

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0c2ac90b-c151-4ca7-8f2d-aa108d91d7d1)

<br>

# Graph Drawing

- **Graph drawing** is a research area that aims to find a “good” 2D dep i ction of networks.
- What is a “good” network layout? (= quality measures)
  - Minimize the number of **edge crossings**
  - Display the **symmetries** of the graph
  - Minimize the **number of bends** along the edges
  - Maximize the smallest **angle between two edges** incident on the same vertex
  - Minimize the **sum of edge length** and the **maximum length of an edge**
  - Minimize the **area of the drawing** by producing a compact graph
  - …
 
<br>

- Many graph drawing algorithms are NP complete and seem not to have a polynomial time algorithm.
- So, we use **approximation** instead.
- **Force-directed graph drawing** is a class of algorithms that are based on a physical model
  - We define forces among the set of nodes/links.
  - We find a layout with minimum energy by simulating the movements of nodes/edges.
 
<br>

# What are the “Forces”?

- Attractive forces are applied to
  - the two endpoints of an edge toward each other
  - all nodes toward the center of the viewbox
- Repulsive forces are applied to
  - each pair of nodes that are not neighbors
  - Forces applied to a node are summed up and used to compute the next position of the node (after a very small fraction of time = simulation)
 
<br>

# Force-Directed Layout

1. Assign random initial positions to nodes
2. Compute the force applied to each node
3. Compute dx and dy
4. Slightly move the nodes towards dx , dy
5. Repeat 2-4 until the layout is stabilized (equilibrium state).

<br>

- Strengths:
  - Good quality
  - Easy to implement
  - Intuitive
  - Flexible
  - Interactive
- Weaknesses:
  - Non-deterministic
    - spatial memory cannot be exploited across different runs of the algorithm
  - Scalability (hairball)
  - Poor local minima
  - Continual bouncing
 
<br>

- The Hairball Problem

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e4e78259-db57-4724-93ff-9ba569d93f43)

<br>


## Toward Better Scalability

- Multilevel scalable force directed placement (sfdp)
- Generate simplified graphs: 𝐺 0 𝐺 1 𝐺 𝑙
  - Graph coarsening
  - Edge collapsing
- Place 𝐺 𝑙
- Use 𝐺 𝑘 1 to place 𝐺 𝑘
- For more information, see “Efficient, High Quality Force Directed Graph Drawing” by Yifan Hu.

<br>

- Multilevel Scalable Force-directed Placement

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c1f263e0-ae4f-4240-a310-888e64894266)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3a58d79a-2a65-4f97-a1cf-33da5107b132)

<br>

## DeepDrawing

- Traditional graph drawing algorithms take long time.
- Sometimes we need to run the algorithm several times to obtain a desired layout (by tuning some parameters)
- Can we accelerate this process using deep learning?
- Wang et al., “DeepDrawing : A Deep Learning Approach to Graph Drawing”(TVCG 2019)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6014cad9-9059-46da-8459-1f9099f7d8de)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/845cdd2e-fa01-499c-b021-461c931e91a6)

<br>

# Adjacency Matrix

- All of the **nodes** in the network are laid out along the vertical and horizontal edges of a square region.
- **Links** between two nodes are indicated by coloring an area mark in the cell in the matrix that is the intersection between their row and column.
- Additional information about nodes and edges can be encoded by coloring matrix.
  - e.g., cluster of nodes
- The matrix becomes **symmetric** for an undirected graph.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d44471c7-de50-4344-a07b-02a0fedf3b94)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0aa7bd71-248a-485d-994e-55e91ef81531)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c78281fe-c87d-4ef2-b14c-d19daf298ab3)

<br>

# Node-link Diagram vs Adjacency Matrix

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6322a30c-f34b-44ce-9f03-837a5efc5f54)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6e07db57-74be-4989-a3a7-f90473f38d88)

<br>

# NodeTrix Idiom

- Node-link diagrams are good for revealing the global structure.
- Adjacency matrices are good for revealing the local structure.
- Can we use both at the same time?
  - Social network data: globally sparse and locally dense
- Nathalie Henry, Jean Daniel Fekete, and Michael J. McGuffin, “ NodeTrix : A Hybrid Visualization of Social Networks” (InfoVis 2007)

<br>

- Identify communities
- Identify central actors

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a83ada80-830f-4405-97e5-c5d648393f6e)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/778a4cec-8b2a-4e23-b85f-7ae0e150b996)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/78fa9e72-59c1-4168-88f6-971effde3c7c)

<br>

# Enclosure

- **Containment marks** can be used to visualize the hierarchiy in data.
- Only works for trees (no cycles)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/64903ed9-03e0-4018-85ac-a41db0e37cdc)

<br>

## Treemaps

- The hierarchical relationships are shown with containment rather than connection.
- All of the children of a tree node are enclosed within the area allocated that node, creating a nested layout.
- The size of the nodes is mapped to some attribute of the node.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/284e30ff-b95f-476a-81cb-e8575aaab0f8)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b0a7115c-ba6f-4429-8b00-677235904d4f)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0905a99c-9e77-402a-8d40-8a8b1923e64e)

<br>

### Neighborhood Preserving Treemaps

- Can we reflect the neighborhood relationship in a Treemap layout?
- Duarte et al., “Nmap: A Novel Neighborhood Preservation Space filling Algorithm” (InfoVis 2014)
  - e.g., cities in Korea have a hierarchy
    - Korea
      - Seoul
        - …
      - Gyeonggi do
        - Suwon si
        - Yongin si
        - …
      - …

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/53aa2905-42c5-444c-9172-2e4e6c0edb9f)

<br>

### State Aware Treemaps

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/adfbf0ea-dad9-4f1e-b0d4-dc6a3c05c4ad)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c97b79db-8693-46f4-b3de-1295c0b7123a)

<br>

### Idioms for Tree Data

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d90e4ee1-ce02-4541-a29f-b551d05fd330)

<br>

### GrouseFlocks

- Compound network: a network + tree
- Cluster hierarchy atop original network.
- Connection marks for original network, containment marks for cluster hierarchy.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/91f715b8-bf27-48e6-a098-f1e46c4d31f6)

<br>

# Summary: Arrange Networks and Trees

- **A node-link diagram** uses connection marks.
  - Force-directed layout
  - Intuitive, topology understanding, unsearchable, no order, not scalable
- **An adjacency matrix** uses area marks in 2D matrix alignment.
  - Detailed Task, estimating # of nodes, searchable, better scalability, unfamiliar
- **A Treemap** uses area marks and containment with rectilinear layout.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bb1c6669-001f-427b-ba21-18572ecf0280)
