---
title: "[LLM] Pretrained vs Fine-tuned vs Instruction-tuned vs RL-tuned"
categories:
  - LLM
tags:
  - LLM
  - Pretrained
  - Fine-tuned
  - Instruction-tuned
  - RL-tuned
toc: true
toc_sticky: true
toc_label: "Pretrained vs Fine-tuned vs Instruction-tuned vs RL-tuned"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d1e32689-d62b-4650-b751-5ae353c001cb){: .align-center}<br>

머신러닝과 인공 지능이라는 흥미로운 영역에서 다양한 유형의 모델 간의 뉘앙스는 종종 미로처럼 보일 수 있습니다. 특히 대규모 언어 모델(LLM)의 경우, 사전 학습된(Pretrained) 모델과 미세 조정된(Fine-tuned) 모델, 명령어 조정된(Instruction-tuned) 모델과 RL 조정된(RL-tuned) 모델의 차이점을 이해하는 것이 그 방대한 잠재력을 발휘하는 열쇠가 될 수 있습니다. 이 글에서는 이러한 모델에 대해 자세히 살펴보면서 차이점을 설명하고 각각의 강점을 조명합니다.

차이점을 자세히 알아보기 전에 오늘날의 AI 기반 세계에서 대규모 언어 모델의 역할을 이해하는 것이 중요합니다. 사람과 유사한 텍스트를 이해하고 생성하는 놀라운 능력을 갖춘 LLM은 고객 지원부터 콘텐츠 제작에 이르기까지 다양한 산업 분야에 혁신을 일으키고 있습니다.

## Pretrained LLMs: AI 언어 처리의 기반

*Starting with a Strong Foundation*

- Pretrained LLM은 방대한 데이터 세트에 대해 사전에 학습된 모델입니다. 이들은 노출된 데이터에서 패턴, 문법, 사실, 심지어 추론 능력까지 학습하여 기초 모델 역할을 합니다.
- 사전 학습된 모델로 시작하는 것은 수년간 축적된 지식을 활용하는 것과 비슷합니다. 모델이 이미 언어의 뉘앙스를 이해하고 있다는 점에서 강력한 출발점을 제공합니다
- 머릿속에 수천 권의 책으로 구성된 도서관이 있다고 상상해 보세요. 방대한 언어 지식의 저장소 역할을 하는 사전 훈련된 LLM이 제공하는 이점입니다.

<br>

## Fine-tuned LLMs: 맞춤화(Customization)가 핵심

*Tailoring the Model to Specific Needs*

- 이 프로세스는 사전 학습된 모델을 특정 데이터 세트에 대해 추가로 학습하는 것입니다. 특정 작업에 대한 모델의 기술을 연마하는 것입니다.
- 미세 조정(fine-tuning)을 통해 LLM은 방대한 일반 지식을 유지하면서도 특정 영역에 대한 전문가가 될 수 있습니다. 의학 전문 용어든 시적 언어든, 미세 조정을 통해 LLM을 완벽하게 만들 수 있습니다.
- 일반 의사(사전 훈련된 모델)가 심장학(미세 조정)을 전문으로 하기로 결정했다고 생각해 보세요. 여전히 폭넓은 의학 지식을 보유하고 있지만 이제 심장 관련 문제에 대한 전문가가 되었습니다.

<br>

## Instuction-tuned LLMs: AI 내러티브 연출

*Guidance Through Textual Instuctions*

- 이러한 LLM은 텍스트 지침(textual instructions)을 사용하여 미세 조정됩니다. 방대한 데이터에만 의존하는 것이 아니라 제공된 지침에 따라 적응할 수 있습니다.
- Instuction-tuned 모델은 일반적인 응답과 작업별 결과 사이의 격차를 해소합니다. 주어진 지시에 따라 사용자의 의도와 밀접하게 일치하는 콘텐츠나 답변을 생성할 수 있습니다.
- 누군가에게 자세한 레시피를 제공하면서 요리를 가르친다고 상상해 보세요. 명확한 지침만 있으면 초보자도 맛있는 요리를 만들 수 있습니다. 인스트럭션 튜닝 LLM도 비슷한 원리로 작동하며, 가이드라인에 따라 원하는 결과를 만들어냅니다.

<br>

## RL-tuned LLMs: 강화 학습(Reinforcement Learning)의 힘

*Adapting Through Feedback and Interaction*

- 강화 학습(RL, Reinforcement Learning)은 피드백을 통해 학습하는 모델을 포함합니다. 모델이 환경과 상호작용하면서 자신의 행동에 따라 보상(또는 페널티)을 받으면서 시간이 지남에 따라 행동을 개선합니다.
- 이러한 반복적인 피드백 루프를 통해 LLM은 실시간으로 적응하여 응답을 개선하고 성능을 지속적으로 향상시킬 수 있습니다.
- 곡을 연습하는 피아니스트를 생각해 보세요. 가끔 잘못된 음을 칠 수도 있지만, 그럴 때마다 조정하여 다음 연주가 완벽에 가까워지도록 합니다. RL 튜닝된 LLM도 이와 유사한 접근 방식을 채택하여 피드백을 기반으로 결과물을 개선합니다.

<br>

## 모델 요약

- Pretrained LLMs: 언어 지식의 방대한 저장소. 고층 빌딩의 기초라고 생각하면 됩니다.
- Fine-tuned LLMs: 특정 업무에 맞게 맞춤화된 전문 지식. 고층 빌딩의 각 층의 인테리어를 특정 회사의 필요에 맞게 설계하는 것과 같습니다.
- Insruction-tuned LLMs: 제공된 지침에 따른 유연성과 적응력. 그날의 요구 사항에 따라 마천루의 인테리어를 마음대로 재배치할 수 있다고 상상해 보세요.
- RL-tuned LLMs: 피드백을 통한 지속적인 학습과 적응. 실시간 데이터를 기반으로 고층 빌딩의 인프라가 에너지 효율을 높이기 위해 끊임없이 진화하는 모습을 상상해 보세요.

<br>

대규모 언어 모델의 세계는 방대하고 복잡합니다. 모든 LLM은 인간과 유사한 텍스트를 이해하고 생성한다는 공통된 목표를 공유하지만, 학습에 사용되는 방법론은 그 역량과 응용 분야에 큰 영향을 미칠 수 있습니다.

업계 전문가든, AI 애호가든, 음성 비서의 놀라울 정도로 정확한 응답 뒤에 숨겨진 메커니즘이 궁금한 사람이든, 이러한 LLM 간의 차이점을 파악하는 것은 매우 중요합니다. AI가 계속 진화함에 따라 이러한 뉘앙스를 이해해야 기술의 잠재력을 책임감 있고 효과적으로 활용할 수 있습니다.
