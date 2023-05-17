---
title: "[Operating System] Virtual Memory Organization"
categories:
  - Operating System
tags:
  - Virtual Memory Organization
toc: true
toc_sticky: true
toc_label: "Virtual Memory Organization"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222906118-9c24d371-e8b0-44e2-b765-ab3aa0f3a94e.png)

<br>

# Virtual Memory Organization

<br>

## Virtual memory concept

- Concept
  - A technique that allows the execution of processes that are not completely in memory
    - Partition each user’s program into multiple blocks
    - **Load into memory the blocks that is necessary at each time during execution**
      - Noncontiguous allocation
    - Logical memory size is not constrained by the amount of physical memory that is available
  - Separation of logical memory as perceived by users from physical memory

<br>

- Benefits
  - Easier programming
    - Programmer no longer needs to worry about the amount of physical memory available
  - Higher multiprogramming degree
    - Increase in CPU utilization and throughput (not in response time and turnaround time)
  - Less I/O for loading and swapping processes into memory
    - Faster execution of processes

<br>

- Drawbacks
  - Address mapping overhead
  - Page fault handling overhead
  - Should be carefully used in real-time (embedded) systems

<br>

- Methods
  - Paging (**Demand paging**)
    - Partition each user’s program into same size blocks
  - Segmentation
    - Partition each user’s program into logical blocks of different sizes
  - Hybrid paging/segmentation

<br>

## Address Mapping

### Case: Contiguous allocation

- Executable memory images can be built by relocation (Load-time binding)
  - Relative address
    - Start address of the program: 0
- Relocation
- Transforming relative addresses (address constants) in the program to the corresponding physical addresses according to the allocation address of the program

<br>

<img width="906" alt="image" src="https://user-images.githubusercontent.com/55765292/235887386-2b8220b9-6b1c-44b8-862f-cd9c0a954b5a.png">

<br>

### Case: Noncontiguous allocation

- Virtual address = relative address
- Real address = absolute(physical) address
- **Address mapping**
  - Difficult to implement load-time binding
  - Virtual address to real address transformation **at run-time**

<br>

### Notes

- Virtual address space
  - Refers to the logical (virtual) view of how a process is stored in memory

<br>

<img width="296" alt="image" src="https://user-images.githubusercontent.com/55765292/235887717-af1db60f-1fa2-4892-aca1-2d97ea4f1ca3.png">

<br>

- Sparse address space
  - Virtual address space that includes holes
  - Beneficial because the holes can be filled as the stack or heap segments grow or can be used when we wish to dynamically link libraries (shared objects) during program execution

<br>

- Shared library in virtual memory

<img width="915" alt="image" src="https://user-images.githubusercontent.com/55765292/235887944-cc11462d-7cef-4094-baee-bbfe2c49bd5f.png">

<br>

<img width="915" alt="image" src="https://user-images.githubusercontent.com/55765292/235888004-8f77b450-c8fa-4412-993e-44e6b4b3c884.png">

<br>

## Block mapping

<br>

### Block mapping

- Block mapping
  - Partition user programs into blocks
  - Maintain address mapping information for each block of the program
- Block map table
  - Keep virtual address, corresponding real address, and other information, for each block of the program

<br>

### Virtual address v = (b, d)

- **b** = block number
- **d** = displacement(offset) in a block

<br>

<img width="915" alt="image" src="https://user-images.githubusercontent.com/55765292/235888790-a3620feb-a07a-4c7f-85ff-01368c56b956.png">

<br>

### Block map table

- Maintains address mapping information
  - One BMT for each process in the system
  - In the kernel space

<img width="916" alt="image" src="https://user-images.githubusercontent.com/55765292/235889674-54a2a982-46fb-4c7e-870b-5b6000e90198.png">

<br>

### Block mapping procedure

<img width="916" alt="image" src="https://user-images.githubusercontent.com/55765292/235889778-b7a55972-3a29-4ae2-8642-7af6f1f0cf9a.png">

<br>

<img width="916" alt="image" src="https://user-images.githubusercontent.com/55765292/235889806-c09f768e-5a0f-43bc-bb4c-9ae547b54441.png">

<br>

# Demand Paging

