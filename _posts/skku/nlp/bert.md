---
title: "[NLP] BERT 이해하기"
categories:
  - NLP
tags:
  - NLP
  - BERT
  - Bidirectional Encoder Representations From Transformers
toc: true
toc_sticky: true
toc_label: "BERT 이해하기"
toc_icon: "sticky-note"
---

# BERT 이해하기

## What is BERT?

이번에는 짧게 BERT에 대해 살펴보겠습니다. **BERT**는 **Bidirectional Encoder Representations from Transformer**란 뜻인데요. 이름을 통해서 BERT는 Transformer의 Bidirection Encoder임을 알 수 있습니다.

Bidirectional은 양방향을 의미하고 Encoder는 입력 값을 숫자의 형태로 바꾸는 모듈을 의미합니다. BERT는 문맥을 양방향으로 이해해서 숫자의 형태로 바꿔주는 딥러닝 모델이다 라고 할 수 있습니다.

## BERT's model architecture is based on the encoder of Transformer

트랜스포머는 2017년에 구글에서 공개한 인코더 디코더 구조를 지닌 딥러닝 모델입니다. Attention is All You Need 라는 논문을 통해서 공개가 되었고 기계 번역에서 우수한 성능을 보여준 모델이구요.

방금 인코더 디코더 구조를 지닌 딥러닝 모델이라고 했는데요. 인코더는 입력 값을 양방향으로 처리하고 디코더는 왼쪽에서 오른쪽으로 입력을 단 방향으로 처리한다는 큰 차이점이 있습니다.

## Before BERT, there was GPT-1 which is based on Decoder of Transformer

BERT가 양방향 인코더 형태를 취한 데에는 재미난 이유가 있는데요. 그 시작은 GPT-1으로부터 시작이 됩니다. GPT-1은 2018년에 OpenAI에서 트랜스포머의 디코더구조를 사용해서 만든 자연어처리 모델입니다.

## GPT-1 proved the power of generative training of Language Model
- Language Model predicts next token using given tokens

GPT-1은 generative trining으로 학습된 language 모델이 얼마나 자연어 처리 능력이 우수한지 보여준 우수한 모델입니다. 기본적으로 문장을 데이터로 사용하고 단어를 하나씩 읽어 가면서 다음 단어를 예측하는 방법으로 모델이 학습됩니다.

## GPT-1 pretrained to predict next token using given tokens
- Language Model predicts next token using given tokens

이러한 학습 방식은 별도의 레벨링 작업이 필요없어서 비지도 학습이라고 할 수 있습니다. 그림에서 볼 수 있듯이 한 문장만 가지고도 여러 학습 데이터를 만드는게 가능합니다.

문장에서 현재 위치의 단어 다음에 위치한 단어를 예측하는 방식으로 학습되기 때문에 사람이 직접 레이블링할 필요가 없습니다.

GPT는 이렇게 현재 위치의 단어 다음에 위치한 단어를 예측하는 방법으로 학습이 됩니다.

따라서 GPT 학습시에 가장 필요한건 엄청난 양의 데이터겠죠. 물론 질적으로 좋은 데이터를 선별하는 노력도 엄청나게 중요합니다.

## GPT-1 pretrained with tremendous texts!
- Language Model predicts next token using given tokens

인터넷 상에는 텍스트가 정말 어마어마하게 많고 질 좋은 데이터를 선별하는 기술도 함께 발전하기 때문에 GPT는 앞으로도 분명히 각광받을 모델입니다.

## BERT pointed the left to right LM is sub optimal for sentence level tasks

BERT의 재밌는 탄생비화는 여기서 시작됩니다. BERT는 2018년 GPT-1의 발표 이후에 얼마 지나지 않아서 구글이 발표하는데요. 구글은 참고로 Transformer을 만든 기업입니다. 구글은 BERT 논문을 통해서 GPT-1의 트랜스포머의 디코더를 사용한 자연어 처리 능력은 문장을 처리하는 데 부족함이 있을 수 있따고 얘기합니다.

더불어 질의 및 응답 영역은 문맥이해능력이 상당히 중요한데 단순히 왼쪽에서 오른쪽으로 읽어나가는 방식으로는 문맥이해에 약점이 있을 수 있다고 지적합니다.

이에 단순히 왼쪽에서 오른쪽으로 읽어나가는 디코더보다 양방향으로 문맥을 이해할 수 있는 인코더를 활용한 언어 모델을 BERT라는 이름으로 발표하게 됩니다.

