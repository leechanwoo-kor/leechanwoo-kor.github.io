---
title: "[Data Structures & Algorithms] Stack"
categories:
  - Data Structure
  - Algorithm
tags:
  - Stack
toc: true
toc_sticky: true
toc_label: "Stack"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222598023-0eced08e-a03a-4366-a388-c9e2b218127b.png)

<br>

# Stack

- list의 양 쪽 끝을 각각 **top**과 **bottom**이 가리키는 구조
- 모든 insertion과 deletion이 모두 **top**에서만 발생
  (참고: Array와의 차이점은?)
- bottom 값은 일정하고, **top** 값은 grow하고 shrink함.
- top을 제외한 다른 item들은 접근할 수 없음.
- 어느 item이 먼저 remove되는지?
  : **LIFO (Last-In First-Out)**

<br>

<img width="951" alt="image" src="https://user-images.githubusercontent.com/55765292/227168733-7e84a245-bd73-4d6e-88c0-39a6d573bd7e.png">{: .align-center}

<br>

## Stack의 구현

<br>

### Array 사용

- 1차원 array를 이용하여 다음과 같이 선언.


data type stack[Max_Stack_Size]
예: char stack[20],
int stack[50], . .

- 여기서 data type은 int, real, char, ... 등 중 모두 선택 가능하며, Max_Stack_Size는 stack의 최대 사용 공간을 의미.
- top이라고 명명된 1 개의 variable를 이용.
- 최초에 항상 top을 -1로 초기화하고, 이는 stack이 empty 상태임을 나타냄.

<br>

### Push and Pop

- PUSH : Insert an item into a stack.

Push(int top, char X)
if (top >= Max_Stack_Size - 1)
return stack-full( );
top = top + 1; /increase top by 1/
stack [top] = X

- POP : Delete an item from a stack.

Pop(int top)
if (top == – 1) return stack-empty();
X = stack [top]
top = top – 1; /decrease top by 1/

- 참고: 반드시 stack full 과 stack empty 조건을 명시 요함 아니면 overflow와 underflow 오류 각각 발생

<br>

- 예 : Push(A), Push(B), Push(C), Pop, Pop, Push(D), Pop.

<br>

<img width="951" alt="image" src="https://user-images.githubusercontent.com/55765292/227170837-39b8c9b7-9fcb-44a2-98de-f130c95559b4.png">{: .align-center}

<br>

- PUSH와 POP 연산 모두 Data shift 현상이 발생하지 않음;
  - 시간 성능: O(1); 매우 효율적!
- 가장 최근에 삽입된 데이터가 먼저 삭제되는 LIFO(Last In First Out) 특성을 가짐. 즉 삽입되는 순서와 역순으로 삭제가 실행됨.

<br>

### Stack의 응용들

- Evaluation of Expressions
- Maze Problem
- Parsing (Pattern Matching)
- Function Calls/Returns, 예 : Recursions
- Queens Problem
- Backtracking

<br>

### 산술 표현의 계산

- 산술 표현(arithmetic expression)은 다음 2 가지로 구성됨.
  - 피연산자(operand) : a, b, c, ..., x, y, z
  - 연산자(operator) : +, -, \*, \*\*(지수), (, ), ...
- 다음의 산술 표현들은 어떤 방식으로 계산할까?
  - 예 : a * b + c
  - 예 : a + b * c
  - 예 : a * (b + c)
  - 예 : a / b** + c + ((d - e) * a) + c)
- 고려 사항 : 어느 연산자부터 먼저 계산할까?

<br>

- (일반적인 방식) : 인간 방식
  - (1) 각 operator에 연산의 우선순위(priority)를 부여
  - (2) 괄호화(parenthesis) 함
  - (3) 안쪽 괄호부터 바깥 쪽으로 차례로 계산.
  - 단점 : 이 방식은 비효율적임; Nested loop으로 해결.
- 다른 방식 : Compiler 방식
  - (1) Translation : Infix를 Postfix로 변환
  - (2) Evaluation : Postfix를 계산 수행
  - 장점 : 효율적임. 괄호화가 필요 없음. Single loop들로 해결.

<br>

### Operator의 우선 순위 : C 언어

<img width="740" alt="image" src="https://user-images.githubusercontent.com/55765292/227172781-66824420-8adc-4263-888b-78477a8c06f8.png">{: .align-center}

<br>

## 산술 표현의 3가지 방법

- (1) Infix (중위) 표현
  - Operator가 operand들 가운데에 위치
  - 즉, (opnd1) (optr) (opnd2)
- (2) Postfix (후위) 표현
  - Operator가 operand들 뒤에 위치
  - 즉, (opnd1) (opnd2) (optr)
- (3) Prefix (전위) 표현
  - Operator가 operand들 앞에 위치
  - 즉, (optr) (opnd1) (opnd2)
- 예:

<img width="514" alt="image" src="https://user-images.githubusercontent.com/55765292/227173291-7cdfc07c-0424-406c-9e2d-63a96d03cbcd.png">{: .align-center}


