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


## Hybrid paging/segmentation




