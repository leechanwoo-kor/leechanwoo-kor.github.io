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

<br>

# Filter

- **Filtering** reduces the number of elements shown: some elements are simply eliminated.
- **Dynamic queries**: tight coupling between visual encoding and interaction
  - The user can immediately see the results of the intervention
  - A display for showing a visual encoding of the dataset + filter controls
- Filter items
- Filter attributes

<br>

## Dynamic Queries

- Widgets:
  - Sliders
  - Buttons
  - Comboboxes
  - Text fields
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3bfdaad7-7d25-43cb-9c60-155da71b993b)

<br>

### Example: FlimFinder

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/49e20ed7-c6a3-4242-b422-48836ea9131c)

<br>

### Scented Widgets

- Standard widgets for filtering controls can be augmented by concisely visually encoding information about the dataset.
- Scented widgets
- High information density

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c82b84d3-04c9-446d-b11d-68fcf81e4d62)

<br>

### Example: DOSFA

- Dimensional Ordering, Spacing, and Filtering Approach
- 215 attributes representing word counts
- Dimensions are ordered by similarity and filtered by similarity and importance thresholds

<br>

## Aggregation

- In aggregation, a group of elements is represented by a new derived element that stands in for the entire group.
  - Many-to-one visual paradigm
- With derived attributes: average, min, max, count, and sum
- Users should be able to change the level of aggregation interactively.

<br>

### Example: Histograms

- How many bins?
- What is the range of each bin? (nice numbers)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3a0dccaf-9ae4-4ac0-8939-5f538314b4a0)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/28654337-a4c9-4768-84c1-d9fe0baf0156)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8523e59c-b937-447f-9222-1b03ad9f5209)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3f98c64d-c340-4193-a4ca-9ee911386d01)

<br>

### Example: Continuous Scatterplots

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b133c49e-0806-4a1a-8ed7-8698b2381674)

<br>

### Examples: Boxplots and Vase Plots

- Visualization for an aggregate statistical summary of values
- Median (50% point), lower and upper quartiles (25% and 75%), and upper and lower fences (upper + 1.5 IQR and lower – 1.5 IQR where IQR = val(75%) – val(25%))
- (n) normal, (s) skewed, (k) peaked, (mm) multimodal

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2370f792-e4ef-48af-90ca-f36d9ff19325)

<br>

### Examples: Hierarchical Parallel Coordinates

- Parallel coordinates for clusters
- 230,000 items and 8 attributes

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/12f9a604-a7d3-43be-a311-a7eb3daf1262)

<br>

### Example: Multiclass Density Maps

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dd6b0527-3acd-400d-ac7c-f4a2cb1c758f)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/10f30655-7103-4c57-85c4-a5f4772228b8)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/202e25c8-ff8e-4942-8cf2-ea72f9314aa6)

<br>

### Example: Dimensionality Reduction

- **Dimensionality reduction** is the transformation of data from a highdimensional space into a low-dimensional space so that the lowdimensional representation retains some meaningful properties of the original data.
- e.g., if two points are closer to each other in the original high-dimensional space, let’s project them to similar locations in 2D.

<br>

- Principal Component Analysis (PCA)
- Multidimensional Scaling
- Autoencoder
- LargeVis
- **t-Stochastic Neighbor Embedding (t-SNE)**
- **Uniform Manifold Approximation and Projection (UMAP)**
- $\dots$

<br>

- t-SNE on the MNIST dataset

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fb51528e-1b14-4ba6-bdec-60c48b5ce731)

<br>

#### t-Stochastic Neighbor Embedding

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/201c51a2-6cd5-4a52-9c83-416f20626c18)

<br>

# Embed: Focus+Context

- **Focus**: detailed information about a selected set
- **Context**: overview information about more of the data
- Three design choices: elide (생략하다), superimpose, distort

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f053f209-98fa-4c45-9906-c0135fdd611d)

<br>

