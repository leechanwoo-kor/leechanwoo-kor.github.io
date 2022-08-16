---
title: "[Data Mining] 딥러닝의 기초 - 오류역전파법"
categories:
  - Data Mining
tags:
  - Data Mining
  - Back Propagation
toc: true
toc_sticky: true
toc_label: "딥러닝의 기초 - 오류역전파법"
toc_icon: "sticky-note"
---

# 딥러닝의 기초 - 오류역전파법

## 손실 함수

**예측값과 실제값의 차이를 나타냄**
- 학습가능한 매개변수의 함수로 표현
- 모델의 목표에 따라 서로 다른 손실함수 사용
  - 분류(크로스 엔트로피, 로그 로스), 회귀(평균제곱오차)
- 평균제곱오차 예시 (하나의 입출력 데이터)

![image](https://user-images.githubusercontent.com/55765292/161898655-976af8d9-b5b2-44ce-b744-73b7d7c2878d.png){: .align-center}

## 오류역전파법
**손실 함수가 최소가 되는 가중치를 찾는 방법**
- 가중치 갱신 방법 - 경사하강법
  - 방향 : 손실 함수에 대해 각각의 가중치로 편미분
  - 강도 : 학습률에 따라 조정
  ![image](https://user-images.githubusercontent.com/55765292/161898868-60581158-9fae-4d47-909f-eb50c6bae7e9.png){: .align-center}
- 경사하강법을 기반으로 다양한 variation이 존재
![image](https://user-images.githubusercontent.com/55765292/161898890-55ee88a3-6ff5-451a-845d-0dd91cce8298.png){: .align-center}

**다층퍼셉트론의 표현**

![image](https://user-images.githubusercontent.com/55765292/161898995-14ffea95-f033-4183-b710-e31df0ff3b6d.png){: .align-center}

### 𝑤_32^((2))의 갱신 과정 (하나의 데이터에 대해)

![image](https://user-images.githubusercontent.com/55765292/161899748-5b6af056-c2ed-470c-b4fe-e36e676cee9d.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161899778-8bca3259-ad20-4d87-8e2d-8b136c11e40d.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161899819-7780819d-4e7d-42cf-a4c7-546acdc98f99.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161899846-32630436-4537-45ba-8268-4f9c26f797c9.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161899872-16f9e464-a4e5-475b-a0e1-38e583357d35.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161899891-d4fc66ba-370c-4ca4-b9a2-4d84bc32e1a2.png){: .align-center}

### 𝑤_32^((2))의 갱신 과정 - Chain Rule로 정리

![image](https://user-images.githubusercontent.com/55765292/161899748-5b6af056-c2ed-470c-b4fe-e36e676cee9d.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900397-d7f8be67-0113-400c-8b8f-d1d7946896ad.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900418-65d121d3-c355-4a03-8661-0df2b60851e5.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900434-bf2002d9-8a0f-41bc-a92c-8a2f8b3e7ce2.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900449-453a87c2-dbb1-4263-bbd3-be0ea9115db7.png){: .align-center}

---

![image](https://user-images.githubusercontent.com/55765292/161900461-1becec43-2627-4c7c-9f6a-2cdae6dceef5.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900485-9e197f66-0e93-44dc-811d-75743fb96451.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900551-db210f25-e1a3-44c2-b36e-418911a6c4ec.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900576-e83e8b24-d411-405b-845a-4c72d97c8da7.png){: .align-center}

---

![image](https://user-images.githubusercontent.com/55765292/161900620-0eef9553-da76-49c1-af13-65924e8957b7.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900641-0a2c8e8b-5db6-4368-8d7f-ff62f8b3dba0.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900663-5405c62b-448c-41fd-a4eb-e82b6d4b3a73.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900713-0da46c79-e0e3-466a-bfef-5b97558d7ab6.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900740-edfed8ea-877e-44f1-ba25-16c54e13899c.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900755-c206ac81-31a9-4883-8622-b1a9b70ad453.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900805-cad575d3-be65-4974-a24c-a4bd91d7c427.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900836-813366b1-a1ba-4feb-96d4-7079dbcdf4bd.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161900849-b16dad14-4e6f-4e2d-8c4b-fbe212ab543f.png){: .align-center}


### 가중치 𝑊^((1)), 𝑊^((2))를 정리하면

![image](https://user-images.githubusercontent.com/55765292/161901500-277e49d2-f01d-48fe-ba6e-9caf9e1011da.png){: .align-center}

---

![image](https://user-images.githubusercontent.com/55765292/161901525-e0115c3a-3275-44cb-ac29-3f274fa377d9.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161901864-d7da70a1-1632-4142-ba90-df9adc6a8631.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161901898-abd85bc3-c01e-4e38-bfa5-a7d03bfd41c5.png){: .align-center}

![image](https://user-images.githubusercontent.com/55765292/161901921-47fa6e5c-d42f-4201-beb2-981e4347e496.png){: .align-center}

---

![image](https://user-images.githubusercontent.com/55765292/161901987-f6ec199d-df6d-4a34-b2e3-1fa7f9114f62.png){: .align-center}


## 오류역전파법의 한계

### 지역 최소값의 문제
- 차원의 저주 (curse of dimensionality)
- 초기조건에 따라 도달하는 최소값이 다를 수 있음
- 지역 최소값으로도 좋은 성능을 보임, 비지도학습으로 개선 가능

### 경사도(gradient)가 0에 가까워지는 문제
- 신경망이 깊어질수록 연쇄 법칙에 의한 미분이 중첩되어 미분이 0에 가까워짐
- 중첩된 미분이 0에 가까워지면 가중치의 갱신이 미미하여 학습효율이 낮아짐
- 해결방안 : 활성함수 ReLU의 활용, 배치 정규화 등

### 학습데이터의 과적합
- 지나친 학습으로 학습 데이터에만 최적화된 모델 생성
- 해결방안 : 검증 데이터의 활용, drop-out 기법 활용
