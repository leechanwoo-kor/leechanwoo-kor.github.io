- AI랩에서 R&D 목적으로 LLM을 AWS GPU 환경에서 성능 테스트 해보려고 함
  - 테스트 모델
    - MiniGPT-4(w/ Llama-2-7b-chat-hf) -> 최소 20GB GPU 필요
    - KORLLM(KoAlpaca-Polyglot-8B, Polyglot-Kor-5-8B, Kullm-polyglot-12-8b-v2) -> 최소 80GB GPU 필요, 단일 A100 수준
  - 예상 AWS 인스턴스 최소사양
    - ml.g5.2xlarge
    - ml.g5.12xlarge

<br>

<details>
<summary>AWS</summary>

- Sagemaker
- EC2
- S3
- IAM
- Certification

</details>
 
<br>

### Amazon SageMaker

- 완전 관리형 머신러닝 서비스
- **구축**
  - 사전에 빌드된 노트북 인스턴스
  - 고도로 최적화된 머신러닝 알고리즘 제공
  - 노트북 인스턴스: Jupyter 노트북 앱을 실행하는 종합관리형 ML 컴퓨팅 인스턴스
- **학습**
  - 한번 클릭으로 ML, DL, 커스텀 알고리즘 학습
  - 하이퍼파라미터 최적화를 통한 손쉬운 학습
  - 어떤 프레임워크던지 모두 수행 가능
- **세이지메이커 지원 프레임워크**
  - MxNet, TensorFlow, PyTorch, Chainer, Gluon, Keras 등
- **배포**: 엔지니어링 업무(서버 생성, 웹서비스 구축, 엔드포인트 생성 등)이 필요없이 배포 가능
- **확장성 있는 완전 관리형 모델 호스팅**
