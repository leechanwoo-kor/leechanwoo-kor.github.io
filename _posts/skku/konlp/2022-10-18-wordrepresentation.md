---
title: "[NLP] 단어 표현 (Word Representation)"
categories:
  - NLP
tags:
  - NLP
  - Word Representation
toc: true
toc_sticky: true
toc_label: "단어 표현 (Word Representation)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/196322694-37aa45dd-c985-4514-8ba4-dd447a6486a6.png)

<br>
# 단어 표현 (Word Representation)

<br>
##  단어의 표현
- 심층 신경망이 텍스트를 처리하려면 신경망이 이해할 수 있는 방식으로 단어를 제공해야 함
  - 정수 인코딩 (Integer Encoding)
  - 원-핫 인코딩 (One-hot Encoding)
  - 단어 임베딩 (Word Embedding)

![image](https://user-images.githubusercontent.com/55765292/196358345-432c74e0-66c6-4157-bb81-2e6615f0ca05.png)

<br>
### 정수 인코딩 (Integer Encoding)
- 숫자를 사용하여 각 단어를 인코딩하는 방법
  - 텍스트에 단어가 1,000개 있다면, 각 단어에 1부터 1,000까지 정수를 부여함
  - 단어를 빈도순으로 정렬한 후, 빈도가 높은 단어부터 정수가 부여되어 있음
    - 예를 들면, "the"는 빈도가 높기 때문에 1이 부여되어 있음

![image](https://user-images.githubusercontent.com/55765292/196358491-ef016a69-08ba-40c8-ab2b-91ce51ac7c5e.png)

- 단점
  - 단어간 관계 표현을 못함 --> 학습이 이루어지지 못함

<br>
### 원-핫 인코딩 (One-hot Encoding)
- "1" 혹은 "0"으로 표현
  - 각 단어가 배열 내에서 해당하는 위치를 1로 표현함 --> 벡터화함

![image](https://user-images.githubusercontent.com/55765292/196358892-b640c0ee-5dd0-40d1-ad93-bf12f98052fb.png)

- 단점
  - 벡터의 길이가 너무 길어짐
    - 예를 들면, 1만개의 단어 토큰으로 이루어진 말뭉치에서는 9999개의 "0"과 1개의 "1"로 이루어진 단어 벡터를 1만개 만들어야 함
    - sparse --> 공간 낭비

<br>
### 실습
- 텍스트의 토큰화

```python
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense.Flatten.Embedding
from tensorflow.keras.utils import to_categorical
from numpy import array

# 케라스의 텍스트 전처리와 관련한 함수 중 text_to_word_sequence 함수를 불러옵니다.
from tensorflow.keras.preprocessing.text import text_to_word_sequence

# 전처리할 텍스트를 정합니다.
text = '해보지 않으면 해낼 수 없다'

# 해당 텍스트를 토큰화합니다.
result = text_to_word_sequence(text)
print("\n원문:\n", text)
print("\n토큰화:\n", result)
```

```
원문:
해보지 않으면 해낼 수 없다.
```

```
토큰화:
['해보지', '않으면', '해낼', '수', '없다']
```

<br>

- 단어 빈도수 세기

```python
# 단어 빈도수 세기

# 전처리하려는 세 개의 문장을 정합니다.
docs = ['먼저 텍스트의 각 단어를 나누어 토큰화합니다.',
        '텍스트의 단어로 토큰화해야 딥러닝에서 인식됩니다.',
        '토큰화한 결과는 딥러닝에서 사용할 수 있습니다.',
        ]

# 토큰화 함수를 이용해 전처리 하는 과정입니다.
token = Tokenizer()         # 토큰화 함수 지정
token.fit_on_texts(docs)    # 토큰화 함수에 문장 적용

# 단어의 빈도수를 계산한 결과를 각 옵션에 맞추어 출력합니다.
# Tokenizer()의 word_counts 함수는 순서를 기억하는 Ordereddict 클래스를 사용합니다.
print("\n단어 카운트:\n", token.word_counts)

# 출력되는 순서는 랜덤입니다.
print("\n문장 카운트: ", token.document_count)
print("\n각 단어가 몇 개의 문장에 포함되어 있는가:\n", token.word_docs)
print("\n각 단어에 매겨진 인덱스 값:\n", token.word_index)
```

<br>

- 단어의 원-핫 인코딩

```python
text = "오랫동안 꿈꾸는 이는 그 꿈을 닮아간다"
token = Tokenizer()
token.fit_on_texts([text])
print(token.word_index)
```

`{'오랫동안': 1, '꿈꾸는': 2, '이는': 3, '그': 4, '꿈을': 5, '닮아간다': 6}`

```python
x = token.texts_to_sequences([text])
print(x)
```

`[[1, 2, 3, 4, 5, 6]]`

```python
# 인덱스 수에 하나를 추가해서 원-핫 인코딩 배열 만들기
word_size = len(token.word_index) + 1
x = to_categorical(x, num_classes=word_size)
print(x)
```

```
[[[0. 1. 0. 0. 0. 0. 0.]
  [0. 0. 1. 0. 0. 0. 0.]
  [0. 0. 0. 1. 0. 0. 0.]
  [0. 0. 0. 0. 1. 0. 0.]
  [0. 0. 0. 0. 0. 1. 0.]
  [0. 0. 0. 0. 0. 0. 1.]]]
```
