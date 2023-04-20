---
title: "[Programming] HTTP 상태 코드 정리"
categories:
  - Programming
tags:
  - HTTP STATUS CODE
toc: true
toc_sticky: true
toc_label: "HTTP 상태 코드 정리"
toc_icon: "sticky-note"
---

# 상태 코드란?

상태 코드는 클라이언트와 서버 간의 통신상태를 나타내는 일련의 표준화된 코드 모음이다.

클라이언트는 해당 요청에 대한 실패, 처리완료 또는 잘못된 요청 등에 대한 피드백을 상태 코드를 통해 서버에게 보낸 요청이 어떻게 처리되었는지 알 수 있다.

---

상태 코드는 3자릿수 숫자로 만들어져 있으며, 각 첫번째 자리의 수로 그룹을 구분한다.

1xx : 정보 응답 / 2xx : 성공 응답 / 3xx : 리다이렉트 / 4xx : 클라이언트 요청 오류 / 5xx : 서버 오류

<br>

## 1XX : Information responses
**: 요청을 받았으며 작업을 계속 진행**

- 100 Continue 
  - 진행 중임을 의미하는 응답 코드이다. 현재까지의 진행상태에 문제가 없으며, 클라이언트가 계속해서 요청을 하거나 이미 요청을 완료한 경우에는 무시해도 되는 것을 알려준다.
- 101 Switching Protocol
  - 클라이언트에 의해 보낸 업그레이드 요청 헤더에 대한 응답으로 보내진다.
  - 이 응답 코드는 클라이언트가 보낸 Upgrade 요청 헤더에 대한 응답에 들어가며, 서버에서 프로토콜을 변경할 것임을 알려준다.
  - 해당 코드는 Websocket 프로토콜 전환 시 사용된다.
- ~~102 Processing~~
  - ~~이 코드는 서버가 요청을 수신하였으며 이를 처리하고 있지만, 아직 제대로 된 응답을 알려줄 수 없음을 알려준다.~~
- 103 Early Hints
  - 서버가 응답을 준비하는 동안 사용자 에이전트가 사전 로딩을 시작할 수 있도록 한다.

<br>

## 2XX : Successful responses
**: 요청을 성공적으로 받았으며 처리했음**

- **200 OK**
  - 요청을 정상적으로 처리함. 정보는 요청에 따른 응답으로 반환
- **201 Created**
  - 성공적으로 생성에 대한 요청을 받았으며 그 결과로 서버가 새 리소스를 작성 (일반적으로 POST 또는 PUT 요청의 응답)
- 202 Accepted
  - 요청을 수신하였지만 아직 처리하지 않은 상태
- 203 Non-Authoritative Information
  - 요청을 성공적으로 처리했지만 다른 소스에서 수신된 정보를 제공  (신뢰할 수 없는 정보)
- **204 No Content**
  - 요청을 성공적으로 처리했지만 제공할 컨텐츠는 없음
- 205 Reset Content
  - 요청을 성공적으로 처리했지만 새로운 내용을 확인해야 함을 알려줌 (새로고침 등을 이용)
- 206 Partial Content
  - 서버가 GET 요청의 일부만 성공적으로 처리했음을 알려줌 (클라이언트가 이어받기를 시도하면 웹서버가 이에 대한 응답코드로 '206 Partial Content'와 함께 Range 헤더에 명시된 데이터의 부분(byte)부터 전송을 시작)
- ~~207 Multi Status~~
  - ~~여러 개의 리소스가 여러 Status Code를 갖고 있는 상황에서 적절한 정보 전달을 함.~~

<br>

## 3XX : Redirection messages
**: 클라이언트의 요청에 대해 적절한 위치를 제공하거나 대안의 응답을 제공**

- 300 Multiple Choice
  - 클라이언트가 동시에 여러 응답이 가능한 요청을 보냈을 경우 클라이언트의 선택지를 반환
- **301 Moved Permanently**
  - 요청한 리소스의 URI가 변경되었음을 의미한다. (변경된 URI에 대한 정보와 함께 응답)
- 302 Found
  - 요청한 리소스의 URI가 일시적으로 변경되었음 (향후에 재요청 할 시 원래 요청했던 URI로 요청해야함)
- 303 See Other
  - 클라이언트가 요청한 작업을 하기 위해서 다른 URI에서 얻어야 할 때 서버가 클라이언트에게 줌
- **304 Not Modified**
  - 이전의 요청과 비교하여 달라진 것이 없음을 의미 (캐시를 목적으로 사용됨)
- ~~305 Use Proxy~~
  - ~~Proxy를 통해 요청되어야 함~~
- ~~306 Unused~~
  - ~~지금은 사용하지 않는 코드 (추후 사용을 위해 예약되어 있음)~~
- 307 Temporary Redirect
  - 302와 동일한 의미를 가지나, 클라이언트가 보낸 HTTP 메소드도 변경하면 안됨
- 308 Permanent Redirect
  - 요청한 리소스가 다른 URI에 위치하고 있음 301과 동일한 의미를 가지나, HTTP 메소드도 변경하면 안됨

