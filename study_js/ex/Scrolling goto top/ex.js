const $scrollIcon = document.querySelector('.scroll-icon');

$scrollIcon.style.display = 'inline-block'
  
$scrollIcon.addEventListener('click', (e) => {
  window.scroll(0, top);
  
});
