// 정적 메소드와 프로토타입 메소드는 자신이 속해 있는 프로토타입 체인이 다르다.
// 정적 메소드는 클래스로 호출, 프로토타입 메소드는 인스턴스로 호출한다.
// 정적 메소드는 인스턴스 프로퍼티를 참조할 수 없다. 
// 프로토타입 메소드는 인스턴스 프로퍼티를 참조할 수 있다.


class Square {
  // 정적 메소드
  static area(width, height) {
    return width * height;
  }
}

console.log(Square.area(10, 10)); // 100

const square = new Square();
square.area();  // TypeError: square.area is noa a function


// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

class Square {
  constructor(width, height) {
    this.width = width;    
    this.height = height;
    // 메소드 내부의  this는 메소드를 호출한 객체
    // 즉 메소드 이름 앞의 마침표 연산자 앞에 기술한 객체에 바인딩된다.
  }

  // 프로토타입 메소드
  area() {
    return this.width * this.height;
  }
}

const square = new Square(10, 10);
console.log(square.area()); // 100
