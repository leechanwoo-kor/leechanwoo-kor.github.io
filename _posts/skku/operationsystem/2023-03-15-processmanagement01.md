---
title: "[Operating System] Process Management (1)"
categories:
  - Operating System
tags:
  - Process Management
toc: true
toc_sticky: true
toc_label: "Process Management (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222906118-9c24d371-e8b0-44e2-b765-ab3aa0f3a94e.png)

<br>

# Process Management (1)

<br>

## Process Concept

- Job (Application, Execution/Image file)
  - A bundle of program and data to be executed
  - An entity before submission for execution
- Process
  - An entity that is registered to kernel for execution
  - Kernel manages the processes to improve overall system performance

<br>

<img width="793" alt="image" src="https://user-images.githubusercontent.com/55765292/225278816-cee1c2d4-9b35-4a68-893c-08e1205f87a8.png">{: .align-center}

<br>

**A process includes**
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

- A passive entity that is allocated to and released by the processes under the control of the kernel
- Classification of the resources

<br>

<img width="746" alt="image" src="https://user-images.githubusercontent.com/55765292/225281969-51d3632b-451c-4b78-968a-9f4c047f204e.png">{: .align-center}

<br>

### System States

- Modeling of system states
  - Interaction between the processes and resources
  - What is in the system?
    - Processes
    - Resources
    - Kernel

<br>

## PCB (Process Control Block)

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
  - Process descriptor (**task_struct**)

```Linux
struct task_struct {
  unsigned long state;
  int prio;
  unsigned long policy;
  struct task_struct *parent;
  struct list_head tasks;
  pid_t pid;
  ...
}
```

- Notes
  - PCB information is different for each OS
  - PCB access speed is important for overall system performance

<br>

## Process States

- Determined by the process-resource interaction states

<br>

<img width="860" alt="image" src="https://user-images.githubusercontent.com/55765292/226861784-bfe695c8-97b4-4550-a24e-b07d6450865f.png">{: .align-center}

<br>

### Process State Transition Diagram

<br>

<img width="892" alt="image" src="https://user-images.githubusercontent.com/55765292/226861946-c38586ef-73b8-4999-8cfc-90a5481279af.png">{: .align-center}

<br>

### Created state

- User’s job/command request is registered to the kernel
- PCB allocated
- New process is being created
- Transient state

<br>

- Kernel
  - Check available memory space
  - Transit the process to ready or suspended ready state

<br>

- Process creation in Unix system
  - By **fork()** system call

<br>

- Process creation
  - By system call
  - Parent process, child process
  - Tree-structured process hierarchy

<br>

### Ready state

- Allocated all resources necessary except processor
- Waiting processor allocation
- Can execute immediately when the processor is allocated
- Dispatch, schedule
  - Transition from ready state to running state

<br>

### Running state

- Owns processor now (executing its program on the processor)
- Owns all resources necessary

<br>

- Preemption
  - Transition from running state to ready state
  - Due to the expiration of time quantum (time slice) or appearance of higher priority process
- Block/sleep
  - Transition from running state to asleep state
    - Waiting for resource allocation, I/O completion, or special event, during execution (running)

<br>

### Blocked/asleep state

- Requested some resources other than processor or memory and waiting for them
- Resource request through system call
  - System call $\equiv$ SVC (SuperVisor Call)
    - Kernel provides application processes with system call I/F so that they can request resources
- Wakeup
  - Transition from asleep state to ready state
  - Due to allocation of resources or occurrence of events

  Immediate transition from asleep state to running state is not allowed. Why?{: .notice--warning}

<br>

### Suspended state

- Suspended ready state
  - Swapped out of memory from ready state
  - Memory image is transferred to swap device, which is a special file system
- Suspended asleep state
  - Swapped out of memory from asleep state

<br>

- swap-out(suspend)
  - Transition due to losing memory
- swap-in(resume)
  - Transition due to getting memory

<br>

### Terminated/zombie state

- Completing process execution
- Releasing all resources allocated
- Only having some information in PCB (in kernel space, memory)
- Process termination in Unix system
  - By **exit()** system call

<br>

### Process States in Unix

<img width="833" alt="image" src="https://user-images.githubusercontent.com/55765292/226867818-55823814-d5e5-4297-a270-161de6bb7753.png">{: .align-center}

<br>

### Process States in Linux

<img width="833" alt="image" src="https://user-images.githubusercontent.com/55765292/226867912-af1f47d0-045f-4b5b-9370-970e180b0216.png">{: .align-center}
