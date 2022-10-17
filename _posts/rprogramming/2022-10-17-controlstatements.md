---
title: "[R Programming] 조건문 / 반복문"
categories:
  - R Programming
tags:
  - R Programming
toc: true
toc_sticky: true
toc_label: "[R Programming] 조건문 / 반복문"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/196178337-b8c46683-8745-4e42-8167-6f12e5faf1d1.png)

<br>
# 조건문 / 반복문

<br>
## if - else
- To test a condition and act on it depending on whether it's true or false

```R
if(<condition>) {
        ## do something
}
## Continue with rest of code
```

```R
if(<condition>) {
        ## do something
} else {
        ## do something else
}
```

- To test a condition and act on it depending on whether it's true or false

```R
if(<condition1>) {
        ## do something
} else if(<condition2>) {
        ## do something different
} else {
        ## do something different
}
```

<br>
## for
- To iterate over the elements of an object (list, vector, etc)
  - Take an iterator variable

```R
    number <- rnorm(10)
    for(i in 1:10) {
        print(numbers[i])
    }
## [1] -0.9567815
## [1]  1.347491
## [1] -0.3158058
## [1]  0.5960358
## [1]  1.133312
## [1] -0.7085361
## [1]  1.525453
## [1]  1.114152
## [1] -0.1214943
## [1] -0.2898358
```

- Example 1

```R
    x <- c("a", "b", "c", "d")
    
    for(i in 1:4) {
           ## Print out each element of 'x'
           print(x[i])
    }
## [1] "a"
## [2] "b"
## [3] "c"
## [4] "d"
```

- Eaxmple 2
  - seq_along() is used to generate an integer sequence based on the length of an object

```R
## Generate a sequence based on lengrth of 'x'
    for(i in seq_along(x)) {
            print(x[i])
    }
## [1] "a"
## [2] "b"
## [3] "c"
## [4] "d"
```

<br>
## Nested for loops
- for loops can be nested inside of each other
- matrix(행렬)에서 seq_along을 쓰면 부작용이 일어난다!! → seq_len()

```R
    x <- matrix(1:6, 2, 3)
    
    for(i in seq_len(nrow(x))) {
            for(j in seq_len(ncol(x))) {
                    print(x[i, j])
            }
    }
## [1] 1
## [1] 3
## [1] 5
## [1] 2
## [1] 4
## [1] 6
```

<br>
### 실습: 구구단 출력하기
- 다음과 같이 구구단 2단부터 9단까지 출력하기

![image](https://user-images.githubusercontent.com/55765292/196238199-5c2541c0-8b94-455e-9dba-1a6243b677b4.png)

```R
for(i in 2:9) {
  for(j in 1:9) {
    message(i, " * ", j, " = ", i*j)
  }
}
```

<br>
## next
- To skip an iteration of a loop
  - next 를 만나면 바로 for 문으로 이동하라!!

```R
for(i in 1:100) {
        if(i <= 20) {
                ## Skip the first 20 iterations
                next
        }
        ## Do something here
}
```

<br>
### 실습: next

```R
for(i in 1:10) {
  message("i = ", i, " block 1")
  
  if(i <= 2) {
    message("i = ", i, " block 2")
    
    next
    
    message("i = ", i, " block 3")
  }
  message("i = ", i, " block 4")
}
```

```
i = 1 block 1
i = 1 block 2
i = 2 block 1
i = 2 block 2
i = 3 block 1
i = 3 block 4
i = 4 block 1
i = 4 block 4
i = 5 block 1
i = 5 block 4
i = 6 block 1
i = 6 block 4
i = 7 block 1
i = 7 block 4
i = 8 block 1
i = 8 block 4
i = 9 block 1
i = 9 block 4
i = 10 block 1
i = 10 block 4
```

<br>
## break
- To exit a loop immediately regradless of what iteration the loop may be on
  - break 를 만나면 자신이 속해 있는 for 문에서 빠져나와라!!

```R
for(i in 1:100) {
      print(i)
      
      if(i > 20) {
              ## Stop loop after 20 iterations
              break
      }
}
```

<br>
### 실습: break

```R
for(i in 1:10) {
  message("i = ", i, " block 1")
  
  if(i > 5) {
    message("i = ", i, " block 2")
    
    break
    
    message("i = ", i, " block 3")
  }#end if
  message("i = ", i, " block 4")
}#end for
```

```
i = 1 block 1
i = 1 block 4
i = 2 block 1
i = 2 block 4
i = 3 block 1
i = 3 block 4
i = 4 block 1
i = 4 block 4
i = 5 block 1
i = 5 block 4
i = 6 block 1
i = 6 block 2
```

---

```R
for(i in 1:5) {
  for(i in 1:10) {
    message("j = ", j, " block 1")
    message("i = ", i, " block 1")
    
    if(i > 5) {
      message("j = ", j, " block 2")
      message("i = ", i, " block 2")
      
      break
      
      message("j = ", j, " block 3")
      message("i = ", i, " block 3")
    }#end if
    message("j = ", j, " block 4")
    message("i = ", i, " block 4")
  }#end for
  message("j = ", j, "  block 5")
}
```

```
j = 1 block 1
i = 1 block 1
j = 1 block 4
i = 1 block 4
j = 1 block 1
i = 2 block 1
j = 1 block 4
i = 2 block 4
j = 1 block 1
i = 3 block 1
j = 1 block 2
i = 3 block 2
j = 1 block 5
j = 2 block 1
i = 1 block 1
j = 2 block 4
i = 1 block 4
j = 2 block 1
i = 2 block 1
j = 2 block 4
i = 2 block 4
j = 2 block 1
i = 3 block 1
j = 2 block 2
i = 3 block 2
j = 2 block 5
```
