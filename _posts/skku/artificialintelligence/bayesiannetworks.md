---
title: "[Artificial Intelligence] Bayesian Networks"
categories:
  - Artificial Intelligence
tags:
  - Bayesian Networks
toc: true
toc_sticky: true
toc_label: "Bayesian Networks"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

<br>

# Bayesian Networks

<br>

## Introduction

<br>

### Boolean Random Variables

- We deal with the simplest type of random variables – Boolean ones
- Take the values *true* or *false*
- Think of the event as occurring or not occurring
- Examples (Let *A* be a Boolean random variable):

A = Getting heads on a coin flip
A = It will rain today
A = There is a typo in these slides

<br>

### Probability : Random Variables

- A **random variable** is the basic element of probability
- Refers to an event and there is some degree of uncertainty as to the outcome of the event
- For example, the random variable A could be the event of getting a heads on a coin flip

<br>

### Bayesian Networks

- Bayesian networks help us reason with uncertainty
- In the opinion of many AI researchers, Bayesian networks are the most significant contribution in AI in the last 10 years
- They are used in many applications e. g :
  – Spam filtering / Text mining
  – Speech recognition
  – Robotics
  – Diagnostic systems

<br>

## Probability (확률)

- We will write P(A = true) to mean the probability that A = true.
- What is probability? It is the relative frequency with which an outcome would be obtained if the process were repeated a large number of times under similar conditions*

<img width="414" alt="image" src="https://user-images.githubusercontent.com/55765292/231119016-6612587f-d8f6-4f17-aa03-13b9863b4cdf.png">{: .align-center}

The sum of the red and blue areas is 1

<br>

### Conditional Probability (조건부 확률)

- $P(A = true | B = true)$ = Out of all the outcomes in which B is true, how many also have A equal to true
- Read this as: “Probability of A conditioned on B” or “Probability of A given B”

<br>

<img width="895" alt="image" src="https://user-images.githubusercontent.com/55765292/231120126-b9bd4481-373e-4757-a91c-f470d7989b4f.png">{: .align-center}

<br>

### Joint Probability (결합 확률)

- We will write P(A = true, B = true) to mean “the probability of A = true **and** B = true”
- Notice that:

<br>

<img width="895" alt="image" src="https://user-images.githubusercontent.com/55765292/231121465-253b8727-265e-431e-9821-a442c210c139.png">{: .align-center}

<br>

- The prior(사전) (unconditional) probability of an event a is the degree of belief accorded to it in the absence of any other information. P(Suit = hearts) = P(hearts) = 0.25
- The posterior(사후) (conditional) probability of a is the degree of belief we have in a, given that we know b: P(a|b) P(hearts| redCard) = 0.5
{: .notice--warning}

<br>

- Chain rule (연쇄 규칙):
  - X1(학번): 2015
  - X2(전공):IT_Consulting
  - X3(인공지능_과목수강): yes
-> P(X1,X2,X3) = P(X3|X1,X2) P(X2|X1) P(X1)

- Marginalization (한계화)
  - X1(인공지능_과목수강): yes
  - X2(전공)
-> P(X1) = P(X1,X2=정보보호) + P(X1, X2=IT_Consulting) + P(X1,X2=빅데이터)

<br>

### Joint Probability Distribution

- Joint probabilities can be between any number of variables

eg. $P(A = true, B = true, C = true)$

- For each combination of variables, we need to say how probable that combination is
- The probabilities of these combinations need to sum to 1

<br>

<img width="346" alt="image" src="https://user-images.githubusercontent.com/55765292/231124614-4beb7345-2925-41dc-9c02-796fb3e928d2.png">

<br>

- Once you have the joint probability distribution, you can calculate any probability involving A, B, and C
- Note: May need to use marginalization and Bayes rule

- Examples of things you can compute:
  - P(A=true) = sum of P(A,B,C) in rows with A=true
  - P(A=true, B = true | C=true) = P(A = true, B = true, C = true) / P(C = true)

<br>

**problem**

- Lots of entries in the table to fill up!
- For k Boolean random variables, you need a table of size $2^k$
- How do we use fewer numbers? Need the concept of independence

<br>

## Bayesian Network

## Inference

