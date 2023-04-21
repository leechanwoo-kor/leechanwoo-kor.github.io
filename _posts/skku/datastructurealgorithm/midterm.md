1. 다음의 알고리즘 SAMPLE을 참조하라

```
SAMPLE(int n)
  int sum = 0;                          --- ①
  for (i = n; i > 0; i = i/2) do        --- ②
    for (j = 0; j < n; j = j + 1) do    --- ③
      sum = sum + 1                     --- ④
  return(sum)                           --- ⑤
```

(1) 위의 각 괄호와 일치하는 왼쪽의 명령어들이 총 몇 번 수행하는지 모두 채워라.
- ① : 1번
- ② : $\log_2n$번
- ③ : n번
- ④ : $n \cdot log_2n$
- ⑤ : 1번

(2) 위 알고리즘의 Worst Case의 시간 성능을 Big Oh 표기로 나타내라.
- $O(n \cdot log_2n)$



2. 다음의 알고리즘 SAMPLE을 참조하라. 여기서 X와 Y는 각각 n개의 정수들을 저장하는 array이다.

```
SAMPLE(int (X[n]))
  for (i = 0; i <= n-1; i = i+1) do
    {
      sum = X[0]
      for (j = 0; j <= l; j = j+1) do
        sum = sum + X[j]
      Y[i] = sum / (l + 1)
    }
  return Y
```

(1) X[8]에 다음 값이 있다고 할 때, 수행 후 Y[8]에 어떤 값들이 return 되는지 보여라

||0|1|2|3|4|5|6|7|
|---|---|---|---|---|---|---|---|---|
|x[8]|30|28|17|37|48|20|30|62|

Y[8] = (30+28+17+37+48+20+30+62)/9

(2) 위의 알고리즘의 수행시간은 $O(n^2)$이다. 불필요한 연산을 소거하여 $O(n)$이 되도록 위와 동등한 알고리즘으로 작성하라.

```
SAMPLE(int (X[n]))
  sum = X[0]
  for (j = 0; j <= l; j = j+1) do
    sum = sum + X[j]
  for (i = 0; i <= n-1; i = i+1) do
    Y[i] = sum / (l + 1)
  return Y
```



3. (1) 다음은 10진수 n을 2진수로 변환하는 알고리즘이다. 괄호 ①과 ②에 올바른 연산을 채워 완성하라.

```
CONVERT(int n)
  if n == 0
    return 0;
  else {
    CONVERT( ① )
    return ( ② )
  }
```

- ① : n / 2
- ② : CONVERT(n/2) * 10 + (n % 2)


(2) 다음은 정수 n이 소수(prime number)이면 true를, 아니면 false를 return하는 알고리즘이다. 이 알고리즘의 시간 성능이 O(Root(n))이 되도록, 괄호 ①과 ②를 올바른 연산을 채워 완성하라.

```
TEST(int n)
for (i = 2; ( ① ) <= n; i++)
  if ( ② ) == 0
    return false
  else
    return true;
```

- ① : i * i
- ② : n % 1



4. 다음은 Circular Queue의 Insert와 Delete 연산을 작성한 알고리즘이다.

```
max = 3; int queue[3];
int rear = 0; int front = 0;

INSERT(int X)
  { rear = (rear + 1) MOD max
    if (front == rear)
      {
        print(“Sorry, queue is full”)
        ( ① )
      }
    print("OK, X is added”)
    queue[rear] = X
  }

DELETE
  { if ( ② ) print(“Sorry, queue is empty”)
    front = (front + 1) MOD max
    print(“OK, X is deleted”)
    X = queue[front]
  }
```

1) 위의 알고리즘의 괄호 ①, ② 안에 들어 갈 명령어를 각각 작성하라.

2) 이제 아래와 같은 순서로 호출했다고 할 때, 출력되는 메시지를 차례대로 적어라.
1) INSERT(20); 2) INSERT(30); 3) INSERT(40); 4) INSERT(50);
5) DELETE; 6) INSERT(60); 7) DELETE; 8) DELETE; 9) DELETE
