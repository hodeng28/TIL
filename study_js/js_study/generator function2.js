// 이터레이션 프로토콜을 준수하여 피보나치 수열을 생성하는 함수 구현

const infiniteFibonacci = (function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      return {
        value: cur
      };
    }
  }
}());

for (const num of infiniteFibonacci) {
  if (num > 1000) break;
  console.log(num);
}



// 제너레이터를 활용하여 피보나치 수열을 구현한 이터러블 

const infiFibonacci = (function* () {
  let [pre, cur] = [0, 1];

  while (true) {
    [pre, cur] = [cur, pre + cur];
    yield cur;
  }
}());

for (const num of infiFibonacci) {
  if (num > 1000) break;
  console.log(num);
}