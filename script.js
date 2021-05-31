'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookie for improved functionality and analytics.<button class="btn btn--close-cookie">Go it!</button>';
const header = document.querySelector('.header');
header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove();
})

message.style.width="100%";
// console.log(getComputedStyle(message));
// console.log(document,document.documentElement);
// document.documentElement.style.setProperty('--color-primary','orangered');
// console.log(header.dataset);
const btn_scroll_to = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btn_scroll_to.addEventListener('click',(e)=>{
const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // console.log(s1coords,pageYOffset,pageXOffset);
  window.scrollTo(s1coords.x,s1coords.y);
})

// console.log(document.documentElement.clientHeight,document.documentElement.clientWidth);