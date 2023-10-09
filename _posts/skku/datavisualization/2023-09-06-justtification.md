---
title: "[Data Visualization] Justification"
categories:
  - Data Visualization
tags:
  - Justification
toc: true
toc_sticky: true
toc_label: "Justification"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/159c74c5-0bd2-45f3-939a-f150d8fe4cd8)

<br>

# Review: Definitions of InfoVis

> InfoVis is the use of computer-supported, interactive, visual representations of abstract data to amplify cognition.
> by Stuart Card, Jock Mackinlay, Ben Shneiderman, 1999

<br>

# Questions We Will Answer

- Why Have a Human in the Loop?
- Why Have a Computer in the Loop?
- Why Use an External Representation?
- Why Depend on Vision?
- Why Show the Data in Detail?
- Why Use Interactivity?
- Why Is the Vis Idiom Design Space Huge?
- Why Focus on Tasks?
- Why Focus on Effectiveness?
- Why Are Most Designs Ineffective?
- Why Is Validation Difficult?
- Why Are There Resource Limitations?
- Why Analyze?

<br>

# Why Have a Human in the Loop?

- If your job can be done fully automatically by a computer-based solution, there is no need for human judgement.
  - e.g., stock trading bot, number-plate recognition, …
- However, many analysis problems in practice are **ill specified.**
  - Even people don’t know how to approach the problem.
  - e.g., exploratory data analysis (**EDA**)
- There are many possible questions to ask, but people don’t know which of these questions are the right ones in advance.
- Start with a human in the loop.
  - Design a vis system to augment human capabilities rather than replacing the human in the loop completely.
- Through iterations, you will find important questions that should be answered to meet users’ need.
- If the questions can be answered automatically, e.g., by an ML solution, automate it.
- But, in most cases, the questions cannot be answered fully automatically and need a human in the loop.
  - Data, tasks, requirements are ever-changing in practice.
 
<br>

# Why have a Computer in the Loop?

- You can draw a visualization either by hand with pencil and paper or by computerized drawing tools, for example, Illustrator.
- The scope of what people are willing and able to do manually is strongly limited by their attention span.
- Other limitations
  - Response time
  - Interactivity
  - Errors
  - Scalability
  - Generalizability
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bb575c7b-6229-4928-a3c6-3d084d714a03)

<br>

# Why Use External Representation?

- External representations augment human capacity by allowing us to surpass the limitations of our own internal cognition and memory.
- Vis allows people to offload internal cognition and memory usage to the perceptual system, using carefully designed images as a form of external representations, sometimes also called external memory.
- What is 32 * 49?

<br>

# Why Depend on Vision?

- Biggest bandwidth
  - Eyes (vision): 10,000,000 bps (1.25 MB/sec)
  - Skin (touch, tactition): 1,000,000 bps
  - Ears (hearing, audition): 100,000 bps
  - Nose (smell, olfaction): 100,000 bps
  - Mouth (taste, gustation): 1,000 bps
- Accurate
- Useful characteristics: preattentive processing
- Technological limitation

<br>

# Why Show the Data in Detail?

- Vis tools help people when seeing the dataset structure in detail is better than seeing only a brief summary of it.
- Data exploration for finding patterns
- Assessing the validity of a statistical model

<br>

- Anscombe's quartet and Simpson's paradox

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/414740fe-22c8-410f-9343-a89d79b6d203)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ce52d609-37da-4dd6-9b1c-13eb30a8bf22)

<br>

# Why Use Interactivity?

- We cannot visualize all the dimensions of data in a single view, because the screen space is limited.
- We allow users to interactively choose what they want to see.
- Most modern visualization systems are interactive.
- Btw, in Card et al.’s definition of InfoVis, interactivity is a must.

<br>

# Why is the Vis Idiom Space Huge?

- **A vis idiom** is a distinct approach to creating and manipulating visual representations.
  - e.g., a scatterplot is a vis idiom for bivariate data.
- If we only consider simple static idioms, such as scatterplots, bar charts, and line charts, there are not “too many” idioms.
- But, in practice, we link together these simple idioms and consider how to manipulate one or more idioms with interaction, the design space of possibilities gets even bigger.

<br>

# Why Focus on Tasks?

- Which visualization is better?

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6cab47a1-371d-48fb-944a-784b88462e57)

- If you are aware of human-centered design, you must ask “for what?” first.
- A tool that serves well for one task can be poorly suited for another.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/752f9d26-3828-49b8-aaa4-d190c2bf7069)

<br>

- In vis designs, we reframe the users’ task from domain-specific form into abstract form to identify similarities between tasks across many real-world usage contexts.
  - Wire transfer data
    - Task: find a transfer history between two bank accounts
  - Messenger data
    - Task: find a messaging record between two users
   
<br>

# Why Focus on Effectiveness?

- Every year, many novel vis idioms are introduced in the visualization community.
- However, not all of them are effective.
- “It’s not just about making pretty pictures.”
- We want pictures that support user tasks.
- Any depiction of data is an abstraction where choices are made about which aspects to emphasize.
  - **CAVEAT**: You do not determine which aspects to emphasize as you like. The user tasks must be considered in the design process.

<br>

# Why are Most Designs Ineffective?

- The vast majority of the possibilities in the design space will be ineffective for any specific usage context.
- Only a very small number of possibilities are in the set of reasonable choices, and of those only an even smaller fraction are excellent choices.
- Justification is important (why did you choose a specific idiom?).

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6513e41e-c8ca-4604-83fc-51e260fba46f)

<br>

# Why is Validation Difficult?

- Because there are so many questions that you can ask.
- Fast?
- Insightful?
- Engaging?
- Familiar?
- Accurate?
- Satisfactory?
- Fun?

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6719d59a-d85b-4700-b36a-b1cc0c5651e5)

# Why are there Resource Limitations?

- When you design or analyze a vis system, you must consider at least three different kinds of limitations:
- Computational capacity (e.g., scalability or responsiveness)
- CPU and RAM are finite!
- Human perceptual and cognitive capacity
- Human memory and attention are finite!
- Change blindness
- Display capacity
- \# of pixels is finite!

<br>

# Why are there Resource Limitations?

- Information density measures the amount of information encoded versus the amount of unused space.
  - a.k.a. graphic density and data-ink ratio
- Showing as much as possible at once vs showing too much at once

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ac9b6e25-b8c7-4cb1-ad48-b32fd37bf8c7)

<br>

# Why Analyze?

- In this lecture, we will analyze previous vis systems.
  - Many idioms and tools have been created in the past several decades.
  - There are so many possible combinations of data, tasks, and idioms.
  - We will abstract the previous vis systems!
- In terms of what? What, Why, and How
- **What** data does the user see? **(data abstraction)**
- **Why** does the user use the system? **(task abstraction)**
- **How** are the visual encoding and interaction idioms constructed? **(idiomabstraction)**
- One of these analysis trios is called an **instance.**

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/65c3caff-4e00-46d3-aa73-f22784935838)

<br>

# What-Why-How Examples

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a0649fe0-3399-4458-939a-f5e53ab45444)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a865ab1c-0b9d-4108-94b8-8d53ba967455)

<br>

