---
title: "[LLM] Meta LLaMA의 친척 — Stanford Univ의 Alpaca"
categories:
  - LLM
tags:
  - Alpaca
  - LLaMA
  - Stanford
  - Foundation Model
  - Self Instruct
toc: true
toc_sticky: true
toc_label: "Meta LLaMA의 친척 — Stanford Univ의 Alpaca"
toc_icon: "sticky-note"
---

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8a43c8c4-6de8-4087-ac7e-975249653a39">
</p>

Llama와 Alpaca를 구별할 수 있는가? Llama와 Alpaca는 모두 남아메리카의 낙타과 동물로 Llama는 주로 화물 운반용으로, Alpaca는 털을 얻기 위한 목적으로 길들어진 동물이다. Llama는 Alpaca에 비해 체격이 더 크다고 한다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c45bd4b2-120d-4a3e-9f59-8e151fa9bd1a"><br>
  <em>Alpaca 와 Llama. 둘다 너무 귀엽지 않은가? (source : 6 Differences Between Llamas and Alpacas)</em>
</p>

스탠퍼드는 2023년 3월13일 Meta의 LLaMA를 이용하여 Alpaca라는 친척(?) 모델을 개발하여 공개하였다.

## 스탠퍼드 대학의 Alpaca

GPT-3 이후, LLM 학습에 대규모의 컴퓨팅 리소스가 필요하면서 오픈소스 LLM들은 자취를 감추기 시작했다. 이로 인해 학계는 LLM 연구에 있어 자본력과 컴퓨팅 자원을 갖춘 Big Tech 기업를 도저히 따라갈 수 없는 현실에 직면하고 있다.

이와 같은 상황에서 Meta의 LLaMA는 Big Tech 기업이 만든 foundation model 중 제한적이나마 연구자들이 weight 수준까지 접근할 수 있는 거의 유일한 모델이라는 것에 의미가 크다. [Meta의 LLaMA에 대해선 이전 포스트에서 소개한 적이 있다.](https://leechanwoo-kor.github.io/llm/llama/)

LLaMA의 발표를 계기로 Foundation Model이란 용어를 최초로 고안해낸 [스탠퍼드 대학의 CRFM (Center for Research Foundation Models)는 학술 연구 목적으로 Meta의 LLaMA-7B 모델을 finetuning한 Alpaca라는 모델을 공개하였다.](https://crfm.stanford.edu/2023/03/13/alpaca.html)

(CRFM는 foundation model의 연구, 개발 및 배포를 근본적으로 발전시키는 것을 목표로 설립된 센터로 10개 이상 부서의 교수진, 학생, Post-Doc, 연구원 등으로 구성된 학제간 그룹이다.)

그들은 GPT-3.5(text-davinci-003), ChatGPT, Claude 및 Bing Chat과 같은 **instruction-following model(사람의 지시를 따르는 모델)** 들이 점점 강력해지고 있지만 여전히 많은 결함을 가지고 있음을 지적하고 이를 위해 학계의 참여가 중요함을 강조한다.

하지만 그들은 대다수의 foundation model이 독점 모델로 개발되면서 학계가 instruction-following model 연구에 활용할 수 있는 foundation model이 없어 foundation model 연구에 어려움을 겪고 있다라고 설명한다. Alpaca는 이와 같은 학계의 어려움을 타계하기 위한 목적으로 개발되었으며, 학술 연구 목적의 모델이므로 어떠한 상업적 사용을 금지하고 있다.

한편, 최초 Alpaca 공개 시에 사용자가 직접 Alpaca를 직접 평가할 수 있도록 대화형 데모를 제공하였으나 현재는 비활성화된 상태이다.

<br>

## $600 미만의 비용으로 Alpaca를 학습시키는 과정

ChatGPT와 GPT-4와 같은 독점 foundation model이 득세한 가운데, 스탠퍼드의 Alpaca가 갖는 의미는 Instruction-Following Model을 학습하는 방법(self-instruction)과 저렴한 학습 비용(<500$)에 있다.

제한된 학습 예산으로 고품질의 Instruction-Following Model을 만들기 위해선 1) 강력한 pre-trained LM, 2) 고품질의 Instruction-Following 데이터셋이 필요하다.

