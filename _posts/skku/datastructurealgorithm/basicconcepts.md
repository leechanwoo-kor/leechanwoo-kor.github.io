---
title: "[Data Structures & Algorithms] Basic Concepts"
categories:
  - Data Structure
  - Algorithm
tags:
  - Data Structure
  - Algorithm
toc: true
toc_sticky: true
toc_label: "Basic Concepts"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222598023-0eced08e-a03a-4366-a388-c9e2b218127b.png)

<br>

# Basic Concepts

<br>

## Concepts: Algorithm

- Algorithm 정의
  - Algorithm is a step-by-step procedure for solving a problem in a finite amount of time. It consists of :
    - instructions
    - input data
    - output data

- Algorithm 표현
  - Programming language (C, Java, Python...)
  - Pseudo Code
    - High-level Description
    - Hides algorithm implementations

<br>

### Example: GCD Algorithm
- Problem: Compute Greatest Common Divisor
- Input: integer L, S
- Output: GCD of (L, S)
- Method: Euclid Algorithm

![image](https://user-images.githubusercontent.com/55765292/222598402-8ac557d9-502c-4cbd-b820-3f2e9b07ae23.png){: .align-center}

- Test: GCD(36, 24)=?, GCD(1989, 1590)=?, GCD(84687624, 38742620)=?


<br>

### Examples: Searching Algorithm
- Problem:Find value X among randomly stored values.
- Input: n integers in array A[0..n-1]
- Output: Value X in A[0..n-1]
- Method: Linear Search

![image](https://user-images.githubusercontent.com/55765292/222598875-c9dcce6d-487b-404e-91df-b948a8058864.png){: .align-center}

<br>

### Examples: Find Max Algorithm
- Problem:Find the maximum value
- Input: n integers in array A[0..n-1]
- Output: Maximum value of A[0..n-1]
- Method: Naïve Algorithm

![image](https://user-images.githubusercontent.com/55765292/222599107-7ed3a62d-f0cc-41fe-89e6-1d2f9a2c83e4.png){: .align-center}

<br>

### Example: Sorting Algorithm
- Problem: Sorting integers
- Input: n unsorted integers in array A[0..n-1]
- Output: n sorted integers in array A[0..n-1]
- Method: Selection Sort

![image](https://user-images.githubusercontent.com/55765292/222599378-a7db16c2-7969-45d1-ba14-5bdfd14ae14e.png){: .align-center}

<br>

## Concepts: Data Structures
- Data Structure
  - How do we store (input/output) data in computer?
  - We need to organize data in memory efficiently.
    - 예: Matrix를 memory에 어떻게 저장?
    - 예: Road map을 memory에 어떻게 저장?
  - Every algorithm uses some collections of data structures.
- Two typical types
  - Linear types: Stored in linear order
    - 예: Array, Linked Lists, Stacks, Queues
  - Non-Linear Types: Stored in non-linear order
    - 예: Trees, Graphs

![image](https://user-images.githubusercontent.com/55765292/222599531-6d0fec46-2999-4d09-9a5f-03fb3aba5442.png){: .align-center}

<br>

## What is Performance Analysis?

- Performance Analysis
  - Space Complexity 분석
    - the amount of memory space used by the algorithm
  - Time Complexity 분석
    - the amount of computer time used by the algorithm
- Typically, the more (less) space, the less (more) time.
  - Thus, sometimes we need to trade off space vs. time.

<br>

### Space complexity

- Find a total sum of n numbers; Space = ?

<img width="499" alt="image" src="https://user-images.githubusercontent.com/55765292/223981808-4e0f1ca1-4d12-4151-a9c7-25f442cf6023.png">{: .align-center}

- Addition of two n x n matrices; Space = ?
- Road map connecting n cities; Space = ?

<br>

### Time Complexity

```
int sum = 0;
for (i = 1; i <= 1000000; i++) do
sum = sum + i ;
return sum
```

- What is time complexity?
  - Theoretical Speed: $10^6$ additions
  - Practical Speed: 10 milli-sec
- Which criteria is more reasonable?
  - “Theoretical” speed gives better criteria. Why?

<br>

- Time Complexity Criteria
  - Theoretical Speed
    - the **number of operations** by performed by algorithm.
    - Examples of operations: Arithmetic(+, -, ..), Compare, Swap, Visit, . etc., 
  - Practical Speed
    - the **execution time** performed by algorithm. (by using computer)

- Why “theoretical” speed is reasonable?
  - Free of implementation(coding)
  - Independent of H/W (computer performances)
  - Independent of S/W (programming languages, compilers, . .)
  - Provide constant values regardless of environments

- The running time of an algorithm typically grows with the input size n.
- Algorithm의 time 분석 결과는 input size(n)에 대한 식
  (예: f(n), g(n) . . 등)으로 표현 됨.
- 다음은 time 분석에서 발생하는 전형적인 패턴들
  - Linear Loops
  - Logarithmic Loops
  - Square Loops
  - Cubic Loops
  - Logarithmic Linear Loops

<br>

### Linear Loops

- Time is proportional to n.

  - f(n) = n

```
for (i = 1; i <= n; i++)
{
  // application code
}
```

<br>

  - f(n) = n/2

```
for (i = 1; i <= n; i += 2)
{
// application code
}
```

<br>

### Logarithmic Loops

- Multiply

```
for (i = 1; i <= n; i *= 2)
{
  // application code
}
```

$2^{k-1}$ <= n
k = f(n) = $log_2n + 1$ ≈ $log_2n$


- Divide

```
for (i = n; i >= 1; i /= 2)
{
  // application code
}
```


$n/2^{k-1}$ >= 1
k = f(n) = $log_2n + 1 ≈ log_2n$

<br>

### Nested Loops

- Square

```
for (i = 1; i <= n; i++)
  for (j = 1; j <= n; j++)
  {
    // application code
  }
```

f(n) = $n^2$

- Cubic

```

for (i = 1; i <= n; i++)
  for (j = 1; j <= n; j++)
    for (k = 1; k <= n; k++)
    {
      // application code
    }
 ```
 
 f(n) = $n^3$

<br>

- Dependent Square

```
for (i = 1; i <= n; i++)
  for (j = 1; j <= i; j++)
  {
  // application code
  }
```

f(n) = n(n+1)/2

- Logarithmic Linear

```
for (i = 1; i <= n; i++)
  for (j = 1; j <= n; j *= 2)
  {
    // application code
  }
```

f(n) = $nlog_2n$

<br>

### Worst Case/Average Case

- Average Case
  - Input data의 여러 형태를 모두 고려
  - Expected (average) 실행 시간 값을 제공
  - 일반적으로 확률이 요구되므로 계산하기 복잡함
- Worst Case
  - Input data의 형태가 최악인 것을 고려
  - Upper bound (longest time) 실행 시간 값을 제공
  - 최악인 input data만 고려하므로 계산하기 간단함
  - Worst case에 더 나은 성능을 갖는 알고리즘의 개발은 중요함
    - 예: air traffic, weapon system
  - (언급이 없는 한) worst case 분석에 비중을 둠

<br>

- 다음 문제의 Worst와 Average case를 각각 분석하라
  - Random 상태의 n 개의 input data에서 X를 찾는 문제
  - n 개의 input data는 list라는 이름의 array에 저장되었다고 가정.
  - Linear Search 알고리즘을 이용
  - 비교(comparison) 연산이 몇 번 수행되는지를 count함
- Average Case : A(n)
  - q : X가 list에 있을 확률
  - T(i) : X가 list의 i 번째 위치에 있을 때 비교 회수
  - X가 list에 있는 경우와 없는 경우를 고려
    - A(n) = (q/n) · (1 + 2 + . . . + n) + (1 – q) · n = (q/2) · (n + 1) + (1 - q) · n
  - 예: q = 1; ?, q = 1/2; ?, q = 0; ?
- Worst Case : W(n)
  - X가 list의 맨 끝에 있거나 혹은 없는 경우
  - W(n) = n

<br>

### Comparing Time Complexities

- 주어진 문제에 대해 이를 해결하는 algorithm들은 여러 개가 존재.
- 이러한 알고리즘들의 time 성능을 서로 비교하여 더 빠른 것을 식별하는 것이 매우 중요
- 여기서 time 성능 비교의 criteria는 무엇인가?

<img width="503" alt="image" src="https://user-images.githubusercontent.com/55765292/223989129-c3646510-308c-492d-ad88-cb75912089bf.png">{: .align-center}

problem
- Question: Which algorithm is faster?
  - 1) When n is small(say, n < 100), ??
  - 2) When n is large (say, n > 100), ??

### Big-Oh (O) 의 정의
- Given functions f(n) and g(n), we say that f(n) = O(g(n)).<br>
  if there are positive constants c and $n_0$ such that<br>
  f(n) ≤ c·g(n) for all n ≥ $n_0$
   
<img width="761" alt="image" src="https://user-images.githubusercontent.com/55765292/223990129-e099dd0d-e3b5-4a8a-8622-093a9e726487.png">: .align-center}

- c는 H/W 혹은 S/W 환경 변화에 따른 값이며, c의 값이 바뀌어도 growth rate에는 영향을 미치지 않음.
- n의 값이 임계 값 n0 이상이 되면 (즉 input size가 계속 커질수록) g(n)이 항상 f(n) 보다 크다.

<br>

연습 : Big Oh(O) Notation

If we want show f(n) is O(g(n)); we only need to find one pair (c, $n_0$).
- 예 1: 100n = O($n^2$)
  - We need c and $n_0$ such that 100n ≤ c·n2
  - Pick c = 1 and n0 = 100
◆ 예 2: 7n – 2 = O(n)
▪ We need c and n0 such that 7n – 2 ≤ c·n for n ≥ n0
▪ Pick c = 7 and n0 = 1
◆ 예 3: 3n
3 + 20n2 + 5 = O(n3
)
▪ We need c and n0 such that 3n
3 + 20n2 + 5 ≤ c·n3
for n ≥ n0
▪ Pick c = 4 and n0 = 21
◆ 예 4: 3n
2 = O(100n) 은 성립 안 함.
▪ 3n
3 ≤ c·100n for n ≥ n0 을 만족하는 c 와 n0 값이 존재하지 않음.
