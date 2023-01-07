---
title: "[Python] 제너레이터(Generator)" 
categories:
  - Python
tags:
  - Generator
toc: true
toc_sticky: true
toc_label: "제너레이터(Generator)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/210788377-2257ff8e-33e7-44de-b530-ea6583fd2a74.png)

# 제너레이터(Generator)

메모리를 압도할 정도로 큰 데이터 세트로 작업을 해야하거나 호출될 때마다 내부 상태를 유지해야 하는 복잡한 함수를 가지고 있는 경우가 있습니다. 그러나 함수가 너무 작아서 자신의 클래스를 만들 수 없거나 그 이상의 경우에 제너레이터와 파이썬의 yield문이 도움이 됩니다.

## 제너레이터 사용

[PEP 255](https://peps.python.org/pep-0255/)에 도입된 제너레이터 함수는 [lazy iterator](https://en.wikipedia.org/wiki/Lazy_evaluation)를 반환하는 특수한 종류의 함수입니다. 리스트처럼 반복할 수 있는 개체입니다. 그러나 리스트와 달리 lazy iterator는 내용을 메모리에 저장하지 않습니다.

이제 제너레이터가 무엇을 하는지 대략적으로 알게 되었으니, 두 가지 예를 통해서 살펴보겠습니다. 첫 번째로, 제너레이터가 어떻게 작동하는지 조감도에서 볼 것입니다. 그런 다음 각 예제를 통해 자세히 살펴보겠습니다.

### Example 1: Reading Large Files

제너레이터의 일반적인 사용 사례는 데이터 스트림 또는 CSV 파일과 같은 큰 파일로 작업하는 것입니다. 이러한 텍스트 파일은 쉼표를 사용하여 데이터를 열로 구분합니다. 이 형식은 데이터를 공유하는 일반적인 방법입니다. 이제 CSV 파일의 행 수를 계산하려면 어떻게 해야 할까요? 아래의 코드 블록은 이러한 행을 세는 한 가지 방법을 보여줍니다.

```Python
csv_gen = csv_reader("some_csv.txt")
row_count = 0

for row in csv_gen:
    row_count += 1
    
print(f"Row count is {row_count}")
```

이 예에서는 `csv_gen`이 리스트가 될 것으로 예상할 수 있습니다. 이 리스트를 채우려면 csv_reader()가 파일을 열고 해당 내용을 `csv_gen`에 로드합니다. 그런 다음 프로그램은 리스트에서 반복하고 각 행에대해 `row_count`를 증가시킵니다.

이것은 합리적인 설명이지만, 파일이 매우 크다면 이 디자인이 여전히 작동할까요? 파일이 사용 가능한 메모리보다 크면 어떻게 해야할까요? 이 질문에 답하기 위해 csv_reader()가 파일을 열고 배열로 읽는다고 가정합니다.

```
def csv_reader(file_name):
    file = open(file_name)
    result = file.read().split("\n")
    return result
```

이 함수는 지정된 파일을 열고 `.read()`와 `.split()`을 사용하여 각 행을 별도의 요소로 리스트에 추가합니다. 더 위에서 본 행 계산 코드 블록에서 이 버전의 `csv_reader()`를 사용하면 다음과 같은 출력을 얻을 수 있습니다.

```Python
Traceback (most recent call last):
  File "ex1_naive.py", line 22, in <module>
    main()
  File "ex1_naive.py", line 13, in main
    csv_gen = csv_reader("file.txt")
  File "ex1_naive.py", line 6, in csv_reader
    result = file.read().split("\n")
MemoryError
```

이 경우에 `open()`은 한 줄씩 느리게 반복할 수 있는 제너레이터 개체를 반환합니다. 그러나 `file.read().split()`은 모든 것을 한 번에 메모리에 로드하므로 메모리 오류가 발생합니다.

이 작업을 수행하기 전에 컴퓨터 속도가 느려지는 것을 볼 수 있습니다. 키보드로 프로그램을 종료해야 할 수도 있습니다. 그렇다면, 어떻게 이 거대한 데이터 파일을 처리할 수 있을까요? `csv_reader()`의 새로운 정의를 살펴보겠습니다.

```Python
def csv_reader(file_name)
    for row in open(file_name, "r"):
        yield row
```

이 버전에서는 파일을 열고 파일을 반복한 후 행을 생성합니다. 이 코드는 메모리 오류 없이 다음과 같은 출력을 생성합니다.

```Shell
Row count is 64186394
```

여기서 무슨 일이 일어나는 걸까요? 먼저 본질적으로 `csv_reader()`를 제너레이터 함수로 바꾸었습니다. 이 버전은 파일을 여는 대신 각 줄을 반복하고 각 행을 반환합니다.

또한 **리스트 컴프리헨션(list comprehension)** 와 매우 유사한 구문을 가진 **제너레이터 식generator expression(generator comprehension)** 을 정의할 수 있습니다. 이렇게 하면 함수를 호출하지 않고 제너레이터를 사용할 수 있습니다.

```Python
csv_gen = (row for row in open(file_name))
```

이것은 `csv_gen` 리스트를 만드는 더 간단한 방법입니다. 곧 파이썬 yield 문에 대해 더 자세히 알게 될 것입니다. 지금은 다음과 같은 주요 차이점을 기억하세요
- `yield`를 사용하면 제너레이터 개체가 생성됩니다.
- `return`을 사용하면 파일의 첫 번째 줄만 표시됩니다.

### Example 2: Generating an Infinite Sequence

다음은 무한 시퀀스 생성을 살펴보겠습니다. 파이썬에서 유한 시퀀스를 얻으려면 `range()`를 호출하여 리스트 컨텍스트에서 평가합니다.

```Python
>>> a = range(5)
>>> list(a)
[0, 1, 2, 3, 4]
```

그러나 무한 시퀀스를 생성하려면 컴퓨터 메모리가 유한하므로 제너레이터를 사용해야 합니다.

```Python
def infinite_sequence():
    num = 0
    while True:
        yield num
        num += 1
```

이 코드 블록을 짧고 좋습니다. 먼저 변수 `num`을 초기화하고 무한 루프를 시작합니다. 그런 다음 초기 상태를 캡처할 수 있도록 즉시 `yield num`을 입력합니다. 이것은 `range()`의 동작을 모방합니다.

`yield` 후에 `num`을 1씩 증가시킵니다. `for` 루프를 사용하여 시도해보면 정말 무한한 것처럼 보일 것입니다.

```Python
>>> for i in infinite_sequence():
...     print(i, end=" ")
...
0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29
30 31 32 33 34 35 36 37 38 39 40 41 42
[...]
6157818 6157819 6157820 6157821 6157822 6157823 6157824 6157825 6157826 6157827
6157828 6157829 6157830 6157831 6157832 6157833 6157834 6157835 6157836 6157837
6157838 6157839 6157840 6157841 6157842
KeyboardInterrupt
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
```

프로그램은 사용자가 수동으로 중지할 때까지 계속 실행됩니다.

`for` 루프를 사용하는 대신 제너레이터 개체에서 `next()`를 직접 호출할 수도 있습니다. 이 기능은 콘솔에서 제너레이터를 테스트할 때 특히 유용합니다.

```Python
>>> gen = infinite_sequence()
>>> next(gen)
0
>>> next(gen)
1
>>> next(gen)
2
>>> next(gen)
3
```

여기 `gen`이라는 제너레이터가 있습니다. `next()`를 반복적으로 호출하여 수동으로 반복합니다. 이는 제너레이터가 예상되는 출력을 생성하는지 확인하는 데 탁월한 검사로 작동합니다.

### Example 3: Detecting Palindromes

무한 시퀀스는 여러 가지 방법으로 사용할 수 있지만 이를 위한 한 가지 실용적인 용도는 **회문 탐지기(palindrome detectors)** 를 만드는 것입니다. 회문 탐지기는 회문인 문자나 숫자의 모든 시퀀스를 찾을 것입니다. 이는 121 처럼 앞뒤로 똑같이 읽는 단어나 숫자들입니다. 먼저 숫자 회문 탐지기를 정의합니다.

```Python
def is_palindrome(num):
    # Skip single-digit inputs
    if num // 10 === 0:
        return False
    temp = num
    reversed_num = 0
    
    while temp != 0:
        reversed_num = (reversed_num * 10) + (temp % 10)
        temp = temp // 10
    
    if num == reversed_num:
        return num
    else:
        return False
```

이 코드에서 기본 수학을 이해하는 것에 대해 걱정하지 마세요. 이 함수는 입력 번호를 가져와서 반전하고 반전된 번호가 원래 번호와 동일한지 확인합니다. 이제 무한 시퀀스 제너레이터를 사용하여 모든 숫자 회문의 실행 리스트을 가져올 수 있습니다.

```Python
>>> for i in infinite_sequence():
...     pal = is_palindrome(i)
...     if pal:
...         print(i)
...
11
22
33
[...]
99799
99899
99999
100001
101101
102201
KeyboardInterrupt
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
  File "<stdin>", line 5, in is_palindrome
```

이 경우 콘솔에 인쇄되는 숫자는 앞으로 또는 뒤로 동일한 숫자뿐입니다.

이제 무한 시퀀스 제너레이터에 대한 간단한 사용 사례를 살펴보았으므로 제너레이터의 작동 방식에 대해 자세히 알아보겠습니다.

## Understanding Generators

지금까지 제너레이터를 만드는 두 가지 주요 방법, 즉 제너레이터 함수와 제너레이터 식을 사용하는 방법에 대해 살펴보았습니다. 제너레이터가 어떻게 작동하는지 직관적으로 이해할 수도 있습니다.

제너레이터 함수는 일반 함수와 동일하게 생겼고 작동하지만 한 가지 정의된 특성이 있습니다. 제너레이터 함수는 `return` 대신 파이썬 `yield` 키워드를 사용합니다. 이전에 작성한 제너레이터 함수를 기억해보세요.

```Python
def infinite_sequence():
    num = 0
    while True:
        yield num
        num += 1
```

이는 파이썬의 yield문과 같은 코드를 제외하고는 전형적인 함수 정의처럼 보입니다. `yield`는 값이 호출자에게 다시 전송되는 위치를 나타내지만 `return`과 달리 이후에는 함수를 종료하지 않습니다.

대신 함수의 **상태(state)** 가 기억됩니다. 이런식으로 `next()`가 생성자 객체에서 호출될 때(명시적으로 또는 암시적으로 `for` 루프 내에서) 이전에 생성된 변수 `num`은 증가한 다음 다시 생성됩니다. 제너레이터 함수는 다른 함수와 비슷하게 생겼으며, 제너레이터 식이 파이썬에서 사용할 수 있는 다른 컴프리헨션과 매우 유사하다고 가정할 수 있습니다.

### Building Generators With Generator Expressions

리스트 컴프리헨션과 마찬가지로 제너레이터 식을 사용하면 코드의 몇 줄만으로 제너레이터 객체를 빠르게 만들 수 있습니다. 또한 리스트 컴프리헨션이 사용되는 동일한 경우에도 유용하며, 반복하기 전에 전체 개체를 메모리에 저장하고 빌드하지 않고도 생성할 수 있습니다. 즉, 제너레이터 식을 사용할 때 메모리 패널티가 없습니다. 일부 숫자를 제곱하는 예를 들어보겠습니다.

```Python
>>> nums_squared_lc = [num**2 for num in range(5)]
>>> nums_squared_gc = (num**2 for num in range(5))
```

`nums_squared_lc`와 `nums_squared_gc는 기본적으로 동일하게 보이지만 한 가지 주요 차이점이 있습니다. 찾을 수 있겠나요? 다음 각 개체를 검사할 때 어떤일이 일어나는지 봅시다.

```Python
>>> nums_squared_lc
[0, 1, 4, 9, 16]
>>> nums_squared_gc
<generator object <genexpr> at 0x107fbbc78>
```

첫 번째 개체는 대괄호를 사용하여 리스트를 작성했고, 두 번째 개체는 괄호를 사용하여 제너레이터 식을 작성했습니다. 출력은 제너레이터 객체를 생성했으며 이 개체가 리스트와 다르다는 것을 확인합니다.

### Profiling Generator Performance

제너레이터가 메모리를 최적화하는 좋은 방법이라는 것을 앞에서 살펴봤습니다. 무한 시퀀스 생성기가 이러한 최적화의 극단적인 예이지만, 방금 본 숫자 제곱 예제를 확대하고 결과 개체의 크기를 검사해 보겠습니다. `sys.getsizeof()`에 대한 호출을 사용하여 이 작업을 수행할 수 있습니다.

```Python
>>> import sys
>>> nums_squared_lc = [i ** 2 for i in range(10000)]
>>> sys.getsizeof(nums_squared_lc)
87624
>>> nums_squared_gc = (i ** 2 for i in range(10000))
>>> print(sys.getsizeof(nums_squared_gc))
120
```

이 경우 리스트 컴프리헨션에서 얻을 수 있는 리스트 87,624바이트인 반면 제너레이터 개체는 120바이트에 불과합니다. 이것은 그 리스트가 제너레이터 객체보다 700배 이상 크다는 것을 의미합니다.

하지만 한 가지 명심해야 할 것이 있습니다. 리스트가 실행 중인 시스템의 사용 가능한 메모리보다 작으면 리스트 컴프리헨션이 동등한 제너레이터 식을 계산하는 것보다 더 빠를 수 있습니다. 이를 탐구하기 위해 위의 두 가지 컴프리헨션의 결과를 종합하여 요약해 보겠습니다. 

```Python
>>> import cProfile
>>> cProfile.run('sum([i * 2 for i in range(10000)])')
         5 function calls in 0.001 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.001    0.001    0.001    0.001 <string>:1(<listcomp>)
        1    0.000    0.000    0.001    0.001 <string>:1(<module>)
        1    0.000    0.000    0.001    0.001 {built-in method builtins.exec}
        1    0.000    0.000    0.000    0.000 {built-in method builtins.sum}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}


