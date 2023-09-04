---
title: "[Java] Querydsl"
categories:
  - Java
tags:
  - Querydsl
toc: true
toc_sticky: true
toc_label: "Querydsl"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9bb7e3ef-9ca0-4155-9305-95c1df45d626)

<br>

Querydsl은 정적으로 입력된 SQL과 같은 쿼리를 구성할 수 있는 프레임워크이다. 문자열로 작성하거나 XML 파일에 쿼리를 작성하는 대신, Querydsl이 제공하는 플루언트(Fluent) API를 이용해서 쿼리를 생성할 수 있다.

단순 문자열과 비교해서 Fluent API를 사용할 때의 장점은 다음과 같다.

1. IDE의 코드 자동 완성 기능 사용
2. 문법적으로 잘못된 쿼리를 허용하지 않음
3. 도메인 타입과 프로퍼티를 안전하게 참조할 수 있음
4. 도메인 타입의 리팩토링을 더 잘 할 수 있음

<br>

# Backgroud

Querydsl은 타입에 안전한 방식으로 HQL 쿼리를 실행하기 위한 목적으로 만들어졌다. HQL 쿼리를 작성하다보면 String 연결을 이용하게 되고, 이는 결과적으로 읽기 어려운 코드를 만드는 문제를 야기한다. String을 이용해서 도메인 타입과 프로퍼티를 참조하다보면 오타 등으로 잘못된 참조를 하게 될 수 있으며, 이는 String을 이용해서 HQL 작성할 때 발생하는 또 다른 문제다.

타입에 안전하도록 도메인 모델을 변경하면 소프트웨어 개발에서 큰 이득을 얻게 된다. 도메인의 변경이 직접적으로 쿼리에 반영되고, 쿼리 작성 과정에서 코드 자동완성 기능을 사용함으로써 쿼리를 더 빠르고 안전하게 만들 수 있게 된다.

Querydsl의 최초 쿼리 언어 대상은 Hibernate의 HQL이었으나, 현재는 JPA, JDO, JDBC, Lucene, Hibernate Search, MongoDB, 콜렉션 그리고 RDFBean을 지원한다.

<br>

# 원칙

Querydsl의 핵심 원칙은 *타입 안정성(Type safety)*이다. 도메인 타입의 프로퍼티를 반영해서 생성한 쿼리 타입을 이용해서 쿼리를 작성하게 된다. 또한, 완전히 타입에 안전한 방법으로 함수/메서드 호출이 이루어진다.

또 다른 중요한 원칙은 *일관성(consistency)*이다. 기반 기술에 상관없이 쿼리 경로와 오퍼레이션은 모두 동일하며, Query 인터페이스는 공통의 상위 인터페이스를 갖는다.

모든 쿼리 인스턴스는 여러 차례 재사용 가능하다. 쿼리 실행 이후 페이징 데이터와 프로젝션 정의는 제거된다.

Javadoc에서 com.mysema.query.Query, com.mysema.query.Projectable 그리고 com.mysema.query.types.Expression의 내용을 보면 Querydsl 쿼리와 표현 타입이 제공하는 표현력을 알게 될 것이다.

<br>

# JPA 쿼리

Querydsl은 영속 도메인 모델에 대해 쿼리할 수 있는 범용적인 정적 타입 구문을 정의하고 있다. JDO와 JPA는 Querydsl이 지원하는 주요 기술이다.

Querydsl은 JPQL과 Criteria 쿼리를 모두 대체할 수 있습니다. Querydsl은 Criteria 쿼리의 동적인 특징과 JPQL의 표현력을 타입에 안전한 방법으로 제공한다.

<br>

## 메이븐 통합

메이븐 프로젝트의 의존 설정에 다음을 추가한다.

```
<dependency>
  <groupId>com.mysema.querydsl</groupId>
  <artifactId>querydsl-apt</artifactId>
  <version>${querydsl.version}</version>
  <scope>provided</scope>
</dependency>

<dependency>
  <groupId>com.mysema.querydsl</groupId>
  <artifactId>querydsl-jpa</artifactId>
  <version>${querydsl.version}</version>
</dependency>

<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-log4j12</artifactId>
  <version>1.6.1</version>
</dependency>
```

다음으로 메이븐 APT 플러그인을 설정한다.

```
<project>
  <build>
  <plugins>
    ...
    <plugin>
      <groupId>com.mysema.maven</groupId>
      <artifactId>apt-maven-plugin</artifactId>
      <version>1.1.3</version>
      <executions>
        <execution>
          <goals>
            <goal>process</goal>
          </goals>
          <configuration>
            <outputDirectory>target/generated-sources/java</outputDirectory>
            <processor>com.mysema.query.apt.jpa.JPAAnnotationProcessor</processor>
          </configuration>
        </execution>
      </executions>
    </plugin>
    ...
  </plugins>
  </build>
</project>
```

JPAAnnotationProcessor는 javax.persistence.Entity 애노테이션을 가진 도메인 타입을 찾아서 쿼리 타입을 생성한다.

도메인 타입으로 Hibernate 애노테이션을 사용하면, APT 프로세서로 `com.mysema.query.apt.hibernate.HibernateAnnotationProcessor`를 사용해야 한다.

mvn clean install 을 실행하면, target/generated-sources/java 디렉토리에 Query 타입이 생성된다.

이클립스를 사용할 경우, mvn eclipse:eclipse 를 실행하면 target/generated-sources/java 디렉토리가 소스 폴더에 추가된다.

생성된 Query 타입을 이용하면 JPA 쿼리 인스턴스와 쿼리 도메인 모델 인스턴스를 생성할 수 있다.

<br>

## Ant 통합

클래스패스에 full-deps에 포함된 jar 파일들을 위치시키고, 다름 태스크를 이용해서 Querydsl 코드를 생성한다.

```
    <!-- APT based code generation -->
    <javac srcdir="${src}" classpathref="cp">
      <compilerarg value="-proc:only"/>
      <compilerarg value="-processor"/>
      <compilerarg value="com.mysema.query.apt.jpa.JPAAnnotationProcessor"/>
      <compilerarg value="-s"/>
      <compilerarg value="${generated}"/>
    </javac>

    <!-- compilation -->
    <javac classpathref="cp" destdir="${build}">
      <src path="${src}"/>
      <src path="${generated}"/>
    </javac>
```

src를 메인 소스 폴더로 변경하고, *generated*를 생성된 소스를 위한 폴더로 변경하고, *build*를 클래스 생성 폴더로 변경한다.
