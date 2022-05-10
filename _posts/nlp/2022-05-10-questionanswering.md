---
title: "[NLP] Question Answering"
categories:
  - NLP
tags:
  - NLP
  - Question Answering
  - Reading Comprehension
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
<br>
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

## READING COMPREHENSION
![image](https://user-images.githubusercontent.com/55765292/167566720-fd2a0dae-ab5e-44d1-ae2d-46249f312859.png){: .align-center}

**CNN Article**
![image](https://user-images.githubusercontent.com/55765292/167566834-ba128a18-5256-4c9c-ba3e-2d933df4970d.png){: .align-center}

- Dataset Statistics
  - Articles were collected from April 2007 for CNN and June 2010 for Daily Mal, until the end of April 2015
  - Validation data is from March, test data from April 2015
- Question Diffuculty
  - Distribution (in percent) of queries over category and number of context sentences required to answer them based on a subset of the CNN validate data

![image](https://user-images.githubusercontent.com/55765292/167566926-f12b6f6c-55fe-431b-a57b-9e5f2abb1047.png){: .align-center}

- Simple Baselines

![image](https://user-images.githubusercontent.com/55765292/167567150-d58e7f33-4ccb-458f-ad5a-3681d3d8169e.png){: .align-center}

### Reading vs Encoding
Use neural encoding models for estimating the probability of word type 𝑎𝑎from document 𝑑𝑑answering query 𝑞𝑞:
*(a|d,q) ∝ exp(W(a)g(d,q))*
where
- *W(a)* indexes row 𝑎𝑎of weight matrix *W*
- *g(d,q)* returns a vector embedding of a document and query pair

### Deep LSTM Reader

![image](https://user-images.githubusercontent.com/55765292/167567749-9501606b-4577-4f17-b107-0c65cf4083af.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167567779-ddcd615e-1812-411f-8f6f-69ce46b43748.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167567798-5d7926cd-d682-44e5-bd19-51cfb13bb29e.png){: .align-center}

### Attentive Reader
![image](https://user-images.githubusercontent.com/55765292/167567989-f138f633-cd94-4320-bbfb-5b0ac74f77d6.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167568022-8bb73132-0936-42cf-a4cb-d57c354339af.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167568063-26785ebc-fe4b-4c38-b2ea-fdd34e07c48d.png){: .align-center}

**Attentive Reader Training**
![image](https://user-images.githubusercontent.com/55765292/167568192-8838775f-ffd3-4de6-90bb-eb793dc1b7be.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167568226-f96aefff-f470-456f-8f91-9800a45576af.png){: .align-center}

### Impatient Reader
![image](https://user-images.githubusercontent.com/55765292/167568269-2d8ed506-7395-420a-9a1c-4cbd43c302d8.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167568292-531eb550-f8dc-42ef-89a6-f9214245d277.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167568408-4d600614-c2cd-4e7b-ab46-ad83685559dd.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167568431-3fa6f2ca-1386-4a43-84d2-6e3bba557e4a.png){: .align-center}

### Summary
- Supervised machine reading is a viable research direction with the available data
- LSTM based recurrent networks constantly surprise with their ability to encode dependencies in sequences
- Attention is a very effective and flexible modeling technique

## OPEN-DOMAIN QUESTION ANSWERING
- Simmons et al. (1964) did first exploration of answering questions from an expository text based on matching dependency parses of a question and answer
- Murax(Kupiec1993) aimed to answer questions over an online encyclopedia using IR and shallow linguistic processing
- The NIST TREC QA track begun in 1999 first rigorously investigated answering fact questions over a large collection of documents
- IBM’s Jeopardy! System (DeepQA, 2011) brought attention to a version of the problem; it used an ensemble of many methods
- DrQA(Chen et al. 2017) uses IR followed by neural reading comprehension to bring deep learning to Open-domain QA

**IBM's Watson and Jeopardy! Challenge**
![image](https://user-images.githubusercontent.com/55765292/167568842-6daed1b0-d5f5-40c3-8a74-e50f16a5039a.png){: .align-center}

**Compared to Reading Comprehension?**
- Challenges from both large-scale open-domain QA and of machine comprehension
- The question can be any open-domain questions
  - Instead of quesetions posed after reading the passage

### Traditional QA System
![image](https://user-images.githubusercontent.com/55765292/167569371-9801e93e-5407-498e-b7be-0df601fbf3ec.png){: .align-center}

### QA System
![image](https://user-images.githubusercontent.com/55765292/167569511-c1084fd3-72d9-46d3-8a18-39a3688b19dc.png){: .align-center}

**DrQA: Two-Stage Retriever and Reader**
![image](https://user-images.githubusercontent.com/55765292/167570012-78efb4ca-0ef0-4c68-9d03-b5c389aa5f64.png){: .align-center}

**Document Retriever: Two Steps**
1. TF-IDF bag-of-words vector
2. Efficient bigram hashing (Weinberger et al., 2009)
  - Map the bigram to 224 bins with an unsigned murmur3 hash
    - Preserving speed and memory efficiency
  - Murmur3: map a word or string to a 32-bit or 128 bit value

### Document Reader
![image](https://user-images.githubusercontent.com/55765292/167570526-ae8233ab-286f-40e7-a0ad-2c692a513ad0.png){: .align-center}

#### Paragraph Encoding
![image](https://user-images.githubusercontent.com/55765292/167570589-af0d6844-4e81-4e76-aead-48d5ade658e5.png){: .align-center}
- Represent kokens in a paragraph as a sequence of feature vectors
  - Word embedding
  - Exact match
  - Token features
  - Aighned question embedding
- Pass features as the input to a RNN (multi-layer Bidirectional LSTM)

#### Question Encoding
![image](https://user-images.githubusercontent.com/55765292/167570818-ea59cad3-0ac5-44b7-856a-949cddfd8e7d.png){: .align-center}
- Apply another RNN to top of word embeddings of qi and get qj
- Combining the resulting units into one single vector
![image](https://user-images.githubusercontent.com/55765292/167570933-f9b73a56-4d09-4f92-aa66-73cfc8231bb3.png){: .align-center}

#### Prediction
![image](https://user-images.githubusercontent.com/55765292/167570986-23985dea-95d4-4820-ab85-61305fb0011c.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167571024-c78406b6-a42c-44bf-b6c1-b87e15c8ee4c.png){: .align-center}

### Dataset and Example Training Data & Result
![image](https://user-images.githubusercontent.com/55765292/167571072-2e0f4d8d-d0d4-4c6a-9767-41d2862f5175.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167571186-772cd1df-54c8-4f0c-a3cc-5677fa04cd23.png){: .align-center}

### Summary: DrQA
- DrQAwas the first attempt to scale up reading comprehension to open-domain question answering, by combining IR techniques and neural reading comprehension models
- Although we achieved good accuracy on SQuADin 2017, the final QA accuracy still remains low:
- Distant supervision + multi-task learning helps

**Limitations of Current Models**
![image](https://user-images.githubusercontent.com/55765292/167571361-72b6d712-bf16-4774-983e-42c52ad389e5.png){: .align-center}

### Latent Retrieval for Weakly Supervised Open Domain Question Answering
![image](https://user-images.githubusercontent.com/55765292/167571432-6bf2b891-772c-4774-bdb5-bef412aa88aa.png){: .align-center}
![image](https://user-images.githubusercontent.com/55765292/167571464-140c8bc1-ba31-455a-b036-447ccb4a47ac.png){: .align-center}

**Information Retrieval (IR)**
![image](https://user-images.githubusercontent.com/55765292/167571546-73c2510d-ed72-4c37-b917-6a5b253f18b1.png){: .align-center}

**Reader (QA)**
![image](https://user-images.githubusercontent.com/55765292/167571576-c3262c47-814b-4ce1-a73b-908404279c51.png){: .align-center}

**Result**
![image](https://user-images.githubusercontent.com/55765292/167571625-05e2bc81-a62c-4af9-b3e0-840f47d0dcaf.png){: .align-center}


## MULTI-HOP QUESTION ANSWERING
- Very few SQuADquestions require actually combining multiple pieces of information
  - This is an important capability QA systems should have
- Several datasets test multi-hop reasoning
  - Ability to answer questions that draw on several sentences or several documents to answer

### WikiHop
- Annotators shown Wikipedia and asked to pose a simple question linking two entities that require a third (bridging) entity to associate
- A model shouldn’t be able to answer these without doing some reasoning about the intermediate entity
- 
![image](https://user-images.githubusercontent.com/55765292/167571863-de7a34da-21d0-4ba1-b1d9-0b44094dcb23.png){: .align-center}

### HotpotQA
![image](https://user-images.githubusercontent.com/55765292/167572087-19cb5c2f-4a4c-4b1f-bac2-067ee5c2b51f.png){: .align-center}

### Multi-Hop Reasoning
- This is idealized version of multi-hop reasoning
- Do models need to do this to do well on this task?

![image](https://user-images.githubusercontent.com/55765292/167572130-943ba2fa-024b-4400-87f8-c82403e180e6.png){: .align-center}

- Model can ignore the bridging entity and directly predict the answer

![image](https://user-images.githubusercontent.com/55765292/167572371-18831894-3cff-468a-ac7e-f36a95cea4d5.png){: .align-center}

- No simple lexical overlap
- But only one government position appears in the context

![image](https://user-images.githubusercontent.com/55765292/167572469-dafb0c31-3e17-40ee-819d-b1a950fa938f.png){: .align-center}

## NEW TYPES OF QA

### DROP
- Let's build QA datasets to help the community focus on modeling particular things

![image](https://user-images.githubusercontent.com/55765292/167572638-15fb273a-b821-40f7-8658-23e8ae076e3c.png){: .align-center}

- Question types: subtraction, comparison (which did he visit first), counting and sorting (which kecker kecked more field goals),
- Invites ad hoc solutions (structure the model around predicting differences between numbers)

### NarrativeQA
- Humans see a summary of a book
  - ... Peter’s former girlfriend Dana Barrett has had a son, Oscar ...
- Question: How is Oscar related to Dana?
- Answering these questions from the source text (not summary) requires complex inferences and is extremely challenging

![image](https://user-images.githubusercontent.com/55765292/167573059-a10cb216-9bae-4f99-aad5-06d0463a9e50.png){: .align-center}

### Summary
- Lots of problems with current QA settings, lots of new datasets
- Models can often work well for one QA task but don't generalize
- We still do not have (solvable) QA settings which seem to require really complex reasoning as opposed to surface-level pattern recognition
