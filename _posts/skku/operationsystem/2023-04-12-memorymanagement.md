---
title: "[Operating System] Memory Management"
categories:
  - Operating System
tags:
  - Memory Management
toc: true
toc_sticky: true
toc_label: "Memory Management"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222906118-9c24d371-e8b0-44e2-b765-ab3aa0f3a94e.png)

<br>

# Background

- Types of memories in computer systems
  - Processor registers
  - Cache memory
  - **Main memory**
  - **Auxiliary memory (보조기억장치)**
- Notes
  - Block
    - Data transfer unit between primary memory and secondary storage
    - Size: 1 ~ 4 KB (128B ~ 8MB)
  - Word
    - Data transfer unit between primary memory and CPU
    - Size: 16 ~ 64 bits

<br>

<img width="820" alt="image" src="https://user-images.githubusercontent.com/55765292/231419858-ce494cff-ef51-462e-bb18-46f29135ffe3.png">{: .align-center}

<br>

## Cache

- CPU register access time
  - Generally takes 0~1 cycles of the CPU clock
- Memory access time
  - Generally takes 50~200 cycles of the CPU clock
  - CPU normally needs to stall during the memory access
  - Intolerable because of the frequency of memory accesses
- Cache memory
  - Used to accommodate the speed differentia
- Intel Core i7 cache :

<img width="476" alt="image" src="https://user-images.githubusercontent.com/55765292/231422203-f9dbb8a3-59c6-4746-863a-80c8fce10549.png">{: .align-center}

<br>

## CPU-memory performance gap

<img width="864" alt="image" src="https://user-images.githubusercontent.com/55765292/231422999-f885893b-f47f-4669-b4e8-b3e240934542.png">{: .align-center}

<br>

## Address binding

<img width="864" alt="image" src="https://user-images.githubusercontent.com/55765292/231423473-63d868e9-01bf-475d-b4bc-bc3c35865b63.png">{: .align-center}

<br>

- Compile-time binding
  - When it is known at compile time where the process will reside in memory, then **absolute code** can be generated
  - Changing the starting location requires recompilation
  - MS-DOS .COM-format programs

<br>

<img width="643" alt="image" src="https://user-images.githubusercontent.com/55765292/231425716-04f938a7-d508-47e0-83c4-c92d3b893055.png">{: .align-center}

<br>

- Load-time binding
  - When it is not known at compile time where the process will reside in memory, then the compiler must generate **relocatable code**
  - Final binding is delayed until load time
  - Changing the starting location requires reloading or **relocation** of the user code

<br>

<img width="959" alt="image" src="https://user-images.githubusercontent.com/55765292/231426284-d44827b7-02e7-4c4e-a692-e2ebbaa2ab53.png">{: .align-center}

<br>

- Run-time binding
  - Processes can be moved during its execution from one memory location to another
  - Special hardware is required
  - Used in most general-purpose operating systems
  - Run-time mapping from logical(virtual) address to physical address is performed by a hardware device called MMU(Memory Management Unit)

<br>

<img width="936" alt="image" src="https://user-images.githubusercontent.com/55765292/231427557-6c1a0142-d4c0-42b7-8e2b-41c705253453.png">{: .align-center}

<br>

- Notes
  - Logical address (relative address, virtual address)
    - An address generated by the CPU
  - Physical address
    - An address seen by the memory unit
    - An address loaded into MAR
  - Relocation register (base register)
    - Holds the allocation address (smallest physical address)
  - Limit register
   - Contains the range of logical addresses

<br>

## Dynamic linking

- **Linking is postponed until execution time**
- Usually used with system libraries
  - Without this facility, each executable on a system must include a copy of its library
    - Wastes both disk space and main memory

- Uses **stub** concept
  - Included in the image for each library routine reference
  - Small piece of code that indicates how to locate or load the appropriate library routine (in memory or from the library)
  - Replaces itself with the code that contains the address of the routine and executes the routine
    - At the next time that the code segment is reached, the library routine is executed directly without further dynamic linking

<br>

- Code sharing
  - All processes that use a library execute only one copy of the library code
- Supports the concept of shared libraries
- Requires help from the OS

<br>

### Overlay structure

- Keep in memory only those instructions and data that are needed at any given time
- Example) Assembler
  - Symbol table(1MB), Common routines(2MB), Pass-1(3MB), Pass-2(4MB)
  - Primary memory size: 8MB


