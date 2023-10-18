# 정보시각화 개괄(Introduction to InfoVis)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fd00a16c-f5ba-472f-97c3-93fb897fb8ac)

<br>

# 정당화 및 데이터 추상화(Justification and Data Abstraction)

<br>

> What data does the user see? (data abstraction)
> Why does the user use the system? (task abstraction)
> How are the visual encoding and interaction idioms constructed? (idiom abstraction)

# 데이터 추상화 (Data Abstraction) - What

- we will learn three concepts: data types, dataset types, and attribute types.
  - **Data types**: what kind of thing is the data?
    - e.g., an item, a link, or an attribute
  - **Dataset Type**: how are these data types combined into a larger structure?
    - e.g., a table, a tree, or a field of sampled values
  - **Attribute types**: what kinds of mathematical operations are meaningful for an attribute?
    - e.g., quantity, category, ...

<br>

## Datasets

### Data Type

- **Five Basic Data Types: Items, Attributes, Links, Positions, and Grids**
  - An **item** is individual entity that is discrete.
  - An **attribute** is some specific property that can be measured, observed, or logged.
  - A **link** is a relationship between items typically within a network.
  - A **grid** specifies the strategy for sampling continuous data in terms of both geometric and topological relationships between its cells.
  - A **position** is spatial data, providing a location in two-dimensional (2D) or three-dimensional (3D) space

### Data and Dataset Types

- **Four dataset types**: tables, networks, and trees, fields, and geometry
  - Tables: Items, Attributes
  - Networks & Trees: Items(nodes), Links, Attributes
  - Fields: Grids(+Positions), Attributes
  - Geometry: Items, Positions
  - Clusters, Sets, Lists: Items

### Dataset Availability

- Any of dataset types can be **static** or **dynamic**

<br>

## Attributes

### Attributes Types

- **Categorical** data do not have an implicit ordering (sometimes, nominal or qualitative)
- **Ordered** data have an implicit ordering
  - **Ordinal** data have an ordering but arithmetic is not meaningful
  - **Quantitative** data have ordering and arithmetic makes sense
    - In **interval** data, distances are meaningful but there is no absolute zero.
    - In **ratio** data, distances are meaningful and there is an absolute zero.
  - Operators: ==, !=, >, < and (+ and - only for quantitative data)
 
### Ordering Direction

- For ordered data, we can consider the ordering direction
  - **Sequential**: there is a homogeneous range from a minimum to a maximum value, such as height
  - **Diverging**: data can be deconstructed into two sequences pointing in opposite directions that meet at a common zero point, such as elevation.
  - **Cyclic**: the values wrap around back to a starting point rather than continuing to increase indefinitely, such as the day of the week.

<br>

# 과업 추상화 (Task Abstraction) - Why

## Actions

- Three levels of action
- High-level choise: **Analyze**
- Mid-level choiec: **Search**
- Low-level choice: **Query**

### Analyze ----- need more

- **Consume**: The most common case for vis is for the user to consume information that has already been generated as data stored in a format amenable to computation.
  - **Discover(=explore)**: to find new knowledge that was not previously known.
  - **Present(=explain)**: to communicate with others about the knowledge that is known.
  - **Enjoy**: visualization in casual encounters, e.g., infographic
- **Produce**: However, sometimes, we use vis to produce new materials!
  - **Annotate** (~tag): adding graphical or textual annotations associated with one or more visualization elements
  - **Record**: saving or capturing visualization elements as persistent artifacts
  - **Derive** (=transform): producing new data elements based on existing data elements.

### Search

- **Lookup**: looking up human(target) knowing that it belongs to mammals(location)
- **Locate**: locating rabbits(targe) not knowing where it belongs to
- **Browse**: browsing all leaves of the mammal sutree(location)
- **Explore**: exploring for a family having the largest number of species

### Query

- After searching, you will find a target or set of targets
- Then, you may wnat to investigate the targets by **querying** some information

- **Identify**: returns the characteristic of a single target
- **Compare**: returns the characteristics of multiple targets
- **Summariza(=overview)**: returns a comprehensive view of everything_

## Targets

- So far, we have learned actions(verbs) that users want to perform on vis.
- Tharges(nouns) mean some aspect of data that is of interest to users.

### All Data

- **Trends**: a high-level characterization of data
- **Outliers**: elements do not fit well with trends
- **Features**: particular structures of interest

### Attributes

- **Distribution**: the distribution of study time
- **Extreames**: the student who study longest per week
- **Dependency**: does grade depend on study time?
- **Correlation**: are grade and study time positively correlated?
- **Similarity**: similarity between students in terms of study time/grade

### Network Data

- **topology** and **paths**

### Spatial Data

- The last two pertain to specific types of datasets.





















마크와 채널(Marks and Channels)
색깔(Color)
테이블 데이터 시각화(Arrange Tables)
공간, 네트워크, 트리 데이터 시각화(Arrange Spatial Data, Trees, and Networks)
