---
title: "[Introduction to LLMs and the generative AI project lifecycle] Generative AI & LLM"
categories:
  - Generative AI with Large Language Models
tags:
  - Coursera
  - Generative AI with Large Language Models
toc: true
toc_sticky: true
toc_label: "Generative AI & LLM"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0abd4037-b960-49f7-8e43-a264ef42a0f7){: width="50%" height="50%"}{: .align-center}

<br><br>

# Generative AI

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/477fe405-c6c0-42ca-afa7-949ce75ebe7b" align="center" width="32%">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/67e5cd70-efe5-4325-8d0b-909001d64a00" align="center" width="32%">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4781bb66-cb33-4753-aa3f-8ccb3623b55b" align="center" width="32%">
</p>


대규모 언어 모델과 그 사용 사례, 모델의 작동 방식, 프롬프트 엔지니어링, 창의적인 텍스트 출력을 만드는 방법, 생성형 AI 프로젝트의 프로젝트 라이프사이클에 대해 설명하겠습니다. 이 과정에 관심이 있으시다면 제너레이티브 AI 도구를 사용해 보셨거나 사용해 보고 싶으신 분이라고 봐도 무방할 것 같습니다. 채팅 봇이든, 텍스트에서 이미지를 생성하든, 코드 개발에 도움이 되는 플러그인을 사용하든, 이러한 도구에서 볼 수 있는 것은 인간의 능력을 모방하거나 근사한 콘텐츠를 만들 수 있는 기계입니다. 제너레이티브 AI는 기존 머신 러닝의 하위 집합입니다. 그리고 제너레이티브 AI를 뒷받침하는 머신 러닝 모델은 원래 사람이 생성한 방대한 콘텐츠 데이터 세트에서 통계적 패턴을 찾아내어 이러한 능력을 학습했습니다.

<br>

# Large Language Models

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bed3a564-5365-43a1-93ca-6b91f554037c)

대규모 언어 모델은 수조 개의 단어에 대해 수 주에서 수개월에 걸쳐 대량의 컴퓨팅 성능으로 학습되었습니다. 수십억 개의 매개변수가 포함된 이러한 기초 모델은 언어 그 이상의 새로운 속성을 보여주며, 연구자들은 복잡한 작업을 분석하고, 추론하고, 문제를 해결할 수 있는 능력을 발견하고 있습니다.

다음은 기본 모델이라고도 하는 기초 모델 모음과 매개변수 측면에서 상대적인 크기를 나타냅니다. 나중에 이러한 매개변수에 대해 좀 더 자세히 다루겠지만, 지금은 모델의 메모리라고 생각하시면 됩니다. 모델에 매개변수가 많을수록 더 많은 메모리가 필요하며, 결과적으로 모델이 수행할 수 있는 작업도 더 정교해집니다.

이 강좌에서는 이 보라색 원으로 LLM을 나타내며, 실습에서는 특정 오픈 소스 모델인 flan-T5를 사용하여 언어 작업을 수행하게 됩니다. 이러한 모델을 그대로 사용하거나 미세 조정 기술을 적용하여 특정 사용 사례에 맞게 조정하면 새 모델을 처음부터 학습시킬 필요 없이 맞춤형 솔루션을 빠르게 구축할 수 있습니다. 이미지, 비디오, 오디오, 음성 등 다양한 양식에 대한 제너레이티브 AI 모델이 만들어지고 있지만, 이 과정에서는 대규모 언어 모델과 자연어 생성에 사용되는 모델에 중점을 둡니다. 이러한 모델이 어떻게 구축되고 학습되는지, 프롬프트라는 텍스트를 통해 모델과 상호 작용하는 방법을 살펴봅니다. 또한 사용 사례와 데이터에 맞게 모델을 미세 조정하는 방법과 비즈니스 및 소셜 작업을 해결하기 위해 애플리케이션과 함께 배포하는 방법도 알아봅니다. 언어 모델과 상호 작용하는 방식은 다른 머신 러닝 및 프로그래밍 패러다임과는 상당히 다릅니다. 이러한 경우 라이브러리 및 API와 상호 작용하기 위해 정형화된 구문으로 컴퓨터 코드를 작성합니다.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/39b0c4d0-e8f3-4e6a-8532-8510f0f50ca9)

이와는 대조적으로 대규모 언어 모델은 자연어 또는 사람이 작성한 지침을 받아 사람이 하는 것처럼 작업을 수행할 수 있습니다. LLM에 전달하는 텍스트를 **프롬프트**라고 합니다. 프롬프트에 사용할 수 있는 공간 또는 메모리를 **컨텍스트 창**이라고 하며, 일반적으로 수천 단어가 들어갈 수 있을 만큼 충분히 크지만 모델마다 다릅니다.

이 예에서는 모델에 태양계에서 가니메데의 위치를 확인하도록 요청합니다. 프롬프트가 모델에 전달되면 모델은 다음 단어를 예측하고, 프롬프트에 질문이 포함되어 있으므로 이 모델은 답을 생성합니다. 모델의 출력을 **완성**이라고 하며, 모델을 사용하여 텍스트를 생성하는 행위를 **추론**이라고 합니다. 완성은 원래 프롬프트에 포함된 텍스트와 생성된 텍스트로 구성됩니다. 이 모델이 질문에 대한 답변을 잘 수행했음을 알 수 있습니다. 이 모델은 가니메데가 목성의 위성임을 정확하게 식별하고, 이 위성이 목성의 궤도 내에 있다는 질문에 대한 합리적인 답변을 생성합니다. 코스 전체에서 이 스타일의 프롬프트 및 완성 예제를 많이 볼 수 있습니다.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6ec724d1-7bc4-4625-a0ef-d9f399a08830)
