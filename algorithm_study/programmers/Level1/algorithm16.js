// 2022년 1월 1일은 토요일입니다. 2022년 a월 b일은 무슨 요일일까요?
// 두 수 a ,b를 입력받아 2022년 a월 b일이 무슨 요일인지 리턴하는 함수, solution을 완성하세요.
// 요일의 이름은 일요일부터 토요일까지 각각 SUN,MON,TUE,WED,THU,FRI,SAT 입니다.
// 예를 들어 a=5, b=24라면 5월 24일은 화요일이므로 문자열 TUE를 반환하세요.

// 제한 조건
// 2022년 a월 b일은 실제로 있는 날입니다. (13월 26일이나 2월 45일같은 날짜는 주어지지 않습니다)

function getDayName(a, b) {
  let answer = "";
  const monthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const weekList = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];

  let sumDate = 0;
  for (let i = 0; i < a - 1; i++) {
    sumDate += monthList[i];
  }

  a <= a + 1 ? (sumDate += b - 1) : (sumDate += b);
  console.log(sumDate);
  return (answer = weekList[sumDate % 7]);
}

console.log(getDayName(2, 7));
console.log(getDayName(4, 15));
