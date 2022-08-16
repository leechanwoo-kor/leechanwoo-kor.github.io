---
title: "[Database System] Concurrency Control (2)"
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

## Locks

### Lock Conversions

- **Upgrading** Locks
    - 트랜잭션이 S-Lock을 요청한 다음 나중에 X-Lock을 요청하여 잠금을 업그레이드할 수 있습니다.
    - Ti에 S-Lock(A)이 있고 다른 트랜잭션 Tj에 S-lock(A)이 없는 경우 S-Lock(A)를 X-Lock(A)로 변환합니다.
    - 그렇지 않으면 Tj가 S-lock(A)을 해제할 때까지 Ti를 강제로 기다리십시오.
- **Downgrading** Locks
    - 트랜잭션이 X-Lock을 요청한 다음 나중에 S-Lock을 요청하여 잠금을 다운그레이드할 수 있습니다.
    - T에 X-Lock(A)이 있으면 X-Lock(A)을 S-Lock(A)으로 변환합니다.
- 예를 들어, SQL 업데이트는 테이블의 각 튜플에 대해 S 잠금을 보유합니다. 튜플이 WHERE 조건을 만족하는 경우 해당 튜플에 대해 X 잠금을 얻어야 합니다.

### Upgrading Locks : Example

**T1**
```
READ(A1)
READ(A2)
READ(A3)
READ(A4)
WRITE(A3)
WRITE(A4)
```

**T2**
```
READ(A1)
READ(A3)
PRINT(A1+A3)
```

```
    T1              T2
    S-LOCK(A1)
                    S-LOCK(A1)
    S-LOCK(A2)
    S-LOCK(A3)
    S-LOCK(A4)
                    S-LOCK(A3)
                    UNLOCK(A1)
                    UNLOCK(A3)
    // Upgrade
    X-LOCK(A3)
    X-LOCK(A4)
```

- Lock을 업그레이드하면 T1과 T2가 동시에 A1과 A3에 친숙하게 액세스할 수 있기 때문에 더 많은 동시성을 제공합니다.


### Upgrading Locks : Deadlocks

불행히도 업그레이드를 사용하면 잠재적으로 deadlock이 발생할 수 있습니다. 두 개의 트랜잭션이 동일한 데이터 항목에 대한 잠금을 업그레이드한다고 가정합니다. 이것은 deadlock으로 이어집니다.