<br>

## Paging System

<br>

### Paging (Demand paging) system

- Partition the program into the same size blocks (pages)
- Loading of executable program
  - Initially, load pages only as they are needed
  - During execution, load the pages when they are demanded (referenced)
    - Pages that are never accessed are never loaded into physical memory
    - 필요 없는 페이지는 다시 내보내기도 한다.

<br>

<img width="916" alt="image" src="https://user-images.githubusercontent.com/55765292/235891028-c9b78856-4fb7-4ad0-bc57-4956b311cafb.png">

<br>

### Terminologies

- Page
- Page frame
- Pager
  - Swaps a page into memory when the page is referenced
  - Concerned with the individual pages of a process

<br>

- Swapper
  - Manipulates entire process
  - Swaps entire process into memory

<br>

### Characteristics of paging system

- No logical partition of the program
- Simple and efficient
- Used in most operating systems
- Complex for sharing and protection

### Address mapping

- Virtual address v = (p, d) in paging systems
  - p = page number
  - d = displacement(offset)
- Address mapping
  - Uses PMT (Page Map Table)
- Address mapping mechanisms
  - Direct mapping
  - Associative mapping
    - TLB(Translation Look-aside Buffer)
  - Hybrid direct/associative mapping

<br>

- Page map table

<img width="916" alt="image" src="https://user-images.githubusercontent.com/55765292/235892434-06c60541-19c3-4a9d-97f5-bb433e4ef625.png">

<br>

## Address Mapping in Paging S.

<br>

### Direct mapping

- Similar to block mapping mechanisms
- Assumptions
  - PMT resides in kernel space of main memory
  - PMT entry size = entrySize
  - Page size = pageSize

<br>

<img width="916" alt="image" src="https://user-images.githubusercontent.com/55765292/235892880-81a3e331-b859-43bc-a524-e3b5c338c116.png">

<br>

<img width="916" alt="image" src="https://user-images.githubusercontent.com/55765292/235893228-291ff825-3db1-44d6-99d4-930b4fdd58b3.png">

<br>

### Problems in direct mapping

- Doubles the number of memory accesses during execution of the program
- Performance degradation
- PMT size

<br>

### Solutions

- Associative mapping (TLB)
- Implement the PMT using the dedicated registers or cache memories

<br>

### Associative mapping

- TLB(Translation Look-aside Buffer)
  - Associative high-speed memory
- Parallel search on PMT
- Low overhead, high speed
- Expensive hardware 

<br>

<img width="916" alt="image" src="https://user-images.githubusercontent.com/55765292/235894152-350dd373-ba28-49de-abec-8b056f032111.png">

<br>


### Hybrid direct/associative mapping

- Uses direct mapping and associative mapping, simultaneously
  - Low hardware cost
  - Take advantage of associative mapping
- Small TLB
  - Full PMT: maintained in kernel space of the memory
  - Subset of PMT entries: maintained in TLB
    - Entries of the recently used pages

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/30cb9043-94de-4b9a-8251-7f080ed5a8ea">

> Locality - 한 번 접근된 페이지는 또 다시 접근될 가능성이 많다.

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/403cea4b-8175-4087-9f35-e3e56f76e299">

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b3613db7-c761-41ce-b128-053d7deb2a71">

<br>

### Effective memory access time (EAT)

- TLB search: 20ns
- Memory access time: 100ns
- TLB hit ratio: 80%
  - EAT = 0.8*(20 + 100) + 0.2*(20 + 100 + 100) = 140ns
  - 40% slowdown in memory access time
- TLB hit ratio: 98%
  - EAT = 0.98*(20 + 100) + 0.02*(20 + 100 + 100) = 122ns
  - 22% slowdown in memory access time

<br>

### Other page table structures
- Page-table registers
- Hierarchical paging
- Hashed page table
- Inverted page table

<br>

# Issues in Demand Paging

<br>

## Page Sharing

<br>

### Sharable pages

- Procedure pages
  - Pure code (reentrant code)
- Data page
  - Read-only data
    - Sharable without any restriction
  - Read-write data
    - Sharable under the concurrency control mechanism

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bc09b1a7-7406-4f4e-b1c4-1d6c70adac10">

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/59aef4ee-66e4-4362-a286-d901d0e9b9b0">

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f7d7af00-81f0-4111-82f5-9482963c5b7b">

