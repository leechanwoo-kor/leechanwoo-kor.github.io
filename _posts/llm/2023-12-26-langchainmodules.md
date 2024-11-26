---
title: "[LangChain] 모듈(Modules)"
categories:
  - LLM
tags:
  - LangChain
toc: true
toc_sticky: true
toc_label: "Modules"
toc_icon: "sticky-note"
---

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/70b80184-b2ca-405e-ac4b-92a088b5970b">
</p>

LangChain은 다음과 같은 주요 모듈에 대해 확장 가능한 표준 인터페이스와 외부 통합을 제공합니다:
- 모델 I/O: 언어 모델과의 인터페이스
- 검색(Retirieval): 애플리케이션별 데이터와 인터페이스
- 에이전트(Agent): 상위 지시어가 주어지면 체인이 어떤 도구를 사용할지 선택할 수 있습니다.

**추가**
- 체인(Chains): 공통, 빌딩 블록 구성
- 메모리(Memory): 체인 실행 사이에 애플리케이션 상태 유지
- 콜백(Callbacks): 모든 체인의 중간 단계 기록 및 스트리밍

<br>

# 모델 I/O (Model I/O)

모든 언어 모델 애플리케이션의 핵심 요소는 바로 모델입니다. LangChain은 모든 언어 모델과 인터페이스할 수 있는 빌딩 블록을 제공합니다.

- 프롬프트(Prompts): 모델 입력을 템플릿화하고, 동적으로 선택하고 관리합니다.
- 채팅 모델(Chat models): 언어 모델에 의해 지원되지만 채팅 메시지 목록을 입력으로 받아 채팅 메시지를 반환하는 모델입니다.
- LLMs: 텍스트 문자열을 입력으로 받아 텍스트 문자열을 반환하는 모델
- 출력 파서(Output parsers): 모델 출력에서 정보 추출


<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f4e79671-2aa6-46b8-bcdc-b1efdedd1536">
</p>

<br>

### LLMs vs Chat models

LLM과 채팅 모델은 미묘하지만 중요한 차이가 있습니다. LangChain의 LLM은 순수한 텍스트 완성 모델(text completion models)을 의미합니다. 이들이 래핑하는 API는 문자열 프롬프트를 입력으로 받아 문자열 완성을 출력합니다. OpenAI의 GPT-3는 LLM으로 구현됩니다. 채팅 모델은 종종 LLM의 지원을 받지만 대화에 맞게 특별히 튜닝됩니다. 그리고 결정적으로 공급자 API는 순수 텍스트 완성 모델과는 다른 인터페이스를 사용합니다. 단일 문자열 대신 채팅 메시지 목록을 입력으로 받습니다. 일반적으로 이러한 메시지에는 화자(보통 "시스템(System)", "AI", "사람(Human)" 중 하나)가 레이블이 지정됩니다. 그리고 AI 채팅 메시지를 출력으로 반환합니다. GPT-4와 Anthropic's Claude-2는 모두 채팅 모델로 구현되어 있습니다.

<br>

## 프롬프트(Prompt)

언어 모델에 대한 프롬프트는 사용자가 모델의 응답을 안내하기 위해 제공되는 일련의 지침 또는 입력으로, 모델이 문맥을 이해하고 질문에 답하거나 문장을 완성하거나 대화에 참여하는 등 관련성 있고 일관된 언어 기반 출력을 생성하는 데 도움이 됩니다.

LangChain은 프롬프트를 구성하고 작업하는 데 도움이 되는 여러 클래스와 함수를 제공합니다.
- 프롬프트 템플릿(Prompt Template): 매개변수화된 모델 입력
- 예시 선택기(Example selector): 프롬프트에 포함될 예시를 동적으로 선택

<br>

## 채팅 모델(Chat Models)

채팅 모델은 언어 모델의 변형입니다. 채팅 모델은 내부적으로 언어 모델을 사용하지만 사용하는 인터페이스는 약간 다릅니다. "텍스트 입력, 텍스트 출력" API를 사용하는 대신 "채팅 메시지"가 입력 및 출력인 인터페이스를 제공합니다.

<br>

## LLMs

대규모 언어 모델(LLMs)은 LangChain의 핵심 구성 요소입니다. LangChain은 자체 LLM을 제공하지는 않지만, 다양한 LLM과 상호 작용할 수 있는 표준 인터페이스를 제공합니다.

OpenAI, Cohere, Hugging Face 등 많은 LLM 공급자가 있으며, LLM 클래스는 이들 모두에 대한 표준 인터페이스를 제공하도록 설계되었습니다.

