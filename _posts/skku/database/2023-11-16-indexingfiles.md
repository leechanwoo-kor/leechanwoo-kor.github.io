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

<br>

# Searching Trees

- Multi-Level Index File은 Searching Tree의 구조와 유사함. 다음은 전형적인 특히 (In-Memory) Searching Tree 임.
  - Binary Search Tree
  - AVL Tree
  - 2-3-4 Tree
  - Quad Tree
  - Octal Tree
  - . . . . . .
- 위의 구조들은 대용량의 file을 탐색하기에 한계가 있음. 그 이유는?
- Multi-Level Index를 Multi-way Searching Tree로 확장해야 함;

<br>

## Multi–Way Searching Tree

- **Multi-Way Searching Tree**의 정의
- Each node (= index block) structure is as follows:
  - <P1, K1, P2, K2, .. . , Pq-1, Kq-1, Pq>
  - K1, K2, . . . , Kq-1 : search values
  - P1, P2, . . . , Pq : tree pointers (즉, serach value의 개수보다 pointer의 개수가 1 개 더 많음)
  - K1 < K2 < . . . < Kq-1 (즉, 각 node의 serach value들은 sort 됨)
  - 각 pointer의 구조는 다음과 같음
 
<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c7483f41-ba4b-4c33-90de-aeba8e0d6f7f">

<br>

# Static and Dynamic Indexing

- **Static Indexing**
  - Insert/Delete가 Data file에서 반영
  - Insert/Delete 시에 Index file은 update(write) 하지 않음.
  - Overflow chains이 발생해 성능이 저하될 수 있음.
  - 데이터 변동이 없으면 매우 효율적임.
  - ISAM File
- **Dynamic Indexing**
  - Insert/Delete가 Index file에서 동적으로 발생
  - Insert/Delete 시에 Data file은 update하지 않음.
  - Overflow chains이 발생하지 않음.
  - 데이터 변동이 있는 경우에도 매우 효율적임.
  - B tree, B+ tree

<br>

# Static Indexing : ISAM File

**ISAM : Indexed Sequential Access Method**

- Data file is sorted by search values
  - In consists of primary blocks and overflow blocks.
- Index file is Multi-Way Searching Tree as follows;
  - Each node structure is as follows:
<P1, K1, P2, K2, .. . , Pq-1, Kq-1, Pq>
- K1, K2, . . . , Kq-1 : search values,
- P1, P2, . . . , Pq : tree pointers (즉, key value의 개수보다 pointer의 개수가 1 개 많음)
- K1 < K2 < . . . < Kq-1 (즉, key value들은 sort 되어 있음)

<br>

# ISAM File

- Initially, a data file is allocated on primary blocks sequentially, and sorted by search key.
- Then, tree structured index nodes are allocated; Each node corresponds to a disk block. This index guides to search for data entries which are in leaf blocks.
- Then, space for overflow blocks for future insertions are allocated.

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5815c2c0-5ca8-4272-99f1-fd1c5e1fd941">

<br>

## File Structure: ISAM

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d1fa667d-c613-4287-9630-1dc81d13b135">

<br>

## Example : ISAM File

- Assume: each node can hold up to 2 key search values (q = 3);
- No need for ’next-leaf-block’ pointers. (Why?)

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/18ea079b-c484-4a42-bb62-6ad9c7757696">

<br>

## Searching : ISAM File

- FIND-EQUALITY :
  - Find 33; Find 55; Find 99, . . .
- FIND-RANGE
  - Find all values >= 33
 
<br>

- Primary blocks (= data file) are initially allocated **sequentially**.
- Number of primary blocks are **known** when the tree is created;
- Primary blocks do **not change** subsequently under insertions and deletions; So, no next-leaf-block pointers is needed.
- **FIND-EQUALITY : logfo n**
- **FIND-RANGE : logfo n + number of matching blocks**

<br>

## Insert/Delete : ISAM

- Insert
  - If no more space in primary block, then allocate overflow block, and insert into it;
  - This leads to chains of overflow blocks.
- Delete
  - If deletion is done in an overflow block, remove the block.
  - Otherwise, (if in primary block), leave the empty block for future insertions.
- Insertions/Deletions modify only the data blocks.
- We never modify the index blocks; This may lead to long overflow chains.

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0962bb90-19cc-4e23-bc1e-8f45e571e3a7">

<br>

## Then, Delete 42, 51, 97

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/eb20c1b8-afc7-4b60-acc6-61848a38acdb">

<br>

## Processing Overflow Chains

- Searching for non-existing records:
  - Half of the chain have to be searched on average.
  - What if we maintain the chain as sorted list?
- Fetching frequently needed records:
  - Keeping records in the order of frequency of use;
  - Insert new updates in front of the chain.
- Distribution of chain length:
  - In practice, overflow chains have unequal length;
  - For example, ‘append’ operation creates long chains to the last block. Use random insertions.
 
<br>

## Pros/Cons: ISAM file

