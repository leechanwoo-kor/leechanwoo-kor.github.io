---
title: "[NLP] Machine Translation"
categories:
  - NLP
tags:
  - NLP
  - Machine Translation
toc: true
toc_sticky: true
toc_label: "Machine Translation"
toc_icon: "sticky-note"
---

# Machine Translation

The task of translating a sentence x from one language (the source language) to a sentence y in another language (the target language)

![image](https://user-images.githubusercontent.com/55765292/163768930-fa472a84-1bfe-4eba-8b2e-1f8d8653316d.png){: .align-center}

**Challenges**
- Ambiguities
  - Word
  - Morphology
  - Syntax
  - Semantics
  - Pragmatics
- Gaps in data
  - Availablility of corpus
  - Commonsense knowledge
- Understanding of context, connotation, social norms, etc. 

![image](https://user-images.githubusercontent.com/55765292/163769232-fe62904d-d06f-49f9-822b-c2ccb073e1ec.png){: .align-center}

When I look at an article in Russian, I say:
"This is really written in English, but it has been coded in some strange symbols. I will now proceed to decode"

![image](https://user-images.githubusercontent.com/55765292/163769572-5699bbc4-ff5d-4a24-b618-e37b88606826.png){: .align-center}

### Noisy Channel Models
- A pattern for modeling a pair of random variables, W and A
- W is the plaintext, the true message, the missing information
- A is the ciphertext, the garbled message, the observable evidence

![image](https://user-images.githubusercontent.com/55765292/167069046-aed7a3dd-1f34-4e7a-ad3f-d05ca3885584.png){: .align-center}

- Decoding: select w given A = a

![image](https://user-images.githubusercontent.com/55765292/167069137-b25105e8-374c-419c-a66d-7dc34a033a48.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167069188-1fbc8951-a338-49f3-b2c5-03bc68b24a0f.png){: .align-center}

### MT as Direct Modeling
- one model does everything
- Trained to reproduce a corpus of translations

![image](https://user-images.githubusercontent.com/55765292/167069203-35c9d7c4-759f-47c9-b680-747781a56979.png){: .align-center}

### Two Views of MT

![image](https://user-images.githubusercontent.com/55765292/167074052-a6dc653a-12ee-4b0b-bcb3-81bce182473a.png){: .align-center}

- Noisy channel model
  - I know the target language
  - I have example translations texts (example enciphered data)
- Direct model
  - I have really good learning algorithms and a bunch of example inputs (source language sentences) and outputs (target language translations)

---

- Noisy channel model
  - Easy to use monolingual target language data
  - Search happens under a product of two models
    -  Individual models can be simple, product can be powerful
- Direct model
  - Directly model the process you care about
  - Model must be very powerful

**Now**?

- Direct modeling is where most of the action is
  - Neural networks are very good at generalizing and conceptually very simple
  - Inference in "product of wto models" is hard
- Noisy channel ideas are incredibly important and still play a big role in how we think about translation

### Parallel Corpora

![image](https://user-images.githubusercontent.com/55765292/167076260-b7412c95-b376-464a-93bc-51c55c3ea1f1.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167076357-30903ce7-55d0-4525-bd7f-fb5764536708.png){: .align-center}

- Europarl (proceedings of European parliament, 50M words/language)
  - http://www.statmt.org/europarl/
- UN Corpus (United Nations documents, six languages, 300M words/language)
  - http://www.euromatrixplus.net/multi-un
- Common crawl (Web documents, long tail of language pairs)

## Challenges

### Word Translation Ambiguity
- What is the best translation?

![image](https://user-images.githubusercontent.com/55765292/167076649-4656fc04-01da-4c39-aa99-99fb7957ce92.png){: .align-center}

- Solution intuition: use counts in parallel corpus

### Word Order
- Problem: different languages organize words in different order to express the same idea

![image](https://user-images.githubusercontent.com/55765292/167076938-49c3cc2f-f0f6-4875-91aa-964244a8d493.png){: .align-center}

- Solution intuition: language modeling!

### Output Language Fluency
- what is most fluent?

![image](https://user-images.githubusercontent.com/55765292/167077073-6140a947-0771-4b52-99ef-eb2cdf83fcd9.png){: .align-center}

- Solution intuition: a language modeling problem!

**How Good is Machine Translation Today?**
![image](https://user-images.githubusercontent.com/55765292/167077244-06af3952-f00c-4a72-81d8-c684a3c7bc6b.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167077204-2ec0e873-0108-42ff-bd12-5a51e0cc24b6.png){: .align-center}

**MT History**
![image](https://user-images.githubusercontent.com/55765292/167077269-ca4d6fb4-7481-4d0f-ac49-9f6c342f5b8f.png){: .align-center}

## Neural Machine Translation
Encoder-decoder framework

![image](https://user-images.githubusercontent.com/55765292/167087180-d9349af0-fc32-4e8d-aee3-300d32d7cf53.png){: .align-center}

**Encoder**

![image](https://user-images.githubusercontent.com/55765292/167087221-f4a2fd12-cd27-456d-a627-a99b9dff4f19.png){: .align-center}

**Decoder**

![image](https://user-images.githubusercontent.com/55765292/167087288-b34ebda6-c918-46d9-8889-42568658d92f.png){: .align-center}

- we have a model, how can we generate transaltions?
- Answers
  - Sampling: generate a random sentence according to probability distribution
  - Argmax: generate sentence with highest probability

### Inference Methods
- Greedy inference
  - We just start at the left, and use our classifier at each position to assign a label
  - One by one, pick single highest probability word
- Problems
  - Often generates easy words first
  - Often prefers multiple common words to rare words

![image](https://user-images.githubusercontent.com/55765292/167087683-e972ffb7-84cd-4c78-b99f-b7afdf0ea09e.png){: .align-center}

### Beam inference
- At each position keep the top *k* complete sequences
- Extend each sequence in each local way
- The extensions compete for the *k* slots at the next position

![image](https://user-images.githubusercontent.com/55765292/167087951-fffdac01-4f58-46f2-96ba-bec17c779a23.png){: .align-center}

### Neural Machine Translation
Google's NMT System 2016

![image](https://user-images.githubusercontent.com/55765292/167088055-7812cca7-7475-4a62-9823-383e906f671f.png){: .align-center}

- Encoder and decoder are both transformers
- Decoder consumes the previous generated token (and attends to input), but has no recurrent state

![image](https://user-images.githubusercontent.com/55765292/167089884-b2f202be-1e14-47a9-b6f4-1a1e6ff5b9da.png){: .align-center}

## Evaluation
- How good is a given machine translation system?
- Many different translations acceptable
- Evaluation metric
  - Subjective judgments by human evaluators
  - Automatic evaluation metrics
  - Task-based evaluation

### Adequacy and Fluency

![image](https://user-images.githubusercontent.com/55765292/167323785-375c1ace-8240-4330-bd76-7827a8c6b811.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167323797-ffaec126-cf5f-40d1-ae4b-25780daf9f2c.png){: .align-center}

### Automatic Evaluation Metrics
- Goal: computer program that computes quality of translations
- Advantages: low cost, optimizable, consistent
- Basic strategy
  - Given: MT output
  - Given: human reference translation
  - Task: compute similarity between them

### Precision and Recall of Words

![image](https://user-images.githubusercontent.com/55765292/167327376-ccafe81e-0486-4e19-891b-385ac9d7b793.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167327419-5d323176-f2ab-4922-89e7-3356ca9af30a.png){: .align-center}

### Bilingual Evaluation Understudy (BLEU)
- N-gram overlap between machine translation output and reference translation
- Compute precision for n-grams of size 1 to 4
- Add brevity penalty (for too short translations)

![image](https://user-images.githubusercontent.com/55765292/167327569-f73e15a4-3b4d-440f-b3e6-091ff542523e.png){: .align-center}

- Typically computed over the entire corpus, not single sentences

### Drawbacks of Automatic Metrics
- All words are treated as equally relevant
- Operate on local level
- Sceres are meaningless (absolute value not informative)
- Human translators score low on BLEU

**BLEU Correlate with Human Judgement**

![image](https://user-images.githubusercontent.com/55765292/167327695-2357cbb8-ba00-4468-ab9c-479d360923f2.png){: .align-center}

### BERTScore

![image](https://user-images.githubusercontent.com/55765292/167327817-ea1f1374-90c0-487e-a074-f5ee991ddd29.png){: .align-center}

