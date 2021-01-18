const person = {
  //데이터 프로퍼티
  firstName: 'hoyoung',
  lastName: 'Jung',

  //fullName은 접근자 함수로 구성된 접근자 프로퍼티
  //getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  //setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
};

//데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(person.firstName + ' ' + person.lastName);
//hoyoung Jung

//접근자 프로퍼티를 통한 프로퍼티 값의 저장
//접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = 'sora Lee';
console.log(person);
// {fistName: 'sora', lastName: 'Lee}


//접근자 프로퍼티를 통한 프로퍼티 값의 참조
//접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName);
//sora Lee

//firstName은 데이터 프로퍼티이다.
//데이터 프로퍼티는 value, writable, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
//{value: 'sora', writable: ture, enumerable: true, configurable: true}


//fullName은 접근자 프로퍼티이다.
//접근파 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
//{get: ƒ, set: ƒ, enumerable: true, configurable: true}