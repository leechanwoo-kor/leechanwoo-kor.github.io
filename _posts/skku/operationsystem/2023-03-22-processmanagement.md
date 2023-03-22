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

<img width="266" alt="image" src="https://user-images.githubusercontent.com/55765292/225283045-fd197bcf-25f4-42d7-a636-086f7f615683.png">{: .align-center}

<br>

## Process States

- Process states
  - Determined by the process-resource interaction states

<br>

<img width="860" alt="image" src="https://user-images.githubusercontent.com/55765292/226861784-bfe695c8-97b4-4550-a24e-b07d6450865f.png">{: .align-center}

<br>

<img width="892" alt="image" src="https://user-images.githubusercontent.com/55765292/226861946-c38586ef-73b8-4999-8cfc-90a5481279af.png">{: .align-center}

<br>

### Created state

- User’s job/command request is registered to the kernel
- PCB allocated
- New process is being created
- Transient state
- Kernel
  - Check available memory space
  - Transit the process to ready or suspended ready state
- Process creation in Unix system
  - By **fork()** system call
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
  - System call = SVC (SuperVisor Call)
    - Kernel provides application processes with system call I/F so that they can request resources
- Wakeup
  - Transition from asleep state to ready state
  - Due to allocation of resources or occurrence of events
    - Immediate transition from asleep state to running state is not allowed. Why?

<br>

### Suspended state

- Suspended ready state
  - Swapped out of memory from ready state
  - Memory image is transferred to swap device, which is a special file system
- Suspended asleep state
  - Swapped out of memory from asleep state
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

### Process States in Linux

<img width="833" alt="image" src="https://user-images.githubusercontent.com/55765292/226867912-af1f47d0-045f-4b5b-9370-970e180b0216.png">{: .align-center}

<br>

## Scheduling Queues

<br>

### Ready queue

- Processes in ready state
  - Requesting processor, all other resources allocated
- Ready queue (ready list)
- Process scheduling
  - Selecting a process from the ready list and dispatch it when the processor is available

<img width="745" alt="image" src="https://user-images.githubusercontent.com/55765292/226869525-ef6318c9-cdd9-46e8-b1e3-b17da756f50d.png">{: .align-center}

<br>

### I/O queue

- Processes in asleep state
  - Each requesting different resources
- Block list (block queue, I/O queue)
  - Separate list for each resource

<img width="721" alt="image" src="https://user-images.githubusercontent.com/55765292/226869726-e2eab3d8-dc52-4f6e-a366-0b8d61072de1.png">{: .align-center}

<br>

## Schedulers

<br>

### Classification of schedulers

- Long-term scheduler (job scheduler)
  - Controls the **multiprogramming degree**
  - Selects a good **process mix**
    - I/O-bound processes and CPU-bound processes
  - Not used on some systems
- Medium-term scheduler
  - **Swapping**
- Short-term scheduler (process scheduler)
  - Considers several performance indices such as throughput and response time

<img width="908" alt="image" src="https://user-images.githubusercontent.com/55765292/226870476-809e2350-8df6-486e-a75e-69b73b0f3c8d.png">{: .align-center}

<br>

## Interrupts

- Interrupt
  - Unexpected (external) event
- Kinds of interrupts
  - I/O interrupt
  - Clock interrupt
  - Console interrupt
  - Machine check interrupt
  - Inter-process communication interrupt
  - Etc

<br>

### Interrupt handling

- Interrupt hadling process

<img width="678" alt="image" src="https://user-images.githubusercontent.com/55765292/226871848-a261526c-ee8b-4272-89b3-3828955747b5.png">{: .align-center}

<br>

<img width="847" alt="image" src="https://user-images.githubusercontent.com/55765292/226872417-19f72e1b-6655-4b7d-beff-88024bd85013.png">{: .align-center}

- Interrupt > Context saving > Interrupt handling > Interrupt service > Context restoring

<br>

### Interrupts and Traps

- System Calls, Interrupts, and Exceptions

<img width="796" alt="image" src="https://user-images.githubusercontent.com/55765292/226872746-27f65a1e-524c-48d3-9ff3-f9061c6d1cdc.png">{: .align-center}

