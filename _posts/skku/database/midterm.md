1. 다음 relation을 참조하라.

|A|B|C|D|E|F|
|:---:|:---:|:---:|:---:|:---:|:---:|
|10|10|20|20|15|18|
|15|20|10|18|20|15|
|20|15|18|15|18|20|
|10|18|15|18|15|10|

(1) 위 relation에서 super key가 될 수 없는 것들을 모두 찾아 적어라.
- {A}, {D}, {E}, {A, E}
(2) 위 relation에서 key들 만을 모두 찾아 적어라.
- {B}, {C}, {F}, {A, D}, {D, E}


2. 수업시간때 배운 ER → relation mapping guidelineguideline을 준수하여 다음 ER schema schema를 relation 구조로 변환하라. 밑줄은 PK, 전화는 multi valuedvalued임 변환된 relationrelation에 primary key와 foreign key (있는 경우)를 명시 요함.

- 학생(학번, 학생명)
- 과목(과목#, 과목명)
- 교수(교수명, 나이, 전화)
- 수강(학번, 과목, 강의실)
- 강의(교수명, 과목#)
- 지도(교수명, 학번)

3. 
