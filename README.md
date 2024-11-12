# Wangnooni Client

왕눈이 클라이언트 레포

###### 사전 작업

##### .env.example 참고하여 .env 작성

##### mkcert 설치 및 환경 구성

1. mkcert 설치

   1. Windows: Windows Chocolatey가 설치된 경우
      `choco install mkcert`
   2. macOS: Homebrew가 설치된 경우
      `brew install mkcert`

2. 프로젝트 루트에서 다음 명령어를 통해 로컬 CA를 생성하고 SSL 인증서를 생성합니다. (로컬에서 임의로 https 환경 형성 위함)
   1. 신뢰할 수 있는 로컬 CA 생성
      `mkcert -install`
   2. 인증서를 생성 (로컬호스트, 127.0.0.1 용)
      `mkcert localhost 127.0.0.1`
3. 의존성 패키지 설치 후 실행
   `yarn install`
   `yarn vite`
