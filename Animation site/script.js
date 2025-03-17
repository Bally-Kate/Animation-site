'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Координаты элементов
const btnScroll = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScroll.addEventListener('click', function() {
  /* window.scrollTo({
    left: section1.getBoundingClientRect().left + window.pageXOffset,
    top: section1.getBoundingClientRect().top + window.pageYOffset,
    behavior: 'smooth',
  }) */
  section1.scrollIntoView({behavior: 'smooth'})
})


//Делигирование событий
/* document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (ev) {
    ev.preventDefault()
    const id = this.getAttribute('href')
    console.log(id)
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  })
}) */

const nav = document.querySelector('.nav__links')

nav.addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})


// Создаём табы
const tabs = document.querySelectorAll('.operations__tab')
const tabContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

tabContainer.addEventListener('click', function (e) {
  e.preventDefault()
  const clicked = e.target.closest('.operations__tab')
  if (!clicked) return // То же самое если бы писали if (clicked) {здесь прописывали бы уже все дальнейшие условия}

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  tabsContent.forEach((content) => 
    content.classList.remove('operations__content--active')
  )

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

//Создание прозрачного меню
function hover (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('.nav__logo')

    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = this
      }
    })
    logo.style.opacity = this
  }
}

nav.addEventListener('mouseover', hover.bind(0.5))
nav.addEventListener('mouseout', hover.bind(1))


//Фиксация навигационного меню при прокрутке
const navContainer = document.querySelector('.nav')
//const coord = section1.getBoundingClientRect()

/* window.addEventListener('scroll', function () {
  if (window.scrollY > coord.top) {
    navContainer.classList.add('sticky')
  } else {
    navContainer.classList.remove('sticky')
  }
}) */ // Такой метод устаревший и не рекомендуется, тк создаётся слишком много событий, они тормозят систему

function callBack (entries) {
  if (!entries[0].isIntersecting) {
    navContainer.classList.add('sticky')
  } else {
    navContainer.classList.remove('sticky')
  }
}
const options = {
  threshold: 0.1,
  rootMargin: '-90px'
}

const observer = new IntersectionObserver(callBack, options)
observer.observe(document.querySelector('.header'))


//Всплытие секций при прокрутке
/* const allSections = document.querySelectorAll('.section')

function revealSection (entries, observe) {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove('section--hidden')
    observe.unobserve(entries[0].target)
  }
}

const sectionsObserver = new IntersectionObserver(revealSection, {threshold: 0.15})

allSections.forEach(function (section) {
  sectionsObserver.observe(section)
  section.classList.add('section--hidden')
}) */


//Подгрузка изображений с лучшем качеством при прокрутке
const images = document.querySelectorAll('img[data-src]')

function loadImg (entries, observer) {
  if (!entries[0].isIntersecting) return
  entries[0].target.src = entries[0].target.dataset.src
  entries[0].target.addEventListener('load', function () {
    entries[0].target.classList.remove('lazy-img')
  })
  observer.unobserve(entries[0].target)
}
const imgObserver = new IntersectionObserver(loadImg, {threshold: 0.15})

images.forEach(img => {
  imgObserver.observe(img)
})


//Слайдер
const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
const btnRight = document.querySelector('.slider__btn--right')
const btnLeft = document.querySelector('.slider__btn--left')
const dotsContainer = document.querySelector('.dots')

let currSlide = 0
const maxSlides = slides.length

function createDots () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML('beforeend', `
      <button class="dots__dot" data-slide="${i}"></button>
      `)
  })
}
createDots()

function activateDots (slide) {
  document.querySelectorAll('.dots__dot').forEach(function (dot) {
    dot.classList.remove('dots__dot--active')
  })
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}
activateDots(0)

function goToSlide (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`
  })
}
goToSlide(0)

function nextSlide () {
  if (currSlide === maxSlides - 1) {
    currSlide = 0
  } else {
    currSlide++
  }
  goToSlide(currSlide)
  activateDots(currSlide)
}

function prevSlide () {
  if (currSlide === 0) {
    currSlide = maxSlides - 1
  } else {
    currSlide--
  }
  goToSlide(currSlide)
  activateDots(currSlide)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevSlide()
  }
  if (e.key === 'ArrowRight') {
    nextSlide()
  }
})

dotsContainer.addEventListener('click', function (e) {
  if(e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide
    currSlide = +slide
    goToSlide(slide)
    activateDots(slide)
  }
})





































































// Отмена и всплытие событий
/* const h1 = document.querySelector('h1')

function alertH1 () {
  alert('Hello')
}

h1.addEventListener('mouseenter', alertH1)

setTimeout(function () {
  h1.removeEventListener('mouseenter', alertH1)
}, 2000) */


/* function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor () {
  return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
}

const nav = document.querySelector('.nav')
const navLinks = document.querySelector('.nav__links')
const link = document.querySelector('.nav__link')

nav.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor()
  console.log(e.target)
  console.log(e.currentTarget === this)
})

navLinks.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor()
})

link.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor()
  //e.stopPropagation() //Останавливает всплытие событий. Лучше не использовать, так как нарушает структуру работы html 
})
 */
