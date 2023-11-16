---
title: "[Database] Indexing Files"
categories:
  - Database
tags:
  - Indexing Files
toc: true
toc_sticky: true
toc_label: "Indexing Files"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3afe0a4-ef5a-4cbe-a983-bd03933e03ec)

<br>

# Index File : Basic Concepts

- File consists of **data file** and **index file**;
- Index file consists of many index entries;
- Index entry consists of <**search value, pointer value**>;
- Data file may be sorted or may be not.
- Index file is always **sorted** by some search value.
- Data File에 원하는 record를 찾기 위해서는, 우선적으로 Index file를 거쳐서 찾아야 함. 따라서 index는 원하는 record를 찾아가기 위한 일종의 접근 경로(= access path)임.

<br>

- Index entry의 크기는 data record 크기 보다 (훨씬) 작음.
- 따라서 Index file의 저장 공간은 Data File의 저장 공간 보다 적게 요구함. 즉 필요한 disk block의 개수를 적게 요구함.
- Index File의 유형 : Field Value에 의한 분류
  - **Primary** Index : Key 값에 의해 sorted
  - **Clustering** Index : Non-Key 값에 의해 sorted
  - **Secondary** Index : Key 값에 의해 not sorted
- Index File의 유형 : Index Entry 개수에 의한 분류
  - **Dense** Index : it has an index entry for every field value;
  - **Sparse** Index : it has an index entry for some field value;
 
<br>

## Primary Index

- Data file is **sorted** by a **key value**
- Index file is as follows;
  - Index entry consists of <**key value, block pointer**>
  - It includes one index entry for **each block** in the data file;
  - The index entry has the key field value for the **first record** in the block (called **block anchor**)
  – A primary index is a **sparse**, since it includes an entry for each block (not every record) of the data file (즉, **index entry 개수 = data block 개수**)

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/eea60d92-3f2d-40de-83b5-3fc0b376cccb">

<br>

### Primary Index : 예

- The number of index blocks is much smaller than number of data blocks; This is because each index entry is small and index file is sparse.
- To find the record with key K, we search index file for the largest key value less than or equal to K.
- Since index entries are sorted, we can use binary search by searching only log2 bI blocks (bI: index blocks 개수)
- The index file may be small enough to be kept in main memory buffer; Thus, we can avoid expensive disk access;

<br>

### Primary Index : 연습

- EMPLOYEE (NAME, SSN, ADDRESS, JOB, SAL, ... )
  - SSN is a key; Records are sorted by SSN;
  - R = 100 bytes, B = 1,000 bytes, r = 10^6 records;
  - Bfr = B / R = 1,000/100 = 10 records/block
  - Number of data blocks: b = (r / Bfr)= (10^6/10)= 10^5 blocks

<br>

- (1) No Indexing:
  - Binary Search (on data file):
    - log2b = log2 105 = 17 block accesses
   
<br>

- (2) Primary Indexing
  - Let key value VSSN = 6 bytes, block pointer PR = 4 bytes
  - Index entry size : RI = (VSSN + PR) = (6 + 4) = 10 bytes
  - Index blocking factor : BfrI = B/RI = 1,000/10 = 100
  - Sparse Index : Index Entry 개수 = Data Block 개수
  - Index block 개수 : bI = (b/BfrI) = (10^5/100) = 10^3 blocks
  - Binary search (on index files) :
    - log2bI= log2103 = 10 block accesses
   
<br>

## Secondary Index

- Data file is not sorted on a key value.
- Index file is as follows;
  – Index entry consists of <key value, block pointer>
  – It includes one index entry for each record in the data file;
  – All index entries are sorted by key value;
    - (즉, Order of index file is different from the order of data file)
  – A secondary index is dense.
    - (즉, index entry 개수 = data record 개수)
 
<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fe21f7d0-eb5d-443e-b98b-baa996fd840c">

<br>

### Secondary Index : 연습

- EMPLOYEE (NAME, SSN, ADDRESS, JOB, SAL, ... )
  - Records are not sorted by key value SSN;
  - R = 100 bytes, B = 1,000 bytes, r = 10^6 records;
  - Blocking factor: Bfr = B / R = 1,000/100 = 10 records/block
  - Number of data blocks: b = (r / Bfr)= (10^6/10)= 105 blocks

<br>

- (1) No Indexing:
  - Sequential Search (on data file):
    - On average: b/2 = 10^5/2 = 50,000 block accesses
   
<br>

- (2) Secondary Indexing
  - Let key value VSSN = 6 bytes, block pointer PR = 4 bytes.
  - Index entry size : RI = (VSSN + PR) = (6 + 4) = 10 bytes
  - Index blocking factor : bfrI = B / RI = 1,000/10 = 100
  - Dense Index : Index Entry 개수 = Data Record 개수
  - Index block 개수 : bI = (r / BfrI) = (10^6/ 100) = 10^4 blocks
  - Binary search (on index files):
    - log2bI= log210^4= 14 block accesses
   
<br>

## Multi-Level Index

- Because an index file is **sorted**, we can create a **primary index** to the **index itself** ;
  - Original index file is called first-level index
  - Index to first index is called second-level index,
  - . . . . so on.
- We can repeat the process, creating a third, fourth, ..., **top level** until all entries of the top level fit in **one disk block**
- We can use **block anchors** so that i th level index has **one entry for each block** of (i - 1)th level.
- A multi-level index can be created for any type of firstlevel index (primary, secondary, clustering) as long as the first-level index consists of more than one disk block

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1b8ca7f5-35fa-46ce-9a05-47ff5a1df459">

<br>

- Fanout (fo) : 분기율
  - Index blocking factor : bfrI = fo = B/RI (단, B : Block size, RI: Index entry size)
  - 즉, 각 block에 저장되는 index entry의 개수를 fanout (fo)이라 함.
  - Single Level Index에 binary search를 적용하면 탐색시간이 log2 (bI)임
  - Multi Level Index는 각 level을 차례로 Index blocking factor fo 만큼 계속해서 탐색 공간을 줄여나감.
  - 이 경우 number of levels가 탐색시간이고, log2가 logfo로 줄어 들음.
 
<br>

- Searching Time
  - Each higher level reduces number of index entries by fo
  - The value of fo is the same among all the index levels.
  - Let r1 : the number of index entries at 1th level index;
 
### Multi-Level Index : 연습

- EMPLOYEE (NAME, SSN, ADDRESS, JOB, SAL, ... )
  - Records are not sorted by SSN field;
  - Let R = 100 bytes, B = 1,000 bytes, r = 10^6 records;
  - Blocking factor: Bfr = B / R = 1,000/100 = 10 records/block
  - Number of data blocks: b = (r / Bfr)= (10^6/10)= 10^5 blocks
- Multi-Level Secondary Index:
  - Assume: key field VSSN = 6 bytes, block pointer PR = 4 bytes.
- Index entry: RI = (VSSN + PR) = (6 + 4) = 10 bytes
  - Fanout (fo) = B / RI = 1,000/10 = 100 entries/block
  - Dense Index: Number of Index Entries = Number of Data Records
  - Number of index entries at first level index:
    - r1 = 106 index entries
  - r1 is reduced by fo (= 100) at each level
    - logfo(r1) = log100(10^6) = 3 block accesses
