---
title: "[Database] Storage and Basic Files"
categories:
  - Database
tags:
  - Storage
  - Basic Files
toc: true
toc_sticky: true
toc_label: "Storage and Basic Files"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3afe0a4-ef5a-4cbe-a983-bd03933e03ec)

<br>

# Storage Hierarchy

<img width="1120" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/952e8297-6320-4bc1-bc62-f6010b5fa2a2">

- Fast, but expensive, small, memory close to CPU
- Larger, slower memory at the peripheries
- DBMSs try to hide latency by using the fast memory as cache

<br>

- Primary storage:
  - Fastest access, but volatile
  - Expensive, but small volume
  - Cache Memory, Main Memory
- Secondary storage:
  - Non-volatile, Slower access time
  - Direct (Random) Access
  - Inexpensive, large volume
  - Flash Memory, Hard Disk
- Tertiary storage:
  - Non-volatile, Very large volume
  - Sequential Access, Much slower access time
  - Magnetic Tape, Optical Storage
 
<br>

- Main memory :
  - Fast access
  - Too small to store the entire database
  - Expensive
  - Volatile
- Flash memory :
  - Non-volatile
  - Reads are roughly as fast as main memory
  - Writes are slow (few microseconds), erase is slower
  - Still small to store the entire database
  - Cost per unit of storage roughly similar to main memory
  - Widely used in embedded devices
- Disk
  - Primary medium storage of database;
  - Non-volatile storage
  - Much larger capacity and cheaper cost/byte
  - Much slower than main memory
  - Random (Direct) access
  - Growing constantly and rapidly with technology improvements (factor of 2 to 3 every 2 years)
- Tape :
  - non-volatile, very high capacity
  - used for backup (recover from disk failure) and for archiving
  - Sequential-access : much slower than disk

<br>

## Processing Data: Disk/MM

- A database is stored on disks; Manipulation (searching, update, insert, . . ) of data takes place in Main Memory. 3 steps needed;
  - 1) READ: Move data from disk to MM (Disk block is copied into MM buffer)
  - 2) Manipulation: MM access/CPU Processing
  - 3) WRITE: Move data form MM to disk (Contents of MM buffer are copied into disk block)
- READ/WRITE (Disk I/O) are high-cost operations(milli- seconds), relative to MM/CPU operations (nano-seconds)
- This is large gap!; During disk I/O, typical computer can execute several millions of instructions.

<br>

# Disk Storage

- Data is stored on disk in units called blocks. A block is the smallest unit that can be read or written between main memory and disk.
- Blocks are arranged on tracks on one or more platters. Tracks are recorded on both sides of platters. Each surface is divided into many tracks
- Each track is divided into arcs called sector whose size is decided at disk format time; Its size is fixed and cannot be changed.
- The size of block can be set when disk is initialized as multiple of the sector size.
- The same tracks at each surface make cylinder; it consists of several tracks. The number of cylinders is equal to the number of tracks.

<br>

<img width="633" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/00782667-030f-46fb-ab9c-6066c8de4f05">

- Platter
- Surface
- Track
- Sector
- Block
- Cylinder
- Disk Rotation(rpm)
- Disk Arm
- Disk Head(R/W)

<br>

- Number of Platters per Unit
  - Single disk has only one platter, but typical disk derive may have 5 ~ 15 platters (10 ~ 30 surfaces)
- Number of Tracks per Surface
- A surface may have more than 20,000 tracks; Say, 32768, 65,536 tracks. . . etc..
- Number of Bytes per Track
  - A track may have more than 256 sectors; Common disks may have more than million bytes per track. 
- Disk Capacity = Track Size * #Tracks/Surface * #Surfaces

<br>

## Disk Storage : Exercise

- Consider the following disk;
  - 8 platters, 16 surfaces (double sided)
  - 2^16 (= 65,536) tracks per surface
  - 2^8 (= 256) sectors per track
  - 2^12 (= 4,096) bytes per sector
 
<br>

- What is size of a track? Size of a surface? Capacity of the disk?
  - track size = 2^12 bytes × 2^8 sectors = 2^20 bytes(= 1MB)
  - surface size = 2^20 bytes × 2^16 tracks = 2^36 bytes
  - disk capacity = 2^36 bytes × 2^4 surfaces = 2^40 bytes(= 1TB)
- How many cylinders?
  - Cylinders 개수 = Track 개수; Thus, 2^16 cylinders.
- Valid block sizes? : 2,048bytes? 16,384bytes? 24,576bytes, 1.2MB?
  - The block size must be a multiple of the sector size; Thus, valid block sizes are; 16,384 bytes, 24,576 bytes; What about 1.2MB? No!
