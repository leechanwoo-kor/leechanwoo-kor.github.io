---
title: "[Database System] Storing Database(1) - Disk Storage"
categories:
  - Database System
tags:
  - Database System
  - Storing Database
  - Disk Storage
toc: true
toc_sticky: true
toc_label: "Storing Database"
toc_icon: "sticky-note"
---

# Database System

## Storage and Disk

### Storage Hierarchy

![image](https://user-images.githubusercontent.com/55765292/136879847-6070e8e6-9f92-48be-bb71-cc03e1385ea2.png){: width="80%" height="80%"}{: .align-center}

위로 갈 수록 비싸고 빠름 / 아래로 갈 수록 싸고 느림 {: .text-center}

- Primary Storage(주기억 장치)
  - fastest but volatile
  - cache memory, main memory
- Secondary Storage(보조 기억 장치)
  - non-volatile, fast access time
  - flash memory, SSD, **hard disk**
- Tertiary Storage
  - non-volatile but slow
  - magnetic tape, optical storage

**💡**<br>
**데이터베이스의 주 저장소는 (하드)디스크이다**<br>
**→ 비휘발성, 저렴, 대용량 때문!!**<br>
{: .notice--primary}


### Disk Storage

- 데이터베이스는 디스크에 저장
- 조작(검색, 삽입, 업데이트...) 데이터는 메인메모리에서 발생
- 다음과 같은 3단계 필요
  - READ: 디스크에서 메인메모리로 데이터 이동(디스크 블록이 메인메모리 버퍼에 복사됨)
  - Manipulation: 메인메모리 액세스, CPU 처리
  - WRITE: 메인메모리에서 디스크로 데이터 이동(메인 메모리 버퍼의 내용을 디스크 블록에 복사)


**💡**<br>
**READ/WRITE(디스크 I/O)는 메인메모리/CPU 작업에 비하면 비용이 많이 드는 작업이다(milli-second : nano-second)**<br>
**이는 큰 차인데 디스크I/O가 수행할동안 CPU는 수백만 개의 명령을 수행함**<br>
{: .notice--primary}

---

- 데이터는 **블록**(또는 **페이지**)이라는 단위로 디크스에 저장
- **블록**은 메인메모리와 디스크 사이에서 읽거나 쓸 수 있는 **가장 작은** 단위
- 블록은 하나 이상의 **플래터**에 있는 **트랙**에 배열되며 트랙은 플래터의 양면에 기록됨
- 각 표면은 여러 **트랙**으로 나뉨
- 각 트랙은 **섹터**라는 호로 나뉘며 크기는 디스크마다 다름
- 크기는 고정되어 있으며 변경할 수 없음
- **블록의 크기는 디스크 초기화 시 섹터 크기의 배수로 설정할 수 있다**

![image](https://user-images.githubusercontent.com/55765292/136891417-14c95e1c-9fea-4f2b-aab3-c0f853ebc427.png){: width="80%" height="80%"}{: .align-center}


### Disk Capacity

- 디스크 당 플래터 수
  - 단일 디스크에는 하나의 플래터만 있지만 일반적인 디스크는 5~15개의 플래터를 가짐(10~30표면)
- 표면당 트랙 수
  - 한 표면에는 20,000개 이상의 트랙이 있을 수 있음(32,768개, 65,536개 등..)
- 트랙당 바이트 수
  - 트랙에는 256개 이상의 섹터가 있을 수 있음
  - 일반 디스크에는 트랙당 백만 바이트 이상이 있을 수 있음
- 디스크 용량 = 트랙 크기 * 표면 크기 * 표면수

---

(예제)
- 디스크 정보
  - 8개의 플래터, 16개의 표면(양면)
  - 표면당 2^16(= 65,636) 트랙
  - 트랙당 2^8(=256) 섹터
  - 섹터당 2^12(= 4,096) 바이트

- 트랙, 표면, 디스크 용량
  - 트랙의 크기
    - 2^8 * 2^12 = 2^20 바이트
  - 표면의 크기
    - 2^20 * 2^16 = 2^36 바이트/표면
  - 디스크 용량
    - 2^36 * 2^4 = 2^40 바이트 = 1TB/디스크
- 실린더 개수(=트랙의 수)
  - 2^16 cylinders 
- 유효한 블록의 크기는? 
  - (1)2,048bytes → 섹터보다 작으므로 X
  - (2)16,384bytes → 16,384(4섹터/블록) 유효
  - (3)24,576bytes → 24,576(6섹터/블록) 유효
  - (4)1.2MB → 최대 값을 넘으므로 X
- 블록 크기를 16,384바이트로 선택하면
  - 한 트랙에 몇 개의 블록이 존재?
    - 16,384/4 = 4섹터/바이트, 256/4 = 64블록/트랙
  - 실린더에는 몇 개의 블록이 존재?
    - 64*16 블록/실린더

---

### Disk Access Time

- Disk Access Time
  - 디스크에서 메인메모리로 블록을 이동시키는 시간
  - 탐색 시간(s) + 회전 지연 시간(r) + 전송 시간(t)
 
- 탐색 시간(Seek Time(s))
  - 현재 위치에서 올바른 트랙으로 헤드를 이동하는 시간
  - 변동되는 시간으로 5~30ms가 소요, 헤드 이동 거리에 따라 다름
  - 내부 / 가장바깥: 1/2, 중간: 1/4, 무작위: 1/3(평균)

- 회전 지연 시간(Rotainonal Delay(r)
  - (첫 번째 섹터) 올바른 블롤이 헤드 아래에서 회전 할 때까지 기다리는 시간
  - 평균 회전 지연 시간 = (1/2) * (1/rpm)
  - 예시: 7,200rpm → 8.33ms 마다 한 번 씩 회전할 수 있음

- 전송 시간(t)
  - 블록이 헤드를 지나 회전하는 데 걸리는 시간
  - 전송 시간 = 블록 크기 / 전송 속도
  - 예시: 전송 속도 = 163MB/s → 5.45ms에 8KB블록을 전송할 수 있음

**💡**<br>
**일반적으로 탐색 시간은 총 액세스 시간의 절반 이상이다**<br>
**즉, s >= r + t**<br>
{: .notice--primary}


---

(예제)
- 디스크 정보
  - 디스크는 7,200rpm으로 회전 → 8.33ms에 한 번 씩 회전
  - 헤드는 실린더 4,000개를 이동할 때 마다 1ms가 걸림
  - 전송 속도 ≈ 1,630 MB/s, 전송 시간 = 16KB/1630MB = 0.1ms
- 읽기에 대한 최소, 최대 및 평균 액세스 시간은 얼마인가(16,384바이트(16KB) 블룩)?
  - 최소(=best case)
    - 탐색시간, 회전 지연 시간 X → 전송시간 0.1ms
  - 최대(=worst case)
    - 탐색시간(내부↔가장바깥): 65,536/4000 = 16.38ms
    - 회전 지연 시간: 8.33ms
    - 전송 시간 = 0.1ms
    - 총 시간 = 16.37+ 8.33 + 0.1 = 24.81ms
  - 평균
    - 탐색시간(평균 거리): 1/3 * (65,536/4000) = 5.46ms
    - 회전 지연 시간 = 1/2 * 8.33 = 4.17ms
    - 전송 시간 = 0.1ms
    - 총 시간 = 5.46 + 4.17 + 0.1 = 9.73ms

---
