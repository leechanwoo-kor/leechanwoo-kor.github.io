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
Checking if groupings of entities are instances of a relation
- Manually engineered rules
  - Rules defined over words/entities: ```"<company>located in<location>"```
  - Rules defined over parsed text: ```"((Obj<company>)(Verb located)(*)(Subj<location>))"```
- Machine Learning-based
  -  Supervised: Learn relation classifier from examples
  -  Partially-supervised: bootstrap rules/patterns from "seed" examples

#### Disease Outbreaks

![image](https://user-images.githubusercontent.com/55765292/167367802-664fdcbe-5cc5-4fbf-8aeb-0e50dbfa5107.png){: .align-center}

#### Protein Interactions

![image](https://user-images.githubusercontent.com/55765292/167367835-54c7b4fb-c6c4-4bc8-a005-804f26e70974.png){: .align-center}

#### Binary Relation Association as Binary Classification

![image](https://user-images.githubusercontent.com/55765292/167367939-defab00d-b21d-44f2-b4c3-f465449ef356.png){: .align-center}

#### Resolving Coreference

![image](https://user-images.githubusercontent.com/55765292/167367988-2ea119ca-8f78-4b1c-abc3-9be6bc4a3c8c.png){: .align-center}

#### Extracting Relation Triples

![image](https://user-images.githubusercontent.com/55765292/167368077-f5320463-171d-478a-a2d2-b754c4e08d60.png){: .align-center}

#### Why Relation Extraction?
- Create new structured knowledge bases, useful for many app
- Augment current knowledge bases
  - Adding words to WodNet thesaurus, facts to FreeBase or DBPedia
- Support question answering
  - The granddaughter of which actor starred in the movie "E.T."?
  - ```(acted-in ?x "E.T.")(is-a ?y actor)(granddaughter-of ?x ?y)```
- But which relations should we extract?

#### Automated Content Extraction (ACE)
![image](https://user-images.githubusercontent.com/55765292/167368535-1c0b443f-375e-47c3-a089-a6a24cea1017.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167368591-3df499cb-a888-4b96-a46a-8e88b9846501.png){: .align-center}

#### UMLS: Unified Medical Language System

![image](https://user-images.githubusercontent.com/55765292/167368665-acb53cce-6067-4a43-8811-7296100bc4a5.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167368681-13af7b04-bd48-4e18-b367-f1f0608060ac.png){: .align-center}

#### Databases of Wikipedia
![image](https://user-images.githubusercontent.com/55765292/167368861-3a750a37-4714-426b-a786-f192c0bb2988.png){: .align-center}

** Relation Databases that Draw From Wikipedia
- Resource Description Framework (RDF) triples
  - subject predicate object
  - Golden Gate Park location San Francisco
  - dbpedia: Golden_Gate_Park dbpedia-owl: location dbpedia:San_Francisco
- DBPedia: 1 billion RDP triples, 385 from English Wikipedia
- Frequent Freebase Relations
  - People/person/nationality
  - location/locations/contains
  - People/person/profession
  - people/person/place-of-birth
  - Biology/organism_higher_classification film/film/genre

### Ontological Relations
- IS-A (hypernym): subsumption between classes
  - Giraffe IS-A ruminant IS-A ungulate IS-A mammal IS-A vertebrate IS-A animal ...
- Instance-of: relation between individual and class
  - San Francisco instance-of city

#### How to build relation extractors
- Hand-written patterns
- Supervised machine learning
- Semi-supervised and unsupervised
  - Bootstrapping (using seeds)
  - Distant supervision
  - Unsupervised learning from the web

#### Rules for Extracting IS-A Relation
- Early intuition from Hearst (1992)
  - “Agar is a substance prepared from a mixture of red algae, such as Gelidium, for laboratory or industrial use”
- What does Gelidiummean?
- How do you know?

#### Hearst's Patterns for Extracting IS-A Relations
![image](https://user-images.githubusercontent.com/55765292/167369911-57ce1ef2-4647-41bc-8f21-d3c266309469.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/167369931-581fa753-a5fd-4db9-866c-affd8605f53a.png){: .align-center}

#### Extracting Richer Relations Using Rules
- Intuition: relations often hold between specific entities
  - Located-in (ORGANIZATION, LOCATION)
  - Founded (PERSON, ORGANIZATION)
  - Cures (DRUG, DISEASE)
- Start with Named Entity tags to help extract relations

#### NER for Extracting Relations?
- Named Entities aren’t quite enough
- Which relations hold between 2 entities?

![image](https://user-images.githubusercontent.com/55765292/167370110-eea8dcd7-b570-443d-9570-1f8e72bab828.png){: .align-center}

- Named Entities aren't quite enough
- Which relations hold between 2entities?

![image](https://user-images.githubusercontent.com/55765292/167370134-9e84c925-5e05-4800-a7d5-7e94166ceba0.png){: .align-center}

#### Extracting Richer Relations Using Rules and Named Entities
![image](https://user-images.githubusercontent.com/55765292/167370348-76871eb5-5586-4bf8-a95d-8acb9bf75f86.png){: .align-center}

#### Hand-built Patterns for Relations
- Pros
  - Human patterns tend to be high-precision
  - Can be tailored to specific domains
- Cons
  - Human patterns are often low-recall
  - A lot of work to think of all possible patterns
  - Don’t want to have to do this for every relation
  - We’d like better accuracy

#### Supervised Relation Extraction
- Choose a set of relations we’d like to extract
- Choose a set of relevant named entities
- Find and label data
  - Choose a representative corpus
  - Label the named entities in the corpus
  - Hand-label the relations between those entities
  - Break into training, development, and test
- Train a classifier on the training set

#### Classification in Supervised Relation Extraction
1. Find all pairs of named entities (usually in same sentence)
2. Decide if 2 entities are related
3. If yes, classify the relation
- Why the extra step?
  - Faster classification training by eliminating most pairs
  - Can use distinct feature-sets appropriate for each task

### Relation Extraction
![image](https://user-images.githubusercontent.com/55765292/167370867-a776a88c-11e1-4f7f-a305-83263d43cdd2.png){: .align-center}

#### Features for Relation Extraction
![image](https://user-images.githubusercontent.com/55765292/167370946-deb69332-44aa-49d6-98fe-9285683ea253.png){: .align-center}

#### Classifier for Supervised Method
- Now you can use any classifier you like
  - MaxEnt
  - Naive Bayes
  - SVM
  - Neural Network
  - BERT
- Train it on the training set, tune on the dev set, test on the test set

**Example: Neural Relation Extraction**

![image](https://user-images.githubusercontent.com/55765292/167371085-0a116733-4686-47ca-b6af-fd3ef1d3f752.png){: .align-center}

#### Supervised Relation Extraction
- Pros
  - Can get high accuracies with enough hand-labeled training data, if test similar enough to training
- Cons
  - Labeling a large training set is expensive
  - Supervised models are brittle, don’t generalize well to different genres

#### Seed-based Or Bootstrapping Approaches To Relation Extraction
- No training set? Maybe you have
  - A few seed tuples or
  - A few high-precision patterns
- Can you use those seeds to do something useful?
 - Bootstrapping: use the seeds to directly learn to populate a relation

#### Relation Bootstrapping (Hearst 1992)
- Gather a set of seed pairs that have relation R
- Iterate:
  - Find sentences with these pairs
  - Look at the context between or around the pair and generalize the context to create patterns
  - Use the patterns for grep for more pairs

#### Bootstrapping
- <Mark Twain, Elmira> Seed tuple
- Grep for the environments of the seed tuple
![image](https://user-images.githubusercontent.com/55765292/167371473-897b813d-2d44-4673-835f-6b253bb91d53.png){: .align-center}
- Use those patterns to grep for new tuples
- Iterate

#### Dipre: Extrac (author, book) pairs
![image](https://user-images.githubusercontent.com/55765292/167371582-6c8b26f0-a825-4311-8a49-5a5242c47ff0.png){: .align-center}

#### Unsupervised Relation Extraction
- Open information Extraction
  - Extract relations from the web with no training data, no list of relations

1. Use parsed data to train a “trustworthy tuple” classifier
2. Single-pass extract all relations between NPs, keep if trustworthy
3. Assessor ranks relations based on text redundancy

![image](https://user-images.githubusercontent.com/55765292/167371680-64280cd6-9655-4223-9208-2eef9a377e60.png){: .align-center}

