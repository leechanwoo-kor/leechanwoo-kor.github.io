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

## Named Entity recognition