여기서는 OpenAI LLM 래퍼로 작업하지만, 강조 표시된 기능은 모든 LLM 유형에 공통적으로 적용됩니다.

<br>

## 출력 파서(Output parsers)

언어 모델은 텍스트를 출력합니다. 하지만 많은 경우 단순한 텍스트보다 더 구조화된 정보를 반환하고 싶을 수 있습니다. 이때 출력 파서가 필요합니다.

출력 파서는 언어 모델 응답을 구조화하는 데 도움이 되는 클래스입니다. 출력 파서가 구현해야 하는 두 가지 주요 메서드가 있습니다:
- "형식 지침 가져오기(Get format instructions)": 언어 모델의 출력 형식을 지정하는 방법에 대한 지침이 포함된 문자열을 반환하는 메서드입니다.
- "파싱(Parse)": 문자열(언어 모델의 응답으로 가정)을 받아 특정 구조로 구문 분석하는 메서드입니다.

그리고 하나의 옵션이 있습니다:
- "Parse with prompt": 문자열(언어 모델의 응답으로 가정)과 프롬프트(해당 응답을 생성한 프롬프트로 가정)을 받아 특정 구조로 파싱하는 메서드입니다. 프롬프트는 주로 출력 파서가 어떤 식으로든 출력을 다시 시도하거나 수정하려는 경우에 제공되며, 이를 위해 프롬프트의 정보가 필요합니다.

<br>

# 검색(Retrieval)

많은 LLM 애플리케이션에는 모델 학습 세트의 일부가 아닌 사용자별 데이터가 필요합니다. 이를 달성하는 주요 방법은 검색 증강 생성(RAG)입니다. 이 프로세스에서는 외부 데이터를 검색한 다음 생성 단계를 수행할 때 LLM으로 전달합니다.

LangChain은 간단한 것부터 복잡한 것까지 RAG 애플리케이션을 위한 모든 빌딩 블록을 제공합니다. 이 문서 섹션에서는 데이터 가져오기 등 검색 단계와 관련된 모든 것을 다룹니다. 간단해 보이지만 미묘하게 복잡할 수 있습니다. 여기에는 몇 가지 핵심 모듈이 포함됩니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/21b3c3e9-11bf-41a0-83ab-7be884d6045d">
</p>

<br>

### 문서 로더(Document loaders)

**문서 로더**는 다양한 소스에서 문서를 로드합니다. LangChain은 100가지가 넘는 다양한 문서 로더를 제공할 뿐만 아니라 AirByte 및 Unstrctured와 같은 다른 주요 공급자와의 통합을 제공합니다. LangChain은 모든 유형의 위치(비공개 S3 버킷, 공개 웹사이트)에서 모든 유형의 문서(HTML, PDF, 코드)를 로드할 수 있는 통합 기능을 제공합니다.

<br>

### 문서 변환기(Document transforemrs)

검색의 핵심은 문서의 관련 부분만 가져오는 것입니다. 여기에는 검색을 위해 문서를 준비하기 위한 몇 가지 변환 단계가 포함됩니다. 여기서 가장 중요한 단계 중 하나는 큰 문서를 작은 덩어리로 분할(또는 청크)하는 것입니다. LangChain은 이를 위한 몇 가지 변환 알고리즘과 특정 문서 유형(코드, 마크다운 등)에 최적화된 로직을 제공합니다.

<br>

### 텍스트 임베딩 모델(Text embedding models)

검색의 또 다른 핵심 부분은 문서에 대한 임베딩을 생성하는 것입니다. 임베딩은 텍스트의 의미론적 의미를 포착하여 유사한 텍스트의 다른 부분을 빠르고 효율적으로 찾을 수 있게 해줍니다. LangChain은 오픈 소스에서 독점 API에 이르기까지 25개 이상의 다양한 임베딩 공급자 및 방법과의 통합을 제공하므로 필요에 가장 적합한 것을 선택할 수 있습니다. LangChain은 표준 인터페이스를 제공하므로 모델 간에 쉽게 교체할 수 있습니다.

<br>

### 벡터 스토어(Vector stores)

임베딩이 증가함에 따라 이러한 임베딩의 효율적인 저장과 검색을 지원하는 데이터베이스의 필요성이 대두되었습니다. LangChain은 오픈소스 로컬 스토어부터 클라우드 호스팅 독점 스토어까지 50개 이상의 다양한 벡터 스토어와의 통합을 제공하여 사용자의 요구에 가장 적합한 것을 선택할 수 있습니다. LangChain은 표준 인터페이스를 제공하므로 벡터 스토어 간에 쉽게 교체할 수 있습니다.

