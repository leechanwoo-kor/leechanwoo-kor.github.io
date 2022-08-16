---
title: "[NLP] Conversation Model"
categories:
  - NLP
tags:
  - NLP
  - Conversation Model
toc: true
toc_sticky: true
toc_label: "Conversation Model"
toc_icon: "sticky-note"
---

# Conversation Model

## Dialogue Systems

The task of generating a response for making a conversation with human

![image](https://user-images.githubusercontent.com/55765292/172513675-13aab089-8717-4580-a1fd-e4e4dcad27d0.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/172513734-27a58094-b9ba-43bf-b0de-cbf664cd2c11.png){: .align-center}

- Turing test

![image](https://user-images.githubusercontent.com/55765292/172513841-b16d1df4-4444-4a1b-bf37-c8dc7ba46bc1.png){: .align-center}

Ability to understand and generate language - intelligence
"Can machine think?"


### ELIZA
- Created 1964-1966 at MIT, heavily scripted
- DOCTOR script was most successful: repeats user's input, asks silly questions
![image](https://user-images.githubusercontent.com/55765292/172514421-cca5dc7f-c60f-49b0-8ef1-f3365a5f0923.png){: .align-center}

---

- Identify keyword, Identify context, apply transformation rule

![image](https://user-images.githubusercontent.com/55765292/172514508-401529c1-a173-4af9-951d-285ac5aa9376.png){: .align-center}

- Very little need to generate new content, but can only have one type of conversation

### Cleverbot
- Carpenter(1986), online system built in 2006
- "Nearset neighbors": Human says statement A, find a human response in human-human or human-computer chats to statement A, repeat that
- Can often give sensible answers, but the bot doesn't really impose high-level discourse structure

![image](https://user-images.githubusercontent.com/55765292/172515015-4e6b7272-166c-43dd-a0dd-886907cec744.png){: .align-center}


## Conversation Model (1)

### Data-Driven Approaches
- Can treat as a machine translation problem
  - "translate" from current utterance to next one
- Filter the data, use statistical measures to prune extracted phrases to get better performance

### Seq2seq models
Just like conventional MT, can train seq2seq models for this task
![image](https://user-images.githubusercontent.com/55765292/172515264-03fb7f44-5f2d-4053-9389-7b8fdca0c993.png){: .align-center}

### Lack of Diversity
Training to maximize likelihood gives a system that prefers common responses
![image](https://user-images.githubusercontent.com/55765292/172515360-0f0c8e78-d568-4fea-a2f3-9a491bd44975.png){: .align-center}

---

- Solution
  - Mutual information criterion
  - Response $R$ should be predictive of user utterance $U$ as well
- Standard conditional likelihood: $\log P(R \mid U)$
- Mutual information: $\log P(R \mid U)-\log P(R)$
- $\log P(R): probabilities under a language model$

![image](https://user-images.githubusercontent.com/55765292/172515818-29be64b3-2bdf-4f66-9c8f-076147cab76d.png){: .align-center}


### PersonaChat

![image](https://user-images.githubusercontent.com/55765292/172515868-dd74514d-db5c-4509-95be-bea1cb3a0186.png){: .align-center}

### Wizard of Wikipedia

![image](https://user-images.githubusercontent.com/55765292/172515913-4ce95c2a-f189-4c35-94e3-30141259db11.png){: .align-center}

### Conversation Model

![image](https://user-images.githubusercontent.com/55765292/172515965-3ad56720-d542-4c9f-bb26-6da8d3f669f0.png){: .align-center}

### Motivation

#### 1. Inconsistent personality
- Existing conversation models tend to generate inconsistent personal responses even the speaker is the same
![image](https://user-images.githubusercontent.com/55765292/172516103-50d84ba4-542f-4905-94aa-49c6205a39f8.png){: .align-center}


#### 2. Average personality of all speakers
- Existing conversation models tend to generate the same responses even the speakers are different
![image](https://user-images.githubusercontent.com/55765292/172516243-4159e1a6-108b-40df-8549-fb436e3ccbd2.png){: .align-center}

### Idea
- Use a stochastic variable for the context from speakers
  - Learns the context of conversations between two speakers
  - Infers the context of new conversation from the speakers
- Provide speaker info to response generator indirectly
  - Learns speakers' preference from own utterances
  - Infers the mixture of speakers' preference and the context

## VHUCM
- Variational Hierarchical User-based Conversation Model
![image](https://user-images.githubusercontent.com/55765292/172517443-da5870a8-ff9b-4265-bf30-78ef316c513c.png){: .align-center}

### VHUCM - Idea
- Use a stochastic variable for the context from speakers
- Provide speaker info to response generator indirectly
![image](https://user-images.githubusercontent.com/55765292/172544513-e31273d8-d85f-443d-ae01-010c1141bff0.png){: .align-center}

### Conversation Corpus
- Requirements of corpus
  - Naturally-occurring conversations
  - Many conversations between two speakers
  - Multiple conversation partners of a speaker

#### Twitter Conversation Corpus
- A Twitter conversation
  - Five or more tweets
  - At least two replies by each user
- Statistics
  - 27K users
  - 107K dyads
  - 770K conversations
  - 6M tweets
  - 7 years

![image](https://user-images.githubusercontent.com/55765292/172545071-e9992e0d-4cd9-4947-9a32-04c5fd1bdd95.png){: .align-center}

### Experiment - Personalized Response
- Experiment Setup
  - Set two users as questioner and answerer
  - Ask demographic questions

![image](https://user-images.githubusercontent.com/55765292/172545222-95f04e05-f031-426c-95b4-3dd8760222b4.png){: .align-center}

### VHUCM - Result
![image](https://user-images.githubusercontent.com/55765292/172545300-40ab1e27-bf8b-4231-b25b-655d81c45796.png){: .align-center}

### Challenges
- Experiment Setup
  - Set two users as questioner and answerer
  - Ask relationship questions
![image](https://user-images.githubusercontent.com/55765292/172545456-f0fefb2a-e7e9-49cb-a807-fc94f4d2a292.png){: .align-center}

- Top five answers of "Do you love me?" by VHUCM
![image](https://user-images.githubusercontent.com/55765292/172545559-05f3d1c6-98eb-4c02-b681-417d8d8110f4.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/172545624-10303e82-a3ec-40f4-b1ef-e8946b499cbe.png){: .align-center}

- Whoever asks, VHUCM always discloses personal information


## Meena (Google, Jan 2010)
![image](https://user-images.githubusercontent.com/55765292/172545797-70b62182-5fea-4b7a-a572-7bbc5f096759.png){: .align-center}

### Model
- Evolved Transformer seq2seq model
- 2.6B parameters
![image](https://user-images.githubusercontent.com/55765292/172545914-276cb966-3ec6-4e75-a8e6-afc8154f27f4.png){: .align-center}

### Data
- Social media conversation
- 876M context-response pairs
- 8K BPE unique subwords
- 341GB text file
- 61B BPE tokens (400B tokens for GPT-3)

### Train
- Device: 2048 TPU cores
  - 16GB memory (only 8 examples can be loaded)
- Data: 61B BPE tokens
- Time: 30 days
- Optimizer: Adafactor
  - keep the initial learning rate for the first 10K steps
  - Decay with the inverse square root of the number of steps
- Others
  - 0.1 dropout
  - Tensor2Tensor code base

### BeamSearch
![image](https://user-images.githubusercontent.com/55765292/172546490-0c76790f-9052-4880-864f-3a1dcc16bb72.png){: .align-center}

### Sample-and-Rank
![image](https://user-images.githubusercontent.com/55765292/172546516-25899df1-d9cb-4a0a-aea8-ce5ed4abe08d.png){: .align-center}


## LaMDA (Google, May 2021)
![image](https://user-images.githubusercontent.com/55765292/172546831-3dc239cc-e9dd-4734-8644-20bfb3720424.png){: .align-center}

- Model: Transformers (similar to Meena)
- Data: Conversation corpus (Web documents for GPT-3)
- Features
  - Specificity
  - Factuality
  - Interestingness (related to emotion)
  - Sensibleness (related to emotion)


## BlenderBot (Facebook, Apr 2020)
![image](https://user-images.githubusercontent.com/55765292/172547126-8084d8f4-0cc8-43a7-8981-c9fe75b78b7f.png){: .align-center}

### Model
- Generate standard seq2seq transformer model (BART)
- Retrieve candidate responses for a given dialogue
- Blend above together
![image](https://user-images.githubusercontent.com/55765292/172547186-aabfd40b-cc8a-4310-a275-a80a9595342e.png){: .align-center}
![image](https://user-images.githubusercontent.com/55765292/172547353-03d2ccaf-0c94-4bab-8719-7c4ae93fa03e.png){: .align-center}

### Data
- Pretraining
  - Reddit discussion
  - 1.5B comments
  - 88.8B BPE tokens (61B for Meena, 400B for GPT-3)
- Fine-tuning
  - ConvAI2 (140k utterances)
  - Empathetic Dialogue (50k utterances)
  - Wizard of Wikipedia (194k utterances)

### Training
- Model size: 9.4B parameters (Meena: 2.6B)
- Platform: Fairseq toolkit
- Data: 88.8B BPE tokens
- Time: 200k SGD updates (with 2400 warmup steps)
- Optimizer: Adam


## BlenderBot 2.0 (Facebook, July 2021)
![image](https://user-images.githubusercontent.com/55765292/172548014-71b844d9-afb7-4d45-a5e7-6f89114abadd.png){: .align-center}

### Model
- Memorize context of multi-turn conversation
- Augment external knowledge from internet
![image](https://user-images.githubusercontent.com/55765292/172548224-6d98194c-5a3a-48ec-945f-79daa0b4cc3a.png){: .align-center}

### Data
- Long-term Memory
  - Multi-turn conversation with summary
  - 300K utterances
- Internet-Augmented
  - Wizard-Apprentice relationship
  - 93K utterances

---

![image](https://user-images.githubusercontent.com/55765292/172548452-cc97ea44-efd1-4f09-a1f2-dec5feb8b494.png){: .align-center}


## Conversation Model (2)
![image](https://user-images.githubusercontent.com/55765292/172548654-d3a9f315-fecd-4e8b-8370-af1cfcff15e6.png){: .align-center}

### Evaluation Metrics in Machine Learning
- Classification - Class
  - Accuracy
  - Precision, Recall, F1
  - Area Under Curve
  - $\ldots$
- Regression - Number
  - Mean Squared Error
  - $R^2$
  - Explained Variance
  - $\ldots$
![image](https://user-images.githubusercontent.com/55765292/172549283-7bb81dc9-93f1-49c2-8bed-5ec6c970989b.png){: .align-center}

- Clustering - Cluster
  - Purity
  - Davies-Bouldin Index
  - Jaccard Index
  - $\ldots$
- Reinforcement Learning - Policy
  - Total rewards
  - Dispersion of Fixed Policy
  - Conditional Value at Risk
  - $\ldots$
![image](https://user-images.githubusercontent.com/55765292/172549788-5e7522cd-d151-4439-97c9-2585d5db622d.png){: .align-center}
![image](https://user-images.githubusercontent.com/55765292/172549811-3686164d-13b7-4f36-8b21-6950b0a1d0ad.png){: .align-center}

### Natural Language Generation
- Generate natural language **text**
  - Machine transaltion
  - Automatic summarization
  - Conversation model
  - Image captioning
  - $\ldots$
![image](https://user-images.githubusercontent.com/55765292/172549999-93759ac4-efe6-4c2c-a47f-387589522d3a.png){: .align-center}

### Evaluation Metrics in Natural Language Generation
- Task-based evaluation
  - Ask human to rate the usefulness of the generated text for a specific task
- Human evaluation
  - Ask human to rate the quality of the generated text
- Automatic evaluation
  - Measure the correspondence between the generated text and ground truth text
    - BLEU, ROUGE, METEOR, $\ldots$
    - Averaged word embedding, $\ldots$
    - BERTScore, BLEURT, $\ldots$
    - $\ldots$

#### BLEU
![image](https://user-images.githubusercontent.com/55765292/172550982-a6e5b8c6-98fe-4c10-90a6-8ad469fb68be.png){: .align-center}

#### BERTScore
![image](https://user-images.githubusercontent.com/55765292/172551083-fe62d81a-72df-4a57-b04e-668cca767682.png){: .align-center}


## Conversation Model (3)
![image](https://user-images.githubusercontent.com/55765292/172551284-f77eb951-5d83-469f-9855-e1a012096cae.png){: .align-center}

### Motivation

1. Responses of a conversation can be various
![image](https://user-images.githubusercontent.com/55765292/172563562-9fa70237-46ba-4b38-8ea8-13f3e579afeb.png){: .align-center}

2. Existing metrics (i.e. BLEU) cannot measure the diversity
![image](https://user-images.githubusercontent.com/55765292/172563704-680529c5-1839-4fcb-84a6-d602cf83b913.png){: .align-center}

3. Existing metrics that consider the given conversation
  - High scores to non-appropriate responses
  - Need human labeled score for responses to train the model
![image](https://user-images.githubusercontent.com/55765292/172564003-394ece9d-ff8f-49a0-ab8b-3c495a681144.png){: .align-center}

4. Human evaluation is resources-consuming
  - Requires money and evaluation time
  - Low scalability
![image](https://user-images.githubusercontent.com/55765292/172564204-1a51f103-0dc6-4c5f-a014-2a20f02697c1.png){: .align-center}


## SSREM (Speaker Sensitive Response Evaluation Model)
![image](https://user-images.githubusercontent.com/55765292/172564426-710757cd-782c-4924-a8e3-d045d4576860.png){: .align-center}

### SSREM - Train
![image](https://user-images.githubusercontent.com/55765292/172564837-f9afd9f9-5e3f-4aa1-9e66-ecfad7921d6b.png){: .align-center}
![image](https://user-images.githubusercontent.com/55765292/172565016-5d6f3b9c-013d-4242-adf8-12a28a5b6ff6.png){: .align-center}
![image](https://user-images.githubusercontent.com/55765292/172565087-66e39bf6-3141-40db-85cb-e16c479a9c4a.png){: .align-center}

- Same Conversation ($SC_A$): Speaker $A$'s utterances in a conversation
- Same Partner ($SP_A$): $A$'s utterances in conversations with the same partner
- Same Speaker ($SS_A$): $A$'s utterances
- Random ($Rand_A$): Random utterances from speakers who are not $A$

![image](https://user-images.githubusercontent.com/55765292/172565591-1c4072db-129b-43eb-97ee-08eb162658b0.png){: .align-center}
![image](https://user-images.githubusercontent.com/55765292/172565695-f01425e5-30f3-47d5-963e-b60e1ea5b251.png){: .align-center}

- Korean SAT English subject problem
![image](https://user-images.githubusercontent.com/55765292/172565909-026e4d01-76a3-4c03-aead-3c4b2c1b8a16.png){: .align-center}
![image](https://user-images.githubusercontent.com/55765292/172565953-d4e0a6fd-2a77-4511-b350-557cb20a4732.png){: .align-center}

### Experiment 1
- Goal: Correlation with human scores
- Human scores
  - Annotate the appropriateness of 1,200 responses
  - Use Amazon MTurk
- Comparison metrics
  - BLEU [Papineni et al., ACL 2002]
  - ROUGE-L [Lin, TSBO 2004]
  - EMB [Liu et al., EMNLP 2016]
  - RUBER [Tao etal., AAAI 2018]
  - RSREM ($R_{cand}$={$r_A$,$rand_A^{(1)}$,$rand_A^{(2)}$,$rand_A^{(3)}$,$rand_A^{(4)}$})

### Experiment 1 - Result
- Correlation with human scores
![image](https://user-images.githubusercontent.com/55765292/172568437-75d94020-612f-4505-a0cd-5d07953696c7.png){: .align-center}

### Experiment 2
- Goal: Identifying true/false responses
- Responses
  - True
    - Ground truth (GT)
  - False
    - Same conversation (SC)
    - Same Partner (SP)
    - Same Speaker (SS)
    - Random (Rand)
- Comparison metrics
  - RUBER [Tao etal., AAAI 2018]
  - RSREM ($R_{cand}$={$r_A$,$rand_A^{(1)}$,$rand_A^{(2)}$,$rand_A^{(3)}$,$rand_A^{(4)}$})

### Experiment 2 - Result
![image](https://user-images.githubusercontent.com/55765292/172568917-77bee7c2-4de8-4192-8791-51ade6581347.png){: .align-center}

### Experiment 3
- Goal: applicability of SSREM
- Data
  - Train: Twitter conversation corpus
  - Test: Movie script
- Method
  - Correlation with human scores
  - Identifying true/false responses
![image](https://user-images.githubusercontent.com/55765292/172569338-b39ed96f-3388-4ff0-8d74-c7e50f52b980.png){: .align-center}

### Experiment 3 - Result
- Correlation with human scores
![image](https://user-images.githubusercontent.com/55765292/172569429-3edb3318-ef9c-4765-8611-eff3b6d082dc.png){: .align-center}
![image](https://user-images.githubusercontent.com/55765292/172569488-0c91e350-8632-4e7e-b516-0cda221524e9.png){: .align-center}

### Challenges
- More robust on adversarial attacks
  - How can we overcom various adversarial attacks?
    - Copying a utterance in the context
![image](https://user-images.githubusercontent.com/55765292/172569697-73158fce-da2e-4797-9dd8-ed5317b2cdd6.png){: .align-center}

### Perplexity
![image](https://user-images.githubusercontent.com/55765292/172569769-c2bd787e-b4f4-4872-a218-490d38b4e209.png){: .align-center}

### ACUTE-Eval
![image](https://user-images.githubusercontent.com/55765292/172569875-e1af7e84-2282-490a-a81c-a4823adf2206.png){: .align-center}