## Let's brush up how transformer works

이쯤에서 트랜스포머의 작동방식을 아주 짧게 알아보겠습니다. 입력 값은 먼저 인코딩 입력이 됩니다. 입력 값이 인코더에 입력되면 각 토큰들은 포지셔널 인코딩과 더해집니다. 인코더는 이 값들을 행렬 계산을 통해서 한방에 어텐션 벡터를 생성합니다.

---

어텐션 벡터는 토큰의 의미를 구하기 위해서 사용됩니다. 단어 하나만 보면 그 단어의 의미가 상당히 모호할때가 많습니다. 예를 들어서 문장 전체를 보지 않고 단순히 텍스트라는 단어만 보면 텍스트가 신문속에 있는 문장들을 의미하는지 문자 메시지를 보내는 행위를 말하는지 알기가 어렵습니다.

마찬가지로 메시지라는 단어만 봤을 경우에 이게 누가 말로 전한 소식인지 문자인지 헷갈립니다.

---

여기 어텐션 벡터를 이해하기 위해서 아주 간략하기 단순화 시켜보겠습니다. 각각의 토큰들은 문장의 모든 토큰을 봄으로써 각 토큰의 의미를 정확히 모델에 전달하게 됩니다.

즉 테스트라는 단어와 메시지라는 단어가 함께 있으므로 텍스트는 문자를 전송하다라는 뜻임을 어텐션 벡터를 통해서 전달하게 되고 역시 메세지라는 의미도 텍스트와 함께 있는 것을 어텐션을 통해서 알게 되어 문자 메시지라는 의미라 다음 레이어로 전송하게 됩니다.

---

어텐션 벡터는 풀리커넥티드 레이어로 전송이 되는데요. 이와 동일한 과정이 6번 진행됩니다. 그 최종 출력 값은 트랜스포머의 디코더의 입력값으로 사용이 됩니다.

여기서 꼭 기억해야할 점은 바로

- 인코더는 모든 토큰을 한방에 계산한다
- 왼쪽에서 오른쪽으로 하나씩 읽어가는 과정이 없다

라는 점입니다.

디코더는 인코더의 출력값과 최초 스타트 스페셜 토큰으로 작업을 시작합니다.

디코더는 왼쪽부터 오른쪽으로 순차적으로 출력값을 생성합니다.

디코더는 이전 생성된 디코더의 출력 값과 인코더의 출력값을 사용해서 현재의 출력값을 생성합니다.

디코더 역시 어텐션 벡터를 만들고 풀리커넥티드레이어로 보내는 작업을 6번 진행합니다.

디코더는 엔드토큰이라는 스페셜 토큰을 출력할 때 까지 반복됩니다.

그림은 이 과정을 통해서 I am a boy를 훌륭하게 한글로 바꾼 트랜스포머를 보여줍니다.

물론 트랜스포머를 너무 짧게 요약한 것이 맞습니다. 하지만 이정도까지만 트랜스포머를 이해하셔도 BERT를 이해하는데에는 충분할 거라 생각됩니다.

## BERT - bi directional LM

- Encoder Attention
  - Incorporate context from both direction
- Decoder Attention
  - Incorporate context from only left side

트랜스포머의 인코더는 양방향으로 문맥을 이해하고 디코더는 왼쪽에서 오른쪽으로 문맥을 이해한다라는게 핵심입니다.

## Is BERT a language model?

그렇다면 BERT는 언어 모델 일까요? 맞습니다.

기존 많은 언어 모델들이 왼쪽에서 오른쪽으로 읽어나가는 형태의 언어 모델일 뿐 BERT는 양방향으로 학습되는 기존 언어 모델과는 조금은 다른 형태이지만 언어모델이 맞습니다.

## Traditional LM vs bidirectional LM(BERT)

기존 언어 모델 즉 단방향 언어 모델을 대표하는 예로는 GPT를 들 수 있습니다. 현재까지 읽은 단어들을 사용해서 다음 단어를 예측할 수 있도록 학습이 됩니다.

입력된 문장을 통해서 입력값이 how are you 인 경우에 doing을 예측하도록 학습이 됩니다.

반면에 BERT는 동일한 문장 그대로 학습을 하되 가려진 단어를 예측하도록 학습이 됩니다. 가려진 단어는 마스크드 토큰이라고 불립니다.

