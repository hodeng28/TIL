// E6부터 도입, iterable을 생성하는 함수
// iterable 이면서 iterator인 객체이다!
// 비동기 처리에 유용하게 사용



const createInfinityByIteration = function () {
  let i = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return {
        value: ++i
      };
    }
  };
};

for (const n of createInfinityByIteration()) {
  if (n > 5) break;
  console.log(n);     // 1 2 3 4 5
}

function* createInfinityByGenerator() {
  let i = 0;
  while (true) {
    yield ++i;
  }
}

for (const n of createInfinityByGenerator()) {
  if (n > 5) break;
  console.log(n);  // 1 2 3 4 5
}

// 함수 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재시작할 수 있는 함수

function* counter() {
  console.log('first call');
  yield 1;                    // 첫번째 호출 시 이 지점까지 실행된다.
  console.log('second call');
  yield 2;                    // 두번쨰 호출 시 이 지점까지 실행된다.
  console.log('third call');  // 세번째 호출 시 이 지점까지 실행된다.
}

const generatorObj = counter();

console.log(generatorObj.next());  // {value: 1, done: false}
console.log(generatorObj.next());  // {value: 2, done: false}
console.log(generatorObj.next());  // {value: 1, done: true}





