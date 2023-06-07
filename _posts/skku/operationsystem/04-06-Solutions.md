## [Quiz-04]

### 1. The run-time mapping from logical to physical addresses is done by a hardware device called the (          ).
- MMU(Memory Management Unit)

### 2. (          ) libraries are system libraries that are linked to user programs during running the programs.
- Dynamic linking

### 3. What kind of fragmentations occur in the system that adopts VPM(Variable Partition Multiprogramming) memory management?
- External fragmentation

### 4. Assuming a 4 KBytes (4,096 Bytes) page size, what are the page number and offset for the address 9,000?
- (2, 808)

### 5. Given 6 available memory partitions of 400KB, 600KB, 350KB, 200KB, 750KB, and 300KB (in order), where the process of size 280KB would be placed with the worst-fit placement algorithm?
- 750KB partition


## [Quiz-05]

### 1. In demand paging system, access to a page that is not brought into memory or marked invalid causes a/an (          ). The paging hardware, in translating the address through the page table, causes a trap to the operating system, resulting in the context switch of the running process.
- page fault

### 2. Consider a demand paging system with the average page-fault service time of 8ms and memory access time 80ns. Assuming that the page fault rate is 0.001, what is the approximate effective access time to a page in the system?
- 8,080ns

### 3. Which property the following statement describes on a running program in computer systems?
#### If at one point a particular memory location is referenced, then it is likely that the same location will be referenced again in the near future.
- Temporal locality

### 4. Assume a 32-bit virtual address of a demand paging system with 4KB page. What is the maximum number of entries in the page table of each process?
- 2^20

### 5. Assume the page 2 of a process P is located at the page frame 8 and the page 3 at page frame 4 in a system that uses paging with 1024 byte page. What is the corresponding real address of the virtual address 3000. (Remind that the page and page frame number starts from 0.)
- Answer = (     9144     )   // 3000-2048 = 952; So, (2,952) -> (8,952); 8192+952 = 9144


## [Quiz-06]

### 1. Which of the following schemes is not necessary in demand paging systems?
- Placement strategies

### 2. (          ) occurs when a computer's virtual memory resources are overused, leading to a constant state of paging and page faults, inhibiting most application-level processing. This causes the performance of the computer to degrade or collapse.
- Thrashing

### 3. Which of the following replacement algorithms does not exploit locality in virtual memory systems?
- FIFO

### 4. It is impossible or difficult to implement (          ) replacement algorithm, because it requires future knowledge of the reference string.
- MIN

### 5. Consider the following reference string w. Assuming 3 page frames allocated (initially empty), how many page faults occur during processing the reference string w with LRU replacement scheme?
#### w = 1234563456789789789
- Answer = (     13     )
