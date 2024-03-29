---
title: "[Ⅴ. Sequence Models] Sequence Models & Attention Mechanism (1)"
categories:
  - Deep Learning Specialization
tags:
  - Coursera
  - Deep Learning Specialization
  - Natural Language Processing
  - Long Short Term Memory (LSTM)
  - Gated Recurrent Unit (GRU)
  - Recurrent Neural Network
  - Attention Models
toc: true
toc_sticky: true
toc_label: "Sequence Models & Attention Mechanism (1)"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/187809649-f4918caf-ae96-4f46-a0cf-42ba990450d9.png){: width="50%" height="50%"}{: .align-center}

<br><br>

# Sequence Models & Attention Mechanism

## Sequence to Sequence Models

### Beam Search

이번에는 **빔 탐색beam search** 알고리즘을 배워 보겠습니다. 지난번에 주어진 프랑스어 문장 입력에서 무작위의 영어 번역이 아닌 최상의 가장 그럴듯한 영어 번역을 출력하는 기계 번역 방법에 대해 다루었습니다.

또한 입력 오디오 클립이 주어진 음성 인식에서 해당 오디오의 무작위 텍스트 스크립트를 출력하는 것이 아니라 최상의 가장 그럴듯한 텍스트 스크립트를 출력하려는 경우에도 마찬가지입니다. 빔 탐색은 이러한 작업을 위해 가장 널리 사용되는 알고리즘입니다. 여러분의 필요를 위해 빔 탐색을 활용할 수 있는 법을 알아 보겠습니다.

#### Beam Search Algorithm

