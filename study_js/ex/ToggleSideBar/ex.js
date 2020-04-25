const $toggle = document.querySelector('.toggle');
const $container = document.querySelector('.container')

$toggle.addEventListener('click', () => {
  $container.classList.toggle('active');
});