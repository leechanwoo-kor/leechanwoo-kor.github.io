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
$ bundle exec jekyll serve
$ open http://localhost:4000
```

## commit - push

```
$ git add .
$ git commit -m '...'
$ git push origin main
```
