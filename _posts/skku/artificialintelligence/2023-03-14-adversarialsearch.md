---
title: "[Artificial Intelligence] Adversarial Search"
categories:
  - Artificial Intelligence
tags:
  - Artificial Intelligence
  - Adversarial Search
toc: true
toc_sticky: true
toc_label: "Adversarial Search"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

<br>

# Adversarial Search

<br>

### Games vs. search problems

- "Unpredictable" opponent  specifying a move for every possible opponent reply
- Time limits  unlikely to find goal, must approximate

<br>

## Optimal decisions

<br>

### Game Tree

- 2-player, deterministic, turns

<img width="681" alt="image" src="https://user-images.githubusercontent.com/55765292/224969320-924e665c-dd82-4ec9-b04c-ffb9ac6a7877.png">{: .align-center}

<br>

### Minimax

- Perfect play for deterministic games
- Idea: choose move to position with highest **minimax value**
  - best achievable payoff against best play
- E.g., 2-ply game:

<img width="614" alt="image" src="https://user-images.githubusercontent.com/55765292/224969813-5f6ecc66-f121-44d6-8de7-d32ebe939570.png">{: .align-center}

<br>

<img width="777" alt="image" src="https://user-images.githubusercontent.com/55765292/224971064-eacac666-9a4b-41fb-b1b7-c31537f86899.png">{: .align-center}

<br>

## α-β pruning

<br>

<img width="951" alt="image" src="https://user-images.githubusercontent.com/55765292/224971359-3de4891b-ee4a-435f-8ce9-19608e92f07a.png">{: .align-center}

<br>

<img width="951" alt="image" src="https://user-images.githubusercontent.com/55765292/224971406-3e189e05-b114-404b-8624-b52e6a80117f.png">{: .align-center}

<br>

<img width="951" alt="image" src="https://user-images.githubusercontent.com/55765292/224971471-7472fba0-fd43-4298-b94e-df0596370e41.png">{: .align-center}

<br>

<img width="951" alt="image" src="https://user-images.githubusercontent.com/55765292/224971728-55f0e504-206a-46a5-b141-0eddc7a1e4e1.png">{: .align-center}

<br>

<img width="951" alt="image" src="https://user-images.githubusercontent.com/55765292/224971799-bc909253-00b6-4428-8c56-52b5738eebd8.png">{: .align-center}

<br>

### Why is it called α-β?

- α is the value of the best (i.e., highest-value) choice found so far at any choice point along the path for max
- If v is worse than α, max will avoid it  prune that branch
- Define β similarly for min

<img width="352" alt="image" src="https://user-images.githubusercontent.com/55765292/224972637-ce384b35-e090-40eb-bb19-49bd7c8bdf3d.png">{: .align-center}

<br>

<img width="832" alt="image" src="https://user-images.githubusercontent.com/55765292/224972714-a9f135a0-48b9-4cb3-8dcc-5ee71b103c95.png">{: .align-center}

<br>

<img width="829" alt="image" src="https://user-images.githubusercontent.com/55765292/224972771-47d4b2bf-1064-4d07-b7c4-ac413154a66b.png">{: .align-center}

<br>

## Imperfect, real-time decisions

<br>

### Evaluation Function

- For chess, typically **linear** weighted sum of **features**

<img width="602" alt="image" src="https://user-images.githubusercontent.com/55765292/224973257-7fb6b6f4-6c3b-433d-ba75-b4aacf31a78f.png">{: .align-center}

- e.g., w1 = 9 with f1 (s) = (number of white queens) – (number of black queens), etc.
- 4-ply lookahead is a hopeless chess player!
  – 4-ply ≈ human novice
  – 8-ply ≈ typical PC, human master
  – 12-ply ≈ Deep Blue, Kasparov

<br>

### Deterministic games in practice

-  Checkers: Chinook ended 40-year-reign of human world champion Marion Tinsley in 1994. Used a precomputed endgame database defining perfect play for all positions involving 8 or fewer pieces on the board, a total of 444 billion positions.

- Chess: Deep Blue defeated human world champion Garry Kasparov in a six-game match in 1997. Deep Blue searches 200 million positions per second, uses very sophisticated evaluation, and undisclosed methods for extending some lines of search up to 40 ply.

- Othello: human champions refuse to compete against computers, who are too good.




