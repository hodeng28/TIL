// 요구 사항
// 최소값은 0이다. 즉, 0과 양수만으로 카운트한다.
// 클로저를 사용하여 상태(카운트 값)을 안전하게 유지한다.

const $container = document.querySelector('.container');
const $counter = document.querySelector('.counter')
const $increase = document.querySelector('.increase');
const $decrease = document.querySelector('.decrease');


const Counter = ( function () {

let num = 0;
function Counter () {

};

Counter.prototype.increase = () => {
  $counter.textContent = ++num;
};

Counter.prototype.decrease = () => {
  if (num <= 0) return;
  $counter.textContent = --num;
};

  return Counter;
}());

const counter = new Counter();

$increase.onclick = counter.increase;
$decrease.onclick = counter.decrease;
  
