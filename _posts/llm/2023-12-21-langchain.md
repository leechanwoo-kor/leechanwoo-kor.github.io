---
title: "[LangChain] LangChain Chat with Your Data
"
categories:
  - LlamaIndex
tags:
  - GPT
  - IN-CONTEXT LEARNING
  - LLM
  - NLP
  - OPEN AI
  - PROMPT ENGINEERING
toc: true
toc_sticky: true
toc_label: "LangChain Chat with Your Data"
toc_icon: "sticky-note"
---

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/50519210-1ea1-48a6-aaa0-849275f8a13f">
</p>

<details>
<summary>요약(접기/펼치기)</summary>

## 요약

이 프로젝트는 외부 데이터 세트에서 상황별 문서를 검색하는 일반적인 LLM 애플리케이션인 RAG(Retrieve Augmented Generation)와 훈련에서 학습한 정보가 아닌 문서의 내용을 기반으로 쿼리에 응답하는 챗봇을 구축하는 가이드의 두 가지 주요 주제를 다룹니다.

다음에 대해 알게 될 것입니다:

- 문서 로드(Document Loading): LangChain이 오디오 및 비디오를 포함한 다양한 데이터 소스에 액세스할 수 있도록 제공하는 80개 이상의 고유 로더(loader)를 찾아보세요.
- 문서 분할(Document Splitting): 데이터 분할을 위한 모범 사례 및 고려 사항을 확인합니다.
- 벡터 저장소 및 임베딩(Vector stores and embeddings): 임베딩의 개념으로 파고들어 LangChain 내의 벡터 저장소 통합을 탐색합니다.
- 검색(Retrieval): 벡터 스토어에서 데이터에 액세스하고 인덱싱하는 고급 기법을 파악하여 의미론적 쿼리를 넘어 가장 관련성이 높은 정보를 검색할 수 있습니다.
- 질문 답변(Question Answering): 원패스(one-pass) 질문 답변 솔루션을 구축합니다.
- 채팅(Chat): LangChain을 사용하여 자신만의 챗봇을 구축할 때 대화 및 데이터 소스에서 관련 정보를 추적하고 선택하는 방법을 학습합니다.

LangChain 및 LLM을 사용하여 데이터와 상호 작용할 수 있는 실용적인 애플리케이션을 구축하기 시작합니다.


</details>

### 검색 증강 생성(Retrieval augmented generation, RAG)

검색 증강 생성에서 LLM은 실행의 일부로 외부 데이터 세트에서 상황별 문서를 검색합니다. 이는 특정 문서(예: PDF, 비디오 세트 등)에 대해 질문하고 싶을 때 유용합니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7445ed14-7ca9-4e19-99da-ea58a594c62b">
</p>

## 문서 로드 (Document Loading)

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c077ea8c-bfe1-4905-a813-772b0ca53125"><br>
  <em>Document Loaders</em>
</p>

<br>

문서 로더는 다양한 형식과 소스에서 데이터에 액세스하고 표준 형식으로 변환하는 세부 사항을 처리합니다. 웹 사이트, 다른 데이터베이스, 유튜브와 같이 데이터를 로드하려는 곳이 있을 수 있으며 이러한 문서는 PDF, HTML, JSON과 같은 다양한 데이터 유형으로 제공될 수 있습니다.

따라서 문서 로더의 전체 목적은 이러한 다양한 데이터 소스를 표준 문서 개체에 로드하는 것입니다. 이는 콘텐츠와 관련 메타데이터로 구성됩니다.

LangChain에는 다양한 유형의 문서 로더가 있으며, 이를 모두 다룰 시간은 없지만, 여기에 우리가 가지고 있는 80 플러스에 대한 대략적인 분류가 있습니다.

YouTube, Twitter, Hacker News와 같이 공공 데이터 소스에서 텍스트 파일과 같은 비정형 데이터를 로드하는 방법을 많이 다루며, Figma, Optom과 같이 사용자 또는 회사가 보유하고 있을 수 있는 독점 데이터 소스에서 비정형 데이터를 로드하는 방법을 다루는 방법도 훨씬 더 많습니다.

문서 로더를 사용하여 구조화된 데이터를 로드할 수도 있습니다. 표 형식의 데이터는 질문에 답하거나 의미론적 검색을 여전히 수행하고 싶은 셀이나 행 중 하나에 텍스트 데이터가 있을 수 있습니다. 그래서 여기 소스에는 에어바이트(Airbyte), 스트라이프(Stripe), 에어테이블(Airtable) 같은 것들이 포함됩니다.

