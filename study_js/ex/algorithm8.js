// 인수로 주어진 배열 arr에서 짝수이고 3보다 큰 수만을 구하여 이를 배열로 반환하는 함수를 작 성하라

function getArray(arr) {
   // 1
   // const res = arr.splice(3);
   // return res;

   const res = arr.slice(3);
   return res;
}

console.log(getArray([1, 2, 3, 4, 5, 6]));