---
title: "[Database System] Transaction Management"
categories:
  - Database System
tags:
  - Database System
  - Transaction Management
toc: true
toc_sticky: true
toc_label: "Transaction Management"
toc_icon: "sticky-note"
---

# Database System

## Transaction Management

### Transactions

**트랜잭션**은 DBMS 내의 데이터베이스에 액세스하고 업데이트하는 프로그램 실행 단위입니다. DBMS 외부의 프로그램(즉, UNIX를 사용하는 C프로그램)과 다릅니다. 예를 들어, 계좌에서 돈을 인출합니다.

```
    UPDATE account
       SET bal = bal -100
     WHERE acc_no = 123
```

트랜잭션은 많은 작업을 실행하지만 DBMS는 데이터베이스에서 읽고 쓰는 데이터에만 관심이 있습니다.

```
    READ(X)
    X = X - 100
    WRITE(X)
```

- READ(X) : 디스크의 데이터 항목 X를 메모리의 로컬 변수 X로 읽습니다.
- CPU 작업 수행
- WRITE(X) : 메모리의 로컬 변수 X의 변경된 값을 디스크의 데이터 항목 X에 씁니다.


### Example : Transaction

계좌 A에서 B로 100% 송금 :

![image](https://user-images.githubusercontent.com/55765292/143389859-a36e91a1-cdb5-46dc-9266-23c9f8b9af00.png){: width="80%" height="80%"}{: .align-center}

- 3, 6 단계는 실제로 디스크의 데이터 항목을 업데이트합니다.
- 경우에 따라 수정된 메모리 내용이 디스크에 즉시 저장되지 않습니다. 즉, 수정된 모든 내용은 나중에 어떤 시점으로 연길될 수 있습니다.
- 디스크에 언제 저장할지 결정하는 것은 복구 관리자(=revover manager)가 처리합니다.


## Concurrency

### Concurrency in DBMS

많은 응용 프로그램에서 동시에 데이터 액세스하려면 많은 사용자가 필요합니다. 시스템에서 여러 트랜잭션을 동시에 실행할 수 있습니다.
    - 동시성은 다양한 트랜잭션의 작업(데이터 항목 읽기/쓰기)을 **interleaves** 하는 DBMS에 의해 달성됩니다.

**좋은** DBMS **성능**을 위해서는 사용자 프로그램의 **동시** 실행이 필수적입니다. 디스크 액세스는 빈번하고 상대적으로 느립니다.
    - 프로세서 및 디스크 활용도가 높아져 트랜잭션 **처리량**이 향상됩니다. 즉, **다중 프로그래밍**
    - 트랜잭션에 대한 평균 **응답 시간** 감소
        - Long-term transactions vs Short-term transactions


### Interleaved vs. Serial

트랜잭션 T1 및 T2가 제출되었다고 가정합니다. 두 가지 가능한 실행이 있습니다. 인터리브(동시) 대 직렬

![image](https://user-images.githubusercontent.com/55765292/143393196-f1bd5f57-910e-40bf-a237-47652b918232.png){: width="80%" height="80%"}{: .align-center}


### Interleaved Execution : Example

다음 두 트랜잭션이 있다고 가정해보자.

- A(123)
```
    UPDATE account
       SET bal = bal - 100
     WHERE acc_no = 123
```

- B(125)
```
    UPDATE account
       SET bal = bal + 200
     WHERE acc_no = 125
```

다음은 인터리브 처리된 두 트랜잭션의 예입니다.

```
        A               B
    READ(X)
                    READ(Y)
    X = X - 100
                    Y = Y + 200
    WRITE(X)
                    WRITE(Y)
```

무슨 일이 일어나겠는가?

---

**왜 Concurrency Control이 필요한가?**

제어되지 않은 동시 액세스는 혼란을 초래할 수 있습니다. 따라서 일부 제어 메커니즘이 필요합니다. 예를 들어,

- A(123)
```
    UPDATE account
       SET bal = bal + 100
     WHERE acc_no = 123
```

- B(123)
```
    UPDATE account
       SET bal = bal - 200
     WHERE acc_no = 123
```

이 두 트랜잭션이 다음과 같이 동시에 실행되었다고 가정합니다.

```
        A               B
    READ(X)
                    READ(X))
    X = X + 100
                    X = X - 200
    WRITE(X)
                    WRITE(X)
```

무슨 일이 일어나겠는가?

---

**왜 Recovery Mechanism이 필요한가?**

통제되지 않은 복구 절차는 혼란을 초래할 수 있습니다. 따라서 일부 제어 메커니즘이 필요합니다. 예를 들어,

```
    UPDATE account
       SET bal = bal - 100
     WHERE acc_no = 123
    UPDATE account
       SET bal = bal + 100
     WHERE acc_no = 125
```

다음과 같이 송금 중 거래가 실패했다고 가정합니다.

```
    READ(X)
    X = X - 100
    WRITE(X)
    Fail (Crash)!
    READ(Y)
    Y = Y + 100
    READ(Y)
```

무슨 일이 일어나겠는가?


## DBMS's Roles

- **트랜잭션 관리자**
    - 관련 SQL 명령을 수신하여 트랜잭션 실행을 조정합니다.

- **동시성 제어 관리자**
    - 일관되고 동시적인 일정 보장
    - 직렬화 가능한 일정
    - 잠금 관리자
    - 격리


- **복구 관리자**
    - 트랜잭션 실패가 발생하더라도 복구 가능하고 계단식 없는 엄격한 일정을 보장합니다.
    - 로그 관리자
    - 원자성 및 내구성


### ACID rules

- Atomicity(=원자성)
    - 트랜잭션은 처리의 원자 단위입니다. **모든** 작업을 수행하거나 **전혀** 수행하지 않습니다.
    - 트랜잭션이 중단되면 지금까지 수행된 모든 작업을 **실행 취소**하여 롤백해야 합니다.
- Consistency(=일관성)
    - 트랜잭션의 올바른 실행은 트랜잭션 실행 **전후**의 **올바른** 데이터베이스 값을 유지해야 합니다.
    - 트랜잭션을 코딩하는 것은 애플리케이션 프로그래머의 책임입니다.
- Isolation(=격리)
    - 트랜잭션은 **커밋될 때까지** 업데이트를 다른 트랜잭션에 **표시해서는 안 됩니다.**
    - 중간 트랜잭션 결과는 동시에 실행되는 다른 트랜잭션에서 숨겨야 합니다.
- Durability(=내구성)
    - 트랜잭션이 성공적으로 완료된 후 **변경 사항**이 **손실되지 않아야 합니다.**
    - 시스템 장애가 발생한 경우 로그 파일을 추적하여 쓰기 작업의 효과를 **다시 실행**할 수 있습니다.


### ACID rules : Atomicity, Consistency, Durability, Isolation

계정 A에서 B로 $100를 이체하는 트랜잭션 T를 고려하십시오.
    - A = 1,000, B = 2,000으로 초기값 가정

```
1) READ(A)
2) A = A - 100 
3) WRITE(A)
4) READ(B)
5) B = B + 100
6) WRITE(B)
```

- **원자성**
    - 3) 단계 이후 및 6) 이전에 트랜잭션 T가 실패하면(S/W 또는 H/W 오류로 인해) T는 일시적으로 잘못된 A 값(즉, A = 900)을 갖습니다.
    - 시스템은 부분적으로 실행된 트랜잭션의 업데이트가 데이터베이스에 반영되지 않도록 해야 합니다.
    - T는 롤백되어야 하고(실패하기 전에 수행된 모든 작업을 취소(UNDO) 취소) A의 값을 이전 값으로 다시 변경해야 합니다(즉, A = 1,000).

