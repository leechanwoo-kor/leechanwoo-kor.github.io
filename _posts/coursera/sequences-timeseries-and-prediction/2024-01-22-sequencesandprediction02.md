---
title: "[TensorFlow] Sequences and Prediction (2)"
categories:
  - TensorFlow
tags:
  - Sequences
  - Time Series
toc: true
toc_sticky: true
toc_label: "Sequences and Prediction"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/141bbde2-afa6-4d8c-ac8a-50c7d70e8757){: .align-center width="50%" height="50%"}<br>

# Train, validation and test sets

이전에는 시계열의 행동을 구성하는 모든 다양한 요소를 보았습니다.

이제 우리가 알고 있는 것을 감안하여 해당 시계열을 예측하는 데 사용할 수 있는 기법을 살펴보도록 하겠습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4e28f16b-607b-4706-bbc5-b8d456c9783d){: .align-center width="75%" height="75%"}<br>

이 시계열은 트렌드 계절성과 노이즈가 포함되어 있으며 지금은 충분히 현실적입니다.

<br>

## Naive Forecasting

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/67be5eb5-112d-46a7-953d-dc82100705da){: .align-center width="75%" height="75%"}<br>

예를 들어, 마지막 값을 선택하여 다음 값이 동일하다고 가정할 수 있는데, 이를 **단순 예측(Naive Forecasting)** 이라고 합니다.

이를 실제로 보여주기 위해 여기 있는 데이터 세트의 일부를 확대해 보았습니다. 최소한 기준선을 얻기 위해 그렇게 할 수 있으며, 믿거나 말거나 그 기준선은 꽤 좋을 수 있습니다. 하지만 성능을 어떻게 측정할까요?

<br>

## Fixed Partitioning

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/96131722-0fb0-4b22-a212-c32f817f095e){: .align-center width="75%" height="75%"}<br>

일반적으로 시계열을 훈련 기간, 검증 기간 및 테스트 기간으로 나누고자 합니다. 이것을 **고정 분할(Fixed Partitioning)** 이라고 합니다.

시계열에 어느 정도 계절성이 있는 경우 일반적으로 각 기간에 전체 시즌이 포함되도록 하려면 다음과 같이 테스트 기간에 대해 일정한 수의 분할을 수행해야 합니다.

예를 들어, 시계열에 1년 또는 2년 또는 3년이 연간 계절성이 있는 경우 일반적으로 1년 또는 2년 또는 3년이 해당됩니다. 일반적으로 1년 반 또는 다른 달이 다른 달보다 더 많이 표시되는 것을 원하지 않습니다.

이 테스트는 훈련 검증 테스트와 약간 다르게 나타날 수 있지만, 비 시계열 데이터 세트에서 익숙할 수 있습니다.

말뭉치에서 임의의 값을 선택하여 세 가지를 모두 만든 경우 효과가 거의 동일하다는 것을 확인해야 합니다. 다음은 훈련 기간에 모델을 훈련시키고 검증 기간에 대해 평가합니다. 여기에서 훈련에 적합한 아키텍처를 찾기 위한 실험을 수행할 수 있습니다. 그리고 검증 세트를 사용하여 원하는 성능을 얻을 때까지 테스트 및 하이퍼 파라미터를 작업하십시오.

종종 한 번 수행한 다음에는 훈련 및 검증 데이터를 모두 사용하여 다시 훈련할 수 있습니다. 그런 다음 테스트 기간에 테스트하여 모델의 성능이 그대로 유지되는지 확인할 수 있습니다. 테스트 데이터를 사용하여 다시 훈련하는 이례적인 단계를 수행할 수 있습니다.

하지만 왜 그렇게 하겠습니까? 테스트 데이터는 현재 시점에 가장 가까운 데이터이기 때문입니다. 따라서 미래 값을 결정하는 데 있어 가장 강력한 신호가 될 수 있습니다. 모델도 해당 데이터를 사용하여 훈련하지 않으면 최적이 아닐 수 있습니다.

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5cdbbae2-12b1-472b-8de9-ce5ff7266e63){: .align-center width="75%" height="75%"}<br>

