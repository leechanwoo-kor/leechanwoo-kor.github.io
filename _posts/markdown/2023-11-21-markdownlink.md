---
title: "[Markdown] 마크다운 문서 내부 링크 이동 (북마크, 바로 가기, 목차)"
categories:
  - Markdown
tags:
  - Markdown
  - 마크다운
toc: true
toc_sticky: true
toc_label: "마크다운 문서 내부 링크 이동 (북마크, 바로 가기, 목차)"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2e52a768-7d01-4ceb-bde6-a8c44edcfa17)

<br>

### 1. 개요

마크다운 문서를 작성하다 보면 워드에처처럼 목차에 링크를 걸어서 클릭하면 바로 이동할 수 있게 하고 싶을 때가 있다.<br>
하이퍼링크와는 약간 다른데, 외부의 페이지로 이동하는 것이 아니라 문서 내부에서 이동하는 것은 어떻게 할까?

<br>

### 2. 방법

```Markdown
[보여지는 텍스트](#이동할-위치)

#이동할 위치
```

하이퍼링크를 사용하는 방법과 비슷하지만, 링크 부분에 `#`으로 헤더 부분을 지정해주면 된다.

<br>

### 3. 예시

[여기](#1.-개요)를 눌러 이 문서의 1. 개요로 이동할 수 있다.
위 문장을 코드로 보면 아래와 같다.

```Markdown
[여기](#1.-개요)를 눌러 이 문서의 `1. 개요`로 이동할 수 있다.
```

<br>

### 4. 주의할 점

여기서, 링크에 해당하는 `(#이동할-위치)` 에 들어갈 부분을 작성할 때는 아래와 같은 주의사항이 있다.

```Markdown
[Move Text](#index-text)

#Index Text

=> 'Index Text' 로 이동하기 위해 '#index-text' 처럼 소문자로 변경 및 띄어쓰기는 '-' 으로 구분했다.
```

- 알파벳은 반드시 소문자만 가능
- 띄어쓰기는 -(하이픈)으로 구분

<br>

### 5. 알아두면 좋은 내용

VSCode 를 이용하여 `.md`파일을 작성하면 자동완성이 적용되어서 마크다운 문서를 작성할 때 아주 편하다.

<br>

### 6. 참고 자료

- [개발일기 - [Markdown] 마크다운 문서 내부 링크 이동](https://a1010100z.tistory.com/8)
- [마크다운 문서에서 목차 만들기](https://png93.github.io/markdown-link/)
- https://young-cow.tistory.com/21
