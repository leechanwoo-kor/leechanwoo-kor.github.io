![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/80fbe8f4-49bb-4413-918b-6f21c451b5fc)---
title: "[Data Visualization] Arrange Table"
categories:
  - Data Visualization
tags:
  - Arrange Table
toc: true
toc_sticky: true
toc_label: "Arrange Table"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/159c74c5-0bd2-45f3-939a-f150d8fe4cd8)

<br>

# Other Visual Channels

- Size (magnitude)
  - Length
  - Area
  - Volume
- Angle (magnitude)
- Curvature (magnitude)
- Shape (identity)
- Motion (both)
- Texture (both)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/aa4bbdc7-558a-4214-b73d-526380daa186)

<br>

## Size Channel

- Length
  - 1-dimensional size
  - width: horizontal size
  - height: vertical size
  - Extremely accurate
- Area
  - Significantly less accurate than length
  - Width and height have some interference
- Volume
  - Inaccurate

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/175f1652-38df-4ead-8ff3-ceee3539810e)

<br>

### Size Channel Example

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7d0bd797-7faf-4dbf-92ea-503038b554d1)

<br>

## Orientation Channel

- **Orientation channels** encode magnitude information based on the orientation of a mark.
- Tilt: absolute orientation
- Angle: relative orientation
- We have very accurate perceptions of angles near the exact horizontal, vertical, or diagonal positions.
- Easy to distinguish 89° from 90°, but not 37° from 38°

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0a013b09-b3cc-40ef-9acf-45af4c4236f1)

<br>

### Orientation Channel Example

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a8c93284-dbd9-4ea9-9f6c-dc9034e6b2e8)

<br>

## Curvature and Shape Channels

- Curvature (magnitude)
  - Not very accurate
  - \# of distinguishable bins is low (2 ~ 3)
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0422c3a5-77ad-499a-a30c-22fb377ab39b)

<br>

- Shape (identity)
  - In a broad sense, the shape channel refers to a complex perceptual phenomenon, including closure, curvature, termination, and intersection.
  - Dotted lines, dashed lines, …
  - Narrowly, it refers to the symbol for a point.
  - Closely related to size

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/36ce9226-e8c2-4677-afa2-3b7a5e5e3135)

<br>

## Motion Channel

- Motion: direction, velocity, frequency, …
  - Oscillation frequently used
  - Less studied
  - Extremely salient
- Strength AND weakness: motion strongly draws attention
  - Impossible to ignore
  - e.g., flickering and blinking
- Usually used for highlighting
  - Notification, updates, …
 
<br>

## Texture Channel

- **Texture** refers to very small scale patterns.
  - Orientation + scale + contrast
  - Used both for magnitude and identity
  - Frequently used in cartography
- For identity: 10 ~ 20 distinguishable bins
- For magnitude: 3 ~ 4 distinguishable bins
  - With all three channels together, it can scale up to a dozen.
  - Very careful design is needed!
 
<br>

# Why Arrange?

- We will learn design choices for how to arrange tabular data spatially.
- **Arrange** means the use of spatial channels for visual encoding.
- Spatial position is the most effective visual channel for all attribute types: nominal, ordinal, and quantitative.
- In short, how to use the position channel?

<br>

- **Key**: an independent attribute that can be used as a unique index to look up items in a table
  - e.g., student id
  - Usually categorical (C) or ordinal (O)
- **Value**: a dependent variable
  - e.g., name
  - C, O, or quantitative (Q).
- **Level**: # of unique values for a categorical or ordinal attribute
  - i.e., cardinality
  - The level (or cardinality) of the grade attribute is 9 (A+ ~ F).
 
<br>

## Quantitative Values

- **Scatterplots** (산점도) encode two Q variables using both the vertical and horizontal spatial position channels.
  - Input: two Q variables (two values)
  - Mark: point
  - Channels: 𝑄1 ⇒ 𝑥 and 𝑄2 ⇒ 𝑦
- Effective for
  - providing overviews
  - characterizing distributions
  - finding outliers and extreme values
  - judging correlation

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9ec8cf6f-33a8-4edb-b2ca-abb0d4b01c09)

<br>

### Scatterplots

- Additional transformations can be used with scatterplots.
  - e.g., log transformation on the y axis
- Can be augmented with color encoding or size encoding.
  - Size encoded scatterplots are called bubble plots.
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dfbe53e7-035f-428d-89ea-8d70955e87b8)

<br>

- Scalability is the major limitation of scatterplots.
  - When # of items increases, scatterplots easily become over-crowded (visual clutter).
  - The opacity of points is usually adjusted.
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/290a6aa3-f1f1-4fcc-963f-abca80778aad)

<br>

## Categorical Keys

- If there are categorical variables to visualize, we will draw items with the same categorical values in the same region.
  - Similar to a group by operation