- Loaders deal with the specifics of accessing and converting data
  - Accessing
    - Web Sites
    - Data Bases
    - YouTube
    - arXiv
    - ...
  - Data Type
    - PDF
    - HTML
    - JSON
    - Word, PowerPoint...
  - Returns a list of `Document` objects:

```
[
Document(page_content='MachineLearning-Lecture01 \nInstructor (Andrew Ng): Okay, Good morning. Welcome to CS229....',
metadata={'source': 'docs/cs229_lecture/MachineLearning-Lecture01.pdf', 'page':0})
...
Document(page_content='[End of Audio] \nDuration:69 minitues ',
metadata={'source': 'docs/cs229_lecture/MachineLearning-Lecture01.pdf', 'page':21})
]
```

<br>

## 문서 분할 (Document Splitting)

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/37da0340-dfc7-431e-9611-e712021fe0a5">
</p>

데이터를 문서 형식에 로드한 후에 문서 분할이 발생합니다. 이 작업은 매우 간단해 보일 수 있습니다. 각 문자의 길이에 따라 청크를 분할하거나 비슷한 방식으로 하면 됩니다. 그러나 이것이 더 까다롭고 매우 중요한 이유를 보여주는 예로 다음을 살펴보도록 하겠습니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e679a532-fc0b-4bbd-bbaf-5cb67353c870">
</p>

도요타 캠리와 몇몇 사양에 대한 문장이 있습니다. 그리고 간단한 분할을 하면 문장의 일부가 한 청크에 들어가고, 다른 일부가 다른 청크에 들어갈 수 있습니다. 그리고 나서 캠리의 사양이 무엇인지에 대한 질문에 답하려고 할 때, 사실 두 청크 중 어느 것에도 올바른 정보가 없습니다. 그래서 우리는 이 질문에 정확하게 답할 수 없을 것입니다. 의미론적으로 관련된 청크를 얻기 위해 청크를 분할하는 방법에는 많은 뉘앙스와 중요성이 있습니다.

### Example Splitter

```
langchain.text_splitter.CharacterTextSplitter(
  separator: str = "\n\n"
  chunk_size=4000,
  chunk_overlap=200,
  length_function=<buildtin function len>,
)
Methods:
create_documents() - Create documents from a list of texts.
split_documents() - Split documents.
```

Lang Chain의 모든 텍스트 스플리터의 기본은 일부 청크 크기의 청크에서 일부 청크 중복(chunk overlap)으로 분할하는 것을 포함합니다.

그래서, 우리는 그것이 어떻게 생겼는지를 보여주기 위해 아래에 약간의 다이어그램을 가지고 있습니다. 그래서, 청크 크기는 청크의 크기에 대응하고, 청크의 크기는 몇 가지 다른 방법으로 측정될 수 있습니다. 그리고 우리는 그것들 중 몇 가지에 대해 이야기할 것입니다. 그래서, 우리는 청크의 크기를 측정하기 위해 길이 함수를 통과시킬 수 있습니다. 이것은 종종 문자 또는 토큰입니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a33ba23d-5a37-4ada-a362-229eccd794b8">
</p>

일반적으로 청크 오버랩은 한 청크에서 다른 청크로 이동할 때 슬라이딩 윈도우처럼 두 청크 사이에서 약간의 오버랩으로 유지됩니다. 그리고 이를 통해 동일한 컨텍스트 조각이 한 청크의 끝과 다른 청크의 시작에 있을 수 있으며 일관성 개념을 만들 수 있습니다.

Lang Chain의 텍스트 스플리터는 모두 문서를 생성하는 방식과 문서를 분할하는 방식을 가지고 있습니다. 이것은 후드 아래에서 동일한 논리를 포함하며, 하나는 텍스트 목록을 포함하고 다른 하나는 문서 목록을 포함하는 약간 다른 인터페이스를 노출할 뿐입니다.

### Types of splitters

langchain.text_splitter.
- CharaterTextSplitter() - Implementation of splitting text that looks at characters.
- MarkdownHeaderTextSplitter() - Implementation of splitting markdown files based on specified headers.
- TokenTextSplitter() - Implementation of splitting text that looks at tokens.
- SentenceTransformersTokenTextSplitter() - Implementation of splitting text that looks at tokens.
- RecursiveCharacterText - Implementation of splitting text that looks at characters. Recursively tries to split by different characters to find one that works.
- Language() - for CCP, Python, Ruby, Markdown etc
- NLTKTextSplitter() - Implementation of splitting text that looks at sentences using NLTK (Natural Language Tool Kit)
- SpacyTextSplitter() - Implementation os splitting text that looks at sentences using Spacy.

