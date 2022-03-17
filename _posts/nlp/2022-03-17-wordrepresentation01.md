---
title: "[NLP] Word Representation"
categories:
  - NLP
tags:
  - Word Representation
  - Word2Vec
toc: true
toc_sticky: true
toc_label: "Word Representation"
toc_icon: "sticky-note"
---

# Word Representation

**Unmodeled Representation**

![image](https://user-images.githubusercontent.com/55765292/158756799-86982b00-afff-4fdd-9804-fba82df2b4e2.png){: .align-center}

## What does it mean to "know" a language?

### Levels of Linguistic Knowledge

![image](https://user-images.githubusercontent.com/55765292/158757182-e6769983-ec77-4e89-8666-bb7bae7fa92d.png){: .align-center}

### Phonetics / Phonology
- Pronunciation modeling

![image](https://user-images.githubusercontent.com/55765292/158757367-4c07f5e9-f270-4aec-b8a9-ba6c40c1876d.png){: .align-center}

### Orthography
- Character modeling

![image](https://user-images.githubusercontent.com/55765292/158757455-29a45420-c5f9-4daa-a9d3-719a37a54c96.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158757481-8584cf25-3437-46f9-8951-f79cc9ea219a.png){: .align-center}

### Word
- Languagae modeling
- Tokenization
- Spelling correction

![image](https://user-images.githubusercontent.com/55765292/158757658-427d1b9b-f917-4138-9a0f-f244c01455a9.png){: .align-center}

### Morphology
- Morphological analysis
- Tokenization
- Lemmatization

![image](https://user-images.githubusercontent.com/55765292/158757745-6329d63b-8770-44b4-8067-ad851b28b775.png){: .align-center}

### Syntax
- Syntactic parsing

![image](https://user-images.githubusercontent.com/55765292/158757841-537c65ac-70e3-4129-8f83-f11d5015a2b9.png){: .align-center}

A ship-shipping ship ships shipping-ships.
![image](https://user-images.githubusercontent.com/55765292/158757990-64cc4d17-cdfb-4ff6-8c7c-4a8182b92c5c.png){: .align-center}

### Semantics
- Named entity recognition
- Word sense disambiguation
- Semantic role labelling

![image](https://user-images.githubusercontent.com/55765292/158758128-fe513870-91a6-4318-b997-cb029623fa5d.png){: .align-center}

### Discourse
- Reference resolution
- Discourse parsing

![image](https://user-images.githubusercontent.com/55765292/158758220-d7c44ef1-3942-415f-aa77-1defb19a8f77.png){: .align-center}

---

![image](https://user-images.githubusercontent.com/55765292/158758360-226cd79a-f4c9-48b9-9c65-da9f2724bd3a.png){: .align-center}


---


## Word

![image](https://user-images.githubusercontent.com/55765292/158758600-0f20a63b-ab47-460a-8bf0-ec72590fc4b0.png){: .align-center}

### Lexical Semantics
- How should we represent the meaning of the word?
  - Words, lemmas, senses, definitions
  - Relationships between words or senses

![image](https://user-images.githubusercontent.com/55765292/158759423-d7ac6e78-112d-4c9b-b9a2-09397e5f2995.png){: .align-center}

- Lemma 'pepper'
  - Sense 1: spice from pepper plant
  - Sense 2: the pepeer plant itself
  - Sense 3: another similar plant (Jamaican pepper)
  - Sense 4: another plant with peppercorns (California pepper)
  - Sense 5: capsicum (i.e. chili, paprika, bell pepper, etc)

![image](https://user-images.githubusercontent.com/55765292/158759696-c0ae7c66-d0fa-4193-929a-aa494bee64e4.png){: .align-center}

### Relations
- Synonymity
  - Synonyms have the same meaning in some or all contexts
  - Ex) big/large, automobile/car, water/H2O
- Antonymy
  - Senses that are opposites with respect to one feature of meaning
  - Ex) dark/light, short/long, in/out
- Similarity
  - Not synonyms, but sharing some element of meaning
  - Ex) car/bicycle, cow/horse
- Word relatedness
  - Words be related in any way, perhaps via a semantic frame or field
  - Ex) car/bycicle: similar, car/gasoline: related but not similar

### Taxonomy

![image](https://user-images.githubusercontent.com/55765292/158760300-6bc729cb-38a4-4c2a-a548-e715529a2537.png){: .align-center}

### Lexical Semantics

**How should we represent the meaning of the word?
- Dictionary definition
- Lemma and wordforms
- Senses
- Relationships between words or senses
- Taxonomic relationships
- Word similarity, word relatedness
- Semantic frames and roles
- Connotation and sentiment
- ...

### Distributional Hypothesis
- The meaning of a word is its use in the language [Wittgenstein PI 1943]
- If A and B have almost identical environments we say that they are synonyms [Harris 1954]
- You shall know a word by the company it keeps [Firth 1957]

**Each word = one vector**
- Similar words are nearby in space
- The standard way to represent meaing in NLP

![image](https://user-images.githubusercontent.com/55765292/158760991-0d90274d-df03-4a2e-a0be-49af84e0e73f.png){: .align-center}

## Word Reperesentations
- Count-based
  - Created by a simple function of the counts of nearby words (tf-idf, PPMI)
- Class=based
  - Created through hierarchical clustering (Brown clusters)
- **Distributed prediction-based embeddings**
  - Created by training a classifier to distinguish nearby and far-away words (Word2vec, Fasttext)
- Distributed contextual embeddings from language models
  - Embeddings from language model (ELMo, BERT, GPT)

### Word2Vec
- Popular embedding method
- Very fast to train
- Ideas
  - Predict a word rather than count
  - Words that are semantically similar often occur near each other in text

![image](https://user-images.githubusercontent.com/55765292/158761642-8388c557-d32f-4cc0-8490-af2b820cb1bc.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158761859-6005302b-fe7c-4fa8-a334-c1f3e69c861e.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158761951-f637b3bc-5575-4575-887e-fbfa25083c10.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158761970-47b37ab8-7848-48ba-a34c-d948ea62e92b.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158761980-169d8160-c40b-45a9-b005-361f46f38a55.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158761992-396f2eb8-0558-4ed4-b3c2-4ace4c9914c1.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158762002-73e642ac-2399-446a-9ff5-50b65eefa3bd.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158762041-7368e9a1-c101-4441-b1c8-f8555c8344b2.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158762051-fab6e102-99d7-43c2-be33-22de86485c49.png){: .align-center}


- **Embeddings capture relational meaning**
Ex) king - man + woman ≒ queen

![image](https://user-images.githubusercontent.com/55765292/158762737-7f78e1dd-8ab6-4eac-8990-a7eba7a993e4.png){: .align-center}

- **Examples of Word2vec analogy test (Korean)**
  - [여름 - 더위 + 겨울] = [마름]
  - [선풍기 - 바람 + 눈] = [눈물]
  - [사람 - 지능 + 컴퓨터] = [소프트웨어]
  - [인생 - 사람 + 컴퓨터] = [관리자]
  - [그림 - 연필 + 영화] = [스타]
  - [손 - 박수 + 발] = [달리기]
  - [삼겹살 - 소주 + 맥주] = [햄]

- **Limitations**
  - Tokenizing a word is hard problem
  - Similar but many different format of words

![image](https://user-images.githubusercontent.com/55765292/158763343-34d2ed16-033d-4d72-9e1a-0f541f4568c6.png){: .align-center}


### FastText

- **Subword representation**

![image](https://user-images.githubusercontent.com/55765292/158764413-0271db73-5adb-4a00-9121-da629137a183.png)

![image](https://user-images.githubusercontent.com/55765292/158764445-02dbe881-126a-4860-9278-c4683e94ac60.png)

![image](https://user-images.githubusercontent.com/55765292/158764464-8f22981c-7b3a-4473-a30b-5df7275621bc.png)


### Word2Vec & FastText - Limitations

One word can have several meanings/roles depending on the context
Ex) 'play' word
  - Elmo and Cookie Monster **play** a game.
  - The Broadway **play** premiered yesterday.
  - Flowers **play** an important role in mental health of people.
  - Girls will **play** characters with a role to build the group's social relationship.
  - Some **play** the piano, while others dance, sing, and perform **plays**.



<br>
<br>
<br>
참고자료
- https://blog.naver.com/saltluxmarketing/221607368769
- https://github.com/MrBananaHuman/JamoFastText
