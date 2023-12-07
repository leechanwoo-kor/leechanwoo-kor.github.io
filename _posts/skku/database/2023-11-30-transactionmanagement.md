---
title: "[Database] Transaction Management"
categories:
  - Database
tags:
  - Transaction Management
toc: true
toc_sticky: true
toc_label: "Transaction Management"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3afe0a4-ef5a-4cbe-a983-bd03933e03ec)

<br>

# Transactions

- A **transaction** is a unit of program execution that accesses and updates database within DBMS. It is different from programs outside DBMS(i.e., C program with UNIX). For example, money withdraw from account;

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ad653db8-abbf-44ef-af10-6c9139d082a1">

- A transaction executes many operations, but DBMS is only concerned about what data is read/written from/to the database;

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/63abf839-d98a-4ebf-ab93-d211b8002f42">

<br>

# DBMS’s Roles

- **Transaction Manager**
  - Coordinates the execution of transactions, receiving relevant SQL commands;
- **Concurrency Control Manager**
  - Guarantees consistent and concurrent schedule
  - Serializable Schedule
  - Lock Manager
  - Isolation
- **Recovery Manager**
  - Guarantees recoverable, cascade-less, strict schedules even if transactions failures occur.
  - Log Manager
  - Atomicity and Durability
 
<br>

# ACID rules

- **Atomicity**
  - A transaction is an atomic unit of processing; it either performs all operations or none at all.
  - If transaction is aborted, it must be roll backed with undoing all its operations done so far.
- **Consistency**
  – A correct execution of the transaction must preserve correct values of database before and after of execution of transaction.
  - It is responsibility of application programmer who codes the transaction.
- **Isolation**
  – A transaction must not make its updates visible to other transactions until it is committed.
  - Intermediate transaction results must be hidden from other concurrently executed transactions.
- **Durability**
  - After a transaction completes successfully, the changes it has made must be never be lost.
  - In case of system failures, we can redo the effect of write operations by tracing through log file.

<br>

## ACID rules : Atomicity

- Consider a transaction T to transfer $100 from account A to B:

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/13e08265-3674-4b11-bd2e-454ff7a2e12a">

<br>

- Atomicity
  - If a transaction T fails (due to S/W or H/W error) after step 3) and before 6), T has the temporarily incorrect value of A (i.e., A = 900).
  - The system must ensure that updates of a partially executed transaction are not reflected in the database.
  - T must be rolled back (cancel (UNDO) all operations done before failure), and must change the value of A back to its old value (i.e., A = 1,000)
 
<br>

## ACID rules : Consistency

- Consider a transaction T to transfer $100 from account A to B:

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/abd16dc3-1ad4-4e54-8725-c34caaf4ea7e">

- Consistency
  - The sum of A and B must be unchanged by the execution of T.
  - A transaction T, when starting to execute, must see a consistent database. (i.e., A =1,000, B = 2,000)
  - During transaction execution, the database may be temporarily inconsistent. (i.e., A = 900, B = 2,000), but that’s OK.
  - When T completes successfully, the database must also be consistent (i.e., A = 900, B = 2,100); Erroneous transaction logic can lead to inconsistency; User’s responsibility
 
<br>

## ACID rules : Durability

- Consider a transaction T to transfer $100 from account A to B:

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/04c6f21a-9975-48d2-9f65-7a84eed49b1f">

- Durability
  – Once the user has been notified that transaction T has completed (i.e., the transfer of the $100 has taken place), the updates to the database by the transaction must persist.
  - System must ensure that the final values of A and B (i.e., A = 900, B = 2,100), must be safely written to disk even if there are H/W failures. (REDO)
 
<br>

## ACID rules : Isolation

- Consider two transactions T1 and T2 to run concurrently:

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b208f6c0-2695-4572-a00e-673558fb96ae">

<br>

- Isolation
  - If between steps 3 and 6, another transaction T2 is allowed to access the partially updated database, T2 will see an incorrect value (i.e., the sum A + B will be less than $3,000).
  - Isolation can be ensured by running transactions serially; That is, one after the other
 
<br>

# Operations for Transaction

- Transaction manager needs of the following operations:
  - Begin : Beginning of transaction execution.
  - Read/Write : These specify actual execution operations.
  - End : End of transaction execution; It needs to check whether
    - 1) the changes by the transaction can be permanently written to the database, or
    - 2) the transaction must be aborted because it violates concurrency control, or for some other reasons.
  - Commit : Transaction has ended successfully.
    - Any changes executed by the transaction can be safely written to the database and will not be undone.
  - Rollback (or Abort): Transaction has ended unsuccessfully;
    - Any changes executed by the transaction must be undone.
    - Kill the transaction!
   
<br>

# Transaction States

- Transaction processing consists of the following states;
  - Active
    - Initial state; the transaction stays in this state while it is executing read/write operations.
  - Partially Committed
    - After the final operation has been executed.
  - Failed
    - After the discovery that normal execution can no longer proceed.
  - Aborted
    - After the transaction has been rolled back, and the database has been restored to its state prior to the start of the transaction.
  - Committed
    - After successful completion.
   
<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d24065ba-503a-4d83-844d-3dec090e82ce">

<br>

# Scheduling Transactions

- Serial schedule:
  - A schedule without any interleaved (no intervention) operations.
  - Only commit (or abort) of the active transaction initiates execution of the next transaction;
  - Every serial schedule guarantees consistency; Executing many transactions serially in different orders may produce different results; But all the results are correct.
  - Serial schedules limits the concurrency by wasting CPU time; Thus, serial schedules are not acceptable in practice
- Non-serial (= Concurrent) schedule
  - A schedule that is not serial.
  - Non-serial schedules are acceptable, but they do not guarantee consistency.
 
