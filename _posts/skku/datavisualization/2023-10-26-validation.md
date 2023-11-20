---
title: "[Data Visualization] Validation"
categories:
  - Data Visualization
tags:
  - Validation
toc: true
toc_sticky: true
toc_label: "Validation"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/159c74c5-0bd2-45f3-939a-f150d8fe4cd8)

<br>

# Vis Design

- Your boss: "Develop a vis interface for this data."
- What you do:
  - Get the data
  - Get some examples and libraries on the Web
  - Implement and customize your visualization
  - You in the next meeting: "This is our vis interface."
- This is what many data scientists actually do in their company.

<br>

- Problems:
  - You cannot answer "Why is yours effective?"
  - You cannot answer "Why is yours better than other designs?"
  - You cannot evaluate your vis quantitatively nor qualitatively.
- Why this happened? **Because you didn't define the problem to solve using vis.**
- How can we design and validate a vis crrectly?

<br>

## Four Levels of Vis Design

- First part of the question: how do we design a vis?
- Our framework: splitting the vis design process into four cascading levels

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/de5128e0-75fc-449a-88bc-0ca563201e02)

<br>

- **Domain situation**: you consider the details of a particular application domain for vis.
- Domain: a particular field of interest of the target users of a vis tool.
- Example questions:
  - Who are the users?
  - What are their ultimate goal?
  - Why cannot their tasks be automated?
 
<br>

- **What-why abstraction**: you map those domain-specific problems and data into forms that are independent of the domain.
- Example questions:
  - What are the dataset types (tables/networks/geometry, $\dots$)?
  - What are the attribute types (categorical/ordinal)?
  - What are the tasks?
- Use the terminology we learned!

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5f004616-65ed-4cff-b5a3-114dfaffa200)

<br>

- **How abstraction**: you design idioms that specify the approach to visual encoding and interaction.
- Idioms: vis and interaction techniques (a bar chart, a scatterplot, $\dots$)
- Example questions:
  - What visual marks and channels can be used?
  - What interactions can be adopted?
- Use the terminology we learned!

<br>

- **Algorithm implementation**: you design and implement algorithms!
- Example questions:
  - What algorithms should be used for computation?
  - Into what components the system can be modularized?
- This is what “programmers” do.

<br>

- **A block** is the outcome of the design process at one level.
- The outcome from an upstream level is input to the downstream level.
- Choosing the wrong block at an upstream level inevitably cascades to all downstream levels!
  - e.g., Even though your implementation was good, if you misdesigned the vis encoding, your system would not solve the intended problem.
 
<br>

## Iterative Design Process

- Although the blocks cascade, this doesn’t mean that your design should follow the waterfall model.
  - The waterfall model is usually bad!
- You can do it iteratively!

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d5be3df9-bb68-426d-8479-d1d77e1665aa)

<br>

- Even the actual users have difficulties in articulating their goals and needs in a clear-cut way
  - Not familiar with technical terms/SW development/vis
- Iterative design process in practice:
  - 1st meeting: 20% of domain situation/goals/data/tasks identified.
  - Prototype a vis
  - 2nd meeting: bring the prototype and talk about it. 40% identified.
  - Improve the prototype
  - 3rd meeting: 60% identified
  - $\dots$

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4c542828-85fd-4a0f-9687-f22d3869514f)

<br>

### Domain Situation

- Goal: Identify situation blocks
- Working with users to iteratively refine a design (user-centered design or human-centered design)
- Observe what they actually do! Not just hear from them.
- A computational biologist working in the field of comparative genomics, using genomic sequence data to ask questions about the genetic source of adaptivity in a species.
  - What are the differences between individual nucleotides of feature pairs?
  - What is the density of coverage and where are the gaps across a chromosome?

<br>

### Task and Data Abstraction

- Goal: Identify task blocks and design data blocks
- Identify task blocks:
  - Abstract domain-specific vocabulary into the domain-independent vocabulary.
  - Abstract tasks (browsing, comparing, and summarizing)
  - Help future vis designers interested in the same domain!
- Design data blocks:
  - Design data blocks not just select them.
  - Choose the right from for data and transformation between them (e.g., even though users say a table, it can be a tree in fact).
 
<br>

### Visual Encoding and Interaction Idiom

- Goal: Design idiom blocks
- **The visual encoding idiom** controls what users see (marks and channels).
- **The interaction idiom** controls how users change what they see.
- The design space of static visual encoding idioms is already huge, and it grows even bigger when you consider the manipulation between them.

<br>

### Algorithm

- Goal: Implement algorithms
- Implement algorithms that efficiently handle visual encoding and interaction idioms.
  - Knowledge on computer graphics can be a plus.
- Consider the speed of computation and the memory footprint
- **Latency** is very important in vis [Niel94].
  - 0.1 s for continuous feedback (animation)
  - 1 s for maintaining the user’s flow of thought
  - 10 s for keeping the user’s attention

<br>

## Perceptual Fusion

- Two stimuli within a perceptual processor cycle appear fused → the first event appears to cause the other.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f225ad1a-bc87-4469-b815-d49456785331)

<br>

