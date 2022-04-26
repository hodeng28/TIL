/**  https://leetcode.com/problems/single-number
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const res = Math.floor(nums.length / 2);

  for (let i = 0; i < res; i++) {
    const item = nums.shift();
    const index = nums.findIndex((n) => n === item);
    if (index > -1) {
      nums.splice(index, 1);
    } else {
      return item;
    }
  }
  return nums[0];
};