![image](https://user-images.githubusercontent.com/55765292/143817905-4532b736-ab12-43a3-98b4-98bdcddc8021.png){: width="70%" height="70%"}{: .align-center}

Dadlock을 피하는 더 나은 방법은 잠금을 다운그레이드하는 것입니다.

![image](https://user-images.githubusercontent.com/55765292/143817920-73876e32-3d12-45c0-9725-0d2235e45b94.png){: width="70%" height="70%"}{: .align-center}

다운그레이드 접근 방식은 필요하지도 않고 필요하지도 않은 경우에 X 잠금을 획득하여 동시성을 줄입니다. 그러나 deadlock을 줄여 처리량을 향상시킵니다. 많은 DBMS에서 널리 사용됩니다.


## Granularity

### Locking Unit Size

지금까지 각 개별 데이터 항목을 잠금 장치로 사용했습니다. 그러나 여러 데이터 항목을 그룹화하여 잠금 단위로 취급하는 것이 일반적입니다.

예를 들어, 일부 트랜잭션 Ti가 전체 데이터베이스에 액세스해야 하는 경우 Ti는 각 데이터 항목을 잠가야 합니다. 분명히 이것은 시간이 많이 걸립니다. Ti가 전체 데이터베이스를 잠그기 위해 **단일** 잠금 요청을 받으면 더 좋을 것입니다. 반면에 Tj가 소수의 데이터 항목에만 액세스하려는 경우 낮은 동시성으로 인해 전체 데이터베이스를 잠글 필요가 없습니다.

데이터 항목의 **잠금 크기**는 단위를 정의합니다. 이는 **거칠거나(크거나) 미세(작음)**할 수 있습니다. 계층형 구조는 **트리**로 나타낼 수 있습니다.


### Granularity Hierarchy

![image](https://user-images.githubusercontent.com/55765292/143818422-6a6d8253-851a-4c48-9057-3710495e7fa1.png){: width="70%" height="70%"}{: .align-center}

잠금 단위:
- Fine granularity(트리 아래)
    - 높은 동시성, 높은 잠금 오버헤드
- Coarse granularity(트리에서 더 높음)
    - 낮은 잠금 오버헤드, 낮은 동시성


### Multi-Granularity Locking

![image](https://user-images.githubusercontent.com/55765292/143818775-27acadd4-3d8b-4dd1-bd1e-98b98782f436.png){: width="50%" height="50%"}{: .align-center}

- Ti는 rb2만 읽기를 원합니다. 그런 다음 Ti는 rb2에 대해 S-Lock을 요청할 수 있습니다. 이제 Tj가 페이지 A1의 모든 튜플을 업데이트하려고 한다고 가정합니다.
- 시스템은 노드 A1을 잠글 수 있는지 어떻게 결정합니까? 이 경우 시스템은 노드 A1의 자손인 모든 노드(관계 및 튜플)를 확인해야 합니다. 이것은 매우 비효율적입니다.


## Warning Protocol

서로 다른 트랜잭션이 서로 다른 granularity를 잠글 수 있도록 허용합니다. **경고(=의도적) 잠금**이라고 하는 새로운 잠금 모드를 소개합니다.

세분화된(**fine**-grained) 데이터를 잠그기 전에 이를 포함하는 **coarse** 데이터에 대해 "의도 잠금(intention locks)"을 얻습니다. 노드가 의도 모드에서 잠긴 경우 명시적 잠금은 트리의 더 낮은(세밀한 단위) 수준에서 수행됩니다.

따라서 트랜잭션은 노드를 성공적으로 잠글 수 있는지 여부를 결정하기 위해 전체 트리를 검색할 필요가 없습니다.

노드를 잠그기 위해 대기 중인 트랜잭션(예: N)은 루트에서 N으로의 경로를 통과해야 합니다.

이 경로를 통과하는 동안 트랜잭션은 의도 모드에서 다양한 노드를 잠글 수 있습니다.

---

- 경고**Warning**(=의도**Intention**) 잠금**Lock**
    - **Intention-Shared(IS)** : 트리의 일부 하위(하위, 미세) 노드에서 명시적 **S-Lock**이 요청됩니다.
    - **Intention-eXclusive(IX)** : 트리의 일부 하위(하위, 미세) 노드에서 명시적 **X-Lock**이 요청됩니다.
- Multiple Granularity Lock Compatibility

![image](https://user-images.githubusercontent.com/55765292/143822676-52471b9b-c630-43e9-98f8-f7eb68abe2d2.png){: width="50%" height="50%"}{: .align-center}

---

![image](https://user-images.githubusercontent.com/55765292/143822799-11c096f1-5875-47fb-b170-eccc318c97fb.png){: width="50%" height="50%"}{: .align-center}

- 순서대로 허용, 비허용, 허용

---

직렬성을 보장하기 위해 각 트랜잭션 T는 다음 규칙을 준수하여 노드 N을 잠글 수 있습니다.

- (1) T는 잠금 호환성 규칙을 준수해야 합니다.
- (2) 모든 모드에서 루트 노드가 먼저 잠겨 있어야 합니다.
- (3) T는 N의 부모가 이미 **IS** 또는 **IX**에서 잠겨 있는 경우에만 **S** 또는 **IS** 모드에서 노드 N을 잠글 수 있습니다.
- (4) T는 N의 부모가 이미 **IX** 중 하나에 잠겨 있는 경우에만 **X** 또는 **IX** 모드에서 노드 N을 잠글 수 있습니다.
- (5) T는 이전에 어떤 노드도 잠금 해제하지 않은 경우에만 노드를 잠글 수 있습니다. (2PL을 시행하기 위해).
- (6) T는 N 잠금의 자식이 현재 잠금 해제되지 않은 경우에만 노드 N을 잠금 해제할 수 있습니다.

---

![image](https://user-images.githubusercontent.com/55765292/143824716-fe833e2a-28b9-4d8d-9b18-c454d6f646b1.png){: width="50%" height="50%"}{: .align-center}

'E3'에 쓰기를 원한다고 가정합니다.
- IX-Lock : A → B → E
- X-Lock : E3
- Unlock : E3 → E → B → A (역순)


### Example

- T1은 고객 **relation**에서 **IS-lock**을 얻은 다음 이름이 joe인 튜플에서 **S**-lock을 얻습니다.

**T1**
```
    SELECT *
      FROM Customers
     WHERE name = joe
```

- T2는 고객 **relation**에 대해 **S**-lock을 획득합니다.

**T2**
```
    SELECT *
      FROM Customers
```

- T3는 고객 **relation**에서 **IX**-lock을 얻은 다음 이름이 bob인 **튜플**에서 **X**-lock을 얻습니다.

**T3**
```
    UPDATE Customers
       SET rate = 7
     WHERE name = bob
```

- 참고: T1은 T2 및 T3 모두와 호환됩니다. 그러나 T3는 T2와 호환되지 않습니다.


## Phantom

### Dynamic Databases and Phantom

지금까지는 DB가 고정된 데이터 항목 모음이라고 가정했습니다. 이제 이러한 제한을 완화하여 데이터베이스가 삽입 및 삭제를 통해 확장 및 축소될 수 있도록 할 수 있습니다.

다음 두 트랜잭션을 고려하십시오.
- (1) T1은 등급 = 1 및 2에 대해 가장 오래된 고객을 찾기 위해 고객을 스캔합니다.
- (2) T1은 등급이 1인 가장 오래된 고객을 찾습니다(예: 71).
- (3) T2는 등급이 1이고 연령이 96인 새 고객을 삽입합니다.
- (4) T2는 등급 = 2(예: 연령 = 80)인 가장 오래된 고객을 삭제하고 커밋합니다.
- (5) 마지막으로 T1은 등급이 2인 가장 오래된 고객을 찾습니다(예: 연령 = 63).

이 인터리브 실행의 결과는 71세와 63세이며 이는 올바르지 않습니다. T1이 먼저 실행되면 T2가 실행됩니다. 71세와 80세; T2가 먼저 실행되면 T1이 실행됩니다. 따라서 이 schedule은 serializable 하지 않습니다.

---

- (1) 및 (2) 단계에서 T1은 등급 = 1인 고객 레코드가 포함된 모든 페이지를 S로 잠급니다.
- (3) 단계에서 등급 = 1인 고객이 포함되지 않은 페이지에 새 고객 레코드를 삽입할 수 있습니다. 이러한 종류의 삽입된 레코드를 **팬텀**이라고 합니다.
- 또한 (3) 단계에서 이 삽입된 페이지의 X-lock은 T1이 보유한 S-lock과 충돌하지 않습니다.
- 이 일정은 2PL을 따르지만 결과는 serial schedule과 동일하게 충돌하지 않습니다.


### Phantom Records

이러한 문제의 원인은 2PL이 아닙니다. 오히려 T1은 등급이 1인 모든 고객 레코드 집합을 잠갔다고 암시적으로 가정했습니다.
- 이 가정은 T1이 실행되는 동안 고객 레코드가 추가되지 않은 경우에만 유효합니다!
- 페이지를 잠그면 새 팬텀 레코드가 다른 페이지에 삽입되는 것을 방지할 수 없습니다.

예는 2PL이 데이터 항목 집합이 고정된 경우에만 직렬성을 보장한다는 것을 보여줍니다. 새로운 데이터 항목이 데이터베이스에 추가되는 경우 2PL은 직렬성을 보장하지 않습니다.

이 문제를 해결하기 위한 메커니즘이 필요합니다.


### Index Locking

등급 필드에 색인이 있는 경우 T1은 등급이 1인 색인 항목이 포함된 색인 페이지를 잠가야 합니다.

적절한 인덱스가 없으면 T1은 모든 페이지를 잠그고 파일/테이블을 잠가 새 페이지가 추가되는 것을 방지하여 등급 = 1인 새 레코드가 추가되지 않도록 해야 합니다. 시간이 많이 걸린다!

B+ 트리 기반 index locking을 도입합니다.


### Performance of Locking

잠금은 트랜잭션 간의 충돌을 해결하는 데 사용됩니다.
- 중단**aborts**(다시 시작**restart**)
    - Deadlock으로 인한 충돌은 거의 발생하지 않습니다(트랜잭션의 1%만).
- 차단**blockings**(대기**Wait**)
    - lock conflict로 인해 발생하는 성능 저하의 주원인인 오버헤드입니다.

![image](https://user-images.githubusercontent.com/55765292/143830623-45de2978-f3c5-4e3c-a0ed-28d57fbacf98.png){: width="70%" height="70%"}{: .align-center}

**Locking Thrashing**은 DBMS가 다른 새로운 트랜잭션을 추가하면 모든 활성 트랜잭션 간의 잠금이 완료되어 처리량이 감소하는 지점에 도달할 때 발생합니다.

---

읽기/쓰기 트랜잭션 수가 증가하면 스래싱 지점에 도달할 때까지 처리량이 증가합니다. 그런 다음 이러한 트랜잭션에 X-lock이 필요하기 때문에 감소합니다.

읽기 전용 트랜잭션 수가 증가하면 처리량도 증가하여 더 많은 concurrency가 발생합니다.

Thrash 지점에서 DBA는 활성 트랜잭션의 수를 줄여야 합니다. 일반적으로 locking thrashing은 활성 트랜잭션의 30%가 차단될 때 발생합니다.

처리량 증가를 위한 조정
- 가능한 가장 작은 크기의 데이터 항목을 잠그는 방식으로
- 트랜잭션 보류 잠금 시간을 줄임으로써
- 핫스팟, 데이터 항목, 자주 액세스 및 수정되는 항목을 줄임으로써


## Optimistic Concurrency Control

잠금은 충돌을 방지하는 비관적인 접근 방식입니다.

- 단점(Locking approach)
    - 잠금 관리 오버헤드
    - 교착 상태 감지/방지
    - 많이 사용되는 개체에 대한 잠금 경합

Conflict가 드문 경우 잠금을 사용하지 않고 대신 트랜잭션이 커밋되기 전에 충돌을 확인하여 concurrency를 얻을 수 있습니다.

---

낙관적 동시성 제어는 잠금을 사용하지 않습니다. 대신 각 트랜잭션에는 3단계가 있습니다.

- 읽기**Read**: 데이터베이스에서 읽지만 데이터 항목의 개인 메모리 복사본을 변경합니다.
- 유효성**Validate**(검사): 트랜잭션이 커밋하려는 경우 충돌을 확인합니다. 충돌하는 경우 트랜잭션을 중단하고 복사본을 지우고 다시 시작합니다. 그렇지 않으면 쓰기 단계로 이동합니다.
- 쓰기**Write**: 데이터 항목 변경 사항의 개인 메모리 복사본을 디스크에 씁니다.

---

- 타임스탬프는 유효성 검사가 시작되기 직전인 읽기 단계가 끝날 때 각 트랜잭션에 할당됩니다.
- 각 트랜잭션 T에는 Read-Set(T) 및 Write-Set(T)가 있습니다.
- 유효성 검사는 타임스탬프 순서가 직렬 순서와 동일한지 여부를 확인합니다.
- 모든 트랜잭션 Ti 및 Tj 쌍에 대해 **Tj를 검증하려면** TS(Ti) < TS(Tj)가 되도록 커밋된 각 트랜잭션 Ti에 대해 다음 **3가지 테스트** 중 하나가 유지되어야 함을 확인해야 합니다.


### Test 1

TS(Ti) < TS(Tj)인 모든 i 및 j에 대해 다음을 확인하십시오.
- Tj가 시작되기 전에 Ti가 완료됩니다(3단계 모두).

![image](https://user-images.githubusercontent.com/55765292/143832167-ce368c41-578b-41c4-8828-2c5cf47fd4a5.png){: width="40%" height="40%"}{: .align-center}

테스트 1이 만족된다고 가정합니다.
- 이것은 완전히 직렬화 가능합니다.


### Test 2


TS(Ti) < TS(Tj)인 모든 i 및 j에 대해 다음을 확인하십시오.
- Ti는 Tj가 쓰기 단계를 시작하기 전에 모든 단계를 완료합니다.
- Write-Set (Ti)  Read-Set (Tj)가 비어 있음 (= Ti는 Tj가 읽은 데이터 항목을 쓰지 않습니다)

![image](https://user-images.githubusercontent.com/55765292/143832292-22090bbc-6c15-4cde-abb3-8ff3c3e36a69.png){: width="40%" height="40%"}{: .align-center}

테스트 2가 만족된다고 가정합니다.
- Tj는 dirty data를 읽습니까? : 아니요!
- Tj가 Ti의 쓰기를 덮어쓰나요?: 네, 하지만 괜찮습니다. Ti의 쓰기는 Tj의 모든 쓰기보다 우선합니다.

### Test 3

TS(Ti) < TS(Tj)인 모든 i 및 j에 대해 다음을 확인하십시오.
- Tj가 읽기를 완료하기 전에 Ti가 읽기 단계를 완료합니다.
- 쓰기 세트(Ti)  읽기 세트(Tj)가 비어 있음
- 쓰기 세트(Ti)  쓰기 세트(Tj)가 비어 있습니다.

![image](https://user-images.githubusercontent.com/55765292/143832617-9934043c-d2a3-44fa-8c75-05fed2ec7f98.png){: width="40%" height="40%"}{: .align-center}

 테스트 3이 만족된다고 가정합니다.
- Tj가 더티 데이터를 읽습니까?: 아니요
- Ti가 Tj의 쓰기를 덮어쓰나요?: 예, 하지만 괜찮습니다. 두 트랜잭션에 의해 작성된 항목 세트는 겹칠 수 없습니다.


---

![image](https://user-images.githubusercontent.com/55765292/143832740-1cf1d88d-25b1-4438-b93f-4acd7167ff41.png){: width="50%" height="50%"}{: .align-center}

---

### Strict 2PL

- 트랜잭션 T는 커밋(또는 중단)할 때까지 잠금을 해제하지 않습니다.
- T가 커밋하지 않는 한 다른 트랜잭션은 T가 쓴 데이터 항목을 읽거나 쓸 수 없습니다. 모든 X-lock은 T가 커밋할 때까지 유지됩니다.
- Strict 2PL은 허용된 모든 일정이 엄격함을 보장하여 2PL을 향상시킵니다. 왜요?
- 엄격한 2PL은 충돌 직렬화 및 복구 가능하고 cascade-less schedules를 보장합니다.


## Transactions in SQL

- 때로는 전체 ACID 규칙을 따를 필요가 없을 수도 있습니다.
우리는 더 많은 동시성을 얻기 위해 오버헤드를 제거하여 "나쁜" 일정을 허용하고자 합니다.
- SQL은 두 가지 액세스 모드를 제공합니다. 읽기 전용 및 읽기/쓰기;
읽기 전용 트랜잭션의 경우 삽입, 업데이트 등이 불가능하지만 S-lock 모드만 필요하므로 동시성이 증가합니다.
- SQL은 또한 4가지 격리 수준을 제공합니다. 트랜잭션은 다음 레벨 중 하나를 갖도록 선택할 수 있습니다.
    - 커밋되지 않은 읽기
    - 읽기 커밋
    - 반복 읽기
    - 직렬화 가능

### Isolation Level

커밋되지 않은 읽기
- 트랜잭션은 진행 중인 트랜잭션으로 변경 사항을 읽고 쓸 수 있습니다.
- 대부분 읽기 전용 트랜잭션
- 자물쇠가 필요하지 않습니다.
- 가장 약한 격리 수준(권장하지 않음!)

커밋된 읽기
- 트랜잭션 T는 커밋된 트랜잭션에 의한 변경 사항만 읽습니다.
- "더티 데이터"를 허용하지 않습니다.
- 그러나 T가 읽은 값은 T가 아직 진행 중인 동안 다른 트랜잭션에서 수정할 수 있습니다.
- "반복할 수 없는 읽기" 허용

반복 읽기
- 다른 트랜잭션은 현재 트랜잭션이 커밋될 때까지 현재 트랜잭션에서 읽은 데이터를 업데이트할 수 없습니다.
- "반복할 수 없는 읽기"를 허용하지 않습니다.
- 엄격한 2PL이 사용됩니다.
- 인덱스(B+ 트리) 잠금 없음; 팬텀이 발생할 수 있습니다.

직렬화 가능
- 기본 수준(대부분의 DBMS) : 가장 강력한 격리 수준
- "더티 데이터"를 허용하지 않습니다.
- "반복할 수 없는 읽기"를 허용하지 않습니다.
- "팬텀"을 허용하지 않습니다.
- 엄격한 2PL이 사용됩니다.
- 인덱스(B+ 트리) 잠금을 사용합니다.


## Summary

![image](https://user-images.githubusercontent.com/55765292/143833927-a1f14925-cddb-46a4-88ef-e0ee7d5bbe24.png)
