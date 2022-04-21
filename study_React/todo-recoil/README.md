## Recoil

###### npm install recoil
###### yarn add recoil



###### React 전용 라이브러리. React 내부 접근성이 용이하다.
###### 전역상태의 설정/정의가 매우 쉬우며, Recoil이 지원하는 Hooks로 이를 get/set 하기 때문에 React 문법과 매우 유사
*****************************************************************************************************************

###### <App />  컴포넌트를 `<RecoilRoot>` 로 감싸기만 하면 사용가능.
  ```
  <RecoilRoot>
     <TodoList />
  </RecoilRoot>
  ```

###### Recoil을 사용하면 atoms (공유 상태)에서 selector(순수 함수)를 거쳐 React 컴포넌트로 내려가는 data-flow graph를 만들 수 있다.

#### Atoms  
- 컴포넌트가 구독할 수 있는 상태의 단위  
- 상태는 공유되며, 구독 및 업데이트 가능
- atom의 상태가 업데이트되면, 이를 구독하는 컴포넌트들은 모두 리렌더링

```
const todoListState = atom({
  key: 'todoListState',
  default: [],
});
```
###### key, default 값이 필수이다.