>>> cProfile.run('sum((i * 2 for i in range(10000)))')
         10005 function calls in 0.003 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    10001    0.002    0.000    0.002    0.000 <string>:1(<genexpr>)
        1    0.000    0.000    0.003    0.003 <string>:1(<module>)
        1    0.000    0.000    0.003    0.003 {built-in method builtins.exec}
        1    0.001    0.001    0.003    0.003 {built-in method builtins.sum}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
```

여기서 리스트 컴프리헨션의 모든 값을 합치는 데 제너레이터 전체를 합치는 데 약 3분의 1이 소요되었음을 알 수 있습니다. 속도가 문제이고 메모리가 문제가 아니라면 리스트 컴프리헨션이 작업에 더 나은 도구일 가능성이 높습니다.

리스트 컴프리헨션은 전체 리스트를 반환하고 제너레이터 식은 제너레이터를 반환합니다. 제너레이터는 함수 또는 식을 기반으로 구축되었든 동일하게 작동합니다. 식을 사용하면 각 내부 반복의 끝에 가정된 `yield`을 가진 단일 라인에서 단순 제너레이터를 정의할 수 있습니다.

파이썬 yield문은 확실히 제너레이터의 모든 기능이 의존하는 린치핀이므로, `yield`이 파이썬에서 어떻게 작동하는지에 대해 자세히 알아보겠습니다.

## Understanding the Python Yield Statement

전반적으로 `yield`는 상당히 간단합니다. 주요 작업은 `return` 문과 유사한 방식으로 제너레이터 함수의 흐름을 제어하는 것입니다. 그러나 위에서 간단히 언급한 바와 같이 파이썬 yield 문에는 몇 가지 트릭이 있습니다.

제너레이터 함수를 호출하거나 제너레이터 식을 사용할 때 제너레이터라는 특별한 이터레이터를 반환합니다. 이 제너레이터를 사용하기 위해 변수에 할당할 수 있습니다. `next()`와 같은 특별한 메소드를 호출하면 함수 내의 코드가 `yield`까지 실행됩니다.

파이썬 yield문이 히트하면 프로그램은 함수 실행을 중단하고 반환된 값을 호출자에게 반환합니다. 반면에 `return`은 함수 실행을 완전히 중지합니다. 함수가 일시 중단되면 해당 함수의 상태가 저장됩니다. 여기에서 제너레이터, 명령 포인터, 내부 스택 및 예외 처리에 대한 로컬 변수 바인딩이 포함됩니다.

이렇게 하면 제너레이터의 메소드 중 하나를 호출할 때 마다 함수 실행을 다시 시작할 수 있습니다. 이러한 방식으로 모든 기능 평가는 yield 직후에 다시 활성화됩니다. 여러 파이썬 yield문을 사용하여 이를 확인할 수 있습니다.

```Python
>>> def multi_yield():
...     yield_str = "This will print the first string"
...     yield yield_str
...     yield_str = "This will print the second string"
...     yield yield_str
...
>>> multi_obj = multi_yield()
>>> print(next(multi_obj))
This will print the first string
>>> print(next(multi_obj))
This will print the second string
>>> print(next(multi_obj))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

