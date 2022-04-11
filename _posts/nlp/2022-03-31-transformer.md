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

![image](https://user-images.githubusercontent.com/55765292/162674215-63575c44-f6d9-4e11-aedc-a29801172f65.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/162674280-a256221c-ac8b-44fc-a1eb-f79b3c658832.png){: .align-center}


## Seq2seq Model
Encoder-Decoder model

![image](https://user-images.githubusercontent.com/55765292/162674426-643ccff6-78d6-4756-87b9-30b25b8ca106.png){: .align-center}


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

![image](https://user-images.githubusercontent.com/55765292/162674507-2d6411d9-cd3f-429f-b497-d77deee85d12.png){: .align-center}

---
- Unknown words

![image](https://user-images.githubusercontent.com/55765292/162674574-6163aedb-c6b7-41ae-bc3d-28eac4d97db1.png){: .align-center}

- Encoding these rare words into a vector spcae is really hard
- In fact, we don't want to encode them, we want a way of directly looking back at the input and copying them

**Aligned Inputs**
- Suppose we knew the source and target would be word-by-word translated
- Can look at the corresponding input word when translating
- Much less burden on the hidden state
- How can we archieve this without hardcoding it?

![image](https://user-images.githubusercontent.com/55765292/162674785-b45af070-9fbf-42c8-9ce8-06fd991f3495.png){: .align-center}


### Attention
- Suppose we knew the source and target would be word-by-word translated-
- Can look at the corresponding  input word when translating
- Much less burden on the hidden state
- How can we achieve this without hardcoding it?

**At each decoder state, we compute a distribution over source inputs based on current decoder state, use that in output layer**

![image](https://user-images.githubusercontent.com/55765292/162674850-b417738e-4115-4854-9b8b-8bdf872507e1.png){: .align-center}

**For each decoder state, compute weighted sum of input states**

![image](https://user-images.githubusercontent.com/55765292/162674905-f3671486-9e60-48c9-8949-9ae23c0058ff.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/162674947-fc306cc1-0b8d-4f25-9960-9eedbe3027a7.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/162674957-5e508705-cd53-4710-8832-dc110ef793b2.png){: .align-center}

- No attention: P(yi|x, y1, ..., yi-1) = softmax(Whi)
- Attention: P(yi|x, y1, ..., yi-1) = softmax(W[ci;hi])
ci = sig(aij*hj)
aij = exp(eij)/sig(exp(eij'))
eij = f(hi,hj)

![image](https://user-images.githubusercontent.com/55765292/162674992-0fc20055-453e-4d82-bebe-a5a17be96b63.png){: .align-center}

- Encoder hidden states capture contextual source word identity
- Decoder hidden states are now mostly responsible for selecting what to attend to
- Doesn't take a complex hidden state to walk monotonically through a sentence and spit out word-by-word translations


### Self-Attention
**Sentence Encoders**
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
















참고자료
- https://lilianweng.github.io/posts/2018-06-24-attention/
