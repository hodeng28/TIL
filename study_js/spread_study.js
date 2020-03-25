// ES6 ~
// only iterable 
// ...

// array
// 1
const arr = [...[1, 2],3, 4];
console.log(arr);   // [1, 2, 3, 4]

// 2
const arr1 = [1, 2];
const arr2 = [3, 4];

arr1.push(...arr2);
console.log(arr1);   // [1, 2, 3, 4]

// 3
const array1 = [1, 4];
const array2 = [2, 3];

array1.splice(1, 0, ...array2);
console.log(array1);   // [1, 2, 3, 4]

// 4
const origin = [1, 2];
const copy = [...origin];

console.log(copy);   // [1, 2]
console.log(copy === origin);   // false   (shallow copy)

// 5
function sum () {
  const args = [...arguments];

  return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2, 3, 4));   // 10


//------------------------------------------------------------------

// object
// 1
const obj = {  x: 1, y: 2 };
const deplicate = { ...obj };

console.log(deplicate);   // { x: 1, y:2 }
console.log(obj === deplicate);   // false 

// 2 
const merged = { x: 1, y: 2, ...{ a: 3, b: 4 } };
console.log(merged);   // { x: 1, y: 2, a: 3, b: 4 }

// 3
const overlap = { ... { x: 1, y: 2 }, ...{ y: 10, z: 3} };
console.log(overlap);   // { x: 1, y: 100, z: 3 }

// 4
const added = { ...{ x: 1, y: 2}, z: 0 };
console.log(added);   // { x: 1, y: 2, z: 0}










