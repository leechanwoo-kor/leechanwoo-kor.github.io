---
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

### Example: LineUp

- Designed to support exploration of tables with many attributes through interactive reordering and realigning.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7d8196bb-64b2-4f39-9c1b-886a785c5d0f)

<br>

- Order universities by 0.25 * (Research) + 0.25 * (Citations) + $\dots$
  - Multiattribute ordering
- Changing the alignment and arrangement of stacked bars:

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ae74aa15-d56d-4066-ae69-a98c7fa8d939)

<br>

### Summary: LineUp

- https://lineup.js.org/

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/808e04be-3233-4ee5-9ec6-66161b865c1c)

<br>

## Animated Transition

- When changing a view, you can provide **animated transition**.
  - A series of frames is generated to smoothly transition from one state to another.
  - vs. **jump cut** (no animation, simply redraw the view)
- https://sanddance.js.org/app/

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/84c2785d-0b93-4f1a-9497-0827f4a5891f)

<br>

- Zoom in

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/edf6e35d-5af9-495b-bbfa-cf4bd5687ef7)

<br>

- Benefits:
  - Help users maintain a sense of context
  - Animation seems cool
- Drawbacks:
  - Hard to implement
  - Hard to follow if too much change
  - Change blindness
- cf. staggered animation

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/59be4f46-04d0-405f-bfc4-b2c1b008bf17)

<br>

## Staggered Animation

- 1) Color transition + move up
- 2) Move left
 
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7550ed0b-acd3-4863-bfa4-298d43422d40)

<br>

# Select an Element

- Users need to select an element before they change it.
- Design choices:
- What can be a target?
  - a bar? a group of bars? an axis? a view? a legend?
- What are the possible selection types?
  - selected / not selected
  - selected + hovered / selected / hovered / not selected
  - {selected, hovered, faded out}!
- How many items can be in the selection at once? one? many?
- What is the default? empty? a default item? all?

## Highlight an Element

- Selected elements are **highlighted** by changing their visual appearance, providing users with immediate visual feedback.
- Design choices for highlighting
  - Changing color
  - Adding an outline
  - Using the size channel
  - Using motion coding
  - Adding shadows
 
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/23e93b15-c50e-4c3e-869a-a742d038e7be)

<br>

### Example: Context-Preserving Visual Links

- Links are drawn as curves that are carefully routed between existing elements in a vis.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2ef91bd1-86d7-4215-95c7-4c98df85d299)

<br>

# Navigate a View

- **Navigation**: changing the point of view from which things are drawn
  - Only items in the frame are visible
- Three components of navigation:
  - **Zooming**: moves the camera closer to or farther from the plane
  - **Panning**: moves the camera parallel to the plane of the image, either up and down or from side to side
  - **Rotating**: spins the camera around an axis
    - Rare in InfoVis
   
<br>

## Zooming

- **Geometric zooming**: analogous to navigation through the physical world
  - Things get bigger but not change.
- **Semantic zooming**: the representation of the object adapts to the number of pixels available in the image-space region occupied by the object
  - Things get bigger and change.
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/23658812-1fb5-4932-8d76-8075209d1be4)

<br>

## Reducing Attributes

- Given 3D data points,
- A **slice** operation leaves data points that have a specific value on a specific dimension.
  - (x, y, z) such that z = 3.0
  - Dimensionality is reduced by 1
- A cut operation leaves data points under or over a cutting plane
  - (x, y, z) such that ax + by + cz < d
- A project operation multiplies a projection matrix X (linear projection).
  - ![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/eaa0da48-3732-44bb-89ee-ebcf069fa91b)

<br>

### Example: Slice and Cut

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4bf9a52b-90d7-44e0-9138-a60bd3b6884f)

<br>

### Example: Project

- Principal Component Analysis (PCA)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/76e1a4a0-c1d0-4ea3-a5b3-7f10d4fb1cb2)

<br>

# Facet into Multiple Views

- **Facet**: split data into multiple views
- Design choices:
- Do the two views use the same visual encoding?
- Do the two views share data?
  - All/subset/none
- Do the two views share navigation?
  - If we pan one view, does the other change?
- How are the two views placed?
  - Side-by-side/superimpose

<br>

## Coordinated Views

- **Coordinated/linked views**: multiple views relevant to each other
- Do the views use the same encoding?
  - If yes, **shared encoding**
  - Otherwise, **multiform encoding**
 
<br>

- How much data is shared between the coordinated views?
  - **Shared data** if all data is shared.
  - **Overview/detail** if one view shows a subset of what is in the other.
  - **Small multiples** if the views show different partitions of the dataset into disjoint pieces.
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0f445c5c-a6eb-45aa-9ea0-f08f9777c031)

<br>

### Example: Exploratory Data Visualizer

- If multiform views are coordinated, we can inspect multiple aspects of the same data at once (with different encodings)
  - Called **linked highlighting** (very common interaction idiom in practice)
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/547c2c1c-7759-4894-ad81-26f6cc849a24)