# Threats to Validity

- Each level of the four levels has a different set of **threats to validity**.
- Threats to validity: Reasons why you might have made the wrong choices.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ca5a4526-3fb9-4e8b-8fc4-dc343da04836)

<br>

- **Immediate validation approaches** take place before you entering the next level.
  - Not many since they require results from the downstream levels nested within them
  - Prevent you from making poor choices
- **Downstream validation approaches** happen at the end of each level.
  - Necessary for papers to be published
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4ffb1581-d373-465f-a7bf-506d39b70e97)

<br>

## Domain Validation

- You can conduct **a field study** to validate the domain situation block.
  - You observe how people act in real-world settings, rather than by bringing them into a laboratory setting.
- e.g., contextual inquiry
  - Observe users working in their real-world context and interrupt them to ask questions when clarification is needed
  - Better than silent observation
  - [Holtzblatt and Jones 93]
 
<br>

## Idiom Validation

- As immediate validation for the idiom level, you should justify your idiom choices.
  - Why specific idioms were chosen (and others not)?
  - Justify the design with respect to known perceptual and cognitive principles
  - Ensure that your design does not violate known guidelines (e.g., scalability).
 
<br>

- “We chose vis idiom X since it was found that idiom X outperforms others for ABC tasks [ref].”
- “We limited # of color bands in vis to 4 due to the perceptual limitation in color judgement.”
- “We adopted a filtering interaction since the scatterplot is not effective for 10 K data points.”

<br>

## Algorithm Validation

- To validate the algorithm level immediately, you can analyze computational complexity.
  - “The time complexity of our algorithm is 𝑂(𝑁𝑙𝑜𝑔𝑁) which is better than the baseline.”
- After implementation, you can conduct **benchmarks.**
  - “Our algorithm was faster than the baseline.”
 
<br>

## Idiom Validation

- You can conduct **a lab study** to validate idiom abstraction.
  - A controlled experiment in a lab setting
  - Sometimes called a user study
- **Quantitative**: time spent, # of errors made, logging actions, tracking eye movements, $\dots$
- **Qualitative**: questionnaires, interviews, $\dots$

<br>

- Attach images and videos that demonstrate your work
  - Useful especially when there is an explicit discussion pointing out the desirable properties in the results
  - “The cluttering problem is alleviated in Area A in Figure B $\dots$”
- Use quality metrics if exist: edge crossings, edge bends, structural similarity (SSIM), $\dots$

<br>

## Abstraction Validation

- You can conduct **a case study** to validate task/data abstraction
  - you invite members of the target user community, ask them to use the tool, and collect anecdotal evidence of utility.
  - “The experts found the system useful in $\dots$”
  - Qualitative (but try to be quantitative!)
- Field studies are also possible.

<br>

## Domain Validation

- For downstream validation, you can investigate how your vis tool has been adopted by the target audience.
- i.e., adoption rates
- It does not tell the whole story but can be a **Key Performance Indicator (KPI).**

<br>

## Validate Everything?

- It is impossible to address all four levels in detail in a single research paper.
  - Limited time and space
- In practice, we use a small subset of validation methods focusing on validating what we claim.

<br>

# Two Angles of Attack for Vis Design

- With **problem-driven work**, you start at the top domain situation level and walk your way down through abstraction, idiom, and algorithm decisions.
  - Top-down approach
  - Called a design paper, an application paper, or a design study
- In **technique-driven work**, you work at one of the bottom two levels, idiom or algorithm design.
  - Bottom-up approach
  - Called a technique paper or an algorithm paper
  - Many people think InfoVis is about creating a new visualization, but only few idioms are newly reported every year!

<br>

- https://ieeevis.org/year/2023/info/call-participation/call-for-participation

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d84ddcbf-f1a4-4624-b2a5-492c4ed06637)

<br>

# Validate What You Claimed

- To validate problem-driven work (an application paper), you should bring the actual users in the design.
  - Field study, case study, domain expert feedback, $\dots$
  - Lab studies or performance benchmarks are not necessary.
- To validate technique-driven work, you should report some quantitative results.
  - Lab studies for new visualizations and interactions
  - Benchmarks for new algorithms
- If there is a mismatch, your paper is very unlikely to be published.

<br>

# Validation Example

- Henry and Fekete, “MatrixExplorer: a Dual-Representation System to Explore Social Networks” (TVCG, 2006)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d0182e1e-eb97-4d11-ac8a-4e6ab1497921)

<br>

- Eliciting requirements

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cb8dade7-ae21-45fe-981d-1a793168513c)

<br>

- Don’t make your paper a manual
- Justify encoding/interaction design based on the observation

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c56ea309-ada4-45a4-a401-822787caf800)

<br>

- At the algorithm level, the focus is on the reordering algorithm.
- Downstream benchmark timings are mentioned very briefly.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/989318ec-b655-4a8d-bf00-d8f4fb587413)

<br>

- Qualitative result image analysis

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/17b00a4d-583c-4303-ab6f-2853c03b9ae3)

<br>

# Summary: Validation

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3a1fea70-d3ec-4b9d-93c6-f4b829452003)
