---
title: "[Docker] Docker Cheatsheet"
categories:
  - Docker
tags:
  - Docker
  - Cheatsheet
toc: true
toc_sticky: true
toc_label: "Docker Cheatsheet"
toc_icon: "sticky-note"
---

<br>

<img width="2400" height="1260" alt="image" src="https://github.com/user-attachments/assets/e098ec0b-19ef-4090-9a0e-3fa02c88be00" />

<br>

## 설치

### Ubuntu

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
sudo apt install docker-ce
sudo systemctl start docker
```

### Docker Compose 설치

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

## General Docker Commands

### Version and System Info

```bash
docker version          # 도커 CLI 및 데몬 버전 표시
docker system info      # 도커 환경에 대한 데이터 목록
docker help             # 도움말 인덱스 보기
docker <command> --help # 특정 명령어에 대한 도움말 정보 보기
```

### Login and Logout

```bash
docker login            # 도커 허브 로그인
docker logout           # 도커 허브 로그아웃
```

## 이미지 관리

### 이미지 목록

```bash
docker images           # 모든 이미지 목록
docker images -a        # 중간 이미지를 포함한 모든 이미지 목록
```

### 이미지 다운로드

```bash
docker pull <image-name:version> # 도커 허브에서 이미지 다운로드
```

### 이미지 빌드

```bash
docker build -t <image-name> . # 현재 디렉토리의 도커파일에서 이미지 빌드
docker build -f <Dockerfile-path> -t <image-name> . # 특정 도커파일에서 이미지 빌드
docker build --build-arg foo=bar . # 빌드 인수가 포함된 이미지 빌드
docker build --pull . # FROM 지침에 참조된 업데이트된 이미지 버전을 가져옵니다  
docker build --quiet . # 출력을 방출하지 않고 이미지를 빌드합니다
```

### Tag and Push Images

```bash
docker tag <local-image-name> <username>/<preferred-image-name>
docker push <username>/<preferred-image-name>
```

### 이미지 제거

```bash
docker rmi <image-name>        # 특정 이미지 제거
docker image prune             # 사용하지 않는 이미지 제거
docker image prune -a          # 사용하지 않는 모든 이미지 제거
```

### Remove dangling images

```bash
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
```

### Untag image

```bash
docker rmi repository/image-name:tag
```

## 컨테이너 관리리

### 컨테이너 실행

```bash
docker run -itd --name <container-name> <image-name> # 분리(detached) 모드에서 컨테이너 실행
docker run -it -p <host-port>:<docker-port> <image-name> # 포트 매핑이 있는 컨테이너 실행
docker run -it --name <container-name> <image-name> # interactively 컨테이너 실행
```

### 컨테이너 목록

```bash
docker ps                  # 실행 중인 컨테이너 목록
docker ps -a               # 모든 컨테이너 목록
docker ps -s               # CPU 및 메모리 사용량이 있는 실행 중인 컨테이너 목록
```

### 컨테이너 시작, 중지, 재시작작

```bash
docker start <container-name>   # 중지된 컨테이너 시작
docker stop <container-name>    # 실행 중인 컨테이너 중지
docker restart <container-name> # 컨테이너 재시작
```

### 컨테이너 제거

```bash
docker rm <container-name>      # 중지된 컨테이너 제거
docker rm -f <container-name>   # 컨테이너 강제 제거
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q) # 모든 컨테이너 제거
```

### remove all stopped containers

```bash
docker container prune
```

### Attach to Containers

```bash
docker attach <container-name>  # 실행 중인 컨테이너 내부로 연결
docker exec -it <container-name> bash # 실행 중인 컨테이너에 새로운 쉘 실행
```

### Inspect Containers

```bash
docker inspect <container-name> # 컨테이너 검사
docker logs <container-name>    # 컨테이너 로그 보기
docker port <container-name>    # 컨테이너의 포트 매핑 표시
```

## 네트워크 관리

```bash
docker network ls            # 모든 네트워크 목록
docker network create <network-name> # 새 네트워크 생성
docker network rm <network-name>    # 네트워크 제거
```

## 볼륨 관리

```bash
docker volume ls             # 모든 볼륨 목록
docker volume create <volume-name> # 새 볼륨 생성
docker volume rm <volume-name>    # 볼륨 제거
docker run -v <host-path>:<container-path> <image-name> # 볼륨 마운트
```

## Docker Compose

### 기본 명령어

```bash
docker-compose up           # docker-compose.yml에 정의된 서비스 시작
docker-compose up -d        # 분리(detached) 모드에서 서비스 시작
docker-compose down         # 서비스 중지 및 제거
docker-compose ps           # 실행 중인 서비스 목록
docker-compose logs         # 서비스 로그 보기
docker-compose start        # 서비스 시작
docker-compose stop         # 서비스 중지
docker-compose pause        # 서비스 일시 중지
docker-compose unpause      # 서비스 일시 중지 해제
```

## Dockerfile 명령어

### Dockerfile에서 이미지 빌드

```bash
docker build -t <image-name> <Dockerfile-path> # Dockerfile에서 이미지 빌드
```

### Example Dockerfile

```Dockerfile
FROM <base-image>
RUN <command>
COPY <source> <destination>
EXPOSE <port>
CMD ["<command>", "<argument>"]
```

## Security and Secrets

### Docker Secrets

```bash
docker secret create <secret-name> <file> # 시크릿 만들기
docker secret ls                         # 모든 시크릿 목록
docker secret rm <secret-name>          # 시크릿 제거
```

### Docker Security

- Use Docker secrets to centrally manage sensitive data and securely transmit it to containers.
- Secrets are encrypted during transit and at rest in a Docker swarm.

## 정리

### 사용하지 않는 자원 제거

```bash
docker system prune          # 사용하지 않는 데이터(이미지, 컨테이너, 네트워크, 볼륨) 제거
docker image prune           # 사용하지 않는 이미지 제거
docker container prune       # 사용하지 않는 컨테이너 제거
docker network prune         # 사용하지 않는 네트워크 제거
docker volume prune          # 사용하지 않는 볼륨 제거
```
