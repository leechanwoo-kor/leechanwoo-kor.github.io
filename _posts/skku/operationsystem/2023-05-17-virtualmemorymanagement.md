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