**CRFM은 1)의 문제를 해결하기 위해 Meta의 LLaMA-7B 모델을 사용하였으며, 2)의 문제는 [self-instruct 논문](https://arxiv.org/pdf/2212.10560.pdf)이 제안한 것처럼 기존의 강력한 언어 모델을 사용하여 자동으로 학습 데이터셋을 확보하여 해결하였다.**

### Self-Instrcut

Self-Instruct는 LM이 인간의 지시를 따르는 능력을 향상시키는 데 도움을 주는 프레임워크이다. Self-Instruct이 제안된 배경은 “instruction-tuned” 모델이 사람이 만든 학습 데이터의 품질과 양에 크게 의존하며 다양성과 창의성을 제한받을 수 있다는 문제점을 극복하기 위한 것이다.

**이를 위해 대량의 instuction 데이터셋을 생성하기 위해 사람이 아닌 LLM을 활용하는 것이다. (Self-Instruct라는 이름이 붙여진 이유이다.)**

Self-Instruct 과정은 사람이 작성한 [instruction seed 세트](https://github.com/yizhongw/self-instruct/blob/main/data/seed_tasks.jsonl)로 시작하는 반복적인 부트스트래핑 알고리즘이다. instruction seed 세트는 새로운 지시와 해당 입력-출력 인스턴스를 생성하기 위해 LLM의 프롬프트로 제공된다. **(물론 최초 instruction seed는 사람이 작성한다!!)**

LLM이 생성한 결과 중 품질이 낮거나 유사한 항목을 필터링하고 결과 데이터를 task pool에 다시 추가한다. **(필터링이 필요한 이유는 GPT-3와 같은 LLM이 생성한 데이터는 불가피하게 오류와 bias를 포함하기 때문이다. CFRM의 연구원에 따르면 생성된 데이터 품질을 분석하였을 때 데이터의 46 %에 문제가 있을 수 있음을 발견하였다.)**

[이 과정을 여러 번 반복하면 지시를 보다 효과적으로 따르도록 LM을 fine-tuning하는데 사용할 수 있는 대량의 학습 데이터 모음이 생성된다.](https://github.com/yizhongw/self-instruct)

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8ba26e19-a55d-4d7e-980b-d83c4c1d2a55"><br>
  <em>Self-Instruct의 과정 (source: SELF-INSTRUCT: Aligning Language Model with Self Generated Instructions)</em>
</p>

### Alpaca의 학습 레시피 및 평가 결과

아래 그림은 Alpaca 모델을 만든 방법을 설명한다.

- Step 1. 먼저 self-instruct seed로 사람이 작성한 instruction-output 쌍을 준비하고 GPT-3(text-davinci-003)의 프롬프트로 self-instruct seed를 입력하여 추가 instruct(52K 예제)를 생성한다. 이때 OpenAI API 사용 비용으로 500$ 이하의 비용이 들었다고 한다.
- Step 2. Hugging Face 학습 프레임워크를 사용하여 Step 1에서 생성된 52K instruction-following samples로 LLaMA-7B 모델을 Supervised fine-tuning 하여 Alpaca 7B 모델을 생성하였다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/99deb0cf-c0a0-411e-9b56-a1fcbd1f5455"><br>
  <em>source: https://crfm.stanford.edu/2023/03/13/alpaca.html</em>
</p>

LLaMA-7B는 FSDP(Fully Sharded Data Parallel)과 Mixed Precision과 같은 기술을 이용하여 8개의 80GB A100에서 3시간 동안 fine-tuning하였으며, 이때 사용한 Cloud 요금은 100$ 미만이라고 한다.

> ***Google Cloud 기준 A100 GPU (80GB) 1대당 $3.93/hour 요금제(Iowa(us-central1))를 가정하였을 때, $3.93/hour * GPU 8대 * 3 hours = $94.32가 나오니 실제 타당한 금액이라고 할 수 있다.***

### 평가

**이렇게 학습된 Alpaca는 GPT-3.5(text-davinci-003)와 Alpaca-7B간 blind 비교를 실시하였을 때 Alpaca가 90대 89로 text-davinci-003을 근소하게 이겼다. Self-instruct와 LLaMA-7B를 이용하여 불과 $600로 text-davinci-003와 동등한 성능의 foundation model을 만들 수 있는 것이 놀랍다.**

하지만 Alpaca는 또한 환각, 독성 및 고정관념을 포함한 LM의 몇 가지 일반적인 오류를 발생시킨다. 일반적으로 작은 모델일수록 환각이 낮지만 Alpaca의 환각은 text-davinci-003에 비해서 더 심각하다라고 한다.

그리고 Alpaca는 text-davinci-003의 짧은 출력(52K instruction-following samples)으로 fine-tuning되어 일반적으로 ChatGPT의 답변보다 더 짧은 답변을 생성한다고 한다.

<br>

## 스탠퍼드 CRFM의 향후 계획

스탠퍼드 CRFM은 Alpaca를 finetuning에 사용된 1) 52K instruction-following samples, 2) 데이터 생성 코드, 3) Hugging Face API를 사용한 fine-tuning 코드를 이미 공개하였으며, Alpaca 모델의 weight까지 공개하는 것을 Meta와 논의하고 있다고 한다. (하지만 LLaMA의 weight가 유출되어 현재 토렌트로 다운로드 받을 수 있는 상태이다.)

