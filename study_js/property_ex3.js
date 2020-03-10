const person = {};

Object.defineProperties(person, {
  firstName: {
    value: 'Hoyoung',
    writable: true,
    enumerable: true,
    configurable: true
  },

  lastName: {
    value: 'Jung',
    writable: true,
    enumrable: true,
    configurable: true
  },

  fullName: {
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(name) {
      [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable: true,
    configurable: true
  }
});

person.fullName = 'sora Lee';
console.log(person);
