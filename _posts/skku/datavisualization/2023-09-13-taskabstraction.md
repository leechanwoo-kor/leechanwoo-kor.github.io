---
title: "[Data Visualization] Why - Task Abstraction"
categories:
  - Data Visualization
tags:
  - Task Abstraction
toc: true
toc_sticky: true
toc_label: "Task Abstraction"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/159c74c5-0bd2-45f3-939a-f150d8fe4cd8)

<br>

# Review: The Big Picture

- **What data does the user see? (data abstraction)**
- Why does the user use the system? (task abstraction)
- How are the visual encoding and interaction idioms constructed? (idiom abstraction)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4116e29f-bb6c-471c-b241-388c8815a7a0)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5fdd1479-b3b1-4f08-bf83-a73f92f439db)

<br>

# The Big Picture

- What data does the user see? (data abstraction)
- **Why does the user use the system? (task abstraction)**
- How are the visual encoding and interaction idioms constructed? (idiom abstraction)

<br>

# Why - Task Abstraction

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/23691be3-9a05-4b49-9d14-6d4f9745c39f)

<br>

- Why data abstraction?
  - There are an infinite number of datasets.
  - Thus, it would be inefficient to design a visualization system for every dataset.
- Why **task** abstraction?
  - There are an infinite number of **tasks that users want to perform on the system.**
  - Thus, it would be inefficient to design a visualization system **for every task.**
 
<br>

- Consider tasks in abstract form , rather than domain specific way
  - Otherwise, hard to make useful comparisons between domain situations
- Actually, below are two instances of “compare values between two

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f4cedb46-8d10-4412-a6de-46382f3db9c5)

<br>

- The analysis framework has a small set of carefully chosen words to describe **why people are using vis**
  - Action: analyze, search, query, $\dots$
  - Targets: trends, outliers, distribution, $\dots$
- The same vis tool might be usable for many different goals.
  - To describe complex activities, you can specify a chained sequence of tasks, where the output of one becomes the input to the next.

<br>

# Who : Designer or User

- Although who is not a part of the what why how framework, it is sometimes useful to specify who has a goal or makes a design choice.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9fdd046f-aeb8-4168-ad24-3cc6c9df6f37)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/572e8e70-9513-40b9-8681-81134cade0b1)

<br>

# Actions

- Three levels of actions:
- High level choice: Analyze
  - Q) How is the vis tool used to analyze data?
  - A) Consume existing data or produce additional data.
- Mid level choice: Search
  - Q) What kind of search is involved?
  - A) Lookup, browse, locate, or explore
- Low level choice: Query
  - Q) Does the user need to identify one target?
- Choices at the three levels are independent.
  - Usually, we describe actions at all three levels.
 
<br>

## High level Choice: Analyze

- Why are possible goals of users who want to analyze data using a vis tool?
- **Consume** : The most common case for vis is for the user to consume information that has already been generated as data stored in a format amenable to computation.
  - This is the most common “why”.
- **Produce** : However, sometimes, we use vis to produce new materials! We will see examples later.

<br>

### High level Choice: Analyze - Consume

- Three consume goals:
- **Discover (= explore) explore)**: to find new knowledge that was *not previously known*
- **Present (= explain)**: to communicate with others about the *knowledge that is known*
- **Enjoy** : visualization in casual encounters, e.g., infographic

<br>

#### High level Choice: Analyze - Consume - Discover

- The **discover** goal refers to using vis to find new knowledge that was not previously known.
- You want to find some insights from an unseen dataset. What will you do?
  - Usually, investigation is driven by existing theories, models, hypotheses, or hunches.
- **Generate** a new hypothesis or **verify** , or disconfirm, an existing hypothesis.

<br>

##### High level Choice: Analyze - Consume - Discover Example

- You have a periodic table data.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d275d13f-3002-436a-8f5b-4cf88ca34c80)

- What can you discover?
- You may want to explore the data using a vis tool.

<br>

