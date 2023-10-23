# Data and Task Abstraction

## 1 Find a Dataset

Find a dataset. You can use your own datasets (e.g., a dataset in your research field), but if you don’t have one, search for one on the following repositories:
- A List of Public Datasets: https://github.com/awesomedata/awesome-public-datasets
- Datasets on Google: https://console.cloud.google.com/marketplace/browse?filter=solution-type:dataset
- OpenData: https://registry.opendata.aws/

**Your dataset must have at least 100 items and 6 attributes.**

<br>

## 2 Abstract the Dataset

Abstract the dataset you found. Consider the following questions:
- How big is your dataset (e.g., number of rows, number of attributes, or file size)?
- What is the type of your dataset (dataset type)?
- What are the types and semantics of the data in your dataset (data type)?
- What is the type and semantics of each attribute?
- For each nominal or ordinal attribute, list its type (nominal or ordinal) and ordering direction, all possible values (levels), and their meaning.
- For each quantitative attribute, list its type (interval or ratio) and ordering direction, range, and meaning.
- Separate the attributes into *keys* and *values*.

<br>

## 3 Abstract Possible Tasks on the Dataset

Suppose you are a domain expert who wants to analyze the dataset you found. Give at least three tasks that you would perform on the dataset. You are not a real expert, so it is allowed to make assumptions about the domain (describe them in the report).

Consider the following questions:
- Why do you want to perform each task?
- What is the possible outcome of each task?
- Abstract each task using a pair of action + target.

## 4 Submission

Write a report in PDF format and upload it to iCampus. Keep your report as short as possible (up to 3 pages). Your report must include the followings:
- Dataset name
- Brief description about the dataset
- Result of data abstraction
- Result of task abstraction (at least three instances)
