1. 다음 문장들을 명제 논리식으로 표현하시오. 단, 정의된 명제들은 다음과 같다.
- x-computer-part : x는 컴퓨터부품이다.
- x-software : x는 software이다.
- x-hardware : x는 hardware이다.
- x-vaccine(x) : x는 백신이다.

(a) x가 컴퓨터부품이면, x는 software이거나 hardware이다.
- x-computer-part $\rightarrow$ x-software $\vee$ x-hardware

(b) x는 software이지만 hardware는 아니다.
- x-software $\wedge$ ~x-hardware

(c) x는 백신이고 software이다.
- x-vaccine $\wedge$ x-software

<br>

2. 다음의 정형식(wff)을 CNF(절들의 논리곱)형식으로 변환하시오.

(a) $(P \vee R) \vee (Q \wedge W)$
- $(P \vee R \vee Q) \wedge (P \vee R \vee W)$

(b) $(P \rightarrow Q) \vee W$
- $P \vee Q \vee W)

3. 술어논리 표현 예제

다음의 술어기호 들을 사용하여 주어진 문장을 술어논리로 표현하시오. 도메인은 전체 세계이다. 사용가능한 술어(predicate)는 mushroom(x), purple(x), 그리고, poisonous(x) 이다.

(a) All purple mushroom is poisonous. (모든 자주색 버섯은 독버섯이다.)
- $(\forall x) mushroom(x) \wedge purple(x) \rightarrow poisonous(x)$

(b) No purple mushroom is poisonous. (독버섯인 자주색 버섯은 없다.)
- $[(\exists x)purple(x) \wedge mushroom(x) \wedge poisonous(x)]`$
