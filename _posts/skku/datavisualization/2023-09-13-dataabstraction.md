---
title: "[Data Visualization] What - Data Abstraction"
categories:
  - Data Visualization
tags:
  - Data Abstraction
toc: true
toc_sticky: true
toc_label: "Data Abstraction"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/159c74c5-0bd2-45f3-939a-f150d8fe4cd8)

<br>

# The Big Picture

- **What data does the user see? (data abstraction)**
- Why does the user use the system? (task abstraction)
- How are the visual encoding and interaction idioms constructed? (idiom abstraction)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/30edc419-568b-4963-8ff9-8074b21e33a9)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9f126d97-083d-415f-ae0c-7f08d189d076)

<br>

# What - Data Abstraction

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b01cc362-aa34-4484-93a5-79d6fdde8c61)

<br>

## Why Data Abstraction?

- There are an infinite number of datasets.
- Thus, it would be inefficient to design a visualization system for every dataset.
- We will categorize and characterize data types that a visualization system aims to visualize.
- Insights gained from such analysis can be used to design a visualization system in the future.

<br>

## Why Data Semantics and Types?

<br>**1, 4.5, -3, 10001, 2, 0**<br>

- What does this sequence of six numbers mean?
- Multiple interpretations are possible.

<br>**Basil, 7, S, Pear**<br>

- Same for this record

<br>

- The **type** of the data is its structural or mathematical interpretation.
- The **semantics** of the data is its real-world meaning.
- **Metadata**: additional data required for correctly interpreting data
  - Types
  - Semantics
  - Syntax of a data file (e.g., CSV, TSV, or JSON)

<br>

# Data, Dataset, and Attributes

- We will learn three concepts: data types, dataset types, and attribute types.
- **Data types**: what kind of thing is the data?
  - e.g., an item, a link, or an attribute
- **Dataset types**: how are these data types combined into a larger structure?
  - e.g., a table, a tree, or a field of sampled values
- **Attribute types**: what kinds of mathematical operations are meaningful for an attribute?
  - e.g., quantity, category, $\dots$

<br>

## Data Types

- **Five Basic Data Types**: Items, Attributes, Links, Positions, and Grids
- An **item** is an individual entity that is discrete.
  - e.g., a row in a simple table or a node in a network.
- An **attribute** is some specific property that can be measured, observed, or logged.
  - Sometimes, called variable or dimension
  - e.g., salary, price, or number of sales
- A **link** is a relationship between items typically within a network.
  - e.g., marriage relationship
- A **grid** specifies the strategy for sampling continuous data in terms of both geometric and topological relationships between its cells.
- A **position** is spatial data, providing a location in two-dimensional (2D) or three-dimensional (3D) space.
  - e.g., a latitude–longitude pair describing a location on the Earth’s surface
  - e.g., three numbers specifying a location within the region of space measured by a medical scanner

<br>

## Dataset Types

- Let’s combine these five basic data types.
- One of the most common dataset type is a **table**.
- A **table** dataset type includes **item** (rows) and **attribute** (columns) data types.
- A **network** dataset type consists of three data types: items (nodes), links (links), and attributes (attributes of node links).

<br>

- **Four dataset types**: tables, networks and trees, fields, and geometry
  - + clusters, sets, and lists
   
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a0fda44a-ef74-402d-8b90-82e00f6ded2e)

<br>

### Tables

- A **table** is made up of rows and columns.
  - Usually, 2D
- A row represents an item.
- A column represents an attribute.
- A cell is specified by the combination of a row and a column.
  - e.g., stores a value specified by an item and an attibute.
- A multidimensional table has a more complex structure for indexing into a cell, with multiple keys.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0e80fe88-0a1d-4060-98c7-b3419fae55d0)

<br>

### Networks and Trees

- A **network** is made up of nodes and links and specifies the relationship between two or more nodes.
- Nodes and links can have attributes independently.
- Example: social network on Facebook
  - Node: accounts (people, organizations, or pages)
  - Link: friendship (or subscription)
  - Node attributes: name, photo, website_url, …
  - Link attributes: last interaction time, …
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/faf48332-3908-400a-b0dd-b0bdd82026c5)

<br>

- Networks with hierarchical structure are more specifically called trees.
- In contrast to a general network, trees do not have cycles.
  - Each child node has only one parent node pointing to it.
- Networks are sometimes called **graphs.**
  - e.g., graph drawing and graph theory
- But, the term graphs is also used for charts.
  - e.g., bar graph and line graph
  - It is confusing. So, we will use the term charts for this
 
<br>

- Two popular visualizations for networks: a node-link diagram and an adjacency matrix.
- There are a lot of network visualizations!

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c72ebfb6-b9af-4746-8220-64cd6d1aa70b)

<br>

### Fields

- The field dataset type contains **attribute** values associated with cells.
- What is the difference between 2D tables and 2D fields?
- In a 2D field, each cell contains measurements or calculations from an **continuous** domain.
  - So if you want, you can draw an infinite number of measurements!
  - In a table, rows and columns are discrete.

<br>

- Consider a field dataset representing a medical scan of a  human body.
  - This is a 3D field, because our body is continuous.
- We can determine the resolution of the scan (i.e., granularity)
  - A low resolution (a coarser grid): 64 * 64 * 64 cells
  - A high resolution (a finer grid): 256 * 256 * 256 cells
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c1ab265c-230e-4ffa-a9ef-4605637264e2)

<br>

- Since it is impossible to measure an infinite number of cells, sampling and interpolation techniques are important in the field dataset type.
- **Sampling**: how frequently to take the measurements?
- **Interpolation**: how to show values in between the sampled points in a way that does not mislead.
- Interpolating appropriately between the measurements allows you to **reconstruct** a new view of the data.

<br>

