# Mandy

## 새해에는 더욱 성장할 당신을 위한- 
만다라트 계획표 작성 어플리케이션

### 만다라트(**mandalart)**란?

- 일본의 디자이너 이마이즈미 히로아키가 고안한 발상 기법으로, **본질을 깨닫고 목적을 달성하는 기술**을 뜻합니다.
- 그림이나 도형이 반복되며 펼쳐진 불교화 양식인 '만다라(mandala)'에서 유래했습니다.
- 중앙의 3*3 사각형에는 중심 목표 및 세부 목표를,
외곽 8개의 3*3 사각형에는 각각 세부 목표와 그를 이루기 위한 실천 사항을 작성합니다.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/a832f431-0acd-46f1-82b5-e204e5601d13/image.png)

# Members

- [윤서진](https://www.notion.so/124c2f561ef843078f18fc8ab88c7a1c?pvs=21)
    - 숙명여자대학교 컴퓨터과학전공
    - 프론트엔드 구현

- [강민우](https://www.notion.so/129b8253a4dd464ea4f49761360e3a3c?pvs=21)
    - 고려대학교 데이터과학과
    - 백엔드 구현

<aside>
🛠

## Tech Stack

**Front-End**

https://github.com/Y00NSJ/Mandy_FE_expo

- React Native `w/ expo`
- javascript, typescript

**Back-End**

https://github.com/minwookang219/Mandy

- Django
- Python
- Postman

**Database**

- PostgresQL
- SQLite: `for development test`

**External API**

- ChatGPT API: `GPT-4o mini`

**IDE**

- VSCode
- Pycharm

**VCS & Cooperation Tool**

- Git, Github
- Figma, Flamel
- ERD Cloud: `for designing DB`
- Swagger
</aside>

# Details

## Splash Screen & Login

- 앱 데이터를 로드하는 동안 `스플래시 스크린` 송출
- 로드 완료 후 `회원가입 및 로그인` 창으로 전환

## Home

**내 만다라트 열람**

- `주요 목표` 및 세부 목표 열람
    - `세부 목표` 클릭 시 해당 세부 목표에 대한 `실천 사항` 열람 가능
- `✏️` 아이콘 클릭해 수정
    - `제목`, `주요 목표` 및 `세부 목표` 수정 가능, `✔️` 터치 시 수정 완료
    - `삭제하기` 버튼 클릭 시 만다라트 전체 삭제
- 만다라트가 없을 경우 `추가하기`
    1. `제목` 및 `주요 목표` 입력 후 `다음으로` 클릭
    2. `주요 목표` 및 `실천 사항` 입력 후 `다음으로` 클릭
        - `세부 목표` 작성 시 `ChatGPT` 버튼 표시: 클릭 시 GPT가 추천하는 실천 사항 확인 가능, 클릭 시 실천 사항에 추가됨
    3. 항목을 다 채우지 않아도 `완료` 버튼을 통해 제출 가능: 추후 `Home` 탭의 수정 기능으로 추가 가능

## Achievement Record

**실천 사항에 대한 일간 기록 작성 및 열람**

- 상단바를 통해 현재 만다라트의 `주요 목표`  확인 가능
- 만다라트 `실천 사항` 을 달성하기 위해 활동한 후, 가운데 버튼을 눌러 기록 작성 가능
    1. `세부 목표` 와 `실천 사항` 선택 후
    2. `세 줄 일기` 를 작성하여 기록 작성
    3. 작성 후 `기록 열람 탭`으로 이동
- 기록 열람 탭: 작성 날짜가 자동으로 표시되며, 해당 `실천 사항` 에 작성했던 기록을 확인할 수 있음
    - 삭제 가능
    - 상단바를 통해 현재 `실천 사항` 열람 가능

## Social Ranking

**사용자들의 성취도 랭킹 확인**

- 일간 기록의 개수로 성취도 집계
- 퍼센티지로 환산한 랭킹을 리스트업

# 회고

<aside>
🐬

윤서진

- 백엔드 개발만 경험해보다 처음으로 프론트엔드 개발을 시도했는데, 생각보다 훨씬 어려웠다. 풀스택의 길은 험난하다는 것을 깨달았다.
- html/css를 모르는 상태에서 헤드 퍼스트로 리액트 네이티브를 공부하는 과정이 쉽진 않았지만, 코드를 작성할수록 리액트의 재사용성이 강력한 특징임을 몸소 느끼게 되었다
- 그래도 백이 더 재밌다
</aside>

<aside>
🍢

강민우

- 절대 구글 로그인을 하지마..
- api 명세서 작성, db diagram 그리기등등 처음 해보는 것들이 많아 헷갈렸다.
- 그래도 프런트와 백이 합쳐질때 굉장히 성취감을 느낄 수 있었다.
</aside>

---

- 설계 과정
    
    # ER Diagram
    
    # 명세서
    
    ## API 명세서: Swagger 활용
    
    [기능 명세](https://www.notion.so/b34e530e9146493da2f23c1469252729?pvs=21)
    

### E-R Diagram