- Plot a scatterplot melting point vs first ionization energy

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e7a54e28-37fd-4ae9-bd7b-dfac2cb5c618)

- The distribution was bell shaped with an outlier (Carbon).

<br>

- Plot a scatterplot melting point vs boiling point

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/358fa74e-fece-4d4a-be93-706cf74d0bc1)

<br>

- My hypothesis was (boiling point) > (melting point), but there were a few outliers (e.g., Californium).

<br>

#### High level Choice: Analyze - Consume - Present

- The present goal refers to the use of vis for the succinct communication of information (= explain).
  - e.g., telling a story with data, or guiding an audience through a series of cognitive operations.
- One classic example: a diagram in a newspaper
- The knowledge communicated is already known to the presenter in advance.

<br>

##### High level Choice: Analyze - Consume - Present Example

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a8e885c9-9e20-4c7a-a769-1e147195b2c0)

<br>

#### High level Choice: Analyze - Consume - Enjoy

- The enjoy goal refers to casual encounters with vis.
  - Vis for fun!
- Sometimes, the goals of the eventual vis user might not be a match with the user goals conjectured by the vis designer!

<br>

##### High level Choice: Analyze - Consume - Enjoy Example

- Top 15 Best Global Brands Ranking (2000 2018)
  - Source: https://www.youtube.com/watch?v=BQovQUga0VE&ab_channel=TheRankings

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/002b0fdc-1584-44f9-b0ab-26ddcae2c1ab)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/99984f6d-c634-4515-b405-bbbecdec1e0c)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/47174d27-70c4-42df-8b35-d49272a3bac6)

<br>

### High level Choice: Analyze - Produce

- In the **produce** goal, the intent of the user is to generate new material.
  - Sometimes, the user intends to use the new material for some other vis related tasks, such as discovery presentation.
- **Annotate** (~tag): adding graphical or textual annotations associated with one or more visualization elements
- **Record** : saving or capturing visualization elements as persistent artifacts
- **Derive** (= transform): producing new data elements based on existing data elements.

<br>

#### High level Choice: Analyze - Produce - Annotate & Record

- The difference between **annotate** and **record**
  - The **annotate** choice attaches information temporality (can be subsequently recorded)
  - The **record** choice saves a persistent artifact (e.g., screen shots, videos, etc.)
  - But, it seems that these two are interchangeable in most contexts.
 
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8be31716-00a7-4ff8-80ec-4b7b3db16857)

<br>

#### High level Choice: Analyze - Produce - Derive

- The derive goal is to produce new data elements based on existing data elements.
  - What can be derived? an attribute or a new dataset
- Let’s recall the InfoVis Reference Model

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/20c92a78-9d24-4328-99a6-e282675ab86f)

<br>

- How would you derive a new attribute (creating derived attributes)?
  - By changing the type of an attribute (can lose some information)
    - Grade (O) to score (Q): A+ 98, A0 93, B+ 88, ...
    - Temperature (Q) to category (N): 30 hot, 20 warm, 0 cold
  - By augmenting external data (adding information)
    - City name (N) to latitude (Q) and longitude (Q)
  - By applying mathematical operations
    - Computing the difference between two attributes
    - Log scale
    - Min-max normalization
    - One hot vector encoding
   
<br>

##### High level Choice: Analyze - Produce - Derive Example

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8c248b96-76cb-410d-aa5f-8b2201fd4e9c)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2da4ab8e-dd68-4d33-8f24-586e4b589d89)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/130ed75c-4e3a-46d8-ae37-cf932cfa40ae)

<br>

#### #### High level Choice: Analyze - Produce - Derive

- Sometimes, we derive an entirely new dataset.
  - e.g., reshaping operations in pandas

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/44b23bda-78fe-438d-a2ba-f9d32afcbed4)

<br>

- Sometimes, we derive an entirely new dataset.
  - e.g., group by operations in pandas
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dd3ff418-d62f-4da0-b54c-751666cf068b)

<br>

