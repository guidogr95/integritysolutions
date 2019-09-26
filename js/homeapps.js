/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
(function( $ ){
	"use strict";
  
	$.fn.counterUp = function( options ) {
  
	  // Defaults
	  var settings = $.extend({
		  'time': 400,
		  'delay': 10
	  }, options);
  
	  return this.each(function(){
  
		  // Store the object
		  var $this = $(this);
		  var $settings = settings;
			var $originalText = $this.text();

		  var counterUpper = function() {
			  var nums = [];
			  var divisions = $settings.time / $settings.delay;
			  var num = $originalText;
			  var isComma = /[0-9]+,[0-9]+/.test(num);
			  num = num.replace(/,/g, '');
			  var isInt = /^[0-9]+$/.test(num);
			  var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
			  var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;
  
			  // Generate list of incremental numbers to display
			  for (var i = divisions; i >= 1; i--) {
  
				  // Preserve as int if input was int
				  var newNum = parseInt(num / divisions * i);
  
				  // Preserve float if input was float
				  if (isFloat) {
					  newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
				  }
  
				  // Preserve commas if input had commas
				  if (isComma) {
					  while (/(\d+)(\d{3})/.test(newNum.toString())) {
						  newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
					  }
				  }
  
				  nums.unshift(newNum);
			  }
  
			  $this.data('counterup-nums', nums);
			  $this.text('0');
  
			  // Updates the number until we're done
			  var f = function() {
				  if (!$this.data('counterup-nums')) {
					  return;
				  }
				  $this.text($this.data('counterup-nums').shift());
				  if ($this.data('counterup-nums').length) {
					  setTimeout($this.data('counterup-func'), $settings.delay);
				  } else {
					  delete $this.data('counterup-nums');
					  $this.data('counterup-nums', null);
					  $this.data('counterup-func', null);
				  }
			  };
			  $this.data('counterup-func', f);
  
			  // Start the count up
			  setTimeout($this.data('counterup-func'), $settings.delay);
		  };
  
		  // Perform counts when the element gets into view
		  $this.waypoint(counterUpper, { offset: '100%', triggerOnce: true });
	  });
  
	};
  
  })( jQuery );

  $(".num").counterUp({delay:3, timeout: 1000});

  //Homepage slider
  //slider 
let sliderImages = document.querySelectorAll('.slide'),
arrowLeft = document.querySelector('#arrow-left'),
arrowRight = document.querySelector('#arrow-right'),
current = 0;

//clear all images
function reset(){
for (let i = 0; i < sliderImages.length; i++){
	sliderImages[i].style.display = 'none';
}
}
//Initialise slider
function startSlide(){
reset();
sliderImages[0].style.display = 'block';
}

//Show previous, and reset automatic next slider
function slideLeft(){
stopSlide();
var sliderIn = sliderImages[current - 1].className.slice(6);
if (sliderIn.slice(5) == 3) {
	var sliderOut = "slide1"
} else if (sliderIn.slice(5) == 2) {
	var sliderOut = "slide3"
} else if (sliderIn.slice(5) == 1) {
	var sliderOut = "slide2"
}
$('.' + sliderOut).animate({right:"-100%", opacity: "0"}, 900, function(){$('.' + sliderOut).css({"display": "none", "right": "", "opacity": ""});});
$('.' + sliderIn).fadeIn(800);
current--;
startSlider();
}

//Show next, and reset automatic next slider
function slideRight(){
stopSlide();

var sliderIn = sliderImages[current + 1].className.slice(6);
if (sliderIn.slice(5) == 3) {
	var sliderOut = "slide2"
} else if (sliderIn.slice(5) == 2) {
	var sliderOut = "slide1"
} else if (sliderIn.slice(5) == 1) {
	var sliderOut = "slide3"
}
//$('.' + sliderOut).fadeOut(300);
$('.' + sliderOut).animate({left:"-100%", opacity: "0"}, 900, function(){$('.' + sliderOut).css({"display": "none", "left": "", "opacity": ""});});
$('.' + sliderIn).fadeIn(800);

//$('.' + sliderIn).fadeIn(800);
current++;
startSlider();
}

//Left arrow click
arrowLeft.addEventListener('click', function(){
if(current == 0){
	current = sliderImages.length;
}
slideLeft();
});

//Right arrow click
arrowRight.addEventListener('click', function(){
if(current == sliderImages.length - 1){
	current = -1;
}
slideRight();
});

startSlide();

//automatic slider
function autoNext() {
// your function code here
if(current == sliderImages.length - 1){
	current = -1;
}
slideRight();
}

//stop automatic slider on hover and continue when mouse leaves
var theInterval;

function startSlider() {
theInterval = setInterval(autoNext, 7000);
}

function stopSlide() {
clearInterval(theInterval);
}

$(function () {
startSlider();
$('.box').hover(function () {
	stopSlide();
}, function () {
	startSlider();
})
});