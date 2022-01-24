// array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.
// divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.

function solution(arr, divisor) {
  let answer = [];

  arr.map((number) => {
    number % divisor === 0 && answer.push(number);
  });
  answer.sort((a, b) => a - b);

  if (answer.length === 0) answer.push(-1);

  return answer;

  // 참고해서 줄여본 return
  // return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b);
}

console.log(solution([5, 9, 7, 10], 5));
console.log(solution([2, 36, 1, 3], 1));
console.log(solution([3, 2, 6], 10));

// 다른 사람들의 답.  filter를 사용. 굳이 if문을 쓸 필요가 없었다.
// var answer = arr.filter(v => v%divisor == 0);
// return answer.length == 0 ? [-1] : answer.sort((a,b) => a-b);
