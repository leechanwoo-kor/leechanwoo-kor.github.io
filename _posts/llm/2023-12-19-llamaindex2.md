---
title: "[LlamaIndex] 라마인덱스(LlamaIndex) 활용"
categories:
  - LLM
tags:
  - LlamaIndex
  - GPT
  - IN-CONTEXT LEARNING
  - LLM
  - NLP
  - OPEN AI
  - PROMPT ENGINEERING
toc: true
toc_sticky: true
toc_label: "라마인덱스(LlamaIndex) 활용"
toc_icon: "sticky-note"
---

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5fd945d9-c515-42fe-8d0e-be717080fed0">
</p>

OpenAI의 GPT 시리즈와 같은 대규모 언어 모델(LLM)은 공개적으로 액세스할 수 있는 다양한 데이터로 학습되어 텍스트 생성, 요약, 질문 답변, 계획 수립에서 뛰어난 역량을 발휘합니다. 이러한 다재다능함에도 불구하고 자주 제기되는 질문은 이러한 모델을 사용자 지정, 비공개 또는 독점 데이터와 원활하게 통합할 수 있는지에 관한 것입니다.

기업과 개인은 고유한 맞춤형 데이터로 넘쳐나고 있으며, 이러한 데이터는 종종 Notion, Slack, Salesforce와 같은 다양한 애플리케이션에 보관되거나 개인 파일에 저장되어 있습니다. 이러한 특정 데이터에 대해 LLM을 활용하기 위해 여러 가지 방법론이 제안되고 실험되었습니다.

미세 조정(Fine-tuning)은 이러한 접근 방식 중 하나로, 특정 데이터 세트의 지식을 통합하기 위해 모델의 가중치를 조정하는 것입니다. 하지만 이 프로세스에도 어려움이 없는 것은 아닙니다. 데이터 준비에 상당한 노력이 필요하고 최적화 절차가 까다롭기 때문에 일정 수준의 머신러닝 전문 지식이 필요합니다. 또한, 특히 대규모 데이터 세트를 처리하는 경우 재정적 영향이 상당할 수 있습니다.

이에 대한 대안으로 컨텍스트 내 학습(In-context learning)이 등장했는데, 이는 입력과 프롬프트의 우선순위를 정하여 정확한 출력을 생성하는 데 필요한 컨텍스트를 LLM에 제공하는 것입니다. 이 접근 방식은 광범위한 모델 재학습의 필요성을 줄여주며, 개인 데이터를 통합하는 보다 효율적이고 접근하기 쉬운 수단을 제공합니다.

하지만 이 방식은 사용자의 신속한 엔지니어링 기술과 전문 지식에 의존한다는 단점이 있습니다. 또한 컨텍스트 내 학습은 특히 고도로 전문적이거나 기술적인 데이터를 다룰 때 미세 조정만큼 정확하거나 신뢰할 수 없을 수 있습니다. 광범위한 인터넷 텍스트에 대한 모델의 사전 학습은 특정 전문 용어나 문맥에 대한 이해를 보장하지 않기 때문에 부정확하거나 관련 없는 결과를 초래할 수 있습니다. 이는 개인 데이터가 틈새 영역이나 업계의 데이터일 때 특히 문제가 됩니다.

또한 단일 프롬프트에서 제공할 수 있는 컨텍스트의 양은 제한되어 있으며, 작업의 복잡성이 증가함에 따라 LLM의 성능이 저하될 수 있습니다. 프롬프트에 제공된 정보가 민감하거나 기밀일 수 있기 때문에 개인정보 보호 및 데이터 보안 문제도 있습니다.

커뮤니티에서 이러한 기술을 탐구함에 따라 라마인덱스와 같은 도구가 주목을 받고 있습니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4a3bb702-d266-42b1-b646-331c5bd58e7a"><br>
  <em>Llama Index</em>
</p>

이 도구는 전직 Uber 연구 과학자였던 Jerry Liu에 의해 시작되었습니다. 작년 가을에 GPT-3를 실험하던 중, Liu는 개인 파일과 같은 사적인 데이터를 처리하는 데 있어 이 모델의 한계를 발견했습니다. 이러한 관찰은 오픈 소스 프로젝트인 라마인덱스의 시작을 이끌었습니다.

