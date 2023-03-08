---
title: "[Operating System] Introduction and System Structures"
categories:
  - Operating System
tags:
  - Operating System
toc: true
toc_sticky: true
toc_label: "Introduction and System Structures"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222906118-9c24d371-e8b0-44e2-b765-ab3aa0f3a94e.png)

<br>

# Introduction and System Structures

##  OS functions
### Resource management, process management
### User interface

## OS classification
### Open system, Proprietary system
### Criteria
#### # of concurrent users, # of concurrent processes
#### Job processing mechanisms (Computing paradigm)

// 여기까지가 1주차..

<br>

## OS Structure

<br>

### OS Structure

- Kernel
  - Nucleus part of OS (memory resident after **booting**)
  - Supports the functions that are frequently used for applications
  - Mainly supports resource management functions
  - Also called
    - Nucleus, supervisor program, resident program, control program
- Utilities
  - Non-resident program, service program
  - Mainly supports service functions (including UI functions)

<br>

### Booting

- Bootstrap program (bootstrap loader)
  - Locate and load the OS kernel into memory
    - Initial program to be executed when a computer to start running
  - Initializes all aspects of the system
    - CPU registers
    - Device controllers
    - Memory contents
  - Stored in ROM in a form of firmware
  - May use two-step process in which a simple bootstrap loader fetches a more complex boot program from disk, which in turn loads the kernel

<br>

## Functions of OS

<br>

### Process Management

- Process
  - Program in execution
  - Entity that services user’s request and/or runs user program
- Process management functions
  - Creation/deletion
  - Dispatch(schedule)/preemption/block
  - Suspension/resumption
  - Process synchronization, Inter-process communication
  - Deadlock handling
- Data structure for process management
  - PCB (Process Control Block)

<br>

### Processor Management

- Process scheduling
  - Determines order of process execution for a processor
- Processor assignment
  - Placement of processes to each processor in the system

<br>

### Memory management

- Multi-user, multi-tasking system
  - Memory allocation/deallocation
  - Free space management
  - Memory protection
- Memory allocation schemes
  - Total contiguous allocation
  - Virtual memory system

<br>

### File management

- File
  - Logical storage unit
- Management of user and system files
- Supports hierarchical directory structure
- File/space management functions
  - Creation/deletion of files/directories
  - Support of primitives for file/directory manipulation
  - Mapping of files onto secondary storage
  - Storage space allocation
  - Free space management
  - ~~File backup service (X)~~

<br>

<img width="724" alt="image" src="https://user-images.githubusercontent.com/55765292/223685144-42d1f6a4-7824-4c56-bb66-951f255c50de.png">{: .align-center}

<br>

<img width="704" alt="image" src="https://user-images.githubusercontent.com/55765292/223685251-fb8dd5ff-84fe-465c-8733-eee37d9612b5.png">{: .align-center}

<br>

### I/O Management

<br>

<img width="749" alt="image" src="https://user-images.githubusercontent.com/55765292/223686320-752629e3-bf28-477e-b81a-6e42b33a7823.png">{: .align-center}

<br>

- Buffer pool
  - Data transmission between applications and I/O devices
  - In the kernel space of memory

<br>

<img width="743" alt="image" src="https://user-images.githubusercontent.com/55765292/223687118-79f83a47-a069-4455-a04c-8e479b0273be.png">{: .align-center}

<br>

### Secondary storage managerment

- Disk management
  - Disk scheduling
- Related to file system management

<br>

### Other management functions

- Networking
- Security and protection system
- Etc

<br>

## Dual Mode Operations

<br>

### Two separate modes

- Mode bit in the CPU indicates the current mode
  - **User mode**
    - Executing on behalf of user application
  - **Kernel mode** (supervisor mode, privileged mode)
    - Executing on behalf of operating system
- Mode change
  - When a **trap** or **interrupt** occurs, the H/W switches from user mode to kernel mode

<br>

### Interrupt and trap

- Interrupt
  - Unexpected external event
  - From either the H/W or the S/W
    - H/W may trigger an interrupt by sending a signal to the CPU
- Trap
  - Software-generated interrupt caused by
    - An error of the running program
      - Exception
    - A specific request from a user program
      - System call

<br>

### Privileged instruction

- Machine instructions that can be executed only in kernel mode
- Examples
  - I/O control
  - Timer management
  - interrupt management
  - Switching to user mode
  - Etc

---

- Manipulate memory management register
  - LGDT, LLDT, LTR, LIDT, SGDT, SLDT, SIDT, STR
- Load and store control registers
  - MOV {CR0~CR4}
- Invalidate cache and TLB
  - INVD, WBINVD, INVLPG
- Performance monitoring
  - RDPMC, RDTSC, RDTSCP
- Fast System Call
  - SYSENTER, SYSEXIT

<br>

## System Call Interface

<br>

### System calls

- Interface between applications/processes and the OS
- Services that OS provides to applications/processes
  - Means for a user program to ask the OS to perform tasks reserved for OS on the user program’s behalf
  - Means used by a process to request action by the OS
- Executed by a generic trap instruction
  - syscall instruction in MIPS R2000

<br>

<img width="690" alt="image" src="https://user-images.githubusercontent.com/55765292/223691649-5c8f6ca1-b6ad-4b58-bc20-a9ae10384b15.png">{: .align-center}

<br>

- Process control
  - Create, terminate, load, wait, etc.
- File management
  - Create, delete, open, close, read, write, reposition, etc.
- Device management
  - Request, release, read, write, etc.
- Information management
  - Get/set time/date, get process/file/device attributes, etc.
- Communications
  - Create/delete connection, send/receive messages, etc.
- Etc

<br>

#### in Unix

<br>

<img width="746" alt="image" src="https://user-images.githubusercontent.com/55765292/223692843-50815e75-b750-4612-8dd4-ba46415a4ead.png">{: .align-center}

<br>

### Interrupts and Traps

<br>

#### System Calls, Interrupts, and Exceptions

<br>

<img width="807" alt="image" src="https://user-images.githubusercontent.com/55765292/223693208-fac515be-98d7-42db-b9c1-ec776aa8fe81.png">

<br>







## Virtualization