- **일관성**
    - A와 B의 합은 T의 실행에 의해 변경되지 않아야 합니다.
    - 트랜잭션 T는 실행을 시작할 때 일관된 데이터베이스를 확인해야 합니다. (즉, A = 1,000, B = 2,000)
    - 트랜잭션 실행 중 데이터베이스가 일시적으로 일치하지 않을 수 있습니다. (즉, A = 900, B = 2,000) 하지만 괜찮습니다.
    - T가 성공적으로 완료되면 데이터베이스도 일관성이 있어야 합니다(즉, A = 900, B = 2,100). 잘못된 트랜잭션 논리로 인해 불일치가 발생할 수 있습니다. 사용자의 책임!

- **내구성**
    - 사용자가 트랜잭션 T가 완료되었다는 알림을 받으면(즉, $100 전송이 발생함) 트랜잭션에 의한 데이터베이스 업데이트가 지속되어야 합니다.
    - 시스템은 A와 B의 최종 값(즉, A = 900, B = 2,100)이 H/W 장애가 있더라도 디스크에 안전하게 기록되어야 함을 보장해야 합니다. (REDO)

<br>
동시에 실행할 두 개의 트랜잭션 T1과 T2를 고려하십시오.
    - A = 1,000, B = 2,000으로 초기값 가정