<br>

### 리트리버(Retrievers)

데이터가 데이터베이스에 저장된 후에도 데이터를 검색해야 합니다. LangChain은 다양한 검색 알고리즘을 지원하며, 이는 LangChain이 가장 큰 가치를 부여하는 부분 중 하나입니다. LangChain은 시작하기 쉬운 기본 방법, 즉 간단한 시맨틱 검색을 지원합니다. 하지만 그 위에 성능을 향상시키기 위한 알고리즘 모음을 추가했습니다. 여기에는 다음이 포함됩니다:
- 상위 문서 리트리버(Parent Document Retriever): 이 기능을 사용하면 상위 문서당 여러 개의 임베딩을 생성할 수 있어 작은 청크를 조회할 수 있지만 더 큰 컨텍스트를 반환할 수 있습니다.
- 셀프 쿼리 리트리버(Self Query Retriever): 사용자 질문에는 단순한 시맨틱이 아니라 메타데이터 필터로 가장 잘 표현할 수 있는 논리를 표현하는 참조가 포함되어 있는 경우가 많습니다. 셀프 쿼리를 사용하면 쿼리에 존재하는 다른 메타데이터 필터로부터 쿼리의 의미론적 부분을 파싱할 수 있습니다.
- 앙상블 리트리버(Ensemble Retriever): 여러 개의 다른 소스에서 또는 여러 개의 다른 알고리즘을 사용하여 문서를 검색하고 싶을 때가 있습니다. 앙상블 리트리버를 사용하면 이 작업을 쉽게 수행할 수 있습니다.

<br>

### 인덱싱(Indexing)

LangChain **인덱싱 API**는 모든 소스의 데이터를 벡터 저장소로 동기화하여 사용자를 도와줍니다:
- 벡터 저장소에 중복된 콘텐츠 작성 방지
- 변경되지 않은 콘텐츠 재작성 방지
- 변경되지 않은 콘텐츠에 대한 임베딩 재작성 방지

이 모든 기능을 통해 시간과 비용을 절약할 수 있을 뿐만 아니라 벡터 검색 결과도 개선할 수 있습니다.

<br>

# 에이전트(Agents)

에이전트의 핵심 아이디어는 언어 모델을 사용하여 수행할 작업 순서를 선택하는 것입니다. 체인에서는 일련의 작업 순서가 코드에 하드코딩됩니다. 에이전트에서는 언어 모델이 추론 엔젠으로 사용되어 어떤 작업을 어떤 순서로 수행할지 결정합니다.

여기에는 몇 가지 핵심 구성 요소가 있습니다:

<br>

### 에이전트(Agents)

다음에 수행할 단계를 결정하는 체인입니다. 이는 언어 모델과 프롬프트에 의해 구동됩니다. 이 체인의 입력은 다음과 같습니다:
1. 도구(Tools): 사용 가능한 도구에 대한 설명
2. 사용자 입력(User input): 높은 수준의 목표
3. 중간 단계(Intermediate steps): 사용자 입력을 달성하기 위해 이전에 실행된 모든(작업, 도구 출력) 쌍입니다.

출력은 다음에 수행할 작업이나 사용자에게 보낼 최종 응답(`AgentAction`s 또는 `AgentFinish`)입니다. 작업은 도구와 해당 도구에 대한 입력을 지정합니다.

에이전트마다 추론을 위한 프롬프트 스타일, 입력을 인코딩하는 방식, 출력을 구문 분석하는 방식이 서로 다릅니다. **사용자 지정 에이전트를 쉽게 구축**할 수도 있습니다.

<br>

### 도구(Tools)

도구는 에이전트가 호출할 수 있는 기능입니다. 도구와 관련하여 두 가지 중요한 디자인 고려 사항이 있습니다:
1. 에이전트에게 적절한 도구에 대한 엑세스 권한 부여
2. 에이전트에게 가장 도움이 되는 방식으로 툴을 설명하기

이 두 가지를 모두 고려하지 않으면 제대로 작동하는 에이전트를 구축할 수 없습니다. 에이전트에게 올바른 도구 세트에 대한 엑세스 권한을 부여하지 않으면 에이전트가 부여한 목표를 결코 달성할 수 없습니다. 도구를 잘 설명하지 않으면 에이전트는 도구를 올바르게 사용하는 방법을 모르게 됩니다.

