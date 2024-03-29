---
title: "[BI] 비즈니스 인텔리전스(Business intelligence, BI)"
categories:
  - Data Science
tags:
  - Business
  - Data Science
toc: true
toc_sticky: true
toc_label: "비즈니스 인텔리전스(Business intelligence, BI)"
toc_icon: "sticky-note"
---

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7871c564-d7f6-4c1f-866c-2b32eeb9fc90">
</p>

**비즈니스 인텔리전스(BI)** 는 기술을 사용하여 데이터를 분석하고 실행 가능한 인사이트로 변환하는 것을 말합니다. 조직의 데이터는 다양한 내부 및 외부 소스에서 제공되며, 여기에는 자체 소스뿐만 아니라 타사 소스도 포함됩니다. 차트, 히트 맵, 추세선, 상태 보고서와 같이 데이터를 보다 이해하기 쉬운 형식으로 표시합니다. 이러한 데이터 시각화는 실시간으로 비효율적인 부분과 기회를 강조합니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d7fe6e1a-07a1-4a06-891d-71e7bcbf96a2">
</p>

비즈니스 인텔리전스의 전 과정은 크게 5단계로 나눌 수 있습니다.

1.	**데이터 수집(Data gathering)** 에는 외부(예: 시장 데이터 공급자, 산업 분석 등) 또는 내부(Google Analytics, CRM, ERP 등)와 같은 다양한 소스에서 정보를 수집하는 것이 포함됩니다.
2.	**데이터 클리닝/표준화(Data cleaning/standardization)** 란 수집된 데이터를 데이터 품질 검증, 일관성 확보 등을 통해 분석할 수 있도록 준비하는 것을 의미합니다.
3.	**데이터 저장(Data storage)** 은 데이터 웨어하우스(data warehouse)에 데이터를 적재하고 추후 사용을 위해 저장하는 것을 말합니다.
4.	**데이터 분석(Data analysis)** 은 실제로 다양한 정량적 및 정성적 분석 기법을 적용하여 원시 데이터를 가치 있고 실행 가능한 정보로 바꾸는 자동화된 프로세스입니다.
5.	**보고(Reporting)** 에는 대시보드, 그래픽 이미지 또는 사용자가 상호 작용하거나 실행 가능한 통찰력을 추출할 수 있는 분석 결과의 가독성 있는 시각적 표현을 생성하는 것이 포함됩니다.

<br>

## 1.	비즈니스 인텔리전스 아키텍처

-	데이터 소스(Data source)
-	ETL(Extract, Transform, Load) 또는 데이터 통합 도구
-	데이터 웨어하우스(Data warehouse)
-	온라인 분석 처리(Online Analytical Processing, OLAP) 큐브
-	데이터 마트(Data marts)
-	BI 툴

<br>

### 1.1. ETL

**ETL**(Extract, Transform, Load) 또는 **데이터 통합 툴**은 초기 소스의 원시 데이터를 전처리하여 3단계에 걸쳐 연속적으로 웨어하우스로 전송합니다.

1.	**데이터 추출**: ETL 툴은 ERP, CRM, 스프레드시트 등의 데이터 소스에서 데이터를 검색합니다.
2.	**데이터 변환**: 추출이 완료되면 ETL 툴이 데이터 처리를 시작합니다. 추출된 모든 데이터를 분석하고 중복을 제거합니다. 나머지 데이터는 표준화, 정렬, 필터링, 검증 과정을 거칩니다.
3.	**데이터 로딩**: 이 단계에서는 변환된 데이터가 웨어하우스에 업로드됩니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e8782abe-ef5b-46e3-b967-73400409bd6b">
</p>

일반적으로 ETL 툴은 BI 툴과 함께 기본으로 제공됨

<br>

### 1.2. 데이터 웨어하우스