이 계획은 최근 시드 펀딩 라운드에서 850만 달러를 확보하며 투자자들을 끌어모았습니다.

라마인덱스는 사용자 지정 데이터로 LLM을 보강하여 사전 학습된 모델과 사용자 지정 데이터 사용 사례 간의 격차를 해소합니다. 사용자는 라마인덱스를 통해 자신의 데이터를 LLM으로 활용하여 개인화된 인사이트로 지식을 생성하고 추론할 수 있습니다.

사용자는 자신의 데이터를 LLM에 원활하게 제공하여 지식 생성 및 추론이 심도 있게 개인화되고 인사이트를 얻을 수 있는 환경을 조성할 수 있습니다. 라마인덱스는 데이터 상호 작용을 위한 보다 사용자 친화적이고 안전한 플랫폼을 제공함으로써 상황에 맞는 학습의 한계를 해결하고, 머신러닝 전문 지식이 부족한 사용자도 개인 데이터로 LLM의 잠재력을 최대한 활용할 수 있도록 보장합니다.

## 높은 수준의 개념 (High-Level Concept) & 몇 가지 인사이트 (some Insights)

### 검색 증강 생성(Retrieval Augmented Generation, RAG):

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/503aec2c-d676-4130-865a-e44337101fbf"><br>
  <em>LlamaIndex RAG</em>
</p>

RAG는 LLM과 사용자 지정 데이터를 결합하여 보다 정확하고 정보에 입각한 응답을 제공할 수 있도록 모델의 역량을 강화하도록 설계된 두 가지 프로세스입니다. 프로세스는 다음과 같이 구성됩니다:

- **인덱싱 단계**: 지식창고(Knowledge Base) 생성을 위한 토대를 마련하는 준비 단계입니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ddc4f133-4ab1-49b9-ae80-cd0f87cb6cb4"><br>
  <em>LlamaIndex Indexing</em>
</p>

- **쿼리 단계**: 이 단계에서는 지식창고(Knowledge Base)에서 관련 컨텍스트를 검색하여 LLM이 쿼리에 답변하는 데 도움을 줍니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5dd09d0f-ad46-407f-82bb-3f9e684ba68e"><br>
  <em>LlamaIndex Query Stage</em>
</p>

### 라마인덱스를 사용한 인덱싱 여정:

