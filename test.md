7.
(1) 
True,

relation R과 S가 공통 attribute가 없으므로 R ∩ S = ∅ 이다.

따라서 R ⋈ S = R × S 이므로 true이다.


(2)
True, relation R과 S가 공통 attribute가 없으므로 R ∩ S = ∅ 이다. 따라서 R ⋈ S = R × S 이다.

A,B 는 relation R의 attribute 이고 p (Project) 는 결과에서 중복 값을 제거해주기 때문에 p A,B  ( R ⋈ S ) = R 이다.


(3)
False,

σ A≠D (R × S) = R ⋈ A≠D  S

σ A≠D (R × S) = p A,B (σ A≠D (R × S))

→ 결과값의 attribute가 다르다! (A, B, C, D) : (A, B)


(4)
σ A>B (R ⋈ C=D  S) = (σ A>B R) ⋈ C=D  S

⋈ C=D  S 는 의미 없는 조인이므로,

σ A>B R = σ A>B R 과 같다. 즉, True


8.

            Scan        Equality        Range       Insert      Delete
Heap          B           0.5B            B            2        0.5B+1
Sorted        B          log2(B)      log2(B)+Mp   log2(B)+B   log2(B)+B
B+ tree       B          logF(B)      logF(B)+Mp   logF(B)+1   logF(B)+1
Hashing       B            1              B            2          2

Mp: 일치하는 페이지 수

9.
blocking factor 즉, fanout은 100 이고 각 블록에 10개의 레코드가 저장되어 있다.

file을 구성하는 record들의 수를 r이라고 하고 1단계 인덱스의 블록수를 b1 이라고 하면,

r/10 = b1 이다.

총 접근횟수를 4이하로 하기 위해서는 logF(b1) = log100(b1) <= 4 이다.

따라서 b1 <= 10^8 이므로 b1의 최대 갯수는 10^8 이다.

r = b1 * 10 이므로

file을 구성하는 record들의 최대 개수는 10^8 * 10 = 10^9 개 이다.
