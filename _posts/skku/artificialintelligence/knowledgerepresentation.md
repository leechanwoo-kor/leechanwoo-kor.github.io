---
title: "[Artificial Intelligence] Knowledge Representation"
categories:
  - Artificial Intelligence
tags:
  - Artificial Intelligence
  - Knowledge Representation
toc: true
toc_sticky: true
toc_label: "Knowledge Representation"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

<br>

# Knowledge Representation

<br>

**Knowledge based system**

<br>

<img width="774" alt="image" src="https://user-images.githubusercontent.com/55765292/226575380-b5b8ca65-2899-4e94-a9d7-3b58fbb7c1a2.png">{: .align-center}

<br>

**Graphical Representation of Knowledge**

<img width="829" alt="image" src="https://user-images.githubusercontent.com/55765292/226575520-f5b2fcb3-a878-4894-bf33-b60b6ba1f52a.png">{: .align-center}

<br>

**Inference**

- (토요일 && 학점_A) ▶ 영화구경
- (중간고사_최상 && 기말고사_최상 ) ▶ 학점 A

<br>

- (토요일 && 기말고사_최상) ▶ 영화구경?

<br>

### Knowledge Representation

- Knowledge : Facts, Procedural rules, Heuristic rules
- Facts : always true
  - Integrated circuit has power pin and GND(Ground) pin.
  - Boeing 747 can fly safely by three engines.
- Procedural rules: rules that describe a sequence of causal statements .
  - If we apply ‘1’ for every input of AND gate , the ouput of the gate becomes ‘1’ .
  - The higher voltage of DC motor is, the faster RPM is.
- Heuristic rules: not always true, true in most cases.
  - If the headlight beam of the car is not bright, voltage of battery is low.
  - If there is a linear element of which brightness changes rapidly, it is an edge of an object .

<br>

## Logic

- Knowledge representation based on formal logic

<br>

- Formal logic
  - Easy to understand knowledge representation due to familiarity of formal logic system
  - Can adopt logical reasoning method
    Well developed deductive inference algorithm
  - Propositional Logic, Predicate Logic

<br>

- Ambiguous knowledge: Fuzzy Logic

<br>

### Propositional Logic (명제 논리)

- Proposition(statement): a sentence that is either true or false.
  - ex) ‘The color of Tom’s car is black’,
  - ‘Tom’s car’,
  - ‘7+5’
- Capital letters of the alphabet, such as P, S, are used to represent propositions
- Statements are combined by connectives to become a compound statement.
- Implication : conveys the meaning that the truth of A implies or leads to the truth of B. The compound statement is denoted by A → B.
  - SWITCH_ON && DOOR_OPEN → ALARM

<br>

<img width="641" alt="image" src="https://user-images.githubusercontent.com/55765292/226577674-fd5d9bb0-3a26-4a31-afe4-ef9eda548178.png">{: .align-center}

<br>

<img width="674" alt="image" src="https://user-images.githubusercontent.com/55765292/226579321-ea8d9ccf-2422-454b-a63c-b9cb5934a3da.png">{: .align-center}

<br>

Atoms: T,F, countably infinite set of strings ,that begin with a capital letter ($P, Q, R, P1, \dots$)

- Connectives: ∨(or), ∧(and), →(implies), ’(not)

<br>

#### Propositional Logic - Syntax**

- Syntax of Well Formed Formula (wff)
- Any atom is a wff: P, R, P3
- Literals : atoms , atoms with ʹ

<img width="382" alt="image" src="https://user-images.githubusercontent.com/55765292/226580105-e925e6c9-47df-4385-b207-0ec5c4239ea6.png">

<br>

#### Propositional Logic - Semantics**

- Interpretation: Associate atoms with propositions about world.
  BAT_OK => “The battery is charged”
- Under a given interpretation, each atom has a value-true or false
- Sensing feature x1 => Store x1 in knowledge base

<br>

#### [Exercise] The negation of well formed formula,

– A “Block is liftable”
– B “Arm is moving”
– C “Battery is charged”

① If Block is liftable, then arm is moving.
  A → B is equivalent to ~ A ∨ B
② The block is liftable or arm is moving. A ∨ B

<br>

### Predicate Login (술어 논리)

**Syntax**

– Term
  - Constant : specific objects in the domain ex) Taeyun, Jina
  - Variable : objects in the domain can be represented using variables
  ex) x or y
  - function : mapping the object in the domain to other objects
  - father(x) : x ←T aeyun object, output : Taeyun’s father object
  - n-place function
    times(4, plus(3, 6)) , fatherof(John)
– predicate(술어) : describe objects’ property or relations among objects
  ON(A, B), CLEAR(A)

<br>

#### Interpretation

- Maps object constants into objects in the world
- N-ary function constant into n-ary function in the world
- N-ary relation into n-ary relation in the world

<br>

<img width="560" alt="image" src="https://user-images.githubusercontent.com/55765292/226582964-fd33df3e-912d-4860-809e-a316d63b9cc2.png">{: .align-center}

<br>

<img width="383" alt="image" src="https://user-images.githubusercontent.com/55765292/226583335-3e9d12cd-fb40-42b4-b3e7-42bb77bb1234.png">{: .align-center}

<br>

#### Quantification

- Every object has a certain property.
  Clear(B1) && Clear(B2) && Clear(B3) && Clear(B4) ...
- At least one object has a certain property
  Clear(B1) || Clear(B2) || Clear(B3) || Clear(B4) ...
- Variable symbols
- Quantifier symbols

<br>

– Existential quantifier : ∃
(∃x) On(x,B) There is a block on Block B.
(∃x) Greater_than(x,0)
– Universal quantifier : ∀
(∀x) Man (Father(x)) Father is a man for all x
(∀x) Attends (x,( ))

[ Ex 4.2] (∃x ) Odd(x)
true : if domain of x is a set of integers
false : if domain of x is a set of imaginary numbers