- T1

```
1) READ(A)
2) A = A - 100 
3) WRITE(A)
    ...
7) READ(B)
8) B = B + 100
9) WRITE(B)
```

- T2

```
4) READ(A)
5) READ(B)
6) PRINT(A+B)
```

- **격리**
    - 3단계와 6단계 사이에 다른 트랜잭션 T2가 부분적으로 업데이트된 데이터베이스에 액세스할 수 있는 경우 T2에 잘못된 값이 표시됩니다(즉, 합계 A + B는 $3,000 미만).
    - 트랜잭션을 직렬로 실행하여 격리를 보장할 수 있습니다. 즉, 차례로.


## Transaction


### Operations for Transaction

트랜잭션 관리자는 다음 작업이 필요합니다.

- **Begin** : 트랜잭션 실행의 시작.
- **Read/Write** : 실제 실행 작업을 지정합니다.
- **End** : 트랜잭션 실행 종료 여부를 확인할 필요가 있다
    - 트랜잭션에 의한 변경 사항은 데이터베이스에 영구적으로 기록될 수 있습니다.
    - 동시성 제어를 위반하거나 다른 이유로 트랜잭션을 중단해야 합니다.
- **Commit** : 트랜잭션이 성공적으로 종료되었습니다.
    - 트랜잭션에 의해 실행된 모든 변경 사항은 데이터베이스에 안전하게 기록될 수 있으며 실행 취소되지 않습니다.
- **Rollback(or Abort) : 트랜잭션이 성공적으로 종료되지 않았습니다.
    - 트랜잭션에 의해 실행된 모든 변경 사항을 취소해야 합니다.
    - 트랜잭션을 죽여라!


### Transaction States

트랜잭션 처리는 다음 상태로 구성됩니다.
 
- **Active**
    - 초기 상태; 트랜잭션은 읽기/쓰기 작업을 실행하는 동안 이 상태를 유지합니다.
- **Partially Committed**
    - 최종 작업이 실행된 후.
- **Failed**
    - 정상적인 실행을 더 이상 진행할 수 없음을 발견한 후.
- **Aborted**
    - 트랜잭션이 롤백되고 데이터베이스가 트랜잭션 시작 전의 상태로 복원된 후.
- **committed**
    - 성공적인 완료 후.

---

**State Transition Diagram : Transaction**{: .text-center}

