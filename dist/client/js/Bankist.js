"use strict";const popup=document.querySelector(".popup"),closeBtn=document.querySelector(".close"),scrollTop=document.querySelector(".scroll-top"),header=document.querySelector("header"),navHeader=document.querySelector(".nav"),navImg=document.querySelector(".nav img"),btnNavMedia=document.querySelector(".btn__ul"),navLinksContainer=document.querySelector(".nav__links"),navLinks=document.querySelectorAll(".nav__links .nav__item .nav__link"),learnMoreBtn=document.querySelector(".btn__title"),openAccBtn=document.querySelectorAll(".btn__acc"),sections=document.querySelectorAll(".section"),featureSection=document.querySelector(".feature"),imgFeature=document.querySelectorAll(".image__section"),operationTabs=document.querySelector(".operation__btns"),operationBtns=document.querySelectorAll("btn__tabs"),operationContent=document.querySelectorAll(".tabs"),slides=document.querySelectorAll(".slide"),arrowLeft=document.querySelector(".arrow-left"),arrowRight=document.querySelector(".arrow-right"),bulletSlide=document.querySelector(".bullet__slide");let navLinksTarget;const opacity=t=>{navLinks.forEach(e=>e.style.opacity=t),navImg.style.opacity=t},btnClickEffect=()=>{btnNavMedia.style.display="none",setTimeout(()=>btnNavMedia.style.display="block",10)},navHeight=(navHeader.addEventListener("mouseover",function(e){(navLinksTarget=e.target.closest(".nav__link"))&&(opacity(".5"),navLinksTarget.style.opacity="1")}),navHeader.addEventListener("mouseout",function(e){navLinksTarget&&opacity("1")}),navHeader.addEventListener("click",function(e){if(e.preventDefault(),navLinksTarget&&!e.target.closest(".btn__acc")){const t=navLinksTarget.getAttribute("href");document.getElementById(""+t.slice(1)).scrollIntoView({behavior:"smooth"}),navLinksContainer.style.display="none",btnNavMedia.classList.remove("btn__nav-active"),btnClickEffect()}}),openAccBtn.forEach(e=>e.addEventListener("click",()=>popup.classList.remove("hidden"))),btnNavMedia.addEventListener("click",function(){btnNavMedia.classList.toggle("btn__nav-active"),btnClickEffect();var e=e=>navLinksContainer.style.display===e;e("none")||e("")?navLinksContainer.style.display="block":navLinksContainer.style.display="none"}),learnMoreBtn.addEventListener("click",()=>document.querySelector(".feature").scrollIntoView({behavior:"smooth"})),closeBtn.addEventListener("click",()=>popup.classList.add("hidden")),document.addEventListener("keydown",e=>{"Escape"===e.key&&popup.classList.add("hidden")}),window.addEventListener("scroll",function(){670<this.scrollY?scrollTop.classList.remove("hidden"):scrollTop.classList.add("hidden")}),scrollTop.addEventListener("click",()=>{scrollTo({top:0,left:0,behavior:"smooth"})}),navHeader.getBoundingClientRect().height),navFixed=function(e){var[e]=e;e.isIntersecting?navHeader.classList.remove("nav-fixed"):navHeader.classList.add("nav-fixed")},navObserveOption={root:null,threshold:0,rootMargin:`-${navHeight}px`},headerObserve=new IntersectionObserver(navFixed,navObserveOption),sectionsEffect=(headerObserve.observe(header),function(e){const[t]=e;t.isIntersecting&&t.target.classList.remove("section-effect")}),sectOption={root:null,threshold:.2},sectObserver=new IntersectionObserver(sectionsEffect,sectOption),imgEffect=(sections.forEach(e=>{sectObserver.observe(e),e.classList.add("section-effect")}),function(e){const[t]=e,n=t.target.firstElementChild;e=n.getAttribute("src").replace("-lazy.",".");t.isIntersecting&&(n.src=e,t.target.classList.remove("img-effect"))}),imgoption={root:null,threshold:.9},imgObserver=new IntersectionObserver(imgEffect,imgoption);imgFeature.forEach(e=>{imgObserver.observe(e),e.classList.add("img-effect")}),operationTabs.addEventListener("click",function(e){e=e.target.closest(".btn__tabs");e&&(operationContent.forEach(e=>e.classList.add("hidden")),document.querySelector(".tab--"+e.dataset.tab).classList.remove("hidden"))});let curr=0,maxSlide=slides.length;const activeBullet=function(e){document.querySelectorAll(".bullet").forEach(e=>e.classList.remove("bullet-active")),document.querySelector(`.bullet[data-slide="${e}"]`).classList.add("bullet-active")},transfer=n=>slides.forEach((e,t)=>{e.style.transform=`translateX(${100*(t-n)}%)`}),nextSlide=(transfer(0),activeBullet(0),function(){curr===maxSlide-1?curr=0:curr++,transfer(curr),activeBullet(curr)}),previous=function(){0===curr?curr=maxSlide-1:curr--,transfer(curr),activeBullet(curr)};arrowLeft.addEventListener("click",previous),arrowRight.addEventListener("click",nextSlide),document.addEventListener("keydown",function(e){"ArrowLeft"===e.key&&previous(),"ArrowRight"===e.key&&nextSlide()}),bulletSlide.addEventListener("click",function(e){var t,e=e.target.closest(".bullet");e&&(t=+e.dataset.slide,curr=+e.dataset.slide,transfer(t),activeBullet(t))});
//# sourceMappingURL=Bankist.js.map
