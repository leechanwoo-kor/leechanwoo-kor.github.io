---
title: "[NLP] Conversation Model"
categories:
  - NLP
tags:
  - NLP
  - Conversation Model
toc: true
toc_sticky: true
toc_label: "Conversation Model"
toc_icon: "sticky-note"
---

# Conversation Model

## Dialogue Systems

The task of generating a response for making a conversation with human

![image](https://user-images.githubusercontent.com/55765292/172513675-13aab089-8717-4580-a1fd-e4e4dcad27d0.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/172513734-27a58094-b9ba-43bf-b0de-cbf664cd2c11.png){: .align-center}

- Turing test

![image](https://user-images.githubusercontent.com/55765292/172513841-b16d1df4-4444-4a1b-bf37-c8dc7ba46bc1.png){: .align-center}

Ability to understand and generate language - intelligence
"Can machine think?"


### ELIZA
- Created 1964-1966 at MIT, heavily scripted
- DOCTOR script was most successful: repeats user's input, asks silly questions
![image](https://user-images.githubusercontent.com/55765292/172514421-cca5dc7f-c60f-49b0-8ef1-f3365a5f0923.png){: .align-center}

---

- Identify keyword, Identify context, apply transformation rule

![image](https://user-images.githubusercontent.com/55765292/172514508-401529c1-a173-4af9-951d-285ac5aa9376.png){: .align-center}

- Very little need to generate new content, but can only have one type of conversation

### Cleverbot
- Carpenter(1986), online system built in 2006
- "Nearset neighbors": Human says statement A, find a human response in human-human or human-computer chats to statement A, repeat that
- Can often give sensible answers, but the bot doesn't really impose high-level discourse structure

![image](https://user-images.githubusercontent.com/55765292/172515015-4e6b7272-166c-43dd-a0dd-886907cec744.png){: .align-center}


## Conversation Model

### Data-Driven Approaches
- Can treat as a machine translation problem
  - "translate" from current utterance to next one
- Filter the data, use statistical measures to prune extracted phrases to get better performance

### Seq2seq models
Just like conventional MT, can train seq2seq models for this task
![image](https://user-images.githubusercontent.com/55765292/172515264-03fb7f44-5f2d-4053-9389-7b8fdca0c993.png){: .align-center}

### Lack of Diversity
Training to maximize likelihood gives a system that prefers common responses
![image](https://user-images.githubusercontent.com/55765292/172515360-0f0c8e78-d568-4fea-a2f3-9a491bd44975.png){: .align-center}

---

- Solution
  - Mutual information criterion
  - Response $R$ should be predictive of user utterance $U$ as well
- Standard conditional likelihood: $\log P(R \mid U)$
- Mutual information: $\log P(R \mid U)-\log P(R)$
- $\log P(R): probabilities under a language model$

![image](https://user-images.githubusercontent.com/55765292/172515818-29be64b3-2bdf-4f66-9c8f-076147cab76d.png){: .align-center}


### PersonaChat

![image](https://user-images.githubusercontent.com/55765292/172515868-dd74514d-db5c-4509-95be-bea1cb3a0186.png){: .align-center}

### Wizard of Wikipedia

![image](https://user-images.githubusercontent.com/55765292/172515913-4ce95c2a-f189-4c35-94e3-30141259db11.png){: .align-center}

### Conversation Model

![image](https://user-images.githubusercontent.com/55765292/172515965-3ad56720-d542-4c9f-bb26-6da8d3f669f0.png){: .align-center}

### Motivation

#### 1. Inconsistent personality
- Existing conversation models tend to generate inconsistent personal responses even the speaker is the same
![image](https://user-images.githubusercontent.com/55765292/172516103-50d84ba4-542f-4905-94aa-49c6205a39f8.png){: .align-center}


#### 2. Average personality of all speakers
- Existing conversation models tend to generate the same responses even the speakers are different
![image](https://user-images.githubusercontent.com/55765292/172516243-4159e1a6-108b-40df-8549-fb436e3ccbd2.png){: .align-center}

### Idea
- Use a stochastic variable for the context from speakers
  - Learns the context of conversations between two speakers
  - Infers the context of new conversation from the speakers
- Provide speaker info to response generator indirectly
  - Learns speakers' preference from own utterances
  - Infers the mixture of speakers' preference and the context

