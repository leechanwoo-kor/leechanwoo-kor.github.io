---
title: "[NLP] Text Classification"
categories:
  - NLP
tags:
  - NLP
  - Text Classification
toc: true
toc_sticky: true
toc_label: "Text Classification"
toc_icon: "sticky-note"
---

# Text Classification


## Artificial Intelligence

- The intelligence exhihited by machines

![image](https://user-images.githubusercontent.com/55765292/162134449-25711597-e526-4dcc-874b-24f3b26a3cf3.png){: .align-center}

- How to create computers and computer software that are capable of intelligent behavior

![image](https://user-images.githubusercontent.com/55765292/162134525-4efca15e-a46a-4606-8032-66e9fb7d1d94.png){: .align-center}


## Machine Learning

- Subfield of artificial intelligence
- Study of pattern recognition and computational learning theory
- Creating programs that can automatically learn rules from data

>"Field of study that gives computers the ability to learn without being explicitly programmed" (Arthur Samuel, 1959)

- Traditional: Write programs using hard-coded (fixed) rules

![image](https://user-images.githubusercontent.com/55765292/162135076-d94527d3-8879-444e-a4c5-d3c7ccf91327.png){: .align-center}

- Machine Learning: Learn rules by looking at some training data

![image](https://user-images.githubusercontent.com/55765292/162135225-9fda9ec9-f613-4f11-9432-6f138af5159a.png){: .align-center}

---

- Supervised Learning
  - Predictive approach
  - To learn a mapping from inputs to outputs
  - Example) classification, regression
- Unsupervised Learning
  - Descriptive approach
  - To find interesting patterns in the data
  - Example) clustering, dimensionality reduction


### Supervised Learning
- Given: Training data as labeled instances {(x^(1), y^(1)), ..., (x^(N), y^(N))}
- Goal: Learn a rule (f:x → y) to predict outputs y for new inputs x
- Example)
  - Data: ((Blue, Square, 10), yes), ...,((Red, Elipse, 20.7), yes)
  - Task: For new inputs (Blue, Crescent, 10), (Yellow, Circle, 12), are they yes/no?

![image](https://user-images.githubusercontent.com/55765292/162138508-f9bcdcea-9617-459b-b5e1-60c7d2b55d92.png){: .align-center}

- Classification: discrete-valued outputs
- Examples)
  - Data: Size and label {(Height, Weight), Cat/Dog}
  - Task: Predict whether an animal is a cat or dog given new size information
  - Method: Finding a linear or nonlinear separator

![image](https://user-images.githubusercontent.com/55765292/162138989-6f634dda-5290-4214-b675-1c7aa195fb53.png){: .align-center}


### Classification

- A mapping *h* from input data *x* to a lael *y*
  - *x* ∈ *X*, *X* is instance space (i.e. all documnets)
  - *y* ∈ *Y*, *Y* is enumerable output spae (i.e. categories)
  - *x*: a single document
  - *y*: politics

- Image ⇒ Digit

![image](https://user-images.githubusercontent.com/55765292/162140651-ab48901d-f5ef-427e-b5ea-3b1044d6e332.png){: .align-center}

- Mail ⇒ spam or not

- Text ⇒ Gender of the author

![image](https://user-images.githubusercontent.com/55765292/162140916-f51b32d0-107b-44c2-9e72-83d1c80416cc.png){: .align-center}

- Movie review ⇒ Rating

![image](https://user-images.githubusercontent.com/55765292/162140987-83f4af4b-509b-46bf-82e7-4e9352d6ffb7.png){: .align-center}

- Document ⇒ Category

![image](https://user-images.githubusercontent.com/55765292/162141081-e6f35a79-daf2-4f8b-a68e-c794f0023a2b.png){: .align-center}

**text Classification Problem**
Given a text ***w*** = (*w1, w2, ..., wr*) ∈ *V*, predict a label *y* ∈ *Y*


### Classifier
- Naive Bayes
- Perceptron
- Logistic regression
- Support Vector Machine
- Random Forests
- Deep learning models


## Natural Language Processing

![image](https://user-images.githubusercontent.com/55765292/162142209-277c2918-4ff9-4ccd-8fb0-802ac4b9d395.png){: .align-center}

- Word Representations
  - Count-based
    - created by a simple function of the counts of nearby words
    - tf-idf, PPMI
  - Class-based
    - created through hierarchical clustering
    - Brown clusters
  - Distributed prediction-based embeddings
    - created by training a classifier to distinguish nearby and far-away words
    - Word2vec, Fasttext
  - Distributed contextual embeddings from language models
    - Embeddings from language model
    - ELMo, BERT, GPT

- Documnet Representations
  - Count-based
    - Bag-of-words
  - Neural network based
    - RNN
    - Neural language model


### Bag-of-Words

![image](https://user-images.githubusercontent.com/55765292/162143129-c2b500b3-f72a-428f-919a-48b49d9e332d.png){: .align-center}

- One challenge is that the sequential representation (*w1, w2, ..., wr*) may have a different length *T* for every document
- The bag-of-words is a fixed-length representation, which consists of a vector word count:

![image](https://user-images.githubusercontent.com/55765292/162143561-63b315fb-28f5-45ab-9bd3-fc377d890293.png){: .align-center}

- The length of *x* is equal to the size of the vocabulary *V*
- For each *x*, there may be many possible *w*, depending on word order


## Neural Networks




