---
title: "[Artificial Intelligence] Inference"
categories:
  - Artificial Intelligence
tags:
  - Inference
toc: true
toc_sticky: true
toc_label: "Inference"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

<br>

# Inference

- $\Delta$, 지식베이스
  - SWITCH_ON
  - ~ALARM
  - SWITCH_ON∧DOOR_OPEN  ALARM === ~A ∨ B
  - ~SWITH_ON ∨ ~DOOR_OPEN ∨ ALARM

- $\omega$ :  ~ DOOR_OPEN

- How to Prove? 

### Theorem : example

<img width="615" alt="image" src="https://user-images.githubusercontent.com/55765292/228201337-4291b248-311e-473f-82b2-f3d1b237fb35.png">{: .align-center}

<br>

## Definition of Proof

- Proof of $\omega_n$ from a set of wffs $\Delta$
  - sequence $[\omega_1, \omega_2, \dots, \omega_n]$
- $\omega_n$ 
  - 1) in $\Delta$
  - 2) or can be inferred from a wffs earlier in the sequence
- $\omega_n$ is a theorem of set $\Delta$
  - If there is a proof of $\omega_n$ from $\Delta$

<br>

<img width="445" alt="image" src="https://user-images.githubusercontent.com/55765292/228203923-0d71284a-f472-4c6a-a7d7-4675111f979f.png">{: .align-center}

<br>

### Resolution in Propositional Logic

- Literal
- Positive literal(atom), negative literal(negated atom)
- Clause(절): a set of literals, disjunction of all the literals in the set.
- ex. {P, Q, ~R} : $P \vee Q \vee ~R$
- { } : nil 

<br>

### Resolution on Clauses

<img width="563" alt="image" src="https://user-images.githubusercontent.com/55765292/228205269-bd77e877-ecc9-48de-bdca-0b80d8116ef2.png">{: .align-center}

<br>

<img width="780" alt="image" src="https://user-images.githubusercontent.com/55765292/228205367-d2194a1a-2cbc-4e45-a4e3-1868a9996e59.png">{: .align-center}

<br>

#### Converting wffs to CNF

- (**C**onjunctive **N**ormal **F**orm): conjunction of clauses, 절들의 논리곱

<img width="711" alt="image" src="https://user-images.githubusercontent.com/55765292/228207902-b1a44618-dec2-4288-a830-30789dd515db.png">{: .align-center}

<br>

### Resolution Refutation 논리융합반박

- Convert wffs in $\Delta$ to clauuse form
- Convert negation of wff $\omega$ to clause form -> ~$\omega$모순의 의한 증명
- Combine clauses resulting from steps 1 and 2 into a set $S$
- Iteratively apply resolution to clauses in $S$ and add results to $S$ either
  - until there are no more new resolvents 
  - or until empty clause is produced -> { } : nil

<br>

## Theorem Proof : resolution

<img width="639" alt="image" src="https://user-images.githubusercontent.com/55765292/228209884-66fca036-6690-43b3-83ad-4374af7a0926.png">{: .align-center}

<br>

### Exercise 1

- $\Delta$
  - SWITCH_ON
  - ~ALARM

  - SWITCH_ON ∧ DOOR_OPEN -> ALARM === ~A ∨ B
  - ~SWITH_ON ∨ ~DOOR_OPEN ∨ ALARM

- $\omega$ :  ~ DOOR_OPEN

- How to Prove? Resolution Refutation

<br>

### Exercise 2

<br>

## Resolution in Predicate Logic

- literal:
  - Predicate Constant,~ Predicate Constant
: clause
: literal that might contain variables
clause:
( , ,..., )( ... ) 1 2 n 1 2 k
x x x e e  e
1 2 k
e  e  ... e
i
e
{ , ,..., }

<br>

### Unification

...

