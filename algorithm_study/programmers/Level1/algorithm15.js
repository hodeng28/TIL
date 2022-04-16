// 핸드폰 번호 가리기
// 제한 조건
// s는 길이 4 이상, 20이하인 문자열입니다.

function solution(phone_number) {
  let answer = "";
  let number = phone_number.length;

  for (let i = 0; i < number; i++) {
    i < number - 4
      ? (answer = answer + "*")
      : (answer = answer + phone_number[i]);
  }
  return answer;
}

console.log(solution("01033334444"));
console.log(solution("01036300188"));
