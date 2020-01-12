
'use strict';
//by Tatyana Nagaeva

$(function() {

    //declare variables
    var width = 720;
    var animationSpeed = 3000;
    var pause = 2000;
    var currentSlide = 1;

    
    var $slider = $('#slider');
    var $slideContainer = $('.slides', $slider);
    var $slides = $('.slide', $slider);

    var interval;
    //funciton start Slider
    function startSlider() {
        interval = setInterval(function() { //set interval 
            $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, 
            	function() {
                if (++currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }
            });
        }, pause);
    }
    //pause function to clear interval
    function pauseSlider() {
        clearInterval(interval);
    }
    // to pause and start slideshow on mouseenter and mouseleave
    $slideContainer
        .on('mouseenter', pauseSlider)
        .on('mouseleave', startSlider);

    startSlider();


});
