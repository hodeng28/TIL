function solution(numbers) {
  let result = [];

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const addNumber = numbers[i] + numbers[j];
      if (!result.includes(addNumber)) {
        // inclues ES7에서 도입된 메소드  배열 내에 특정 요소가 포함되어 있는지 확인하여  boolean 값 반환.
        result.push(addNumber);
      }
    }
  }
  result.sort((a, b) => a - b);

  return result;
}

console.log(solution([2, 1, 3, 4, 1]));
console.log(solution([5, 0, 2, 7]));
