---
title: "[NLP] 정규 표현식을 이용한 문자 추출"
categories:
  - NLP
tags:
  - NLP
toc: true
toc_sticky: true
toc_label: "정규 표현식을 이용한 문자 추출"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/196322694-37aa45dd-c985-4514-8ba4-dd447a6486a6.png)

<br>
# 정규 표현식을 이용한 문자 추출

<br>
## 정규 표현식 (Regular Expression)
- 특정한 규칙을 가지고 있는 문자열들을 표현하는데 사용되는 규칙을 가진 언어

- 메타문자

![image](https://user-images.githubusercontent.com/55765292/196343834-d2070ab7-f1e6-4dec-b352-6972d39c83f9.png)

- 파이썬에서 정규식을 사용하려면 re 모듈을 포함시켜야 함

```python
    import re
    txt1 = 'Life is too short, you need python.'
    txt2 = 'The best moments of my life.'
    print(re.search('Life', txt1))    # 문장 안에 Life가 있는가 검사함
## <_sre.SRE_Match object; span=(0, 4), match='Life'>
    print(re.search('Life', txt2))    # 문장 안에 Life가 있는가 검사함
## None

    match = re.search('Life', txt1)
    
    match.start()
## 0

    match.end()
## 4

    match.span()
## (0, 4)

    txt1[0:4]
## 'Life'
```

<br>
### 실습
- | (vertical bar)

```python
    print(re.search('Life|life', txt2))   # 문장 안에 Life 또는 life가 있는가 검사함
## <_sre.SRE_Match object; span=(23, 24), match='life'>
```

- [  ] (문자열 범위를 표시, - 를 사용할 수 있음)

```python
    print(re.search('[Ll]ife, txt2))    # 문장 안에 Life 혹은 life가 있는가 검사함
## <_sre.SRE_Match object; span=(23, 27), match='life'>
```

- ^ (첫 문자 검색)

```python
    txt1 = 'Life is too short, you need python'
    txt2 = 'The best moments of my life'
    txt3 = "My Life My Choice."
    print(re.search('^Life', txt1))   # 제일 첫 단어로 Life가 있는가 검사함
## <_sre.SRE_Match object; span=(0, 4), match='Life'>
    print(re.search('^Life', txt2))   # 제일 첫 단어로 Life가 있는가 검사함
## None
    print(re.search('^Life', txt3))   # 제일 첫 단어로 Life가 있는가 검사함
## None
```

- $ (끝 문자 검색)

```python
    txt1 = 'Who are you to judge the life I live'
    txt2 = 'The best moments of my life'
    print(re.search('life$', txt1))   # life가 마지막 단어로 포함되어 있는가 검사
## None
    print(re.search('life$', txt2))   # life가 마지막 단어로 포함되어 있는가 검사
## <_sre.SRE_Match object; span=(23, 27), match='life'>
```

- . (임의의 문자 한 개)

```python
    re.search('A..A', 'ABA')            # 조건에 맞지 않음
    re.search('A..A', 'ABBA')           # 조건에 맞음
## <_sre.SRE_Match object; span=(0, 4), match='ABBA'>
    re.search('A..A', 'ABBBA')          # 조건에 맞지 않음
```

- \* (직전에 있는 임의의 패턴이 0회 이상 반복되는 패턴에 매치)

```Pyhton
    re.search('AB*', 'A')                 # 'A'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(0, 1), match='A'>
    re.search('AB*', 'AA')                # 'A'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(0, 1), match='A'>
    re.search('AB*', 'J-HOPE')            # 조건에 맞지 않음
    re.search('AB*', 'X-MAN')             # 'A'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(3, 4), match='A'>
    re.search('AB*', 'CABBA')             # 'ABB'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(1, 4), match='ABB'>
    re.search('AB*', 'CABBBBBA')          # 'ABBBBB'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(1, 7), match='ABBBBB'>
```

- ? (직전에 있는 임의의 문자를 0회 또는 1회 반복되는 패턴에 매치)

```python
    re.search('AB?', 'A')                 # 'A'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(0, 1), match='A'>
    re.search('AB?', 'AA')                # 'A'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(0, 1), match='A'>
    re.search('AB?', 'J-HOPE')            # 조건에 맞지 않음
    re.search('AB?', 'X-MAN')             # 'A'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(3, 4), match='A'>
    re.search('AB?', 'CABBA')             # 'AB'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(1, 3), match='AB'>
    re.search('AB?', 'CABBBBBA')          # 'AB'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(1, 3), match='AB'>
```

- \+ (직전에 있는 임의의 패턴을 1회이상 반복되는 패턴에 매치)

```python
    re.search('AB+', 'A')                 # 조건에 맞지 않음
    re.search('AB+', 'AA')                # 조건에 맞지 않음
    re.search('AB+', 'J-HOPE')            # 조건에 맞지 않음
    re.search('AB+', 'X-MAN')             # 조건에 맞지 않음
    re.search('AB+', 'CABBA')             # 'ABB'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(1, 4), match='ABB'>
    re.search('AB+', 'CABBBBBA')          # 'ABBBBB'라는 문자열이 조건에 맞음
## <_sre.SRE_Match object; span=(1, 7), match='ABBBBB'>
```

- findall() : 정규식을 만족하는 모든 문자열을 추출

```python
    txt3 = 'My life my life my life in the sunshine'
    re.findall('[Mm]y', txt3)
## ['My', 'my', 'my']
```

<br>
## 실습

<br>
### 학사 코드 추출하기

![image](https://user-images.githubusercontent.com/55765292/196346841-6ab48803-dbbc-413d-b735-2d4195cb59c1.png)

![image](https://user-images.githubusercontent.com/55765292/196346854-c20223fb-5bd3-46b7-92a8-ee0a26cefc8c.png)

![image](https://user-images.githubusercontent.com/55765292/196346878-dcef8a62-c4b3-40bb-9cd7-f8c97a93f4da.png)

```python
import re

# 멀티라인 텍스트는 세 개의 따옴표를 사용하여 표현한다
text = '''101 COM PythonProgramming1
102 MAT LinearAlgebra
103 ENG ComputerEnglish```

# Python Part1과 같이 숫자가 포함된 문자가 있을 경우
# 알파벳 문자나 줄바꿈문자(\n)이 아닌 순수하게 숫자로만 이루어진 단어를 추출하는 정규식
s = re.findall('[^a-zA-Z\\n]\d+', text)
print(s)

# 학수번호가 반드시 세자리 정수일 경우 다음과 같은 방법도 가능함
s = re.findall(['\d{3}', text)
print(s)
```

![image](https://user-images.githubusercontent.com/55765292/196347174-f3ef9504-c022-42a1-9b02-6ea92dc47864.png)

```python
import re

# 멀티라인 텍스트는 세 개의 따옴표를 사용하여 표현한다
text = '''101 COM PythonProgramming1
102 MAT LinearAlgebra
103 ENG ComputerEnglish```

# 3개의 대문자로 이루어진 단어를 추출하는 정규식
s = re.findall('[A-Z][A-Z][A-Z]', text)
print(s)

# 3개의 대문자로 이루어진 단어를 추출하는 정규식
s = re.findall('[A-Z]{3}', text)print(s)
```

<br>
### 이메일 주소 추출하기

![image](https://user-images.githubusercontent.com/55765292/196347426-f38e1895-1937-4c67-b650-0357a1dbcbd7.png)

![image](https://user-images.githubusercontent.com/55765292/196347500-07f7390e-80ef-4526-9261-efb915da5d19.png)

![image](https://user-images.githubusercontent.com/55765292/196347517-30570a5a-b7fd-4388-a1e4-520b5938bf33.png)

```python
import re
txt = 'abc@facebook.com와 bbc@google.com에서 이메일이 도착하였습니다.'
output - re.findall('\S+@[a-z.]+', txt)
for text in output:
    text_split = text.split('@')
    print('추출된 아이디 : ' + text_split[0] + ' , 도메인 : ' + text_split[1])
```

<br>
### 패스워드 검사 프로그램 만들기

![image](https://user-images.githubusercontent.com/55765292/196347766-000e6838-645e-4eb0-ba79-8b5177d0f6d0.png)

![image](https://user-images.githubusercontent.com/55765292/196347786-c21cdbb0-bfd0-46c7-9b5c-b725009534b7.png)

<br>
### 특정 문자를 대체하기

```python
    import re
    s = 'I like BTS!'
    re.sub('BTS', 'Black Pink', s)
## 'I like Black Pink!

    s = 'My lucky number 2 7 99'
    re.sub('[0-9]+', '*', s)    # 숫자만 찾아서 *으로 바꿈
## 'My lucky number * * *'
    re.sub('d+', '*', s)    # 숫자만 찾아서 *으로 바꿈
## 'My lucky number * * *'
```

<br>
### 트윗 메시지를 정제하기

![image](https://user-images.githubusercontent.com/55765292/196348138-7243f269-22ea-4697-9159-36231f00688c.png)

![image](https://user-images.githubusercontent.com/55765292/196348170-96d2701d-1f74-4ad0-a7c3-3f86930ad334.png)
