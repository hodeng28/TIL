const $clock = document.querySelector('.clock');
const $digitalClock = document.querySelector('.digital-clock');


const $hand = document.querySelector('.hand')

const $hourHand = document.querySelector('.hour');
const $minuteHand = document.querySelector('.hour');
const $secondHand = document.querySelector('.second');



function digitalTimer() {


  timer = setInterval(() => {

      const today = new Date();


      const hour = today.getHours();
      const min = today.getMinutes();
      const sec = today.getSeconds();

      
      
      $digitalClock.innerHTML = `${hour < 10 ? `0${hour}` : hour} : ${min < 10 ? `0${min}` : min} : ${sec < 10? `0${sec}` : sec}`
    }, 1); 
    
      $secondHand.style.transform =  `rotate(${}deg)`    
};
digitalTimer();


