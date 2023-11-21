---
title: "[Markdown] 마크다운 표(Table) 작성하는 법"
categories:
  - Markdown
tags:
  - Markdown
  - 마크다운
toc: true
toc_sticky: true
toc_label: "마크다운 표(Table) 작성하는 법"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2e52a768-7d01-4ceb-bde6-a8c44edcfa17)

<br>

### 마크다운 문법 Syntax

마크다운 문법 참고 사이트

- 공식 사이트 : [Daring Fireball](https://daringfireball.net/projects/markdown/syntax) (영문)
- GitHub Flavored Markdown : [Writing on GitHub](https://docs.github.com/en/get-started/writing-on-github) (영문), [Mastering-markdown](https://docs.github.com/ko) (영문)

<br>

### 표 (Table) 입력 방법

파이프(`|`), 하이픈(`-`)을 이용하여 column들과 헤더를 생성 및 구분할 수 있다.

```Markdown
<작성 방법>

| First Header | Second Header |
| ------------ | ------------- |
| Content Cell | Content Cell  |
| Content Cell | Content Cell  |
```

> | First Header | Second Header |
> | ------------ | ------------- |
> | Content Cell | Content Cell  |
> | Content Cell | Content Cell  |

<br>

테이블 양쪽 끝에 있는 파이프(`|`) 는 없어도 된다. (하지만 있는 게 더 보기 쉽다.)<br>
셀 너비는 내용에 맞게 알아서 정해지므로 굳이 Markdown 소스 상에서 맞추지 않아도 된다.<br>
헤더를 구분할 때는 - 를 각 column에 3개 이상 사용해야한다.<br>

```Markdown
<작성 방법>

| Command    | Description                                    |
| ---------- | ---------------------------------------------- |
| git status | List all new or modified files                 |
| git diff   | Show file differences that haven't been staged |
```

> | Command    | Description                                    |
> | ---------- | ---------------------------------------------- |
> | git status | List all new or modified files                 |
> | git diff   | Show file differences that haven't been staged |

<br>

### 표 내부 서식 및 정렬 방법

#### 서식 적용 방법

표 내에서도 링크, 인라인 코드, 텍스트 스타일과 같은 [서식](https://leechanwoo-kor.github.io/markdown/markdown/)을 기본적으로 사용 가능하다.

```Markdown
<작성 방법>

| Command      | Description                                        |
| ------------ | -------------------------------------------------- |
| `git status` | List all *new or modified* files                   |
| `git diff`   | Show file differences that **haven't been** staged |
```

> | Command      | Description                                        |
> | ------------ | -------------------------------------------------- |
> | `git status` | List all *new or modified* files                   |
> | `git diff`   | Show file differences that **haven't been** staged |

<br>

#### 정렬 방법

헤더 행의 하이픈`-`의 오른쪽, 왼쪽, 양쪽에 콜론`:`을 포함시켜서 오른쪽, 왼쪽, 중앙 정렬할 수 있다.

```Markdown
<작성 방법>

| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| git status   |   git status   |    git status |
| git diff     |    git diff    |      git diff |
```

> | Left-aligned | Center-aligned | Right-aligned |
> | :----------- | :------------: | ------------: |
> | git status   |   git status   |    git status |
> | git diff     |    git diff    |      git diff |

<br>

#### 추가 사항

파이프를 셀 내용에 포함시키려면 이스케이프`\`를 사용하면 된다.

```Markdown
<작성 방법>

| Name     | Character |
| -------- | --------- |
| Backtick | `         |
| Pipe     | \|        |
```

> | Name     | Character |
> | -------- | --------- |
> | Backtick | `         |
> | Pipe     | \|        |