<br>

## Page Fault Handling

- A crucial requirement for demand paging
  - Restart any instruction after a page fault
  - Example (steps to execute and instruction)

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7fa5120f-0f21-4272-81f3-34e3667e58fa">

<br>

##  Performance of Paging System

<br>

### Effective access time

- Memory access time
  - 10 ~ 200 nanoseconds (Assume 100ns)
- Average paging service time: about 8 milliseconds
- Page fault rate: p (0  p  1)
- EAT(Effective Access Time)
  - EAT = (1-p)ma + ppagingTime
    - = (1-p)100 + p8,000,000
    - = 100 + 7,999,900p
  - When p = 1/1000, EAT = 8.1 microseconds ( 80ma)
- If we want less than 10% degradation,
  - EAT = 100 + 7,999,900p < 110
  - p < 0.00000125 ( 1/800,000)

<br>

### ....

<br>

# Segmentation & Hybrid Paging/Segmentation

<br>

## Segmentation system

- Partition user program into logical blocks with possibly different sizes
- Segment
  - Logically partitioned block
- Characteristics
  - Pre-partition of main memory is not good in this case
  - Main memory management can be done similarly to VPM
  - Easy segment sharing and protection
  - Larger overhead in address mapping and memory management

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ca08f65f-0227-4ed1-b95d-4db5a19024e1">

<br>

## Address mapping

- Virtual address in segmentation system: v = (s, d)
  - s = segment number
  - d = displacement in a segment
- SMT(Segment Map Table)
- Address mapping mechanisms
  - Similar to them of paging system

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c80e3291-54c7-40bd-9576-b64104de5b0e">

<br>

## Address Mapping in Seg. System

<br>

### Direct mapping

- Assumptions
  - SMT in kernel space of memory
  - Entry size of SMT = entrySize

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bc7b5628-f626-457a-8910-6db33ad2c44a">

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/79535714-f355-4836-9682-fd0c559cc384">

<br>

## Memory Mgm’t in Seg. Systems

<br>

- Memory management
  - Similar to VPM
  - Initially, 1 partition in memory
  - Placement strategies
    - First fit
    - Best fit
    - Worst fit
    - Next fit

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/70c72254-ab86-45a9-bccf-708f0efcec28">

<br>

## Hybrid Paging/Segmentation

<br>

### Paging System

- Advantages
  - Simple and low overhead
- Disadvantages
  - No logical concept in partitioning programs
  - Complicated page sharing mechanism

<br>

### Segmentation System

- Advantages
  - Logical concept in partitioning programs
  - Simple and easy sharing mechanism
- Disadvantages
  - Management overhead

<br>

### Hybrid paging/segmentation

- Take advantages of the paging/segmentation systems
- Program partition
  - User program is partitioned into logical segments
  - Each segment is partitioned again into pages
- Loading
  - Loading unit: page

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2d469381-14b1-4fdc-847e-0182dabca3f4">

<br>

### Address mapping

- Virtual address in hybrid systems: v = (s, p, d)
  - s = segment number
  - p = page number in a segment
  - d = offset in a page
- Uses both SMT and PMT
  - One SMT for each process
  - One PMT for each segment in the program
- Address mapping
  - Direct, associative, etc.
- Memory
  - Pre-partitioned into page frames

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/980257ef-5e53-4f86-b914-13dce0df1930">

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5a976ad1-d778-4d07-922c-621ac50ba872">

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0c6e69bf-f892-49ae-a9c6-c2dd42275d2f">

<br>

<img width="920" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e55e745f-c726-47a7-86ab-825a9d2104ab">

<br>

# Summary

- Virtual memory concept
- Address mapping
- Demand paging
  - Address mapping
    - Direct mapping, associative mapping, hybrid mapping, page table registers, hierarchical paging, hashed page table, inverted page table
  - Issues in demand paging
    - Page sharing, page fault handling, performance, copy-on-write, memory-mapped files, kernel memory allocation
- Segmentation
- Hybrid paging/segmentation

