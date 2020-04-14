const $clock = document.querySelector('.clock');
const $digitalClock = document.querySelector('.digital-clock');


const $hand = document.querySelector('.hand')

const $hourHand = document.querySelector('.hour');
const $minuteHand = document.querySelector('.minute');
const $secondHand = document.querySelector('.second');



function digitalTimer() {


  timer = setInterval(() => {

      const today = new Date();


      const hour = today.getHours();
      const min = today.getMinutes();
      let sec = today.getSeconds();

      $hourHand.style.transform = `rotate(${hour*30}deg)`
      $minuteHand.style.transform = `rotate(${min*6}deg)`
      $secondHand.style.transform = `rotate(${sec*6}deg)`
      
      
      $digitalClock.innerHTML = `${hour < 10 ? `0${hour}` : hour} : ${min < 10 ? `0${min}` : min} : ${sec < 10? `0${sec}` : sec}`
    }, 1000); 

};
digitalTimer();

