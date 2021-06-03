'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function(e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookie for improved functionality and analytics.<button class="btn btn--close-cookie">Go it!</button>';
const header = document.querySelector('.header');
header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove();
});

message.style.width = '100%';
// console.log(getComputedStyle(message));
// console.log(document,document.documentElement);
// document.documentElement.style.setProperty('--color-primary','orangered');
// console.log(header.dataset);
const btn_scroll_to = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btn_scroll_to.addEventListener('click', (e) => {
// const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);
//   // console.log(s1coords,pageYOffset,pageXOffset);
//   window.scrollTo(s1coords.x,s1coords.y);
  section1.scrollIntoView({ behavior: 'smooth' });
});

// console.log(document.documentElement.clientHeight,document.documentElement.clientWidth);

// const h1 = document.querySelector('h1');
// const h1Color =getComputedStyle(h1).color;
// h1.addEventListener('mouseenter',function(e){
//   this.style.color = 'red';
// })
// h1.onmouseleave = function(e){
//   this.style.color = h1Color;
// }
// h1.addEventListener('mouseup',()=>{
//   alert('You can\'t copy it!')
// },true)
//
// const smoothScroll = (target, duration) => {
//   const animationType = (t, b, c, d) => {
//     t /= d / 2;
//     if (t < 1) return (c / 2) * t * t * t * t + b;
//     t -= 2;
//     return (-c / 2) * (t * t * t * t - 2) + b;
//   };
//   let targetPosition = target.getBoundingClientRect().top,
//     scrollPosition = pageYOffset,
//     difference = targetPosition - scrollPosition,
//     timeStart = null;
//   function animation(currentTime) {
//     timeStart = timeStart === null ? currentTime : timeStart;
//     let timeElapsed = currentTime - timeStart,
//       run = animationType(timeElapsed, scrollPosition, difference, duration);
//     window.scrollTo(0, run);
//     if (timeElapsed < duration) requestAnimationFrame(animation);
//   }
//   requestAnimationFrame(animation);
// };

//---- old method :👇🏼

// [...document.getElementsByClassName('nav__link')].forEach(element=>{
//   element.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   })
// });

//---- delegation method with bubbling :👇🏼✅

document.querySelector('.nav__links').addEventListener('click', function(e) {
  if (e.target.classList.contains('nav__link')) {
    console.log('test');
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});


//---- implement tabbed component :

document.querySelector('.operations__tab-container').addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  // you can also use closest to get the parent operations__tab , if is not find will return null and we check it by if else:

  // 👍 this is a guard clause , alternative of the if
  if (!clicked) return;
  // remove activate classes :
  [...clicked.parentElement.children].forEach(element => {
    element.classList.remove('operations__tab--active');
  });
  // add activate class:
  clicked.classList.add('operations__tab--active');
  const id = clicked.dataset.tab;
  // add && remove activate content :
  [...document.querySelectorAll('.operations__content')].forEach(element => {
    if (element.classList.contains(`operations__content--${id}`)) element.classList.add('operations__content--active');

    else element.classList.remove('operations__content--active');
  });
});