<br>

# Conflicting Operations

- Two operations in a schedule are said to conflicting if they satisfy all three of the following conditions;
  - (1) they belong to different transactions.
  - (2) they access the same data item.
  - (3) if at least one of the operations is write.
- Otherwise, all others are non-conflicting; That means;
  - (1) they belong to the same transaction, or
  - (2) they access the different data items, or
  - (3) they access the same data item, but both read it.
- Suppose there are two transactions T1 and T2; then, the examples are;
  - Conflicting: {W1(X), R2 (X)}, {W2(X), W1(X)}, {R1(Y), W2(Y)}, {W1(Y), R2(Y)}, . .
  - Non-Conflicting: {W1(X), R1(X)}, {W2(X), R1(Y)}, {R1(X), R2(X)}, . . .
 
<br>

- Any non-Conflicting operations can be freely performed concurrently without any burden; However, conflicting operations can cause serious problems;
- Suppose two transactions T1 and T2 conflict with each other; Then, three anomalous situations occur;
  - (1) WR conflict : Dirty Data : T2 reads a data item previously written by T1.
  - (2) RW conflict : Unrepeatable Read : T2 writes a data item previously read by T1.
  - (3) WW conflict : Lost Update : T2 writes a data item previously written by T1.
- Questions: What problems caused by the above conflicts?

<br>

## Reading Uncommitted Data : WR conflicts

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fb4d159b-0632-453e-8ec1-3a1929d844e4">

- T2 reads A after 100 is subtracted and reads B before 100 is added.
- T2 reads value of A written by T1 while T1 is still in progress. This is called **Dirty (Inconsistent) Read.**

<br>

## Unrepeatable Reads : RW Conflicts

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/68f28f4f-99a5-4cf0-b27c-ec7b2316a893">

- T2 changes (A = 0) the value of A (A = 1) that has been read by T1, while T1 is still in progress.
- If T1 tries to read the value of A again, it will get a different result (A = 0) even though it has not modified A. This is called **Unrepeatable Read.**

<br>

## Overwriting Uncommitted Data : WW Conflicts

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1eccf163-bb21-4602-8965-5dedfb65e143">

- T2 overwritten (A = 1200) the value of A, which has already been modified by T1, while T1 is still in progress;
- The value modified by T1 (A = 900) is lost; This is called Lost Update.

<br>

## Conflict Serializability

- Two schedules S and S’ are conflict equivalent if the order of any two conflicting operations is the same for both schedules.
- That means, if a schedule S can be transformed into a schedule S´ by a series of swaps of non-conflicting instructions, we say that S and S´ are conflict equivalent.
- A schedule S is conflict serializable if it is conflict equivalent to some serial schedule S’.
- “Conflicting serializable” schedules always guarantees consistency by exploiting also concurrency; Thus, it is a “good” schedule.

<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/53ac5da3-e403-47ca-a9a8-3027a1e2a2eb">

<br>

## Testing : Conflict Serializability

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f3b9aa67-919a-4a6a-ae20-c8ee51c28964">

<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4b5d2da1-e368-4c93-b2c5-418a9fa8fa47">

<br>

# Schedules with Aborted Transactions

- We now extend serializabilty concept to include aborted transactions; Note that all operations of aborted transactions must be undone; That means, imagine that they were never carried out to begin with.
- A serializable schedule S is a schedule whose effect on database is identical to that of some serial schedule of set of committed transactions in S.
- Recoverable Schedule :
  - A schedule S is recoverable if no transaction T in S commits until all transactions T’ that have written a data item that T reads have committed.
  - For example, if transaction T1 reads a data item previously written by T2 , then the commit of T2 must appears before the commit of T1.
  - (Theoretically), In recoverable schedule, committed transaction never needs to be rolled back.
 
<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0c9ecc4a-4f57-455f-8ee0-878020a48408">

<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6417120d-7290-4cd5-954d-7e72e4da6829">

<br>

## Not Recoverable Schedule

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/af730470-7a18-4989-b008-e624c083afbc">

<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b465d937-de51-488a-a26a-5d3138724708">

<br>

## Recoverable Schedule

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5addc57a-3dce-41dc-b9f8-47be1bc0d734">

<br>

# Cascade-less and Strict Schedules

- Cascade-less Schedule (= Avoiding Cascade Rollback):
  - Every transaction reads only data items that were written by committed transactions.
  - In a recovery schedule, it is possible for uncommitted transactions must be rolled back because it read a data item from a transaction that failed.
- Strict Schedule :
  - Transactions can neither read nor write data item X, until the last transaction that wrote X has committed (or aborted);
  - Overwriting of uncommitted data is not allowed.
    - (1) Tj reads a data item X after Ti has committed (aborted).
    - (2) Tj writes a data item X after Ti has committed (aborted).
   
<br>

## Not Cascade-less Schedule 

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a76a218e-e9d6-4577-8bbf-c83850790bb9">

<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/59ee45be-c161-46b9-9cc8-8e1665d45e98">

<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f7d4cc1b-fea7-495f-bc6c-2f3d096e8cfa">

<br>

## Cascade-less Schedule

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1cb482f7-94fd-4ae9-b4c3-568c006ccbe8">

<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/456fba9f-c72d-48ea-a0b1-8f5d41aea965">

<br>

## Relationship between Schedules

- Explain the relationships between the following schedules;
  - Serial vs. Conflict Serializable
  - Recoverable vs. Cascade-less
  - Cascade-less vs. Strict Schedule
  - Conflict Serializable vs. Recoverable
  - Conflict Serializable vs. Cascade-less
 
<br>

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/33bb8187-95e8-4224-b2bd-31570e81eaa3">