이로 인해 테스트 세트를 모두 포기하는 것이 사실 매우 일반적입니다.

그리고 트레이닝 기간과 검증 기간을 사용하여 트레이닝을 하면 테스트 세트는 미래에 있을 것입니다. 이 과정에서 그 방법론의 일부를 따를 것입니다. 고정된 분할은 매우 간단하고 매우 직관적이지만 다른 방법도 있습니다.

짧은 트레이닝 기간으로 시작하고, 한 번에 하루 또는 한 번에 일주일씩 그것을 점차 늘립니다. 매번 반복할 때마다 트레이닝 기간에 모델을 트레이닝합니다. 그리고 이를 사용하여 검증 기간의 다음 날 또는 그 다음 주를 예측합니다.

<br>

# Metrics for evaluating performance

모델과 기간이 있으면 모델을 평가할 수 있으며 성능을 계산하기 위한 메트릭이 필요합니다.

따라서 단순히 오차를 계산하는 것부터 시작하겠습니다.

```
error = forecasts - actual
```

이는 저희 모델에서 예측된 값과 평가 기간 동안의 실제 값의 차이입니다.

```
mse = np.square(errors).mean()
```

모형의 예측 성능을 평가하는 가장 일반적인 지표는 **평균 제곱 오차** 또는 **MSE**입니다. 제곱을 하는 이유는 음수 값을 제거하기 위해서입니다.

예를 들어, 만약 오차가 값보다 2 위에 있으면 2가 되지만, 값보다 2 아래에 있으면 -2 입니다. 그러면 이 오차들은 서로를 효과적으로 상쇄시킬 수 있는데, 이는 우리에게는 두 개의 오차가 있고 그렇지 않기 때문에 잘못된 것입니다.

그러나 만약 분석하기 전에 값의 오차를 제곱하면, 이 두 오차는 모두 4로 제곱되어 서로를 상쇄시키고 효과적으로 같아지는 것이 아닙니다.

```
rmse = np.sqrt(mse)
```

그리고 만약 오류 계산의 평균이 원래의 오류와 같은 척도가 되도록 원한다면, 그냥 제곱근을 얻어서 **제곱 평균 오차** 또는 **RMSE**를 제공합니다

```
mae = np.abs(errors).mean()
```

또 다른 일반적인 메트릭 중 하나는 **평균 절대 오차** 또는 **MAE**이며, 그것은 평균 절대 편차 또는 MAE라고도 합니다. 그리고 이 경우, 부정적인 것을 제거하기 위해 제곱하는 대신, 그것들의 절대 값을 사용합니다. 이것은 MSE가 하는 것만큼 큰 오류에 불이익을 주지 않습니다.

작업에 따라 MAE 또는 MSE를 선호할 수 있습니다. 예를 들어, 큰 오류가 잠재적으로 위험하고 작은 오류보다 비용이 훨씬 많이 든다면 MSE를 선호할 수 있습니다. 그러나 이득 또는 손실이 오류의 크기에 비례한다면 MAE가 더 나을 수 있습니다.

```
mape = np.abs(errors/x_valid).mean()
```

또한 **평균 절대 백분율 오차** 또는 **MAPE**를 측정할 수 있으며, 이는 절대 오차와 절대값 사이의 평균 비율이며, 이는 값과 비교하여 오차의 크기를 알 수 있습니다.

<br>

# Moving average and differencing

## Moving Average

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9658f48c-6554-4371-9044-77638427ce20){: .align-center width="75%" height="75%"}<br>

일반적이고 매우 간단한 예측 방법은 **이동 평균(moving average)** 을 계산하는 것입니다. 여기서 노란색 선은 평균화 기간(예: 30일)이라고 하는 고정된 기간 동안의 파란색 값의 평균을 플롯한 것입니다.

