---
title: "[NLP] Information Extraction"
categories:
  - NLP
tags:
  - NLP
  - Information Extraction
toc: true
toc_sticky: true
toc_label: "Information Extraction"
toc_icon: "sticky-note"
---

# Information Extraction

## Information Extraction

### The task of extracting structured information from unstructured documents

![image](https://user-images.githubusercontent.com/55765292/167343109-3ba058c4-5a84-412d-977b-17ee24f923a4.png){: .align-center}

### Information extraction (IE) systems
- Find and understand limited relevant parts of texts
- Gather information from many pieces of text
- Produce a structured representation of relevant information:
  - Relations (in the database sense), a.k.a.,
  - A knowledge base

### Goals of Information extraction (IE) systems
- Organize information so that it is useful to people
- Put information in a semantically precise form that allow further inferences to be made by computer algorithms

---

### Example of IE

Classified Advertisements (Real Estate)
- Plain text advertisements
- Lowest common denominator: only thing that 70+ newspapers using many different publishing systems can all handle

![image](https://user-images.githubusercontent.com/55765292/167343758-f79b98e6-abf5-4e40-a2eb-b4cb7bd152fd.png){: .align-center}

Why doesn't text search (IR) work?

What you search for in real estate advertisements:
- Town/suburb. You might think easy, but:
  - Real estate agents: Coldwell Banker, Mosman
  - Phrases: Only 45 minutes from Parramatta
  - Multiple property ads have different suburbs in one ad
- Money: want a range not textual match
  - Multiple amounts: was $155K, now $145K
  - Variations: offers in the high 700s [but not rents for $270]
- Bedrooms: similar issues: br, bdr, beds, B/R 8

## Named Entity Recognition (NER)

### Named Entity Recognition
- Example

![image](https://user-images.githubusercontent.com/55765292/167352581-339a8104-2347-4216-b7dc-9eb332f6b01d.png){: .align-center}

- **Find** entities in text

![image](https://user-images.githubusercontent.com/55765292/167352620-af1eeef5-88a1-4f27-ab1e-6529593db8e1.png){: .align-center}

- **Classify** entities in text

![image](https://user-images.githubusercontent.com/55765292/167352676-0add5222-6e20-400a-953c-e3a18278050b.png){: .align-center}

**Task: Predict entities in a text**

![image](https://user-images.githubusercontent.com/55765292/167352805-2a0374d3-a985-4bd5-b5cf-340a9c9a3db0.png){: .align-center}

### Standard Methods for NER
- Hand-written regular expressions
  - Perhaps stacked
- Using classifiers
  - Generative: Naive Bayes
  - Discriminative: Maxent models
- Sequence models
  - HMMs
  - CMMs/MEMMs
  - CRFs

### Hand-written regular expressions

#### Hand-written Patterns for Information
- If extracting from automatically generated web pages, simple regex patterns usually work
  - Amazon page
  - ```<div class="buying"><h1 class="parseasintitile"><span id="btAsinTitle" style="">(.*?)</span><h1>```
- For certain restricted, common types of entities in unstructured text, simple regex patterns also usually work
  - Finding (US) phone numbers
  - (?:\(?[0-9]{3}\)?[ -.])?[0-9]{3}[ -.]?[0-9]{4}

#### Natural Language Processing-based Hand-Written Information Extraction
- For unstructured human-written text, some NLP may help
  - Part-of-speech (POS) tagging
    - Mark each word as a noun, verb, preposition, etc.
  - Syntatic parsing
    - Identify phrases: NP, VP, PP
  - Semantic word categories (e.g. from WordNet)
    - KILL: kill, murder, assassinate, strangle, suffocate

#### Rule-based Extraction Examples
- Determining which person holds what office in what organization
  - [person], [office], of [org]
    - Vuk Draskovic, leader of the Serbian Renewal Movement
  - [org] (named, appointed, etc.) [person] Prep [office]
    - NATO appointed Wesley Clark as Commander in Chief
- Determining where an organization is located
  - [org] in [loc]
    - NATO headquarters in Brussels
  - [org][loc] (division, branch, headquarters, etc.)
    - KFOR Kosovo headquarters

### Using classifiers

#### Information Extraction as Text Classification
- Use conventional classification algorithms to classify substrings of document as "to be extracted" or not.
- In some simple but compelling domains, this naive technique is remarkably effective.
  - But do think about when it would and wouldn't work!

![image](https://user-images.githubusercontent.com/55765292/167355385-6d7687b3-0ade-4784-858a-42b48eb01ae4.png){: .align-center}

---

**"Change of Address" Email**

![image](https://user-images.githubusercontent.com/55765292/167355497-b075457a-10ca-4fde-a445-76d49159425d.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167355523-3ae0f97b-e6c5-442e-8970-3d63708997ec.png){: .align-center}

#### Change-of-Address Detection Results
- Corpus of 36 CoA emails and 5720 non-CoA emails
  - Results from 2-fold cross validations (train on half, test on other half)
  - Very skewed distribution intended to be realistic
  - Note very limited training data: only 18 training CoA messages per fold
  - 36 CoA messages have 86 email addresses; old, new, and miscellaneous

![image](https://user-images.githubusercontent.com/55765292/167355935-566056c1-a36a-4bda-bb0b-99ad17f1a853.png){: .align-center}

### Sequence models

#### The ML Sequence Model Approachto NER
- Training
1. Collect a set of representative training documents
2. Label each token for its entity class or other (O)
3. Design feature extractors appropriate to the text and classes
4. Train a sequence classifier to predic the labels from the data

- Testing
1. Receive a set of testing documents
2. Run sequence model inference to label each token
3. Appropriately output the recognized entities

#### Encoding Classes for Sequence Labeling

![image](https://user-images.githubusercontent.com/55765292/167356279-8d451a7a-64ef-42a0-b239-d6eff6c47e80.png){: .align-center}

#### Features for Sequence Labeling
- Word
  - Current word (essentially like a learned dictionary)
  - Previous/next word (context)
- Other kinds of inferred linguistic classification
  - Part-of-speech tags
  - Previous (and perhaps next) label

#### Inference in Systems
![image](https://user-images.githubusercontent.com/55765292/167356945-110258e1-1597-45ae-97a9-0369d7d7f072.png){: .align-center}

### Inference Methods
![image](https://user-images.githubusercontent.com/55765292/167357003-cbeef2ce-a361-4844-a188-8e1844e934a6.png){: .align-center}

#### Greedy inference
- We just start at the left, and use our classifier at each position to assign a label
- The classifier can depend on previous labeling decisions as well as observed data

- Advantages
  - Fast, no extra memory requirements
  - Very easy to implement
  - With rich features including observations to the right, it may perform quite well
- Disadvantage
  - Greedy. We make commit errors we cannot recover from

#### Beam inference
- At each position keep the top *k* complete sequences.
- Extend each sequence in each local way.
- The extensions compete for the *k* slots at the next position

- Advantages
  - Fast; beam sizes of 3-5 are almost as good as exact inference in many cases
  - Easy to implement (no dynamic programming required)
- Disadvantage
  - Ineact: the globally best sequence can fall off the beam

#### Viterbi inference
- Dynamic programming or memorization
- Requires small window of state influence (e.g., past two states are relevant)

- Advantages
  - Exact: the global best sequence is returned
- Disadvantage
  - Harder to implement long-distance state-state interactions (but beam inference tends not to allow long-distance resurrection of sequences anyway)

#### Neural Approaches for NER

![image](https://user-images.githubusercontent.com/55765292/167358264-9599ffce-349c-4e5b-8ece-80a1fa05233f.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167358286-8dc1c641-e2ca-455d-92ee-3a2c8ea8e19c.png){: .align-center}

## Relation Extraction

### Relation Extraction