<br>

## Alpaca에 대한 평가

Alpaca는 잘 학습된 pre-traiend LLM와 Self-Instrcut가 결합하였을 때 매우 저렴한 비용으로 LLM의 성능에 뒤지지 않는 Small Instruction-following model를 만들 수 있음을 알려준다.

이와 같은 Alpaca의 접근 방식은 일종의 Knowledge Distillation으로 볼 수 있다. GPT-3.5에 적용된 RLHF는 Supervised fine-tuning을 위해 인간 Labeler가 수동으로 데이터셋을 만들어야 했다. 반면 Alpaca의 접근 방식은 instruction-following model을 만드는데 인간의 작업을 획기적으로 줄여 foundation model을 만드는 비용을 낮출 수 있는 장점이 있다.

이것의 기본은 매우 잘 학습된 pre-trained LLM이 “지식 전이(knowledge tranferring)”를 촉진시켜 AI 모델들의 전반적인 성능을 끌어올릴 수 있는 계기가 될 수 있을 것으로 판단된다. 즉, 인간이 만든 데이터셋으로 LLM을 학습하는 것보다 고성능의 pre-trained LLM이 다른 LLM을 학습하는 선순환 고리가 AI의 성능 향상을 극적으로 가속화시킬 수 있을 것이다.

**이 선순환 고리가 완성이 되려면 “Mother of Foundation Model”와 같은 매우 잘 학습된 pre-trained LLM에 누구나 손쉽고 저렴하게 접근할 수 있어야 한다. 하지만 foundation model 기업들이 자신들이 구축한 기술적인 해자를 스스로 해체하는 일을 할 수 있을지 의문이다.** 오히려 막대한 자금과 노력이 집약된 foundation model의 통제권을 놓지 않기 위해 더 높은 해자를 쌓고 모든 상세 기술를 비밀로 감출지도 모른다.

**또한 항상 기술의 밝은 면이 있다면 어두운 면이 있듯이, 누구나 접근이 용이한 foundation model을 이용해 악의적으로 유해한 콘텐츠가 더 광범위하게 유포하는 행위가 더 가속화될 수 있어 이를 어떻게 막을 수 있을지에 대한 대책도 필요하다.**

스탠퍼드가 Alpaca의 학습 방법을 공개한 것은 악의적인 의도로 사용될 수 있겠지만, 좀더 깊은 foundation model 연구를 통해 이를 방어하기 위한 방법을 개발할 수 있는 이점이 더 크다라는 판단에 따른 것이다.

미래에 Foundation Model에 대한 접근권은 일부 기업들이 독점할 것으로 보이나, 이에 대한 반작용으로 리눅스와 같이 오픈 소스화된 Foundation Model 또한 등장할 것으로 기대된다.

> ***We will find a way. We always have. (우리는 방법을 찾을 것이다. 늘 그래왔듯이..) 인터스텔라***

<br>

## P.S

### #1.

LLaMA와 같은 foundation model의 공개가 가져올 파급효과는 Stable Diffusion 릴리즈에서 예상해볼 수 있다.

Stable Diffusion version 1은 2022년 8월 10일에 발표되었으며, 불과 몇 주 후 오픈소스 SW로 공개되었다.
그 이후, Ethereum 이나 Bitcoin보다 더 빠른 속도로 개발자에게 확산되었다.
Stable Diffusion version 2는 2022년 11월 24일에 출시되었으며 출시 90일만에 github의 별을 33,600개를 획득했다.

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c13d6054-eab2-4031-9303-5805edc9b1ab"><br>
  <em>Stable Diffusion Developer Adoption (source: Art Isn’t Dead, It’s Just Machine-Generated)</em>
</p>

### #2.

[한 사용자가 Meta의 라이선스(현재 Non-commercial bespoke license)를 Apache License로 바꾸자라는 pull request를 LLaMA repository에 올렸다.](https://github.com/facebookresearch/llama/pull/184) LLaMA를 오픈소스화하여 LLM 학습 시 배출되는 Co2를 줄이자는 것이다. (좋아요를 굉장히 많이 받고 있다.)

<p align="center">
  <img src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/802cc082-2fb7-42c0-8544-c22893bd2691">
</p>

<br>

## 레퍼런스

[1] [Alpaca: A Stong, Replicable Instruction-Following Model](https://crfm.stanford.edu/2023/03/13/alpaca.html)

[2] [SELF-INSTRUCT: Aligning Language Model with Self Generated Instructions](https://arxiv.org/pdf/2212.10560.pdf)

[3] [Change model license to Apache License, Version 2.0](https://github.com/facebookresearch/llama/pull/184)

[4] [Stable Diffusion Release Date Timeline](https://tokenizedhq.com/stable-diffusion-release-date/)
