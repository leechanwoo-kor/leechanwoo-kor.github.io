---
title: "[Data Cleaning] 04. Character Encodings (문자 인코딩)"
categories:
  - Data Cleaning
tags:
  - Data Cleaning
toc: true
toc_sticky: true
toc_label: "Character Encodings"
toc_icon: "sticky-note"
---

<br>![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/af91093f-993a-430e-8ded-d5107098faf1){: .align-center}<br>

이 포스에서는 다양한 문자 인코딩으로 작업할 것입니다.

<br>

## Get our environment set up

가장 먼저 해야 할 일은 사용할 라이브러리를 로드하는 것입니다. 하지만 데이터 세트는 나중에 다루겠습니다!

```python
# modules we'll use
import pandas as pd
import numpy as np

# helpful character encoding module
import charset_normalizer

# set seed for reproducibility
np.random.seed(0)
```

<br>

## What are encodings?

**문자 인코딩(character encodings)** 은 원시 바이너리 바이트 문자열(예: 0110100001101001)을 사람이 읽을 수 있는 텍스트(예: "hi")를 구성하는 문자로 매핑하기 위한 특정 규칙 집합입니다. 다양한 인코딩이 있으며, 원래 작성된 인코딩과 다른 인코딩으로 텍스트를 읽으려고 하면 'mojibake'(mo-gee-bah-kay처럼 말함)라는 스크램블된 텍스트가 나오게 됩니다. 다음은 모지바케의 예시입니다:

æ–‡å—åŒ–ã??

"unknwon" 문자로 끝날 수도 있습니다. 바이트 문자열을 읽는 데 사용하는 인코딩에 특정 바이트와 문자 사이에 매핑이 없을 때 다음과 같이 인쇄되는 경우가 있습니다:

����������

오늘날에는 문자 인코딩 불일치가 예전보다 덜 흔하지만 여전히 문제가 되는 것은 분명합니다. 다양한 문자 인코딩이 있지만 여러분이 알아야 할 주요 인코딩은 UTF-8입니다.

> UTF-8은 표준 텍스트 인코딩입니다. 모든 Python 코드는 UTF-8로 되어 있으며, 이상적으로는 모든 데이터도 그래야 합니다. UTF-8이 아닐 때 문제가 발생합니다.

Python 2에서는 인코딩을 처리하기가 꽤 어려웠지만 다행히도 Python 3에서는 훨씬 더 간단해졌습니다. Python 3에서 텍스트로 작업할 때 마주하게 되는 데이터 유형에는 크게 두 가지가 있습니다. 하나는 기본적으로 텍스트가 되는 문자열입니다.

```python
# start with a string
before = "This is the euro symbol: €"

# check to see what datatype it is
type(before)
```

```
str
```

다른 데이터는 정수의 시퀀스인 [바이트(bytes)](https://docs.python.org/3.1/library/functions.html#bytes) 데이터 유형입니다. 문자열이 어떤 인코딩으로 되어 있는지 지정하여 문자열을 바이트로 변환할 수 있습니다:

```python
# encode it to a different encoding, replacing characters that raise errors
after = before.encode("utf-8", errors="replace")

# check the type
type(after)
```

```
bytes
```

바이트 객체를 보면 앞에 b가 있고 그 뒤에 텍스트가 있는 것을 볼 수 있습니다. 이는 바이트가 마치 ASCII로 인코딩된 문자처럼 출력되기 때문입니다. (ASCII는 영어 이외의 다른 언어를 쓰는 데는 실제로 작동하지 않는 오래된 문자 인코딩입니다.) 여기서 유로 기호가 마치 ASCII 문자열인 것처럼 인쇄될 때 "\xe2\x82\xac"처럼 보이는 mojibake로 대체된 것을 볼 수 있습니다.

```python
# take a look at what the bytes look like
after
```

```
b'This is the euro symbol: \xe2\x82\xac'
```

바이트를 올바른 인코딩을 사용하여 문자열로 다시 변환하면 텍스트가 모두 올바르게 표시되는 것을 확인할 수 있습니다! :)

```python
# convert it back to utf-8
print(after.decode("utf-8"))
```

```
This is the euro symbol: €
```

