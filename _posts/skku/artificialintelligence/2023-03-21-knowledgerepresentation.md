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
  - Clear(B1) && Clear(B2) && Clear(B3) && Clear(B4) ...
- At least one object has a certain property
  - Clear(B1) || Clear(B2) || Clear(B3) || Clear(B4) ...
- Variable symbols
- Quantifier symbols

<br>

- Quantifier(한정사)
  – Existential quantifier (존재 한정사) : ∃
    - (∃x) On(x,B) There is a block on Block B.
    - (∃x) Greater_than(x,0)
  – Universal quantifier (전체 한정사) : ∀
    - (∀x) Man (Father(x)) Father is a man for all x
    - (∀x) Attends (x,(CS221 && CS157))

[Ex 4.2] (∃x ) Odd(x)
- true : if domain of x is a set of integers
- false : if domain of x is a set of imaginary numbers

---

[ex 4.4] write each statement as a predicate wff (the domain is whole world)
- D(x) is “x is a day”, M is “Monday”
- S(x) is “x is sunny”, T is “Tuesday”
- R(x) is “x is rainy”,

① All days are sunny. (∀x)(D(x)→S(x))
② some days are not rainy. (∃x)[D(x)∧R(x)'] or [(∀x)(D(x)→R(x))]'
③ Every day that is sunny is not rainy. (∀x)[D(x)∧S(x)→R(x)']
④ Some days are sunny and rainy. (∃x)[D(x)∧S(x)∧R(x)]
⑤ No day is both sunny and rainy. (∀x)[D(x)→(S(x)∧R(x))'] or (∀x)[D(x)∧S(x)∧R(x)]'

<br>

### Fuzzy Logic

*Ref. Adaptive Pattern Recognition and Neural Networks,Yoh-Han Pao,Addison Wesley*

- Fuzzy Logic
  - “physically active” : a vague or fuzzy quantity
  - Defining this quantity as a fuzzy set
  - Crisp set
    - A={1, 3, 5, 7}
    - A={x | x is integer, 3<x<7}
    - If the element $x_1$ belongs to the set A($x_1$ A ), the degree of membership is 1
    - Otherwise ($x_1$ A ) , 0. 

---

- Membership Function : $\mu_{A^0}(x_i)$
  - $x_i$가 $A^0$ 집합에 속하는 정도 

I. The grade of membership of x in $A^O$
II. The fuzzy set $A^O$ : a set of ordered pairs of and
III. a continuous or discrete membership function

For example, among 10 objects {x1, x2, … x10}, a set of
heavy objects, $A^O$

<img width="716" alt="image" src="https://user-images.githubusercontent.com/55765292/228199356-6ca866b9-f364-49c4-b977-7807bb241f4d.png">{: .align-center}

→ a discrete membership function

---

- A continuous membership function : defining a fuzzy set in terms of membership function

<img width="410" alt="image" src="https://user-images.githubusercontent.com/55765292/228199524-ab41a6a6-4dff-4099-a4a1-a7b0d4ccf356.png">{: .align-center}

<br>

<img width="734" alt="image" src="https://user-images.githubusercontent.com/55765292/228197925-f644eda0-19a2-42c8-8938-0bcb9bf08ba8.png">{: .align-center}

<br>

#### Fuzzy Arithmetic (Intersection)

- Product or intersection of two fuzzy sets
  - Membership function of the intersection

<img width="681" alt="image" src="https://user-images.githubusercontent.com/55765292/228198424-bab8e3a5-6b97-46a8-a11e-d2a02bc24c4b.png">{: .align-center}

---

<img width="835" alt="image" src="https://user-images.githubusercontent.com/55765292/228198507-b3848f2a-2a29-41d0-a55a-33842569a2c7.png">{: .align-center}

<br>

#### Fuzzy Arithmetic (Union)

<img width="835" alt="image" src="https://user-images.githubusercontent.com/55765292/228199073-0ae79df4-49c5-4eef-8318-3519507d2149.png">{: .align-center}

1