## bidirectional LM (BERT) also can be trained generatively!

BERT의 학습 역시 GPT와 마찬가지로 사람이 레이블링할 필요가 없습니다. 단순히 랜덤하게 문장속 단어만 가려주고 가려진 단어를 맞추도록 학습하면 되는 것이죠.

## BERT Pre training

BERT의 입력 값으로는 한 문장뿐 아니라 두 문장도 받을 수가 있습니다. 한 문장 입력값을 받아 출력하는 대표적인 자연어 처리 태스크로는 스팸인지 아닌지 문장이 긍정적인지 부정적인지 분류하는 모델들입니다.

두 문장을 입력 받는 대표적인 자연어 처리 태스크로는 질의 및 응답이 있습니다. 입력 값으로 질문과 정답이 들어있는 문맥을 받아서 정답을 출력하는 태스크입니다.

버트는 한 문장 또는 두 문장의 학습 데이터를 통해서 토큰 간의 상관관계뿐 아니라 문장 간의 상관관계도 학습하게 됩니다.

## CLS is special token for classification

그림에서 보이는 CLS는 classification 즉 분류 태스크에 사용되기 위한 벡터입니다. 문장 전체가 하나의 벡터로 표현된 스페셜 토큰이다라고 이해하시면 됩니다.

## SEP is a special token for separate two sentences in one input

두 문장으로 구성된 입력 값에 경우에 SEP라는 스페셜 토큰으로 두 문장이 구별 됩니다.

## How BERT input made

입력값을 조금 깊게 살펴보면 입력 토큰들이 포지셔널 인코딩 그리고 세그먼트 인베딩과 더해지는 것을 볼 수 있습니다.

## BERT uses WordPiece Embedding for each token

BERT는 WordPiece 임베딩을 사용해서 문장을 토큰 단위로 분리합니다. WordPiece 임베딩은 단순히 띄어쓰기로 토큰을 나누는 것보다 효과적으로 토큰을 구분합니다.

그림에서 보이는 것처럼 playing은 하나의 단어이지만 play와 ing로 토큰이 나뉘는걸 볼 수 있습니다.

