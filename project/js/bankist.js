"use strict";

//////// SELECTION ////////
// popup selection + scroll to top
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close");
const scrollTop = document.querySelector(".scroll-top");
// header selection
const header = document.querySelector("header");
const navHeader = document.querySelector(".nav");
const navImg = document.querySelector(".nav img");
const btnNavMedia = document.querySelector(".btn__ul");
const navLinksContainer = document.querySelector(".nav__links");
const navLinks = document.querySelectorAll(".nav__links .nav__item .nav__link");
const learnMoreBtn = document.querySelector(".btn__title");
const openAccBtn = document.querySelectorAll(".btn__acc"); // exist in header + section 4
// main page
const sections = document.querySelectorAll(".section");
const featureSection = document.querySelector(".feature");
const imgFeature = document.querySelectorAll(".image__section");
const operationTabs = document.querySelector(".operation__btns");
const operationBtns = document.querySelectorAll("btn__tabs");
const operationContent = document.querySelectorAll(".tabs");
const slides = document.querySelectorAll(".slide");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const bulletSlide = document.querySelector(".bullet__slide");

// manipulation
let navLinksTarget;

//////// NOTE HEADER FUNCTIONS AND EVENTS ////////
//////// mouse over event on navHeader ////////
const opacity = (val) => {
  navLinks.forEach((el) => (el.style.opacity = val));
  navImg.style.opacity = val;
};

const btnClickEffect = () => {
  btnNavMedia.style.display = "none";
  setTimeout(() => (btnNavMedia.style.display = "block"), 10);
};

navHeader.addEventListener("mouseover", function (e) {
  navLinksTarget = e.target.closest(".nav__link");
  if (navLinksTarget) {
    opacity(".5");
    navLinksTarget.style.opacity = "1";
  }
});

navHeader.addEventListener("mouseout", function (e) {
  if (navLinksTarget) opacity("1");
});

//////// click event on navLinks in navHeader so move to sections ////////
navHeader.addEventListener("click", function (e) {
  e.preventDefault();
  if (navLinksTarget && !e.target.closest(".btn__acc")) {
    const href = navLinksTarget.getAttribute("href");
    document
      .getElementById(`${href.slice(1)}`)
      .scrollIntoView({ behavior: "smooth" });

    // hidden linkscontainer after click on link and remove active from btn
    navLinksContainer.style.display = "none";
    btnNavMedia.classList.remove("btn__nav-active");
    btnClickEffect();
  }
});

//////// click event on open account (show popup) ////////
openAccBtn.forEach((acc) =>
  acc.addEventListener("click", () => popup.classList.remove("hidden"))
);

//////// click event on btn in media to show links ////////
btnNavMedia.addEventListener("click", function () {
  btnNavMedia.classList.toggle("btn__nav-active");
  btnClickEffect();

  // show links
  const navDisplay = (val) => navLinksContainer.style.display === val;

  if (navDisplay("none") || navDisplay(""))
    navLinksContainer.style.display = "block";
  else navLinksContainer.style.display = "none";
});

//////// click event on learn more button ////////
learnMoreBtn.addEventListener("click", () =>
  document.querySelector(".feature").scrollIntoView({ behavior: "smooth" })
);
/////////////////////////////////////////////////////////////////////////////////
//////// NOTE manipulate popup + scroll to top ////////
closeBtn.addEventListener("click", () => popup.classList.add("hidden"));

// close popup by escape keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") popup.classList.add("hidden");
});

// scroll to top (scroll event)
window.addEventListener("scroll", function () {
  this.scrollY > 670
    ? scrollTop.classList.remove("hidden")
    : scrollTop.classList.add("hidden");
});

// scroll to top (click event)
scrollTop.addEventListener("click", () => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
////////////////////////////////////////////////////////////////////////////////
//////// NOTE navheader effect by intersection observe ////////
const navHeight = navHeader.getBoundingClientRect().height;
const navFixed = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navHeader.classList.add("nav-fixed");
  else navHeader.classList.remove("nav-fixed");
};

const navObserveOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserve = new IntersectionObserver(navFixed, navObserveOption);
headerObserve.observe(header);
///////////////////////////////////////////////////////////////////////////////
//////// NOTE sections effect by intersection observer ////////
const sectionsEffect = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) entry.target.classList.remove("section-effect");
};

const sectOption = {
  root: null,
  threshold: 0.2,
};

const sectObserver = new IntersectionObserver(sectionsEffect, sectOption);

// observe four sections
sections.forEach((sec) => {
  sectObserver.observe(sec);
  sec.classList.add("section-effect");
});
//////////////////////////////////////////////////////////////////////////////
//////// NOTE image effect in feature section by intersection observer ////////
const imgEffect = function (entries) {
  const [entry] = entries;
  const target = entry.target.firstElementChild;

  // change src for image
  let changeSrc = target.getAttribute("src").replace("-lazy.", ".");

  if (entry.isIntersecting) {
    target.src = changeSrc;
    entry.target.classList.remove("img-effect");
  }
};

const imgoption = {
  root: null,
  threshold: 0.9,
};

const imgObserver = new IntersectionObserver(imgEffect, imgoption);
imgFeature.forEach((img) => {
  imgObserver.observe(img);
  img.classList.add("img-effect");
});
///////////////////////////////////////////////////////////////////////////
//////// NOTE operation btns transfer between tabs ////////
operationTabs.addEventListener("click", function (e) {
  const target = e.target.closest(".btn__tabs");

  if (!target) return; // gaurd clause

  // hidden all content
  operationContent.forEach((ele) => ele.classList.add("hidden"));

  // display only content linked with data tab
  document
    .querySelector(`.tab--${target.dataset.tab}`)
    .classList.remove("hidden");
});
///////////////////////////////////////////////////////////////////////////
//////// NOTE slides in testimonials ////////
let curr = 0;
let maxSlide = slides.length;

// function for active bullets in slide
const activeBullet = function (currSlide) {
  // remove active bullet from all
  document
    .querySelectorAll(".bullet")
    .forEach((bull) => bull.classList.remove("bullet-active"));

  // add active to bullet depend on curr clide
  document
    .querySelector(`.bullet[data-slide="${currSlide}"]`)
    .classList.add("bullet-active");
};

// function go slide
const transfer = (slide) =>
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });

// start position and active first bullet
// 0% => 100% => 200%......
transfer(0);
activeBullet(0);

// click event on right arrow (next slide)
// 100 * (0 - 1) => -100%, 100 * (1 - 1) => 0%, 100 * (2 - 1) => 100%.....
// click again: 100 * (0 - 2) => -200%, 100 * (1 - 2) => -100%, 100 * (2 -2) => 0%.....
const nextSlide = function () {
  curr === maxSlide - 1 ? (curr = 0) : curr++;

  // go slide
  transfer(curr);

  // active bullet
  activeBullet(curr);
};

// click event on left arrow (previous slide)
/*
- when click twice on arrow right then after that event curr = 2 
- so we are in slide number three to move back we should decrease curr-- => 1
- first click: 100 * (0 - 1) => -100%, 100 * (1 - 1) => 0%, 100 * (2 - 1) => 100%.....
- click again: curr-- => 0
- 100 * (0 - 0) => 0%, 100 * (1 - 0) => 100%, 100 * (2 - 0) => 200%....
**** and so on so far *****
*/
const previous = function () {
  curr === 0 ? (curr = maxSlide - 1) : curr--;

  // go slide
  transfer(curr);

  // active bullet
  activeBullet(curr);
};

arrowLeft.addEventListener("click", previous);
arrowRight.addEventListener("click", nextSlide);
document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && previous();
  e.key === "ArrowRight" && nextSlide();
});

//////// manipulate bullets in slide ////////
bulletSlide.addEventListener("click", function (e) {
  const bulletTarget = e.target.closest(".bullet");

  if (!bulletTarget) return;

  const slide = +bulletTarget.dataset.slide;

  // when click on bullet reset curr to dataset in bullet
  curr = +bulletTarget.dataset.slide;

  // go slide
  transfer(slide);

  // active bullet
  activeBullet(slide);
});