- If block size is chosen as 16,384bytes, how many blocks in a track?
  - Each block has 4(16,384/4,096) sectors; Each track has 64(256/4) blocks.
 
<br>

# Disk Access Time

- Disk Access Time
  - Time to move a block from disk to main memory.
  - Seek Time(Ts) + Rotational Delay(Tr) + Transfer Time(Tt)
- **Seek Time (Ts)**
  - Time to move head from current position to correct track.
  - Variable; It takes 5 ~ 30ms; Depends on the head travel distance.
  - Inner/Outermost : about 1/2, Middle : 1/4, Average(Random) : 1/3

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/680301e6-fb9c-48b0-b3f8-dd196fd09456">

<br>

- **Rotational Delay (Tr)**
  - Time to wait for (first sector of) correct block to rotate under head.
  - Average rotational delay = (1/2)*(1/rpm)
  - Example; 7,200 rpm; Can rotate once per every 8.33 ms.
- **Transfer Time (Tt)**
  - Time to take (sectors of) block to rotate past the head.
  - Transfer time = block size/(bulk) transfer rate
  - Example; transfer rate : 163 MB/s; Can transfer 8KB block in 5.45ms.
- Typically, seek time is more than half of total access time

<br>

## Disk Access Time : Exercise

- Consider the following disk;
  - Disk rotates 7,200 rpm; Can rotate every 8.33ms.ne rot 8.3
  - Disk head takes 1ms for every 4,000 cylinders traveled.
  - Transfer rate = 1,630 MB/s
 
- What is minimum, maximum, average access time to read a 16KB block?
  - Minimum : No seek time; No rotational delay; Only transfer time needed; Access Time = 16KB/1,630MB = 0.1ms.
  - Average :
    - Seek time = 1/3 * (65,536/4000) = 5.46ms
    - Rotational Delay = 1/2 * 8.33 = 4.17ms
    - Transfer Time = 0.1ms
    - Access Time = 5.46 + 4.17 + 0.1 = 9.73ms
  - Maximum :
    - Seek time (Innermost <-> Outermost) = 65,536/4,000 = 16.38ms
    - Rotational Delay = 8.33ms
    - Transfer Time = 0.1ms
    - Access Time = 16.38 + 8.33 + 0.1 = 24.81ms
   
<br>

## Improving Access Time : “Closest Block”

- Unlike main memory, time to access a disk block varies depending upon location on disk; That means “How data is stored on disk.
- Thus, relative placement of blocks on disk has major impact on DBMS performance; Key to reduce I/O cost: reduce seek time. (Note : seek time >> rotational delay >> transfer time)
- Blocks should be placed sequentially by next on disk to minimize seek and rotational delay.
- If some records are frequently accessed, then place them on
  - the same (or adjacent) block(s), or
  - same track, or
  - same (or adjacent) cylinder(s), or
- For a sequential scan, pre-fetching several blocks at a time is a great advantage.

<br>

### Placing Blocks on Same Cylinder

- Suppose we need to read 1,024 blocks; We use a disk with 1TB and 16 surfaces.
  - (1) 1,024 blocks are placed on disk randomly;
    - Average access time for each block is 9.73ms.
    - To read all blocks, it takes about total 10 seconds (9.73 * 1024)
  - (2) 1,024 blocks are be placed on one cylinder; (64 blocks per track * 16 surfaces)
    - Average seek time for each block is 5.46ms.
    - We can access them all by only one seek (5.46ms) time;
    - Then, we can read all the blocks on a cylinder in 16 rotations of the disk since there are 16 tracks.
    - 16 rotations take 16 x 8.33 = 133ms; Total access time is 138.5ms.
- Using one cylinder, we can speed up by factor of about 72.

<br>

# Buffering of Blocks

- Suppose that a file contains 1,000,000 blocks in disk, but only 1,000 blocks in main memory; Consider a query that scans this file entirely;
- In this case, DBMS must bring the bocks as needed into main memory;
- Buffer manager is responsible for bringing blocks from disk to main memory as needed; It manages the available memory by partitioning it a collection of blocks (= buffer pool); The blocks in buffer pool is called frames.
- Buffer manager decides what existing block in buffer pool to replace to make space for the new block.

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ff03a569-13fa-4c63-a736-08e51b7929aa">

<br>

- Data must be in main memory buffer for DBMS to operate on it.
- If a requested block is not in buffer and the pool is full, buffer manager decides which existing block is replaced.

<br>

## Block Request

