// 1차원의 점들이 주어졌을 때, 그 중 가장 거리가 짧은 것(들)의 쌍을 배열로 반환하는 함수를 작 성하라. (단 점들의 배열은 모두 정렬되어있다고 가정한다.)

function findMinDistance(array) {
  const res = [];
  const minList = [];

  for (let i = 0; i < array.length - 1; i++) {
    minList.push(array[i + 1] - array[i]);
    console.log(minList); // [2, 1, 4, 5, 4, 3, 3, 1]
  }
  const min = Math.min(...minList);
  console.log(min); // 1
  for (let i = 0; i < array.length - 1; i++) {
    array[i + 1] - array[i] === min ? res.push([array[i], array[i + 1]]) : null;
  }
  return res;
}

console.log(findMinDistance([1, 3, 4, 8, 13, 17, 20, 23, 24]));
console.log(findMinDistance([1, 5, 9, 12, 13, 18, 29, 45, 47]));