- **Grid geometry**: the location of cells in space
- **Grid topology**: how each cell connects with its neighboring cells

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d8492b1d-d214-4cbc-b2cb-69acb0468150)

<br>

**SciVis vs InfoVis**

- If we want to visualize a 2D field, an obvious choice for visual encoding would be to keep the spatialization of the data in the visualization.
  - e.g., longitude -> horizontal position, latitude -> vertical position
- **Scientific visualization (SciVis)** is concerned with situations where spatial position is given with the dataset.
- **Information visualization (InfoVis)** is concerned with situations where the use of space in a visual encoding is chosen by the designer.

<br>

**Geometry**

- The geometry dataset type specifies information about the shape of items with explicit spatial positions.
  - Items + positions
  - e.g., points, one-dimensional lines or curves, or 2D surfaces or regions, or 3D volumes
- e.g., cartography

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f7bcb18d-dfcc-41c8-a53d-b3d807f76029)

<br>

### Other Dataset Types

- Set: an unordered group of items
- List: an ordered group of items
- Cluster: grouping based on attribute similarity, where items within a cluster are more similar to each other than to ones in another cluster

<br>

### InfoVis Subfields

- (Dataset type) + “visualization”
- Table visualization
- Network visualization
- Field visualization (usually, vector or tensor visualization in SciVis)
- Set visualization
- Cluster visualization
- $\dots$

<br>

### Dataset Availability

- Any of dataset types can be static or dynamic.
- The default approach to visualization assumes that the entire dataset is available all at once, as a static file (static datasets, offline).
- Recently, it becomes more frequent to visualize dynamic datasets that change over the course of the visualization session (dynamic datasets, online).
- e.g., monitoring, …

<br>

## Attribute Type

- The type of an attribute

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6d99e6b0-7991-433d-9616-2ca00ff2da0c)

<br>

- **Categorical** data do not have an implicit ordering (sometimes, *nominal* or *qualitative*).
  - But they often have hierarchy structure.
  - e.g., movie genres, file types, and city names
  - Operators: == and !=
- **Ordered** data have an implicit ordering.
  - **Ordinal** data have an ordering but artihmetic is not meaningful (e.g., shirt sizes, ranks)
  - **Quantitative** data have an ordering and arithmetic makes sense (e.g., length, stock prices)
  - Operators: ==, !=, >, <, and (+ and – only for quantitative data)
- Quantitative data can be further divided into two types: *interval* and *ratio*.
- In **interval** data, distances are meaningful but there is no absolute zero.
  - e.g., temperature in Celsius or Fahrenheit
  - Multiplication and division does not make sense. 60°C is not twice as hot as 30°C.
- In **ratio** data, distances are meaningful and there is an absolute zero.
  - e.g., temperature in Kelvin
  - 60°K is twice as hot as 30°K.

<br>

**Summary: Attribute Types**

- **Categorical** (sometimes nominal or qualitative): movie genres, file types, …
  - Operators: ==, !=
- **Ordinal**: shirt sizes, ranks, …
  - Operators: ==, !=, <, >
- **Interval**: temperature in Celsius, …
  - Operators: ==, !=, <, >, +, -
- **Ratio**: temperature in Kelvin, number of people, …
  - Operators: ==, !=, <, >, +, -, *, /
 
<br>

- For ordered data, we can consisder the ordering direction.
  - i.e., where is the origin?
- **Sequential**: there is a homogeneous range from a minimum to a maximum value, such as height.
- **Diverging**: data can be deconstructed into two sequences pointing in opposite directions that meet at a common zero point, such as elevation.
- **Cyclic**: the values wrap around back to a starting point rather than continuing to increase indefinitely, such as the day of the week.

<br>

- Color schemes for ordering directions

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/618475a1-df5b-43eb-83cf-9debd87fde6b)

<br>

### Semantics

- **Two types of attribute semantics**: key and value
- A **key** attribute acts as an index that is used to look up **value** attributes.
  - Key: your student ID
  - Value: your name
  - Keys are sometimes called independent attributes or dimensions, and values are sometimes called dependent attributes or measures.
- Types and semantics are cross-cutting.
  - A categorical attribute can be value attributes, and a quantitative attribute can be key attributes.
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/031008f1-f669-4299-a3e1-abc2005bfdb9)

<br>

- Name is a categorical attribute that might appear to be a reasonable key at first.
- But it is not a good choice since there are two people (Amy) have the same name.
- The quantitative attribute of Age and the ordinal attribute of Shirt Size have many duplicates so they are not a good choice.
- ID can serve as a key attribute.

<br>

- For multidimensional tables or fields, multiple keys are required to look up an item.
  - The combination of all keys must be unique for each item, even though an individual key attribute may contain duplicates!
  - (ID, Name)
- Multidimensional: data have multiple keys.
  - one-dimensional, two-dimensional, …
- Multivariate: data have multiple values.
  - univariate, bivariate, …
- Many people do not separate these two terms but they are DIFFERENT!
  - 다차원 vs 다변량
 
<br>

- Suppose you measured the temperature of a 3D space.
- You have three keys: x, y, and z
- For each cell, you have one value (temperature)
- So, you have 3 dimensions and one attribute for each cell!
  - Three-dimensional **univariate** dataset!
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b47cebf8-917b-48ca-8fc4-098d23e47a06)

<br>

- Keys: one-dimensional, two-dimensional, three-dimensional, …, multidimensional
- Values: univariate (scalar), bivariate (vector), trivariate (tensor), …, multivariate
- Measuring the wind direction at some locations in a region: twodimensional (lat and long) vector fields (the direction of the wind)
- Can you imagine a 4-dimensional univariate dataset?

<br>

# Summary: Data Abstraction

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6d35a55e-e112-4324-b0cf-4199b14f58a4)
