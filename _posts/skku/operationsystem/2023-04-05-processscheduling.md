---
title: "[Operating System] Process Scheduling"
categories:
  - Operating System
tags:
  - Process Scheduling
toc: true
toc_sticky: true
toc_label: "Process Scheduling"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222906118-9c24d371-e8b0-44e2-b765-ab3aa0f3a94e.png)

<br>

# Process Scheduling

<br>

### MultiProgramming (Multi-tasking)

- Multiple processes in the system with one or more processors
- Increases processor utilization by organizing processes so that the processor always has one to execute

<br>

- Resource management
  - Resources for **time sharing**
    - Multiple processes use a resource in a time-shared manner
    - **Processor**
    - Process scheduling
      - Allocates processor time slots to processes
  - Resources for **spacing sharing**
    - Partition a resource and let each process use the partitions allocated to him
    - **Memory**

<br>

## Goals of Scheduling

<br>

**Goals of process scheduling**
- Improving system performance while caring for each process

### Typical performance indices

- **Response time**
- **Throughput**
- **Resource utilization**
- Turnaroud time
- Predictability
- Fairness
- Etc

Each system selects a scheduling policy with the consideration on the performance indices for its application domain
{: .notice--warning}

<br>

- **Mean response time**
  - The amount of time it takes to start responding
    - Time from the submission of a request until the first response is produced
  - Used in interactive systems
- **Throughput**
  - The number of processes completed per time unit
  - Used in batch systems
- **Resource utilization**
  - Percentage of time that the resource is busy during a given interval
  - Used in batch systems
- Turnaroud time
  - Interval from the time of submission to the time of completion
- Waiting time
  - Sum of the periods spent waiting in the ready queue
- Predictability
- Fairness
- Etc

<br>

## Scheduling Level

- Long-term scheduling
- Medium-term scheduling
- Short-term scheduling

<br>

