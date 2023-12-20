### 메뉴 등록하기

- navigation.yml 파일에 url을 작성한다.
  - title : 메뉴에 표시될 텍스트
  - url : 메뉴가 연결될 링크 주소

```yml
# main links

main:
  - title: "About"
    url: /about/
  - title: "Category"
    url: "/categories/"
  - title: "Tags"
    url: /tags/
  - title: "Timeline"
    url: /timeline/
```

### page 설정

```Markdown
#categories.md
---
title: "Posts by Category"
layout: categories
permalink: /categories/
author_profile: true
---

#tags.md
---
title: "Posts by Tag"
permalink: /tags/
layout: tags
author_profile: true
---
```

- permalink를 navigation.yml의 url과 맞춰주면 메뉴를 통해 이동할 수 있다.