LangChain은 다양한 기본 제공 도구 세트를 제공할 뿐만 아니라 사용자 정의 설명을 포함하여 자신만의 도구를 쉽게 정의할 수 있습니다.

<br>

### 툴킷(Toolkits)

많은 일반적인 작업의 경우, 에이전트에게는 관련 도구 세트가 필요합니다. 이를 위해 LangChain은 특정 목표를 달성하는 데 필요한 약 3~5개의 도구 그룹인 툴킷이라는 개념을 제공합니다. 예를 들어, GitHub 툴킷에는 GitHub 이슈를 검색하는 도구, 파일을 읽는 도구, 댓글을 다는 도구 등이 있습니다.

LangChain은 시작하기 위한 다양한 툴킷 세트를 제공합니다.

<br>

### 에이전트 실행기(AgentExecutor)

에이전트 실행기는 에이전트의 런타임입니다. 실제로 에이전트를 호출하고, 선택한 작업을 실행하고, 작업 출력을 다시 에이전트에게 전달하고, 반복하는 역할을 합니다. 수도코드에서는 대략 다음과 같이 보입니다.

```
next_action = agent.get_action(...)
while next_action != AgentFinish:
    observation = run(next_action)
    next_action = agent.get_action(..., next_action, observation)
return next_action
```

간단해 보이지만 이 런타임이 처리하는 몇 가지 복잡성이 있습니다:
1. 에이전트가 존재하지 않는 툴을 선택하는 경우 처리하기
2. 도구가 오류를 일으키는 경우 처리
3. 에이전트가 도구 호출로 파싱할 수 없는 출력을 생성하는 경우 처리하기
4. 모든 수준(에이전트 결정, 도구 호출)에서의 로깅 및 관찰 가능성을 stdout 및/또는 LangSmith에 제공합니다.

<br>

# 체인(Chains)

간단한 애플리케이션의 경우 LLM을 단독으로 사용하는 것도 괜찮지만, 더 복잡한 애플리케이션의 경우 서로 다른 컴포넌트와 함께 LLM을 연결해야 합니다.

LangChain은 컴포넌트 "체이닝(chaining)"을 위한 두 가지 높은 수준의 프레임워크를 제공합니다. 레거시 접근 방식은 `Chain` 인터페이스를 사용하는 것입니다. 업데이트된 접근 방식은 Langchain 표현식 언어(LCEL)를 사용하는 것입니다. 새 애플리케이션을 구축할 때는 체인 구성에 LCEL을 사용한 것이 좋습니다. 하지만 저희가 계속 지원하는 유용한 기본 제공 체인도 많기 때문에 여기에서는 두 가지 프레임워크를 모두 문서화합니다. 아래에서 설명하겠지만, 체인은 LCEL에서도 사용할 수 있으므로 두 프레임워크는 상호 배타적이지 않습니다.

## LCEL

LCEL의 가장 눈에 띄는 부분은 직관적이고 가독성 있는 구성 구문을 제공한다는 점입니다. 하지만 그보다 더 중요한 것은 다음과 같은 기능을 최고 수준으로 지원한다는 점입니다:
- streaming
- async calls
- batching
- parallelization
- retries
- fallbacks
- tracing
- ...

간단하고 일반적인 예로 프롬프트, 모델 및 출력 구문 분석기를 결합하는 것이 어떤 것인지 살펴볼 수 있습니다:

```
from langchain.chat_models import ChatAnthropic
from langchain.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser

model = ChatAnthropic()
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You're a very knowledgeable historian who provides accurate and eloquent answers to historical questions.",
        ),
        ("human", "{question}"),
    ]
)
runnable = prompt | model | StrOutputParser()
```

```
for chunk in runnable.stream({"question": "How did Mansa Musa accumulate his wealth?"}):
    print(chunk, end="", flush=True)
```

```
 Mansa Musa was the emperor of the Mali Empire in West Africa during the 14th century. He accumulated immense wealth through several means:

- Gold mining - Mali contained very rich gold deposits, especially in the region of Bambuk. Gold mining and gold trade was a major source of wealth for the empire.

- Control of trade routes - Mali dominated the trans-Saharan trade routes connecting West Africa to North Africa and beyond. By taxing the goods that passed through its territory, Mali profited greatly.

- Tributary states - Many lands surrounding Mali paid tribute to the empire. This came in the form of gold, slaves, and other valuable resources.

- Agriculture - Mali also had extensive agricultural lands irrigated by the Niger River. Surplus food produced could be sold or traded. 

- Royal monopolies - The emperor claimed monopoly rights over the production and sale of certain goods like salt from the Taghaza mines. This added to his personal wealth.

- Inheritance - As an emperor, Mansa Musa inherited a wealthy state. His predecessors had already consolidated lands and accumulated riches which fell to Musa.

So in summary, mining, trade, taxes,
```

