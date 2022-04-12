/** https://leetcode.com/problems/remove-element/
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let result = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[result++] = nums[i];
    }
  }

  return result;
};
