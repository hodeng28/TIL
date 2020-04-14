// 요구 사항
// 버튼을 처음 클릭하면 스톱워치가 시작하고 버튼을 다시 클릭하면 일시 정지와 시작을 반복한다.



// 클릭하면 시간 멈추고,  start -> stop 
// 다시 클릭하면  stop -> start   반전.

const $control = document.querySelector('.control');
const $display = document.querySelector('.display')


let id;

let msec = 0;
let sec = 0;
let min = 0;

$control.onclick = () => {

if ($control.textContent === 'Stop') {

    clearInterval(id);
    $control.innerHTML = 'Start';

} else {
  $control.innerHTML = 'Stop';
  
  id = setInterval(() => {
    msec += 1;
        
    if (msec === 100) {
      sec += 1;
      msec = 0;  
    } 

    if (sec === 60) {
      min += 1;
      sec = 0;
    }
  
    $display.textContent = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}:${msec < 10 ? `0${msec}` : msec}`;
  }, 10);
  }
};