- When a block is requested, buffer manager does the following;
  - Case 1 : The block is already in memory;
    - Pin the block and return the block to the user.
  - Case 2 : The block is not in memory and some frame(s) are empty;
    - Read requested block from disk into empty frame, pin the block, and return the block to the user.
  - Case 3 : The block is not in memory and all frames are full;
    - (1) Choose a victim frame; A block is a candidate for replacement only if the block is unpinned; that means, no one is using the frame.
    - (2) If the chosen victim block has been modified; say, then write it to disk; That is, disk copy of that block is overwritten.
    - (3) Read requested block into victim frame, pin the block, and return the block to the user.
   
<br>

### Pin-Count / Dirty Bit

- How to know if the frame is “not using”?
  - A block in frame may be requested many times.
  - Pin-count indicates “number of current uses” for this block.
  - Incrementing pin-count is called pinning the block.
  - Pinning prevents the block from being removed from the pool.
  - A block is a candidate for replacement only if pin-count = 0.
- How to know if the frame is “modified”?
  - Dirty bit indicates whether the block has been modified.
  - If the block has been modified, dirty bit for the frame is set on. Otherwise, set off.
  - Decrementing pin-count is called unpinning the block.
  - Unpinning informs that requestor has done for the block
 
<br>

### Choose Frames for Replacement

- Buffer pool table contains <frame-id, block-id, dirty bit, pin-count>; Initially, pin-count for each frame is set to 0 and dirty bits are off

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6806a015-3971-4f70-9316-1490bcf8c447">

- Which blocks are candidates for replacement?
  - {block 1, block 3, block 4, block 5}
- Which blocks are candidates for rewritten to disk?
  - {block 5} 
- What if every frame’s pin-count is non-zero?
  - All frames are full and in use. Thus, suspended (wait) or aborted

<br>

### Buffer Replacement Policy

- When there is no space in the buffer, an unpinned block must be chosen by a replacement policy;
  - LRU: Least Recently Used
  - Clock: Round-robin(Circle) + LRU
  - FIFO: First In First Out
  - MRU: Most Recently Used
- Chosen policy has big impact on I/O performance; It depends on the access pattern.
- Buffer manager attempts to maximize “cache hits”;
  - By replacing blocks “unlikely” to be referenced.
  - By prefetching “likely” to be referenced.
- Most systems use past pattern of block references as a predictor of future references; LRU is widely used policy; It assumes that blocks referenced recently are likely to be referenced again;

<br>

# LRU

- Maintain a table where it records the time every time in a block in buffer is accessed. Track time in each frame for lastly used.
- Replace the unpinned frame which was least recently used(= have been unused for the longest time = minimum time value).

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/493751e3-028d-4e02-8de5-70b0ff236bcb">

- Which block will be replaced? Answer: block 5
- Common and widely used policy: The oldest blocks will have less chance to be used again)
- Good for repeated access to “hot” blocks(i.e., recent/popular web pages): Temporal Locality

<br>

## LRU + Repeated Scans

- LRU can be a bad strategy for certain access patterns involving repeated scans of entire file (e.g., Scans, Joins).
- Suppose N frames available in buffer, and file to be scanned has 1 or more blocks (i.e., File has at least (N + 1) blocks).
- Using LRU, every scan of the file will result in reading in every block of the file! In this case, LRU is the worst replacement policy.
- N blocks in MM + (at least) N + 1 blocks in file + Repeated scans + LRU” causes Sequential flooding.
- Repeated scan is very common in database workloads.
- MRU is much better in this situation (but not in all situations, of course).

<br>

<img width="1110" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/57fdfe00-9faf-4121-b6ad-61edaa2bd51d">

<br>

<img width="1110" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ae9f07ed-e74b-4574-b5bf-572561ee51e8">

## MRU + Repeated Scans

<img width="1110" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/08820172-0e6f-4da3-955e-192c6dec8a83">

<br>



# Representing Table as File

- Suppose we created the following table by using SQL;

<img width="1110" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f2b3b5eb-61bd-4941-9635-80c5e581d1c5">

<br>

## Files of Records

- High level DBMS manages tables of tuples; In disk, such tables are implemented as **files of records**;
  - A **file** consists of one or more **blocks**.
  - Each **block** contains one or more **records**
  - Each **record** corresponds to one **tuple**:
  - Each **attribute** corresponds to one **field**
- Representing data types as fields; Typically,
  - Integer : 2 ~ 4 bytes, Float : 4 ~ 8 bytes, Char(n) : n bytes array;
- Types of Records
  - If every record in the file has exactly the same size, the file is made up of **fixed-length records**.
  - If different records in the file have different sizes, the file is made up of **variable-length records**.

<br>

## Types of Records

(a) A fixed-length record with 6 fields and size of 71 bytes
(b) A record with 2 variable-length fields and 3 fixed-length fields 

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fbb0ac54-2552-4143-8fa9-11aa87325039">

<br>

## Blocking Factor