![image](https://user-images.githubusercontent.com/55765292/231320552-7f65cae6-3983-4f9d-9d40-130d5b830128.png){: .align-center}

<br>

### Long-term scheduling

- Job scheduling, admission scheduling, high-level scheduling
- Selects the jobs to be submitted into the system and registered to the kernel
  - Controls **multiprogramming degree**
  - Should select a good **process mix** of I/O-bound and compute-bound processes
- In most time-sharing systems, each job or command is put into the system immediately after its submission
  - No long-term scheduling

<br>

### Medium-term scheduling

- Intermediate-level scheduling
- **Memory allocation**
  - Swapping (swap-in/swap-out)
- Dependent on memory management schemes of the operating systems

<br>

### Short-term scheduling

- Process scheduling, low-level scheduling
- Selects a process among the processes that are ready to execute, and allocates CPU to him
- **Process scheduler**, dispatcher
  - Executed when interrupt occurs or when the running process makes a system call and incurs a context switch
- Should select a new process for CPU frequently
  - Assume 100ms average CPU burst and 10ms for the scheduling decision
  - 10 / (100+10) = 9% of the CPU is being used simply for scheduling

<br>

## Scheduling Policies

<br>

### Preemptive scheduling

- CPU may be preempted to another proecss independent of the intention of the running process
  - Flexibility, adptability, performance improvements
- Used for time-sharing systems and real-time systems
- Incurs a cost associated with access to shared data $\rightarrow$ [Process synchronization]
- Affects the design of operating system kernel
  - Kernel data integrity and consistency
- High context switching overhead

![image](https://user-images.githubusercontent.com/55765292/231322454-cb018358-21fa-4b61-a6a1-f7f1bf20d430.png){: .align-center}

<br>

### Non-preemptive scheduling

- Process uses the CPU until it voluntarily releases it (eg. for system call)
- No preemption
- Pros
  - Low context switch overhead
- Cons
  - Frequent priority inversions
  - May result in longer mean response time

![image](https://user-images.githubusercontent.com/55765292/231322986-2b2ab070-ddf6-4e6a-b749-465504fc02ca.png){: .align-center}

<br>

### Priority

- Classification
  - Static priority (external priority)
    - Decided at process creation time and fixed during execution of the process
    - Not adaptable to system environments
    - Simple, low-overhead
  - Dynamic priority (internal priority)
    - Initial priority at process creation time
    - May vary as the state of the system and processes changes
    - Adaptable to system environments
    - Complex, high overhead doe to priority adjustment

<br>

### Terminologies

**CPU burst vs I/O burst**
- Process execution consists of a cycle of CPU execution and I/O wait
- CPU burst
  - Each cycle of CPU execution
- I/O burst
  - Each cycle of I/O wait
- Burst time is an important factor(criteria) for scheduling algorithms

![image](https://user-images.githubusercontent.com/55765292/231323557-623f51e5-108c-4c89-bb12-26fa0aea7470.png){: .align-center}

<br>

## Scheduling Schemes

- FCFS
- RR
- SPN
- SRTN
- HRRN
- Priority
- MLQ
- MFQ

<br>

### FCFS (First-Come-First-Service) scheduling

- Non-preemptive scheduling
- Scheduling criteria
  - Arrival time (at the ready queue)
  - Faster arrival time process first
- High resource utilization
- Adequate for batch systems, not for interactive systems
- Disadvantages
  - Convoy effect
    - Many processes may wait for one big process to get off the CPU
  - Longer mean response time

![image](https://user-images.githubusercontent.com/55765292/231323880-59f6793b-2fab-46d3-8fb5-3c274b0b78cc.png){: .align-center}

<br>

![image](https://user-images.githubusercontent.com/55765292/231323924-3b82ed96-b57a-462a-981c-847b8216f343.png){: .align-center}

<br>

### RR (Round-Robin) scheduling

- Preemptive scheduling
- Scheduling criteria
  - Arrival time (at the ready queue)
  - Faster arrival time process first
- **Time quantum** for each process
  - System parameter
  - The (running) process that has exhausted his time quantum releases the CPU and goes to the ready state (timeout)
    - Prevents monopoly of the CPU by a process
- High context switching overhead due to preemptions
- Adequate for interactive/time-sharing system
- Performance of the RR scheme depends heavily on the size of the time quantum
  - Very large (infinite) time quantum $\rightarrow$ FCFS
  - Very small time quantum $\rightarrow$ **processor sharing**
    - Appears to the users as though each of the **n** processes has its own processor running at **1/n** speed of the real processor

![image](https://user-images.githubusercontent.com/55765292/231324610-94f36786-0364-4058-b9bc-29e2901ab30e.png){: .align-center}

<br>

![image](https://user-images.githubusercontent.com/55765292/231324659-d7412017-d893-4639-b6a2-065b63b5a679.png){: .align-center}

<br>

### SPN (Shortest-Process-Next) scheduling

- SJF(Shortest Job First) scheduling
- Non-preemptive scheduling
- Scheduling criteria
  - Burst time
  - Shortest next CPU burst time first scheduling
- Pros
  - Gives minimum average waiting time for a given set of processes
  - Minimizes the number of processes in the system
    - Reduces the size of the ready queue
    - Reduces the overall space requirements
  - Fast responses to many processes
- Cons
  - **Starvation**, indefinite postponement(blocking)
    - Long burst-time processes
    - Can be solved by **aging*
  - No way to know the length of the next CPU burst for each process
    - It is necessary to have a scheme for **burst time estimation**
    - Estimation by exponential average
      - $\tau_{n+1} = \alpha t_n + (1-\alpha) \tau_n
        = \alpha t_n + (1-\alpha)\alpha t_{n-1} + \dots + (1-\alpha)^j \alpha t_{n-j} + \dots + (1-\alpha)^{n+1} \tau_0$
      - $t_n$ : Length of the n-th CPU burst
      - $\tau_0$ : Constant
      - $0 \leq \alpha \leq 1$

<br>

<img width="842" alt="image" src="https://user-images.githubusercontent.com/55765292/230047791-84bb46bc-9e57-4be1-a737-69d691428f09.png">{: .align-center}

<br>

### SRTN (Shortest Remaining Time Next) scheduling

- Variation of SPN scheduling (preemptive SPN)
- Preemptive scheduling
  - Preempt current running process when another process with shorter remaining CPU burst time arrives at the ready queue
- Cons
  - Burst time estimation overhead as in SPN
  - Overhead for tracing remaining burst time
  - High context switching overhead

<br>

<img width="842" alt="image" src="https://user-images.githubusercontent.com/55765292/230048458-39767f27-204d-49d8-bd34-58c7cf6c8b53.png">{: .align-center}

<br>

### HRRN (High-Response-Ratio-Next) scheduling

- Uses aging concepts
  - Give chances to long burst time processes
- Scheduling criteria
  - Higher response-ratio process first
- Response ratio
  - Length of waiting time relative to that of burst (service) time

<br>

<img width="578" alt="image" src="https://user-images.githubusercontent.com/55765292/230049749-315693ee-4c8a-4f9c-8ddc-1b516aa813ea.png">{: .align-center}

<br>

- Prevents starvation
  - Increase the priority of the process that waits on the ready queue
  - Aging
- Similar effects as SPN scheduling
- Cons
  - Burst time estimation overhead as in SPN

<br>

### Priority scheduling

- Scheduling criteria
  - Process priority
  - Tie breaking: FCFS
- Priority in real operating systems
  - Priority range is different for each system
  - Mapping from the numerical value of the priority to the priority level is different for each system
- Can be either preemptive or non-preemptive
- Major problem
  - Starvation

<br>

<img width="826" alt="image" src="https://user-images.githubusercontent.com/55765292/230051395-8db91d2a-2e3c-48e8-9b20-0bee536b77a8.png">{: .align-center}

<br>

### MLQ(Multi-level Queue) scheduling

- Partitions the ready queue into multiple separate queues
- Processes are permanently assigned to one queue based on some properties of the process
- Each queue has its own scheduling mechanism
- Scheduling among the queues
  - Generally, fixed-priority preemptive scheduling

<br>

<img width="665" alt="image" src="https://user-images.githubusercontent.com/55765292/230052715-aafd0feb-8a7e-4686-8cb5-d86a7b7e8fff.png">{: .align-center}

<br>

### MFQ(Multi-level Feedback Queue) scheduling

- Can be used without any information on processes
  - Arrival time, burst time, etc
- Multiple ready queues as in MLQ
- Goals of MFQ scheduling
  - **Favor short burst-time processes**
    - **Favor I/O bound processes**
  - **Improved adaptability**
- Feedback
  - The processor usage pattern of the process
  - Multi-level feedback queue
    - Allows processes to move among the ready queues in the system
- Characteristics of MFQ scheduling
  - Dynamic priority
  - Preemptive scheduling
  - Favor short burst-time processes
    -  Favor I/O-bound processes
  - Improved adaptability
  - Effects of SPN, SRTN, and HRRN schemes can be get without any information on the processes

<br>

<img width="847" alt="image" src="https://user-images.githubusercontent.com/55765292/230054548-1f5a4154-7e84-4722-bdb6-985993e4eb31.png">{: .align-center}

<br>

- Scheduling mechanism
  - New process goes into $RQ_0$
  - When a running process dispatched from $RQ_i$ goes to sleep for IO, **it returns back to $RQ_i$** when it wakes up
  - When a running process dispatched from $RQ_i$ is preempted, **it goes to $RQ_{i+1}$**
  - A process dispatched from $RQ_n$ returns to $RQ_n$ in any case

<br>

- Variations of MFQ scheduling
  - Problems of MFQ scheduling
    - High overhead
    - Starvation of the processes at low priority queues
  - Variations of MFQ scheduling

<br>

<img width="735" alt="image" src="https://user-images.githubusercontent.com/55765292/230055818-caf9984d-a5ee-4e6a-a53a-cb0770b1a2cb.png">{: .align-center}

<br>

- Parameters for MFQ scheduling
- The number of queues
- The scheduling algorithm for each queue
- The method used to determine when to upgrade a process to a higher-priority queue
- The method used to determine when to demote a process to a lower-priority queue
- The method used to determine which queue a process will enter when that process needs service

<br>

## Case Studies

- Unix
- Windows OS
- Linux

<br>

### Unix

- Interactive system
  - Priority-based scheduling
- Priority
  - Kernel priority
    - Priority of the processes in kernel mode
    - Interruptible/uninterruptible priority
  - User priority
    - Priority of the processes in user mode
- Clock handler
  - Interrupts processor periodically, when the kernel adjusts the priorities of all processes in the system

<img width="808" alt="image" src="https://user-images.githubusercontent.com/55765292/230057541-509d8209-4087-4e19-88c3-880d317c8390.png">{: .align-center}

<br>

#### Scheduling in Unix Systems

- Scheduling principles
  - Dispatch higher priority process first
  - Priority of the processes
    - Varies as it uses the processor
  - Similar to MFQ algorithm
- Scheduling mechnism
  - Priority adjustment

![image](https://user-images.githubusercontent.com/55765292/231325552-0bda2493-1b9c-40c3-a745-401d2885d227.png)

<br>

![image](https://user-images.githubusercontent.com/55765292/231325681-4d495674-bdf7-49d3-95c2-a611d01fcb6a.png)

<br>

#### Scheduling in Unix Systems : FSS

- FSS
  - Fiar shar scheduling
- Principle
  - Divide the usr community into a set of fair share groups
  - System allocates it CPU time proportionally to each group
- Implementation
  - Each process has a new field in its u-area that points to a fair share CPU usage field, shared by all processes in the fair share group

![image](https://user-images.githubusercontent.com/55765292/231325972-5b04dac8-e116-4425-8c03-28a7367a926d.png)

<br>

### Windows

- Thread scheduling
- Priority-based, preemptive scheduling
- 32-level priority scheme
  - Variable class: 1-15
  - Real-time class: 16-32
- The dispatcher uses a queue for each scheduling priority, and traverses the set of queues from highest to lowest until it finds a thread that is ready to run

<br>

- Priority classes
  - REALTIME_PRIORITY_CLASS
  - HIGH_PRIORITY_CLASS
  - ABOVE_NORMAL_PRIORITY_CLASS
  - NORMAL _PRIORITY_CLASS
  - BELOW_NORMAL _PRIORITY_CLASS
  - IDLE _PRIORITY_CLASS

<br>

- Relative priorities in each class
  - TIME_CRITICAL
  - HIGHEST
  - ABOVE_NORMAL
  - NORMAL
  - BELOW_NORMAL
  - LOWEST
  - IDLE

![image](https://user-images.githubusercontent.com/55765292/231326293-8520e838-f08b-48ab-9cd9-05dfebc25b5d.png)

<br>

- Scheduling scheme
  - When a thread’s time quantum runs out, its priority is lowered (if it is in the variable priority class)
  - When a variable priority thread is released from a wait operation, the dispatcher boosts the priority
    - The boost of amount depends on what the thread was waiting for
      - Keyboard or mouse I/O $\rightarrow$ large increase
      - Disk I/O $\rightarrow$ moderate increase
  - When a process moves into the foreground, the scheduling quantum may be increased by the factor of 3

- Scheduling in Windows 7
  - UMS (User-Mode Scheduling)
    - Allows applications to create and manage threads independently of the kernel (Applications can create and schedule multiple threads without involving the Windows kernel scheduler)
    - More efficient than kernel-mode thread scheduling (Due to no kernel intervention)
    - Schedulers in libraries on top of UMS
      - Eg) ConcRT (Concurrency Runtime)
        - Provides user-mode scheduler with facilities for parallelism
        - Designed for task-based parallelism on multi-core processors

<br>

### Linux

- Up to version 2.4
  - Used a variation of traditional Unix scheduling algorithm
      - Priority-based scheduling and round-robin scheduling
      - Multilevel feedback queue
  - Two problems
    - No adequate support for SMP systems
    - No scalability (in scheduling) for the number of tasks

<br>

- Version 2.4~2.6.22
  - O(n) and O(1) scheduling
  - SMP support
    - Processor affinity
      - Keep a task running on the same processor
      - Avoid the cost of invalidating and repopulating caches
    - Load balancing
  - Fairness
  - Ideal for large server workloads
  - Performed below par on desktop systems with interactive applications

<br>

- Version 2.6.23~
  - Modular scheduler
    - Scheduler classes
      - Enable different, pluggable algorithms to coexist, scheduling their own types of processes
  - CFS(Completely Fair Scheduler)
  - Implementation of a well-studied, classic scheduling algorithm, called **fair queuing(fair scheduling)**
    - Uses red-black trees
  - Improvement in interactive performance of the scheduler
  - O(logN) scheduling
    - N: number of tasks in the runqueue (red-black tree)

<br>

#### Linux scheduler

- I/O-bound processes vs CPU-bound processes
  - Tries to optimize process response (thus favoring I/O-bound processes) in a creative manner that does not neglect CPU-bound processes
- Preemptive priority-based scheduling
  - Numerically lower values indicate higher priorities
- Two separate priority ranges
  - Real-time range: 0-99
  - Nice value range: 100-139

<br>

-Scheduler classes
  -A specific priority for each class
  -Different scheduling algorithm for each scheduler class
  -Typical two scheduling classes
    - Default scheduling class
      - CFS scheduling algorithm
    - Real-time scheduling class
      - Another algorithm
  -New scheduling classes can be added

<br>

- Priority ranges
  - Real-time range
    - 0~99
    - SCHED_FIFO, SCHED_RR
  - Non-real-time (Nice value) range
    - 100~139
    - SCHED_OTHER

![image](https://user-images.githubusercontent.com/55765292/231327366-4f19bc5d-e907-456b-8533-46018a1670c0.png)

<br>

- Real-time scheduling as defined by POSIX.1b
- Priority assignment
  - Real-time tasks
    - Assigned static priorities
  - All other tasks
    - Assigned dynamic priorities based on their nice values plus/minus the value 5
    - Adjustment of [-5,+5] is determined by the interactivity of the task
    - Longer sleep time → more I/O-bound → more interactive

<br>

- Scheduling data structures
- Each processor maintains its own **runqueue** data structure and schedules itself independently

![image](https://user-images.githubusercontent.com/55765292/231327561-1b4f545e-a345-4160-9e08-fe881e686fff.png)

<br>

### Multiple Procsseer Scheduling

- Issues for multicore architecture
  - Multicore processors
    - Multiple processor cores on the same physical chip
    - Each core has a register set
      - Appears to the OS to be a separate physical processor
  - Scheduling for multithreaded multicore processor
    - 2 steps
      - Assignments of threads for each core
      - Selection of a thread to run on each core
  - Issues
    - Processor affinity
    - Load balancing

<br>

#### Issues

- Processor affinity
  - Avoid migration of processes from one processor to another and attempt to keep a process on the same processor
    - To reduce the cost of invalidating and repopulating caches
  - Soft affinity
    - Attempts to keep a process on the same processor, but does not guarantee it
  - Hard affinity
    - No migration of processes
    - Linux has system calls that support hard affinity
- Load balancing
  - Attempts to keep the workload evenly distributed across all processors in the system
  - Push migration
    - A specific task that monitors the load on each processor
    - When it finds imbalance
      - Evenly distributes the load by moving (pushing) processes from overloaded to underloaded processors
  - Pull migration
    - Idle processor pulls a waiting processes from a busy processors
  - Usually push and pull migration schemes are used in parallel on load-balancing systems
    - [ex] Linux scheduler
      - Push migration every 200ms
      - Pull migration whenever **runqueue** for a processor is empty

<br>

### Real-time Scheduling

- Priority-based scheduling
- RM(Rate-Monotonic) scheduling
  - Static priority
- EDF(Earliest-Deadline-First) scheduling
  - Dynamic priority

<br>

## Summary

- Process scheduling
  - Goals of process scheduling
  - Scheduling level
  - Scheduling criteria
- Scheduling algorithms
- Case study
  - Unix, Windows OS, Linux
- Multicore processor scheduling & Real-time scheduling
