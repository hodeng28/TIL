// 1

function sayHi() {
  console.log(name);        // undifined
  console.log(age);         // ReferenceError

  var name = 'jung';
  let age = 32;
}

sayHi();


// 2

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);    // 3 3 3 
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);    // 0 1 2
}


// 3

const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.Pi * this.radius   
};

console.log(shape.diameter());
console.log(shape.perimeter());

// 화살표 함수는 this를 바인딩 할 수 없어서 상위 컨텍스트의 this를..
// 여기서 상위 컨텍스트는 전역. 따라서 this는 undifined    그래서.. NaN

