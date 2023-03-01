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

![image](https://user-images.githubusercontent.com/55765292/222057967-47bc28aa-a4e0-443c-bc89-8c45ce3555b7.png)

