// 0부터 9까지의 숫자 중 일부가 들어있는 정수 배열 numbers가 매개변수로 주어집니다.
// numbers에서 찾을 수 없는 0부터 9까지의 숫자를 모두 찾아 더한 수를 return 하도록 solution 함수를 완성해주세요.

function solution(numbers) {
  let answer = 0;

  for (let i = 0; i < 10; i++) {
    if (!numbers.includes(i)) {
      answer += i;
    }
  }

  return answer;
}

console.log(solution([1, 2, 3, 4, 6, 7, 8, 0]));
console.log(solution([5, 8, 4, 0, 6, 7, 9]));

// 다른 사람의 답

// function solution(numbers) {
//     return 45 - numbers.reduce((cur, acc) => cur + acc, 0);
// }
// 배열이 0에서 9까지 정해져있으니, 전체 합계를 구해서 계산했어도 됐을거 같다.
