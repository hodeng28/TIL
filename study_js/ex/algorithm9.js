// 인수로 주어진 정수의 배열에서 인접한 요소의 곱이 가장 큰 값을 반환하는 함수를 완성하라. 
// 예를 들어 인수가 [3, 6, -2, -5, 7, 3]인 경우, 21을 반환한다.

function adjacentElementsProduct(arr) {

  let max = [];
  for (let i = 0; i < arr.length - 1; i++) {
    max.push(arr[i] * arr[i + 1])
  }
  return Math.max(...max);
}

console.log(adjacentElementsProduct([3, 6, -2, -5, 7, 3]));