하지만 다른 인코딩을 사용하여 바이트를 문자열로 매핑하려고 하면 오류가 발생합니다. 이는 사용하려는 인코딩이 전달하려는 바이트를 어떻게 처리할지 모르기 때문입니다. 바이트 문자열이 실제로 있어야 하는 인코딩을 파이썬에 알려줘야 합니다.

> 다양한 인코딩은 음악을 녹음하는 다양한 방법으로 생각할 수 있습니다. 같은 음악을 CD, 카세트 테이프 또는 8-track에 녹음할 수 있습니다. 음악은 거의 동일하게 들릴 수 있지만 각 레코딩 형식의 음악을 재생하려면 올바른 장비를 사용해야 합니다. 올바른 디코더는 카세트 플레이어 또는 CD 플레이어와 같습니다. 카세트를 CD 플레이어로 재생하려고 하면 작동하지 않습니다.

```python
# try to decode our bytes with the ascii encoding
print(after.decode("ascii"))
```

<div class="notice--danger" markdown="1">
---------------------------------------------------------------------------
UnicodeDecodeError                        Traceback (most recent call last)
/tmp/ipykernel_19/27547290.py in <module>
      1 # try to decode our bytes with the ascii encoding
----> 2 print(after.decode("ascii"))

UnicodeDecodeError: 'ascii' codec can't decode byte 0xe2 in position 25: ordinal not in range(128)
</div>

잘못된 인코딩을 사용하여 문자열을 바이트 단위로 매핑하려고 할 때도 문제가 발생할 수 있습니다. 앞서 말했듯이 파이썬 3에서 문자열은 기본적으로 UTF-8이므로 다른 인코딩처럼 처리하려고 하면 문제가 발생할 수 있습니다.

예를 들어 `encode()`를 사용하여 문자열을 ASCII용 바이트로 변환하려고 하면 텍스트가 ASCII일 때와 같은 바이트가 되도록 요청할 수 있습니다. 하지만 텍스트가 ASCII가 아니기 때문에 처리할 수 없는 문자가 있을 것입니다. ASCII가 처리할 수 없는 문자를 자동으로 대체할 수 있습니다. 그러나 그렇게 하면 ASCII가 아닌 문자는 알 수 없는 문자로 대체됩니다. 그런 다음 바이트를 다시 문자열로 변환할 때 해당 문자는 알 수 없는 문자로 대체됩니다. 이 경우 위험한 부분은 어떤 문자여야 했는지 알 방법이 없다는 것입니다. 즉, 데이터를 사용할 수 없게 만들 수 있다는 뜻입니다!

```python
# start with a string
before = "This is the euro symbol: €"

# encode it to a different encoding, replacing characters that raise errors
after = before.encode("ascii", errors = "replace")

# convert it back to utf-8
print(after.decode("ascii"))

# We've lost the original underlying byte string! It's been 
# replaced with the underlying byte string for the unknown character :(
```

```
This is the euro symbol: ?
```

이것은 나쁜 일이며 우리는 이를 피하고 싶습니다! 가능한 한 빨리 모든 텍스트를 UTF-8로 변환하고 해당 인코딩을 유지하는 것이 훨씬 낫습니다. UTF-8이 아닌 입력을 UTF-8로 변환하기 가장 좋은 시기는 다음에 설명할 파일을 읽을 때입니다.

<br>

## 인코딩 문제가 있는 파일에서 읽기

대부분의 파일은 아마도 UTF-8로 인코딩되어 있을 것입니다. 파이썬이 기본적으로 예상하는 인코딩이므로 대부분의 경우 문제가 발생하지 않습니다. 그러나 때때로 다음과 같은 오류가 발생할 수 있습니다:

```python
# try to read in a file not in UTF-8
kickstarter_2016 = pd.read_csv("../input/kickstarter-projects/ks-projects-201612.csv")
```

<div class="notice--danger" markdown="1">
---------------------------------------------------------------------------
UnicodeDecodeError                        Traceback (most recent call last)
/tmp/ipykernel_19/3982885289.py in <module>
      1 # try to read in a file not in UTF-8
----> 2 kickstarter_2016 = pd.read_csv("../input/kickstarter-projects/ks-projects-201612.csv")

/opt/conda/lib/python3.7/site-packages/pandas/util/_decorators.py in wrapper(*args, **kwargs)
    309                     stacklevel=stacklevel,
    310                 )
--> 311             return func(*args, **kwargs)
    312 
    313         return wrapper

