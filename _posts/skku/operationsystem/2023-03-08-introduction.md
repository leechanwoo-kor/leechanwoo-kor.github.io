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

<br>

## Operating System

<br>

### Definition (Wiki, 2012)

- An **operating system** is an **interface between hardware and user**
- An OS is responsible for the **mgmt and coordination of activities** and the **sharing of the resources** of the computer
- The OS acts as a host forcomputing applications run on the machine
  - As a host, one of the purposes of an operating system is to **handle the details of the operation of the hardware.** This **relieves application programs from having to manage these details** and **makes it easier to write applications**
- Almost all computers (including handheld computers, desktops, supercomputers, video game consoles) as well as some robots, domestic appliances (dishwashers, washing machines), and portable media players use an operating system of some type

<br>

### Definition (Wiki, Now)

- An OS is a system software that **manages computer hardware, software resources,** and **provides common services** for computer programs
- The operating system acts as an intermediary between programs and the computer hardware, although the application code is usually executed directly by the hardware and frequently makes system calls to an OS function or is interrupted by it
- Operating systems are found on many devices that contain a computer, from cellular phones and video game consoles to web servers and supercomputers

<br>

### Market share (~ Now ~)

- General-purpose personal systems OS
  - MS Windows 75+%
  - MacOS 15+%
  - Linux ~2%
- Mobile OS
  - Google Android 70~90%
  - Apple iOS 10+%
  - Others ~1%
- Server and supercomputing systems OS
  - Linux distributions are dominant

<br>

##  OS functions

- User interface (for user convenience)
  - System call interface
- Resource management(for efficiency)
- Process management
- + Networking / Security & Protection

![image](https://user-images.githubusercontent.com/55765292/225205418-f14ad32f-1230-440a-8d59-51e2ee0406b1.png){: .align-center}

<br>

### User interface (for user convenience)

- CLI(Command Line Interface)
  - CUI(Character(Text)User Interface)
- GUI(Graphical User Interface)
- EUCI(End-User Comfortable Interface)
  - HCI(Human-Computer Interaction)
  - UX(User eXperience)

<br>

### Resource management (for efficiency)

- Processor management
- Memory management
- File management
- I/O management

<br>

### Process management

- Process management
- Thread management

+ Networking/Security+Protection

<br>

### Compute System Organization

![image](https://user-images.githubusercontent.com/55765292/225206137-b6d8f1a7-58f6-4c20-a3f0-2b9850e8a412.png){: .align-center}

<br>

![image](https://user-images.githubusercontent.com/55765292/225206216-8dbb0210-7214-4a7c-a40b-fffa7c4482d8.png){: .align-center}


<br>

## OS classification

<br>

### OS Classification Criteria

- Number of concurrent users
  - Single-user system
  - Multi-user system
- Number of concurrent processes
  - Single-tasking system
  - Multi-tasking system (Multiprogramming system)

<br>

- Job processing mechanism (Computing paradigm)
  - Batch systems
  - Interactive systems (Time-sharing systems)
  - Personal computing
  - Parallel/Distributed computing
  - Real-time system
  - Mobile computing
  - Cloud computing
  - Ubiquitous computing

<br>

### Single-user system vs. Multi-user system

- Single-user system
  - Only one user can use the system at a time
  - The user owns all the system resources
    - Simple protection mechanism
  - Mainly used for micro-computers or personal computers
  - MS-DOS, MS Windows 95/98/.../10
- Multi-user system
  - Several users can use the system simultaneously
  - **Protection mechanisms are necessary to control access to system resources (including files)**
  - Requires multi-tasking
  - Requires more complex OS functions/facilities
  - Unix, Linux

<br>

### Single-tasking system vs. Multi-tasking system

- Single-tasking system
  - Only one process can exist in the system at a time
    - A process can start execution only after current process leaves the system
  - Single-user system
  - Simple OS structure
  - Mainly used for micro-computers or personal computers
  - MS-DOS
- Multi-tasking system
  - Multiple processes can exist in the system simultaneously
  - **Requires concurrency control and synchronization mechanisms**
  - Complex OS structure
  - Unix, Linux

<br>

### Computing Paradigm

![image](https://user-images.githubusercontent.com/55765292/225207962-2ad3a2aa-3288-4920-8a01-3a328bc2a514.png){: .align-center}

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
