---
title: "[Artificial Intelligence] Reinforcement Learning"
categories:
  - Artificial Intelligence
tags:
  - Reinforcement Learning
toc: true
toc_sticky: true
toc_label: "Reinforcement Learning"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

- Finite Markov Decision Processes
- Introduction to Reinforcement Learning
- Q-learning, Deep Q-Networks
- Policy Learning

<br>

# Finite Markov Decision Processes

<br>

## Markov Decision Process (MDP)

- Set of states S
- Set of actions A
- State transition probabilities $p(s’ | s, a)$. This is the probability distribution over the state space given we take action a in state $s$
- Discount factor 𝛾 in [0, 1]
- Reward function R: S x A -> set of real numbers
- For simplicity, assume discrete rewards
- Finite MDP if both S and A are finite

<br>

## Example: What SEQUENCE of actions should our agent take?

- Each action costs –1/25
- Agent can take action N, E, S, W
- Faces uncertainty in every state

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9e629df7-8164-42e0-8853-eb47d1ab084c">

<br>

### MDP Tuple: <S, A, P, R>

- S: State of the agent on the grid (4,3)
  - Note that cell denoted by (x,y)
- A: Actions of the agent, i.e., N, E, S, W
- P: Transition function
  - Table P(s’| s, a), prob of s’ given action “a” in state “s”
  - E.g., P( (4,3) | (3,3), N) = 0.1
  - E.g., P((3, 2) | (3,3), N) = 0.8
  - (Robot movement, uncertainty of another agent’s actions,…)
- R: Reward (more comments on the reward function later)
  - R( (3, 3), N) = -1/25
  - R (4,1) = +1

<br>

### Markov Assumption

- **Markov Assumption**: Transition probabilities (and rewards) from any given state depend only on the state and not on previous history
- Where you end up after action depends only on current state
  - **After Russian Mathematician A. A. Markov (1856-1922)**
  - **(He did not come up with markov decision processes however)**
  - **Transitions in state (1,2) do not depend on prior state (1,1) or (1,2)**

<br>

### Non-Optimal Vs Optimal Policy

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ac080587-134b-4e08-9dca-e9d2c1568dbc">

<br>

- Choose Red policy or Yellow policy?
- Choose Red policy or Blue policy?

- Which is optimal (if any)?
  - Value iteration: One popular algorithm to determine optimal

<br>

# Introduction to Reinforcement Learning

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f0fcd4bc-33da-450d-8055-7670b56e3c2b">

<br>

## What is Reinforcement Learning?

- Learning from interaction with an environment to achieve some long-term goal that is related to the state of the environment
- The goal is defined by reward signal, which must be maximized
- Agent must be able to partially/fully sense the environment state and take actions to influence the environment state
- The state is typically described with a feature-vector

<br>

### Atari game(블록 깨기)

- Objective: complete the game with the highest score
- State: raw pixel inputs of the game state
- Action: game controls, e.g. left, right
- Reward: score increase/decrease at each time step

<br>

### 