/opt/conda/lib/python3.7/site-packages/pandas/io/parsers/readers.py in read_csv(filepath_or_buffer, sep, delimiter, header, names, index_col, usecols, squeeze, prefix, mangle_dupe_cols, dtype, engine, converters, true_values, false_values, skipinitialspace, skiprows, skipfooter, nrows, na_values, keep_default_na, na_filter, verbose, skip_blank_lines, parse_dates, infer_datetime_format, keep_date_col, date_parser, dayfirst, cache_dates, iterator, chunksize, compression, thousands, decimal, lineterminator, quotechar, quoting, doublequote, escapechar, comment, encoding, encoding_errors, dialect, error_bad_lines, warn_bad_lines, on_bad_lines, delim_whitespace, low_memory, memory_map, float_precision, storage_options)
    584     kwds.update(kwds_defaults)
    585 
--> 586     return _read(filepath_or_buffer, kwds)
    587 
    588 

/opt/conda/lib/python3.7/site-packages/pandas/io/parsers/readers.py in _read(filepath_or_buffer, kwds)
    480 
    481     # Create the parser.
--> 482     parser = TextFileReader(filepath_or_buffer, **kwds)
    483 
    484     if chunksize or iterator:

/opt/conda/lib/python3.7/site-packages/pandas/io/parsers/readers.py in __init__(self, f, engine, **kwds)
    809             self.options["has_index_names"] = kwds["has_index_names"]
    810 
--> 811         self._engine = self._make_engine(self.engine)
    812 
    813     def close(self):

/opt/conda/lib/python3.7/site-packages/pandas/io/parsers/readers.py in _make_engine(self, engine)
   1038             )
   1039         # error: Too many arguments for "ParserBase"
-> 1040         return mapping[engine](self.f, **self.options)  # type: ignore[call-arg]
   1041 
   1042     def _failover_to_python(self):

/opt/conda/lib/python3.7/site-packages/pandas/io/parsers/c_parser_wrapper.py in __init__(self, src, **kwds)
     67         kwds["dtype"] = ensure_dtype_objs(kwds.get("dtype", None))
     68         try:
---> 69             self._reader = parsers.TextReader(self.handles.handle, **kwds)
     70         except Exception:
     71             self.handles.close()

/opt/conda/lib/python3.7/site-packages/pandas/_libs/parsers.pyx in pandas._libs.parsers.TextReader.__cinit__()

/opt/conda/lib/python3.7/site-packages/pandas/_libs/parsers.pyx in pandas._libs.parsers.TextReader._get_header()

/opt/conda/lib/python3.7/site-packages/pandas/_libs/parsers.pyx in pandas._libs.parsers.TextReader._tokenize_rows()

/opt/conda/lib/python3.7/site-packages/pandas/_libs/parsers.pyx in pandas._libs.parsers.raise_parser_error()

UnicodeDecodeError: 'utf-8' codec can't decode byte 0x99 in position 7955: invalid start byte
</div>

UTF-8 바이트를 ASCII인 것처럼 디코딩하려고 할 때와 동일한 `UnicodeDecodeError`가 발생하는 것을 주목하세요! 이는 이 파일이 실제로 UTF-8이 아니라는 것을 알려줍니다. 하지만 실제로 어떤 인코딩인지 알 수 없습니다. 이를 알아내는 한 가지 방법은 여러 가지 문자 인코딩을 테스트하여 어떤 것이 작동하는지 확인하는 것입니다. 하지만 더 좋은 방법은 charset_normalizer 모듈을 사용하여 올바른 인코딩이 무엇인지 자동으로 추측하는 것입니다. 100% 정확하다고 보장할 수는 없지만 일반적으로 그냥 추측하는 것보다 빠릅니다.

이 파일의 처음 1만 바이트만 살펴보겠습니다. 이 정도면 일반적으로 인코딩이 무엇인지 추측하기에 충분하며 전체 파일을 살펴보는 것보다 훨씬 빠릅니다. (특히 큰 파일에서는 속도가 매우 느려질 수 있습니다.) 파일의 첫 부분만 살펴보는 또 다른 이유는 오류 메시지를 보면 첫 번째 문제가 11번째 문자라는 것을 알 수 있기 때문입니다. 따라서 파일의 첫 부분만 살펴봐도 무슨 일이 일어나고 있는지 파악할 수 있습니다.

