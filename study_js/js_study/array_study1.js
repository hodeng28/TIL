
// Array.isArray
// Array 생성자 함수의 정적 메소드
// Array.isArray는 주어진 인수가 배열이면 true, 배열이 아니면 false를 반환

// true
Array.isArray([]);
Array.isArray([1, 2]);
Array.isArray(new Array());


//false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(1);
Array.isArray('Array');
Array.isArray(false);
Array.isArray(true);
Array.isArray({ 0: 1, length: 1 });



// Array.prototype.indexOf
// 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환한다.
// 해당하는 요소가 업슨 경우, -1을 반환한다.


const arr = [1, 2, 3, 3];

console.log(arr.indexOf(1));
console.log(arr.indexOf(3));
// 배열에서 요소 3을 검색하여 첫번째 인덱스를 반환
console.log(arr.indexOf(5));
// 배열에 요소 5가 없으므로 -1을 반환
console.log(arr.indexOf(3, 3));
// 두번째 인수는 검색을 시작할 인덱스이다. (두번째 인수를 생락하면 처음부터 검색)


// indexOf 메소드는 배열에 요소가 존재하는지 확인할 때 유용하다.


const appleSeries = ['macbook', 'iphone', 'ipad', 'imac'];

if (appleSeries.indexOf('magicMouse') === -1) {   // 배열에 'magicMouse' 가 있는지 확인
  appleSeries.push('magicMouse');   // 존재하지 않으면 요소를 추가
}
console.log(appleSeries);

// ES7에서 새롭게 도입된 Array.prototype.includes 메소드가 더 가독성이 좋다.

const animals = ['cat', 'dog', 'pig'];

if (!animals.includes('snake')) {
  animals.push('snake');
}
console.log(animals);



// Array.prototype.push
// push 메소드는 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고
// 변경된 length 값을 반환한다.
// push 메소드는 원본 배열을 직접 변경한다.

const arr1 = [1, 2];

let result = arr1.push(3, 4);
console.log(result);
console.log(arr1);

// push 메소드는 성능면에서 좋지 않다. push 메소드는 배열의 마지막에 요소를 추가하므로
// lenght 프로퍼티를 사용하여 직접 요소를 추가할 수도 있다. (push메소드 보다 빠름)

const arr2 = [1, 2, 3];
arr2[arr2.length] = 4;
console.log(arr2);

// 또한 push 메소드는 원본 배열을 직접 변경하는 부수 효과가 있다.
// ES6의 스프레드 문법을 사용하는 것이 좋다.

const arr3 = [1, 2];
const newArr = [... arr3, 3];
console.log(newArr);



// Array.prototype.pop
// pop 메소드는 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
// 원본 배열이 빈 배열이면 undifined를 반환한다. 
// 원본 배열을 직접 변경한다.

const arr4 = [1, 2];

let res = arr4.pop();
console.log(res);
console.log(arr4);


// Array.prototype.unshift
// 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 값을 반환한다.
// unshift 메소드는 원본 배열을 직접 변경한다.

const arra = [1, 2];

let a = arra.unshift(3, 4);
console.log(a);  // 변경된 length 값을 반환
console.log(arra);

// 스프레드 문법을 쓰는 것이 더 좋다.

const arra1 = [1, 2];
const newArra = [3, ...arra1];
console.log(newArra);


// Array.prototype.shift
// 원본 배열에서 첫번째 요소를 제거하고 제거한 요소를 반환한다.
// 원본 배열이 빈 배열이면 undifined를 반호나한다.
// shift 메소드는 원본 배열을 직접 변경한다.

const arra2 = [1, 2];

let b = arra2.shift();
console.log(b);
console.log(arra2);



// Array.prototype.concat
// 인수로 전달된 값들을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다.
// 인수로 전달한 값이 배열인 경우, 배열을 해체하여 새로운 배열의 요소로 추가한다.
// 원본 배열은 변경되지 않는다.

const array1 = [1, 2];
const array2 = [3, 4];

let result3 = array1.concat(array2);
console.log(result1);

result1 = array1.concat(3);
console.log(result1);

result1 = array1.concat(array2, 5); // 두번째 값은 마지막 요소로 추가
console.log(result1);

console.log(array1);


// concat 메소드는 ES6의 스프레드 문법으로 대체 가능하다


result2 = [...[1, 2], ...[3, 4]];
console.log(result2);


