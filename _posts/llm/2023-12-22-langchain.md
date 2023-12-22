---
title: "[LangChain] LangChain(LangChain)"
categories:
  - Python
tags:
  - LangChain
toc: true
toc_sticky: true
toc_label: "LangChain(LangChain)"
toc_icon: "sticky-note"
---

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/70b80184-b2ca-405e-ac4b-92a088b5970b">
</p>

**LangChain**은 언어 모델로 구동되는 애플리케이션을 개발하기 위한 프레임워크입니다. 다음과 같은 애플리케이션을 구현할 수 있습니다:
- **컨텍스트 인식(Are context-aware)**: 언어 모델을 컨텍스트 소스(프롬프트 지침, 몇 가지 예시, 응답의 근거가 되는 콘텐츠 등)에 연결합니다
- **추론(Reason)**: 언어 모델에 의존하여 추론(제공된 컨텍스트에 따라 답변하는 방법, 취해야 할 조치 등)

이 프레임워크는 여러 부분으로 구성됩니다.
- **LangChain Libraries**: 파이썬과 자바스크립트 라이브러리. 수많은 구성 요소에 대한 인터페이스와 통합, 이러한 구성 요소를 체인 및 에이전트로 결합하기 위한 기본 런타임, 체인 및 에이전트의 상용 구현이 포함되어 있습니다.
- **LangChain Templates**: 다양한 작업을 위해 쉽게 배포할 수 있는 참조 아키텍처 모음입니다.
- **LangServe**: LangChain 체인을 REST API로 배포하기 위한 라이브러리.
- **LangSmith**: 모든 LLM 프레임워크에 구축된 체인을 디버그, 테스트, 평가, 모니터링할 수 있는 개발자 플랫폼으로 LangChain과 원활하게 통합됩니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/440b7403-4b16-452b-8cc9-d8db1f3ed13b"><br>
  <em>LangChain 다이어그램</em>
</p>

이러한 제품을 함께 사용하면 전체 애플리케이션 라이프사이클을 간소화할 수 있습니다:

- **개발(Develop)**: LangChain/LangChain.js로 애플리케이션을 작성하세요. 참조용 템플릿을 사용하여 바로 실행하세요.
- **프로덕션화(Productionize)**: LangSmith를 사용하여 체인을 검사, 테스트 및 모니터링하여 지속적으로 개선하고 자신 있게 배포할 수 있습니다.
- **배포(Deploy)**: LangServe로 모든 체인을 API로 전환하세요.

### LangChain Libraries

LangChain 패키지의 main value props은 다음과 같습니다:
- **Components**: 언어 모델 작업을 위한 구성 가능한 도구 및 통합. 구성 요소는 모듈식으로 되어 있으며, 나머지 LangChain 프레임워크의 사용 여부와 관계없이 쉽게 사용할 수 있습니다.
- Off-the-shelf chains: 더 높은 수준의 작업을 수행하기 위한 구성 요소의 기본 제공 어셈블리

Off-the-shelf chains을 사용하면 쉽게 시작할 수 있습니다. 구성 요소를 사용하면 기존 체인을 쉽게 사용자 정의하고 새로운 체인을 구축할 수 있습니다.

LangChain 라이브러리 자체는 여러 가지 패키지로 구성되어 있습니다.
- `langchain-core`: Base abstractions and LangChain Expression Language.
- `langchain-community`: Third party integrations.
- `langchain`: 애플리케이션의 인지 아키텍처를 구성하는 체인(chain), 에이전트(agents), 검색 전략(retrieval strategies).

<br>

### LangChain Expression Language (LCEL)

LCEL은 체인을 구성하는 선언적 방식입니다. LCEL은 첫날부터 가장 간단한 "프롬프트 + LLM" 체인부터 가장 복잡한 체인까지 코드 변경 없이 프로토타입을 생산에 투입할 수 있도록 지원하기 위해 설계되었습니다.

- 개요: LCEL과 그 장점
- 인터페이스: LCEL 객체를 위한 표준 인터페이스
- 사용 방법: LCEL의 주요 기능
- 쿡북: 일반적인 작업 수행을 위한 코드 예제

### 모듈(Modules)

LangChain은 다음 모듈을 위한 확장 가능한 표준 인터페이스와 통합을 제공합니다:
- 모델 I/O: 언어 모델과의 인터페이스
- 검색: 애플리케이션별 데이터와의 인터페이스
- 에이전트: 상위 수준 지시어가 주어지면 모델이 어떤 도구를 사용할지 선택할 수 있습니다.

### 예제, 에코시스템 및 리소스

**사용 사례**: 다음과 같은 일반적인 엔드투엔드 사용 사례에 대한 워크스루와 기법을 제공합니다:
- 문서 질문 답변
- 챗봇
- 구조화된 데이터 분석
- ...

**통합**: LangChain은 당사 프레임워크와 통합되어 그 위에 구축되는 풍부한 도구 생태계의 일부입니다. 점점 늘어나는 통합 목록을 확인하세요.

**가이드**: LangChain으로 개발하기 위한 모범 사례.

**API 참조**: 참조 섹션으로 이동하여 LangChain 및 LangChain 실험용 파이썬 패키지의 모든 클래스와 메서드에 대한 전체 문서를 확인하세요.

**개발자 가이드**: 개발자 가이드에서 기여에 대한 가이드라인과 개발자 환경 설정에 대한 도움을 확인하세요.

**커뮤니티**: 커뮤니티 내비게이터로 이동하여 질문하고, 피드백을 공유하고, 다른 개발자들을 만나고, LLM의 미래를 꿈꿀 수 있는 장소를 찾아보세요.
