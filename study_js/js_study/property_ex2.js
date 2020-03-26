//데이터 프로퍼티 정의

const person = {};

Object.defineProperty(person, 'firstName', {
  value: 'hoyoung',
  writable: true,
  enumerable: true,
  configurable: true
});

Object.defineProperty(person, 'lastName', {
  value: 'Jung'
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
//firstName { value: 'hoyoung', writable: true, enumerable: true, configurable: true }

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
//lastName { value: 'Jung', writable: false, enumerable: false, cofigurable: false }

//[[Enumerable]]의 값이 false인 경우, 해당 프로퍼ㅣ는 for..in문 , Object.keys 등으로 열거할 수 없다.
//lastName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열겨되지 않는다.
console.log(Object.keys(person));
//[ 'firstName' ]

//[[Writable]]의 값이 false인 경우, 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다.
//lastName 프로퍼티는 [[Writable]]의 값이 false이므로 값을 변경할 수 없다.
//이때 값을 변경하면 에러는 발생되지않고 무시된다.
person.lastName = 'Lee';

//[[Configurable]]의 값이 false인 경우, 해당 프로퍼티를 삭제할 수 없다.
//lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 삭제할 수 없다.
//이때 프로퍼티를 삭제하면 에러는 발생되지 않고 무시된다.
delete person.lastName;

//[[Configurable]]의 값이 false인 경우, 해당 프로퍼티를 재정의할 수 없다.
//Object.defineProperty(person. 'lastName', {enumerable: true});
//Uncaucht TypeError: Cannot redufine property: lastName

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
//lastName { value: 'Jung', writable: false, enumerable: false, configurable: false }


//접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
  //getter 함수
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  //setter함수
  set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  configurable: true
});


descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
//fullName {get: ƒ, set: ƒ, enumerable: true, configurable: true}


person.fullName = 'Sora Lee'
console.log(person);
