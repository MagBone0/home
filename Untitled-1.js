var slides=document.getElementsByClassName("slide");
var prev=document.querySelector(".prev");
var next=document.querySelector(".next");
var n=0;

function displaynone(){
    for(let i=0;i<slides.length;i++){
        slides[i].style.display='none';
    }
}

function noActive(){
    for(let i=0;i<slides.length;i++){
        slides[i].classList.remove('active');
    }
}

next.addEventListener("click",function(){
    n++;
    if(n>slides.length-1){
        n=0;
    }
    displaynone();
    noActive();
    slides[n].style.display='block';
    slides[n].classList.add('active');
});

prev.addEventListener("click",function(){
    n--;
    if(n<0){
        n=slides.length-1;
    }
    displaynone();
    noActive();
    slides[n].style.display='block';
    slides[n].classList.add('active');
});

setInterval(function(){
    n++;
    if(n>slides.length-1){
        n=0;
    }
    displaynone();
    noActive();
    slides[n].style.display='block';
    slides[n].classList.add('active');
}, 4000);



// JavaScript Document
$(function() {
    "use strict";
    var body = $("body"),
        active = $(".slider ol li, .slider .controll"),
        controll = $(".slider .controll"),
        playpause = $(".playpause"),
        sliderTime = 1,
        sliderWait = 3000,
        i = 999,
        autoRun,
        stop = false;
    // Reset
    $(".slider ul li:first").css("left", 0);
    // Run Slider
    function runSlider(what) {
        what.addClass("active").siblings("li, span").removeClass("active");
    }
    // slider gsap
    function gsapSlider(whose, left) {
        i++;
        if (whose.hasClass("active")) {
            TweenMax.fromTo(
                ".slider ul li.active",
                sliderTime,
                { zIndex: i, left: left },
                { left: 0 }
            );
        }
    }
    // Active
    active.on("click", function() {
        runSlider($(this));
    });
    // Arrow left
    controll.first().on("click", function() {
        var slide = $(".slider ul li.active, .slider ol li.active").is(
            ":first-of-type"
        )
            ? $(".slider ul li:last, .slider ol li:last")
            : $(".slider ul li.active, .slider ol li.active").prev("li");
        runSlider(slide);
        gsapSlider(slide, "100%");
    });
    // Arrow right
    controll.last().on("click", function() {
        var slide = $(".slider ul li.active, .slider ol li.active").is(
            ":last-of-type"
        )
            ? $(".slider ul li:first, .slider ol li:first")
            : $(".slider ul li.active, .slider ol li.active").next("li");
        runSlider(slide);
        gsapSlider(slide, "-100%");
    });
    // Point
    $(".slider ol li").on("click", function() {
        var start = $(".slider ul li.active").index();
        var slide = $(".slider ul li").eq($(this).index());
        runSlider(slide);
        var end = $(".slider ul li.active").index();
        if (start > end) {
            gsapSlider(slide, "100%");
        }
        if (start < end) {
            gsapSlider(slide, "-100%");
        }
    });
    // Auto run slider
    function autoRunSlider() {
        if (body.css("direction") === "ltr" && stop === false) {
            autoRun = setInterval(function() {
                controll.last().click();
            }, sliderWait);
        } else if (body.css("direction") === "rtl" && stop === false) {
            autoRun = setInterval(function() {
                controll.first().click();
            }, sliderWait);
        }
    }
    autoRunSlider();
    // When hover
    active.on("mouseenter", function() {
        if (stop === false) {clearInterval(autoRun);}
    });
    active.on("mouseleave", function() {
        if (stop === false) {autoRunSlider();}
    });
    // play pause click
    playpause.on("click", function() {
        $(this).toggleClass("fa-play-circle-o fa-pause-circle-o");
        if (playpause.hasClass("fa-play-circle-o")) {
            stop = true;
            clearInterval(autoRun);
            $(this).attr('title', 'play');
        }
        if (playpause.hasClass("fa-pause-circle-o")) {
            stop = false;
            autoRunSlider();
            $(this).attr('title', 'pause');
        }
    });

});


const slides = document.querySelector(".slider-inner-container").children;

let index = 0;
function autoPlay(){
  nextSlide();
  updateDotIndicator();
}
function nextSlide(){
  if (index == slides.length - 1) {
     index = 0;
  }
  else{
     index++;
  }
  changeSlide();
}
function changeSlide(){
  for(let i=0; i < slides.length; i++){
     slides[i].classList.remove("active");
  }
  slides[index].classList.add("active");
}
let timer = setInterval(autoPlay, 5000);
