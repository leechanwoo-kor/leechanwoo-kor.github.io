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

...

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

...

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

<img width="808" alt="image" src="https://user-images.githubusercontent.com/55765292/230057541-509d8209-4087-4e19-88c3-880d317c8390.png">{: .align-center}

<br>

### Windows

<br>

### Linux

<br>

### Multiple Procsseer Scheduling

<br>

## Summary





