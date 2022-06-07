---
title: "[NLP] Topic Models"
categories:
  - NLP
tags:
  - NLP
  - Topic Models
  - Latent Dirichlet Allocation
toc: true
toc_sticky: true
toc_label: "Topic Models"
toc_icon: "sticky-note"
---

# Topic Models

## Topic Modeling

**Motivation**
Suppose you are given a messive corpora and asked to carry out the following tasks
- Organize the documents into thematic categories
- Describe the evaluation of these categories over time
- Enable a domain expert to analyze and understand the content
- Find relationships between the categories
- Understand how authorship influences the content

---

A method of (usually unsupervised) discovery of latent or hidden structure in a corpus
- Applied primarily to text corpora, but techniques are more general
- Provides a modeling toolbox
- Has prompted the exploration of a variety of new inference methods to accommodate large-scale datasets

![image](https://user-images.githubusercontent.com/55765292/172298966-809e6d7e-5a3a-4ebc-9dd0-d4835b32d0d6.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/172298997-4dbef05c-44c6-4e82-9a50-c601dc833940.png){: .align-center}


## Beta-Bernoulli Model
- A fast food chain is considering a change in the blend of coffee beans they use to make their coffee
- To determine whether their customers prefer the new blend, the company plans to select a random sample of $n=100$ coffee-drinking customers and ask them to taste coffee made with old blend, in cups markes "A" and "B"
- Half the time the new blend will be in cup A, and half the time it will be in cup B
- Management wants to know if there is a difference in preference for the two blends

### Model
- $\theta$: probability that a consumer will choose the new blend
- $X_1, \ldots, X_n$: a random sample from a Bernoulli distribution

<!-- $P(x_i\mid\theta)={\theta}^{x_i}{(1-\theta)}^{1-x_i}$
$P(x\mid\theta)={\prod}_i^n{\theta}^{x_i}{(1-\theta)}^{1-x_i}$ -->

![image](https://user-images.githubusercontent.com/55765292/172300844-5a928f8b-2b1c-4f4d-8c60-548d71f08d72.png){: .align-center}

### Prior
- Beta distribution

![image](https://user-images.githubusercontent.com/55765292/172300925-d83f5bae-22d3-49f8-987d-8a651f2a6d99.png){: .align-center}

### Posterior

![image](https://user-images.githubusercontent.com/55765292/172301249-7711c0c1-ee75-4643-b68b-691a99b2434d.png){: .align-center}

- Proprotional to the density of a Beta distribution $Beta({\alpha}',{\beta}')$
  - $\alpha'=\alpha+{\sum}_ix_i$
  - $\beta'=\beta+n-{\sum}_ix_i$

![image](https://user-images.githubusercontent.com/55765292/172304804-203674c1-5187-42ba-9b47-3ff01acd35ad.png){: .align-center}


## Dirichlet-Multinomial Model

- Beta distribution

![image](https://user-images.githubusercontent.com/55765292/172305006-e1187979-8d4a-49b0-8bc9-4fc85e95de6e.png){: .align-center}

- Dirichlet distribution

![image](https://user-images.githubusercontent.com/55765292/172305219-57e3f085-9ae9-4379-961e-ad7c9e0623f9.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/172305258-2de120df-1164-444e-87e3-1ccbbf63dc92.png){: .align-center}


## Diriclet-Multinomial Mixture Model

![image](https://user-images.githubusercontent.com/55765292/172305413-3374330e-ca77-41ca-9dd1-22d9c45a38bf.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/172305453-1ae31188-758e-449f-a17a-08524a2dd083.png){: .align-center}

### Mixture vs. Admixture

![image](https://user-images.githubusercontent.com/55765292/172305593-7b866f49-110d-40ff-9b3c-9f1fcda6c41a.png){: .align-center}













