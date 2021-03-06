'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const message = document.createElement('div');
const header = document.querySelector('.header');
const btn_scroll_to = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

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


btn_scroll_to.addEventListener('click', (e) => {
//const s1coords = section1.getBoundingClientRect();
//console.log(s1coords);
//console.log(s1coords,pageYOffset,pageXOffset);
//window.scrollTo(s1coords.x,s1coords.y);
  section1.scrollIntoView({ behavior: 'smooth' });
});

{
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

//---- old method :????????

// [...document.getElementsByClassName('nav__link')].forEach(element=>{
//   element.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   })
// });
}

//---- delegation method with bubbling :???????????

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

  // ???? this is a guard clause , alternative of the if
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

//---- implement the fade menu effect :

const handleHover = function(e) {

  const hoverElement = e.target;

  if (hoverElement.classList.contains('nav__link')) {
    hoverElement.closest('.nav__links').querySelectorAll('.nav__link').forEach(element => {
      if (element !== hoverElement) {
        element.style.opacity = this;
      }
      hoverElement.closest('.nav').querySelector('img').style.opacity = this;
    });
  }
};

// old method ???????? :

{
  // nav.addEventListener('mouseover',function(e){
//   if(!(e.target.classList.contains('nav__link') || e.target.classList.contains('nav__logo'))) return;
//   this.querySelector('.nav__logo').style.opacity="0.5";
//   [...this.querySelectorAll('.nav__link')].forEach(elm=> {
//     elm.style.opacity = '.5';
//   });
//   e.target.style.opacity='1';
// })
//
// nav.addEventListener('mouseout',function(){
//   this.querySelector('.nav__logo').style.opacity="1";
//   [...this.querySelectorAll('.nav__link')].forEach(elm=> {
//     elm.style.opacity = '1';
//   });
// })
}

//try it!!=> console.log(handleHover.bind(0.1));

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


//---- implement sticky nav bar :
const heightNavBar = nav.getBoundingClientRect().height;
const callbackObs = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const optionsObs = {
  root: null,
  threshold: 0,
  rootMargin: `${-heightNavBar}px`
};
const observer = new IntersectionObserver(callbackObs, optionsObs);
observer.observe(header);
// old method ????????

{
  // const initialCor = section1.getBoundingClientRect().top;
// window.addEventListener('scroll',function(){
//   if(window.scrollY>=initialCor) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })

// function obsFunction(entries,observer){
//   console.log(entries);
// }
// const ObsOptions={
//   root:null,
//   threshold: 0
// }
// const observer = new IntersectionObserver(obsFunction,ObsOptions);
// observer.observe(section1);
}

//---- implement reveal sections:
const AllSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const SectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: .2
});

AllSections.forEach((section) => {
  SectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//---- implement lazy images loading :
const lazyImages = section1.querySelectorAll('img');

const LazyCallBack = (entries, observer) => {
  const [entry] = entries;
  // if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    this.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const LazyObserver = new IntersectionObserver(LazyCallBack, {
  root: null,
  threshold: 1,
  rootMargin: '200px'
});

lazyImages.forEach(img => {
  LazyObserver.observe(img);
});

//---- implement slider component :

const Sliders = document.querySelectorAll('.slide');
const rightBtn = document.querySelector('.slider__btn--right');
const leftBtn = document.querySelector('.slider__btn--left');
const parentsDots = document.querySelector('.dots');
let curI = 0;

const createDots = () => {
  Sliders.forEach((_, i) => {
    parentsDots.insertAdjacentHTML('beforeend', `<button class='dots__dot' data-slide='${i}'></button>`);
  });
};

const to = (Current) => {
  Sliders.forEach((slide, index) => {
    slide.style.transform = `translateX(${(Current - index) * 100}%)`;
  });
  changeStyleDots(curI);
};

const nextSlide = () => {
  if (curI === Sliders.length - 1) curI = 0;
  else curI++;
  to(curI);
};

const previousSlide = () => {
  if (curI === 0) curI = Sliders.length - 1;
  else curI--;
  to(curI);
};

const changeStyleDots = (CurrentSlide) => {
  [...parentsDots.children].forEach((element, i) => {
    console.log();
    i === +CurrentSlide && element.classList.add('dots__dot--active');
    i !== +CurrentSlide && element.classList.remove('dots__dot--active');
  });
};

createDots();
to(curI);

rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', previousSlide);

document.addEventListener('keydown', function(e) {
  (e.keyCode === 37 && previousSlide());
  (e.keyCode === 39 && nextSlide());
});

parentsDots.addEventListener('click', function(e) {
  if (e.target.classList.contains('dots__dot')) {
    curI = e.target.dataset.slide;
    to(curI);
  }
});