## Why Embed?

- The limitation of geometric zooming: when zoomed in, only a small part of world space is visible.
- Focus+Context idioms attempt to support orientation by providing contextual information intended to act as recognizable landmarks.
- Overview+Detail: spatial separation
- Zoom: temporal separation
- Focus+Context: seamless focus in context
  - From “A Review of Overview+Detail, Zooming, and Focus+Context Interfaces”

<br>

- Overview+Detail

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bb6605a7-ac73-4bfe-87d0-2bcf98b9ce6c)

<br>

- Focus+Context

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cd324d73-c03d-41eb-ad52-8310c17f33f3)

<br>

## Elide

- **Elision**: some items are omitted from the view completely, in a form of dynamic filtering. **Other items are summarized using dynamic aggregation, and only the focus items are shown in detail.**
  - Different from filtering. If you filter out items or attributes, they are completely gone.

<br>

### Example: DOITrees Revisited

- Multiple foci to show an elided version of a 600,000 node tree.
- Triangles: aggregate representation showing the size of sub tress.
- The focus nodes can be chosen by clicking and searching

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a6ad5801-c061-4797-a335-8acf97616f98)

<br>

## Superimpose

- **Superimposition**: the focus layer is limited to a local region on a global layer that stretches across the entire view.
  - i.e., the lens metaphor
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a806a98c-75fc-4a16-ba53-be1b572738c9)

<br>

### Example: TopicLens

- Global layer: DR result of documents (vis papers)
- Local layer: fine-grained DR result of focused documents

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f4e83610-41b7-4213-b730-9b63c07b2c11)

<br>

## Distort

- Many focus+context idioms integrate focus and context into a single view using **geometric distortion** of the contextual regions to make room for the details in the focus regions.
- Is there only a single region of focus, or does the idiom allow multiple foci?
- Is the shape of the focus a radial, rectangular, or a completely arbitrary shape?
- Is the extent of the focus global across the entire image, or constrained to just a local region?

<br>

### Example: Fisheye Lens

- The fisheye lens distortion idiom uses a single focus with local extent and radial shape and the interaction metaphor of a draggable lens on top of the main view.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b14a6368-e2a1-4765-b2ab-935e2a962c0e)

<br>

### Costs and Benefits: Distortion

- Benefits: combine focus and context information in a single view
- Costs:
- Length judgements are severely impaired (this is why geometric distortion is widely-used for node-link diagrams)
- Not familiar (the user can misunderstand the underlying structure)
- Less object constancy (need to mentally track changing objects)

<br>

## Design Variants

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3be17221-8e75-41e1-aa9a-7ccda7d4ca80)

<br>

# Summary: Reduce and Focus+Context

- **Reduce**: reduce the number of items or attributes to be visualized.
  - Filter: simply eliminate items.
  - Aggregation: draw an element that represents a group of items.
- **Embed**: show the focused items but with contextual information
  - Elide: the context information is summarized.
  - Superimpose: the context information is shown as a background.
  - Distortion: the context information is geometrically distorted.
- Focus+Context vs Filtering vs Overview+Detail

<br>

# Summary: Interaction

- In short, we cannot show all the details about the data a single view.
- Therefore, visualization systems should be interactive.

1. Allow the user to change the view interactively (**Manipulate**)
2. Derive new data
3. Partitioning into multiple juxtaposed views (**Facet**)
4. Reduce the amount of data shown (**Reduce**)
5. Show the focused data with context information (**Embed**)

<br>

# What is the Trend?

- Most recent InfoVis system papers incorporate at least one **derivation** technique to summarize the entire data.
  - Clustering, dimensionality reduction, attribution score, data quality, $\dots$
- **Manipulate** is a must.
- **Reduce** (filter and aggregation) is a must.
- **Facet** is frequently used.
- In contrast, **Embed** is used less frequently.
  - Overview+Detail seems more popular than Focus+Context