이렇게 하면 많은 노이즈가 제거되고 원래 시리즈와 거의 유사한 곡선을 얻을 수 있지만 추세나 계절성을 예측할 수는 없습니다. 현재 시간, 즉 미래를 예측하려는 기간에 따라 실제로는 순진한 예측보다 더 나빠질 수 있습니다. 예를 들어, 이 경우 평균 절대 오차는 약 7.14입니다.

<br>

## Differencing

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bcd14225-7433-4ac2-bdda-6a367e3f7a1a){: .align-center width="75%" height="75%"}<br>

이를 방지하는 한 가지 방법은 **차분(differencing)**이라는 기술을 사용하여 시계열에서 추세와 계절성을 제거하는 것입니다. 즉, 시계열 자체를 연구하는 대신 T 시점의 값과 이전 시점의 값 사이의 차이를 연구합니다.

데이터의 시간에 따라 그 기간은 1년, 하루, 한 달 등 무엇이든 될 수 있습니다.

1년 전을 살펴보겠습니다. 이 데이터의 경우 시간 T에서 365를 뺀 값에서 추세와 계절성이 없는 차이 시계열을 얻을 수 있습니다.

<br>

## Moving Average on Differenced Time Series

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d4cb7828-0831-47d6-8a78-17cf4dc69062){: .align-center width="75%" height="75%"}<br>

그런 다음 이동 평균을 사용하여 이 시계열을 예측하면 이러한 예측을 얻을 수 있습니다.

그러나 이것은 원래 시계열이 아니라 차이 시계열에 대한 예측일 뿐입니다.

원래 시계열에 대한 최종 예측을 얻으려면 T 시점의 값에서 365를 뺀 값을 다시 더하면 이러한 예측을 얻을 수 있습니다.

<br>

## Restoring the Trend and Seasonality

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/585c6143-cbb3-44ad-89ba-5308a1ccb575){: .align-center width="75%" height="75%"}<br>

유효성 검사 기간에 대한 평균 절대 오차를 측정하면 약 5.8이 나옵니다. 따라서 순진한 예측보다는 약간 낫지만 엄청나게 나은 것은 아닙니다.

이동 평균을 통해 많은 노이즈가 제거되었지만 최종 예측은 여전히 노이즈가 많다는 것을 눈치채셨을 것입니다. 이 노이즈는 어디에서 오는 것일까요?

예측에 다시 추가한 과거 값에서 비롯된 것입니다. 따라서 이동 평균을 사용하여 과거의 노이즈를 제거하면 이러한 예측을 개선할 수 있습니다.

<br>

## Smoothing Both Past and Present Values

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/884eb3e7-206b-4461-bea0-454751704ff5){: .align-center width="75%" height="75%"}<br>

이렇게 하면 훨씬 더 부드러운 예측을 얻을 수 있습니다. 실제로 이렇게 하면 유효성 검사 기간 동안 평균 제곱 오차가 약 4.5에 불과합니다. 이는 이전의 모든 방법보다 훨씬 나은 결과입니다.

사실, 시계열이 생성되기 때문에 완벽한 모델은 노이즈로 인해 평균 절대 오차가 약 4라고 계산할 수 있습니다. 이 접근 방식을 사용하면 최적 모델에 그리 멀지 않은 것으로 보입니다.

딥러닝을 서두르기 전에 이 점을 명심하세요. 때로는 간단한 접근 방식도 잘 작동할 수 있습니다.

<br>

# Trailing versus centered windows

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/fc43f55d-658e-4188-a2b2-f030fb743117){: .align-center}<br>

주목할 점은 현재 값의 이동 평균을 계산할 때는 **후행(Trailing) 윈도우**를 사용했지만 과거 값의 이동 평균을 계산할 때는 **중심(Centered) 윈도우**를 사용했습니다.

중심 윈도우를 사용한 이동 평균은 후행 윈도우를 사용하는 것보다 더 정확할 수 있습니다. 하지만 미래 값을 모르기 때문에 현재 값을 매끄럽게 하는 데 중심 윈도우를 사용할 수는 없습니다. 하지만 과거 값을 매끄럽게 하는 데는 중심 윈도우를 사용할 수 있습니다.