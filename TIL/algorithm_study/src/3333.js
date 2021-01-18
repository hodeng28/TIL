class CircularQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.front = 0;
    this.rear = 0;
    this.array = new Array(capacity);
  }

  put(value) {
    if (this.rear === this.capacity) {
      console.log('overflow');
      return false;
    }
    this.array[rear++] = value;
    return true;
  }

  get() {
    if (this.front === this.rear) {
      console.log('underflow');
    }
    return this.array[this.front++];

  }

  peek() {
    if (this.front === this.rear) {
       
    }
  }

  print() {

  }
}