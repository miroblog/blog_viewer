---
title: "Windsurf 사용 가이드"
date: "2024-03-26"
excerpt: "Windsurf에 대해 알아야 할 모든 것"
category: "General"
tags: ["AI IDE", "Windsurf", "LLM"]
coverImage: "/images/windsurf-ide-thumbnail.jpg"
author: "Lee Han Kyol"
authorImage: "/images/hklee-avatar.jpg"
authorBio: "Hyperithm - LLM Engineer"
---
# 개요

- 본 문서는 Hyperithm 테크팀 IA (Intelligent Automation) 팀이, 사내 개발인력 생산성 강화를 위해 작성한 Windsurf 사용에 대한 종합적인 가이드입니다.
- 작성 시점은 2025년 3월 26일이며 작성자는 Hyperithm 엔지니어 이한결 님입니다.
- 회사와 팀에 대한 소개는 다음에서 볼 수 있습니다.
    - 홈페이지 - [https://www.hyperithm.com](https://www.hyperithm.com/)
    - 채용 - [https://hyperithm.career.greetinghr.com](https://hyperithm.career.greetinghr.com/)
    - CTO 양준하 [https://www.linkedin.com/in/junha-y-5923061b6](https://www.linkedin.com/in/junha-y-5923061b6/)
        - 커피챗 신청 환영입니다 - junha@hyperithm.com

# 소개

## Windsurf 소개

- **Cascade** : 프로젝트를 깊이 이해하는 AI 기반 어시스턴트 (오른쪽에 위치한 채팅 인터페이스)
- WindsurfTab: 전체 코드 블록을 생성하는 지능형 코드 완성 도구 (editor 내에서 tab)
- **Command Mode**: inline 또는 영역을 지정해 코드 편집 (Cmd + I)
- **Flows**: 실시간 AI 협업 및 맥락 인식
- **Memories**: 여러 대화에 걸쳐 컨텍스트 유지
- **Cascade Terminal**: AI 지원으로 명령 실행
- **Preview**: IDE 내 미리보기 기능으로 간소화된 웹 개발

## 설치 및 설정

1. **다운로드 및 설치**:
    - [codeium.com/windsurf](https://codeium.com/windsurf) 를 방문하여 다운로드 및 설치합니다.
    - Windsurf를 실행하고 설정 기본 설정을 선택합니다.
2. **초기 구성**:
    - VS Code 또는 Cursor에서 설정 가져오기(선택사항)
    - 새로운 구성으로 시작
    - 무료 크레딧 액세스를 위한 무료 Windsurf 계정 가입
    - 명령줄 액세스를 위해 PATH 환경에 Windsurf 설치(선택사항)
3. **환경 설정**:
    - 선호하는 키바인딩 선택(VS Code 또는 Vim)
    - 에디터 테마 선택

## 공식 documentation

- [https://docs.codeium.com/windsurf/getting-started](https://docs.codeium.com/windsurf/getting-started)

## 필수 단축키

| 동작 | Windows/Linux | Mac |
| --- | --- | --- |
| Cascade 열기/닫기 | Ctrl + L | Cmd + L |
| 명령 팔레트 열기 | Ctrl + Shift + P | Cmd + Shift + P |
| Inline AI | Ctrl + I | Cmd + I |
| 브레드크럼에 포커스 | Ctrl + Shift + ; | Ctrl + Shift + ; |

# 핵심 인터페이스 (Cascade)

Windsurf 인터페이스는 다음과 같은 주요 구성 요소로 이루어져 있습니다:

- **Cascade 패널**: 오른쪽에 위치하며, AI 어시스턴트와 주로 상호작용하는 곳입니다.

![image.png](/windsurf_assets/image.png)

- **메뉴 바**: 오른쪽 상단에 위치하며, 업데이트 및 설정에 접근할 수 있습니다.

![image.png](/windsurf_assets/image%201.png)

- **설정 버튼** : 오른쪽 하단에 위치하며, 구성 옵션에 빠르게 접근할 수 있습니다.
    
    ![image.png](/windsurf_assets/image%202.png)
    

## Cascade (Mode)

Cascade는 Windsurf의 에이전트 기능의 핵심 축으로, 코드베이스에 대한 깊은 이해, 고급 도구 및 실시간 인식을 결합합니다.

작동 모드 (cmd + .  로 모드 변환) 
- **Write 모드**: AutoGPT와 유사하게, 최소한의 개입으로 여러 파일을 생성하고, 스크립트 실행, 테스트 수행, 코드 디버깅이 가능합니다. 
- **Chat 모드**: 더 대화형으로, 프롬프트를 기반으로 코드 스니펫 생성 및 지침 제공에 중점을 둡니다.
- **Legacy 모드**: 현재 프로젝트와 관련 없는 일반 질문에 대해 ChatGPT처럼 기능합니다.

## **@ 멘션 컨텍스트**

- @ 기호를 사용하여 특정 파일, 함수 또는 클래스를 참조합니다.

![image.png](/windsurf_assets/image%203.png)

### 웹에서 검색

- 검색어(query)를 던져주거나, 특정 link를 전달해 내용을 reference로 참조

### Codes, Files, Directories

- 참조해야할 범위를 좁혀 전달할때 더 좋은 결과를 얻기도함.
- (주의) index되어 있어야 참조가 가능함 : **Check Indexing Status:** "Chat" 패널의 "Context" 창에서 녹색 점으로 indexing 상태를 확인할 수 있습니다.
    - 세부사항
        
        요약
        
        - Windsurf는 코드베이스 전체를 인식하기 위해 로컬 indexing 엔진을 사용합니다.
        - **Automatic Indexing:** 기본적으로 활성화되어 있습니다. (VS Code/JetBrains 확장과 다름)
        - **Embedding Generation:** 코드를 이해하기 위해 embeddings을 생성합니다. 이를 통해 자연어 또는 코드 조각으로 검색할 수 있습니다.
        - **Local Storage:** 코드 조각은 embedding 생성을 위해 원격 서버로 보내지만, 코드나 embedding은 원격으로 저장되지 않고 기기에 저장됩니다.
        - 최초 indexing 시 CPU 자원을 소모하지만, 한 번만 발생하며 5-10분 정도 소요됩니다.
        - **Resource Requirements:** 5,000개 파일 작업 공간의 경우 약 300MB의 RAM이 필요합니다.
        
        **Indexed Files 확인:**
        
        - 직접적으로 indexing된 파일 목록을 볼 수는 없습니다.
        - **Check Indexing Status:** "Chat" 패널의 "Context" 창에서 녹색 점으로 indexing 상태를 확인할 수 있습니다.
        - **Excluded Files:** 기본적으로 **`.gitignore`**, **`node_modules`**, 숨김 경로 (**`.`**)에 지정된 파일/폴더 및 **`.codeiumignore`** 파일에 지정된 파일/폴더는 indexing되지 않습니다.
        - **.codeiumignore:** **`.gitignore`**와 동일한 문법을 사용하여 indexing에서 제외할 파일을 추가적으로 설정할 수 있습니다. repo root에 위치해야 합니다.
        - **Workspace Size Limits:** "Max Workspace Size (File Count)" 설정으로 indexing할 최대 파일 수를 제한할 수 있습니다. (RAM 10GB 사용자 기준 10,000개 이하 권장)
        
        **주의할 점:**
        
        - Indexing된 파일 목록을 직접 볼 수 없다는 점. Excluded Files에 주의하여 필요한 파일이 indexing에서 제외되지 않았는지 확인해야 합니다.
        - **`.codeiumignore`** 파일을 활용하여 indexing 대상 파일을 세밀하게 조정할 수 있다는 점.
        - Workspace 크기가 커질수록 더 많은 자원을 소모하므로 "Max Workspace Size (File Count)" 설정을 적절하게 조정해야 한다는 점.

### Docs (내부/외부)

- bulit-in documentation: (@docs) 로 선택
    
    ```
    @docs:windsurf-help-docs how does memory management work in windsurf? 
    ```
    

- 외부 링크에 있는 documentation
    - 가령 [https://pytorch-lightning.readthedocs.io/en/1.5.0/](https://pytorch-lightning.readthedocs.io/en/1.5.0/) 에 있는 doc을 windsurf 내부에서 참조해서 쓰고 싶을때
    - 아래 형식으로 cascade chat에 입력
    
    ```jsx
    @docs:(doc-name) link
    @docs:pytorch-lightning-v1.5.0 https://pytorch-lightning.readthedocs.io/en/1.5.0/
    
    ```
    

### ETC

- 린터 통합: 자동으로 린팅 오류를 식별하고 수정합니다.
- 모델 선택: 필요에 따라 다양한 AI 모델 중에서 선택할 수 있습니다.
- 웹 검색: @ 다음에 URL을 사용하여 인터넷에서 컨텍스트를 가져옵니다.
- 이미지 업로드: 이미지에서 코드를 생성합니다(예: 웹사이트 스크린샷에서 HTML/CSS 생성).


## WindsurfTab

- WindsurfTab은 코드 작성 워크플로우를 향상시키기 위한 기능입니다. autocomplete, supercomplete, tab to jump, tab to import 기능을 통합된 UX(tab)으로 제공합니다. 별도의 모델을 사용하여 코드 문맥을 파악하고 관련된 제안, 점프 및 임포트를 제공합니다.
- **문맥 활용 :** WindsurfTab은 더 나은 자동 완성을 위해 다음과 같은 요소가 고려됩니다.
    - **최근에 본 파일 (Recently Viewed Files):** 다른 파일에서 작업한 코드가 제안에 영향을 줍니다.
    - **터미널 명령어 및 출력 (Terminal Commands & Outputs):** 터미널에서 실행한 명령어와 그 결과가 의도를 파악하는 데 사용됩니다 (예: 임포트 실패 후 패키지 설치 제안).
    - **Cascade 대화 (Cascade Conversations):** Cascade에서의 이전 상호 작용이 문맥을 유지하고 관련 연속을 제공하는 데 사용됩니다 (해당되는 경우).

![image.png](/windsurf_assets/image%204.png)

### Autocomplete

- **클립보드를 문맥으로 사용 (선택 사항):**
    - **사용법:** 이 기능은 *기본적으로 비활성화*되어 있습니다.
        - **Advanced Settings >** . "Windsurf Tab" 또는 "Completion Context"와 관련된 옵션을 찾아 "Clipboard as Context"를 활성화하십시오.
    - **장점:** 다른 소스에서 코드 스니펫을 복사하면 Windsurf Tab이 현재 파일에서 관련 완성을 제안하는 데 사용할 수 있습니다.
    - **개인 정보 보호 고려 사항:** 이 기능을 활성화할 때 민감한 정보에 주의하십시오.

### Supercomplete

Supercomplete는 Windsurf의 고급 AI 기반 기능으로, 단순한 자동 완성(Autocomplete)을 넘어 사용자의 의도를 예측합니다. 단순히 다음 줄의 코드를 제안하는 것이 아니라 의도를 파악합니다. 이는 Windsurf Tab 시스템의 일부로서, 단 하나의 키 입력으로 다양한 코드 변경을 가능하게 합니다.

| 기능 (Function) | 설명 (Description) |
| --- | --- |
| 오타 수정 (Typo Sanitation) | 철자 및 구문 오류 자동 수정 |
| 변수 이름 변경 (Variable Renaming) | 문맥 기반 더 나은 변수 이름 제안 |
| 스키마 업데이트 (Schema Updates) | 코드 요구 사항에 따른 데이터 스키마 자동 수정 |
| 이벤트 핸들러 바인딩 (Event Handler Binding) | 적절한 위치에 자동 이벤트 핸들러 연결 |
| 코드 리팩토링 (Code Refactoring) | 코드 품질 및 효율성을 개선하기 위한 제안 제공 |
- Auto complete 과의 차이점

| Feature | Autocomplete | Supercomplete |
| --- | --- | --- |
| Scope | Current Cursor position only | Considers entire code context |
| Intention | Simple insertion of code | Predicts intent, suggests code changes (inserts, deletes, edits) |
| Independence from location | Dependent on cursor position | Context-aware, works independently of cursor position |

### Tab to Import

Tab to Import는 파일에 새로운 의존성(dependency)을 정의한 후, 힌트가 표시될 때**`tab`**키를 누르면 해당 의존성을 파일 상단에 자동으로 import하는 기능입니다. 커서는 현재 위치에 그대로 유지됩니다.

- 파일에서 새로운 라이브러리나 모듈을 사용합니다
- Windsurf가 import 힌트를 표시합니다
- **`tab`**키를 누르면 자동으로 파일 상단에 import 구문이 추가됩니다
- 작업 중인 위치에서 커서가 이동하지 않고 계속 작업할 수 있습니다

### Tab to Jump

- **사용법:** 키워드 (예: 함수 이름, 변수 이름)를 입력하고 **Tab** 키를 누릅니다. Windsurf Tab이 점프 가능한 위치를 감지하면 점프 옵션이 있는 위젯을 표시합니다.
- **(v 1.5.6)** 점프 거리가 두 배 이상 늘어나 코드베이스 내에서 더 멀리 이동할 수 있습니다. 점프 위젯의 UI가 새로워졌습니다.
- Tab to Jump 위젯을 *클릭*하여 원하는 점프 위치를 선택할 수 있습니다.

# Command Mode (Inline AI): 대상 코드 편집

코드를 선택하고 `Cmd+I`(Mac) 또는 `Ctrl+I`(Windows/Linux)를 사용하여 접근:

| 예시 케이스 | 설명 | 예시 |
| --- | --- | --- |
| Code Modification, AI-Powered Code Suggestions | 선택한 코드에 대한 특정 변경을 요청합니다.  AI 툴을 사용하여 코드 변경을 제안받고 적용할 수 있습니다. | "이 함수의 시간 복잡도를 개선해줘." |
| Docstring Generation, Documentation | 선택한 함수, 클래스 등에 대한 독스트링을 자동으로 생성합니다.  코드의 문서화를 간소화합니다. | 함수를 선택하고 Cmd+I를 누르면 자동으로 함수에 대한 설명을 포함하는 독스트링 생성 |
| Code Refactoring, Readability, Performance, Maintainability | 선택한 코드를 개선하기 위한 제안을 받고 리팩토링을 수행합니다. 코드 가독성, 성능, 유지보수성을 향상시킬 수 있습니다. | 반복되는 코드 블록을 선택하고 Cmd+I를 눌러 함수로 추출 제안을 받음 |
| Terminal Integration, Command Generation, Information Retrieval | 선택한 코드 또는 문제에 대한 터미널 명령어를 생성하거나, 관련 정보를 터미널에서 검색하는 것을 지원받습니다. | 특정 라이브러리 설치 명령어를 생성하거나, 에러 메시지에 대한 해결책을 검색 |

# Flows: 맥락을 실시간으로 이해하는 AI

[windsurf-continue.mp4](/windsurf_assets/windsurf-continue.mp4)

- 변수명 바꾸고, cascade chat 에서 continue 라고 입력하면 코드베이스 전체에서 해당 변수명의 변경에 따른 적절한 수정을 진행해줌

# 컨텍스트 보존 및 개인화

- **자동화된 메모리**: 작업 패턴을 학습하고 향후 사용을 위해 정보 저장
- **명시적 메모리**: 특정 컨텍스트를 유지하거나 환경 설정을 지정하는 사용자 정의 규칙
- 문서 환경 설정 및 코딩 스타일을 위한 `.windsurfrules` 파일을 통해 관리
    - project 단위의 rule
- 모든 코드 베이스에 적용되는 global rule

## 메모리 (Memory)

### **자동 메모리 (Automated Memories)**

- **목표**: Cascade와 대화할 때 중요한 내용을 자동으로 기억해 줍니다.
- **만드는 방법**:
    - Cascade와 대화하는 동안 자동으로 생성됩니다.
    - "create a memory of..."와 같이 Cascade에게 직접 요청해서 만들 수도 있습니다.
- **저장 위치**: 각 워크스페이스(workspace)에 연결되어 저장됩니다.
- **불러오기**: 현재 상황에 맞는 정보가 자동으로 나타납니다.
- **비용**: 크레딧(credits)을 사용하지 않습니다.
- **이럴 때 좋아요**:
    - 프로젝트(project)를 진행하면서 나오는 중요한 내용
    - 사용자(user)의 선호도나 대화 중에 결정된 사항
    - 중요한 코드 스니펫(code snippets)이나 아키텍처 관련 결정
    - 여러 세션(session)에서 반복적으로 필요할 수 있는 정보

### **명시적 메모리 (Explicit Memory)**

- **종류**:
    1. **글로벌 규칙 (Global Rules)** (`global_rules.md`): 모든 워크스페이스에 공통으로 적용됩니다.
    2. **로컬 규칙 (Local Rules)** (`.windsurfrules`): 특정 워크스페이스에만 적용됩니다.
- **제한 사항**: 파일 하나당 6,000자 (총 12,000자)까지 쓸 수 있습니다.
- **관리 방법**: Windsurf Settings > Edit Rules에서 수정할 수 있습니다.
- **이럴 때 좋아요**:
    - 프로젝트 전반에 걸쳐 지켜야 할 규칙과 표준
    - 전체 프로젝트에 적용되는 코딩 컨벤션(coding conventions)
    - 팀(team)에서 정한 규칙이나 요구 사항
    - Document 설정이나 코딩 스타일 관련 선호도

## 규칙 (Rules)

### **이런 경우에 사용**

- 프로젝트에 적용할 코딩 표준이 정해져 있을 때
- 코드베이스(codebase)를 다룰 때 항상 일관된 결과를 얻고 싶을 때
- 특정 포맷팅(formatting)이나 문서화 방식을 강제하고 싶을 때
- 모든 대화에 적용되는 개인 설정을 유지하고 싶을 때

### **Rules 작성 관련 팁**

- [https://codeium.com/windsurf/directory](https://codeium.com/windsurf/directory) 에서 구체적인 case by case 예시를 볼 수 있습니다.
    - 규칙은 최대한 간단하고 명확하게 작성
    - 글머리 기호나 마크다운(markdown)을 사용하여 가독성
    - 나중에 필요할 수 있는 중요한 내용은 메모리로 저장
    - 모든 프로젝트에 적용되는 표준은 글로벌 규칙으로 설정
    - 프로젝트별 요구 사항은 로컬 규칙으로 설정

## **설정 및 관리**

![image.png](/windsurf_assets/image%205.png)

- **자동 메모리 (Automated Memories)**: Settings > Manage Cascade-Generated Memories 또는 Cascade 창의 점 3개 메뉴에서 관리할 수 있습니다.
- **규칙 (Rules)**: Windsurf Settings > Edit Rules에서 수정할 수 있습니다.

| 기능 | 자동 메모리 | 글로벌 규칙 (`global_rules.md`) | 로컬 규칙 (`.windsurfrules`) |
| --- | --- | --- | --- |
| **생성 방법** | Cascade 명령으로 자동 생성 또는 수동 생성 | 텍스트 편집기로 직접 작성 | 텍스트 편집기로 직접 작성 |
| **적용 범위** | 해당 워크스페이스에만 적용 | 모든 워크스페이스에 적용 | 특정 워크스페이스에만 적용 |
| **유지 여부** | 세션이 종료되어도 유지 | 세션이 종료되어도 유지 | 세션이 종료되어도 유지 |
| **비용** | 무료 (크레딧 소모 없음) | 무료 (크레딧 소모 없음) | 무료 (크레딧 소모 없음) |
| **이럴 때 좋아요** | 맥락 유지, 중요한 세부 사항, 의사 결정 기록 | 프로젝트 표준, 코딩 규칙 | 프로젝트별 요구 사항, 코딩 스타일 |

## (Advanced) 디렉토리별 메모리, Rule 관리 전략

### Prompt Context란 ?

Prompt Context 접근 방식은 코드 저장소 내에서 작업하는 AI 어시스턴트에게 디렉토리별 가이드를 제공해 어떤 컨텍스트와 룰을 우선시 할 것인지에 대한 관리를 좀 더 쉽게 할 수 있는 방법론입니다. 

### 설정 방법

* [Prompt Context Rules](https://gist.github.com/miroblog/dc5e946e0437a4b054b78d8f166af537)

1. 위 rule을 .windsurfrules에 명시합니다. 
2. 특수 지시사항이 필요한 하위 디렉토리에 디렉토리별 컨텍스트(.context.md), 규칙(.AI.md) 파일을추가합니다

특정 디렉토리 내에서의 작업 X(코드 수정 및 생성 등)에 필요한 규칙(formatting rule 등) 과 컨텍스트(예시 snippet 등) 을 개발자가 효과적으로 통제할 수 있습니다.

## (Advanced) Memory Bank를 통한 관리 전략

### **Memory Bank란 무엇인가?**

Memory Bank는 Windsurf AI가 여러 세션에 걸쳐 프로젝트 컨텍스트를 유지할 수 있게 해주는 구조화된 문서화 시스템입니다. AI의 "메모리" 역할을 하는 마크다운 파일들을 생성하고 업데이트하여 더 일관되고 효율적인 지원을 가능하게 합니다.

- 세션 간에 프로젝트 컨텍스트 유지
- 프로젝트 세부 정보 자동 문서화
- AI가 프로젝트 패턴과 제약 조건을 이해하도록 보장
- 반복적인 설명 감소
- 코드 일관성 향상

### **설정 방법**

**1단계: Memory Bank 규칙 생성**
* [Memory Bank Rules](https://gist.github.com/miroblog/7a60b45b572dc4922aac21de57a0915f)

1. Memory Bank 규칙을 복사 
2. windsurf 설정 → Rules로 이동
3. .windsurfrules 섹션에 규칙을 붙여넣기
4. 설정 저장

**2단계: Memory Bank 초기화**

```
1. windsurf AI와 새 채팅 시작
2. 다음과 같이 입력: `initialize memory bank`
3. windsurf가 memory bank 폴더 구조를 생성하도록 함
```

### **Memory Bank 구조**
```
1. **projectbrief.md** - 기초 문서
    - 핵심 요구사항 및 목표
    - 프로젝트 범위
2. **productContext.md** - 제품 세부 정보
    - 이 프로젝트가 존재하는 이유
    - 해결하는 문제점
    - 사용자 경험 목표
3. **systemPatterns.md** - 기술 아키텍처
    - 시스템 아키텍처
    - 주요 디자인 패턴
    - 컴포넌트 관계
4. **techContext.md** - 기술적 세부 사항
    - 사용된 기술
    - 개발 설정
    - 의존성
5. **activeContext.md** - 현재 작업
    - 최근 변경 사항
    - 다음 단계
    - 활성 의사 결정
6. **progress.md** - 프로젝트 상태
    - 잘 작동하는 것
    - 구축해야 할 것
    - 알려진 문제점
```
### **Memory Bank 사용 방법**

**Plan Mode**

```
구현 전에 windsurf가 기능 계획을 도와주길 원할 때:

1. 새 채팅 시작
2. 다음과 같이 입력: `use plan mode`
3. 계획하고 싶은 내용 설명
4. windsurf가 memory bank 파일을 읽고 계획을 도와줌

예시:

use plan mode
Let's plan how to implement user authentication in our app


```

**Implementation Mode**

```
기능을 구현하고 싶을 때:

1. 구현하고 싶은 내용 설명
2. windsurf가 memory bank를 읽고 프로젝트 패턴에 따라 구현
```

**Memory Bank 업데이트**

```
Memory Bank는 windsurf와 작업할 때 자동으로 업데이트되지만, 수동으로 업데이트를 트리거할 수 있습니다:

1. 다음과 같이 입력: `update memory bank`
2. windsurf가 모든 파일을 검토하고 문서를 업데이트
```

**사용팁**

```
- 작업 설명 시 구체적으로 설명
- 정확성을 보장하기 위해 memory bank 파일을 가끔 검토
- 새 프로젝트의 경우, 초기화할 때 초기 컨텍스트 제공
- 복잡한 기능은 구현 전에 plan mode 사용
- 중요한 프로젝트 변경 후 memory bank 업데이트
- windsurf가 memory bank를 무시하는 것 같다면, "use plan mode"를 명시적으로 지정
- 구현이 프로젝트 패턴과 일치하지 않는 경우, systemPatterns.md 파일 확인
- 대규모 프로젝트의 경우, memory-bank 폴더에 추가 컨텍스트 파일 생성 고려
```

# MCP 서버 관련 기능

Model Context Protocol(MCP)은 개발 환경에서 직접 외부 서비스 및 API에 연결할 수 있도록 Windsurf의 기능을 확장하는 기능입니다.

MCP를 통해 Windsurf는 다음을 수행할 수 있습니다:
- GitHub, YouTube 및 다양한 데이터 소스와 같은 플랫폼에 연결
- AI가 웹 서비스와 상호 작용하고 실시간 정보를 가져올 수 있도록 지원
- 로컬 코드베이스를 넘어 기능 확장

## MCP 서버 셋팅

- cascade 오른쪽 하단 망치

![image.png](/windsurf_assets/image%206.png)

- 오른쪽 상단 메뉴 → Windsurf Settings (cmd +, )
    
    ![image.png](/windsurf_assets/image%207.png)
    
- Add server + , 또는 Add custom server + 를 통해 설정

![image.png](/windsurf_assets/image%208.png)

![image.png](/windsurf_assets/image%209.png)

아래가 포함된 `mcp_config.json` 파일 수정을 통해 설정

- (tip) npx가 안될땐 docker로 시도

```
# example sequential-thinking
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sequential-thinking"
      ]
    }
}
```

현재 windsurf 제한 사항

- 도구만 지원하며 이미지를 포함하는 출력은 지원하지 않음
- stdio 전송 유형을 사용하는 서버 필요

## MCP Server Curated된 웹사이트

- [https://glama.ai/mcp/servers](https://glama.ai/mcp/servers)
- [https://opentools.com/](https://opentools.com/)
- [https://smithery.ai/](https://smithery.ai/)
- [https://mcp.so/](https://mcp.so/)
- [https://mcp.composio.dev/](https://mcp.composio.dev/)

원하는 3rd party tool integration을 지원하는 mcp 서버가 market place에 있는지 확인 

없다면 custom mcp tool을 python이나 typescript로 제작

- [https://github.com/modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk)
- [https://github.com/modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk)

## 예시

### 예시1 - Sequential Thinking

- 복잡한 태스크를 순차적으로 생각해 풀어낼때 유용

```
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sequential-thinking"
      ]
    }
}
```

### 예시2 - Brave Search

- windsurf built-in websearch로 검색이 잘 되지 않을때 시도

```
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "API_KEY" 
      }
    }
}
```

### 예시3 - Slack Integration (docker)

- [https://github.com/lars-hagen/slack-user-mcp](https://github.com/lars-hagen/slack-user-mcp)

```
{
  "mcpServers": {
    "slack": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "SLACK_TOKEN",
        "-e",
        "SLACK_TEAM_ID",
        "mcp/slack-user"
      ],
      "env": {
        "SLACK_TOKEN": "xoxp-your-user-token",
        "SLACK_TEAM_ID": "T01234567"
      }
    }
  }
}
```

### 예시4 - Youtube Integration

- 유튜브 비디오/채널 검색, 자막 다운로드 등

```
{
  "mcpServers": {
    "yt-dlp": {
      "command": "npx",
      "args": [
        "-y",
        "@kevinwatt/yt-dlp-mcp"
      ]
    }
}
```

> ex) go to official windsurf youtube channel and list up all recent videos and download the captions and save it in ./captions directory
> 

### 예시5- Browser Tools

- UI 개발, 디버깅에 유용
- chrome console log, xhr network errors/logs
- 브라우저 스크린샷 & 어떤 ui가 클릭되었는지 cascade내에서 @ 참조 가능

```
https://browsertools.agentdesk.ai/installation
1. chrome extension 설치 -> 2. mcp 설정
```

# AI 개발 방법론 (case by case 보충 필요)

## Meta Prompting

메타 프롬프팅은 직접적인 지시 (일일이 모든 단계를 직접 나열하는 대신) AI에게 포괄적인 계획 수립을 요청하는 방식입니다. 이를 통해 AI가 복잡한 작업을 체계화하고 가이드하는 방식입니다.  예를 들어, "Tech stack" 선택이나 "Authentication" 처리 같은 작업을 직접 적는 대신, "Slack 봇을 만들려고 하는데, 봇 설정에 필요한 단계별 계획을 세울 때 Best Practice와 잠재적인 문제점을 고려해서 가이드해 줄 수 있어?" 와 같이 AI에게 물어볼 수 있습니다.

## Plan → Implement → Feedback → … → Update Memory

1. 먼저 계획(Plan) 단계에서는 무엇을 만들지 명확히 정의하고, 현재 코드 구조를 분석한 후, AI가 단계별 접근 방식을 제안하며 테스트 케이스를 먼저 작성하도록 지시 . 
2. 구현(Implement) 단계에서는 AI가 계획에 따라 코드를 생성하고, 기능 검증을 위한 테스트를 작성하며, 여러 파일을 한 번에 수정하고 필요한 명령어를 실행
3. 피드백(Feedback) 단계에서는 테스트를 실행하여 요구사항 충족 여부를 확인하고, 오류와 문제점을 찾아내며, 코드 성능을 확인하고 코드 품질을 검토
4. 개선 구현(Implement) 단계에서는 발견된 오류를 수정하고, 코드를 정리하고 개선하며, 성능을 최적화하고 코드에 설명을 추가
5. 마지막으로 메모리 업데이트(Update Memory) 단계에서는 중요한 결정사항을 별도의 메모리(.md)에 기록하고, 반복되는 패턴을 식별하며, 프로젝트 지식을 축적하고 개발자의 코딩 스타일을 이해하도록 유도

# Common Workflow

## 프로젝트 생성 및 설정

예시 워크플로우:

1. Cascade에 생성하려는 프로젝트 설명
2. Windsurf가 프로젝트 구조와 필요한 파일 생성
3. 종속성 설치를 위한 터미널 명령 실행
4. 개발 준비 완료

## 피쳐 개발

Windsurf를 통한 효율적인 코딩 워크플로우:

1. 필요한 기능에 대해 명확한 지시 제공
2. 일관성을 유지하기 위해 기존 코드 패턴 참조
3. Cascade에 적절한 컨텍스트를 제공하기 위해 @ 멘션 사용 (정확한 rule과 context 제공)

## 디버깅 및 오류 해결

- cascade로 보내기
    - problems 하단 탭 확인 → send all to cascade
    
    ![image.png](/windsurf_assets/image%2010.png)
    
    - editor 내에서 popup box 확인 → explain and fix
    
    ![image.png](/windsurf_assets/image%2011.png)
    
    - terminal 에서 drag → cmd + L
    
    ![image.png](/windsurf_assets/image%2012.png)
    

간소화된 디버깅 프로세스:

1. 개발 중 오류 발생
2. Cascade와 오류 메시지 및 관련 파일 공유
3. 분석 및 잠재적 해결책 확인
4. 제안된 수정 사항 적용 또는 디버깅 단계 수행

## **리팩토링 및 코드 품질**

Windsurf를 사용하여 고품질 코드베이스를 유지할 수 있습니다.

**기능:**

- 특정 코드 섹션을 리팩토링하기 위해 Inline AI 사용
- 포괄적인 문서 및 독스트링 생성
- 프로젝트 전체에 일관된 코딩 스타일 적용
- 기존 코드의 성능 최적화

**권장 워크플로우:**

1. 리팩토링/ docstring 생성이 필요한 코드 선택
2. 특정 변경을 요청하기 위해 Command Mode(Cmd/Ctrl + I) 사용
3. 제안된 개선 사항 검토 및 수락

## UI 개발

- https://docs.codeium.com/windsurf/previews

[browser-preview-demo.mp4](/windsurf_assets/browser-preview-demo.mp4)

Preview 기능을 통한 간소화된 웹 개발

- 실시간으로 변경 사항을 확인하기 위해 IDE 내 미리보기 사용
- 이미지나 설명에서 HTML/CSS/JS 생성
- UI 요소를 클릭하여 편집을 위해 cascade로 보내 레퍼런스로 참조해 디버깅

## 터미널 작업에서 AI 활용

향상된 터미널 경험

- 터미널 명령에 대한 AI 지원 받기
- 자동화된 명령 실행을 위한 Turbo Mode 사용
- 추가 지원을 위한 명령 출력 분석
- 최소한의 개입으로 복잡한 명령 시퀀스 실행

예시 워크플로우

1. 적절한 터미널 명령에 대해 Cascade에 문의
2. 제안된 명령 검토
3. 명령 실행(수동 또는 Turbo Mode로 자동)
4. terminal log 기반으로 도움 받기

# 상세 설정

## Cascade 설정

### Auto-Fix Lints

- **설정**: On/Off
- **기능**: 활성화되면 Cascade가 생성된 코드의 린팅 오류를 자동으로 수정합니다. 비활성화되면 자동 수정 없이 코드가 생성됩니다.

### 모델 선택

작업 복잡성 및 예산에 따라 다양한 AI 모델 중에서 선택:

- **Gemini Flash**: 간단한 작업에 적합, 낮은 비용
- **GPT-4o / Claude 3.5 / Claude 3.7**: 유사한 비용, 높은 품질
- **Claude 3.7 Thinking**: 최고 품질, 최고 비용

모델 선택 고려 사항:

- 작업 복잡성 요구 사항
- 속도 vs 품질 트레이드오프
- 크레딧 소비율

## 터미널 설정

### 터미널 자동 실행(Turbo Mode)

- **설정**: On/Off
- **기능**: 활성화되면 Cascade가 허용/차단 목록 규칙에 따라 수동 승인 없이 터미널 명령을 실행할 수 있습니다. 비활성화되면 모든 명령에 승인이 필요합니다.

### 명령 허용/차단 목록

자동으로 실행할 수 있는 명령 구성:

- **허용 목록**: 항상 실행할 수 있는 명령 지정
- **차단 목록**: 자동으로 실행하면 안 되는 명령 나열
- git 명령 허용: `git*`
- 파일 삭제 차단: `rm -rf*`

## Auto Complete 설정

### 자동완성

- **설정**: On/Off
- **기능**: 기본 코드 완성 기능을 켜거나 끕니다.

### 자동완성 속도

- **설정**: Fast/Normal
- **기능**: 더 빠른 제안(Fast) 또는 더 신중한 타이밍(Normal) 중에서 선택합니다.

## Supercomplete

- **설정**: On/Off
- **기능**: 더 포괄적인 제안을 제공하는 향상된 컨텍스트 인식 코드 완성 기능을 켜거나 끕니다.

## 네비게이션 설정

### Tab to Jump

- **설정**: On/Off
- **기능**: 활성화되면 Tab을 사용하여 import 문, 종속성 및 관련 코드 섹션으로 이동할 수 있습니다.

## 메모리 및 규칙 구성

### 메모리 생성 및 관리

다음을 통해 접근:
- "create memory…" 로 Cascade에 메모리 생성 요청
- 오른쪽 상단 "Manage Memory" 옵션을 통해 메모리 관리

### 규칙 유형

- **전역 규칙**: 모든 작업 공간에 적용
- **로컬 규칙**(windsurfrules): 특정 프로젝트에 적용
    - 프로젝트의 `.windsurfrules` 파일에 저장
    - 12,000자로 제한(전역 규칙과 결합)
    - 제한에 도달하면 전역 규칙이 우선

### 규칙 모범 사례

- 글머리 기호 스타일로 형식 지정
- XML 태그로 관련 규칙 그룹화
- 가장 중요한 규칙 우선시
- 코딩 표준 및 패턴에 대해 구체적으로 명시

## 프리뷰 설정

- **설정**: On/Off
- **기능**: 활성화되면 대화형 기능이 포함된 웹 애플리케이션의 IDE 내 미리보기를 제공합니다.

다음을 통해 전환:
- 설정 패널
- 도구를 호출하거나 명시적으로 비활성화하는 프롬프트

프리뷰 기능:
- UI 요소를 Cascade로 전송
- IDE 내 또는 별도의 브라우저에서 보기
- 대상 편집을 위한 요소 선택

## 고급 구성 옵션

### Remote SSH 지원

- 원격 개발을 위한 내장 지원
- 참고: Microsoft의 "Remote - SSH" 확장 프로그램을 설치하지 마세요(Windsurf와 충돌)
- 로컬 dev 컨테이너 지원(원격 컨테이너는 지원하지 않음)

### Gitignore 통합

- 인덱싱 및 검색을 위해 .gitignore 파일 준수
- 특정 사용 사례를 위한 gitignore 파일 액세스 옵션

### 로컬 인덱싱 구성

- Windsurf가 코드베이스를 인덱싱하는 방법 구성
- 임베딩 생성 및 업데이트 빈도 설정
- 코드베이스 크기 최적화 옵션

# 추가 리소스

### **Videos by Category and Skill Level**

| Category | Skill Level | Title | Description | Link |
| --- | --- | --- | --- | --- |
| **Getting Started** | Beginner | The Windsurf Editor (World's First Agentic IDE) | Overview of Windsurf as an agentic IDE | [Watch](https://www.youtube.com/watch?v=3xk2qG2QPdU) |
| **Getting Started** | Beginner | The Making of Windsurf: Why We Built It | Philosophy behind Windsurf's development | [Watch](https://www.youtube.com/watch?v=FYtOlvblOX4) |
| **Getting Started** | Beginner | A Beginner's Guide to using MCP in Windsurf! | Introduction to Model Context Protocol | [Watch](https://www.youtube.com/watch?v=Y_kaQmhGmZk) |
| **Core Features** | Beginner-Intermediate | Turbo Mode in Windsurf | Automated terminal command execution | [Watch](https://www.youtube.com/watch?v=8hvbnMLpes4) |
| **Core Features** | Beginner-Intermediate | AI Flows: The Reason Why Cascade Feels Like Magic | Deep dive into AI Flows collaboration | [Watch](https://www.youtube.com/watch?v=ei1ftNJx6gI) |
| **Core Features** | Beginner-Intermediate | Cascade Memories: Personalize Windsurf with Custom Rules | Creating and managing custom rules | [Watch](https://www.youtube.com/watch?v=pOvI02of5oo) |
| **Core Features** | Beginner-Intermediate | Never Google A Terminal Command Again | Generate and run terminal commands | [Watch](https://www.youtube.com/watch?v=tHPKPj2tyn8) |
| **Core Features** | Beginner-Intermediate | Web Search Best Practices | Optimize search functionality and credits | [Watch](https://www.youtube.com/watch?v=moIySJ4d0UY) |
| **Core Features** | Beginner-Intermediate | Making of Windsurf's Cascade Bar | Design and functionality of Cascade | [Watch](https://www.youtube.com/watch?v=De5BZSaphZs) |
| **Advanced Techniques** | Intermediate-Advanced | Convert Figma Designs Into Code | Transform Figma designs into code | [Watch](https://www.youtube.com/watch?v=u1GYJPNnG9o) |
| **Advanced Techniques** | Intermediate-Advanced | Refine Code with Precision - Command Mode | Using Command Mode for targeted edits | [Watch](https://www.youtube.com/watch?v=PnktjL43fTc) |
| **Advanced Techniques** | Intermediate-Advanced | From Sketch to Website | Implementing features from visual references | [Watch](https://www.youtube.com/watch?v=G2bRYbW9VYk) |
| **Advanced Techniques** | Intermediate-Advanced | Turn Blog Post Tutorials into Full-Stack Applications | Converting tutorials into applications | [Watch](https://www.youtube.com/watch?v=X7Ipaou43o0) |
| **Advanced Techniques** | Intermediate-Advanced | Save Time with Cascade Autogenerated Memories | Optimize workflow with autogenerated memories | [Watch](https://www.youtube.com/watch?v=DKUe0ST_qi4) |
| **Advanced Techniques** | Intermediate-Advanced | Spend Less Time Approving with Automated Command | Streamlining approval processes | [Watch](https://www.youtube.com/watch?v=bdKZ_vGHh1o) |
| **Feature Updates** | All Levels | Windsurf Wave 4 Updates | Preview, Tab to Import, Suggested Actions | [Watch](https://www.youtube.com/watch?v=bIy-RN3FIsQ) |
| **Feature Updates** | All Levels | Windsurf Wave 3 Updates | Tab to Jump, MCP, Custom App Icons, Turbo Mode | [Watch](https://www.youtube.com/watch?v=OIV1vKm59Xg) |
| **Feature Updates** | All Levels | Windsurf Wave 2 Update | Web Search, Autogenerated Memories | [Watch](https://www.youtube.com/watch?v=YBP5Fs2N0Mg) |
| **Feature Updates** | All Levels | Windsurf Wave 1 | Cascade Memories and Automated Terminal Commands | [Watch](https://www.youtube.com/watch?v=Fcl01e68vZw) |
| **Feature Updates** | All Levels | Windsurf Now Supports OpenAI's o3-mini! | Integration with OpenAI's o3-mini model | [Watch](https://www.youtube.com/watch?v=QuJsskQBtcI) |

### **Community Resources**

- [Official Windsurf Documentation](https://docs.codeium.com/windsurf)
- [Codeium Community Forums](https://codeium.com/)
- [GitHub Repository](https://github.com/codeium)

### **Official Documentation Links**

- [Windsurf Getting Started Guide](https://docs.codeium.com/windsurf/getting-started)
- [Cascade Documentation](https://docs.codeium.com/windsurf/cascade)
- [Advanced Windsurf Features](https://docs.codeium.com/windsurf/advanced)

- 더 쉬운 MCP 설치
    
    [Cline을 통한 MCP 설치 (편의기능)](https://www.notion.so/Cline-MCP-1c0eab14a71c80cda7a2d28f9bf5b8d4?pvs=21)