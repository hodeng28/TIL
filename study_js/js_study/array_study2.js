// shift 메소드와 push 메소드를 사요앟여 큐를 구현
// 큐(queue) - FIFO

const Queue = (function () {
  function Queue ( array  = []) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an array.`)
    }
    this.array = array;
  }
  Queue.prototype.push = function (value) {
    return this.array.push(value);
  };
  Queue.prototype.shift = function () {
    return this.array.shift();
  };

    return Queue;
}());

const queue = new Queue([1, 2]);
console.log(queue);

queue.push(3);
console.log(queue);

queue.shift();
console.log(queue); 


// 특정 요소를 제거  
// indexOf 메소드로 특정 요소 위치 취득, splice 메소드 사용
const arr = [1, 2, 3, 1, 2];
// 배열 array에서 v요소 제거. v요소가 여러개라도 하나만 제거
function remove(array, v) {
  const index = array.indexOf(v);

  if (index !== -1) array.splice(index, 1);

  return array;
}

console.log(remove(arr, 2));
console.log(remove(arr, 10));

// filter 메소드를 이용한 특정 요소 제거
// 중복된 경우 모두 제거

const arr1 = [1, 2, 3, 1 ,2];

function remove1(array, item) {
  return array.filter(v => v!== item);
}

console.log(remove1(arr1 , 2));

// slice ,  얕은 복사

const todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'JavaScript', completed: false }
];

const _todos = todos.slice();
console.log(_todos === todos);
console.log(_todos[0] === todos[0]);


// 유사 배열 객체를 배열로 변환  slice

function sum () {
  var arr2 = Array.prototype.slice.call(arguments);
  console.log(arr2);

  return arr2.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}
console.log(sum(1, 2, 3));
//
// 스프레드 문법

function sum1 () {
  const arr3 = [...arguments];
  console.log(arr3);

  return arr3.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum1(1, 2, 3));
//
//
//
// 고차 함수  (클로저를 반환하는)
function makeCounter(predicate) {
  let num = 0;
  return function () {
    num = predicate(num);
    return num;
  };
}

function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

const increaser = makeCounter(increase);
console.log(increaser());
console.log(increaser());

const decreaser = makeCounter(decrease);
console.log(decreaser());
console.log(decreaser());

//
//
// 객체를 요소로 갖는 배열을 정렬

const todos1 = [
  { id: 4, content: 'JavaScript' },
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' }
];

function compare(key) {
  return function (a, b) {
    return a[key] > b[key] ? 1 : (a[key] < b[key] ? -1: 0);
    // 프로퍼티 값이 문자열이면, - 산술연산으로 비교하면 NaN이 나오므로 비교연산 사용
  };
}

todos1.sort(compare('id'));
console.log(todos1);

todos1.sort(compare('content'));
console.log(todos1);

//
//
// forEach 메소드에 두번째 인수로 메소드 내부에서 this로 사용될 객체를 전달할 수 있다.

class Numbers {
  numberArray = [];

  multiply(array) {
    array.forEach(function (item) {
      this.numberArray.push(item * item);
    }, this);  // <===== forEach 메소드 내부에서 this로 사용될 객체를 전달 (두번째 인수)
  }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray);
//
// 화살표 함수

class Numbers1 {
  numberArray1 = [];

  multiply(array1) {
    array1.forEach(item => this.numberArray1.push(item * item));
  }
}
const numbers1 = new Numbers1();
numbers1.multiply([1, 2, 3]);
console.log(numbers1.numberArray1);
