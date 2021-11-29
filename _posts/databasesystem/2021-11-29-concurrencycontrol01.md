---
title: "[Database System] Concurrency Control (1)"
categories:
  - Database System
tags:
  - Database System
  - Concurrency Control
toc: true
toc_sticky: true
toc_label: "Concurrency Control"
toc_icon: "sticky-note"
---

# Database System

## Concurrency Control

### Locking Approach

![image](https://user-images.githubusercontent.com/55765292/143808147-02d404e5-1c60-4c1c-ae4b-b7552f61bd01.png){: width="80%" height="80%"}{: .align-center}


### Lock-Based Protocols

**잠금(locking)**은 데이터 항목에 대한 동시 액세스를 제어하는 ​​메커니즘입니다. 트랜잭션에 대한 데이터 항목을 읽거나 쓸 수 있는 권한을 얻습니다. **잠금**은 각 데이터 항목과 연결된 변수입니다.
읽기 또는 쓰기가 가능한 상태를 보여줍니다. 데이터 항목은 두 가지 모드로 잠글 수 있습니다.
  
- **S-Lock(A) : 공유(Shared)**
    - 트랜잭션 T가 데이터 항목 **A**에 대해 **S**-Lock을 획득하면 T는 **A**를 읽을 수 있습니다.
- **X-Lock(A) : 배타/독점(Exclusive)**
    - 트랜잭션 T가 데이터 항목 **A**에 대해 **X**-Lock을 획득하면 T는 **A**를 쓸 수 있습니다.
- **잠금 해제(A)**
    - 트랜잭션 T가 데이터 항목 **A에** 대한 읽기/쓰기를 완료하면 T는 **A에** 대한 모든 잠금을 해제합니다.


### Compatible Locking Table

![image](https://user-images.githubusercontent.com/55765292/143809366-8e3a08b0-2c22-4d26-8e19-cf6a955adad4.png){: width="30%" height="30%"}{: .align-center}

- **여러 개의** 트랜잭션이 해당 값을 **읽기** 위해 데이터 항목에 **S**-lock을 적용합니다. **하나**의 트랜잭션만 **쓰기**를 위해 데이터 항목에 **X**-lock을 적용합니다.
- 예를 들어, Ti가 데이터 항목 A에 대해 **X**-LOCK을 보유하고 있다고 가정합니다. Tj가 A에 대해 **S**-LOCK을 요청하면 이 요청은 거부됩니다. Tj는 Ti가 **X**-LOCK을 해제할 때까지 기다려야 합니다.
- 따라서 각 트랜잭션는
    - 읽기/쓰기 허용, 또는
    - 읽기/쓰기를 실행하는 것이 안전할 때까지 지연됩니다.


### Examples

**S-LOCK(A) :**

B:
```
if LOCK(A) = "unlocked" then
    {
        LOCK(A) ← "read-locked";
        no-of-reads(A) ← 1;
    }
else if LOCK(A) = "read-locked" then
    no-fo-reads(A) ← no-of-reads(A) + 1
else    / i.e., LOCK(A) = "write-locked" /
    {
        Wait until LOCK(A) = "unlocked" and the lock manager
        wakes up the transaction;
        go to B
    }
```

**X-LOCK(A)**

B:
```
if LOCK(A) = "unlocked" then
    LOCK(A) ← "write-locked";
else    / i.e., LOCK(A) = “write locked” or “read” locked /
    {
        Wait until LOCK(A) = “unlocked” and the lock manager
        wakes up the transaction; 
        go to B
    }
```

**UNLOCK(A)**

```
if LOCK(A) = “write-locked” then  
    {
        LOCK(A)  “unlocked”;
        Wake up one of the transactions (if any)   
    }
else if LOCK(A) = “read-locked” then
    {      
        no_of_reads(A)  no-of-reads(A) - 1
        if no_of_reads(A) = 0 then 
            {		  
                LOCK(A) = “unlocked”;
                Wake up one of the transactions (if any)
            }
    }
```

## Basic Locking Protocol

모든 데이터 항목 A에 대해 모든 트랜잭션 T는 다음 규칙을 따라야 합니다.

- T는 READ(A)가 T에서 수행되기 전에 S-LOCK(A)(또는 X-LOCK(A))을 요청해야 합니다.
- T는 WRITE(A)(또는 READ(A))가 T에서 수행되기 전에 X-LOCK(A)를 요청해야 합니다.
- T는 요청 lock(A에 대한)이 다른 트랜잭션이 보유한 다른 잠금과 호환되지 않는 경우 기다려야 합니다.
- T에서 모든 READ(A)와 WRITE(A)가 완료된 후 T는 UNLOCK(A)를 요청해야 한다.

### Example

- Consistency constraint : A = B

**T1**
```
READ(A)
A = A + 100
WRITE(A)
READ(B)
B = B + 100
WRITE(B)
```

**T2**
```
READ(A)
A = A * 2
WRITE(A)
READ(B)
B = B * 2
WRITE(B)
```

- basic locking protocol을 따른 transactions

**T1**
```
X-LOCK(A)
READ(A)
A = A + 100
WRITE(A)
UNLOCK(A)
X-LOCK(B)
READ(B)
B = B + 100
WRITE(B)
UNLOCK(B)
```

**T2**
```
X-LOCK(A)
READ(A)
A = A * 2
WRITE(A)
UNLOCK(A)
X-LOCK(B)
READ(B)
B = B * 2
WRITE(B)
UNLOCK(B) 
```

- 이런 locking protocol은 serializable schedule을 보장할 수 있는가?
    - 다음은 이를 위반하는 예제 이다.

![image](https://user-images.githubusercontent.com/55765292/143810709-43978042-9cb7-4c51-81d5-48a7a33fadff.png){: width="80%" height="80%"}{: .align-center}

- 이 schedule은 직렬화할 수 없습니다(B(=150)의 최종 값이 잘못되었습니다). T1이 너무 일찍 잠금을 해제한 것 같습니다!


## Two-Phase Locking(2PL) Protocol

모든 트랜잭션은 기본 잠금 프로토콜을 따라야 합니다. 또한 모든 트랜잭션에서 **모든 잠금은 모든 잠금 해제 요청보다 우선합니다.**

이는 두 단계로 구성됩니다.
- 1단계: **잠금(=확장) 단계**
    - 새로운 잠금을 획득했지만 아무 것도 해제할 수 없습니다.
- 2단계: **잠금 해제(=축소) 단계**
    - 기존 잠금을 ​​해제할 수 있지만 새 잠금을 얻을 수 없습니다.
- 트랜잭션은 필요한 모든 항목에 대한 잠금을 한 번 획득할 때까지 잠금을 해제할 수 없습니다.
- 트랜잭션은 잠금을 해제하면 추가 잠금을 요청할 수 없습니다.


![image](https://user-images.githubusercontent.com/55765292/143811828-aa367d9b-312e-4e88-857c-cafb6102aedd.png){: width="80%" height="80%"}{: .align-center}

- 2PL scheduel은 **first unlocks**에 따른 serial 트랜잭션 순서와 conflict equivalent합니다. 이는 트랜잭션이 **축소** 단계에 들어가는 순서를 의미합니다.
- schdule의 모든 트랜잭션이 **2PL을 따르는** 경우 conflict serializable합니다.
2PL은 오늘날 대부분의 데이터베이스 시스템에서 사용되는 동시성 제어입니다.

### Example 1

**T1**
```
READ(A)
A = A + 100
WRITE(A)
READ(B)
B = B + 100
WRITE(B)
```

**T2**
```
READ(A)
A = A * 2
WRITE(A)
READ(B)
B = B * 2
WRITE(B)
```

- 2PL protocol을 따른 transactions

**T1**
```
X-LOCK(A)
X-LOCK(B)
READ(A)
A = A +100
WRITE(A)
UNLOCK(A)
READ(B)
B = B + 100
WRITE(B)
UNLOCK(B)
```

**T2**
```
X-LOCK(A)
X-LOCK(B)
READ(A)
A = A * 2
WRITE(A)
UNLOCK(A)
READ(B)
B = B * 2
WRITE(B)
UNLOCK(B)
```

![image](https://user-images.githubusercontent.com/55765292/143812289-2479e73b-c05f-49ec-bd35-05a5d74a2c08.png){: width="80%" height="80%"}{: .align-center}

- 이제 스케줄 A는 serial 스케줄 T2 다음에 T1이 오는 것과 같기 때문에 conflict-serializable 합니다.


### Example 2

**T1**
```
READ(A)
A = A + 100
WRITE(A)
READ(B)
B = B + 100
WRITE(B)
```

**T2**
```
READ(A)
A = A * 2
WRITE(A)
READ(B)
B = B * 2
WRITE(B)
```

- 2PL protocol을 따른 transactions

**T1**
```
X-LOCK(A)
READ(A)
A = A +100
WRITE(A)
X-LOCK(B)
UNLOCK(A)
READ(B)
B = B + 100
WRITE(B)
UNLOCK(B)
```

**T2**
```
X-LOCK(A)
READ(A)
A = A * 2
WRITE(A)
X-LOCK(B)
UNLOCK(A)
READ(B)
B = B * 2
WRITE(B)
UNLOCK(B)
```

![image](https://user-images.githubusercontent.com/55765292/143812521-3028b289-fbf9-473e-99b4-a91711a619e6.png){: width="80%" height="80%"}{: .align-center}

- 스케줄 B는 T1이 뒤따르는 serial 스케줄 T2와 동일하기 때문에 conflict-serializable 합니다.


### Performance Degraded

- 2PL은 동시성의 양을 제한할 수 있습니다.
- 2PL은 이기적입니다. 장기 transaction에 유리할 수 있습니다.
- T1이 A, B, C, D, E, . . , 순차적으로, T2는 B에 액세스합니다.

![image](https://user-images.githubusercontent.com/55765292/143812908-93813d93-a081-467f-9a3f-9fdc735971cb.png){: width="50%" height="50%"}{: .align-center}

- 이 시점에서 T2가 B에 대한 잠금을 요청하나 거부되었습니다.
- T2는 T1이 모든 항목 C, D, E에 대한 모든 잠금을 해제할 때까지 기다려야 합니다...
- T1이 이미 항목 B에 대한 쓰기 작업을 완료했더라도 T1은 잠금을 해제할 수 없습니다.


## Deadlocks

- T1은 T2가 A에 대한 잠금을 해제하기를 기다리고 있고, T2는 T1이 B에 대한 잠금을 해제하기를 기다리고 있습니다.
- T1은 B에 대한 잠금을 해제할 수 없습니다. T2는 또한 A에 대한 잠금을 해제할 수 없습니다.
- 다른 트랜잭션도 A 또는 B에 액세스할 수 없습니다.

![image](https://user-images.githubusercontent.com/55765292/143813080-049ee4ed-5a79-48b2-8512-3e789aa903b9.png){: width="50%" height="50%"}{: .align-center}

- Deadlock: 서로의 잠금이 해제되기를 기다리는 트랜잭션의 주기입니다. 어느 거래도 진행할 수 없으며 영원히 기다립니다.
- Deadlock를 처리하는 두 가지 방법:
    - Deadlock 방지(prevention)
    - Deadlock 감지(detection)

### Deadlock Prevention : Timestamp

- 각 트랜잭션이 시작될 때 타임스탬프를 제공합니다.
- 이전 트랜잭션의 타임스탬프가 더 작습니다. 최근 트랜잭션이 더 큽니다.
- 작은 타임스탬프가 큰 것보다 우선 순위가 높습니다.
- Ti가 Tj가 보유하고 있는 충돌 잠금을 요청한다고 가정합니다.
    - **Wait-Die** : 비선점
        - Ti의 우선 순위가 더 높으면 Ti는 Tj를 기다립니다.
        - 그렇지 않으면 Ti가 중단되고 나중에 다시 시작됩니다.
    - **Wound-Wait** : 선점
        - Ti의 우선 순위가 더 높으면 Tj가 중단되고 나중에 다시 시작됩니다.
        - 그렇지 않으면 Ti가 기다립니다.
- 트랜잭션이 다시 시작되면 원래 타임스탬프를 제공합니다.


### Deadlock Prevention : Conservative 2PL

- 읽기 세트와 쓰기 세트를 미리 선언하여 트랜잭션이 실행을 시작하기 전에 액세스하는 모든 항목을 잠그려면 트랜잭션이 필요합니다.

![image](https://user-images.githubusercontent.com/55765292/143813618-95bc0d59-9a98-4ce0-a7b5-74da9f4bd501.png){: width="75%" height="75%"}{: .align-center}

- 미리 선언된 항목 중 잠글 수 없는 항목이 있는 경우 트랜잭션은 항목을 잠그지 않습니다. 모든 항목을 잠글 수 있을 때까지 기다립니다.

- 잠금 경합이 심한 경우 보수적인 2PL은 평균적으로 잠금이 유지되는 시간을 줄일 수 있습니다. 잠금을 유지하는 트랜잭션은 차단되지 않습니다.


### Deadlock Detection : Wait-For Graph

**대기 그래프** 생성
– 각 트랜잭션에 대해 노드를 생성합니다. Ti가 Tj를 기다리고 있는 경우 Ti에서 Tj까지 간선을 만듭니다.
– 시스템은 교착 상태를 주기적으로 확인합니다. 결과 그래프에 주기가 있으면 교착 상태가 발생한 것입니다!
 
**피해자 선정**
– 교착 상태를 해제하려면 주기에 있는 트랜잭션을 선택하고 중단하십시오.
– 최소 비용의 거래를 희생양으로 선택합니다. (즉, 가장 적은 잠금, 가장 적은 작업, 완료에서 가장 먼 등)
– 항상 동일한 트랜잭션이 희생자로 선택되면 기아(starvation)가 발생합니다.
– 기아를 피하기 위해 중단 횟수를 계산합니다.

![image](https://user-images.githubusercontent.com/55765292/143813838-ddb7f536-9cc4-4b8e-8ccf-4583e98df9f4.png){: width="80%" height="80%"}{: .align-center}
