// Page loading animation
$(window).on("load", function () {
  $("#preloader").animate(
    {
      opacity: "0",
    },
    600,
    function () {
      setTimeout(function () {
        $("#preloader").css("visibility", "hidden").fadeOut();
      }, 300);
    }
  );
});

// sticky headers

$(window).bind("scroll resize", function () {
  if ($("body").width() > 355) {
    var header = $(".root>header.sticky-enabled");

    var headerHeight = header.height();

    var scrollTop = $(window).scrollTop();

    if (scrollTop > headerHeight) {
      if (!header.hasClass("sticky")) {
        header.addClass("sticky");

        header.animate({ top: 0 }, 600);

        $(".root").css("padding-top", headerHeight);
      }
    } else {
      if (header.hasClass("sticky")) {
        header.removeClass("sticky");

        header.removeAttr("style");

        $(".root").removeAttr("style");
      }
    }
  } else {
    $(".root").css("padding-top", 0);
  }
});

//logo for retina

/*$('header .title img').each(function() {	

	var retina = window.devicePixelRatio > 1 ? true : false;	

	if(retina) {		

		var filePath = $(this).attr('src');

		var fileName = filePath.substring(filePath.lastIndexOf('/')+1);

		var retinaFileName = fileName.replace('.', '@2x.');

		filePath = filePath.replace(fileName, retinaFileName); 

		$(this).attr('src', filePath);

		$(this).attr('height', '70px');

		$(this).attr('width', '224px');

	}

});*/

//get height of header for slide in menu on mobile

function headerHeight() {
  divHeight = $("section.main-header").height();

  $("header nav:nth-of-type(2)").css({ top: divHeight });
}

//window.addEventListener('load', headerHeight);

//window.addEventListener('resize', headerHeight);

//throttle scroll event listener

window.addEventListener("scroll", throttle(headerHeight, 1000));

//throttle function

function throttle(fn, wait) {
  var time = Date.now();

  return function () {
    if (time + wait - Date.now() < 0) {
      fn();

      time = Date.now();
    }
  };
}

//get height for containers of absolute positioned items

function absoluteHeight() {
  imgHeight = $("span.clients1").height();

  toggleHeight = $(".fa").height();

  toggleWidth = $(".fa").width();

  //mapHeight = $('.map-responsive iframe').height();

  serviceHeight1 = $(
    ".service-container .service-header .service-name"
  ).height();

  serviceHeight = serviceHeight1 + 55;

  $("div.slider4>div").css({ height: imgHeight });

  $(".menu-toggle").css({ height: toggleHeight, width: toggleWidth });

  //$('.map-responsive').css({'height' : mapHeight});

  $(".service-container .service-header").css({ height: serviceHeight });
}

window.addEventListener("load", absoluteHeight);

window.addEventListener("resize", throttle(absoluteHeight, 1000));

//menu toggle

$(document).ready(function () {
  $(".menu-toggle").click(function () {
    //set distance from header

    headerHeight();

    $("header nav:nth-of-type(2)").toggleClass("active");

    //determine if icon is active

    if ($(".fa-bars").hasClass("activate")) {
      $(".fa-bars").removeClass("activate");

      $(".fa-bars").addClass("deactivate");
    } else if ($(".fa-bars").hasClass("deactivate")) {
      $(".fa-bars").removeClass("deactivate");

      $(".fa-bars").addClass("activate");
    } else {
      $(".fa-bars").addClass("deactivate");
    }

    if ($(".fa-times").hasClass("activate")) {
      $(".fa-times").removeClass("activate");

      $(".fa-times").addClass("deactivate");
    } else if ($(".fa-times").hasClass("deactivate")) {
      $(".fa-times").removeClass("deactivate");

      $(".fa-times").addClass("activate");
    } else {
      $(".fa-times").addClass("activate");
    }
  });

  $("ul li.sub-menu").click(function () {
    $(this).siblings().removeClass("active");

    $(this).toggleClass("active");
  });
});

//go-top link behaviour

$(".go-top").each(function () {
  var gt = $(this);

  var scrollTop = 0;

  gt.hide();

  $(window).scroll(function () {
    scrollTop = $(window).scrollTop();

    if (scrollTop >= 170) gt.fadeIn();
    else gt.fadeOut();
  });

  $(window).bind("resize load", function () {
    if ($(window).height() < $("body").height() && scrollTop >= 170)
      gt.fadeIn();
    else gt.fadeOut();
  });
});

//fancy borders on images

$("footer .widget_photos img")
  .not(
    ".content .testimonial img, .hp-services img, .logo, h3 img, button img, .product-meta img, .img-border img"
  )
  .each(function () {
    var i = $(this);

    i.wrap('<span class="img-border"></span>');

    if (i.hasClass("alignleft")) {
      i.removeClass("alignleft");

      i.parent().addClass("alignleft");
    }
  });

function WpMessage(e) {

  const wpmessage = `"¡Hola! Estoy interesado en sus servicios de evaluación de integridad del talento humano. ¿Podrían proporcionarme más información?" `;

  const url = `https://api.whatsapp.com/send?phone=593995527670&text=${wpmessage}&source=&data=`;

  const win = window.open(url, "_blank");
  win.focus();
	e.preventDefault();
}
