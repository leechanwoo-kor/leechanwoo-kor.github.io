---
title: "[Docker] Docker Compose Cheatsheet"
categories:
  - Docker
tags:
  - Docker
  - Docker Compose
  - Cheatsheet
toc: true
toc_sticky: true
toc_label: "Docker Compose Cheatsheet"
toc_icon: "sticky-note"
---

<br>

<img width="2400" height="1260" alt="image" src="https://github.com/user-attachments/assets/e098ec0b-19ef-4090-9a0e-3fa02c88be00" />

<br>

## Compose File Reference: docker-compose.yml

**Core structure:**

```yaml
version: '3'

services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"   # 호스트 포트 8080:컨테이너 포트 80
  db:
    image: postgres
    environment:            # 환경 변수
      POSTGRES_PASSWORD: example
    volumes:
      - db_data:/var/lib/postgresql/data

networks:          # 사용자 지정 네트워크
  appnet:
    driver: bridge

volumes:           # 명명된 볼륨
  db_data:
```

- **services**: 멀티컨테이너 앱의 각 컨테이너. 위의 예시에는 web과 db라는 두 가지 서비스가 있습니다.
- **networks & volumes**: 격리된 네트워크와 지속적인 스토리지 정의. 위의 예시에는 appnet 네트워크와 db_data 볼륨이 있습니다.

## Examples

### Single service with port mapping

```yaml
services:
  app:
    build: .
    ports:
      - "8000:80"   # 호스트 포트 8080:컨테이너 포트 80
```

호스트 포트 8000에서 앱을 노출하고 현재 디렉토리의 Dockerfile에서 빌드합니다.

### Multi-service with shared volume and custom network

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - type: bind
        source: ./app
        target: /app
    networks:
      - mynet
  db:
    image: postgres
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - mynet

networks:
  mynet:

volumes:
  db_data:
```

`web`과 `db`가 동일한 네트워크에 있으며, `db`는 지속적으로 명명된 볼륨인 `db_data`를 사용합니다.

### Using build context and Dockerfile path

docker-compose.yaml에서 Dockerfile에 지정된 요청에 따라 도커 이미지를 빌드할 수 있습니다.

```yaml
services:
  app:
    build:
      context: .
      dockerfile: docker/MyDockerfile
```

### Sharing data between services

```yaml
services:
  web:
    image: nginx
    volumes:
      - shared_data:/usr/share/nginx/html
  worker:
    image: myworker
    volumes:
      - shared_data:/usr/src/app/data

volumes:
  shared_data:
```

두 서비스 모두 동일한 볼륨(정적 파일 또는 데이터 교환용)인 `shared_data`에 액세스합니다.

## Advanced Compose File Options

- **environment**: 컨테이너의 ENV 변수를 설정합니다.
- **depends_on**: 제어 서비스 시작 순서.
- **deploy.replicas**: 스웜 모드에서 서비스 확장

**Example:**

```yaml
services:
  web:
    image: nginx
    deploy:
      replicas: 3
    depends_on:
      - db
```

3개의 웹 인스턴스를 시작하며, 시작 순서만 제어합니다(준비되지 않음).

## Essential Docker Compose Commands

|Command|Description|Example Usage|
|:---|:---|:---|
|docker-compose up|컨테이너 생성 및 시작|docker-compose up|
|docker-compose up -d|백그라운드에서 실행|docker-compose up -d|
|docker-compose exec|명령어 실행하기|docker-compose exec web bash|
|docker-compose build|이미지 빌드/리빌드|docker-compose build|
|docker-compose down|컨테이너, 네트워크, 볼륨 및 이미지 중지 및 제거|docker-compose down|
|docker-compose logs -f|로그 보기|docker-compose logs -f|
|docker-compose ps|실행 중인 컨테이너 목록|docker-compose ps|
|docker-compose run|일회용 명령어 실행(컴포즈 파일의 bypasses 명령어)|docker-compose run web python manage.py migrate|
|docker-compose stop|컨테이너 실행 중지(시작과 함께 재시작 가능)|docker-compose stop|
|docker-compose restart|서비스 재시작|docker-compose restart web|
|docker-compose pull|서비스 이미지 풀|docker-compose pull|
|docker-compose rm|중지된 서비스 컨테이너 제거|docker-compose rm web|
|docker-compose config|검증 및 파일 보기|docker-compose config|
|docker-compose up --scale web=3|서비스 도커의 여러 인스턴스 시작하기|docker-compose up --scale web=3|

## Common Compose Patterns

- **지속적인 데이터가 포함된 데이터베이스**

```yaml
services:
  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: password
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