선택한 소스에서 데이터 전송을 구성한 후에는 데이터 웨어하우스를 설정해야 합니다. 비즈니스 인텔리전스에서 데이터 웨어하우스는 일반적으로 기록 정보를 표 형식으로 저장하는 특정 유형의 데이터베이스를 말합니다. 웨어하우스는 한쪽에서는 데이터 소스 및 ETL 시스템과 연결되고, 다른 쪽에서는 보고 도구 또는 대시보드 인터페이스와 연결됩니다. 이를 통해 다양한 시스템과의 데이터를 단일 인터페이스를 통해 표시할 수 있습니다.

<p align="center">
  <img src="://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5cc06308-9c85-4896-862a-4661c5766dfd">
</p>

그러나 웨어하우스에는 일반적으로 100GB 이상의 정보가 포함되어 있기 때문에 쿼리에 대한 응답 속도가 당연히 느려집니다. 경우에 따라서는 데이터가 비정형 또는 반정형 데이터로 저장되어 있어 보고서를 생성하기 위해 데이터를 파싱할 때 오류율이 높을 수 있습니다. 분석에서는 사용하기 쉽도록 특정 유형의 데이터를 하나의 저장 공간에 그룹화해야 할 수도 있습니다. 그렇기 때문에 더 작고 주제별 정보 덩어리에 더 빠르게 액세스할 수 있도록 추가 기술을 사용합니다.

데이터 양이 많지 않다면 간단한 SQL 웨어하우스를 활용하는 것으로 충분합니다. 데이터 마트와 같은 추가적인 구조적 요소는 아무런 가치도 제공하지 않으면서 많은 비용을 초래합니다.

<br>

### 1.3. 데이터 웨어하우스 + OLAP 큐브

웨어하우스에 저장되는 데이터는 일반적으로 스프레드시트 형식(테이블과 행)으로 표시되므로 두 가지 차원을 갖습니다. 웨어하우스가 데이터를 저장하는 방식을 관계형 데이터베이스라고도 합니다. 하나의 데이터베이스에 수천 개의 데이터 유형이 포함될 수 있으므로 데이터 웨어하우스를 쿼리 하는 데 상당한 시간이 걸립니다. 데이터가 빠르게 액세스하고 다양한 차원에서 데이터를 분석하고, 필요할 떄마다 그 룹화하려는 분석가의 요구를 충족하기 위해 OLAP 큐브가 사용됩니다.

OLAP 또는 온라인 분석처리는 여러 차원의 데이터를 동시에 분석하고 표현하는 기술입니다. OLAP 큐브에서 데이터를 구조화하면 데이터 웨어하우스의 한계를 극복하는 데 도움이 됩니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/71155aeb-3172-48c1-a799-b4075dff6390">
</p>

OLAP 큐브는 SQL 데이터베이스(웨어하우스)의 데이터를 빠르게 분석하는 데 최적화된 데이터 구조입니다. 큐브는 데이터 웨어하우스의 데이터를 축소하여 표현한 것입니다. 하지만 데이터의 구조는 2개 이상의 차원(스프레드시트의 행과 열 형식)이 있다고 가정합니다. 차원은 보고서를 구성하는 중요한 요소 입니다.

큐브는 다양한 방식으로 정보를 그룹화하고 보고서를 더 빠르게 작성할 수 있도록 조정할 수 있는 다차원 정보 데이터베이스를 형성합니다. 큐브는 상대적으로 적은 양의 데이터를 저장하고 처리 편의를 위해 사용되므로 웨어하우스와 OLAP을 함께 사용합니다.

<br>

### 1.4. 데이터 웨어하우스 + 데이터 마트

데이터 웨어하우스는 비즈니스 인텔리전스 아키텍처의 가장 큰 요소입니다. 웨어하우스 데이터 집합의 더 작은 표현은 특정 주제 영역 전용 정보를 수집하는 데이터 마트입니다. 데이터 마트의 도움으로 각 부서에서 필요한 데이터에 액세스할 수 있습니다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/be2f6ce3-d2b1-4e75-8ea0-26ea2e17e51a">
</p>

<br>

### 1.5. 하이브리드 아키텍처 (데이터 웨어하우스 + 데이터 마트 + OLAP 큐브)

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4d81f440-17a9-4107-bec9-972b419d5796">
</p>