Texting -> (Text, ##ing)
Even if your train data doesn't have Texting, WordPieice split word into multiple chunks.
This reduces OOV issue, and preserve semantic info.

이와 같은 방법은 두가지 장점이 있는데요.

- 첫째로 play는 놀다라는 뜻이 있고 ing는 현재 무엇인가 하고 있다는 뜻이 명확하게 있기 때문에 딥러닝 모델에게 이 두 가지 의미를 명확히 전달할 수 있다는 장점이 있습니다.
- 둘째로 이렇게 쪼개서 입력할 경우 신조어 또는 오탈자 있는 입력 값에도 예를 들어 텍스팅, 구글링 처럼 사전에 없는 단어 들도 text와 ing, google과 ing 처럼 딥러닝 모델이 학습단계에서 봤을 만한 단어들로 쪼개서 입력되기 때문에 흔치 않은 단어들에 대한 예측이 향상이 됩니다.

## Segment embeddings for distinguishing two different sentences

이번에는 세그먼트 임베딩을 알아보겠습니다. 개념은 아주 쉽습니다.

두개의 문장이 입력될 경우에 각각의 문장에 서로 다른 숫자들을 더해주는게 바로 세그먼트 임베딩입니다. 딥러닝 모델에서 두개의 다른 문장이 있다는 것을 쉽게 알려주기 위해서 사용되는 임베딩입니다.

## Positional embedding gives position info for each token

포지셔널임베딩은 토큰들의 상대적인 위치 정보를 알려줍니다.

딥러닝 모델은 포지셔널 임베딩으로 e1다음에 e2, e2 다음에 e3 토큰이 위차함을 알 수 있습니다.

## Positional embedding uses sin and cos graph

포지셔널임베딩은 sin, cos 함수를 사용하는데요. 크게 세가지 이유가 있습니다.

- 첫째 사인과 코사인의 출력값은 입력값에 따라 달라집니다. 따라서 사인, 코사인의 출력값에는 입력값의 상대적인 위치를 알 수 있는 숫자로 사용이 가능합니다.
- 둘째, 사인과 코사인의 출력값은 규칙적으로 증가 또는 감소합니다. 따라서 딥러닝 모델이 이 규칙을 사용해서 입력 값의 상대적 위치를 쉽게 계산이 가능합니다.
- 셋째, 사인과 코사인은 무한대의 길이의 입력값도 상대적인 위치를 출력할 수 있습니다. 어떤 위치에 입력 값이라도 -1에서 1사이의 값을 출력하게 되어 있습니다.

포지셔널 임베딩에 대해서 많은 질문 중에 하나가 왜 상대적 위치를 사용하냐 절대적 위치를 사용하면 안되냐 라는 질문인데요. 예를 들어서 첫 번째 단어에 1을 더하고 두번째 단어에 2를 더하고 이런식으로 말이죠.

근데 왜 버트는 상대적 위치를 더 좋아할까요?

만약에 절대적위치를 사용할 경우에는 최장길이의 문자를 세팅해야 됩니다. 학습시에 사용했던 최장 길이의 문장보다 더 큰 문장을 받을 수 없게 되는겁니다. 따라서 상대적 위치가 포지셔널 임베딩에서 더 선호가 됩니다.

## BERT vs GPT

BERT는 pre training과 fine tuning 이렇게 두 파트로 나뉘게됩니다. 그리고 지금까지 pre training 부분을 살펴보았습니다.

fine tuning을 알아보기에 앞서서 간략하게 GPT와 BERT의 차이점을 보고 가겠습니다.

- 첫째로 버트는 양방향 언어모델이고 GPT는 단방향 언어모델입니다.
- 버트는 파인튜닝을 하기 위해서 만들어졌고 GPT는 파인튜닝이 필요없도록 만들어 졌습니다.

---

그림으로 이해해 보겠습니다.

주황색 동그라미는 선행 학습된 즉 pre training 모델입니다. 보시다시피 GPT는 학습된 모델 그자체로 여러가지 목적의 자연어 처리를 수행 가능합니다. 다만 그 모델의 크기가 상당히 큽니다.

버트는 모델이 상대적으로 작고 각각의 다른 자연어 처리를 위해서 따로 fine tuning이 필요합니다. 물론 문장을 단순히 분류하는 모델로 fine tuning된 모델을 qna 모델로도 사용할 수 없습니다.

GPT는 한 번 학습시키는데 어마어마한 시간과 돈이 듭니다. 버트는 상대적으로 적은 시간과 돈이 들지만 fine tuning을 개발자가 해줘야하고 fine tuning 역시 별도의 시간과 돈이 듭니다.

## BERT (pre-training -> fine tuning)

BERT의 fine tuning을 알아보겠습니다. 사실 선행 학습된 버트는 인터넷에서 쉽게 다운로드할 수 있습니다. 개발자가 더 잘알아야 하는 부분은 사실 다운로드 받은 모델을 어떻게 fine tuning 할까 입니다.

BERT 논문에 공개된 방법으로 몇 가지 파인 튜닝 방법에 대해 알아보겠습니다.

## BERT Fine Tuning examples

첫 번째 예제는 두 문장의 관계를 예측하기 위해 모델을 만드는 방법입니다. 버트의 입력값으로 두 개의 문장을 받을 수 있었습니다. 두 개의 문장을 SEP 토큰으로 구분해서 버트에 입력해서 출력값에 첫번 째 CLS토큰을 두 문장에 관계를 나타내도록 학습 시킵니다.

다음 예제는 이전보다 쉬운데요. 문장을 분류하는 모델 예제인데 문장한개를 입력 받고 CLS 토큰이 분류값 중 하나가 되도록 학습시킵니다.

세번째 예제는 QNA 즉 질의 및 응답 예제 입니다. 입력 값으로 질문과 정답이 포함된 작문을 SEP 토큰으로 구분해서 줍니다. 그리고 버트에 출력 값의 마지막 토큰들이 작문속에 위치한 정답의 시작 인덱스와 마지막 인덱스를 출력하도록 학습시킵니다.

마지막 예제는 문장 속 단어를 태깅하는 예제입니다. 각각의 입력 토큰에 대한 출력 값이 있기 때문에 이 출력 값이 원하는 태깅으로 출력되도록 학습을 시킵니다.

## BERT Performance

버트의 성능은 상당히 우수합니다. GPT-1과 동일한 사이즈의 버트가 GPT-1보다 높은 성능을 가졌구요. 심지어 더 큰 모델은 더 높은 성능을 보여줍니다.

## Reference

BERT: Pre-training of Deep Bidirectional Transformer for Language Understanding

https://arxiv.org/pdf/1810.04805.pdf