<br>

## Context Switching

<br>

### Context

- Set of information related to a process
  - User-level context
  - System-level context
  - Register context

<br>

### Context switching

- Context saving
  - Saving the register context of a process when the process releases processor
- Context restoring
  - Reloading the register context of a process to continue execution
- Context switching
  - Saving the context of a process and restoring the context of another process

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
- Context save area
  - Space for saving register context of the process

<br>

### Context switch time

- Pure overhead
- Highly dependent on hardware support
  - Some processors provide multiple sets of registers
    - Context switch by changing the pointer to the current register set
    - Sun UltraSPARC

<br>

- $P_A$ running > **interrupt** > [ Context saving > IH > ISR > Scheduling > Context restoring ] > $P_B$ running

<br>

<br>

<br>

# IPC (Inter-Process Communication)

<br>

- Reasons for process cooperation
  - Information sharing
  - Computation speedup
  - Modularity
  - Convenience
- Schemes
  - **Message passing** and **shared memory**
  - In distributed systems
    - Message passing
    - RPC(Remote Procedure Call)
    - DSM(Distributed Shared Memory)

<br>

## Message Passing

<br> 

- Primitives
  - Direct/indirect communication
    - send(P, message), receive(Q, message)
    - send(mailbox, message), receive(mailbox, message)
- Issues
  - Synchronization mechanism
  - Blocking/non-blocking send/receive
  - Buffering mechanism
  - Etc

<br>

<img width="432" alt="image" src="https://user-images.githubusercontent.com/55765292/226877757-96203dfc-d32e-4505-b088-4889caa7b509.png">{: .align-center}

<br>

## Shared Memory

- Primitives
  - Indirect communication
    - read(buf, message), write(message, buf)

<br>

<img width="731" alt="image" src="https://user-images.githubusercontent.com/55765292/226878259-4e973394-ed5d-400d-9cb5-69c808e5855f.png">{: .align-center}

<br>

### RPC (Remote Procedure Call)

- A way to abstract the procedure call mechanism for use between systems with network connections
  - Allows a client to invoke a procedure on a remote host as it would invoke a procedure locally
  - Hides the communication-level details
- Usually built on top of the message passing framework
- Terminologies
  - Client stub, server stub
  - Marshalling, unmarshalling
  - Matchmaker (rendezvous)
  - XDR(eXternal Data Representation)

<br>

<img width="801" alt="image" src="https://user-images.githubusercontent.com/55765292/226879858-cde86724-4727-4ee4-aeb8-4c0c7e95f685.png">{: .align-center}

<br>

### RMI (Remote Method Invocation)

- Java feature similar to RPC
  - Object-based
  - Allows a thread to invoke a method on a remote object
- Built on JVM
- Terminologies
  - Stub, skeleton
  - Parcel

<br>

### LRPC (Lightweight RPC)

- Supports communication between two processes on the same machine
- Similar to standard RPC
  - Optimized for local communications

<br>

### DSM (Distributed Shared Memory)

- Also called DSVM(Distributed Shared Virtual Memory)
- A shared-memory paradigm applied to loosely-coupled distributed memory systems
  - An abstraction that integrates the local memory of different machines in a network environment into a single logical entity shared by cooperating processes executing on multiple hosts
    - A software layer on top of the message-passing communication system to provide a shared-memory abstraction to the programmers (in loosely-coupled distributed systems)
  - Can be implemented either in the OS kernel or in runtime library routines with proper system kernel support

<br>

<img width="872" alt="image" src="https://user-images.githubusercontent.com/55765292/226881430-d41f5ad3-9ceb-428d-ad88-f494136535ec.png">{: .align-center}

<br>

## Summary

- Process concept
  - An entity that is registered to the kernel
  - Can request/allocate/release resources in the system
- Process state transition
- PCB
  - Area for maintaining information about each process
- Scheduling queues and schedulers
- Interrupt, context saving, context switching
- Inter-process communication
  - Message passing, RPC/RMI/LPC
  - Shared memory
