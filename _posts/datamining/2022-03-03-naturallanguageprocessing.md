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




<br>
<br>
<br>
참고자료
- https://www.parentmap.com/article/mind-boggling-new-discoveries-about-the-brain
- https://dictionary.cambridge.org/dictionary/english/word
- https://en.wikipedia.org/wiki/Tesg%C3%BCino