`next()`에 대한 마지막 호출을 자세히 살펴보겠습니다. 추적을 통해서 실행이 확대된 것을 볼 수 있습니다. 모든 이터레이터와 마찬가지로 제너레이터가 소진될 수 있기 때문입니다. 제너레이터가 무한하지 않은 한 제너레이터를 한 번만 반복할 수 있습니다. 모든 값이 평가되면 반복이 중지되고 `for` 루프가 종료됩니다. `next()`를 사용한 경우, 대신 명시적인 `StopIteration` 예외가 발생합니다.

---

`StopIteration`은 이터레이터의 끝을 알리기 위해 발생하는 자연스러운 예외입니다. 예를 들어 `for` 루프의 경우 `StopIteration`을 중심으로 작성됩니다. `while` 루프를 사용하여 자신만의 `for` 루프를 구현할 수도 있습니다.

```Python
>>> letters = ["a", "b", "c", "y"]
>>> it = iter(letters)
>>> while True:
...     try:
...         letter = next(it)
...     except StopIteration:
...         break
...     print(letter)
...
a
b
c
y
```

`yield`는 제너레이터의 실행 흐름을 제어하는 데 여러 가지 방법으로 사용될 수 있습니다. 창의성이 허용하는 한 여러 파이썬 yield문을 사용할 수 있습니다.
