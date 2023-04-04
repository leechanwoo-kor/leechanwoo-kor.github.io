---
title: "[Artificial Intelligence] Strong Method"
categories:
  - Artificial Intelligence
tags:
  - Strong Method
toc: true
toc_sticky: true
toc_label: "Strong Method"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

<br>

# Strong Method

- Strong Method Problem Solving
  - Ref. Artificial Intelligence, Structures and strategies for complex problem solving, George F Luger, Addison Wesley
  
- Knowledge based system : tend to be specialist
- Knowledge is both theoretical and practical

1. Support inspection of their reasoning process
2. Allow easy modification in adding and deleting skills from the knowledge base
3. Reasoning heuristically, using(often imperfect) knowledge to get useful solutions

<br>

## Knowledge based Systems

<br>

### Overview of Knowledge based System Technology

- Design of rule based expert system
- User interface : simplifies communication and hides much of the complexity, such as the internal structure of the rule base
- Knowledge base : heart of the expert system. contains the knowledge of a particular application domain
- Rule based system : if … then rules General knowledge and case specific knowledge
- Inference engine : applies the knowledge to the solution of actual problems

<br>

### Knowledge based System Architecture

<img width="898" alt="image" src="https://user-images.githubusercontent.com/55765292/229756976-0ee75ca2-f3c0-4310-b2cd-c67c98d9b269.png">

<br>

### Separation of the knowledge base and inference engine

1. separation makes it possible to represent knowledge in a more natural fashion
2. expert system builders can focus on capturing and organizing problem solving knowledge
3. separation of knowledge and control allows changes to be made in one part of the knowledge base without creating side effects in others
4. separation of the knowledge and control elements of the program allows the same control and interface software to be used in a variety systems

<br>

### Selecting a Problem and the knowledge Engineering Process

- The need for the solution justifies the cost and effort of building an expert
- Human expertise is not available in all situations where it is needed
- Problem may be solved using symbolic reasoning
- Problem domain is well structured and does not require commonsense reasoning
- Problem may not be solved using traditional computing methods
- Cooperative and articulate expert exists
- Problem of proper size and scope
- Knowledge engineer to be a novice in the problem domain

<br>

## Rule Based Systems

<br>

- Production System and Goal-Driven Problem
- Solver

- If **premise** then **conclusion** ($P \rightarrow Q$)
  - Case specific data can be kept in the working memory
  - Inference engine implements the recognize-act cycle of the production system
    → Control may be either data driven or goal driven

<br>

### Goal Driven Reasoning(backward chaining)

- Goal is initially placed in working memory
- System matches rule conclusions with the goal
- Select one rule
- Place it’s premises in the working memory
  - Decomposition of the problem’s goal into simpler sub goal, subgoals can be solved by asking the user for information

<br>

#### Order of Premises

- Order of premises encodes important procedural information for solving the problem

<br>

<img width="867" alt="image" src="https://user-images.githubusercontent.com/55765292/229759424-5c163f51-45d8-45c1-8af7-f1cbc97a20b6.png">

$[(\sim A)\wedge(\sim B)] \rightarrow C$

<br>

<img width="881" alt="image" src="https://user-images.githubusercontent.com/55765292/229760156-c0345d58-b876-4265-b55e-94aba40a081a.png">

<br>

① Place the top level goal, the problem is X in working memory
② X : variable that can match with any phrase in favor of the lowest numbered rule
  → rule 1 will fire
③ Premise of rule 1 placed in the working memory

<br>

<img width="839" alt="image" src="https://user-images.githubusercontent.com/55765292/229758704-336d2f98-1982-48d3-97e0-e270c1cb6ca2.png">

<br>

<img width="881" alt="image" src="https://user-images.githubusercontent.com/55765292/229761696-41cae4a4-fb18-4c7f-8c2b-b091513d086f.png">

<br>
![image](https://user-images.githubusercontent.com/55765292/229764266-3611fe90-adff-49cb-b38d-f93fd38ae12f.png)

- Entries in working memory that do not match any rule conclusion → expert system will query the user directly about these subgoals
  - Ease of modification is supported by the syntactic independence of production rules
  - Each rule is chunk of knowledge that can be independently modified

<br>

#### AND/OR Graph

<img width="869" alt="image" src="https://user-images.githubusercontent.com/55765292/229763017-efec0678-585f-4233-9a40-0887c114939f.png">

<br>

### Data-Driven Reasoning(Forward chaining)

- Breath first search in data driven reasoning

<br>

<img width="881" alt="image" src="https://user-images.githubusercontent.com/55765292/229760156-c0345d58-b876-4265-b55e-94aba40a081a.png">

<br>

① If the premise of a rule is **not the conclusion of some other rule** then that fact will be askable ‘engine is getting gas’ is not askable rule 1 fails

② ‘engine does not turn over’ of rule2 is askable

→ If answer is false then ‘the engine will turn over’ is placed in working memory

③ First of two premises is false, moves to rule 3

④ First premise fails. Moves to rule 4

<img width="388" alt="image" src="https://user-images.githubusercontent.com/55765292/229764983-13e1efc4-827c-4856-8703-7106de9371df.png">

⑤ At rule 4, both premises are askable.

If answer to both questions is true then
– ‘there is gas in the fuel tank’, ‘there is gas in the carburetor’ are placed in working memory
– Conclusion of the rule ‘the engine is getting gas’ is placed

<br>

<img width="388" alt="image" src="https://user-images.githubusercontent.com/55765292/229765046-e9798ba4-2cd4-435a-b2cb-40741597d1e6.png">

<br>

- All rules are considered. Search returns.

Rule 1 is fired → ‘the problem is spark plugs’ is placed in working memory

- No more rules are matched → session is completed

<br>

<img width="757" alt="image" src="https://user-images.githubusercontent.com/55765292/229765489-38e041b9-34d0-43a0-b0bd-9b067ffacfb3.png">

<br>

**First pass of rules**

<img width="833" alt="image" src="https://user-images.githubusercontent.com/55765292/229765617-682b39f1-5bcb-4ae1-ae03-ae235b6a295e.png">

<br>

**Second pass of rules**

<img width="581" alt="image" src="https://user-images.githubusercontent.com/55765292/229765868-48181b97-c115-498d-a80a-b397ffd22861.png">

<br>

### Conclusion

- Opportunistic search : whenever rule fires to conclude new information, control moves to consider those rules which has that new information as a premise
- Data-driven reasoning is much less “focused” in its search
→ the explanation available to the user is quite limited

<br>

1. Procedural method of rule interpretation if p, q,, and r then s

→ to do s, first do p, then do q, then do r

Order the premises of a rule so that what is most likely to fail or is easiest to confirm is tried first

(ex) rule 1 : inefficient

2. Domain specific approach groups set of rules according to stages of solution process

(ex) organize situation, data collection, data analysis stages

– Place the assertion “organize” in working memory
– All the rules in organize situation have their first premise, if stage is organize and….
– Last rule retract “organize”, and assert “data collection” in working memory

3. RETE : optimize search for usable rules