<br>

## [Legacy] `Chain` interface

**체인**은 "체인드(chained)" 애플리케이션을 위한 레거시 인터페이스입니다. 우리는 체인을 매우 일반적으로 다른 체인을 포함할 수 있는 구성 요소에 대한 호출 시퀀스로 정의합니다. 기본 인터페이스는 간단합니다:

```
class Chain(BaseModel, ABC):
    """Base interface that all chains should implement."""

    memory: BaseMemory
    callbacks: Callbacks

    def __call__(
        self,
        inputs: Any,
        return_only_outputs: bool = False,
        callbacks: Callbacks = None,
    ) -> Dict[str, Any]:
        ...
```

위에서 만든 LCEL 실행 가능 컴포넌트를 내장된 `LLMChain`을 사용하여 다시 만들 수 있습니다:

```
from langchain.chains import LLMChain

chain = LLMChain(llm=model, prompt=prompt, output_parser=StrOutputParser())
chain.run(question="How did Mansa Musa accumulate his wealth?")
```

```
" Mansa Musa was the emperor of the Mali Empire in West Africa in the early 14th century. He accumulated his vast wealth through several means:\n\n- Gold mining - Mali contained very rich gold deposits, especially in the southern part of the empire. Gold mining and trade was a major source of wealth.\n\n- Control of trade routes - Mali dominated the trans-Saharan trade routes connecting West Africa to North Africa and beyond. By taxing and controlling this lucrative trade, Mansa Musa reaped great riches.\n\n- Tributes from conquered lands - The Mali Empire expanded significantly under Mansa Musa's rule. As new lands were conquered, they paid tribute to the mansa in the form of gold, salt, and slaves.\n\n- Inheritance - Mansa Musa inherited a wealthy empire from his predecessor. He continued to build the wealth of Mali through the factors above.\n\n- Sound fiscal management - Musa is considered to have managed the empire and its finances very effectively, including keeping taxes reasonable and promoting a robust economy. This allowed him to accumulate and maintain wealth.\n\nSo in summary, conquest, trade, taxes, mining, and inheritance all contributed to Mansa Musa growing the M"
```

<br>

# 메모리(Memory)

대부분의 LLM 애플리케이션에는 대화형 인터페이스가 있습니다. 대화의 필수 구성 요소는 대화의 앞부분에 소개된 정보를 참조할 수 있는 기능입니다. 최소한 대화형 시스템은 과거 메시지의 일부 창에 직접 엑세스할 수 있어야 합니다. 더 복잡한 시스템이라면 지속적으로 업데이트하는 세계 모델이 있어야 개체와 개체 간의 관계에 대한 정보를 유지하는 등의 작업을 수행할 수 있습니다.

우리는 과거 상호작용에 대한 정보를 저장하는 이 기능을 "메모리"라고 부릅니다. LangChain은 시스템에 메모리를 추가하기 위한 많은 유틸리티를 제공합니다. 이러한 유틸리티는 단독으로 사용하거나 체인에 원활하게 통합할 수 있습니다.

메모리 시스템은 읽기와 쓰기라는 두 가지 기본 작업을 지원해야 합니다. 모든 체인은 특정 입력을 기대하는 몇 가지 핵심 실행 로직을 정의한다는 점을 기억하세요. 이러한 입력 중 일부는 사용자가 직접 제공하지만, 일부는 메모리에서 제공될 수도 있습니다. 체인은 주어진 실행에서 메모리 시스템과 두 번 상호작용합니다.

1. 체인은 초기 사용자 입력을 받은 후 핵심 로직을 실행하기 전에 메모리 시스템에서 읽고 사용자 입력을 보강합니다.
2. 핵심 로직을 실행한 후 답을 반환하기 전에 체인은 현재 실행의 입력과 출력을 메모리에 써서 향후 실행에서 참조할 수 있도록 합니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d109e648-d65d-47c7-ac56-77f7cb174b89">
</p>

<br>

## 시스템에 메모리 구축하기

