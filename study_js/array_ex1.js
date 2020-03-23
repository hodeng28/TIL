// 1. html 생성
// 아래 배열을 사용하여 html을 생성하는 함수를 작성하라.

const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function render() {
  let html = '';
  todos.forEach(function (todo) {
    html += `<li id="${todo.id}"><label><input type="checkbox" ${todo.completed ? 'checked' : ''}>${todo.content}</label></li>`
  });
  return html;
}

console.log(render());

//
//  arrow function
// function render() {
//   let html = '';
//   todos.forEach((todo) => {
//     html += `<li id="${todo.id}"><label><input type="checkbox" ${todo.completed ? 'checked' : ''}>${todo.content}</label></li>`;
//   });
//   return html;
// }

// console.log(render());




// 2. 특정 프로퍼티 값 추출
// 요소의 프로퍼티(id, content, completed)를 문자열 인수로 전달하면 todos의 각 요소 중, 해당 프로퍼티의 값만을 추출한 배열을 반환하는 함수를 작성하라.
// 단, for 문이나 Array#forEach는 사용하지 않도록 하자.






// 3. 프로퍼티 정렬
// 요소의 프로퍼티(id, content, completed)를 문자열 인수로 전달하면 todos의 요소를 정렬하는 함수를 작성하라.

// 단, todos는 변경되지 않도록 하자.

참고: Array.prototype.sort

const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function sortBy(key) {
  return todos.sort((a, b) => a[key] > b[key] ? 1 : (a[key] < b[key]) ? -1 : 0 );
}

console.log(sortBy('id'));
/*
[
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false }
]
*/
console.log(sortBy('content'));
/*
[
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/
console.log(sortBy('completed'));
/*
[
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true }
]
*/
