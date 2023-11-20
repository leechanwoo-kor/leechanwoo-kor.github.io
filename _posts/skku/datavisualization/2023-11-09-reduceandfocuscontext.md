---
title: "[Data Visualization] Reduce and Focus+Context"
categories:
  - Data Visualization
tags:
  - Reduce and Focus
  - Context
toc: true
toc_sticky: true
toc_label: "Reduce and Focus+Context"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/159c74c5-0bd2-45f3-939a-f150d8fe4cd8)

<br>

# Summary: Interacting with Views

- Changing a single view: encoding, arrangement, order
  - Viewpoint: pan, zoom (geometric/semantic), rotate
  - Data: slice, cut, and project
- Multiple coordinated (or faceted) views
  - Juxtaposition (multiform, overview/detail, small multiples)
  - Partition
  - Superimpose (static/dynamic)

# The Big Picture

- Datasets are often large and complex so drawing all of them into a single static view can be overwhelming.
- What options are available to handle such complexity? There are five.
  - 1. Change a view over time (previous lecture)
  - 2. Derive new data (Lecture 3)
  - 3. Facet data by partitioning into multiple juxtaposed views (previous lecture)
  - 4. **Reduce the amount of data (this lecture)**
  - 5. **Embed focus and context information within a single view (this lecture)**

<br>

# Why Reduce?

- **Reducing the amount of data** shown in a view is an obvious way to reduce its visual complexity.
- **Filtering** simply eliminates elements (i.e., an item or an attribute).
  - Easy to understand
  - Out of sight, out of mind
- **Aggregation** creates a new element that stands for multiple others that it replaces.
  - Safer but cannot convey all omitted information
