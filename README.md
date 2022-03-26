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
