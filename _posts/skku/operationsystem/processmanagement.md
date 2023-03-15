---
title: "[Operating System] Process Management"
categories:
  - Operating System
tags:
  - Operating System
toc: true
toc_sticky: true
toc_label: "Process Management"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222906118-9c24d371-e8b0-44e2-b765-ab3aa0f3a94e.png)

<br>

# Process Management

<br>

## Process Concept

<br>

### Process concept

- Job (Application, Execution/Image file)
  - A bundle of program and data to be executed
  - An entity before submission for execution
- Process
  - An entity that is registered to kernel for execution
  - Kernel manages the processes to improve overall system performance

<br>

<img width="793" alt="image" src="https://user-images.githubusercontent.com/55765292/225278816-cee1c2d4-9b35-4a68-893c-08e1205f87a8.png">{: .align-center}

<br>

- A process includes
  - Program code → text
  - Global data → data
  - Temporary data → stack
    - Local variables, function parameters, return addresses
  - Heap
    - Memory area that is dynamically allocated during execution
  - Values of the processor registers including program counter and general registers
  - Etc

<br>

![image](https://user-images.githubusercontent.com/55765292/225280937-fd37cea2-9381-42fc-98bf-521460c7f53d.png){: .align-center}

<br>

- A program in execution
- An entity that is registered and being managed by kernel
- An entity that is admitted to request and use system resources
- An entity that is allocated the PCB
- An active entity
  - Request/allocate/release system resources during execution


<br>

### Resource Concept

- Resource concept
- A passive entity that is allocated to and released by the processes under the control of the kernel
- Classification of the resources

<br>

<img width="746" alt="image" src="https://user-images.githubusercontent.com/55765292/225281969-51d3632b-451c-4b78-968a-9f4c047f204e.png">{: .align-center}

<br>

### Modeling of system states

- Interaction between the processes and resources
- What is in the system?
  - Processes
  - Resources
  - Kernel

<br>

## PCB(Process Control Block)

- Keeps several information about each process that is registered to the kernel
- Maintained in kernel space

<br>

<img width="744" alt="image" src="https://user-images.githubusercontent.com/55765292/225282486-2d340eec-1b71-49d7-b9c3-d03bbfa49d7c.png">{: .align-center}

<br>

### Information in PCB

- PID (Process Identification Number)
- Process state
- Scheduling information
  - Process priority, scheduling parameters, etc.
- Memory management information
  - Base/limit registers, page tables, segment tables, etc.
- I/O status information
  - List of I/O devices allocated, list of open files, etc.
- Accounting information
- **Context save area**
  - Space for saving register context of the process

<br>

- In Unix
  - Process table slot
  - U-area
- In Linux
  - Process descriptor (task_struct)
- Notes
  - PCB information is different for each OS
  - PCB access speed is important for overall system performance

<br>

<img width="266" alt="image" src="https://user-images.githubusercontent.com/55765292/225283045-fd197bcf-25f4-42d7-a636-086f7f615683.png">

<br>









