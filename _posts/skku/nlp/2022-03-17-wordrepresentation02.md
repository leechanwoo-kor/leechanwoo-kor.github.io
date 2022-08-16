---
title: "[NLP] Word Representation (2)"
categories:
  - NLP
tags:
  - Word Representation
  - RNN
  - ELMo
  - BERT
  - GPT
toc: true
toc_sticky: true
toc_label: "Word Representation (2)"
toc_icon: "sticky-note"
---

# Word Representation

## Word Reperesentations
- Count-based
  - Created by a simple function of the counts of nearby words (tf-idf, PPMI)
- Class=based
  - Created through hierarchical clustering (Brown clusters)
- Distributed prediction-based embeddings
  - Created by training a classifier to distinguish nearby and far-away words (Word2vec, Fasttext)
- **Distributed contextual embeddings from language models**
  - Embeddings from language model (ELMo, BERT, GPT)

### Language Models
- Probability distributions over sentences
  - P(W) = P(w1, w2, w3, ..., wk)
  - Ex) Probability of "I like riding a bicycle"
- Can use them to generate strings
  - P(wk | w1, w2, w3, ..., wk-1)
  - Ex) Probability of 'bicycle' given the strings "I like riding a"
- Rank possible sentences
  - Ex) P("I like riding a bicycle") > P("like a I bicycle riding")
  - Ex) P("I like riding a bicycle") > P("I like riding a computer")

**Application**
![image](https://user-images.githubusercontent.com/55765292/158765916-c3904d28-5121-415c-8749-85b9d0a01596.png){: .align-center}

- N-grams model
  - P(wk|w1, w2, w3, ..., wk-1) ≈ P(wk|kw-n, ..., wk-1)
  - Unigram, Bigram, Trigram, ...
- Neural language models
  - RNN
  - ELMo
  - BERT
  - GPT


### RNN(Recurrent Neural Network

**A family of neural networks for processing sequential data**

![image](https://user-images.githubusercontent.com/55765292/158766861-1e2508f8-0514-4dc4-a5f6-21516efddc0e.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158766826-3c0a1366-e6d4-46b4-96b5-e8c43adbf068.png){: .align-center}

**Limitations of naive RNN: Long-term dependencies problem**

![image](https://user-images.githubusercontent.com/55765292/158767139-c46107bb-791a-4a14-824b-1175309da736.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158767223-be989f44-ab54-40e8-92fd-29362043128d.png){: .align-center}


### ELMo

**Make word embedding from two separate directional LSTM**

![image](https://user-images.githubusercontent.com/55765292/158768304-3fadecf9-4d2f-4dde-a694-e415d6dab60e.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/158768445-822c2071-8705-4e86-a8e5-06ad5671d6ed.png){: .align-center}

### BERT
Make word embedding from transformer

![image](https://user-images.githubusercontent.com/55765292/159897055-042a5828-d1fa-4fe1-9678-c3f4b12fefee.png){: .align-center}


**Attention**
Human pay attention to correlate words in one sentence or different regions of an image

![image](https://user-images.githubusercontent.com/55765292/159896382-2efe9c17-7491-45e7-a000-132c08ce56af.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/159896538-9b878feb-810d-4f36-b3db-a9fb9e43387e.png){: .align-center}

**Transformer**
- Limitations of RNN: Can not run parallel (sequential modeling)
- A deep model with a sequence of attention-based transformer blocks
- Self-attention model

![image](https://user-images.githubusercontent.com/55765292/159896631-c2e57528-88a3-420e-873d-d23ab8cd3414.png){: .align-center}

- Language understanding is bedirectional (forward and backward)
  - ELMo models the bidirectional shallowly
- Let's use bidirectional encoder to encode text
  - But RNN is too slow
  - Let's make transformer to run the encoder fast

- How to train the model?

- Language understanding is bidirectional (forward and backward)
- Let's use transformer to encode text
- Let's mask out some input words, and then predict the masked words

![image](https://user-images.githubusercontent.com/55765292/159897537-865264f0-70ba-4812-9312-38411d6457ec.png){: .align-center}

Perform well on various NLP tasks with BERT pretrained model

![image](https://user-images.githubusercontent.com/55765292/159897697-8f439302-4bf0-4746-af37-e3a3a0532eff.png){: .align-center}

### GPT-2
- Use transformer decoder blocks (BERT uses encoder blocks)
- Train the model by predicting next word based on given strings
- Use large dataset (40GB) with large model size (1,500M)
- Perform well on various NLP tasks too

### GPT-3

![image](https://user-images.githubusercontent.com/55765292/159898048-ee6da7b7-0cf7-4792-8236-82c0328db0d5.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/159898196-dab08117-95a1-4ccc-bd06-bf10b92e7ebf.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/159898143-9b9870a5-d301-4f39-a21e-200364f57d7b.png){: .align-center}

**Language Models**

![image](https://user-images.githubusercontent.com/55765292/159898267-2c3ba166-9fed-4125-a454-f7473e95fc9c.png){: .align-center}

**Unmodeled Representation**

![image](https://user-images.githubusercontent.com/55765292/159898415-5c794736-127d-48fc-90ed-1af52606fcfb.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/159898460-feba076c-6a2c-4948-a345-ce9f55a9a18a.png){: .align-center}




<br>
<br>
<br>
참고자료
- http://karpathy.github.io/2015/05/21/rnn-effectiveness/
- https://colah.github.io/posts/2015-08-Understanding-LSTMs/
- http://jalammar.github.io/illustrated-bert/
- https://lilianweng.github.io/posts/2018-06-24-attention/
- http://jalammar.github.io/illustrated-transformer/
- https://medium.com/analytics-vidhya/openai-gpt-3-language-models-are-few-shot-learners-82531b3d3122
- https://lacker.io/ai/2020/07/06/giving-gpt-3-a-turing-test.html
- https://blog.pingpong.us/gpt3-review/
