---
title: "[Operating System] Virtual Memory Management"
categories:
  - Operating System
tags:
  - Virtual Memory Management
toc: true
toc_sticky: true
toc_label: "Virtual Memory Management"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222906118-9c24d371-e8b0-44e2-b765-ab3aa0f3a94e.png)

<br>

# Introduction

<br>

## Concepts

- Virtual memory
  - Partition user program into blocks and load them into memory on a block basis
  - Noncontiguous allocation
  - Paging/segmentation
- Goals of virtual memory management
  - Virtual memory system performance improvements
    - Cost model
    - Various optimization schemes

<br>

## Virtual memory management strategies

- Allocation strategies
- Fetch strategies
- Placement strategies
- Replacement strategies
- Cleaning strategies
- Load control strategies

<br>

# Cost Model

<br>

## Cost model for virtual memory system

- Page fault frequency
- Page fault rate
- Should be designed to reduce operation cost, which is usually defined by the number of page faults that is generated during process execution
- Reduction of context switching overhead or kernel intervention overhead
- System performance improvements

<br>

## Page reference string

- Sequence (string) of page numbers that are referenced during process execution
- Page reference string : $\omega$
  - $\omega$ = $r_1r_2 \cdots r_i \cdots r_T$
  - $r_i$ = page number, $r_i$ ∈ {0, 1, 2, ···, N-1}
  - N : number of pages of the process (0 ~ N-1)
  - T : total number of memory accesses of the process
- Page fault rate : $F(\omega)$
  - <img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7a26a19a-7c9c-4d20-ad4b-9feb10b497ec">

<br>

# Haardware/Software Components

- Hardware components
- Address translation deviceUsed for efficient address mapping Examples
- Dedicated page-table registers
- Cache memories
- TLB (associative memories)

## Bit vectors
- Record the information of whether the reference or update is made to the page in each page frame of memory
- Reference bits (use bits)
- Update bits (modify bits, write bits, dirty bits)

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2409c15b-20f4-4c70-bdda-db149e28f554">

## Hardware components

- Reference bit vector
  - Whether the contents of each page frame in memory is referenced recently or not
  - Operation
    - Reference bit is set to 1 when it is referenced by a process
    - Periodically reset all reference bits

<br>

- Reference bit = 1, at time t:
  - The page frame is referenced by the running process after the last reset point

<br>

- Reference bit vector

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/afc0a020-d22d-43b7-b04d-6854caeb3612">

<br>

- Update bit vector
  - Whether the page frame is modified after it is loaded into memory
  - No periodical reset
  - Page frame with update bit 1
    - The contents of the page in memory and in disk are not same
    - Write-back (to disk) is necessary for the page

<br>

## Software components

- Virtual memory management modules (for system performance)
  - Allocation strategies (HOW MUCH)
  - Fetch strategies (WHEN)
  - Placement strategies (WHERE)
  - Replacement strategies (WHICH/WHO)
  - Cleaning strategies (WHEN)
  - Load control strategies (HOW MANY)

<br>

### Allocation strategies

- How much space to allocate to each process
  - Fixed allocation
    - Fixed amount of memory is allocated to each process during entire execution of the process
  - Variable allocation
    - Variable amount of memory
- Considerations
  - It is necessary to estimate the space needs of the processes
  - Too much allocation
    - Memory waste
  - Too small allocation
    - Increase of page fault rate, performance degradation

<br>

### Fetch strategies

- When to bring a page into memory
  - Demand fetch
    - Fetch the page that is referenced by a process
    - Only the pages referenced are loaded into memory
    - Page fault overhead
  - Anticipatory fetch (pre-fetch)
    - Prediction on page reference in the future
    - Pre-fetch the pages that has high probability of reference in the near future
    - Prediction overhead, hit ratio (?)

<br>

- Demand fetch scheme is used in most systems
  - Pre-fetch: prediction overhead, resource waste when it does not hit
  - Demand fetch: reasonable performance in normal situations

<br>

### Placement strategies

- Where to place the incoming page
- Segmentation system
  - First-fit
  - Best-fit
  - Worst-fit
  - Next-fit
- Not necessary in paging systems

<br>

