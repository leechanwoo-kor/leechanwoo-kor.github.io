![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b6e79212-cc80-4167-b59a-00eb33c8337f)---
title: "[Data Visualization] Interacting with Views"
categories:
  - Data Visualization
tags:
  - Interacting with Views
toc: true
toc_sticky: true
toc_label: "Interacting with Views"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/159c74c5-0bd2-45f3-939a-f150d8fe4cd8)

<br>

# Review: Validation

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/eb4ce679-9cc8-4f1a-a39d-c23f246b2764)

# Where are We?

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7210d01c-cdbe-41a8-976b-5aed1bda832f)

# The Big Picture

- Datasets are often large and complex so drawing all of them into a single static view can be overwhelming.
- What options are available to handle such complexity? There are **five**.
  - **1. Change a view over time (this lecture)**
  - 2. Derive new data (Lecture 3)
  - **3. Facet data by partitioning into multiple juxtaposed views (this lecture)**
  - 4. Reduce the amount of data (next lecture)
  - 5. Embed focus and context information within a single view (next lecture)
   
<br>

# Change View over Time

- Changing the view over time is the most obvious, popular, and flexible choice in vis design.
- Unavailable in printed visualizations
- Let users modify the view.
  - Change the encoding
  - Change the arrangement
  - Change the order
  - Change the viewpoint
  - Change which attributes are filtered
  - Change the aggregation level
  - $\dots$
 
<br>

## Changing the Encoding

- Tableau
- Encoding
- Arrangement
- Mark type/size/color
- $\dots$

<br>

## Changing the Order

- Reordering, often called sorting, is a powerful choice for finding patterns in a dataset by interactively changing the attribute that is used to order the data.
- Widely-used for table datasets
  - Order by student_id, order by score, …
- What if there are multiple attributes that can be used for sorting?

<br>

## Example: LineUp

- Designed to support exploration of tables with many attributes through interactive reordering and realigning.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7d8196bb-64b2-4f39-9c1b-886a785c5d0f)

<br>

- Order universities by 0.25 * (Research) + 0.25 * (Citations) + $\dots$
  - Multiattribute ordering
- Changing the alignment and arrangement of stacked bars:

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ae74aa15-d56d-4066-ae69-a98c7fa8d939)

<br>

## Summary: LineUp

- https://lineup.js.org/

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/808e04be-3233-4ee5-9ec6-66161b865c1c)

<br>

# Animated Transition
