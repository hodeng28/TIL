// 자체적으로 값을([[Value]]내부슬롯) 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때
// 사용하는 접근자 함수로 구성된 프로퍼티

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티이다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
}

const me = new Person('hoyoung', 'Jung');

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(`${me.firstName}, ${me.lastName}`); // hoyoung Jung


// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
me.fullName = 'hoyoung Jung';
console.log(me); // { firstName: 'hoyoung', lastName: 'Jung' }

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 값을 저장하면 getter 함수가 호출된다.
console.log(me.fullName); // hoyoung Jung




