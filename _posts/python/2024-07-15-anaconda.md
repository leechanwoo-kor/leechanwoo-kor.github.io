---
title: "[Anaconda] 필수 명령어 모음"
categories:
  - Python
tags:
  - Anaconda
toc: true
toc_sticky: true
toc_label: "[Anaconda] 필수 명령어 모음"
toc_icon: "sticky-note"
---

![image](https://github.com/user-attachments/assets/cfa03df0-2f9b-424e-80e8-4cdbb39ff331)

<br>

### 가상환경

|||
|:---|:---|
|conda create -n [가상환경이름] python=x.x|가상환경 생성|
|conda info --envs|생성된 가상환경 리스트|
|conda activate [가상환경이름]|가상환경 활성화|
|conda deactivate|가상환경 비활성화|
|conda remove -n 가상환경이름 --all|가상환경 삭제|
|conda env export > virtual_env.yaml|# 가상환경을 .yaml 파일로 내보내서 저장|
|conda create -n [복사된_가상환경이름] --clone [복사할_가상환경이름]|가상환경 클론 생성|

<br>

### 라이브러리 설치

|||
|:---|:---|
|pip freeze > requirements.txt|현재 가상환경에 설치된 라이브러리 저장|
|pip install -r requirements.txt|requirements 라이브러리 설치|
|pip uninstall -r requirements.txt|requirements 라이브러리 삭제|

<br>

### 라이브러리 관리

|||
|:---|:---|
|conda install [라이브러리 이름]|라이브러리 설치|
|conda install -n [가상환경이름] [라이브러리 이름] [라이브러리 이름] [] [] ...|라이브러리 여러개 설치|
|conda update [라이브러리 이름]|라이브러리 버전 업데이트|
|conda update --all|설치된 모든 라이브러리 버전 업데이트|
|conda remove [라이브러리 이름]|라이브러리 제거|
|conda search '\*[라이브러리 이름]\*'|라이브러리 검색|
|conda list|설치된 라이브러리 리스트|
