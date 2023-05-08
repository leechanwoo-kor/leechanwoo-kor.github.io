---
title: "[Spring] Batch 구조와 구성 요소"
categories:
  - Java
tags:
  - Spring
  - Batch
toc: true
toc_sticky: true
toc_label: "Batch 구조와 구성 요소"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/236711867-3ce9e8b4-21a0-49f2-8917-b6d7ab9db6d4.png)

스프링 배치를 사용하면서 `프레임워크`의 구조에 대한 이해와 사용하고 있는 클래스가 어떤 역할을 하고 있는지에 대해서 알아볼 필요가 있다고 생각합니다.

이 글로 전체적인 구조를 전부 다 설명드릴 수는 없지만, 어떻게 구성이 되어 있고, 각 요소가 하는 역할은 무엇인지 소개해보도록 하겠습니다.

# 스프링 배치 구조

![image](https://user-images.githubusercontent.com/55765292/236712791-3835eceb-24fe-44c0-b9ed-3a2e51d85b78.png)

위 다이어그램은 스프링 배치 프레임워크 내의 **요소** 간의 상호작용과 주요 서비스들을 나타냅니다. 다이어그램에서 스프링 배치에서의 `개발자의 책임`을 이해하는데 도움이될 수 있도록 각 요소에 특성에 맞는 색으로 표시해두었습니다.

노란색은 스케줄러 또는 데이터베이스와 같은 `외부 애플리케이션`을 나타냅니다. 스케줄링이라는 점은 스프링 배치와 별도로 고려되어야한다는 점에 유의하는 것이 중요합니다.

빨간색으로 표시한 요소들은 `어플리케이션 서비스`를 나타냅니다. 대부분의 서비스들은 스프링 배치에서 제공하고 있지만, 원하는 구조가 있다면 입맛에 맞게 디자인 할 수 있습니다.

초록색으로 표시된 요소들은 `개발자가 구성해야하는 것`들을 나타냅니다. 예를 들어 일정한 주기대로 작업이 시작되도록 설정하거나, 작업을 실행하는 방법 등을 구현해야합니다.

> 1. Run Tier: 어플리케이션의 예약 및 시작과 관련이 있는 계층입니다. 배치 작업의 시간 기반 및 상호 의존적인 스케줄링을 제공할뿐만 아니라 병렬 처리 기능을 제공합니다.
> 2. Job Tier: 배치 작업의 전체 실행을 담당합니다. 배치 단계를 순차적으로 실행하여 모든 단계가 올바른 상태에 있고 모든 적절한 정책이 시행 되도록합니다.
> 3. Application Tier: 프로그램을 실행하는 데 필요한 구성 요소가 포함되어 있습니다. 이 계층에는 요구된 배치의 기능을 처리하고 Tasklet 실행에 대한 정책을 시행하는 특별한 Tasklet이 포함됩니다.
> 4. Data Tier: 데이터베이스, 파일 또는 대기열을 포함 할 수있는 물리적 데이터 소스와의 연결을 제공합니다.

<br>

# Job
Job은 전체 배치 프로세스를 캡슐화하는 엔티티입니다. 다른 스프링 프로젝트와 동일하게 `XML` 또는 `Java`로 설정할 수 있습니다.

> Job 설정에 필요한 구성 요소
> 
> - 작업의 간단한 이름
> - Step인스턴스의 정의 및 순서
> - 작업을 다시 시작할 수 있는지 여부

스프링 배치의 Job은 단순하게 표현하면 `Step` 인스턴스의 컨테이너입니다. 비즈니스로직을 가지고 있는 여러 Step을 결합하고 재시작 가능성과 같이 모든 Step에 전역 속성을 설정할 수 있습니다.

job을 어떻게 구성하는지 알아보도록 해보겠습니다.

```Java
// .. 생략

@Slf4j
@Configuration
@RequiredArgsConstructor
public class TutorialConfig {

    private final JobBuilderFactory jobBuilderFactory;

    @Bean
    public Job tutorialJob() {
        return jobBuilderFactory.get("tutorialJob")
                .start(tutorialStep1())
                .next(tutorialStep2())
                .build();
    }

    // step1 생략

    @Bean
    public Step tutorialStep2() {
        return stepBuilderFactory.get("tutorialStep2")
                .tasklet((contribution, chunkContext) -> {
                    log.debug("I'm a tutorialStep2");
                        return RepeatStatus.FINISHED;
                })
                .build();
    }
}
```

> - JobBuilderFactory: Job을 쉽게 만들 수 있도록 도와 주는 클래스
> - JobBuilderFactory.get(Job): Job 이름을 tutorialJob으로 설정
> - JobBuilder.start(Step): Job에 처음으로 시작할 스텝을 등록
> - SimpleJobBuilder.next(Step): 처음 등록된 스텝 이후 다음 스텝을 등록

<br>

## JobRunner

외부 요청에 의해 작업 실행을 담당하는 클래스입니다. 예를 들어, 쉘 스크립트와 같은 다양한 외부 트리거로 메소드 호출을 할 수 있는 등의 여러 구현 방법들이 있습니다. **JobLauncher의 인스턴스화**를 수행합니다.

<br>

## JobInstance

![image](https://user-images.githubusercontent.com/55765292/236715353-41b24d20-fa75-41cc-8018-31f5b9afa8cd.png)

배치 처리에서 Job이 실행될 때 하나의 논리적 작업 실행의 단위입니다. 예를 들어 하루에 한 번씩 실행되는 배치 Job이 있다고 생각해보겠습니다.

이런 배치 Job의 경우, 하루 하나의 `JobInstance`가 있다고 생각하시면 됩니다.

> 오늘 작업이 실패한 경우, 내일 같은 Job에 대해서 JobInstance를 사용하게 됩니다. (단, 오늘과 내일은 다른 JobExecution 사용)

<br>

### BATCH_JOB_INSTANCE 테이블 데이터 예시

|JOB_INSTANCE_ID|VERSION|JOB_NAME|JOB_KEY|
|:---:|:---:|:---:|:---:|
|0|0|tutorialJob|d41d8cd98f00b204e9800998ecf8427e|

제가 작성한 Job을 실행했을 때 `JOB_INSTANCE` 테이블에 실제로 들어가는 내용을 확인 하실 수 있습니다.

<br>

## JobExecution

JobExecution은 JobInstance에 대한 한 번의 실행을 나타내는 객체입니다. 예를 들어 오늘 Job이 실패해 내일 다시 동일한 Job을 실행하면 동일한 `JobInstance`를 사용합니다.

<br>

### JobExecution properties

|속성|내용|
|---|---|
|status|BatchStatus실행의 상태를 나타내는 객체로 실행 중일 때는 BatchStatus.STARTED이고, 실패하면 BatchStatus.FAILED이고, 성공적으로 완료되면 BatchStatus.COMPLETED|
|startTime|작업이 시작되었을 때 현재 시스템 시간|
|endTime|작업의 성공 여부와 관계없이 작업이 끝났을 때의 현재 시스템 시간|
|exitStatus|시랳의 결과를 나타내는 상태로 호출 대상에게 반환할 exitCode를 포함하고 있어 중요한 속성|
|createTime|JobExecution이 처음 지속된 현재 시스템 시간|
|lastUpdated|JobExecution이 마지막으로 지속된 현재 시스템 시간|
|executionContext|실행과 실행 사이에 유지되어야 하는 유저정보를 포함하는 속성 데이터 더미|
|failureExceptions|작업 실행 중에 발생한 예외 목록. 작업 중 둘 이상의 예외가 발생할 경우 유용하게 사용할 수 있음|

JobExecution 인터페이스에는 위와 같은 다양한 속성에 대한 데이터를 가지고있습니다.

<br>

### BATCH_JOB_EXECUTION 데이터 예시

|JOB_EXECUTION_ID|VERSION|JOB_INSTANCE_ID|CREATE_TIME|START_TIME|END_TIME|STATUS|EXIT_CODE|EXIT_MESSAGE|LAST_UPDATED|JOB_CONFIGURATION_LOCATION|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|1|2|0|2023-05-08 14:53:09.520000|2023-05-08 14:53:09.653000|2023-05-08 14:53:09.896000|COMPLETED|COMPLETED||2023-05-08 14:53:09.897000||

제가 작성한 Job을 실행 했을 때의 `BATCH_JOB_EXECUTION` 테이블에 위와 같은 데이터가 저장됩니다.

<br>

## JobExecutionContext

Job 실행 중 개발자가 지속적으로 유지되었으면 하는 데이터를 저장하는 데이터 컬렉션입니다. 이 컬렉션은 **프레임워크**에 의해 유지 및 관리되고 Job이 실행되는 중간 커밋지점에서 주기적으로 저장됩니다.

`ExecutionContext`를 사용하면 Job 실행 중 치명적인 오류나 컴퓨터가 다운된 경우에도 상태를 정보를 유지할 수 있습니다.

|JOB_EXECUTION_ID|SHORT_CONTEXT|SERIALIZED_CONTEXT| 
|:---:|:---:|:---:|
|1|”{““@class””:”“java.util.HashMap””}”||
|2|”{““@class””:”“java.util.HashMap””}”||
|3|”{““@class””:”“java.util.HashMap””}”||

<br>

## JobParameters

JobParameters를 소개하기 전에 한 가지 예제를 보겠습니다. 저는 상단에서 `JobParameters`를 설정하여 Job을 실행하지 않았었습니다.

이러한 상태에서 **동일한 작업을 실행**하면 어떻게 되는지 실제로 실행해보고 `JobExecution`의 데이터를 보면서 알아보겠습니다.

<br>

### Job 중복 실행 시 BATCH_JOB_EXECUTION 데이터 예시

|STATUS|EXIT_CODE|EXIT_MESSAGE|
|COMPLETED|COMPLETED||
|COMPLETED|NOOP|All steps already completed or no steps configured for this job.|

JobParameters를 설정하지 않고, **중복해서 Job을 실행**할 경우 위와 같이 `NOOP`이라는 종료 코드와 함께 작업이 종료됩니다.

중복해서 실행했기 때문에 `전체 스텝들이 이미 완료되었거나 작업에 스텝들이 설정되어 있지 않습니다.`라는 종료 메시지도 저장되어 있는 것을 확인하실 수 있습니다.

그럼 한 가지 의문이 드실겁니다. 그럼 스프링 배치에서는 작업을 한 번씩만 수행할 수 있는 것일까요?

이러한 의문을 해결해줄 수 있는 것이 바로 `JobParameters`입니다.

JobParameters는 배치 Job이 실행될 때 필요한 파라미터 셋을 가지고 있는 객체입니다. 또 JobParameters와 JobInstance는 `1:1 관계`이기 때문에 JobParameters는 **JobInstance를 구분**하는 기준이 되기도 합니다.

<br>

### JobParameters와 Scope

스프링 배치에서 JobParameters를 정상적으로 사용하기 위해서 `JobScope`나 `StepScope`를 함께 사용해주셔야 합니다. 그 이유는 `JobParameters`는 **Scope** Bean의 생성 시점에만 함께 생성될 수 있기 때문입니다.

<br>

### JobParameters 사용 예제

```Java
// .. 생략

@Slf4j
@StepScope
@RequiredArgsConstructor
public class TutorialTasklet implements Tasklet {

    // JobParameters 사용
    @Value("#{jobParameters[datetime]}")
    private String datetime;

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        log.debug("# executed tasklet !!");
        log.debug("datetime: {}", datetime);
        return RepeatStatus.FINISHED;
    }
}
```

JobParameters는 `@Value`어노테이션을 이용하여 사용 가능합니다.

> 설정할 "datetime"은 Intellij 기준 Run/Debug configuration > program arguments 영역에 "datetime=2023-01-01T00:00:00"과 같은 형식으로 넣어주시면 됩니다.

> JobParameters로 사용 가능한 데이터 타입
> 
> - Long
> - Double
> - Date
> - String

파라미터를 넣고 실행한 결과를 보도록 하겠습니다.

<br>

#### BATCH_JOB_INSTANCE

|JOB_INSTANCE_ID|VERSION|JOB_NAME|JOB_KEY|
|:---:|:---:|:---:|:---:|
|0|0|tutorialJob|d41d8cd98f00b204e9800998ecf8427e|
|1|0|tutorialJob|9b96e280f03ff7fc781074b22d62097f|

동일한 Job 이름을 가지고 있고, JOB_INSTANCE_ID 값이 1인 데이터가 추가되었습니다.

<br>

#### BATCH_JOB_EXECUTION

|JOB_EXECUTION_ID|VERSION|JOB_INSTANCE_ID|CREATE_TIME|START_TIME|END_TIME|STATUS|EXIT_CODE|EXIT_MESSAGE|LAST_UPDATED|JOB_CONFIGURATION_LOCATION|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|1|2|0|2023-05-08 14:53:09.520000|2023-05-08 14:53:09.653000|2023-05-08 14:53:09.896000|COMPLETED|COMPLETED||2023-05-08 14:53:09.897000||
|2|2|0|2023-05-08 15:30:16.398000|2023-05-08 15:30:16.398000|2023-05-08 15:30:16.564000|COMPLETED|NOOP|All steps already completed or no steps configured for this job.|2023-05-08 15:30:16.564000||
|3|2|1|2023-05-08 16:22:35.546000|2023-05-08 16:22:35.676000|2023-05-08 16:22:36.057000|COMPLETED|COMPLETED|””|2023-05-08 16:22:36.057000||

`JOB_EXECUTION` 데이터를 한 번 살펴보면 **첫 번째** 시도에는 성공적으로 완료가 되었고, **두 번째** 시도에는 EXIT_CODE가 `NOOP`인 상태로 Job이 완료가 되었습니다.

**세 번째** 시도를 살펴 보면, `JOB_INSTANCE_ID`값이 1인 데이터가 추가되었고, EXIT_CODE도 `COMPLETED`로 완료된 것을 확인하실 수 있습니다.

<br>

#### BATCH_JOB_PARAMS 테이블 데이터 예시

|JOB_INSTANCE_ID|TYPE_CD|KEY_NAME|STRING_VAL|DATE_VAL|LONG_VAL|DOUBLE_VAL|IDENTIFYING|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|3|STRING|datetime|2023-01-01T00:00:00|1970-01-01 00:00:00|0|0|Y|

**세 번째** 시도에는 JobParameters를 설정하고 실행 했습니다. 따라서 위 처럼 처음으로 `JOB_PARAMS` 데이터가 들어간 것을 확인하실 수 있습니다.

> 저는 datetime이라는 JobParameters를 String 형태로 전달했기 때문에 위와 같이 STRING_VAL 컬럼에 데이터가 삽입되었습니다. (나머지는 default 값)

<br>

# Step

## StepExecution

Job에 JobExecution Job실행 정보가 있다면 Step에는 StepExecution이라는 Step 실행 정보를 담는 객체가 있습니다.

<br>

### StepExecution properties

|속성|내용|
|---|---|
|status|실행 상태를 나타내는 배치 상태정보를 가지고 있는 객체입니다. 각각 실행 중(BatchStatus.STARTED), 실패(BatchStatus.FAILED), 성공(BatchStatus.COMPLETED)|
|startTime|실행이 시작되었을 때, 현재 시스템 시간|
|endTime|실행 성공 여부와 관계없이 작업이 끝났을 때의 현재 시스템 시간|
|exitStatus|실행 결과에 대한 종료 상태로 호출 대상에게 반환할 exitCode를 포함하고 있어 중요한 속성|
|executionContext|실행과 실행 사이에 유지되어야 하는 유저정보를 포함하는 속성 데이터 더미|
|readCount|성공적으로 읽은 아이템의 수|
|writeCount|성공적으로 쓰여진 아이템의 수|
|commitCount|해당 실행을 위해 커밋된 트랜잭션의 수|
|rollbackCount|Step에서 제어하는 비즈니스 트랜잭션이 롤백된 수|
|readSkipCount|읽기에 실패하여 건너 뛴 아이템의 수|
|processSkipCount|프로세스가 실패하여 건너 뛴 아이템의 수|
|filterCount|ItemProcessor에 의해 필터링된 항목 수|
|writeSkipCount|쓰기에 실패하여 건너 뛴 아이템의 수|

<br>

### BATCH_STEP_EXECUTION 데이터 예시

|STEP_EXECUTION_ID|VERSION|STEP_NAME|JOB_EXECUTION_ID|START_TIME|END_TIME|STATUS|COMMIT_COUNT|READ_COUNT|FILTER_COUNT|WRITE_COUNT|READ_SKIP_COUNT|WRITE_SKIP_COUNT|PROCESS_SKIP_COUNT|ROLLBACK_COUNT|EXIT_CODE|EXIT_MESSAGE|LAST_UPDATED|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|1|3|tutorialStep1|1|2023-05-08 14:53:09.713000|2023-05-08 14:53:09.775000|COMPLETED|1|0|0|0|0|0|0|0|COMPLETED||2023-05-08 14:53:09.776000|
|2|3|tutorialStep2|1|2023-05-08 14:53:09.851000|2023-05-08 14:53:09.880000|COMPLETED|1|0|0|0|0|0|0|0|COMPLETED||2023-05-08 14:53:09.881000|
|3|3|tutorialStep1|3|2023-05-08 16:22:35.858000|2023-05-08 16:22:35.938000|COMPLETED|1|0|0|0|0|0|0|0|COMPLETED||2023-05-08 16:22:35.939000|
|4|3|tutorialStep2|3|2023-05-08 16:22:36.019000|2023-05-08 16:22:36.045000|COMPLETED|1|0|0|0|0|0|0|0|COMPLETED||2023-05-08 16:22:36.045000|

<br>

## StepExecutionContext

`JobExecution`과 동일하게 동작하지만 각 Step에 대해서 개발자가 지정한 데이터를 저장합니다.

|STEP_EXECUTION_ID|SHORT_CONTEXT|SERIALIZED_CONTEXT|
|---|---|---|
|1|{“@class”:”java.util.HashMap”,”TutorialTasklet”,”batch.stepType”:”TaskletStep”}||
|2|{“@class”:”java.util.HashMap”,”batch.taskletType”:”TutorialConfig$$Lambda$433/0x00000008003a0c40”,”batch.stepType”:”TaskletStep”}||
|3|{“@class”:”java.util.HashMap”,”TutorialTasklet”,”batch.stepType”:”TaskletStep”}||
|4|{“@class”:”java.util.HashMap”,”batch.taskletType”:”TutorialConfig$$Lambda$433/0x00000008003a0c40”,”batch.stepType”:”TaskletStep”}||

<br>

### BATCH_STEP_EXECUTION_CONTEXT 데이터 예시

<br>

# JobRepository

JobRepository는 배치 처리 과정 중 프레임워크에서 사용하는 **메타데이터 정보를 액세스**하는 Facade 클래스입니다. 상단에서 Job을 실행하면서 보여드렸던 테이블의 정보들은 `JobRepository`를 통해서 저장되고 관리되었습니다.

<br>

# JobLauncher

작업의 시작과 실제 실행을 관리하는 인터페이스로 `JobRunner`에 의해 인스턴스화되고, `JobParameters`와 함께 배치를 실행하는 주체입니다.

<br>

# JobLocator

파라미터로 전달된 작업에 대한 구현 계획(작업 스크립트)과 같은 설정 정보를 가져 오는 책임이 있는 클래스입니다. JobRunner와 함께 작동합니다.

<br>

# Tasklet

배치의 특정 작업을 개발하기 위해 Step의 기본 단위를 만들 수 있는 클래스입니다.

<br>

# ItemReader

일반적으로 청크 구조에서 사용되는 컴포넌트로 배치 작업에서 모든 데이터에 대한 처리가 될 때까지 DB, File 등의 소스에서 반복적으로 읽는데 사용하는 인터페이스입니다. 프레임워크에서 `Reader` 셋을 제공하지만 필요한 경우 개발자가 직접 개발할 수도 있습니다.

<br>

# ItemProcessor

역시 청크 구조에서 사용되는 컴포넌트로 Reader로 읽어온 데이터를 변환하하기 위한 역할을 수행합니다. 경우에 따라서는 `Processor`는 사용하지 않아도 됩니다.

> Reader, Processor, Writer로 분리된 구조는 비즈니스 로직을 분리하기에 용이하고, Reader와 Writer 데이터 타입이 다른 경우 어뎁터의 역할을 할 수도 있습니다.

<br>

# ItemWriter

Writer 또한 청크 구조에서 사용되는 컴포넌트로 배치에서 데이터를 DB, File 등에 저장하기 위한 인터페이스입니다. 동일하게 프레임워크에서 기본적으로 제공하지만 개발자가 직접 개발할 수도 있습니다.