- (-) Long Overflow chains slows down performance: Overflow block access time may be greater than primary block access time
- (-) Periodic Reorganization is needed: Reorganization takes a long time; It is usually done off line basis.
- (+) Very efficient with infrequent update Static index with no (possibly) overflow chains is faster than dynamic index since index blocks are only read and never written. If set of keys to be inserted is known in advance, we can build index which reserves enough space for future inserts.

<br>

## Goal : Multi–Level Indexing

- Tree의 **높이 h** (즉, 탐색 시간)를 **낮게** 하라.
  - 각 node의 **fan-out (fo)**을 **증가** 시킴
- Tree의 모양을 **균형(Balanced)** 형태로 유지하라.
  - 각 **leaf** node의 **level**이 모두 **같게** 함; **O(logfo)**
- Find-Equality, Find-Range 시간을 모두 효율적 으로!
  - 각 leaf node를 linked list로 연결
- Insert, Delete 시간을 모두 효율적 으로!
  - Index file을 update하고, 각 node에 **여유 공간(50%)**을 남겨 놓음.
 
<br>

# B Tree

- B Tree is an excellent data structure for storing huge amounts (millions/billions of items) of data for fast retrieval and updates.
- B trees are usually a shallow and, but wide data structure. While other trees can grow very high, typical B trees have a single digit (3 ~ 5) height, even with millions of data.
- From a practical point of view, B-Trees, therefore, guarantee an access time of less than 10ms even for extremely large data sets. (Bayer, inventor of B tree)
- Accessing any part of the tree for reading or writing requires only a few nodes, which translates to a few head seeks, by caching the upper tree nodes anyway, only the seek to the final leaf node is needed.
- Variations of B tree later
  - : **B+ tree**(Knuth, Comer), R tree(Guttman)
 
<br>

# B+ Tree

- B+ tree is the most common used which is derived from the ISAM and B tree idea.
- “B” stands for “**balanced**”; All paths from the root to each leaf have the **same** length.
- Automatically maintain the number of indexing levels for the size of file being indexed. (**Self-organized**)
- B+ tree offers efficient insert/delete performance since **no overflow chain** is necessary; The underlying index file can grow/shrink **dynamically**. 

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/03696348-7a15-4781-b436-16c6d59ff8fb">

<br>

## Internal Node (Non-Leaf) 구조 : B+ Tree

- Structure of internal (=non-leaf) node
  - <P1, K1, P2, K2, . . . , Pq-1, Kq-1, Pq> where q <= p
  - Each internal node has **q** tree pointers and (**q – 1**) search values.
  - Search values are **sorted** : K1 < K2 < . . . < Kq-1
  - Each internal node has **at most p** tree pointers.
  - Each internal node except root has at least **p/2** tree pointers.
  - Root node has **at least two** tree pointers.

<br>

## Leaf Node 구조 : B+ Tree

- Structure of **Leaf** Node
  - <(K1, Pr1), (K2, Pr2), . . . , (Kq-1, Prq-1), Pnext> where q <= p
  - Each **Pri** is a **data pointer** and **Pnext** points to the **next(right) leaf node.**
  - Each **data pointer** points to the data record stored in data file.
  - All leaf nodes are linked together.
  - Search values are **sorted** : K1 < K2 < . . . < Kq-1
  - Each leaf node has **at most p** data pointers.
  - Each leaf node has **at least p/2** data pointers.
  - All leaf nodes are the **same level**;
 
<br>

# B+ tree

- (a) Internal node 구조 : q –1 key values / q tree pointers
- (b) Leaf node 구조 : q – 1 key values / q – 1 data pointers

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/41a5371b-3264-49ee-a1ff-2b26604eca8d">

<br>

## 특성 : B+ Tree

- B+ tree는 높이 균형(height-balanced)을 유지해야 함. (즉, root에서 모든 각 leaf node까지의 path의 길이가 모두 같음)
- Root를 제외한 각 node는 최소 50%을 채워야 함 (즉, 다 채우지 않고 50%의 여유 공간을 남길 수 있음)
- 각 internal node의 tree pointer들은 최소 p/2 개, 최대 p 개
- 각 internal node의 search value들은 최소 p/2 - 1 개, 최대 p - 1 개 (단, root node는 최소 1 개, 최대 p - 1 개)
- 각 leaf node의 data pointer들은 최소 p/2 - 1 개, 최대 p - 1 개
- Leaf node들은 오름차순으로 link로 모두 연결되어 있음. 이는 rangesearch를 효율적으로 지원 하기 위함. (내림 차순 연결도 가능함; 이 경우 Doubly Linked List 구조)

**Example**

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b06cc3f1-2961-4a96-a6ca-abc356ebbaf8">

<br>

## Exercise : B+ Tree