- The records in a file must be stored on disk blocks because a block is the unit of data transfer.
- Suppose block size is **B** bytes; For fixed length records of R bytes, we can store **bfr = B/R** records per block; The bfr is called **blocking factor** (= **the number of records** stored **per block**)
  - **Bfr = B/R** where B : block size, R : record size
  - For example, B = 1,024 bytes, R = 100 bytes,
  - Then, bfr = B/R = 1024/100 = 10 records/block (24 bytes in each block are unused space)
- Given the **number of records(r), how many blocks (b)** are needed?
  - **b = r/Bfr**
  - For example, r = 10,000 records
  - Then, b = r/Bfr = 10,000/10 = 1,000 blocks
 
<br>

## Placing Records on Blocks

- There may be unused space in each block equal to B – (bfr * R) bytes. To utilize this unused space, we can store a part of a record on one block and the rest on another. This is called spanned. Whenever R > B, (i.e, image, audio, . . ), we must use spanned organization.
- If records are not allowed to cross block boundaries, leaving possibly unused space in each block, this is called unspanned. This method is used with fixed-length records having B > R.
- For variable-length records, either spanned or unspanned organization can be used. If the average record size is large, it is better to use spanning to reduce the lost space in each block.
- For variable-length records, using spanned organization, each block may store different number of records; In this case, blocking factor means average number of records per block.

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1b7518b4-e924-4aef-ab75-c352ed6ebc59">

<br>

## How many blocks do we need?

- Employee file의 number of records(r) = 10^6 records 이고, 각 record-size(R) = 100 bytes 일 때, Spanned 와 Unspanned 방식으로 저장할 때 필요한 block의 개수(b)를 각각 계산하라. 단, block size(B) = 2,048 bytes 이다.
  - (1) Unspanned 방식
    - bfr = B/R = 2048/100 = 20 records/block (48 bytes: unused space)
    - b = (r/bfr) = 106 /20 = 50,000 blocks
  - (2) Spanned 방식
    - b = total file size / block size (No unused space)
    -   = (r*R)/B = 106 *100/2048 = 48,829 blocks
   
<br>

# Typical File Operations

<img width="1115" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/966e4335-7eba-4699-9c82-b838e7d88471">

<br>

# Typical File Organizations

- The followings are typical file organizations supported by DBMS;
  - Heap Files : Records are kept by randomly.
  - Sequential Files : Records are kept by sorted order.
  - Hashing Files : Records are kept by using hash function.
  - Tree Indexed Files : Records are kept by using tree indexes.
- We need to consider which file organizations are efficient for support various file operations?

<br>

## Heap File : Unsorted

- Records are stored by the order of arrival.
  - New records are **randomly** are inserted in a file.
  - Records are kept with no specific order
- Scan
  - We just read all **b** (=50,000) blocks.
- Find-Equality
  - We must use **linear search**;
  - On average, we must read **0.5b**(= 25,000)
  - blocks into memory; Very inefficient!
- Find-Range
  - We must use **linear search**;
  - We must read all b(= 50,000) blocks into
  - memory; Very inefficient!

<br>

- Insert
  - We just append a new record at the end (after last block) of file.
  - **Two** (read/write) block access; Very efficient!
- Delete
  - We must find the correct block using linear search.
  - There are two methods; **Immediate** deletion;
  - This may result in waste of spaces;
  - Another method is to use **deletion marker** (extra bit);
  - A record is deleted by setting the bit certain value;
  - This is called **deferred** deletion
  - Both method needs periodic file reorganization;

<br>

## Sequential File : Sorted

- Records are physically sorted by some ordering field.
  - Ordering field : key or non-key
  - Records are kept with sorted order
- Scan
  - We must also read all **b** (=50,000) blocks.
- Find-Equality
  - We can use **binary search** effectively, because the file is sorted by ‘age’.
  - We read only **log2b** (= 16) blocks into
  - memory; Very efficient!
- Find-Range
  - We can also use **binary search** effectively,
  - We read **log2b** (= 16) + **#matching blocks** into memory;

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/da233b91-e2af-498e-89f5-0c5cfc46c286">

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4a8e61e1-3714-416b-8a81-2c2550e02773">

<br>

<img width="1080" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cd77e094-80ee-4b66-bf12-3b27341ea5d4">

<br>

- Insert
  - First, we must find the correct block using binary search.
  - If there is no space, we need to shift 0.5b (25,000) block after insertion;
  - We must read and write b (50,000) blocks between memory and disk; Very inefficient!
- Delete
  - First, we must find the correct block using binary search.
  - After deletion, we need to shift 0.5b blocks.
  - We must read and write b blocks between memory and disk; Very inefficient!

<br>

<img width="1110" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f695a647-a55a-4e31-ae0a-3b0a78ec3534">

<br>

