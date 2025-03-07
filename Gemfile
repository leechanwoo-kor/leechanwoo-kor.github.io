source "https://rubygems.org"

# GitHub Pages 환경과 동일한 버전 사용
gem "jekyll", "~> 3.10.0"
gem "sass", "~> 3.7.4"
gem "kramdown-parser-gfm", "~> 1.1.0"

# 테마 사용 (최신 버전 지정)
gem "minimal-mistakes-jekyll", "~> 4.26.2"

# 플러그인
group :jekyll_plugins do
  gem "jekyll-paginate", "~> 1.1"
  gem "jekyll-sitemap", "~> 1.3"
  gem "jekyll-gist", "~> 1.5"
  gem "jekyll-feed", "~> 0.1"
  gem "jekyll-include-cache", "~> 0.1"
end

# Windows 환경 지원
gem "webrick", "~> 1.7"
gem "faraday-retry"
gem 'wdm', '>= 0.1.0' if Gem.win_platform?
gem 'tzinfo', '~> 2.0'
gem 'tzinfo-data'