![image](https://user-images.githubusercontent.com/55765292/192787234-a36a4f70-b61b-4b6c-a5e7-a4d59b1fd2a6.png)

실행 예제인 프랑스어 문장을 사용해서 빔 탐색을 해봅시다.

> Jane, visite l'Afrique en Septembre.

다음과 같이 번역되길 바랍니다.

> Jane, visits Africa in September.

빔 탐색이 처음으로 해야 할 일은 영어 번역의 첫 단어를 고르는 것으로 작동할 겁니다. 여기 1만개의 단어를 어휘 집합에 나열했습니다. 문제를 조금 단순화시키기 위해 대문자는 무시하겠습니다. 그래서 모든 단어를 소문자로만 나열하고 있습니다.

빔 탐색의 첫 번째 단계에서는 초록색은 연립, 보라색은 비연립으로 이 네트워크 조각을 사용하여 첫 번째 단어에 대한 확률을 구합니다. 주어진 입력 문장 x가 프랑스어라면 첫 번째 출력 y의
확률은 무엇일까요?

탐욕적 탐색은 가장 그럴듯한 단어를 고르는 데 반해, 빔 탐색은 여러 대안을 고려할 수 있습니다. 빔 탐색 알고리즘에는 $B$라는 매개변수가 있으며 이것은 **빔 폭**이라고 불립니다. 이 예의 경우, 빔 폭을 3으로 설정하겠습니다. 이는 빔 탐색이 한 가지 가능성이 아닌 세 가지 가능성을 고려한다는 것을 의미합니다.

특히, 첫 단어의 여러 선택들에 대한 이 확률의 수치를 구한다고 가정하면 "in", "jane", "september"가 영어 출력의 첫 번째 단어로 가장 가능성이 높은 세 가지입니다. 그 다음 빔 탐색은 이 세 단어 모두를 컴퓨터 메모리에 저장할 것입니다.

만약 다르게 빔 폭 매개변수를 10이라고 한다면 3개가 아닌 10개의 단어 중에서 가장 가능성이 있는 선택을 추적합니다. 따라 빔 탐색의 첫 단계를 명확히 수행하려면 이 인코더 네트워크를 통해 프랑스어 문장을 입력한 다음 디코드 네트워크의 첫 단계를 통하여 1만 가지 가능성이 있는 소프트맥스 출력을 얻습니다. 그리고 1만 가지의 가능한 출력을 가져와 상위 3개를 메모리에 보관합니다.

![image](https://user-images.githubusercontent.com/55765292/192798685-99d70de6-3e55-4e78-b0f9-aaa7b389e0b4.png)

빔 탐색의 두 번째 단계로 넘어갑시다. "in", "jane", "september"을 가장 그럴듯한 첫 번째 단어로 고른 빔 탐색이 이제 할 일은 각각의 두 번째 단어가 되어야 할 것을 고려하는 것으로 "in" 다음은 "a" 나 "aaron"일 수 있습니다.

어휘 집합, 사전 또는 목록에서 단어를 나열해보고 있습니다. 아래 어딘가에 "september"가 있을 것이고, 그 아래 어딘가에 "visit"이 있을 것이고 z까지 가면 마지막 단어는 "zulu"입니다.

그래서 두 번째 단어의 확률을 구하기 위해 인코더를 녹색으로 표시하는 이 신경망 조각을 "in" 다음 단어를 결정하기 위해 디코더 부분을 사용합니다 디코더 첫 번째 출력인 $\hat{y}^{<1>}$을 기억하세요. 저는 이 $\hat{y}^{<1>}$을 "in"으로 설정하고 거슬러 올라가서 일단 결정된 "in"이 있습니다.

왜냐하면 첫 번째 단어가 "in"이고 두 번째 단어가 무엇인지 알아내려 하는 중이기 때문이며, 그러면 $\hat{y}^{<2>}$가 출력됩니다. 따라서 여기 y-hat_1을 고정시키면 첫 번째 단어인 "in"을 나타내는 입력을 이번에는 두 번째 단어의 확률을 구하는데 사용할 수 있습니다. 주어진 프랑스어 문장과 번역된 첫 번째 단어인 "in"을 가지고 말이죠.

이제 이 빔 탐색의두 번째 단계에서 필요한 것은 가장 그럴듯한 첫 번째와 두 번째 단어의 쌍을 찾는 것으로, 두 번째 단어만 그럴듯한 것이 아니라 두 단어 모두 그럴듯한 쌍을 찾는 것입니다. 조건부 확률의 규칙에 따라 이것은 첫 번째 단어의 확률과 두 번째 단어의 확률을 곱한 것입니다. 이 신경망 조각에서 얻었습니다.

만약 "in", "Jane", "September"로 선택한 각 세 단어에 대해서 이 확률을 구할 수 있다면 이 두 번째 확률을 곱하여 두 단어 쌍의 확률을 구할 수 있습니다. 이제 여러분은 첫 번째 단어가 "in"인 경우 두 번째 단어의 확률을 구할 수 있는 방법을 보셨습니다.

첫 번째 단어 "jane"도 똑같은 방법으로 합니다. 문장은 "jane a", "jane aaron"이 될 수 있으며 아래로 내려가 "jane is", "jane visits" 등이 될 수 있습니다. 이를 신경망 조각에 사용할 수 있습니다.

여기도 그려보자면 $\hat{y}^{<1>}$을 "jane"으로 고정시킵시다 따라서 "jane"으로 고정된 첫 번째 단어 $\hat{y}^{<1>}$으로 신경망 조각은 주어진 x와 첫 번째 단어 "jane"에 대한 두 번째 단어의 확률이 무엇인지 알려줍니다. 그리고 위와 마찬가지로 $y^{<1>}$의 확률을 곱해서 두 번째 단어의 10,000가지 가능한 선택 각각에 대한 $y^{<1>}$과 $y^{<2>}$ 쌍의 확률을 구할 수 있습니다.

마지막으로 같은 작업을 "september"에도 합니다. "a"에서 "zulu"까지 모든 단어에 이 네트워크 조각을 사용합니다. 첫 번째 단어가 "september"라면 두 번째 단어에 대해 가장 가능성이 높은 옵션은 무엇일까요? 빔 탐색 두 번째 단계의 경우 빔 폭을 계속해서 3으로 사용하고 있고 어휘 집합에 1만 개의 단어가 있기 때문에 1만 곱하기 3 또는 3만개의 가능성을 고려하게 됩니다.

여기에 1만개, 여기에 1만개, 여기에 1만개 이렇게 어휘 집합의 단어 수에 빔 폭을 곱한 다음에 아마도 첫 번째와 두 번째 단어에 따라 3만 개의 옵션들을 모두 평가한 다음 상위 3개를 고릅니다. 조금 줄여보도록 하죠 3만 개의 가능성을 다시 빔 폭 값인 3으로 줄이고 이 3만 개의 선택에서 "in september"와 "jane is", "jane visits"가 가장 가능성이 높습니다.

조금 지저분하죠, 그러나 이것들이 3만 개의 선택 중 가장 가능성이 높은 3개이며 빔 탐색은 이것을 기억하여 다음 단계로 넘어갑니다. 만약 빔 탐색이 첫 번째와 두 번째 단어가 "in september", "jane is" 또는 "jane visits"가 되는 것이 가장 가능성 있는 선택이라고 결정했다면 이는 영어 번역의 첫 단어 후보로 "september"를 거부한다는 것을 의미합니다.

이제 첫 단어에 대한 가능성이 두 가지밖에 남지 않았지만 여전히 빔 폭은 3으로 $y^{<1>}, y^{<2>}$ 쌍 세 가지를 추적합니다. 세 번째 빔 탐색 단계로 가기 전에 알아두실 것은 빔 폭은 3이기 때문에 매 단계마다 이런 부분적인 문장 조각과 출력을 구하기 위해서 네트워크의 복사본 3개의 예시를 들겁니다.

빔 폭이 3이기 때문에 첫 단어에 대한 서로 다른 선택의 네트워크 복사본 3개가 있지만 이러한 네트워크 복사본 3개는 두 번째 단어의 모든 3만 가지 옵션을 구하는 데 매우 효율적입니다. 따라서 네트워크 복사본 3만개로 예를 들지 말고 단 3개의 복사본으로 가능한 만 개의 소프트맥스 출력값, $y^{<2>}$를 빠르게 구하도록 합시다.

#### Beam Search $( B = 3 )$

![image](https://user-images.githubusercontent.com/55765292/192798816-738a5b1c-9131-4a0f-8c3e-f81d2dd07f97.png)

빔 탐색의 한 단계를 더 살펴보도록 하죠. 첫 두 단어의 선택 중 가장 그럴 듯한 것은 "in september", "jane" is", "jane visits"이며 컴퓨터 메모리에 저장된 각의 단어 쌍에서 주어진 프랑스어 문장 입력 x에 대한 $y^{<1>}$과 $y^{<2>}$의 확률입니다. 그 전과 마찬가지로 우리는 이제 세 번째 단어가 무엇인지 고려하고자 합니다. "in september a"일까요? "in september aaron"일까요? 맨 아래 "in september zulu"일까요?

세 번째 단어로 가능한 선택을 계산하기 위해서, 첫 번째 단어를 고정시켜서 "september"가 두 번째 단어가 되도록 한 네트워크 조각을 사용합니다. 따라서 이 네트워크 조각은 주어진 프랑스어 입력 x와 영어 출력인 첫 두 단어 "in septempber"에 대한 세 번째 단어의 확률을 계산할 수 있습니다. 그리고 두 번째 조각도 마찬가지입니다 이렇게 됩니다.

그리고 "jane visits"에도 같습니다. 그래서 빔 탐색은 다시 한번 상위 세 가지 가능성을 선택할 겁니다. 아마 "in september jane", "jane is visits", "Jane visits africa"가 가장 그럴듯한 출력이 될 것이며 그런 다음 단어가 하나 더 추가된 빔 탐색의 네 번째 단계에 이르게 됩니다.

이 과정의 결과는 빔 탐색이 한 번에 하나의 단어를 추가하며 "Jane visits Africa in September"를 결정하고 EOS, 문장의 끝이라는 기호로 종료되며 이는 매우 일반적입니다. 이것이 그럴 듯한 영어 문장 출력이라는 것을 알게 됩니다. 

B가 3일 때 빔 탐색은 한 번에 세 가지 가능성을 고려합니다. 만약 빔 폭이 1과 같다고 한다면 가능성이 단 하나 밖에 없게 되어 지난 영상에서 논의했던 탐욕적 탐색 알고리즘이 되지만, 3개, 10개와 같이 여러 가능성을 고려한다면 빔 탐색은 일반적으로 탐욕적 탐색보다 훨씬 더 나은 출력 문장을 찾을 수 있습니다.

이제 빔 탐색 작동 방식을 알아보았는데요. 빔 탐색이 더 잘 작동되도록 만드는 몇 가지 추가 팁과 트릭을 알려 드리겠습니다.


### Refinements to Beam Search

기본적인 빔 탐색 알고리즘에 대해 살펴봤습니다. 이번에는 조금 새로운 것을 배울 텐데요. 배웠던 것을 더 잘 활용할 수 있을 겁니다.

#### Length Normalization

![image](https://user-images.githubusercontent.com/55765292/192802089-48ac06ba-f5a0-4e3c-9600-f06389b090ae.png)

**길이 정규화length normalization**는 빔 탐색에 있어 작은 변화이지만 훨씬 나은 결과를 얻게 해줍니다. 자, 우리는 빔 탐색이 이 확률을 최대화한다고 배웠습니다. 여기 있는 이 곱은 단지 다음과 같이 표현됩니다.

$P(y^{<1>}, ..., y^{< T_y>} \mid x)$은 $P(y^{<1>} \mid x)$과 $P(y^{<2>} \mid x, y^{<1>})$에 이어서 $P(y^{< T_y>}|x, y^{<1>}, ..., y^{< T_y - 1>})$까지 곱한 값이 될 겁니다. 기호가 필요 이상으로 겁을 주는 것 같기는 하지만 여러분이 이전에 보았던 확률입니다.

자, 이걸 구현해보면 이 확률들은 전부 1보다 작은 수입니다. 사실 대개 1보다 더 작죠 1보다 작은 여러 수를 곱하면 아주 작은 수가 되어 수치상으로 언더플로 상태가 됩니다. 즉, 부동 소수점 표현으로 컴퓨터에 정확하게 저장하기에는 너무 작다는 겁니다.

실제로는 이 곱을 최대화하는 대신에 로그를 취할 겁니다. 여기에 로그를 넣으면 곱의 로그는 로그의 합이 되고 로그 확률의 합을 최대화하면 결과적으로는 가장 적합한 문장을 선택할 수 있습니다. 로그를 취하면 보다 안정된 수치의 알고리즘을 얻게 됩니다.

수치의 라운딩 에러나 언더플로에 있어 덜 취약하죠. 로그함수는 정확하게 단조증가함수이기 때문에 최대화한 로그 $P(y \mid x)$는 최대화한 $P(y \mid x)$의 값과 같아야 합니다. y라는 같은 값에 대해서 이를 최대화 하면 이것도 최대화되어야 하는 것처럼 말이죠.

대부분의 구현에서 확률의 곱이 아닌 로그 확률의 합을 파악해야 합니다. 이 목적 함수에 또 다른 변동이 있습니다. 기계 번역 알고리즘을 더 잘 작동하게 해주죠.

자, 여기 있는 원래의 목적 함수를 보면 문장이 아주 긴 경우에 문장의 확률은 낮아집니다. 문장의 확률을 추정하기 위해 1보다 작은 수많은 숫자들을 곱하기 때문입니다. 1보다 작은 숫자를 한번에 곱하면 더 작은 확률을 얻게 됩니다.

이 목적함수는 비정상적으로 아주 짧은 번역문, 아주 짧은 아웃풋을 선호할지 모릅니다. 짧은 문장의 확률은 보다 적은 1미만의 숫자들을 곱해서 결정되기 때문에 따라서 곱의 결과는 아주 작지는 않습니다.

여기서도 마찬가지입니다. 확률의 로그는 항상 1보다 작거나 같습니다. 여기 이 로그 범위 안에 있죠 따라서 더 많은 단어를 더할수록 음수값이 더 커집니다. 알고리즘을 더 잘 작동하게 하도록 여러분이 할 수 있는 다른 방법은 이 목적 함수를 최대화하는 대신에 번역문 내 단어의 수로 정규화하는 것입니다. 이것이 각 단어의 확률의 로그의 평균을 내서 더 긴 번역문을 입력하는 페널티를 상당히 줄여줍니다.

실제로는 휴리스틱을 이용해서 아웃풋 문장 내 단어 수인 $T_y$로 나누는 대신 좀더 쉽게 접근해볼 수 있습니다. $T_y$의 알파제곱이 있고 알파는 0.7이라고 해봅시다. 알파가 1과 같으면 길이별로 완벽히 정규화되고 알파가 0이면 $T_y$의 0제곱은 1이 됩니다 그럼 전혀 정규화되지 않죠. 알파는 완전 정규화와 비정규화 사이의 어딘가에 있는 겁니다. 알파는 또 다른 하이퍼 파라미터이기 때문에 알고리즘이 계속해서 최적의 결과를 얻어내려고 합니다.

이런 방식으로 알파를 사용하면 휴리스틱 혹은 대충한 것일까요? 이론적으로 그럴듯한 근거가 있지는 않지만 사람들은 이 방식이 잘 작동한다는 것과 실행해볼만 하다는 것을 깨달았죠. 그래서 대부분은 하지 않을 겁니다. 다른 알파값도 시도해서 어떤 것이 최적의 결과를 내는지 볼 수도 있습니다.

빔 탐색 방법에 대해 요약해보겠습니다. 빔 탐색을 실행하면 길이가 1인 문장, 길이가 2인 문장, 길이가 3인 문장 등 아주 많은 문장을 보게 됩니다. 30 단계의 빔 탐색을 실행한다고 했을 때 최대 30개의 문장을 입력한다고 해보죠.

여러분은 길이가 1, 2, 3, 4에서 30까지인 각 문장 중 상위 3개의 확률을 파악할 겁니다. 문장을 입력한 다음 이 점수을 가지고 문장들을 점수 매길 겁니다. 그럼 상위 문장을 얻어낼 수 있고 빔 탐색 과정에서 봤던 문장에 대해서 이 목적 함수를 계산할 수 있습니다.

그럼 이 방식으로 평가한 모든 문장에서 가장 큰 값을 고르면 됩니다. 낮은 확률 객체의 정규화죠. 정규화된 로그 우도 객체라고도 불립니다. 그것이 여러분이 입력한 최종 번역물이 됩니다. 이런 식으로 빔 탐색을 구현하면 됩니다.

#### Beam Search Discussion

![image](https://user-images.githubusercontent.com/55765292/192802187-4ed60b8e-6b5a-4878-b7a2-246cb23b921f.png)

마지막으로 구현 관련 세부 사항 몇 가지가 있습니다. 빔 너비 $B$를 어떻게 정해야 할까요? $B$를 아주 크게 설정하는 것과 아주 작게 설정하는 것에는 장단점이 있습니다.

빔의 너비가 매우 크면 많은 가능성을 고려하게 되고 그렇게 되면 여러 선택지를 시도하기 때문에 더 나은 결과를 얻곤 하지만 속도는 느리겠죠. 메모리 요구량도 증가하기 때문에 계산도 느려질 수밖에 없습니다.

반면 빔 너비가 아주 작으면 알고리즘이 실행될 때 적은 가능성만 고려하기 때문에 좋지 않은 결과값을 얻습니다. 하지만 속도는 올라가고 메모리 요구량도 낮아집니다. 이전에는, 예시로 빔 너비를 3으로 설정하고 실행해서 세 가지 가능성을 고려했습니다.

생성 시스템에서는 작은 축에 속하죠. 빔 너비가 10 정도인 경우는 흔하지 않습니다. 생성 시스템에 있어 빔 너비 100은 응용 프로그램에 따라 아주 크게 여겨질 겁니다. 하지만 마지막 순간까지 성과를 내기 위해 애를 쓰는 시스템에서는 빔 너비가 1,000, 혹은 3,000으로 설정되는 경우도 흔합니다. 하지만 도메인뿐만 아니라 응용 프로그램 의존적이죠. 다양한 값의 빔 너비를 설정해서 여러분의 응용 프로그램에 적합한 너비를 찾으라고 말씀드리고 싶습니다.

하지만 너비가 아주 크면 대개 수익 체감이 있습니다 즉, 대부분의 응용 프로그램에서 기본적으로 3에서 10까지 검색하는 하나의 빔을 실행하면 큰 소득이 있을 것이라 생각하지만 빔 너비가 수천이어도 얻는 것은 그리 크지 않습니다. 이전에 다른 컴퓨터 공학 강좌를 수강한 분 중 BFS나 DFS 같은 컴퓨터 공학 탐색 알고리즘에 익숙한 분들이 계실 겁니다.

빔 탐색을 생각하는 관점은 여러분이 이전에 컴퓨터 공학 알고리즘 강좌에서 배웠을 알고리즘들과는 다릅니다. 만약 이런 알고리즘에 대해 들어본 적이 없다고 해도 걱정하지 마세요. 하지만 BFS나 DFS에 대해 들어봤다면 정밀 탐색 알고리즘인 그것들과는 다르게, 빔 탐색은 훨씬 빠르지만 여러분이 찾고자 하는 argmax를 찾는다는 보장은 없습니다.

BFS나 DFS에 대해 들어보지 않았대도 걱정하지 마세요. 우리 목적에는 중요치 않습니다. 하지만 들어본 적이 있다면, 빔 탐색은 그러한 알고리즘들과 이런 연관이 있답니다.

자, 여러 생산 시스템과 상업 시스템에 널리 쓰이는 알고리즘인 빔 탐색에 대해 이야기해보았습니다. 이어서 오류 분석에 대해 이야기해보겠습니다. 제가 발견한 가장 유용한 툴 중 하나가 빔 탐색 오류 분석에 사용될 수 있는데요. 빔 너비를 넓혀야 하는지 빔 너비가 잘 작동하고 있는 건지 의문이 들 때가 있을 겁니다. 그럴 때 탐색 알고리즘 개선의 필요 여부에 대해 지침을 얻기 위해 계산해볼 수 있는 간단한 것들이 있습니다.


### Error Analysis on Beam Search

빔 검색은 추론적 검색 알고리즘이라고도 불리는 대략적인 검색 알고리즘입니다. 그래서 항상 가장 가능성 있는 문장을 출력하는 것은 아닙니다. $B$가 3과 10과 100의 최고의 가능성을 계속 추적하고 있을 뿐이죠.

만약 빔 검색이 실수한다면? 여기서는 오류 분석이 빔 검색과 어떻게 상호 작용하는지 그리고 그것이 문제를 일으키고 시간을 투자할 가치가 있는 빔 검색 알고리즘인지 알 수 있게 됩니다. 또는 문제를 일으키고 시간을 투자할 가치가 있는 RNN 모델일 수도 있습니다. 빔 검색을 통해 오류 분석을 하는 방법을 살펴봅시다.

#### Example

![image](https://user-images.githubusercontent.com/55765292/192804365-67de511b-8cd5-417d-b0e9-cac51dda52ca.png)

예로 들어보죠. 자, 이제 기계 번역 개발자 개발 세트, 즉 인간이 이 번역을 제공했고

> Human: Jane visits Africa in September.

저는 이걸 $y^{ * }$라고 부르겠습니다. 이것은 사람이 쓴 꽤 괜찮은 번역문입니다 그럼, 여러분이 배운 RNN 모델과 학습된 번역 모델에 대한 빔 검색할 때 RNN이라는 번역을 통해 끝납니다.

> Algorithm: Jave visited Africa last Semtember.

이 문장은 프랑스어의 훨씬 더 심한 번역을 하였습니다. 그것은 실제로 의미를 바꾸어서 좋은 번역이 아닙니다. 자, 여러분의 모델은 두 가지 주요 구성 요소를 가지고 있습니다. 신경망 모델이 있습니다. 시퀀스 모델이죠 RNN 모델이라고 부르겠습니다. 인코더이자 해독기입니다. 그리고 빔 검색 알고리즘이 있습니다.

이 알고리즘은 만약 이 오류, 즉 이 오역이 이 두 구성 요소 중 하나에 잘 번역되지 않는다는 점을 고려하면 좋지 않을까요? RNN이나 신경망이 더 큰 문제였을까요? 아니면 빔 검색 알고리즘일까요? 그리고 세번째 순서로 보신 것은 항상 아프지 않는 더 많은 훈련 자료를 모으는 것이 매력적입니다.

비슷한 방식으로, 항상 상처를 주지 않거나 전혀 아프지 않는 빔의 폭을 늘리는 것이 매력적입니다. 하지만 교육 데이터를 더 많이 얻는 것처럼 원하는 수준의 성능을 얻을 수 없습니다. 마찬가지로 빔의 폭을 스스로 늘리는 것은 여러분이 가고 싶은 곳으로 도달하지 못할 수도 있습니다.

그러나 검색 알고리즘을 개선하는 것이 시간을 잘 활용하는지 어떻게 결정할까요? 그래서 어떻게 그 문제를 분해하고 실제로 여러분의 시간을 잘 활용할 수 있는지 알아내는 것입니다. RNN이라는 신경망 RNN은 인코더와 디코더를 의미합니다. $P(y \mid x)$를 계산합니다.

다시 말씀드리지만, 저는 지금 대문자 대 소문자 구분을 무시합니다. 그렇죠 그러면 $P(y \mid x)$가 계산됩니다. 따라서 이 시점에서 가장 유용하게 사용할 수 있는 일은 이 모델을 사용하여 $P(y^{ * } \mid x)$ 계산 및 RNN 모델을 사용하여 $P(\hat{y} \mid x)$를 계산하는 것입니다.

그리고 이 둘 중 어느 것이 더 큰가 봅니다 그래서 좌측 부분이 오른쪽보다 클 수 있습니다. $P(y^{ * })$가 실제로 $P(\hat{y})$보다 작거나 같은 것일 수도 있습니다. 이 두 가지 사례 중 어느 것이 참답인지에 따라 이 특정 오류에 대해 보다 명확하게 설명할 수 있습니다. 이 특정 잘못된 번역을 RNN 중 하나에 적용하거나 검색 알고리즘에 더 큰 오류가 있는 경우 자, 이것과 관련된 논리를 살펴봅시다.

#### Error Analysis on Beam Search

![image](https://user-images.githubusercontent.com/55765292/192804443-1f6575c3-61b0-4ec3-afc5-4936a2acf68e.png)

여기 두 문장이 있습니다. 그리고 $P(y^{ * } \mid x)$와 $P(\hat{y} \mid x)$를 계산해서 이 두 가지 중 어느 것이 더 큰지 확인할 것입니다. 두 가지 경우가 있을 것입니다. 1의 경우 RNN 모델의 출력으로 $P(y^{ * } \mid x)$가 $P(\hat{y} \mid x)$보다 큽니다.

이게 무슨 뜻일까요? 음, 빔 검색 알고리즘은 $\hat{y}$를 선택했죠? $\hat{y}$은 $P(y \mid x)$를 계산하는 RNN을 갖고 있었습니다. 탐색 작업은 인수 최대 값을 제공하는 $y$ 값을 찾는 것이었습니다.

그러나 이 경우 $y^{ * }$는 $\hat{y}$보다 $P(y \mid x)$에 더 높은 가치를 제공합니다. 이 결론으로 요약할 수 있는 것은 빔 검색이 $P(y \mid x)$를 최대화하는 $y$의 가치를 제공하는 데 실패했다는 것입니다. 왜냐하면 빔을 검색하는 하나의 작업은 이 값을 정말로 크게 만드는 $y$의 가치를 찾는 것이기 때문입니다.

그러나 $hat{y}$을 선택하면 $y^{ * }$는 훨씬 더 큰 가치를 갖게 됩니다. 이 경우, 빔 검색이 잘못되었다고 결론지을 수 있습니다. 다른 사건은요? 2의 경우 $P(y^{ * } \mid x)$는 $P(\hat{y} \mid x)$보다 작거나 같습니다. 그리고 이것 또는 저것이 사실이어야 합니다. 그래서 1이나 2의 경우 모두 사실이어야 합니다.

2번 사건에서 어떤 결론을 내시겠습니까? 예를 들어 $y^{ * }$는 $\hat{y}$보다 더 나은 번역을 합니다. 그러나 RNN에 따르면 $P(y^{ * })$는 $P(\hat{y})$보다 작기 때문에 $y^{ * }$가 $\hat{y}$보다 덜 출력될 가능성이 있다고 말합니다. 이 경우에는 RNN 모델이 잘못되었다고 생각되고 RNN에서 일하는 데 더 많은 시간을 투자해야 할 것 같습니다.

길이 정규화 것에 관한 미묘함이 있습니다. 제가 고르고 있는 것들이죠. 그리고 만약 여러분이 이러한 확률을 평가하는 대신에 일종의 길이 정규화를 사용한다면 여러분은 길이 정규화를 고려하게 되는 최적화 목표를 평가해야 합니다. 하지만 지금 이 경우에는 그런 복잡성이 무시되고 있습니다. 이 경우에는 $y^{ * }$가 더 나은 번역이라고 하지만 RNN은 낮은 번역보다 낮은 확률에서 RNN을 기록했습니다. 이 경우에는 RNN 모델이 잘못되었다고 말씀드리겠습니다.

#### Error Analysis Process

![image](https://user-images.githubusercontent.com/55765292/192804541-cb727bb3-e8cf-48d8-bf27-91d8d202844d.png)

그래서 오류 분석 프로세스는 다음과 같습니다. 개발 세트를 살펴본 다음 개발 세트에서 알고리즘이 했던 오류를 찾습니다. 따라서 이 예에서 $x$로 표시된 $P(y^{ * } \mid x)$는 2 x 10에서 -10으로 반면 $P(\hat{y} \mid x)$는 1 x 10에서 -10으로 10으로 조정되었습니다.

이 경우, 빔 검색이 $hat{y}$보다 낮은 확률을 가진 $\hat{y}$을 실제로 선택했다는 것을 알 수 있습니다. 빔 탐색하는 것이 잘못되었다고 말하겠습니다. 그래서 나는 B를 요약해서 쓸 것이다. 그리고 알고리즘에 의해 두 번째 실수나 두 번째 나쁜 결과를 얻습니다. 이 확률들을 보세요.

그리고 두번째 예를 들자면 모델이 잘못되었다고 생각하실 겁니다. 나는 RNN 모델을 R로 요약할 것이다. 더 많은 예를 들어보겠습니다. 때로는 빔 검색이 잘못되었을 때 때로는 모델이 잘못되었을 때도 있습니다 등등이 계속 이어집니다.

그리고 이 과정을 통해 RNN 모델에 대한 빔 검색 결과로 발생한 오류의 수를 파악하기 위해 오차 분석을 수행할 수 있습니다. 이런 오류 분석 프로세스를 사용하면 개발에서 알고리즘이 사람 번역보다 더 많은 결과를 제공하는 모든 예에서 검색 알고리즘이나 목표 함수나 검색 기능을 생성하는 RNN 모델에 오류를 일치시킬 수 있습니다.

그리고 이를 통해, 여러분은 이 두 구성 요소 중 어느 것이 더 많은 오류를 범하는지 알아낼 수 있습니다. 그리고 만약 빔 검색이 많은 오류들을 유발한다는 것을 발견한다면 아마도 우리는 빔의 폭을 늘리기 위해 열심히 노력하고 있는 것 같습니다.

반면, RNN 모델에 문제가 있는 경우 더 깊이 있는 분석 계층을 통해 정규화를 추가하거나 더 많은 학습 데이터를 얻거나 다른 네트워크 아키텍처 등을 시도해 볼 수 있습니다. 그래서, 여러분이 이 세 번째 과정에서 본 많은 기술들이 여기 적용될 것입니다. 이것은 빔 검색을 이용한 오차 분석입니다.

저는 이런 특별한 오류 분석 과정이 대략적인 최적화 알고리즘을 가질 때마다 매우 유용하다는 것을 발견했습니다. 예를 들어, 학습 알고리즘에 의해 산출되는 일종의 비용 함수 예를 들어, 이 강의에서 논의했던 시퀀스 간 모델 시퀀스 간 RNN과 같은 것입니다 그래서 저는 여러분이 이런 종류의 모델을 여러분의 응용에 더 잘 사용할 수 있게 만드는 데 더 효율적으로 일하기를 바랍니다.