모든 메모리 시스템에서 핵심적인 설계 결정은 두 가지입니다:
- 상태 저장 방법
- 상태를 쿼리하는 방법

<br>

### 저장(Storing): 채팅 메시지 목록

모든 메모리의 기본은 모든 채팅 상호작용의 기록입니다. 이러한 기록이 모두 직접 사용되지는 않더라도 어떤 형태로든 저장되어야 합니다. LangChain 메모리 모듈의 핵심 부분 중 하나는 인메모리 목록에서 영구 데이터베이스에 이르기까지 이러한 채팅 메시지를 저장하기 위한 일련의 통합입니다.

- 채팅 메시지 저장소: 채팅 메시지로 작업하는 방법과 제공되는 다양한 통합 기능

<br>

### 쿼리(Querying): 채팅 메시지 상단의 데이터 구조 및 알고리즘

채팅 메시지 목록을 보관하는 것은 매우 간단합니다. 그보다 덜 간단한 것은 채팅 메시지 위에 구축된 데이터 구조와 알고리즘을 가장 유용한 메시지 보기를 제공하는 것입니다.

아주 단순한 메모리 시스템은 실행할 때마다 가장 최근의 메시지를 반환할 수 있습니다. 조금 더 복잡한 메모리 시스템은 과거 K개의 메시지에 대한 간결한 요약을 반환할 수도 있습니다. 훨씬 더 정교한 시스템은 저장된 메시지에서 엔티티를 추출하고 현재 실행에서 참조된 엔티티에 대한 정보만 반환할 수 있습니다.

애플리케이션마다 메모리 쿼리 방식에 대한 요구 사항이 다를 수 있습니다. 메모리 모듈을 사용하면 간단한 메모리 시스템을 쉽게 시작할 수 있고, 필요한 경우 사용자 지정 시스템을 직접 작성할 수도 있습니다.

<br>

## 콜백(Callbacks)

LangChain은 LLM 애플리케이션의 다양한 단계에 연결할 수 있는 콜백 시스템을 제공합니다. 이는 로깅, 모니터링, 스트리밍 및 기타 작업에 유용합니다.

API 전체에서 사용할 수 있는 `callbacks` 인수를 사용하여 이러한 이벤트를 구독할 수 있습니다. 이 인수는 아래에서 자세히 설명하는 메서드 중 하나 이상을 구현할 것으로 예상되는 핸들러 객체의 목록입니다.

<br>

### 콜백 핸들러(Callback handlers)

`CallbackHandlers`는 구독할 수 있는 각 이벤트에 대한 메서드가 있는 `CallbackHandler` 인터페이스를 구현하는 객체입니다. `CallbackManager`는 이벤트가 트리거될 때 각 핸들러에서 적절한 메서드를 호출합니다.

```
class BaseCallbackHandler:
    """Base callback handler that can be used to handle callbacks from langchain."""

    def on_llm_start(
        self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
    ) -> Any:
        """Run when LLM starts running."""

    def on_chat_model_start(
        self, serialized: Dict[str, Any], messages: List[List[BaseMessage]], **kwargs: Any
    ) -> Any:
        """Run when Chat Model starts running."""

    def on_llm_new_token(self, token: str, **kwargs: Any) -> Any:
        """Run on new LLM token. Only available when streaming is enabled."""

    def on_llm_end(self, response: LLMResult, **kwargs: Any) -> Any:
        """Run when LLM ends running."""

    def on_llm_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> Any:
        """Run when LLM errors."""

    def on_chain_start(
        self, serialized: Dict[str, Any], inputs: Dict[str, Any], **kwargs: Any
    ) -> Any:
        """Run when chain starts running."""

    def on_chain_end(self, outputs: Dict[str, Any], **kwargs: Any) -> Any:
        """Run when chain ends running."""

    def on_chain_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> Any:
        """Run when chain errors."""

    def on_tool_start(
        self, serialized: Dict[str, Any], input_str: str, **kwargs: Any
    ) -> Any:
        """Run when tool starts running."""

    def on_tool_end(self, output: str, **kwargs: Any) -> Any:
        """Run when tool ends running."""

    def on_tool_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> Any:
        """Run when tool errors."""

    def on_text(self, text: str, **kwargs: Any) -> Any:
        """Run on arbitrary text."""

    def on_agent_action(self, action: AgentAction, **kwargs: Any) -> Any:
        """Run on agent action."""

    def on_agent_finish(self, finish: AgentFinish, **kwargs: Any) -> Any:
        """Run on agent end."""
```