- List alignment (one key): bar charts, stacked bar charts, streamgraph, dot and line charts
- Matrix alignment (two keys): cluster heatmap, and scatterplot matrix
- Volumetric grid (three keys), recursive subdivision (multiple keys): not covered today

<br>

### Bar Charts

- **Bar charts**(막대그래프) encode one Q variable and one C or O variable using both the vertical and horizontal spatial position channels.
  - Input: one key (C or O) and one value (Q)
  - Mark: line
  - Channels: 𝑘 𝑒𝑦 𝑥 and 𝑣𝑎𝑙𝑢𝑒 𝑦 ( or 𝑘𝑒𝑦 𝑦 and 𝑣𝑎𝑙𝑢𝑒 𝑥 (horizontal)
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/353f2842-3713-4379-8784-87d46582320f)

<br>

- Effective for value lookup and comparison
- Scalability
  - Enough room on the screen is required to have white space between bar line marks.
  - e.g., 1920 px => dozens to hundreds of bars
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d5cd2c67-7351-47a3-bc81-22e971183fe4)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3c542250-894d-4d49-a5a1-af77a436cb4c)

<br>

### Stacked Bar Charts

- **Stacked bar charts** (누적그래프) encode one Q variable and two C or O variables using both the vertical and horizontal spatial position channels.
  - Input: two keys (C or O) and one value (Q)
  - Mark: line
  - Channels: 𝑘𝑒 𝑦 1 𝑥 𝑘𝑒 𝑦 2 𝑐𝑜𝑙𝑜𝑟 , and 𝑣𝑎𝑙𝑢𝑒 𝑙𝑒𝑛𝑔𝑡ℎ
- Without color or explicit outlines, 𝑘𝑒 𝑦 2 is indistinguishable.

<br>

- The heights of the lowest bar component and the full combined bar are both easy to compare.
  - i.e., position on a common scale
- Bars in the stack (except the lowest) are more difficult to compare since they are not aligned.
  - i.e., length
- Scalability
  - 𝑘𝑒𝑦 1 : similar to standard bar charts (~ dozens or 𝑘𝑒𝑦 2 : needs hue encoding (~dozen)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/91bc819d-7a09-499d-a661-5e76f2141314)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/75987e15-b84f-431f-91cf-707d404d409f)

<br>

### Streamgraph

- **A streamgraph** is a generalized stacked bar chart to a continuous x domain.
  - Stacked bars => stacked layers
- The shape of the layout is optimized for multiple factors.
  - e.g., the external silhouette of the shape, deviation of each layer from the baseline, and the amount of wiggle in the baseline
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/219f9b74-69fb-4f6a-9f27-472dd4b91179)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7211f9a9-8e3d-4d42-b786-1de710eb2511)

<br>

### Dot Charts

- **Dot charts** encode one Q variable and one C or O variable using vertical and horizontal spatial channels.
  - Similar to bar charts, but with point marks

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6740a471-7b6f-4288-8430-bef83b7ce185)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cf6a2de5-a147-4f90-b861-47cd5e46dc3e)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c735473e-913c-4a7e-984c-7438f1407b74)

<br>

### Line Charts

- **Line charts** encode one Q variable and one C or O variable using vertical and horizontal spatial channels with connection marks.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5c83c77f-978f-4d51-ad60-8667e57311cf)

<br>

- Line charts should be used for ordered keys but not categorical keys.
  - Can give a falsely illusion about ordering (expressiveness principle)
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4223e020-f080-453b-a9c1-c65aeb2141a6)

<br>

- Be careful when interpolating lines (false maximum).

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e643e6d6-fcad-4be5-b53c-94474652a5dc)

<br>

## List Alignment Summary

- List alignment (one key): bar charts, stacked bar charts, streamgraph, dot and line charts
  - All the idioms in this category placed one C or O variable to an axis (e.g.,x ) and one Q variable to the other axis (e.g., y).
- What if two keys need to be visualized?
- Matrix alignment (two keys): cluster heatmap, and scatterplot matrix
  - One key to an axis (e.g.,x ) and the other key to the other axis (e.g., y)
 
<br>

### Heatmaps

- **Heatmaps** encode two C or O variables and one Q variable.
  - Input: two keys (C or O) and one value (Q)
  - Mark: area
  - Channels:𝑘𝑒 𝑦 1 𝑥 𝑘𝑒 𝑦 2 𝑦 , and 𝑣𝑎𝑙𝑢𝑒 𝑐𝑜𝑙𝑜𝑟

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b25a3769-e2f9-4c30-a7fd-5c897c6e6b0b)

<br>

- Small area marks in heatmaps are very compact.
  - providing overviews
  - high information density
- Theoretically, one pixel can be a mark.
  - 1,000 px * 1,000 px => 1 million data items
- However, only a small number of levels of the Q variable is distinguishable
  - 3 ~ 11 bins
  - color perception in small noncontiguous regions.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a4f8c149-c918-4b5f-9c35-7e733cd9988c)

