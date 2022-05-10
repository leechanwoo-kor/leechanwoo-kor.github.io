---
title: "[NLP] Question Answering"
categories:
  - NLP
tags:
  - NLP
  - Question Answering
toc: true
toc_sticky: true
toc_label: "Question Answering"
toc_icon: "sticky-note"
---

# Question Answering

- The task of answering a (natural language) question
- One of the oldest NLP tasks (punched card systems in 1961)
  - Idea: Doing dependency parsing on question and searching most simliar answer

![image](https://user-images.githubusercontent.com/55765292/167559078-1ef54d52-41f3-43ed-b805-d1df3e147f45.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167559233-9e322d1b-7ad2-4e36-a692-487fe30ce34a.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167559273-697c34f8-2abe-4297-8640-d2695dd68347.png){: .align-center}

## QUESTION ANSWERING

<div>
- Factoid QA: the answer is a single entity / numeric
  - "who wrote the book Dracula?"
- Non-factoid QA: answer is free text
  - "why is Dracula so evil?"
</div>{: .notice--success}

**QA subtypes (could be factoid or non-factoid):**
- Semantic parsing: question is mapped to a logical form which is then executed over some database
  - "how many people did Dracula bite?"
- Reading comprehension: answer is a span of text within a document
- Community-based QA: question is answerd by multiple web users
- Visual QA: questions about images

**Reading Comprehension**

![image](https://user-images.githubusercontent.com/55765292/167560501-3f56625a-c7f1-46fb-a14f-ed113fd92301.png){: .align-center}

**Textual Question Answering**

![image](https://user-images.githubusercontent.com/55765292/167560570-63a76ab6-9edd-4a73-bbf0-43fa628c29da.png){: .align-center}

**Conversational Question Answering**

![image](https://user-images.githubusercontent.com/55765292/167560617-1efbda70-edbf-4eaf-b8f2-2f3998a2f5ef.png){: .align-center}

**Long-form Question answering**

![image](https://user-images.githubusercontent.com/55765292/167560679-4fa7f55e-9032-4425-a87c-52df09a4c239.png){: .align-center}

**Open-domain Question Answering**

![image](https://user-images.githubusercontent.com/55765292/167560882-573caccc-78cb-4f85-b31f-750ac1dcb8f6.png){: .align-center}

**Knowledge Base Question Answering**

![image](https://user-images.githubusercontent.com/55765292/167560936-60a891b8-f2ec-46f8-aeac-e1325af1c88f.png){: .align-center}

**Table-based Question Answering**

![image](https://user-images.githubusercontent.com/55765292/167561014-47f80294-017d-40be-a33a-30ae3464474f.png){: .align-center}

**Visual Question Answering**

![image](https://user-images.githubusercontent.com/55765292/167561252-45e11cd1-b280-478d-9676-b99907af72e7.png){: .align-center}

### Stanford Question Answering Dataset (SQuAD)

![image](https://user-images.githubusercontent.com/55765292/167561354-e0b90859-d4ed-440c-803f-cc7691a9f40f.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167561371-0e3c7ce7-02cc-493b-b0e5-1bd098e1f6b7.png){: .align-center}


## METHODS FOR QUESTION ANSWERING

### Feature Based Methods
![image](https://user-images.githubusercontent.com/55765292/167564616-fabe7d57-5ca1-4c5f-a116-ab605d060e89.png){: .align-center}

**Bi-Directional Attention Flow for Machine Comprehension**
![image](https://user-images.githubusercontent.com/55765292/167564834-7c0504c1-04ba-41a2-ba69-e978fbaaa656.png){: .align-center}

**Coattention Encoder**
![image](https://user-images.githubusercontent.com/55765292/167565185-a91416b4-ebee-494c-b130-b9c2eca13905.png){: .align-center}

### BiLSTM-based Models
- Encode the question using word/char embeddings
  - pass on an biLSTM encoder
- Encode the passage similarly
- Passage-to-question and question-to-passage attention
- Modeling layer: another BiLSTM layer
- Output layer: two classifiers for predicting start and end points
- The entire model can be trained in an end-to-end way

### BERT-based Models
- Concatenate question and passage as one single sequence separated with a [SEP] token, then pass it to the BERT encoder
- Train two classifiers on top of passage tokens

![image](https://user-images.githubusercontent.com/55765292/167565858-83137ff6-9aa3-4362-b5c8-64f33689e456.png){: .align-center}

**Experiments on SQuAD**
![image](https://user-images.githubusercontent.com/55765292/167566121-14983dcd-ed6c-4985-9a63-4d3c887d3ec9.png){: .align-center}

**Is Reading Comprehension Solved?**
![image](https://user-images.githubusercontent.com/55765292/167566241-6743ae73-9468-4556-9ba8-b29c4c1287d7.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167566282-d706d2fb-8742-48a6-a3fb-a1623d514cee.png){: .align-center}

### Question Aswering Datasets
- Reading comprehension
  - CNN/Daily Mail, CoQA, HotpotQA, QuAC, RACE, SQuAD, SWAG, Receipt QA, NarrativeQA, DROP, Story Cloze Test, ...
- Open-domain question answering
  - DuReader, Quasar, SearchQA, ...
- Knowledge base question answering
- More datasets
  - http://nlpprogress.com/english/question_answering.html

## Reading comprehension

## Open-domain question answering

## Multi-hop question answering

## New types of QA
