// super 키워드는 함수처럼 호출할 수 있고, 
// this와 같이 식별자처럼 참조할 수 있는 특수한 키워드이다.

// super 호출하면 수퍼 클래스의 constructor(super-constructor)를 호출한다.

class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    // super class 내부에서 추가한 프로퍼티를 그대로 갖는 인스턴스를 생성한다면
    // 서브 클래스의 constructor 생략할 수 있다.
  }
}

class Derived extends Base {
  // 암묵적으로 default  constructor가 정의
  // constructor(...args)  { super(...args); }
}

const derived = new Derived(1, 2);
console.log(derived);  // Derived { a: 1, b: 2 }



// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

class Base {
  constructor(a, b) {  // 4.
    this.a = a;
    this.b = b;
  }
}

class Derived extends Base {
  constructor(a, b, c) {   // 2.
    super(a, b);   // 3.
    this.c = c;
  }
}

const derived = new Derived(1, 2, 3);    // 1.
console.log(derived); // Derived { a: 1, b: 2, c: 3 }


// new 연산자오 함께 Derived class를 호출하면서 전달한 인수는
// Derived class의 constructor에 전달되고 

// super 호출을 통해 Base class의 constructor에게 일부가 전달된다.