<br>

<img width="610" alt="image" src="https://user-images.githubusercontent.com/55765292/231429144-6ada32c6-1064-45b4-982f-c2eeb0c83599.png">{: .align-center}

<br>

## Swapping

- A process can be swapped temporarily out of memory to a **backing store (swap device(swap file system))** 

<br>

<img width="926" alt="image" src="https://user-images.githubusercontent.com/55765292/231429701-403afede-aa40-4535-b284-968d62e11423.png">{: .align-center}

<br>

**Notes on swapping**
- Time quantum vs swap time
  - Time quantum should be substantially larger than swap time (context switch time) for efficient CPU utilization
- Pending I/O
  - If I/O is asynchronously accessing the user memory for I/O buffers, then the process cannot be swapped
  - Solutions
    - Never swap a process with pending I/O
    - Execute I/O operations only into kernel buffers (and deliver it to the process memory when the process is swapped in)

<br>

- Swap device (swap file system)
  - Swap space is allocated as a chunk of disk
    - Contiguous allocation of the process image
    - Fast access time

<br>

**Ordinary file system** <br>
Discontiguous allocation of the file data blocks <br>
Focuses on the efficient file system space management
{: .notice--warning}

<br>

## Memory Management

<img width="967" alt="image" src="https://user-images.githubusercontent.com/55765292/231431474-5d7497e8-1ac4-4c8a-8218-f67b1fd47c0f.png">{: .align-center}

<br>

# Contiguous Memory Allocation

- Basic policies
  - Each process (context) is contained in a single contiguous section of memory
- Policies for memory organization
  - Number of processes in memory
    - Affects multiprogramming degree
  - Amount of memory space allocated for each process
  - Memory partition methods
    - Fixed(static) partition multiprogramming
    - Variable(dynamic) partition multiprogramming

<br>

## Uniprogramming

- Only 1 process in memory
- Simple memory management scheme

<img width="857" alt="image" src="https://user-images.githubusercontent.com/55765292/231433288-da400d68-dcd4-4743-982e-3ac33258a0d5.png">{: .align-center}

<br>

### Issue-1

- Program-size > memory-size
  - Uses **overlay structure**
  - Requires support from compiler/linker/loader

<img width="857" alt="image" src="https://user-images.githubusercontent.com/55765292/231433611-38d5639c-7980-44de-ae01-2a488108eb0c.png">{: .align-center}

<br>

### Issue-2

- Kernel protection
  - Boundary register

<img width="857" alt="image" src="https://user-images.githubusercontent.com/55765292/231433709-16942ffb-232c-47db-ad0f-6c948c074c2d.png">{: .align-center}

<br>

### Issue-3

- Low system resource utilization
- Low system performance
- Solution
  - Multiprogramming → FPM or VPM

<br> 

## FPM

- FPM: Fixed Partition Multiprogramming
  - Divide memory into several fixed-size partitions
  - One process $\leftrightarrow$ one partition
    - One process can use only one partition
    - One partition can be used by only one process
  - When number of partitions = k
    - Maximum multiprogramming degree = k
  - IBM OS/360 MFT

<br>

### FPM Example

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234537104-1a7fc4d6-9fe1-4447-861d-1d14898a8678.png">

<br>

### Data structure for FPM: Example

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234537841-b7d15515-7582-4f58-832d-20c788ccc4a2.png">

<br>

### Program reloacation

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234538094-4d71dceb-75c6-45b6-befc-ea629e821667.png">

<br>

### Protection method

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234538664-567af213-75d5-4249-97d1-36e145447d91.png">

<br>

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234538927-45643ff1-3b6e-4016-9b88-1bb221cfca1c.png">

<br>

- Loading the relocation and limit registers
  - During context switching
  - By the dispatcher
  - Using a special privileged instruction
    - Allows the OS to change the value of the registers
    - Prevents user programs from changing the registers

<br>

### Fragmentation

: Waste of storage space

- Internal fragmentation
  - Exists when the memory space allocated is larger than the requested memory
- External fragmentation
  - Exists when enough total memory space exists to satisfy the request, but it is not contiguous

<br>

- **Both types of fragmentation exist in FPM**

<br>

### Summary

- Several fixed partitions in memory
- Simple memory management
- Low memory management overhead
- May cause poor resource utilization
- Internal/external fragmentation

<br>

<br>

## VPM