```python
# look at the first ten thousand bytes to guess the character encoding
with open("../input/kickstarter-projects/ks-projects-201801.csv", 'rb') as rawdata:
    result = charset_normalizer.detect(rawdata.read(10000))

# check what the character encoding might be
print(result)
```

```
{'encoding': 'utf-8', 'language': 'English', 'confidence': 1.0}
```

따라서 문자셋_노멀라이저는 73%의 신뢰도로 올바른 인코딩이 "Windows-1252"라고 확신합니다. 이것이 맞는지 확인해 봅시다:

```python
# read in the file with the encoding detected by charset_normalizer
kickstarter_2016 = pd.read_csv("../input/kickstarter-projects/ks-projects-201612.csv", encoding='Windows-1252')

# look at the first few lines
kickstarter_2016.head()
```

```
/opt/conda/lib/python3.7/site-packages/IPython/core/interactiveshell.py:3553: DtypeWarning: Columns (13,14,15) have mixed types.Specify dtype option on import or set low_memory=False.
  exec(code_obj, self.user_global_ns, self.user_ns)
```

|   | ID         | name                                              | category       | main_category | currency | deadline            | goal  | launched            | pledged | state      | backers | country | usd pledged | Unnamed: 13 | Unnamed: 14 | Unnamed: 15 | Unnamed: 16 |
|---|------------|---------------------------------------------------|----------------|---------------|----------|---------------------|-------|---------------------|---------|------------|---------|---------|-------------|-------------|-------------|-------------|-------------|
| 0 | 1000002330 | The Songs of Adelaide & Abullah                   | Poetry         | Publishing    | GBP      | 2015-10-09 11:36:00 | 1000  | 2015-08-11 12:12:28 | 0       | failed     | 0       | GB      | 0           | NaN         | NaN         | NaN         | NaN         |
| 1 | 1000004038 | Where is Hank?                                    | Narrative Film | Film & Video  | USD      | 2013-02-26 00:20:50 | 45000 | 2013-01-12 00:20:50 | 220     | failed     | 3       | US      | 220         | NaN         | NaN         | NaN         | NaN         |
| 2 | 1000007540 | ToshiCapital Rekordz Needs Help to Complete Album | Music          | Music         | USD      | 2012-04-16 04:24:11 | 5000  | 2012-03-17 03:24:11 | 1       | failed     | 1       | US      | 1           | NaN         | NaN         | NaN         | NaN         |
| 3 | 1000011046 | Community Film Project: The Art of Neighborhoo... | Film & Video   | Film & Video  | USD      | 2015-08-29 01:00:00 | 19500 | 2015-07-04 08:35:03 | 1283    | canceled   | 14      | US      | 1283        | NaN         | NaN         | NaN         | NaN         |
| 4 | 1000014025 | Monarch Espresso Bar                              | Restaurants    | Food          | USD      | 2016-04-01 13:38:27 | 50000 | 2016-02-26 13:38:27 | 52375   | successful | 224     | US      | 52375       | NaN         | NaN         | NaN         | NaN         |

네, charset_normalizer가 옳은 것 같습니다! 파일은 문제 없이 읽혀지고(데이터 유형에 대한 경고가 표시되긴 하지만) 처음 몇 행을 보면 정상적으로 보입니다.

> **charset_normalizer가 추측한 인코딩이 옳지 않다면 어떻게 해야 할까요?** 문자셋_노멀라이저는 기본적으로 추측에 불과하기 때문에 때때로 잘못된 인코딩을 추측할 수 있습니다. 한 가지 시도해 볼 수 있는 방법은 파일을 더 많이 또는 적게 살펴보고 다른 결과가 나오는지 확인한 다음 시도해 보는 것입니다.

## UTF-8 인코딩으로 파일 저장하기

마지막으로, 파일을 UTF-8로 인코딩하는 모든 과정을 거쳤다면 파일을 그대로 유지하고 싶을 것입니다. 가장 쉬운 방법은 UTF-8 인코딩으로 파일을 저장하는 것입니다. 좋은 소식은 UTF-8이 파이썬의 표준 인코딩이기 때문에 파일을 저장하면 기본적으로 UTF-8로 저장된다는 것입니다:

```python
# save our file (will be saved as UTF-8 by default!)
kickstarter_2016.to_csv("ks-projects-201801-utf8.csv")
```
