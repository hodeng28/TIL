const $popup = document.querySelector('.popup');
const $togglePopup = document.querySelector('.toggle-popup');
const $btnClose = document.querySelector('.btn-close');
const $btnCancel =document.querySelector('.btn-cancel');


const removePopUp = () => $popup.classList.toggle('on');

$togglePopup.addEventListener('click', removePopUp);

$btnClose.addEventListener('click', removePopUp);

$btnCancel.addEventListener('click', removePopUp);