<p class="notice--warning">
※ 최초의 요청 방법(HTTP Method)를 유지하지 않고 GET으로 변경시키며 리다이렉트 하는 것이 301 또는 302이고, <br>
원래의 HTTP Method를 유지하면서 리다이렉트 시키는 것이 307 또는 308이다. ※
</p>

<br>

## 4XX : Client error responses
**: 클라이언트의 잘못된 요청** 

- 400 Bad Request
  - 잘못된 문법으로 요청을 보내 서버가 이해할 수 없음을 의미
- **401 Unauthorized**
  - 클라이언트가 인증되지 않았거나, 유효한 인증 정보가 부족하여 요청이 거부됨
- ~~402 Payment Required~~
  - ~~결제 시스템을 위해 만들어졌으나 현재는 사용하지 않음~~
- **403 Forbidden**
  - 클라이언트가 요청한 컨텐츠에 접근할 권한이 없음 (신원 인증은 되었지만 권한이 없음)
- **404 Not Found**
  - 클라이언트가 요청한 URI를 찾을 수 없음
- **405 Method Not Allowed**
  - 클라이언트가 보낸 메소드가 해당 URI에서 지원하지 않음
- 406 Not Acceptable
  - 클라이언트의 요청에 대해 응답할만한 컨텐츠가 없음
- 407 Proxy Authentication Required
  - 401과 동일하나, proxy를 통해 인증해야 함
- 408 Request Timeout
  - 요청에 응답 시간이 오래 걸려 요청을 끊음
- 409 Conflict
  - 클라이언트의 요청이 서버의 상태와 충돌이 발생
- 410 Gone
  - 요청한 URI가 더 이상 사용되지 않고 사라짐
- 411 Length Required
  - 요청 헤더에 Content-length가 포함되어야 함
- 412 Precondition Failed
  - 요청 헤더의 조건이 서버의 조건에 적절하지 않음
- 413 Payload Too Large
  - request payload가 서버에서 정의한 최대 크기보다 큼
- 414 URI Too Long
  - 요청된 URI가 너무 길어서 처리할 수 없음
- 415 Unsupported Media Type
  - 서버가 지원하지 않는 미디어 포맷을 요청함
- 416 Requested Range Not Satisfiable
  - 요청 헤더에 있는 Range 필드가 잘못됨
- 417 Expectation Failed
  - 요청 헤더에 있는 Expect 필드가 적절하지 않음
- ~~421 Misdirected Request~~
  - ~~요청이 응답을 생성할 수 없는 서버로 지정됨~~
- 422 Unprocessable Entity
  - 문법 오류로 인하여 처리할 수 없음
- ~~423 Locked~~
  - ~~요청한 리소스에 접근하는 것이 잠겨있음~~
- ~~424 Failed Dependency~~
  - ~~이전 요청이 실패했기 때문에 현재의 요청도 실패했음~~
- 426 Upgrade Required
  - 지금의 프로토콜을 사용하여 요청을 처리하지 못함. 클라이언트가 업그레이드를 하면 처리 할 수도.(업그레이드 필요)
- 428 Precondition Required
  - 필수 전제 조건 헤더가 누락됨
- 429 Too Many Requests
  - 클라이언트가 지정된 시간에 너무 많은 요청을 보냄
- 431 Request Header Fields Too Large
  - 요청한 헤더 필드가 너무 커서 처리 불가. 헤더 필드를 줄여서 다시 요청해야 함
- 451 Unavailable For Legal Reasons
  - 클라이언트가 요청한 것은 정부에 의해 검열된 불법적인 리소스임을 알림

<br>

## 5XX : Server error responses
**: 정상적인 클라이언트의 요청에 대해 서버의 문제로 인해 응답할 수 없음**

- 500 Internal Server Error 
  - 서버의 문제로 응답할 수 없음 (정확한 문제에 대해 구체적으로 설명불가)
- 501 Not Implemented
  - 서버가 지원하지 않는 새로운 메소드를 사용하여 요청함 클라이언트 요청에 대해 서버가 수행할 수 있는 기능이 없음
- 502 Bad Gateway
  - 서버 위의 서버에서 오류 발생 (proxy 혹은 gateway 등에서 응답)
- **503 Service Unavailable**
  - 현재 서버는 일시적으로 사용이 불가함 (일반적인 원인은 유지보수로 인한 중단, 서버 과부하)
- 504 Gateway Timeout
  - 서버가 다른 서버로 요청을 보냈으나 delay 발생으로 처리 불가능
- 505 HTTP Version Not Supported
  - 요청에 사용된 HTTP 버전은 서버에서 지원되지 않음
- 506 Variant Also Negotiates 
  - 서버에 내부 구성 오류가 있음
- 507 Insufficient Storage
  - 서버에 내부 구성 오류가 있음
- 508 Loop Detected
  - 서버가 요청을 처리하는 동안 무한 루프를 감지
- 510 Not Extended
  - 서버가 요청을 처리하려면 요청에 대한 추가 확장이 필요
- 511 Network Authentication Required
  - 클라이언트가 네트워크 액세스를 얻기 위해 인증이 필요
