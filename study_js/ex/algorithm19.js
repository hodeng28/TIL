// x만큼 간격있는 n개의 숫자

function solution(x, n) {
  let answer = [];

  for (let i = 1; i <= n; i++) {
    answer.push(i * x);
  }
  return answer;
}

console.log(solution(2, 5));
console.log(solution(4, 3));
console.log(solution(-4, 2));
