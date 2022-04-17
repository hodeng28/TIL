// 1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하는 함수, solution을 만들어 보세요.
// 소수는 1과 자기 자신으로만 나누어지는 수를 의미합니다.
// (1은 소수가 아닙니다.)

function solution(n) {
  let num = 0;
  let answer = 0;

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if (i % j === 0) {
        num++;
      }
    }
    if (num <= 2) {
      answer++;
    }
    num = 0;
  }
  return answer;
}

console.log(solution(10));
console.log(solution(4));

// 테스트 10~12 시간초과, 효율성테스트 실패
