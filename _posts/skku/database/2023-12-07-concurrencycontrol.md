---
title: "[Database] Concurrency Control"
categories:
  - Database
tags:
  - Concurrency Control
toc: true
toc_sticky: true
toc_label: "Concurrency Control"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3afe0a4-ef5a-4cbe-a983-bd03933e03ec)

<br>

# Concurrency Control : Locking Approach

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ccf265d1-83b9-4f61-a82a-2959051af7f1">

<br>

# Lock-Based Protocols

- A locking is a mechanism to control concurrent access to a data item; It obtains permission to read or write a data item for a transaction; Data items can be locked in two modes;
  - (1) S-Lock(A) : Shared
    - : If a transaction T obtains S-Lock on data item A, T can read A.
  - (2) X-Lock(A) : Exclusive
    - : If a transaction T obtains X-Lock on data item A, T can write A.
  - (3) Unlock(A);
    - : If a transaction T has finished read/write on data item A, T releases all locks on A
   
<br>

## Compatible Locking Table

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f231296a-1e4f-4091-bb5f-9be4f2b73465">

- More than one transaction applies S-lock on data item for reading its value; Only one transaction apply X-lock on data item for writing.
- For example, suppose that Ti holds a X-LOCK for data item A; If Tj requests S-LOCK for the A, then this request is denied; Tj must wait until Ti releases its X-LOCK.
- Thus, each transaction is
  - (1) allowed to read/write, or
  - (2) delayed until it is safe to execute read/write.
 
<br>

# Basic Locking Protocol

- For any data item A, every transaction T must obey the following rules;
  - (1) T must request S-LOCK(A) (or X-LOCK(A)) before any READ(A) is performed in T.
  - (2) T must request X-LOCK(A) before any WRITE(A) (or READ(A)) is performed in T.
  - (3) T must wait if the request lock (for A) is not compatible with other lock held by another transaction.
  - (4) T must request UNLOCK(A) after all READ(A) and WRITE(A) are completed in T.
 
<br>

## Example

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3bf02f2c-d6cd-4408-9be8-ab78931ffa98">

<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0c6bb99d-ffe4-4b5e-9c6c-e0c4b501265d">

<br>

# Two-Phase Locking (2PL) Protocol

- Every transaction must obey basic locking protocol; In addition, in every transaction, all locks precede all unlock requests; It consists of two phases;
  - Phase 1 : Locking (= Growing) phase
    - : New locks are acquired, but none can be released.
  - Phase 2 : Unlocking (= Shrinking) phase
    - : Existing locks can be released, but no new locks can be acquired.
- A transaction can not release any locks until it once acquires locks on all items it needs.
- A transaction can not request additional locks once it releases any locks.

<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a9ad0c4f-9a6e-4f90-8fe2-8b16aaf284c6">

<br>

- 2PL Schedule is conflict equivalent to serial order of transactions according to their first unlocks; That means the order in which transactions enter their shrinking phase.
- If every transaction in a schedule obeys 2PL, it is conflict serializable; 2PL is a concurrency control used in most database systems today.

<br>

## Example

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/555f9674-d40a-401e-af5f-a5d1f5f2c03a">

<br>

- 2 PL Protocol : Schedule A

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b703ad79-50b7-4e66-b060-249fc163abb7">

<br>

- 2 PL Protocol : Schedule B

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/41ecbcc0-b295-47ff-9203-8ddcac489083">

<br>

# Performance Degraded

- 2PL can limit the amount of concurrency.
- 2PL is selfish: may favor for long-term transactions.
- Suppose T1 accesses A, B, C, D, E, . . , sequentially, and T2 accesses B

<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f211ebc1-b6a1-4c25-a91b-7e97320b20b5">

<br>

# Deadlocks

- T1 is waiting for T2 to release lock on A, and T2 is waiting for T1 to release lock on B;
- T1 can not release a lock on B; T2 also can not release a lock on A
- Other transactions can not also access either A or B.
- Deadlock: Cycle of transactions waiting for locks to be released by each other. Neither transaction can proceed and they wait forever.
- Two ways of dealing with deadlocks:
  - Deadlock prevention
  - Deadlock detection
 
<br>
