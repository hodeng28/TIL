/**  https://leetcode.com/problems/median-of-two-sorted-arrays/
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
let findMedianSortedArrays = function (nums1, nums2) {
  let result = nums1.concat(nums2).sort((a, b) => a - b);

  if (result.length % 2 === 0) {
    return (result[result.length / 2] + result[result.length / 2 - 1]) / 2;
  } else {
    return result[(result.length - 1) / 2];
  }
};

console.log(findMedianSortedArrays([1, 3], [2]));
console.log(findMedianSortedArrays([1, 2], [3, 4]));
