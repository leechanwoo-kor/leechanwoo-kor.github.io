---
title: "[NLP] Transformer"
categories:
  - NLP
tags:
  - NLP
  - Transformer
  - Seq2seq Model
toc: true
toc_sticky: true
toc_label: "Transformer"
toc_icon: "sticky-note"
---

# Transformer

**Attention**
Human pay attention to correlate words in one sentence or different regions of an image

## Seq2seq Model
Encoder-Decoder model

### Problems with Seq2seq Models
- Encoder-decoder models like to repeat themselves
  - Example: ...
- Why does this happen?
  - Models trained poorly
  - LSTM state is not behaving as expected so it gets stuck in a “loop” of generating the same output tokens again and again
- Solution?
  - Need some notion of input coverage or what input words we’ve translate

---

- Bad at long sentences
  - A fixed-size hidden representation doesn't scale
  - LSTMs still have a hard time remembering for really long periods of time

---
- Unkown words

- Encoding these rare words into a vector spcae is really hard
- In fact, we don't want to encode them, we want a way of directly looking back at the input and copying them
- 

### Attention
- Suppose we knew the source and target would be word-by-word translated-
- Can look at the corresponding  input word when translating
- Much less burden on the hidden state
- How can we achieve this without hardcoding it?

**At each decoder state, we compute a distribution over source inputs based on current decoder state, use that in output layer**

**For each decoder state, compute weighted sum of input states**

- No attention: P(yi|x, y1, ..., yi-1) = softmax(Whi)
- Attention: P(yi|x, y1, ..., yi-1) = softmax(W[ci;hi])
ci = sig(aij*hj)
aij = exp(eij)/sig(exp(eij'))
eij = f(hi,hj)

image

- Encoder hidden states capture contextual source word identity
- Decoder hidden states are now mostly responsible for selecting what to attend to
- Doesn't take a complex hidden state to walk monotonically through a sentence and spit out word-by-word translations


### Self-Attention
- LSTM abstraction
  - Maps each vector in a sentence to a new, context-aware vector
- CNNs do something similar with filter
- Attention can give us a third way to do this

**What words need to be contextualized here?**
– Pronouns need to look at antecedents
– Ambiguous words should look at context
– What words need to be contextualized here?
– Words should look at syntactic parents/children

- Want
[이미지]
- LSTMs/CNNs: tend to look at local context
[이미지]
- To appropriately contextualize embeddings, we need to pass information over long distances dynamically for each word

Each word forms a "query" which then computers attention over each word

Multiple "heads" analogous to different convolutional filters Use parameters Wk & Vk to get different attention values & transform vectors

[이미지]

- Attend nearby & to semantically related terns
- Why multiple heads?
  - Softmax ends up being peaked, single distribution cannot easily put weight on multiple things

---

- Query : Context vector
- Key: Target vector
- Value: Correlation value between query and key

[이미지]
[이미지]
[이미지]
[이미지]
[이미지]

## Transformer















