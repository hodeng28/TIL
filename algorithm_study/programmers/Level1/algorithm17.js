// 가운데 글자 가져오기

function solution(s) {
  var answer = "";

  answer =
    s.length % 2
      ? s[Math.floor(s.length / 2)]
      : s[Math.floor(s.length / 2 - 1)] + s[Math.floor(s.length / 2)];

  return answer;
}

console.log(solution("qwerwqer"));
console.log(solution("jung"));