- VPM: Variable Partition Multiprogramming
  - Initially, all memory is available as a single large block of available memory (hole, partition)
  - Memory partition state dynamically changes as a process enters or exits the system
  - No internal fragmentation in a partition
  - Contiguous allocation

<br>

- Example

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234541220-caca81e1-7d7f-423d-b9ce-d36e1228035e.png">

<br>

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234541360-4e381d08-8c98-4b8c-81db-a9ddaaaff8ab.png">

<br>

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234541937-f19de437-1b95-4097-ba52-415dbb7e2c74.png">

<br>

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234542226-c5202cb0-8498-46a7-b792-2810a00d48f6.png">

<br>

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234542389-4ba1ad5b-03a3-4677-9834-bccb68e72552.png">

<br>

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234542424-14bdc525-84fd-4322-b7cb-61332e2c056b.png">

<br>

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234542782-9bee339e-6f1d-430f-87db-212dafcdd00b.png">

<br>

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234542902-96a59eee-3cfc-4c95-8293-d51f8e8b13e6.png">

<br>

### Placement strategies

- First-fit
  - Start searching at the beginning of the state table
  - Allocate the first partition that is big enough
  - Simple and low overhead
- Best-fit
  - Search the entire state table
  - Allocate the smallest partition that is big enough
  - Long search time
  - Can reserve large size partitions
  - May produce many small size partitions
  - External fragmentation
- Worst-fit
  - Search the entire state table
  - Allocate the largest partition available
  - May reduce the number of small size partitions
- Next-fit
  - Similar to first-fit method
  - Start searching from where the previous search ended
  - Circular search the state table
  - Uniform use for the memory partitions
  - Low overhead

<br>


### Coalescing holes

- Merge adjacent free partitions into one large partition

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234545393-1e02cfad-e6a9-4a26-9e5e-7cc70d42330e.png">

<br>

### Storage compaction

- Shuffle the memory contents to place all free memory together in one large block (partition)
- Done at execution time
  - Can be done only if relocation is dynamically possible
- Consumes so much system resources
  - Consumes long CPU time

<br>
<br>

# Discontiguous Memory Allocation

- Paging
- Segmentation

## Paging

- Memory management scheme that permits the physical address space of a process to be noncontiguous
- Implemented by closely integrating the hardware and operating system

<br>

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234548033-114175e6-2e36-4daf-aa0d-759371cccd00.png">

<br>

### Basic method

- Frames (page frames)
  - Breaking physical memory into fixed-size blocks
- Pages
  - Breaking logical memory into blocks of the same size
  - Page size
    - Typically power of 2
    - 512B ~ 16MB (typically 4KB ~ 8KB)
- Logical address
  - **v = (p, d)**
    - **p**: page number
    - **d**: page offset (displacement)
- Address mapping
  - Logical address → physical address
  - Hidden from the user and controlled by the OS
  - Uses page table
    - A page table for each process

<br>

- Paging hardware and address mapping

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234550537-6b1925ce-df2d-4bec-a3b5-adc4bf93c4b4.png">

<br>

- Page table implementation
  - Dedicated CPU registers
  - TLB (Translation Look-aside Buffer)
- See [Virtual Memory Organization]

<br>

## Segmentation

<br>

### Basic concept

- View memory as a collection of variable-sized segments
- View program as a collection of various objects
  - Functions, methods, procedures, objects, arrays, stacks, variables, and so on
- Logical address
  - **v = (s, d)**
    - **s**: segment number
    - **d**: offset (displacement)

<br>

- Normally, when the user program is compiled, the compiler automatically constructs segments reflecting the input program
  - Code
  - Global variables
  - Heap
  - Stacks
  - Standard library

<br>

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234550926-8a5e5208-6aef-47f6-b013-3a770a911b92.png">

<br>

### address mapping

<img width="909" alt="image" src="https://user-images.githubusercontent.com/55765292/234551124-eba76063-c97b-4d06-8376-ec06ebda1777.png">

<br>

### Summary

- Contiguous memory allocation
  - Uniprogramming
  - Multiprogramming
    - FPM
    - VPM
- Discontiguous memory allocation
  - Paging
  - Segmentation

<br>

<img width="282" alt="image" src="https://user-images.githubusercontent.com/55765292/234552506-e6cd0227-55d1-4213-bc5e-b565adf7a8d9.png">

<br>

# Intel Pentium Architecture (For your self-study)

...
