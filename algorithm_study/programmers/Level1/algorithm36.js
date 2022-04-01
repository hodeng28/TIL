// 중복되는 수 제거
//

function solution(nums) {
  let answer = [];
  const maxChoice = nums.length;

  for (let i = 0; i < maxChoice; i++) {
    // if (answer.indexOf(nums[i]) === -1) {
    //   answer.push(nums[i]);
    // }
    // if (answer.length >= maxChoice / 2) {
    //   return answer.length;
    // }
    if (!answer.includes(nums[i]) && answer.length < maxChoice / 2) {
      answer.push(nums[i]);
    }
  }
  return answer.length;
}

console.log(solution([3, 1, 2, 3]));
console.log(solution([3, 3, 3, 2, 2, 4]));
console.log(solution([3, 3, 3, 2, 2, 2]));

// 다른사람들의 풀이.
// const max = nums.length / 2;
// const arr = [...new Set(nums)];    new Set 활용..

// return arr.length > max ? max : arr.length
