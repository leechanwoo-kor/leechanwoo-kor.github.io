---
title: "[NLP] Natural Language Processing"
categories:
  - NLP
tags:
  - NLP
toc: true
toc_sticky: true
toc_label: "Natural Language Processing"
toc_icon: "sticky-note"
---

# Natural Language Processing

## Introduction to NLP

### Communication with People

### Communication with Computers

![image](https://user-images.githubusercontent.com/55765292/156526428-664c5eae-0b25-460f-9ac2-5598e4f877cd.png)

- Making machines understand human language
  - Communication with humans
  - Access the wealth of information about the world
- Automation of natural languages (NL)
  - Analysis: NL => Representation (R)
  - Generation: R => NL
  - Acquisition of R from knowledge and data

## NLP Key Idea

### Representation

**Human Brain**
- How is the language/knowledge expressed (in the brain)?

![image](https://user-images.githubusercontent.com/55765292/156526872-e5b6d956-2b89-409c-892d-0ff163157e8e.png)

**Computer**
- How is the human language/knowledge expressed (in a computer)?

![image](https://user-images.githubusercontent.com/55765292/156527056-dad77c87-7f89-4db9-ab36-a01428bae4e2.png)

- How is the meaning of words expressed (in a computer)?

![image](https://user-images.githubusercontent.com/55765292/156527230-972a9087-1748-4296-836b-f89a218da6f2.png)

### Distributional Hypothesis

> *The meaning of a word is its use in the language [Wittgenstein PI 1943]* <br>
> *If A and B have almost identical environments we say that they are synonyms [Harris 1954]* <br>
> *You shall know a word bhy the company it keeps [Firth 1957]*

Question) Meaning of a word - Tesgüino <br>
Situation)
– No dictionary
– Never seen before
– We only know that the word is used in the following contexts
  1. A bottle of ________ is on the table.
  2. Everybody likes ________.
  3. Don’t have ________ before you drive.
  4. We make ________ out of corn.

|  **Word** | **Context 1** | **Context 2** | **Context 3** | **Context 4** |
|:---------:|:-------------:|:-------------:|:-------------:|:-------------:|
| Tesgüino  |      Yes      |      Yes      |      Yes      |      Yes      |
| Loud      |       No      |       No      |       No      |       No      |
| Tortillas |       No      |      Yes      |       No      |      Yes      |
| Wine      |      Yes      |      Yes      |      Yes      |       No      |

![image](https://user-images.githubusercontent.com/55765292/156529151-a172c4a9-7fa1-4c79-90a7-4a4cf5c508c2.png)
- Tesgüinois an artisanal corn beer produced by several Yuto-Aztec people.

Q) How is the meaning of words expressed (in a computer)?
A) Each word = one vector
  - Similar words are nearby in space
  - Understanding the context in which words are used in large textual data
  - 
|  **Word** | **Context 1** | **Context 2** | **Context 3** | **...** | **Context 100,000,000** |
|:---------:|:-------------:|:-------------:|:-------------:|:-------:|:-----------------------:|
| Tesgüino  |      Yes      |      Yes      |      Yes      |   ...   |          0.731          |
| Loud      |       No      |       No      |       No      |   ...   |          0.273          |
| Tortillas |       No      |      Yes      |       No      |   ...   |          0.276          |
| Wine      |      Yes      |      Yes      |      Yes      |   ...   |          0.836          |
|    ...    |       -       |       -       |       -       |   ...   |            -            |

## NLP Applications

**Applications**
- Machine Translation
- Information Retrieval
- Question Answering
- Dialogue Systems
- Information Extraction
- Summarization
- Sentiment Analysis
- ...

### Machine Translation

The task of translating a sentence x from one language (the source language) to a sentence y in another language (the target language)

![image](https://user-images.githubusercontent.com/55765292/156530556-6071f1f0-1b59-4029-ad1e-b42724350ed3.png)

![image](https://user-images.githubusercontent.com/55765292/157640577-3b8ac0ea-1346-4846-a4c2-c2d4ee1b5da5.png)

### Information Retrieval

the task of finding information that people want

![image](https://user-images.githubusercontent.com/55765292/157640699-f8d93b5b-2ecf-4c7c-99b7-0f24c7cf63ce.png)

![image](https://user-images.githubusercontent.com/55765292/157640753-7a109d70-da4f-4026-950e-48fddcb971ce.png)

### Question Answering

The task of answering a (natural language) question
One of the oldest NLP taks (punched card systems in 1961)

Idea: doing dependency parsing on question and searching most simillar answer

![image](https://user-images.githubusercontent.com/55765292/157640946-ac5c7d87-60fd-4532-819e-ce2f2b534a53.png)

![image](https://user-images.githubusercontent.com/55765292/157640966-d17ce238-4212-4b71-9ff8-ad1cdc8c34db.png)

### Dialogue Systems

The task of generating a response for making a conversation with human

**Turing test**

![image](https://user-images.githubusercontent.com/55765292/157641133-41ed7077-080c-4cc1-b964-9be8cabb70f5.png)

Ability to understand and generate language - intelligence
"Can machine think?"

### Information Extraction

The task of extracting structured information from unstructured documents

![image](https://user-images.githubusercontent.com/55765292/157641334-52331edd-829f-4c80-80c3-591151230611.png)

### Named Entity Recognition

- Find entities in text
- Classify entities in text
- Example)

![image](https://user-images.githubusercontent.com/55765292/157641523-f2a4ed20-b841-4cde-b871-0cc100d5c824.png)

![image](https://user-images.githubusercontent.com/55765292/157641560-d204af48-bf1e-478a-8e31-5f11526da122.png)

### Summarization

The task of creating a summnary that represents the most importnat or relevant information within original text

![image](https://user-images.githubusercontent.com/55765292/157641696-65e487a7-b50f-4100-9e76-b3b088367e4d.png)

![image](https://user-images.githubusercontent.com/55765292/157641717-5920599e-2ab0-4469-9002-c0a7b2018d86.png)

### Sentiment Analysis

The task of classifying emotions in subjective data

![image](https://user-images.githubusercontent.com/55765292/157641824-5803acae-ab37-4495-b38c-85e355654497.png)

- Fine-grained sentiment analysis
  - Identify a category of sentiment
  - Ex) very positive, positive, neutral, negative, very negative
- Emotion detection
  - Identify emotions
  - Ex) happiness, frustration, anger, sadness, ...
- Aspect-based sentiment analysis
  - Identify a category of sentiment in terms of aspect
  - Ex) "The CPU is fast. The battery runs fast."

![image](https://user-images.githubusercontent.com/55765292/157642174-dc3a9e66-91bc-482f-9f40-dd90fb0c5322.png)


## Challenges in NLP

### Learn bias

### Lack of Reasoning

### enerate rude response


## Why NLP is hard?
- Ambiguity
- Expressivity
- Scale
- Variation
- Sparsity
- Unmodeled variables
- Unknown representations



<br>
<br>
<br>
참고자료
- https://www.parentmap.com/article/mind-boggling-new-discoveries-about-the-brain
- https://dictionary.cambridge.org/dictionary/english/word
- https://en.wikipedia.org/wiki/Tesg%C3%BCino


