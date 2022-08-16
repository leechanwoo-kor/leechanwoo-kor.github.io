---
title: "[Database System] Storing Database(2) - Buffer"
categories:
  - Database System
tags:
  - Database System
  - Storing Database
  - Buffer
  - Buffer Manager
  - Buffer Replacement Policy
toc: true
toc_sticky: true
toc_label: "Storing Database"
toc_icon: "sticky-note"
---

# Database System

## Buffer Manager

- 파일에 100만 페이지(블록)가 있지만 1,000페이지만 사용 가능한 메인메모리가 있다고 가정
- 전체 파일을 스캔해야 하는 쿼리를 고려 해야함
- 모든 데이터를 한번에 메모리에 가져올 수 없음

### Buffer Manager

- Buffer Manager
    - 필요에 따라 디스크에서 메인메모리로 페이지를 가져옴(디스크 페이지 ID를 MM 주소에 매핑)
    - 메모리를 페이지 모음(= **버퍼 풀**)으로 분할하여 관리함, 많은 **프레임**으로 구성

- 페이지 요청자(상위 코드, high-level code))
    - Buffer Manager에게 페이지를 요청
    - 더 이상 필요하지 않을 때 버퍼의 페이지를 해제
    - 요청한 페이지를 수정했는지 알림

![image](https://user-images.githubusercontent.com/55765292/136898478-c00277ff-2686-403f-b485-120fa1178ed5.png){: width="80%" height="80%"}{: .align-center}

- 요청된 페이지는 필요에 따라 메인메모리 버퍼로 가져옴
- 요청된 페이지가 버퍼에 없고 풀이 가득 차면 Buffer Manager가 대체할 페이지를 결정

### Page Request

- 요청된 페이지가 풀에 없을 때 Buffer Manager는 다음을 수행함
    - 일부 프레임이 비어 있음
        - 디스크에서 요청된 페이지를 빈 프레임으로 읽고 고정(pin)한 다음 해당 주소를 요청자에게 반환
    - 모든 프레임이 가득 참
        - **Find**: **교체**할 희생 페이지를 선택하고 고정(pin) (페이지는 아무도 해당 페이지를 사용하지 않는 경우에만 교체 대상임) 
        - **Flush**: 선택한 페이지가 **수정**된 경우 페이지를 디스크에 씀 (페이지의 디스크 복사본을 프레임의 내용으로 덮어씀)
        - **Load**: 디스크에서 요청된 페이지를 희생 페이지가 포함된 프레임으로 읽고 그 주소를 반환

### Pin-Count / Dirty Bit

- 프레임이 **사용하지 않는 상태**인지 확인하는 방법은?
    - 프레임 내 페이지는 여러 번 요청할 수 있음
    - **Pin-Count**는 이 페이지의 **현재 사용 횟수**를 나타냄
    - Pin-Count를 늘리는 것을 페이지 고정(pinning)이라고 함
    - Pinning은 페이지가 풀에서 **제거되는 것을 방지**
    - 페이지는 **pin-count = 0**인 경우에만 교체 대상
- 프레임이 **수정**되었는지 확인하는 방법은 무엇입니까?
    - **Dirty Bit**는 페이지가 수정되었는지 여부를 나타냄
    - 페이지가 수정된 경우 프레임에 대한 **Dirty Bit**가 설정(1)되고 그렇지 않으면 설정해제(0)함
    - Pin-Count를 줄이는 것을 페이지 고정 해제(**unpinning**)라고 함
    - 고정 해제는 요청자가 페이지에 대해 완료했음을 알려줌

---

**Page Request: Pinning(page-id)**

```
if buffer pool already contains the page-id then
    pin-count(page-id) ← pin-count(page-id) + 1;
    Return address of frame containing the page-id;
else
    Select unpinned frame V using replacement policy;
    if dirty(page in V) = ‘on’, then write the page in V to disk;
    Read a new page(page-id) from disk into frame V;
    pin-count(page-id) ← 1;
    dirty(page-id) ← ‘off’;
    Return address of frame V ;
```

**Page Release : Unpinning(page-id, dirty)**

```
pin-count(page-id) ← pin-count(page-id) - 1;
dirty(page-id) ← ‘on’ if modified
```
---

(예제)
- 버퍼 풀 테이블 / frame-id, page-id, dirty bit, pin-count
- 초기에는 각 프레임의 Pin-Count가 0으로 설정되어 있고 Dirty Bit는 꺼져 있음

![image](https://user-images.githubusercontent.com/55765292/136900909-4f4318f6-e4d3-4471-863d-ae9b5eacdfdb.png){: width="80%" height="80%"}{: .align-center}

- 어떤 페이지가 교체 후보인가?
    - {1, 3, 5, 6}
- 디스크에 다시 쓸 수 있는 페이지는 무엇인가?
    - {5}
- 모든 프레임의 핀 수가 0이 아니면 어떻게 되나?
    - suspend!!


## Buffer Replacement Policy

### Buffer Replacement Policy

- 버퍼에 공간이 없으면 **교체 정책**에 의해 고정 해제(unpinned)된 페이지가 선택되어야 함
    - LRU: Least Recently Used
    - Clock: Round-robin(Circle) + LRU
    - FIFO: First In First Out
    - MRU: Most Recently Used
- 선택한 정책은 I/O 성능에 큰 영향을 미침, **액세스 패턴**에 따라 다름
- Buffer Manager는 **cache hits**을 **최대화**하려고 시도합니다
    - 참조할 **가능성이 낮은** 페이지를 **교체**함
    - 참조할 **가능성**을 **미리 가져옴**
- 대부분의 시스템은 페이지 참조의 **과거 패턴**을 미래 참조의 예측자로 사용
- LRU는 널리 사용되는 정책. 최근에 참조된 페이지가 다시 참조될 가능성이 있다고 가정

### LRU

- 버퍼의 페이지에 액세스할 때마다 시간을 기록하는 테이블을 유지
- 마지막으로 사용된 각 프레임의 시간을 추적함

- 가장 최근에 사용된 고정 해제(unpinned)된 프레임을 교체 (= 가장 긴 시간 동안 사용되지 않음 = 최소 시간 값)

![image](https://user-images.githubusercontent.com/55765292/136902140-a6d583d6-391c-4391-8226-95344a9b861f.png){: width="80%" height="80%"}{: .align-center}

- 어떤 프레임이 교체 될까?
    - {6} → pin-count:0, last-used(최근 사용 시간) 최소값

- 일반적이고 널리 사용되는 정책: 가장 오래된 페이지는 다시 사용할 기회가 적다

### LRU/MRU + Repeated Scans

- LRU는 다음과 같은 특정 액세스 패턴에 대해 나쁜 전략이 될 수 있음
    - 전체 파일의 **반복 스캔**(예: 중첩 루프 조인)
- 버퍼에서 사용 가능한 N개의 프레임과 스캔할 파일에 1개 이상의 페이지가 있다고 가정(즉, 파일에 적어도 (N + 1) 페이지가 있음)
- LRU를 사용하면 파일을 스캔할 때마다 파일의 모든 페이지를 읽게 됨 → 이 경우 LRU가 최악의 교체 정책
- 메인메모리의 N 페이지 + (최소) N + 파일의 1 페이지 + 반복 스캔 + LRU는 **Sequential flooding**을 유발함
- 반복 스캔은 데이터베이스 워크로드에서 매우 일반적
- MRU는 이 상황에서 훨씬 더 좋습니다(물론 모든 상황에서 그런 것은 아님)

---

![image](https://user-images.githubusercontent.com/55765292/136903318-6957288e-571d-4d1f-afcf-9b54569edb24.png){: width="80%" height="80%"}{: .align-center}

LRU + Repeated Scans{: .text-center}

<br>

![image](https://user-images.githubusercontent.com/55765292/136903976-c82cc42f-0948-44e8-a538-4c8ad2e2df7f.png){: width="80%" height="80%"}{: .align-center}

MRU + Repeated Scans{: .text-center}

---

### MRU/LRU: Hybrid

- MRU + 반복 스캔

```

Given B buffers and N pages in a file where N > B;
    First N attempts: 0 hits; 
    Next N attempts: (B – 1) hits; Page 1 through B
    Next N attempts: (B – 1) hits; Page N through (B – 2)
    . . . . . . . . . . . 
        (B – 1)/N hit ratio(적중률)

```

- LRU + 반복 스캔

```

Given B buffers and N pages in a file where N > B;
    First N attempts: 0 hits; Page 1 through B
    Next N attempts: 0 hits; Page N through (B - 2
    . . . . . . . . . . . .
        zero hit ratio(적중률)

```

- Hybrid: LRU + MRU

- LRU는 임의 액세스에 적합
    e.g., individual access patterns: hot, cold pages.
- MRU는 반복 액세스에 적합
    e.g., file scans, joins(nested loops)

### Prefetching

- DBMS에서 대부분의 페이지 참조는 알려진 참조 패턴을 사용하므로 Buffer manager는 다음 몇 페이지 요청을 예상할 수 있음
- 경험적 연구에 따르면 일부 응용 프로그램에서 디스크 페이지를 요청하면 80%의 시간 동안 다음 페이지도 요청됨
    - e.g., traverse leaf pages in B+ tree, Nested Loop Joins, ...
- 따라서 Buffer manager는 페이지가 요청되기 전에 해당 페이지를 메모리로 가져올 수 있는데 이것을 **Prefetching**이라고 함
- 최신 DBMS는 특정 버퍼 프레임을 예약하고(자신의 주 메모리 캐시, 일반적으로 1MB) 이를 사용하여 페이지를 미리 가져옴
- 혜택
    - 페이지가 요청될 때 버퍼 풀에서 페이지를 사용할 수 있음
    - 연속된 페이지 블록을 읽는 것은 별개의 요청에 대한 응답으로 동일한 페이지를 다른 시간에 읽는 것보다 훨씬 빠름

**💡**<br>
**Buffer Manager : DBMS vs OS**<br>
**OS Buffer Manager를 사용하지 않는 이유는 무엇일까?**<br>
**DBMS Buffer Manager의 이점:**<br>
**- Predict Order: DBMS는 어떤 페이지에 접근할 것인지 더 정확하게 예측할 수 있음 (i.e., sequential scan, relational algebra)**<br>
**- Prefetching: 이러한 액세스 패턴을 정확하게 예측하면 페이지를 효율적으로 prefetching할 수 있음 → More buffer hits, then faster access**<br>
**- Explicit Writes: DBMS는 페이지가 디스크에 기록될 때 더 많은 제어가 필요함. 디스크에 페이지를 명시적으로 강제로 기록하는 기능이 필요 (e.g., crash recovery; log records, WAL)**<br>
**따라서 DBMS는 특정 OS 기능이나 서비스를 해제하여 자체 Buffer Manager가 있어야 함**<br>
{: .notice--primary}

### Representing Table

- SQL을 사용하여 다음 테이블을 생성했다고 가정

```

CREATE TABLE customer
    (  ID       CHAR(9)     PRIMARY KEY
     , name     CHAR(20)
     , addr     VARCHAR(50)
     , age      INT    
     , . . . . . .   )

```

- 상위 수준 DBMS는 주로 튜플 테이블을 관리함. 이러한 테이블은 **레코드 파일**로 구현됨
    - 1. **데이터 유형**을 **필드**로 표현하는 방법은 무엇인가?
    - 2. **튜플**을 **레코드**로 표현하는 방법은 무엇인가?
    - 3. **블록(페이지)**에 **레코드 모음**을 배치하는 방법은 무엇인가?
    - 4. **테이블(관계)**을 **블록** 모음으로 배치하는 방법은 무엇인가?


- 1. 데이터 유형을 필드로 표현
    - Integer : 2 ~ 4바이트
    - Float : 4 ~ 8바이트
    - Char(n) : n바이트 배열
    - VAR(n) : n+1바이트 배열

- 2. 튜플을 레코드로 표현
    - 테이블의 모든 튜플의 크기가 같으면 파일은 다음과 같이 구성
        - **고정 길이** 레코드
    - 테이블의 다른 튜플이 다른 크기를 갖는 경우(즉, 다양한 크기, 항목, 다중값 등) 파일은 다음과 같이 구성
        - **가변 길이** 레코드
- 3. 블록(페이지)에 레코드 모음을 배치하는 방법
    - 블록은 데이터 전송의 단위이기 때문에 파일의 레코드는 디스크 블록에 저장되어야 함
    - 블록 크기가 **B** 바이트라고 가정했을 때, **R** 바이트의 고정 길이 레코드의 경우 블록당 **bfr = B/R** 레코드를 저장할 수 있음. **bfr**은 **blocking factor**(= **블록당 저장된 레코드 수**)라고 함
        - **Bfr** = **B/R** 여기서 **B** : 블록 크기, **R** : 레코드 크기
        - 예를 들어, B = 1,024바이트, R = 100바이트, 그러면 bfr = B/R = 1024/100 = 10개 레코드/블록(각 블록의 24바이트는 미사용 공간)
    - **레코드(r)의 수**를 고려할 때 **몇 개의 블록(b)**이 필요한가?
        - **b = r/Bfr**
        - 예를 들어, r = 10,000개 레코드면 b = r/Bfr = 10,000/10 = 1,000개 블록이 필요

---