### Replacement strategies
- Which page to displace for incoming page
- Fixed allocation based replacement strategies
  - MIN(OPT, B0) algorithm
  - Random algorithm
  - FIFO(First In First Out) algorithm
  - LRU(Least Recently Used) algorithm
  - Additional reference-bits algorithm
  - LFU(Least Frequently Used) algorithm
  - NUR(Not Used Recently) algorithm
  - Clock algorithm
  - Enhanced clock algorithm
- Variable allocation based replacement strategies
  - VMIN(Variable MIN) algorithm
  - WS(Working Set) algorithm
  - PFF(Page Fault Frequency) algorithm

<br>

### Cleaning strategies

- When to write-back the updated page
  - Demand cleaning
    - Write-back when the updated page is to be replaced
    - Write-back only once before replacement
  - Anticipatory cleaning (pre-cleaning)
    - Prediction-based write-back
    - Reduces write-back time at the time of replacement
    - Resource waste due to repeated write-backs for a page

<br>

### Load control strategies

- Control the multiprogramming degree of a system
- Related to allocation strategy
- Should maintain multiprogramming degree at the appropriate range
  - At the plateau (Ref: next slide)

<br>

- Underloaded: System resource waste, performance degradation
- Overloaded: System resource contention, performance degradation
  - Thrashing (excessive paging activity)
- Plateau ranges are located at different positions for different systems

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4e45247f-d42a-4606-b09e-49a8129a454f">

<br>

## Schemes that have critical impacts on system performance

- Allocation strategy
- Replacement strategy

<br>

# Locality

<br>

## Definition

- Process intensively access some portion of the program/data it executes/references
  - Programs tend to use data and instructions with addresses near or equal to those they have used recently
  - Loop structure in program
  - Use of data structures such as array and structure

<br>

## Locality

- Classification of locality
  - Temporal locality
    - Recently referenced items are likely to be referenced again in the near future
  - ![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c2d22e38-2fff-4941-9a0e-19507dc40d83)
  - Spatial locality
    - Items with nearby addresses tend to be referenced close together in time
  - ![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c3f08458-a8e7-4a8f-babe-481c3424770e)

<br>

### Locality example

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f30e1728-8bde-4786-8ee9-e0cc12c7cd62)

- Data references
  - Reference array elements in succession / Spatial locality
  - Reference variable **sum** each iteration / Temporal locality
- Instruction references
  - Reference instructions in sequence / Spatial locality
  - Cycle through the loop repeatedly / Temporal locality

<br>

# Replacement Strategies

<br>

## Local replacement

- Each process select a victim (replacement frame) from only its own set of allocated frames
- Fixed allocation based replacement
  - MIN(OPT, B0) algorithm
  - Random algorithm
  - FIFO(First In First Out) algorithm
  - LRU(Least Recently Used) algorithm
  - Additional reference-bits algorithm
  - LFU(Least Frequently Used) algorithm
  - NUR(Not Used Recently) algorithm
  - Clock algorithm
  - Enhanced clock algorithm

<br>

## Global replacement

- Allows a process to select a victim (replaceme nt frame) from the set of all frames, even if that frame is currently allocated to another process
  - One process can take a frame from another
- **Variable allocation based replacement**
  - VMIN(Variable MIN) algorithm
  - WS(Working Set) algorithm
  - PFF(Page Fault Frequency) algorithm
- More common method
  - Generally results in greater system throughput

<br>

# Replacement Strategies (FA)

<br>

## MIN algorithm (OPT, B0 algorithm)

- Proposed by Belady in 1966
- Minimizes page fault frequency (proved)
- Scheme
  - Replace the page that will not be used for the longest period of time
  - Tie-breaking rule
    - Page with greatest (or smallest) page number
- Unrealizable
  - Can be used only when the process’s reference string is known apriori
- Usage
  - Performance measurement tool for replacement schemes

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c5c79264-056a-403b-8127-93a926bcc558)

<br>

- 4 page frames allocated, initially empty

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d9f8d71a-cce6-4fb4-bcdf-772a712c7a84)

<br>

## Random algorithm

- Randomly select the page to be displaced
- Low overhead
- No policy

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3e999165-b1bc-4d13-8e1e-d47efdc7767f)

<br>

## FIFO algorithm

- Choose the page to be replaced based on when the page is previously loaded into memory
- Scheme
  - Replace the oldest page