Lang Chain에는 매우 다양한 종류의 스플리터가 있으며, 이번에서는 그 중 몇 가지를 다룰 것입니다. 하지만 남은 스플리터는 시간에 확인하시기 바랍니다.

이러한 텍스트 스플리터는 여러 차원에서 다양합니다. 그들은 어떻게 청크를 분할하는지, 어떤 문자가 그 안에 들어가는지에 따라 달라질 수 있습니다. 그것들은 그 청크들의 길이를 측정하는 방법에 따라 달라질 수 있습니다. 문자에 의한 것일까요? 토큰에 의한 것일까요? 다른 작은 모델을 사용하여 문장의 끝이 언제인지 확인하고 청크를 분할하는 방법으로 사용하는 모델도 있습니다.

청크로 분할하는 또 다른 중요한 부분은 메타데이터입니다. 모든 청크에서 동일한 메타데이터를 유지하되 관련성이 있을 때 새로운 메타데이터 조각을 추가하는 것이므로 이에 초점을 맞춘 텍스트 스플리터도 있습니다.

<br>

## 벡터 저장소 및 임베딩(Vector stores and embeddings)

이제 우리는 문서를 의미론적으로 의미 있는 작은 청크로 나누고, 이 청크들을 인덱스에 넣어야 합니다. 그러면 이 데이터 말뭉치에 대한 질문에 답할 때가 되면 쉽게 검색할 수 있습니다. 그러기 위해서는 임베딩과 벡터 스토어를 활용할 예정인데요, 어떤 것들인지 한번 보시죠.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e3bac0ac-41a6-4b00-98c1-153a958da67c">
</p>

이전에 이에 대해 간략히 다루었지만, 몇 가지 이유로 다시 방문하려고 합니다. 첫째, 데이터에 대한 챗봇을 구축하는 데 매우 중요합니다. 그리고 두 번째는 조금 더 깊이 들어가 엣지 케이스와 이 일반적인 방법이 실제로 실패할 수 있는 곳에 대해 이야기할 것입니다. 걱정하지 마세요, 나중에 고칠 거예요. 하지만 지금은 벡터 스토어와 임베딩에 대해 이야기해 보겠습니다. 그리고 이것은 문서를 쉽게 액세스할 수 있는 형식으로 저장할 준비가 되었을 때 텍스트 분할 후에 발생합니다.

<br>

### Embedding

임베딩이란 무엇인가요? 그것들은 텍스트 한 조각을 가져와서 그 텍스트를 숫자로 표현합니다. 비슷한 내용을 가진 텍스트는 이 숫자 공간에서 비슷한 벡터를 가질 것입니다. 이것은 우리가 벡터를 비교하고 비슷한 텍스트 조각을 찾을 수 있다는 것을 의미합니다. 그래서 아래 예문에서는 반려동물에 대한 두 문장이 매우 유사한 반면, 반려동물에 대한 문장과 자동차에 대한 문장은 그다지 유사하지 않다는 것을 알 수 있습니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1a187321-b113-483e-a5f1-829c76554d19">
</p>

<br>

### Vector Store

전체 엔드 투 엔드 워크플로우를 상기시키기 위해, 우리는 문서부터 시작하여, 그 문서들의 작은 분할들을 만들고, 그 문서들의 임베딩을 만든 다음, 그 모든 문서들을 벡터 저장소에 저장합니다. 벡터 스토어는 나중에 비슷한 벡터를 쉽게 찾을 수 있는 데이터베이스입니다. 이는 당면한 질문과 관련된 문서를 찾으려고 할 때 유용할 것입니다. 그런 다음 당면한 질문을 선택하여 임베딩을 생성한 다음 벡터 저장소의 모든 다른 벡터와 비교한 다음 가장 유사한 것을 선택할 수 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/800bd16a-88af-43d1-84ab-87b9b2494610)

<br>

그런 다음 가장 유사한 n개의 청크를 가져다가 질문과 함께 LLM에 전달하고 답을 얻습니다. 나중에 그 모든 것을 다룰 것입니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bba8ae7d-daa2-41f2-9961-fe5e2c310a8c)
