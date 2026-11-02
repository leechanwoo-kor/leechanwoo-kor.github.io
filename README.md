[![CodeFactor](https://www.codefactor.io/repository/github/leechanwoo-kor/leechanwoo-kor.github.io/badge)](https://www.codefactor.io/repository/github/leechanwoo-kor/leechanwoo-kor.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/blob/main/LICENSE)

# leechanwoo-kor.github.io

<details>
<summary>local setting (windows)</summary>

### Jekyll Themes

- [Jekyll Themes](http://jekyllthemes.org/) 사용
    - [minimal-mistakes](https://github.com/mmistakes/minimal-mistakes)

### Ruby 설치

- Jekyll은 Ruby 언어로 만들어졌기 때문에 Jekyll을 설치하기 전에 [Ruby](https://rubyinstaller.org/downloads/)를 먼저 설치해야 한다.
    - Ruby를 설치할 때는 윈도우용 WITH DEVKIT을 설치
    - [Jekyll Windows 설치](https://jekyllrb.com/docs/installation/windows/)
- 설치 중 `Add Ruby executables to your PATH` 옵션을 체크하면 윈도우에서 환경 변수를 설정하는 번거로움을 생략할 수 있다
- 설치가 완료 되면 Ruby cmd 창이 실행되는데 만약 창을 닫게 되면 Ruby cmd에서 `ridk install` 명령어로 실행할 수 있다
- RubyInstaller2 화면이 나오면 ENTER를 눌러 MSYS2를 설치해준다.

### Jekyll과 Bundler 설치

- 루비 설치가 완료되면 Ruby cmd에서 `gem install bundler jekyll` 명령어로 Jekyll과 Bundler를 설치한다.
- 설치가 완료되면 `jekyll -v` 명령어로 Jekyll이 제대로 설치 되었는지 확인한다.
- [Jekyll 공식홈페이지](https://jekyllrb-ko.github.io/)

### Bundle install

- Jekyll까지 설치 되었으면 블로그를 clone한 디렉터리로 이동한다.
    - 필요시 Gemfile을 수정하고 필요한 플러그인을 추가한다.
- 이후 터미널에서 `bundle install` 명령어를 입력한다.


</details>

## run

```
$ bundle exec jekyll clean
$ bundle exec jekyll serve --incremental
$ open http://localhost:4000
```

## verification

Ruby 3.4와 Node.js 24를 사용합니다. 의존성은 저장소의 `Gemfile.lock`과 `package-lock.json`에 맞춰 설치합니다.

```powershell
bundle install
npm ci
npm run build:js
npm test
$env:JEKYLL_ENV = "production"
bundle exec jekyll build --strict_front_matter --trace
npm run verify:site -- _site
```

Pull request에서는 위 빌드와 검증만 실행합니다. `main`에 push하거나 워크플로를 수동 실행하면 검증 통과 후 GitHub Pages에 배포합니다.

화면은 저장소의 `_layouts`, `_includes`, `_sass`, `assets`에 있는 테마 소스를 사용합니다. Minimal Mistakes gem을 업데이트해도 이 로컬 파일은 자동 갱신되지 않습니다. JavaScript 소스를 변경하면 `npm run build:js`로 `assets/js/main.min.js`도 갱신합니다.

## commit - push

```
$ git add .
$ git commit -m '...'
$ git push origin main
```