![image](https://user-images.githubusercontent.com/55765292/143402459-ecc3c8ef-f2b5-4f58-b7fe-48be7118475a.png){: width="80%" height="80%"}{: .align-center}

---


## Scheduling Transactions

- **Serial schedule**
    - 인터리브(개입 없음) 작업이 없는 일정입니다.
    - 활성 트랜잭션의 커밋(또는 중단)만이 다음 트랜잭션의 실행을 시작합니다.
    - 모든 연속 일정은 일관성을 보장합니다. 많은 트랜잭션을 다른 순서로 연속적으로 실행하면 다른 결과가 생성될 수 있습니다. 그러나 모든 결과는 정확합니다.
    - 직렬 스케줄은 CPU 시간을 낭비하여 동시성을 제한합니다. 따라서 직렬 일정은 실제로 허용되지 않습니다.
- **Non-serial(=Concurrent) schedule**
    - 연속되지 않는 일정입니다.
    - 연속적이지 않은 일정도 허용되지만 일관성을 보장하지는 않습니다.


### Examples : Schedules

- Serial Schedules

![image](https://user-images.githubusercontent.com/55765292/143403830-2988be49-41a9-40b7-904f-b758d573d1f3.png){: width="80%" height="80%"}{: .align-center}

- Non-Serial Schedule

![image](https://user-images.githubusercontent.com/55765292/143403844-a977d11d-ddd7-493b-b2c4-92b978c5931d.png){: width="80%" height="80%"}{: .align-center}


### Equivalence of Schedules

- 실제로 우리는 **동시성**과 **일관성**을 모두 보장함으로써 "**좋은**" schedule이 정말로 필요합니다.
- schedule(n 트랜잭션 포함)은 일부 serial schedule과 **동일**한 경우 **serializable**할 수 있습니다. 따라서 serializable schedule도 일관됩니다.
- n이 있습니다! 가능한 연속 일정 및 더 많은 가능한 비연속 일정; 비연속 일정을 두 개의 분리된 그룹으로 분류할 수 있습니다. serializable과 non-serializable
- 그건 그렇고, "Equivalence"의 의미는 무엇입니까?; schedule들의 동등성을 정의하는 방법에는 여러 가지가 있습니다.
    - Result Equivalence (Not useful!)
    - Conflict Equivalence
    - View Equivalence

![image](https://user-images.githubusercontent.com/55765292/143407656-baabe821-bc48-4cf4-a352-b952e967fc55.png){: width="80%" height="80%"}{: .align-center}


### Conflicting Operations

- 일정의 두 **작업**은 다음 세 가지 조건을 모두 충족하는 경우 **충돌**하는 작업이라고 합니다.
    - **서로 다른 트랜잭션**에 속합니다.
    - **동일한 데이터** 아이템에 액세스합니다.
    - 적어도 **하나**의 작업이 **쓰기**인 경우.

- 그렇지 않으면 다른 모든 것은 **충돌하지 않습니다.** 그 의미는;
    - **동일한 트랜잭션**에 속하거나
    - **다른 데이터** 아이템에 액세스하거나
    - 동일한 데이터 항목에 액세스하지만 **둘 다 읽기**인 경우.

- 두 개의 트랜잭션 T1과 T2가 있다고 가정합니다. 그런 다음 예는 다음과 같습니다.
    - 충돌: {W1(X), R2(X)}, {W2(X), W1(X)}, {R1(Y), W2(Y)}, {W1(Y), R2(Y)}, ...
    - 비충돌: {W1(X), R1(X)}, {W2(X), R1(Y)}, {R1(X), R2(X)}, ...

- 충돌하지 않는 작업은 부담 없이 동시에 자유롭게 수행할 수 있습니다. 그러나 충돌하는 작업은 심각한 문제를 일으킬 수 있습니다.

- 두 트랜잭션 T1과 T2가 서로 충돌한다고 가정합니다. 그런 다음 세 가지 변칙적인 상황이 발생합니다.
    - **WR** conflict : **Dirty Data**
        - T2는 T1이 이전에 **작성한** 데이터 항목을 **읽습니다.**
    - **RW** conflict : **Unrepeatable Read**
        - T2는 T1이 이전에 **읽은** 데이터 항목을 **씁니다.**
    - **WW** conflict : **Lost Update**
        - T2는 T1이 이전에 **작성한** 데이터 항목을 **씁니다.**

- 질문: 위의 충돌로 인해 발생한 문제는 무엇입니까?
