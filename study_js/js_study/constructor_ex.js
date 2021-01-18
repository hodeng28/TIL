//1
{
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle = Circle(5);

console.log(circle); //undifiend  
}  // new 연산자가 없으므로  일반함수,  일반함수 Circle은 반환문이 없으므로 암묵적으로 undifined를 반환


//2
{
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter === circle2.getDiameter); //false
}


//3
{
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
const circle = new Circle(5);
console.log(radius);  //ReferenceError
}