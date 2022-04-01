# Lupin Server

## 2022-1 사이버보안캡스톤디자인 2조 작업물입니다.

### 동일한 코드 형태를 지향합니다.

-   ESLint, Prettier를 활용합니다.
-   VSCode 기준 설정 방법을 기록합니다.
-   VSCode 이외의 설정은 각자 검색을 통해...

### VSCode에서의 Formatter, Linter 설정 방법

1. VSCode extension 창에서 ESLint, Prettier를 설치합니다.
2. 설정 (윈도우 기준, ctrl + ,) 탭에 들어간 후 검색창에 formatter를 검색합니다.
3. default formatter를 prettier로 설정합니다.
4. format on save를 true로 설정합니다.
5. 이후 저장 시 코드가 깔끔하게 정렬되는 것을 확인합니다.

### 스타일 가이드

1. tab character 대신 whitespace를 사용합니다.
2. semicolon을 사용합니다.
3. double quote 대신 single quote를 사용합니다.
4. 이외의 사항은 airbnb 코딩 스타일을 적용합니다.

### docker 활용법

1. docker를 설치합니다. (구글에 docker 설치 검색 후 최신버전 기준 설치)
2. 설치가 완료된 후, 프로젝트의 root에서 `docker compose up -d` 커맨드를 입력합니다.
3. 실행이 완료된 후, `docker ps`를 통해 컨테이너가 정상적으로 실행중인지 확인합니다.
4. 컨테이너가 정상적으로 실행되었다면, 성공입니다.

### 폴더 구조 간단 설명

-   src/routes : 라우터들이 들어갑니다.
-   src/schemas : DB Schema 파일이 들어갑니다.
-   src/services : 서비스 로직이 들어갑니다.

```js
// 예시 1 : routes에서 service 호출
import aService from '../services/aService.js';

app.get('/', (req, res, next) => {
    const body = req.body;
    const result = aService.aMethod(body);
    res.json(result);
});
// 예시 2 : service에서 mongoose 메소드 활용 callback
const aService = (body) => {
    const test = new Test();
    test.body = body;

    return test.save((err, result) => {
        if (err) {
            console.error(err);
        }
        return result;
    });
};
```

### 서비스를 분리하는 이유

-   파일 하나, 함수 하나에 DB 통신, request, reponse 관리 등을 한번에 할 경우, 수정시 매우 큰 cost가 들게 됩니다.
-   수정할 때 cost를 줄이기 위해서 파일을 나누고, 수정해야 할 부분만 수정하는 형태로 작업을 진행하면 큰 도움이 됩니다.

### 파일 이름 짓는 법

-   일반적인 파일(서비스 코드, 라우터) : camelCase 활용 (ex. userService.ts)
-   DB 스키마 파일 : PascalCase 활용 (ex. User.js, UserClass.js)
-   이외의 파일 : index.ts 제외 (index.ts는 원래 index.ts로만 활용함)
    -   이 부분의 경우, @유영웅 이 작업한 부분이기 때문에, 건드릴 부분이 있다면 얘기해주길 바랍니다!

### git 사용법

-   master branch는 가급적 직접적인 commit을 하지 않았으면 합니다.
    -   이유 : 모두가 작업을 하고, 해당 작업을 하나의 repository에 합치게 되는데, 만약 겹치는 부분이 있다거나, 서로 버전이 맞지 않는 부분이 있다면 필연적으로 conflict가 발생합니다.
-   그럼 어떻게 작업해야 하나요?
    -   branch를 적극적으로 활용하고자 합니다.
        -   branch가 뭐에요? 구글 검색하고 오십쇼
        -   왜 fork 후 PR은 사용하지 않나요? fork하면 자신 개인의 repository가 되기 때문에, 가급적 작업시에는 팀 organization 안에서 했으면 좋겠습니다!
    -   branch 이름 짓기
        -   기능 추가 : feat/기능명 (ex. feat/user-service)
        -   긴급한 수정 : hotfix/기능명 (ex. hotfix/login-error)
    -   새 branch에 push한 후, 다른 팀원에게 합쳐도 괜찮을지 물어봐야 해요!
        -   카톡으로? zoom에서? NO!
        -   어떻게? PR을 활용합니다.
        -   PR이 뭐에요? 구글 검색하고 오십쇼
        -   PR이 완료되면, 새 branch에 작업한 결과가 master branch로 merge됩니다.
        -   많은 PR을 통해, 우리는 완성도 높은 프로젝트를 성공할 수 있습니다!