- Requirements
  - Timestamping (memory load time for each page) is necessary
- Characteristics
  - May replace frequently used pages
- **FIFO anomaly (Belady’s anomaly)**
  - In FIFO algorithm, page fault frequency may increase even if more memory frames are allocated

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f5fba536-8801-4500-8ba3-07978360ad2e)

<br>

- 4 page frames allocated, initially empty

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d9d839ee-93b5-4e4b-93b0-fc2e6eee61e6)

<br>

- Anomaly example

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bf1fe1f3-ab61-418f-ab2b-a6ff09d60391)

<br>

## LRU(Least Recently Used) algorithm

- Choose the page to be replaced based on the reference time
- Scheme
  - Replace the page that has not been used for the longest period of time
- Requirements
  - Timestamping (page reference time) is necessary
- Characteristics
  - Based on program locality
  - Approximates to the performance of MIN algorithm
- **Used in most practical systems**

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/451589d1-94d3-45c4-8b01-77ce0d573e16)

<br>

- 4 page frames allocated, initially empty

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6195ae68-7277-418a-a466-d05fcbf7c216)

<br>

## LFU(Least Frequently Used) algorithm

- Counting-based page replacement
  - Choose the page to be replaced based on the page reference frequency
  - Scheme
    - Replace the page with the smallest reference counts
    - Tie-breaking rule
      - LRU
  - Requirements
    - Page reference count should be accumulated
  - Characteristics
    - Less overhead than LRU, while exploiting program locality

<br>

- Drawbacks
  - May replace recently loaded pages even if they have high probability of reference
  - Page reference count accumulation overhead

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/25ecc9cb-9705-496b-b271-2f3998d24ca7)

<br>

- 4 page frames allocated, initially empty

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1999e600-3909-4ba2-963e-621ded8bd8d6)

<br>

## NUR(Not Used Recently) algorithm

- LRU approximation scheme
- Lower overhead than LRU algorithm
- Uses bit vectors
  - Reference bit vector
  - Update bit vector
- Scheme
  - Check reference/update bit and choose a victim page
  - Order of replacement (reference bit: r, update bit: m)
    - ① Replace the page with (r, m) = (0, 0)
    - ② Replace the page with (r, m) = (0, 1)
    - ③ Replace the page with (r, m) = (1, 0)
    - ④ Replace the page with (r, m) = (1, 1)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e9848eda-28c3-4019-9500-e93f8dbdcd11)

<br>

## Additional reference-bits algorithm

- LRU approximation
- **History register** for each page
- Recording the reference bits at regular intervals
  - Timer interrupts at regular intervals
  - OS shifts the reference bit for each page into the high-order bit of its history register, shifting the other bits right by one bit and discarding the low-order bit
- Replacement based on the value of history register
  - Interpret the value of the history register as unsigned integers
  - Choose the page with smallest value as a victim

<br>

- Example
  - Value of the 8-bit history registers
    - 00000000
      - No reference during 8 time periods
    - 11111111
      - Referenced at least once in each period
    - Page a with 01100100 and page b with 00110111
      - Page a has been used more recently than page b

<br>

## Clock algorithm

- Used for IBM VM/370 OS
- Uses reference bit
  - No periodical reset for reference bits
- Choose the page to be replaced using pointer that circulates the list of pages (frames) in memory

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/33cad2c3-3f04-4b93-acf0-b164fdeab183)

<br>

- Scheme
  - Choose the page to be replaced with the pointer moving clockwise
  - Mechanism
    - ① Check the reference bit r of the page that the pointer points
    - ② If r == 0, select the page as a victim
    - ③ If r == 1, reset the reference bit to 0 and advances the pointer goto setp-①

<br>

- Characteristics
  - Earlier memory load time
    - → higher probability of displacement
    - Similar to FIFO algorithm
  - Page replacement based on the reference bit
    - Similar to LRU (or NUR) algorithm

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9f53a1d2-ebc3-405e-96b1-ca813e9d1210)

<br>

## Enhanced clock algorithm

- Similar to clock algorithm
- Considers update bit as well as reference bit

<br>

<img width="830" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2f74dae4-ed07-461a-86b0-4b02c1d24f47">

<br>

### Scheme

