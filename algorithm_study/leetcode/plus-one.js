/**  https://leetcode.com/problems/plus-one/
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] !== 9) {
      digits[i]++;
      return digits;
    } else {
      // disgits[i]가 9일 경우
      digits[i] = 0;
      if (i === 0) {
        digits.unshift(1); // unshift() - 새로운 요소를 배열의 맨 앞으로 추가하고, 새로운 길이 반환.
        return digits;
      }
    }
  }
};

console.log(plusOne([1, 2, 3]));
console.log(plusOne([4, 3, 2, 1]));
console.log(plusOne([9]));
