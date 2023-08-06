const mobileMenuElements = document.querySelectorAll('.mobile-menu');
const mobileMenuToggle = document.querySelectorAll('.toggle-menu');
const navElement = document.querySelector('.navigation');

mobileMenuToggle.forEach(el => {
  el.addEventListener('click', () => {
    mobileMenuElements.forEach(childEl => {
      navElement.classList.contains('active') ? childEl.classList.remove('active') : childEl.classList.add('active')
    })
  })
})