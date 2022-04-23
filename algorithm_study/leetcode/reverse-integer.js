/**  https://leetcode.com/problems/reverse-integer/
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const answer = parseInt(x.toString().split("").reverse().join(""));

  return x > 0 ? answer : -answer;
};

console.log(reverse(123));
console.log(reverse(-123));
console.log(reverse(120));
