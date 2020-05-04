// extends 키워드는 생성자 함수를 상속받아 클래스를 확장할 수 있다.
// 단 extends 앞에는 반드시 클래스가 와야한다.

// 수퍼 (파생/부모) 클래스
class Base {}

// 서브 (파생/자식) 클래스
class Derived extends Base {}

// 상속을 통해 확장된 클래스를 서브클래스
// 서브클래스에게 상속된 클래스를 수퍼 클래스


function Base(a) {
  this.a = a;
}

class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived { a: 1 };







// extends 다음에는 클래스뿐만 아니라 [[Construct]] 내부 메소드를 갖는 
// 함수 객체를 반환하는 모든 표현식을 사용할 수 있다.
// 이를 통해 동적으로 상속받을 대상을 결정할 수 있다.

function Base1() {}

class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브 클래스
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived);   // Derived {}

console.log(drived instanceof Base1);  // true
console.log(drived instanceof Base2);  // false