<br>

### Cluster Heatmap

- Cluster heatmaps additionally visualize the similarity between rows and columns.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dde1a3fe-2b6c-40c7-a32f-6e02781b2851)

<br>

### Hierarchical Clustering

- Hierarchical clustering (HC) builds a hierarchy between item similarities.
  - 1. Find the most similar pair from
  - 2. Remove the two items in the pair from D and add their average to D
  - 3. Repeat 1 and 2 until only one item remains in D 
- How to average?
- How to measure the distance between items or clusters?

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a8fbd57a-c5dc-4a27-a932-b4e2d6cc5d7c)

<br>

### Scatterplot Matrix

- **A scatterplot matrix (SPLOM)** shows all possible pairwise combinations of attributes as scatterplots in a grid.
- Useful when you don’t have knowledge about which attribute to see.
  - You can see all bivariate distributions in data
 
<br>

- To be discernable, each scatterplot should have 100 x 100 pixels at least.
  - About one dozen attributes are supported.
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8df305bd-0c61-4edf-84e2-79de589ad42f)

<br>

- One limitation of SPLOM is that if there are n variables, we need to draw 𝑛𝐶2 scatterplots.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/610b4003-fd99-48f0-858b-1da0e88aef59)

<br>

# More Keys?

- We learned visualization idioms for one key and two keys.
- What about more than two keys?
- **Volumetric grids** are used for three keys.
  - Good for SciVis , but not recommend when there is no given
- Another technique is recursive subdivision for multiple keys that we will learn soon.

<br>

# Spatial Axis Orientation

- So far, we have used two perpendicular axes, x and y
- But they do not have to be perpendicular!
  - They can be either parallel or radial.
- Parallel layout: parallel coordinates (PC)
- Radial layout: radial bar charts, pie charts, radar charts

<br>

## Parallel Coordinates

- **Parallel coordinates (PCs)** are effective when visualizing many quantitative attributes at once using spatial position.
- One row as a polyline!

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/56e9738c-6c2a-4645-9692-1ab7cd7d5850)

<br>

- Originally, PCs were designed for checking correlation between two adjacent axes.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/90990bcc-462a-4c9f-8d4a-bb10cc95294b)

<br>

- If there are too many items, PCs become overplotted.
- \# of items: hundreds
- \# of attributes (or axes): dozens

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fac88b8c-38d3-418d-a9de-64d658d1cafd)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1cdb0215-f379-46ba-97ca-2f27c91c6f17)

<br>

## Radial Bar Charts

- Radial bar charts are similar to bar charts but use a radial layout.
  - Data types and marks are the same.
  - The only difference is the radial vs. the rectilinear orientation of the axes.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/82173c49-d8e6-46fe-965e-b744a5ac84f5)

<br>

## Radar Charts

- Another example of the use of radial layouts is radar charts.
- Similar to radial bar charts, but use a polyline mark instead of line marks.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c72e9151-caba-49e9-b9c9-f3bb8013e9b0)

<br>

- he area of a polyline usually means an overall quantity of an item.
  - e.g., overall performance of a player
 
<br>

## Pie Charts and Polar Area Charts

- **Pie charts** (a) encode a single Q attribute with area marks and the angle channel.
  - Popular, but note that angle judgements on area marks are less accurate than length judgements on line marks.
- **Polar area charts** encode a single Q attribute but varies the length of the wedge just as a bar chart varies the length of the bar.
  - Note that the angle is evenly distributed to keys.
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2dab713b-f843-48fd-9f5e-1d68080d55f7)

<br>

## Pie Charts

- Pie charts are useful when you want to show the relative contribution of parts to a whole.
  - The sum of the wedge angles must add up to the 360 of a full circle.
- However, such relative contribution of parts to a whole can be also visualized through normalized stacked bar charts or stacked bar charts.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3d47b599-c707-47ed-9a7e-fa5d72b1dfc8)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a2b9f1be-4304-4814-b772-d6eb0b20ff58)

<br>

## Rectilinear vs. Radial

- [Diehl et al. 10] compared radial and rectilinear layouts focusing on the abstract task of memorizing positions of objects for a few seconds.
- Rectilinear layouts were better in terms of speed and accuracy.
- But, radial layouts are more effective at showing cyclic patterns [Wickhamet al. 12].

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/90898414-4e59-43b3-acd5-68509e624859)

<br>

# Summary: Arrange Table

- **Arrange**: how to use spatial position channels
- **1 Key + 1 Value**: bar charts, streamgraphs, dot charts, and line charts, stacked bar charts
- **2 Keys + 1 Value**: heatmaps and cluster heatmaps
- **2 Values**: scatterplot
- **Multiple Values**: scatterplot matrix, parallel coordinate (parallel layout), polar area charts (single item, radial layout), radar charts (single item, radial layout)
- **Percentage Comparison**: pie charts and normalized stacked bar charts
