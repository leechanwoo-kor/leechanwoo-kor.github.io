---
title: "[NLP] NLP Practices"
categories:
  - NLP
tags:
  - NLP
toc: true
toc_sticky: true
toc_label: "NLP Practices"
toc_icon: "sticky-note"
---

# Natural Language Processing Practices

1. Language identification
2. Cleaning text
3. Spell checking
4. Tokennizing
5. Part-of-Speech tagging
6. Word vector
7. Classification (Sentiment Analysis)

**Requirements**
- Python
- Google Chrome (for Google Colab)

## Language Identification
- Problem: Identify languages of text
  - Korean, English, French, Japanese, Chinese, ...
- Features
  - Bytes and Encoding (i.e. EUC-KR for Korean)
  - Characters
  - Character combinations
  - Morphemes, Syllables, and Chunks
  - Words
  - Word combinations
  - ...
- Library
  - langdetect: https://github.com/Mimino666/langdetect
  - langid.py: https://github.com/saffsd/langid.py
  - FastText: https://fasttext.cc/docs/en/language-identification.html
- Practice
  - https://colab.research.google.com/drive/1CNvsRyHTAa_psVoFfer6AWF9NbTsVE9d?usp=sharing

## Cleaning Text
- Problem: Noises in text
  - html tags
  - emoticons
- Method
  - Regular expression
  - String replacement

![image](https://user-images.githubusercontent.com/55765292/159892564-f5be0e5b-52c8-428a-9070-8ded7c612c49.png){: .align-center}
![image](https://user-images.githubusercontent.com/55765292/159892582-2665ea4a-3119-4405-9a8d-986c21354881.png){: .align-center}


**Regular expression**
- Describes a pattern of text
  - can test whether a string matches the expr's pattern
  - can use a regex to search/replace characters in a string
  - very powerful, but tough to read
- Occur in many places
  - Text editors allow regexes in search/replace
  - Languages: JavaScript, Java, Python, etc.
  - Unix/Linux/Mac shell commands (grep, sed, find, etc.)
- Book
  - https://regexone.com/
- Practice
  - https://regex101.com/

![image](https://user-images.githubusercontent.com/55765292/159893142-be2cd98a-756b-44dc-9e90-ad6c24f83092.png){: .align-center}

- Practice
  - https://colab.research.google.com/drive/1ltjDwzds4avyMcNrqOunoWeO5Hk95hNj?usp=sharing

## Spell Checking
- Problem: Noises in text
  - Word spacing
  - Errata
- Method
  - Rule base
  - Machine learning

![image](https://user-images.githubusercontent.com/55765292/159893488-754d78c4-bf0b-4acc-b8b5-251dc9f590d1.png){: .align-center}

- Library
  - PyKoSpacing: https://github.com/haven-jeon/PyKoSpacing
  - py-hanspell: https://github.com/ssut/py-hanspell
- Practice
  - https://colab.research.google.com/drive/1bBwq--mAon3VmrEjMABDqPSR3OK6Gekl?usp=sharing

## Tokenizing
- Problem: Identify atomic object in text
  - Word token (i.e. smarter than animals)
  - Subword token (i.e. smart er than animal s)
  - Character token (i.e. s m a r t e r t h a n a n i m a l s)
- Method
  - n-gram
  - Byte Pair Encoding

**Byte Pair Encoding**
- Compression algorithm
  - Ex) aaabdaaabac => ZabdZabac => ZYdZYac => XdXac
  - Z=aa, Y=ab, X=ZY
- BPE in NLP
  - Group characters by frequency

![image](https://user-images.githubusercontent.com/55765292/159894382-6fa8a388-02ab-4c20-8d80-128204855136.png){: .align-center}

- Library
  - Tokenizers (by huggingface): https://github.com/huggingface/tokenizers
  - KoNLPy: https://konlpy.org
- Practice
  - https://colab.research.google.com/drive/1YF513n7v5JX4U9njB-Bw-RoKPybtGybM?usp=sharing

## Part-of-Speech Tagging
- Problem: Identify part-of-speech
  - Noun, Verb, Adjective, Adverb, Number, ...
- Library
  - khaiii: https://github.com/kakao/khaiii
  - KoNLPy: https://konlpy.org
- Practice
  - https://colab.research.google.com/drive/1kGZYaptCzKqssFGizs5NqNCuRKAtK9w0?usp=sharing

## Word2Vec
- Embeddings capture relational meaning
  - Ex) king - man + woman ≈ queen

![image](https://user-images.githubusercontent.com/55765292/159895309-846bf0fe-646f-4484-a88f-5a3e19719c04.png){: .align-center}

- Examples of Word2Vec analogy test (Korean)
  - [여름 - 더위 + 겨울] = [마름]
  - [선풍기 - 바람 + 눈] = [눈물]
  - [사람 - 지능 + 컴퓨터] = [소프트웨어]
  - [인생 - 사람 + 컴퓨터] = [관리자]
  - [그림 - 연필 + 영화] = [스타]
  - [손 - 박수 + 발] = [달리기]
  - [삼겹살 - 소주 + 맥주] = [햄]
- Word vector representations
  - Word2Vec
  - FastText
- Library
  - gensim: https://radimrehurek.com/gensim/
- Practice
  - https://colab.research.google.com/drive/1HPIs41AsIZQQ9xbHuu3IqASmBsYefIKT?usp=sharing


<br>
<br>
<br>
참고자료
- https://news.v.daum.net/v/20201025080011013
- https://content.v.daum.net/v/5a0547a1e787d0000159f213
- https://blog.naver.com/saltluxmarketing/221607368769