- Choose the page to be replaced with the pointer moving clockwise
- Mechanism
  - ① Check (r, m) of the page that the pointer points
    - ② (0, 0): select the page as a victim, advances the pointer
    - ③ (0, 1): set (r, m) to (0, 0), put the page on the cleaning list, goto setp-⑥
    - ④ (1, 0): set (r, m) to (0, 0), goto setp-⑥
    - ⑤ (1, 1): set (r, m) to (0, 1), goto setp-⑥
  - ⑥ Advances the pointer, goto setp-①

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dce24c7b-a410-4d7f-bae6-8ddb0c398118">

<br>

## Other algorithms

- MRU(Most Recently Used) algorithm
  - $\leftrightarrow$ LRU algorithm
- MFU(Most Frequently Used) algorithm
  - $\leftrightarrow$ LFU algorithm
  - Thinks that the page with smallest reference counts was probably just brought in

<br>

## Consideration on page replacement algorithms

- Whether the scheme is based on **reasonable criteria**
- **Overhead**

<br>

## Implementation of page replacement schemes

- FIFO algorithm
  - Time-stamping
  - Queue
- LRU algorithm
  - Time-stamping
  - Stack (LRU stack)

<br>

...

<br>

# Replacement Strategies (VA)

<br>

## Working set memory management

- Proposed by Denning in 1968
- Working set
  - Set of pages that the process intensively references at a time
  - Set of pages in the most recent time interval of length $\Delta$
  - Working set of a process changes as time goes

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c8a94da9-f511-4190-a396-2261657bc757">

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b08ef836-7ea8-43a7-aeaa-f3d21f2de14a">

<br>

- Based on locality
- Let the working set to resided in memory every time
  - Reduces page fault rate (reduces thrshing)
  - Improve system performance

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/75d8c090-a4a2-4049-905c-a31ea951d3d8">

<br>

<img width="790" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3dd6eaa0-6894-4dc3-b0da-2184f96d5996">

<br>

<img width="790" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9411930d-8727-4164-abd0-669ffafca80f">

<br>

<img width="821" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d0fdaf95-9ec9-49c3-a7fc-442d0fb73452">

<br>

- Should consider **other measures** as well as "number of page faults"

<br>

<img width="910" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a9af15d0-2ec8-4801-82de-680895ecaa85">

<br>

- Characteristics
   - A page can be displaced without incoming page
   - No page may be displaced for incoming page
 - Disadvantages
   - Overhead
     - Residence set, set of pages that reside in memory, should be updated for every page reference
     - Residence set update independent of page faults

<br>

## PFF(Page Fault Frequency) scheme

<br>

## VMIN algorithms

<br>

# Other Considerations

<br>

- Page size
- Program restructuring
- TLB reach

<br>

## Page size

- General range of page size
  - 2^7 (128) Bytes ~ 2^22 (4M) Bytes
- Pros and cons
  - Smaller page size
    - Smaller internal fragmentation
    - Match program locality more accurately
      - Reduction in total I/O
      - Better utilization of memory (Less total allocation of memory)
    - Larger page table size
    - Increase in I/O time
    - Increase in the number of page faults

<br>

## Program restructuring

- System performance can be improved if the user (or compiler/linker/loader) has an awareness of the paged nature of memory or underlying demand paging system
- Program restructuring by user or compiler/linker/loader

<br>

...

<br>

## TLB Reach

- TLB Reach
  - The amount of memory accessible from the TLB
    - (the number of entries)  (page size)
- For increasing TLB hit-ratio
  - Increase the number of entries in TLB
    - Expensive
- Increase the size of page or provide multiple page sizes
  - Solaris: 8KB/4MB
    - With 64-entry TLB, TLB reach ranges 512KB~256MB
  - OS should manage TLB to support multiple page sizes

<br>

- Multiple page size
  - Requires OS support
    - One of the fields in TLB entry must indicate the size of the page corresponding to the TLB entry
  - Software managed TLB
    - UltraSparc, MIPS, Alpha
  - Hardware managed TLB
    - PowerPC, Pentium

<br>

# Summary

- Virtual memory management
- Cost model
- HW/SW components
- Locality
- Virtual memory management schemes
  - FA-based schemes
  - VA-based schemes
- Other considerations
- Case studies
  - MS Windows, Solaris, Linux