<br>

- 참고 : Postfix와 Prefix는 “괄호” 연산자를 사용하지 않음.

<br>

### Evaluation of Postfix

- 기본 원리
  - Postfix의 특성상, operator가 계산에 필요로 하는 (보통 2 개) operand들은 항상 연산자 앞에 위치함.
  - 이러한 operand 값들을 저장하기 위해 **stack**이 필요함.
- Algorithm
  - (1) Postfix를 left에서 right로 scan. (Just once!)
  - (2) If a symbol **X** is **operand**, **push** it to the stack Otherwise (i.e., **X** is **operator**)
    - 1) **pop** operands (for X) from the stack
    - 2) **perform** the specified operation
    - 3) **push** the result back on the stack

<br>

- 예 : 6 2 / 3 - 4 2 * + eos
  (단, eos는 이 수식의 끝을 나타내는 특수문자)

<img width="903" alt="image" src="https://user-images.githubusercontent.com/55765292/227174966-541c8697-d8af-41d0-9076-b3c91bb7da78.png">{: .align-center}

- eos를 만나면 pop을 한 후 출력. 이때 결산 결과(8)는 항상 stack의 top에 존재함. 

<br>

- 예 : 5 1 2 + 4 * + 3 - eos 참고: Infix는 5 + ((1 + 2) * 4) − 3
  (단, eos는 이 수식의 끝을 나타내는 특수문자)

<img width="665" alt="image" src="https://user-images.githubusercontent.com/55765292/227175149-e9ce3797-c4dd-462f-900c-75eae0674c45.png">

- eos를 만나면 pop을 한 후 출력. 이때 결산 결과는 항상 stack의 top에 존재함. 

<br>

### Translate : Infix to Postfix

- 일반적인 방식 : 괄호화 방식
  - (1) Infix 표현을 operator들의 priority 순서대로 괄호화 함.
  - (2) 괄호 안의 각 operator들을 이에 해당되는 오른 쪽 괄호의 뒤로 모두 이동
  - (3) 모든 괄호들을 삭제함.
- 예: a / b – c + d * e – a * c
  - 괄호화 : ((((a / b) – c) + (d * e)) – (a * c))
  - 이동 : ((((a b) / c) – (d e) *) + (a c) *) –
  - 삭제: a b / c – d e * + a c * –
- 참고: 위의 방식은 2 개의 pass를 요함. Not efficient!

<br>

- 다른 방식 : (기본 원리)
  - Operand 들은 그 순서가 바뀌지 않음.
  - Operator 들만 priority에 의거하여 그 순서가 바뀜.
  - Operator들의 priority를 저장하기 위해 **stack**을 사용.
- Algorithm
  - (1) Scan left to right; (Just once!)
  - (2) If a symbol **X** is **operand**, print(**X**) Otherwise (i.e., **X** is **operator**)
    - a) Compare priority of **X** with priority of operator (at top) in stack
    - b) Decide if we
      - push **X** into stack, or
      - pop operators from stack

<br>

- How to decide?: Pop or Push

<img width="665" alt="image" src="https://user-images.githubusercontent.com/55765292/227176766-f1ae6c09-cf6c-4a3d-a896-58d3c3bb5c22.png">{: .align-center}

<br>

- Two Cases;
  - Case 1 : If **ISP**[stack[top]] < **ICP[X]**, then Push (**X**)
  - Case 2 : If **ISP**[stack[top]] >= **ICP[X]**, then
    - 1) Pop (top) and Print it
    - 2) Push (**X**)

<br>

- 예 : a + b * c **eos**

<img width="704" alt="image" src="https://user-images.githubusercontent.com/55765292/227177122-6f0ac1b6-eccc-47cc-8f8f-46c4b2ef69cc.png">

Since * (input) is higher than + (in stack), we push *.

- 예 : a * b + c **eos**

![Uploading image.png…]()

Since + (input) is lower than * (in stack), we pop *.

<br>

◆ 예 : a * b / c eos

<br>

### Not Yet! 괄호가 있는 경우는?
◆ 괄호의 개념
▪ 경우에 따라 사용자는 괄호를 사용할 수 있음.
▪ 괄호는 가장 priority가 높은 연산자임.
▪ 왼쪽 괄호 ( 는 연산의 시작, 오른 쪽 괄호 ) 는 끝을 의미.
▪ 괄호가 있으면 계산 과정이 복잡해 짐.
▪ 모든 괄호들을 postfix로 전환하는 과정에서 소거해야 함.
예 : a * (b + c) * d 를 postfix로 바꾼 결과는?
◆ 괄호의 처리 과정 :
▪ X 가 왼쪽 괄호인 경우 : Push
▪ X 가 오른 쪽 괄호인 경우 :
Stack에서 (이 오른 쪽 괄호와 match되는) 왼쪽 괄호를
만날 때 까지 모든 operator들을 pop하여 차례로 출력.
(단, 이 왼쪽 괄호만 출력 금지)
