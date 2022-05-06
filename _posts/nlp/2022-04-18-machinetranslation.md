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

**Iference Methods**

## Evaluation

### Adequacy and Fluency

...