- Another example of deriving a new dataset is to change the dataset type.
  - e.g., building K Nearest Neighbor (KNN) Graph (a table to a network)
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1582f97c-436a-47d2-b0ae-93f28965f86f)

<br>

## Mid-level Choice: Search

- All of the high level analyze cases require users to **search** for elements of interest within the vis as the mid level goal.
- Search can be classified into four cases depending on
  - 1. whether the identity of the search target is known or not and
  - 2. whether the location of the search target is known or not.
   
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/605b2431-3af8-4c50-85aa-4634c5524c26)

<br>

- Lookup : looking up human (target) knowing that it belongs to mammals ( location
- Locate : locating rabbits target ) not knowing where it belongs to
  - Commonly, we call just this specific task a “search”.
  - e.g., search “abc.txt” on your disk
- Browse : browsing all leaves of the mammal subtree location
- Explore : exploring for a family having the largest number of species
  - Note: “explore” was a synonym of “discover”.
 
<br>

## Low-level Choice: Query

- After searching, you will find a target or set of targets.
- Then, you may want to investigate the targets by **querying** some information.
- **Identify** : returns the characteristic of a single target
- **Compare** : returns the characteristics of multiple targets
- **Summarize (= overview)**: returns a comprehensive view of everything
  - Extremely common in vis systems as a startup view!

<br>

### Low-level Choice: Query Example

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/40bd0c9c-dd78-432b-b2d7-ebca6e297434)

- Identify : identifying the election result of one state
- Compare : comparing the election result of one state to another
- Summarize : summarizing the election results cross all states to determine how many favored one candidate

<br>

# Targets

- So far, we have learned actions (verbs) that users want to perform on vis.
- Targets (nouns) mean some aspect of data that is of interest to users.
- What does your vis do?
  - Action + Target
  - Discover Trends
  - Present Distribution
  - Compare Topology

<br>

- All data level
  - **Trends** : a high level characterization of data
    - e.g., increase, peaks, troughs, plateaus
  - **Outliers** : elements do not fit well with trends
  - **Features** : particular structures of interest
    - e.g., clique in graph theory

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b180755f-b575-469c-b390-644953dcb5ad)

<br>

- Attribute level
  - **Distribution** : the distribution of study time
  - **Extremes** : the student who study longest per week
  - **Dependency** : does grade depend on study time
    - In general, such a causal relationship is really hard to prove!
  - **Correlation** : are grade and study time positively correlated?
  - **Similarity** : similarity between students in terms of study time grade
 
<br>

- Network datasets: **topology** and **paths**
- Spatial datasets: **shapes**
- The last two pertain to specific types of datasets.

<br>

# So, How?

- So far, we have learned the terms for describing what to be visualized (**data abstraction**) and why we visualize (**task abstraction**)
- Then, how do we visualize data?
  - “visualization
- There are many useful idioms and studying those idioms is the main goal of this course!
- Let me give you a brief overview first…

<br>

# How - Idiom Abstraction

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1b29413e-a832-4522-864b-b11278686f6a)

<br>

# Visualization Analysis Example

- SpaceTree vs. TreeJuxtaposer
- SpaceTree : https://www.youtube.com/watch?v=B4vuSLVCJtw&t=112s&ab_channel=HCILUMD
- TreeJuxtaposer : https://www.youtube.com/watch?v=eIK3ItXyMi0&ab_channel=HCILUMD

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/77f1cd81-e71c-4731-bbac-2c68875fa5fa)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d0546f58-cab3-4b06-9aa9-fae8e0c19f26)

<br>

# Deriving Attribute Example

- When a tree is too big, we need a way to summarize the tree.
- **The Strahler Number** : a measure for node importance
- Original: 500,000 nodes, Simplified: 5,000 nodes
- Can be described by a chained sequence of two instances

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1325ace9-171f-40a0-a90e-7e0676613cad)

<br>

# Summary: Task Abstraction

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/afbed741-0373-41ae-a13a-34973f7516d4)
