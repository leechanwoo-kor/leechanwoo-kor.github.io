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



<br>
<br>
<br>
참고자료
- http://karpathy.github.io/2015/05/21/rnn-effectiveness/
- https://colah.github.io/posts/2015-08-Understanding-LSTMs/
- http://jalammar.github.io/illustrated-bert/

![Uploading image.png…]()