DB 데이터는 컨테이너 재시작 시 `mysql_data` 볼륨 지속

- **개발을 위한 마운트 코드 바인딩**

```yaml
services:
  app:
    build: .
    volumes:
      - .:/app
```

호스트에서 실시간 편집 코드가 컨테이너에 자동으로 반영

## Useful Flags

- `-d`: 분리(detach) 모드(백그라운드에서 실행)
- --build: 시작하기 전에 이미지를 강제로 빌드
- `--force-recreate`: 강제 컨테이너 재생성
- `--remove-orphans`: Compose 파일에 정의되지 않은 컨테이너 제거

## Defining and Customizing Services

Docker Compose에서 **서비스, 네트워크 및 볼륨을 정의하고 사용자 지정**할 수 있는 `docker-compose.yml` 파일을 활용하여 애플리케이션의 모든 구성 및 오케스트레이션 요구 사항을 중앙 집중화할 수 있습니다.

- 서비스는 `service` 키 아래에 정의되어 있습니다.
- 각 서비스는 컨테이너 구성을 나타내며, 여기서 설정할 수 있습니다:
  - **Image**: 도커 허브 또는 다른 레지스트리에서 이미지를 선택합니다.
  - **Ports**: 컨테이너 포트를 호스트 포트에 매핑합니다.
  - **Environment variables**: 구성 값을 전달합니다.
  - **Volumes**: 데이터를 유지하거나 호스트 또는 기타 서비스와 파일/폴더를 공유합니다.
  - **Networks**: 서비스가 액세스할 수 있는 네트워크를 제어합니다.

**Example:**

```yaml
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"   # Host port 8080:Container port 80
    environment:
      - NGINX_HOST=localhost
    volumes:
      - web_data:/usr/share/nginx/html
    networks:
      - frontend

  db:
    image: postgres:13
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - backend
```

여기서 `web` 서비스는 nginx 이미지를 사용하여 환경 변수를 설정하고 볼륨을 할당한 다음 호스트에서 포트 80을 8080으로 열고 `frontend` 네트워크에 연결합니다. `db` 서비스는 PostgreSQL에서도 유사한 작업을 수행합니다.

## Customizing Networks

- **네트워크**는 어떤 서비스가 통신할 수 있는지 제어합니다. Compose는 기본 네트워크를 생성하지만, 더 많은 것을 정의하고, 사용자 지정 드라이버를 지정하고, 옵션을 설정하고, 세분화된 격리를 위해 어떤 서비스가 어떤 네트워크에 가입할지 결정할 수 있습니다.
- `networks` 아래 최상위 수준의 네트워크를 정의하고, 서비스 수준의 `networks` 키를 사용하여 서비스가 연결해야 하는 네트워크를 나열합니다.

**Example:**

```yaml
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    driver_opts:
      com.docker.network.bridge.host_binding_ipv4: "127.0.0.1"
```

- 서비스에 네트워크 연결:

```yaml
services:
  app:
    networks:
      - frontend
      - backend
  db:
    networks:
      - backend
```

이 설정을 통해 `app` 서비스는 `frontend`와 `backend` 네트워크의 사용자 모두에게 접근할 수 있으며, `db`는 `backend` 내에서만 접근할 수 있습니다.

## Customizing Volumes

- **볼륨**은 최상위 `volumes` 키 아래에 정의됩니다. 서비스의 `volumes` 키를 사용하여 컨테이너에 마운트합니다.
- 볼륨을 명명하고, 사용자 지정 드라이버를 사용하며, 데이터 지속성과 공유를 위해 여러 서비스에서 공유할 수 있습니다.

**Example:**

```yaml
volumes:
  web_data:                # 웹 콘텐츠의 명명된 볼륨
  db_data:                 # 데이터베이스의 명명된 볼륨

services:
  web:
    volumes:
      - web_data:/usr/share/nginx/html

  db:
    volumes:
      - db_data:/var/lib/postgresql/data
```

In this example, web_data is persisted and available to any container that mounts it. db_data ensures database data is never lost upon container recreation.
You can define bind-mounts with custom driver options for advanced cases:

- 이 예제에서 `web_data`는 컨테이너를 마운트하는 모든 컨테이너에 지속되어 사용할 수 있습니다. `db_data`는 컨테이너를 재생성할 때 데이터베이스 데이터가 손실되지 않도록 보장합니다.
- 고급 케이스에 대한 사용자 지정 드라이버 옵션으로 바인딩 마운트를 정의할 수 있습니다:

```yaml
volumes:
  db_data:
    driver: local
    driver_opts:
      type: none
      device: /data/db_data
      o: bind
```

이 구성은 호스트 경로 `/data/db_data`에서 컨테이너로 바인딩 마운트를 설정합니다.


### 모범 사례 요약

- 서비스 이름을 서비스 간 통신을 위한 DNS 호스트 이름으로 사용하세요.
- 접근을 제어하기 위해 필요에 따라 여러 네트워크에 서비스를 연결하세요.
- 영구 저장 및 데이터 공유를 위해 명명된 볼륨을 사용하세요.
- YAML을 사용하여 모든 것을 정의하여 버전 제어와 간편한 배포 스크립트를 가능하게 합니다.

## Multiple compose files

Docker Compose에서 **복잡한 멀티 서비스 설정을 구성**하려면 **여러 개의 컴포즈 파일을 사용하고 파일을 덮어쓰면** 모듈식, 환경별, 확장 가능한 구성이 가능합니다. 이 방법은 다음과 같습니다:

### 1. 기본 및 덮어쓰기 파일 구조

- 모든 일반적인 기본 서비스 정의를 포함하는 기본 파일(`compose.yaml` 또는 `docker-compose.yml`)을 만듭니다.
- 환경별 오버라이드 파일(예: `docker-compose.override.yml`, `docker-compose.dev.yml`, `docker-compose.prod.yml`)을 추가합니다.

**Example file structure:**

```bash
/project-directory
|-- docker-compose.yml           # 기본 구성
|-- docker-compose.override.yml  # 로컬/개발자 오버라이드(자동 적용)
|-- docker-compose.prod.yml      # 프로덕션 오버라이드
|-- docker-compose.test.yml      # 테스트 오버라이드(필요한 경우)
```

_기본 구성은 핵심 서비스를 정의하며, 각 오버라이드는 특정 환경이나 사례에 맞게 설정을 맞춤화합니다._

### 2. 파일 오버라이드 작업 방식

- **Merging**: `docker compose up`을 명령하면 도커 컴포즈가 베이스를 순서대로 오버라이드하여 병합합니다. 이후 파일은 오버라이드, 확장 또는 이전 파일의 설정에 추가됩니다
- **Overriding Fields**: 서비스 또는 필드가 여러 파일에 정의된 경우 마지막으로 지정된 파일의 값이 사용됩니다. 새 필드가 추가됩니다.

**Example merge:**

- `docker-compose.yml`:

```yaml
services:
  web:
    image: myapp
    ports:
      - "8000:80"
```

- `docker-compose.override.yml`:

```yaml
services:
  web:
    environment:
      - DEBUG=true
```

- `web` 서비스는 기본 이미지와 포트, 그리고 재정의된 DEBUG 환경 변수를 모두 사용합니다.

### 3. 여러 파일에 대한 명령어 사용

- **기본 동작**: Docker Composite가 있는 경우, 명령어를 실행할 때 `docker-compose.override.yml`과 함께 `docker-composite.yml`을 자동으로 로드합니다.
- **수동으로 파일 지정**: `-f` 플래그를 사용하여 병합할 파일과 순서를 제어합니다:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

- 이는 기본 오버라이드를 무시하고 프로덕션별 설정을 사용합니다.

### 4. 실용적인 조직화 전략

- **환경 분리**: 환경당 하나의 오버라이드를 사용하세요: 개발, 테스트, 프로덕트 등.
- **마이크로서비스 및 팀**: 구성을 서로 다른 서비스나 팀을 위해 별도의 파일로 나누고 필요에 따라 결합하세요.
- **기능 전환**: 추가 파일은 일시적인 필요를 위해 선택적인 서비스나 구성을 도입하거나 제거할 수 있습니다(예: 추가 로깅을 위한 `compose.debug.yml`).

### 5. 장점들

- **명확성**: 개별 파일을 작고 집중적으로 유지합니다.
- **확장성**: 새로운 서비스, 환경 또는 설정을 쉽게 추가할 수 있습니다.
- **유지보수 가능성**: 주어진 배포에 대해 관련 섹션만 변경하거나 검토하십시오.

### 6. 예: 환경 전환

**Development:**

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

**Production:**

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

_각 환경은 기본 파일에 필요한 구성만 제공하며, 모든 공유 구성은 기본 파일에 포함되어 있습니다._

여러 파일로 복잡한 Compose 설정을 구성하고 오버라이드/병합 시스템을 활용하면 대규모 다중 서비스 Docker 애플리케이션의 모듈성, 환경별 맞춤 설정 및 쉬운 확장성을 보장할 수 있습니다.