- **데이터 커넥터(Data Connectors)**: 데이터 커넥터는 데이터의 라마인덱스로 가는 여권이라고 생각하세요. 데이터 커넥터는 다양한 소스와 형식의 데이터를 가져와서 간단한 '문서' 표현으로 캡슐화하는 데 도움이 됩니다. 데이터 커넥터는 데이터 로더로 가득한 오픈 소스 리포지토리인 LlamaHub에서 찾을 수 있습니다. 이러한 로더는 쉽게 통합할 수 있도록 제작되어 모든 라마인덱스 애플리케이션에서 플러그 앤 플레이 환경을 구현할 수 있습니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bdb424c2-5936-4edd-b70e-033afc4a084b"><br>
  <em>LlamaIndex hub (https://llamahub.ai/)</em>
</p>

- **문서/노드(Documents/Nodes)**: 문서는 PDF, API 출력, 데이터베이스 항목 등 다양한 데이터 유형을 담을 수 있는 일반적인 여행 가방과 같습니다. 반면, 노드는 문서의 스니펫 또는 '청크'로, 메타데이터와 다른 노드와의 관계가 풍부하여 나중에 정확한 데이터 검색을 위한 견고한 기반을 보장합니다.

- **데이터 색인(Data Indexes)**: 데이터 수집 후, 라마인덱스는 이 데이터를 검색 가능한 형식으로 색인화하는 작업을 지원합니다. 백그라운드에서는 원시 문서를 중간 표현으로 분해하고, 벡터 임베딩을 계산하고, 메타데이터를 추론합니다. 인덱스 중 'VectorStoreIndex'는 다음과 같습니다.

<br>

## LamaIndex의 인덱스 유형: 정리된 데이터의 핵심

라마인덱스는 각각 다른 필요와 사용 사례에 대해 다른 유형의 인덱스를 제공합니다. 이 인덱스의 핵심에는 위에서 설명한 대로 "노드"가 있습니다. 라마인덱스를 메커니즘과 응용 프로그램으로 이해해 보겠습니다.

### 1. 리스트 인덱스(List Index)

- 메커니즘: 리스트 인덱스는 노드를 목록처럼 순차적으로 정렬합니다. 입력 데이터를 노드에 청킹한 후 선형으로 정렬하여 순차적으로 또는 키워드 또는 임베딩을 통해 조회할 수 있도록 준비합니다.
- 장점: 이 인덱스 유형은 순차적인 쿼리가 필요한 경우에 빛납니다. LamaIndex는 LLM의 토큰 제한을 초과하더라도 각 노드의 텍스트를 스마트하게 쿼리하고 목록을 탐색할 때 답변을 개선하여 전체 입력 데이터의 활용도를 보장합니다.

### 2. 벡터 저장소 인덱스(Vector Store Index)

- 메커니즘: 여기서 노드는 벡터 임베딩으로 변환되며 로컬에 저장되거나 밀버스와 같은 특수 벡터 데이터베이스에 저장됩니다. 조회되면 가장 유사한 top_k개의 노드를 가져와 응답 합성기로 채널링됩니다.
- 장점: 작업 흐름이 벡터 검색을 통한 의미적 유사성을 위해 텍스트 비교에 의존하는 경우 이 인덱스를 사용할 수 있습니다.

### 3. 트리 인덱스(Tree Index)

- 메커니즘: 트리 인덱스에서 입력 데이터는 리프 노드(원본 데이터 청크)에서 상향식으로 구축된 트리 구조로 진화합니다. 부모 노드는 GPT를 사용하여 만들어진 리프 노드의 요약으로 나타납니다. 쿼리 중에 트리 인덱스는 루트 노드에서 리프 노드로 횡단하거나 선택된 리프 노드에서 직접 응답을 구성할 수 있습니다.
- 장점: 트리 인덱스를 사용하면 긴 텍스트 청크를 조회하는 것이 더 효율적이며 다양한 텍스트 세그먼트에서 정보를 추출하는 것이 간단해집니다.

### 4. 키워드 인덱스(Keyword Index)

- 메커니즘: 키워드와 노드의 맵은 키워드 인덱스의 핵심을 형성합니다. 조회되면 키워드가 쿼리에서 추출되고 매핑된 노드만 스포트라이트를 받습니다.
- 장점: 명확한 사용자 질문이 있을 때 키워드 인덱스를 사용할 수 있습니다. 예를 들어, 코로나19 관련 문서만 제로인 상태에서 의료 문서를 분류하는 것이 더 효율적입니다.

<br>

## Lama Index 설치

LamaIndex를 설치하는 것은 간단한 과정입니다. Pip에서 직접 설치하거나 원본 소스에서 설치하도록 선택할 수 있습니다. (시스템에 파이썬이 설치되어 있는지 확인하거나 Google Colab을 사용할 수 있습니다)

### 1. Pip에서 설치:

- 다음 명령을 실행합니다:
  - `pip install lama-index`
- 참고: 설치하는 동안 LamaIndex는 NLTK 및 HuggingFace와 같은 특정 패키지의 로컬 파일을 다운로드하여 저장할 수 있습니다. 이러한 파일의 디렉토리를 지정하려면 "LAMA_INDEX_CACH_DIR" 환경 변수를 사용하십시오.

### 2. 원본 소스에서 설치:

- 먼저 GitHub에서 LamaIndex 저장소를 복제합니다:
  - `git clone https://github.com/jerryjliu/llama_index.git`
- 복제가 완료되면 프로젝트 디렉토리로 이동합니다.
- 패키지 종속성을 관리하려면 Poetry가 필요합니다.
- 이제 Poetry를 사용하여 가상 환경을 만듭니다:
  - `poetry shell`
- 마지막으로 핵심 패키지 요구 사항을 다음과 같이 설치합니다:
  - `poetry install`

<br>

## Lama Index에 대한 환경 설정

### 1. OpenAI 설정:

- 기본적으로 LamaIndex는 텍스트 생성을 위해 OpenAI의 `gpt-3.5-turbo`을 사용하고 검색 및 임베딩을 위해 `text-embedding-ada-002`를 사용합니다.
- 이 설정을 사용하려면 `OPENAI_API_KEY`가 있어야 합니다. OpenAI 웹사이트에서 등록하고 새로운 API 토큰을 생성하여 하나를 얻으세요.
- 프로젝트의 필요에 따라 기본 LLM(Large Language Model)을 사용자 정의할 수 있는 유연성이 있습니다. LLM 공급자에 따라 추가 환경 키와 토큰이 필요할 수 있습니다.

### 2. 로컬 환경 설정:

- OpenAI를 사용하지 않으려면 LamaIndex는 텍스트 생성을 위한 `LamaCPP` 및 `lama2-chat-13B`, 검색 및 임베딩을 위한 `BAAI/bge-small-en` 등 로컬 모델로 자동 전환됩니다.
- `Lama CPP`를 사용하려면 제공된 설치 가이드를 따르십시오. GPU를 지원하기 위해 이상적으로 컴파일된 `llama-cpp-python` 패키지를 설치해야 합니다. 이 설정은 CPU와 GPU에서 약 11.5GB의 메모리를 사용합니다.
- 로컬 임베딩의 경우 `pip install sentence-transformers`를 실행합니다. 이 로컬 설정은 약 500MB의 메모리를 사용합니다.

이러한 설정을 통해 OpenAI의 기능을 활용하거나 프로젝트 요구 사항 및 리소스에 맞게 로컬에서 모델을 실행하도록 환경을 조정할 수 있습니다.

## A simple Usecase: Querying Webpages with LlamaIndex and OpenAI

웹 페이지에 특정 통찰력을 조회할 수 있는 간단한 파이썬 스크립트는 다음과 같습니다:

```Python
!pip install llama-index html2text
```

```Python
import os
from llama_index import VectorStoreIndex, SimpleWebPageReader
# Enter your OpenAI key below:
os.environ["OPENAI_API_KEY"] = ""
# URL you want to load into your vector store here:
url = "http://www.paulgraham.com/fr.html"
# Load the URL into documents (multiple documents possible)
documents = SimpleWebPageReader(html_to_text=True).load_data([url])
# Create vector store from documents
index = VectorStoreIndex.from_documents(documents)
# Create query engine so we can ask it questions:
query_engine = index.as_query_engine()
# Ask as many questions as you want against the loaded data:
response = query_engine.query("What are the 3 best advise by Paul to raise money?")
print(response)
```

```
The three best pieces of advice by Paul to raise money are:
1. Start with a low number when initially raising money. This allows for flexibility and increases the chances of raising more funds in the long run.
2. Aim to be profitable if possible. Having a plan to reach profitability without relying on additional funding makes the startup more attractive to investors.
3. Don't optimize for valuation. While valuation is important, it is not the most crucial factor in fundraising. Focus on getting the necessary funds and finding good investors instead.
```

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fd6af395-b4a6-4f90-ab9a-6de13b779bd0"><br>
  <em>Google Colab Llama Index Notebook</em>
</p>

이 스크립트를 사용하면 질문만 하면 웹 페이지에서 특정 정보를 추출할 수 있는 강력한 도구를 만들 수 있습니다. 웹 데이터를 조회할 때 라마 인덱스와 OpenAI를 통해 얻을 수 있는 이점을 엿볼 수 있습니다.

<br>

## Lama Index vs Langchain: 목표에 따라 선택하기

LamaIndex와 Langchain 중 어느 것을 선택하느냐는 프로젝트의 목표에 따라 달라질 것입니다. LamaIndex는 지능형 검색 도구를 개발하고 싶다면 확실한 선택이며, 데이터 검색을 위한 현명한 저장 메커니즘으로서 탁월합니다. 반대로 플러그인 기능을 갖춘 ChatGPT와 같은 시스템을 개발하고 싶다면 Langchain을 선택하십시오. ChatGPT와 LamaIndex의 여러 인스턴스를 지원할 뿐만 아니라, 멀티태스킹 에이전트를 구축할 수 있도록 하여 기능을 확장합니다. 예를 들어, Langchain을 사용하면 구글 검색과 동시에 파이썬 코드를 실행할 수 있는 에이전트를 만들 수 있습니다. 즉, LamaIndex는 데이터 처리에 탁월하지만, Langchain은 여러 도구를 조정하여 전체적인 솔루션을 제공합니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3fbc9172-65d1-45a6-8e6c-0d933b7cc147"><br>
  <em>LlamaIndex Logo Artwork created using Midjourney</em>
</p>
