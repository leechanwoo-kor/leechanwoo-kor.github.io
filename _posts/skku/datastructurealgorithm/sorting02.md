---
title: "[Data Structures & Algorithms] Sorting (2)"
categories:
  - Data Structure
  - Algorithm
tags:
  - Sorting
toc: true
toc_sticky: true
toc_label: "Sorting (2)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222598023-0eced08e-a03a-4366-a388-c9e2b218127b.png)

<br>

# Optimal Sorting Time (How fast can we sort?)

- (지금까지 배운) Selection, Bubble, Insertion, Quick Sort 모두 Worst case에 O(n^2) 임.
- 여기서 “optimal”은 worst case에 우리가 기대할 수 있는 최적의 (the best possible) 시간을 의미함.
- 비교(comparison)과 교환(swap) 연산만을 허용한다고 할 때, optimal sorting time은 $O(n \cdot \log_2n)$로 알려져 있음.
- 이에 대한 증명은 Sorting 과정을 묘사하는 Decision Tree을 이용함.
  - n 개의 key들 K1, K2, K3, . . . Kn 가 있다고 가정
  - 각 node는 2 개의 key들 간에 크기 비교를, 각 branch는 비교 결과를 의미함.

<br>

- 예 : 3 개의 key {K1, K2, K3} 에 대한 Decision Tree
- 각 leaf에 최종 sort 결과가 있으며, sorting 알고리즘은 이 곳에서 종료됨.
- 총 6 (= 3!) 개의 leaf들은 모두 다르며, 이들은 valid한 sorting 알고리즘의 모든 sorting 결과들을 보여줌.
- Root에서 각 leaf까지의 길이가 총 비교 횟수가 됨; 여기서 최대 길이는 3.
- 참고로 이 tree는 8 개의 leaf를 갖는 Full binary tree보다 leaf 개수가 적음.

<br>

<img width="950" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8d2088fa-ae16-4249-b53d-221e0390a5a2">

<br>

- Root에서 가장 아래에 있는 leaf까지의 길이가 worst case에 비교 횟수가 됨.
- 즉, decision tree의 높이(height)가 worst case의 비교 회수임.
- n 개의 key를 갖는 decision tree는 n! 개의 leaf (= sorting 결과)들을 가짐.
- Height가 h인 binary tree에서 leaf의 최대 개수는 2h-1 (즉, Full 인 경우).
- Decision tree 역시 binary tree의 일종임.
  - 따라서, 2h-1 >= n!
  - n! = n(n-1)(n-2)…3 2 1 >= (n/2)^(n/2) (by Stirling의 공식)
  - 따라서, h >= (n/2)log2 (n/2) = O(nlog2n) 

<br>

# Heap Sort

- Heap sort는 selection sort의 일종으로 성능을 향상시킨 것임.
- 이를 위해 unsorted list를 Max Heap이라는 Priority Queue에 저장.
- 전체 list가 모두 sort 될 때까지 각 단계(pass)에서 다음 과정을 반복;
  - (1) Unsorted list (즉, Max Heap)에서 largest key를 선택.
  - (2) 이 largest key를 unsorted list의 맨 뒤에 배치.

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/630329d0-7152-434f-b6bf-79f2d4caa0ab">

<br>

## Heap Sort Algorithm

- 1. Build Max Heap from unsorted list
- 2. Repeat until unsorted list is empty
  - 1) Delete an element from the max heap and place it at the end of unsorted list
    - Exchange first (max element) and last of unsorted list
    - Reheap Down the unsorted list
  - 2) Move last element of unsorted into sorted list

## 성능 분석

- n 개의 key들을 insert하여 Max Heap 생성 : nlog2n
- Max heap에서 largest key들을 n 번 delete : nlog2n
- 따라서, O(nlog2n)

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/11d2277b-8239-4cf9-9d28-7a724e698747">

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/586ec3c4-ade7-4380-8eca-794b2caeb4fa">

<br>

## 비교: Selection Sort vs. Heap Sort

- Selection sort : O(n2)
  - For each step, select the smallest element : O(n)
- Heap sort : O(nlog2n)
  - For each step, select the largest element : O(log2n)

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ef0ebf4b-cf79-441f-bc7b-04c039446b61">

<br>

# Merge Sort (합병 정렬)

- Invented by Von Neumann
- Divide and Conquer
- If the list size n = 1, then it is already sorted. Otherwise:
- If n > 1, divide the unsorted list into two equally sized sublists.
- Sort each sublist recursively by re-applying merge sort.
- Merge the two sublists back into one sorted list

<br>

## Merge

- Merging two sorted lists
  - : sorted list + sorted list -> sorted list 

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e65ff7c8-3201-4ad6-a524-7af0a97af9cf">

<br>

- Compare two keys from the two sorted lists A and B, and then move the smaller key into a new list C
- When one of A and B becomes empty, append all the remaining keys to a list C.
- Total n – 1 comparisons, where n is total number of keys in A and B. Thus, O(n)
- We need extra space n (array) for merge output.

<br>

### Merge : 얘 1

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3db7f982-4d7f-43c4-a4f1-bb0602857d81">

<br>

- List A의 pointer가 밖으로 나가면 B의 남은 key (15, 27, 38)들을 copy해서 C에 출력

<br>

### Merge : 예 2

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bc7e14ab-4381-4411-bc76-182a52076e84">

<br>

- 위의 예는 A와 B의 양쪽의 key들을 번갈아 가면서 모두 비교해야 하는 worst case 인 경우임.

<br>

## Merge Sort

```
MergeSort (int list, left, right)
{
  if (left < right) /Base case : left = right 혹은 left > right/
  {
    int middle = (left + right)/2; /중앙 위치 값을 계산/
    MergeSort (list, left, middle); /왼쪽 부분을 계속 분할/
    MergeSort (list, middle+1, right); /오른쪽 부분을 계속 분할/
    Merge (list, left, middle, right) /Merge를 호출; 실제 sort 과정/
  }
}
```

<br>

### Merge Sort : 예

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7843ff99-2f38-4106-8cae-7c6c8e4ee7c5">

<br>

## Merge Sort : 성능분석

- Time Complexity
  - Size of each sorted list is increased as follows;
    - 1, 2, 4, 8, . . . . , 2k
  - Number of lists is decreased as follows;
    - n, n/2, n/4, . . . . , n/2k
  - Number of merge passes (= k) is;
    - n/2k = 1, Thus, k = O(log2n)
  - Each merge pass takes O(n) time.
  - Total time is; (Number of merge passes) * (Merge time) = O(nlog2n)
- Space Complexity
  - We need O(n) extra space for the merge.

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4ac824e6-70e4-463f-a830-8a4c8cb867d2">

<br>

- Selection, Bubble, Insertion: Small n에 권장
- Quick, Merge, Heap: Large n에 권장
- Insertion sort is the best for small n.
- Quick sort is the best in average case.
- Merge sort is the best in worst case.
- Quick, Merge sort: Extra space가 요구됨.
- We usually combine Insertion, Quick, and Merge.

<br>

## Insertion vs. Merge

- Performance Comparison (Referred Algorithms by Sedgewick)

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a8873f22-7720-40b8-880d-6eb318b09214">

- Good algorithms are better than supercomputers.

<br>

## Merge vs. Quick

- Performance Comparison (Referred by Algorithms by Sedgewick)

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0fd75e1c-9da9-4252-8d32-eb0582bcaea5">

## Merge vs. Quick

- Performance Comparison (Referred by Algorithms by Sedgewick)

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5d869d38-4697-47a9-b882-254139d3726d">

- Good algorithms are better than good ones