<br>

### Summary: Exploratory Data Visualizer

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/995fdc97-db6f-4898-b9a6-f418d09af0c1)

<br>

## Overview/Detail

- In overview/detail, one of the views shows information about the entire dataset to provide an overview of everything.
- e.g., minimaps

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c869c2f3-ec99-4d0e-a9c3-4605dd07a1d4)

<br>

### Example: Bird’s-Eye Maps

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/69bd0172-5860-4c43-87ae-e6cce88af23a)

<br>

### Example: Multiform Overview/Detail

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7c3d3b0a-62af-4394-8c8a-7a1ff0e206e9)

<br>

### Summary: Multiform Overview/Detail

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/661b5b07-04d3-4d31-b3da-e87962e07e8d)

<br>

## Small Multiples

- In small multiples, views share the same encoding but show different data (different set of rows)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b7c54340-c625-4fc0-a3a1-b33acaa57962)

<br>

### Example: Cerebral

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8669e716-8819-4f53-aba4-7ffc63ac5f8b)

<br>

### Summary: Cerebral

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a12fb910-c4ea-4a53-b99c-be775d2136a6)

<br>

## Shared Navigation

- In many overview/detail approaches, navigation is synchronized between the overview and the detail view

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2c2a57d8-9c99-4715-a059-82fca6019780)

<br>

## Partition into Views

- A multiattribute dataset should be **partitioned** into meaningful groups to be visualized in multiple views.
  - = How to create multiples in small multiples?
- How to partition?
  - by a categorical attribute (e.g., grouping)
  - by a quantitative attribute (e.g., binning)
  - by similarity (e.g., clustering)
- How to align partitions?
  - List alignment, matrix alignment, and recursive subdivision
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d0183bdc-73f4-4be5-8b5e-1ebafd2c4067)

<br>

### Example: Grouped Bar Charts (List Alignment)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/17262821-91e1-4afd-955d-4e47a9638ad9)

<br>

### Example: Trellis (Matrix Alignment)

- Group by site
  - 6 levels
  - where the barley was grown
- Group by year
  - 2 levels
- Map variety to y
  - type of barley
- Map yield to x
  - the amount of yield
- Main-effect ordering in (a)
  - sort by median yield

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cae64b15-02b9-4de4-aa49-452608f54de0)

<br>

### Example: Trellis

- Color encoding for comparison

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/677a644c-c8dd-4a01-9c98-711bc3b31911)

<br>

## Example: HiVE (Recursive Subdivision)

- Visualizing one million property transaction data in London
  - House type: Flat (flats), Ter (attached terrace houses), Semi (semidetached house), and Det (fully detached house)
  - Time of sale: year/month
  - Neighborhood: 33 levels
- How would you visualize this data?

<br>

- Split by house type
- Split by neighborhood
  - Recursive subdivision
- A cell is a heatmap that shows time with years as columns and months rows.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/373bea67-22a2-45a2-9000-5ea1c4aa2636)

<br>

- Split by neighborhood first
- Split by house type
- A cell is a heatmap that shows time with years as columns and months rows.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/021117b0-b2dc-41e3-95d3-029320108071)

<br>

- Split by house type (Treemap)
- Split by neighborhood
- A cell is a heatmap that shows time with years as columns and months rows.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/126042ee-5d14-44c6-998c-52ccf5f5c3d7)

<br>

- Split by house type
- Arrange by neighborhood

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f4249d0e-48a3-4efe-bb6d-b121279fe4ec)

<br>

## Superimpose Layers

- Superimposed layers: you can place multiple views at the same location
- Design choices:
- How many layers are used?
- How are the layers visually distinguished from each other?
- Is there a small static set of layers that do not change, or are the layers constructed dynamically in response to user selection?

<br>

### Example: Static Layers

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/75bfaa96-77ab-4382-8d76-7bc37244f4a4)

<br>

### Example: Superimposed Line Charts

- Shows the scalability issue of superimposition

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c6cbc0c4-2c8e-44b5-9e46-c1cb6a5ad706)

<br>

### Example: Horizon Graph

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9842bf67-1f8a-4d5a-bf0c-75c44f7b38bc)

<br>

### Example: Dynamic Layers

- With dynamic layers, a layer with different salience than the rest of the view is constructed interactively.
- Highlight one-hop-away nodes

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/372de6d9-5cc2-4cea-9bf8-e2776914de66)

<br>

# Summary – Interacting with Views

- Changing a single view (manipulate): encoding, arrangement, order
  - Viewpoint: pan, zoom (geometric/semantic), rotate
  - Data: slice, cut, and project
- Multiple coordinated views (facet)
  - Juxtaposition (multiform, overview/detail, small multiples)
  - Partition
  - Superimpose (static/dynamic)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8de6408d-023d-4dbe-8f1d-40345d16dc88)
