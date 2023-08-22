---
title: "[Storage] 스토리지란? DAS란? / NAS란? / SAN 이란? 차이점?"
categories:
  - Storage
tags:
  - DAS
  - NAS
  - SAN
toc: true
toc_sticky: true
toc_label: "스토리지란? DAS란? / NAS란? / SAN 이란? 차이점?"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6be4cd9c-0862-4ab4-a392-eb22797a0ac6)

<br>

# 스토리지(Storage)란?

- 컴퓨터에 데이터를 저장하는 저장소의 역할을 수행하는 부품이다.
- 컴퓨터의 하드디스크와 동일한 역할을 수행하는 부품이며, 스토리지를 직접 서버에 연결 할 수 있음.
- 대용량의 데이터를 저장하기 위해 별도의 스토리지용 네트워크를 구성할 수 있음.

<br>

# DAS / NAS / SAN 란? 

- 다스 / 나스 / 산스 란 스토리지의 종류이고, 연결방식의 차이이다.  
- 각 스토리지는 어떻게 연결되는지, 어떤방식의 차이인지 알아보자.

<br>

## DAS, NAS

- DAS와 NAS는 하드디스크를 여러개 장착가능한 데이터 스토리지이며, DAS는 유선으로 외장하드처럼, NAS 는 와이파이나 랜으로 무선의 클라우드처럼 사용된다. 

<br>

### DAS(like외장하드), Direct Attachted Storage

- PC나 서버에 다이렉트로 꽂아서(usb처럼) 사용하는 스토리지. 
- 서버와 하드웨어를 **1:1**로 연결. 
- 각 서버는 자신이 직접 파일 시스템을 관리한다. 
- **쉽게말해 하드를 여러개 끼울수 있는 서버의 외장하드!**
- 서버에 직접 외장저장장치를 연결하므로 속도는 빠르고 확장은 쉽지만, 연결 수에 한계가 있음.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/722d91d3-56a3-4809-9c94-96c59ba64501)
*DAS*

<br>

### NAS(like클라우드), Network Attached Storage

- **쉽게말해 DAS에 네트워크 기능 탑재!**
- 서버와 저장장치가 이더넷등의 LAN방식의 네트워크에 연결된 방식이다.
- LAN은 TCP/IP 프로토콜 기반이고 저장장치는 SCSI를 사용하므로 이들간 통신을 위해 중계역할을 하는 파일서버가 필요하다.
- 스토리지 내에서 직접 파일을 읽기/쓰기/공유 한다. 

---

- **LAN Local Area Network. 근거리 통신망**
  - 광대역 통신망과는 달리 학교, 회사, 연구소 등 한 건물이나 일정 지역 내에서 컴퓨터나 단말기들을 고속 전송 회선으로 연결하여 프로그램 파일 또는 주변장치를 공유할 수 있도록 한 네트워크 형태. 
- **SCSI - small computer system interface**
  - 컴퓨터 주변기기 접속을 위한 직렬 표준 인터페이스.

---

- 장점
  - DAS와 달리 PORT수 제한이 없어 확장성과 유연성이 뛰어남.
  - 경제적 유리, 설치/유지보수 용이
- 단점
  - 접속증가시 성능저하, 전송속도 DAS보다 느림.
  - 파일시스템 공유하기때문에 보안 비교적 취약. 백업이 어려움.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fad9a645-9e8e-46de-b41e-7fba97be15c7)
*NAS*

<br>

## SAN, Storage Area Network

- 서버와 저장장치를 NAS와는 다르게 (NAS는 표준 이더넷 연결)
- Fiber channel(광채널) switch로 연결한 고속데이터 네트워크.
- 저장장치를 향상시켜 장치가 로컬 연결장치로 서버의 운영 체제에 표시되도록 한다.
- DAS와 NAS의 단점보완.
- 서버당 접속 스토리지 수 제한 해결
- 전용 파이버채널 스위치(광채널)를 둠으로써 빠른속도의 연결을 유지하는것이 특징.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c6135e90-2e6e-48ed-99c8-118ea9c4c338)
*SAN*

---

- SAN은 별도의 **SAN 스위치**를 필요로 한다.
  - **FC-SAN**: 광케이블로 통신하는 Fiber Chnnel 방식
    - 광케이블을 사용하므로 통상 10km 이내의 구성시 사용 가능.
  - **IP-SAN**  : Internet Protocal 방식
    - IP통신이 가능한 범위라면 거리제한 없음.
- NAS 와 달리 **파일이 아닌 블록단위**의 I/O(입출력) 을 기본으로 한다. 

---

*블록스토리지가 자산의 PC에 연결되었을때, 사용자는 아래와 같이 접근하여 데이터를 읽고쓴다.
<br>
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/aae0746b-d9e5-49f6-8501-593bd4139996)

<br>

*파일스토리지가 자신의 PC에 연결되었을때 (즉, NAS 방식) 는 다음과 같다.
<br>
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a59948a4-b39a-4a16-8e1a-8d68becc403c)

<br>

## DAS / NAS / SAN 비교 정리

||DAS|NAS|SAN|
|:---:|:---:|:---:|:---:|
|구성요소|어플리케이션 서버, 스토리지|어플리케이션 서버, 전용 파일서버, 스토리지|어플리케이션 서버, 스토리지|
|접속장치|없음|이더넷 스위치|파이버채널(광)스위치, IP|
|스토리지 공유|가능|가능|가능|
|파일시스템 공유|불가|가능|불가|
|파일시스템 관리|어플리케이션 서버|파일서버|어플리케이션 서버|
|접속속도 결정요전|채널 속도|LAN, 채널속도|채널속도|
|특징|소규모 독립구성에 적합|**파일공유**를 위한 가장 안정적이고 신뢰 높은 솔루션|유연성/확장성/편의성이 가장 뛰어남|
