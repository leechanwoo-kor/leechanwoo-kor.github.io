---
title: "[NLP] 토큰화(Tokenization) / 토크나이징(Tokenizing)"
categories:
  - NLP
tags:
  - NLP
toc: true
toc_sticky: true
toc_label: "토큰화(Tokenization) / 토크나이징(Tokenizing)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/196322694-37aa45dd-c985-4514-8ba4-dd447a6486a6.png)

<br>
# Tokenization

<br>
## 토큰화 (Tokenization)
- 텍스트 문서(corpus, 말뭉치)에서 하나의 특정 기본 단위(토큰, token)로 나누는 작업

![image](https://user-images.githubusercontent.com/55765292/196349907-94ddefbb-7cbd-4485-888f-daf3f282b7a3.png)

<br>
### 토크나이징을 위한 파이썬 라이브러리
- 영어 토크나이징 라이브러리
  - [NLTK(Natural Language Toolkit)](https://www.nltk.org/)
  - [keras](https://keras.io/)
  - [spaCy](https://spacy.io/)
- 한글 토크나이징 라이브러리
  - [KoNLPy](https://konlpy.org/en/latest/)

<br>
# 영어 Tokenizing

<br>
## NLTK

<br>
### 설치하기

```python
!pip install nltk

import nltk
nltk.download('popular')
```

<br>
### 단어 토크나이징

```python
from nltk. tokenize import word_tokenize

tokens = word_tokenize("Hello World!, This is a dog.")
```

```python
print(tokens)
```

`['Hello', 'World', '!', ',', 'This', 'is', 'a', 'dog', '.']`

```python
words = [word for word in tokens if word.isalpha()]
```

```python
print(words)
```

`['Hello', 'World', 'This', 'is', 'a', 'dog']`

<br>
### 문장 토크나이징 (Sentence tokenizing)

```python
from nltk.tokenize import sent_tokenize

text = "Welcome to Python. This is Python World."
print(sent_tokenize(text))
```

`['Welcome to Python', 'This is Python World.']`

<br>
## keras
- keras를 사용하여 단어 토크나이징 하기
  - 공백으로 단어를 분할함
  - 특수문자 필터링
  - 소문자로 변환

```python
from tensorflow.keras.preprocessing.text import *

print(text_to_word_sequence("Welcome to Python!!! This is Python World."))
```

`['welcom', 'to', 'python', 'this', 'is', 'python', 'world']`

<br>
## spaCy

```python
import spacy
```

```python
# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")

# Process whole documents
text = ("When Sebastian Thrun started working on self-driving cars at "
        "Google in 2007, few people outside of the company took him "
        "seriously. "I can tell you very senior CEOs of major American "
        "car companies would shake my hand and turn away because I wasn't "
        "worth talking to," said Thrun, in an interview with Recode earlier "
        "this week.")
doc = nlp(text)
```

```python
word_tokenized = [token.text for token in doc]
print(word_tokenized)
```

```python
sent_tokenized = [sent.text for sent in doc.sents]
```

```python
print(sent_tokenized)
```

<br>
## 영어 토크나이징에서 고려할 사항
- 구두점이나 특수 문자를 단순히 제외할 것인가?
  - 마침표(.)는 문장의 경계를 알 수 있는데...
  - 단어 자체에 구두점을 갖고 있는 경우가 있는데... (m.p.h / Ph.D . AT&T등)
  - 달러($)는 가격을 표시하는데... ($99.99)
  - 슬래시(/)는 날짜는 표시하는데... (09/15/2022)
  - 컴마(,)가 숫자를 표시하는데... (123,456,789)
- 줄임말이 있는 경우?
  - 어퍼스트로피(')는 줄임말을 표시하는데... (You're / They're / Kim's Pizza 등)
  - rock 'n' roll
- 복합 명사?
  - New York
- 대문자를 소문자로 무조건 변환?
  - US --> us

### 영어 토크나이징 (표준)
- TreebankWordTokenizer (https://www.nltk.org/_modules/nltk/tokenize/treebank.html)

```python
from nltk.tokenize import TreebankWordTokenizer

tokenizer = TreebankWordTokenizer()

text1 = "Starting a home-based restaurant may be an ideal."
text2 = "it doesn't have a food chain or restaurant of their own."
text3 = "I live in US."
text4 = "You love rock'n'roll and Kim's Pizza."
text5 = "The price is $99.99."

print('text1 :',tokenizer.tokenize(text1))
print('text2 :',tokenizer.tokenize(text2))
print('text3 :',tokenizer.tokenize(text3))
print('text4 :',tokenizer.tokenize(text4))
print('text5 :',tokenizer.tokenize(text5))
```

`text1 : ['Starting', 'a', 'home-based', 'restaurant', 'may', 'be', 'an', 'ideal', '.']`

`text2 : ['it', 'does', 'n't', 'have', 'a', 'food', 'chain', 'or', 'restaurant', 'of', 'their', 'own', '.']`

`text3 : ['I', 'live', 'in', 'US', '.']`

`text4 : ['You', 'love', 'rock'n'roll', 'and', 'Kim', ''s', 'Pizza', '.']`

`text5 : ['The', 'price', 'is', '$', '99.99', '.']`

<br>
# 한글 Tokenizing

<br>
## 한글의 특성
- 교착어
  - 나 : 나는 /나에게/ 나를 /나와
  - 형태소 (morpheme) 단위로 분리해야 한다!!!
    - 형태소: 의미를 가지는 가장 작은 단위
    - 자립 형태소
      - 체언(명사, 대명사, 수사)
      - 수식언(관형사, 부사)
      - 감탄사
    - 의존 형태소
      - 접사, 어미, 조사, 어간
- 띄어쓰기가 어렵고 잘 지켜지지 않음

<br>
## KoNLPy
- 한글 형태소 단위 word tokenizer

<br>
### KoNLPy 및 mecab 형태소 분석기 설치하기

`!apt-get install g++ openjdk-8-jdk python3-dev python3-pip curl`

`!python3 -m pip install --upgrade pip`

`!python3 -m pip install konlpy`

`!apt-get install curl git`

`!bash <(curl -s https://raw.githubusercontent.com/konlpy/konlpy/master/scripts/mecab.sh)`

<br>
### 한글 형태소 단위 단어 토크나이징 하기

```python
from konlpy.tag import Otk, Komoran, Mecab, Hannanum, Kkma
```

```python
text = "우리는 민족중흥의 역사적 사명을 띠고 이땅에 태어났다"
```

```python
tokenizer = Okt()
tokenizer.morphs(text)
tokenizer.pos(text)

tokenizer = Kkma()
tokenizer.pos(text)

tokenizer = Komoran()
tokenizer.pos(text)

tokenizer = Hannanum()
tokenizer.pos(text)

token_mecab = Mecab()
token_mecab.pos(text)
```

<br>
### mecab을 사용한 품사 태깅(pos(part-of-speech) tagging)하기

![image](https://user-images.githubusercontent.com/55765292/196355848-3fd2168b-9706-46e2-a2bc-ced6b7fcca62.png)

<br>
### KSS(Korean Sentence Splitter)

```python
import kss

text1 = "환영합니다. 파이썬 월드. 지금부터 시작합니다."
text2 = "환영합니다 파이썬 월드~! 지금부터 시작합니다^^"

print('text :', kss.split_sentences(text1))
print('text :', kss.split_sentences(text2))
```

`text1 : ['환영합니다.', '파이썬 월드. 지금부터 시작합니다.']`

`text2 : ['환영합니다', '파이썬 월드~! 지금부터 시작합니다^^']`

<br>

---

- 한글 형태소 분석기 성능 비교 (블로그)

https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/05/10/postag/

https://soohee410.github.io/compare_tagger

https://needjarvis.tistory.com/692

https://velog.io/@metterian/%ED%95%9C%EA%B5%AD%EC%96%B4-%ED%98%95%ED%83%9C%EC%86%8C-%EB%B6%84%EC%84%9D%EA%B8%B0POS-%EB%B6%84%EC%84%9D-3%ED%8E%B8.-%ED%98%95%ED%83%9C%EC%86%8C-%EB%B6%84%EC%84%9D%EA%B8%B0-%EB%B9%84%EA%B5%90

<br>
## 불용어 처리 stopword

### 불용어 (stopword) 확인하기

```python
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
```

```python
stop_words_list = stopwords.words('english')
print('불용어 개수 :', len(stop_words_list))
print('불용어 10개 출력 :', stop_words_list[:10])
```

`불용어 개수 : 179`

`불용어 10개 출력 : ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're"]`

### 불용어 (stopword) 제거하기

```python
example = "Family is not an important thing. It's everything."
stop_words = set(stopwords.words('english'))

word_tokens = word_tokenize(example)

result = []
for word in word_tokens:
    if word not in stop_words:
        result.append(word)

print('불용어 제거 전 :', word_tokens)
print('불용어 제거 후 :', result)
```

`불용어 제거 전 : ['Family', 'is', 'not', 'an', 'important', 'thing', '.', 'It', "'s", 'everything', '.']`

`불용어 제거 후 : ['Family', 'important', 'thing', '.', 'It', "'s", 'everything', '.']`
