---
title: "[Machine Learning] Parquet vs Arrow"
categories:
  - Machine Learning
tags:
  - Apache Parquet
  - Apache Arrow
toc: true
toc_sticky: true
toc_label: "Parquet vs Arrow"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/user-attachments/assets/bf0410de-0afb-48a5-9f63-fad0098de82b){: .align-center}<br>

데이터 저장 형식은 데이터를 얼마나 빠르고 효율적으로 추출하고 처리할 수 있는지에 중대한 영향을 미칩니다. 이번 포스트에서는 데이터 사이언스 커뮤니티에서 주목받는 두 가지 데이터 저장 형식인 Apache Parquet과 Apache Arrow를 비교해보겠습니다.

<br>

## 소개

### Apache Parquet

Apache Parquet은 압축 기능, 스키마 진화 능력, 중첩된 데이터 구조와의 호환성으로 인해 Apache Hadoop과 함께 사용하도록 최적화된 컬럼형 저장 파일 형식입니다. Parquet은 CSV와 같은 행 기반 파일에 비해 효율성을 제공하도록 설계되어, 크고 복잡한 데이터셋을 쿼리할 때 특히 효율적입니다.

### Apache Arrow

반면 Apache Arrow는 인메모리 데이터 처리 프레임워크입니다. 다중 언어 바인딩을 제공하여 시스템이나 프로세스 간에 복잡한 데이터를 공유하거나 이동하는 데 탁월한 도구입니다. Arrow의 인메모리 컬럼형 형식은 효율적인 데이터 접근을 가능하게 하여 무거운 분석 워크로드에 훌륭한 선택이 됩니다.

이제 각각의 기능, 차이점, 그리고 실제 사용 시 어떻게 비교되는지 더 자세히 살펴보겠습니다.

<br>

## Parquet와 Arrow 비교

### 데이터 저장 (Data Storage)

Parquet은 디스크 기반 저장 형식인 반면, Arrow는 인메모리 형식입니다. Parquet은 디스크 I/O에 최적화되어 있으며 컬럼형 데이터로 높은 압축률을 달성할 수 있습니다. 이는 디스크 공간이 우려되는 대용량 데이터셋 작업 시 장점이 됩니다.

반면 Arrow는 고속 인메모리 데이터 처리를 위해 설계되었습니다. 현대 CPU에 최적화된 플랫(flat) 및 계층적 데이터에 대한 표준화된 언어 불가지론적 형식을 제공합니다.

### 스키마 진화 (Schema Evolution)

Parquet과 Arrow 모두 스키마 진화를 지원하여 컬럼을 추가, 제거 또는 수정할 수 있습니다. 이는 시간이 지남에 따라 변할 수 있는 대용량 데이터셋 작업 시 특히 유용합니다. 하지만 Parquet의 스키마 진화는 변경 사항이 파일 수준에서 처리되고 서로 다른 파일이 다른 스키마를 가질 수 있기 때문에 때때로 복잡할 수 있습니다.

### 압축 (Compression)

Parquet은 데이터 압축에서 뛰어난 성능을 보입니다. Parquet의 컬럼형 특성으로 인해 데이터를 더 효율적으로 압축할 수 있어 저장 비용을 줄일 수 있습니다. Parquet은 Snappy, Gzip, LZO와 같은 다양한 압축 코덱을 지원합니다.

Arrow는 역시 컬럼형이지만 인메모리 처리에 중점을 두며 Parquet처럼 본질적으로 데이터 압축을 제공하지는 않습니다.

### 쿼리 속도 (Query Speed)

Parquet은 뛰어난 저장 효율성을 제공하지만, 필요한 압축 해제 및 디코딩으로 인해 Arrow에 비해 데이터 읽기가 느릴 수 있습니다. 반면 Arrow는 인메모리 처리에 중점을 두어 더 빠른 데이터 읽기를 가능하게 하며, 이는 특히 실시간 분석 워크로드에서 더 빠른 쿼리 결과로 이어질 수 있습니다.

### 상호운용성 (Interoperability)

Arrow의 교차 언어 기능은 서로 다른 프로세스와 시스템 간의 데이터 교환에 탁월한 선택이 됩니다. 지원하는 언어로는 Python, Java, C++, R, JavaScript가 있습니다.

Parquet은 다양한 데이터 처리 프레임워크(Hadoop, Apache Beam, Spark 등)와 상호 운용 가능하지만 Arrow만큼 광범위한 교차 언어 지원을 제공하지는 않습니다.

<br>

### 예제: 코드 샘플

```bash
pip install pandas pyarrow
```

```python
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
import time

# 샘플 DataFrame 생성
df = pd.DataFrame({
    'one': pd.Series(range(1000000)),
    'two': pd.Series(range(1000000, 2000000)),
    'three': pd.Series(range(2000000, 3000000))
})

# Parquet으로 쓰기 및 읽기
start = time.time()
df.to_parquet('data.parquet')
read_parquet = pd.read_parquet('data.parquet')
end = time.time()
print(f"Parquet 쓰기 + 읽기 시간: {end - start}")

# DataFrame을 Arrow Table로 변환
table = pa.Table.from_pandas(df)

# Arrow로 쓰기 및 읽기
start = time.time()
pq.write_table(table, 'data.arrow')
read_arrow = pq.read_table('data.arrow').to_pandas()
end = time.time()
print(f"Arrow 쓰기 + 읽기 시간: {end - start}")
```

<br>


## 결론

결국 Parquet과 Arrow 사이의 선택은 프로젝트의 특정 요구사항에 따라 달라집니다.

Parquet을 선택해야 하는 경우:

- 대용량 데이터셋으로 작업
- 저장 효율성이 중요
- 배치 분석이 대부분 (쿼리 속도가 주요 문제가 아닌 경우)
- 뛰어난 압축 기능이 필요

Arrow를 선택해야 하는 경우:

- 실시간 데이터 처리가 필요
- 더 빠른 쿼리 속도를 원함
- 서로 다른 언어나 프로세스에서 작업
- 인메모리 구조의 장점이 필요

최고의 도구는 사용 사례에 가장 적합한 도구입니다. 각 데이터 저장 형식의 장단점을 이해하는 것이 올바른 결정을 내리는 핵심입니다.