- We build a B+ tree index for a relation Customer(ID, name, age) using ID as the search value; Assume search value size is 6 bytes, tree pointer size is 4 bytes; leaf node pointer size is 4 bytes; data pointer size is 8 bytes; block size is 2,048 bytes.
  - (1) What is fanout of non-leaf node?
    - (p - 1) * 6 + p * 4 ≤ 2,048; Choose maximum p = 205
    - Minimum fanout is 50% * 205 = 103
    - Non-leaf node stores 103 ~ 205 tree pointers (102 ~ 204 search keys)
  - (2) What is fanout of leaf node?
    - p * 6 + p * 8 + 4(leaf pointer) * 1 ≤ 2,048; Choose maximum p = 146
    - Minimum fanout is 50% * 146 = 73
    - Leaf node stores 73 ~ 146 data pointers (also, 73 ~ 146 search keys)
  - (3) What is maximum # of search values stored in B+ tree with height 4?
 
<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4b2c7511-483a-4b7b-9345-a286be4b78fe">

<br>

  - (4) What is minimum # of search values stored in B+ tree with height 4?

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/36f1955b-c7c0-4901-bbd9-48ce94df074e">

<br>

- This B+ tree can store about 1.5 million ~ 1.26 billion search values.

<br>

## Searching : B+ Tree

- Find record with a given search value K; Start from the root and find the appropriate tree pointer;
- Then, follow the pointer to the next level repeatedly, until you reach a correct field value K.
- If K is found, follow the data pointer K^ to find the record with value K.
- 예 : Find 28; Find 5; Find 49 . . .
- 예 : Find values ≥ 14; Find 19 < values < 48 . . .

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/927374bd-1f40-46a1-bbb4-658c98b66166">

<br>

## Insert : B+ Tree

- To insert a new record with search value K, find correct leaf node L by using (previous) search algorithm
- If L has enough space, just insert K into L. Otherwise, split L (into L and with a new node L’) as;
  - Distribute entries evenly into L and L’ so that each of them is at least half full (50%).
  - Copy up middle key to its parent.
- This split can happen up to the upper levels repeatedly.
  - To split non-leaf node, redistribute entries evenly, but push up middle key. (Compare with leaf node splits!)
- Splits may grow the tree; Root node split increases height.
  - Tree growth means: Gets wider, or one level taller at top.

<br>

### Insert : No Split

- Insert 15
  - Since L is not full; just insert it.

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d32f85a7-79b7-4e55-96a7-e976f992a62e">

<br>

### Insert : Leaf Split

- Insert 8
  - L is full; Split it with a new node L’; Distribute entries;
  - Copy middle key (5) up; (5 remains in leaf)
 
<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/64eb3e21-3860-408b-8a76-5ac8e3c0d00f">

<br>

### Insert : Non-Leaf(Root) Split

- Insert 8
  - L is full; Split it with a new node L’; Distribute entries;
  - Copy middle key (5) up (5 remains in leaf )
  - Parent(root) is full; Split it; Push mid-key (17) up. (17 does not remain)
  - At this point, height of tree is increased by 1.

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/51bdba13-cf88-4bf4-9672-ac3e5af0814c">

<br>

### Copy-Up vs Push-UP

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/458c8bf9-1866-43aa-8391-2cdee31d0e08">

<br>

### Insert : Exercise

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f760fd65-741c-4493-9b70-af916d8f419e">

<br>

- 1) Show B+ tree after inserting 11; How many disk accesses?
- 2) Show B+ tree after inserting 45; How many disk accesses?
- 3) Show B+ tree after inserting 45, 48, 50, 55, 60;
 
<br>

- 다음의 값들을 순서대로 insert한 후의 B+ Tree를 그려라.
  - 단, p = 3 임. (즉, 최대 3, 최소 2 개의 pointers)
  - {8, 5, 1, 7, 3, 12, 9, 6}
 
<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8b86ebcd-7656-47f7-9bed-6ca0ecb14515">

<br>

## Delete :B+ tree

- To delete a record, find a correct leaf node L by using (previous) searching algorithm
- After removing the search value, if L is at least half-full, done! Otherwise,
  - Try to re-distribute, borrowing from sibling (adjacent node with same parent as L).
  - If re-distribution fails, merge L and its sibling.
- If merge occurred, must delete entry (pointing to L or sibling) from parent of L.
- Merges may shrink the tree; Merge could propagate to root by decreasing height.

<br>

## Delete : B+ Tree

- Suppose deletion causes leaf node L to go below 50%.
  - (1) Redistribute : Sibling node has spare entries
    - Entries are redistributed between node L and its sibling node L’.
    - Search value in parent node pointing to L is changed to be the largest search value in L.
  - (2) Merge : sibling leaf node has no spare entries.
    - Entries are merged between node L and its sibling node L’.
      - Case 1 : Merge leaf nodes
      - Case 2 : Merge non-leaf nodes
     
<br>

### Deletion : Simple Case

- Delete 27
  - Since L has enough space, just delete it.

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/342b6bc2-ec05-4970-a6c1-69d8a028378d">

<br>

### Deletion : Redistribution

- Delete 20
  - After 20 is deleted, L is underflow; Look at right sibling L’.
  - L’ has enough space; Borrow 25 from L’.
  - 25 in parent is changed by the smallest key(27) of L’, which is copied up.
 
<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1f79f490-8418-44d2-8b3e-fa864656bfe5">
