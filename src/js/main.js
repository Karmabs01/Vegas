import $ from 'jquery';
//body preloader
$(window).on('load', function () {
  setTimeout(function () { // allowing 3 secs to fade out loader
    $('.page-loader').fadeOut('slow');
  }, 3500);
});

//On Scroll Header fixed to top

$(window).scroll(function () {
  if ($(window).scrollTop() >= 50) {
    $('header').addClass('fixed-top smooth');
  }
  else {
    $('header').removeClass('fixed-top smooth');
  }
});

//menu toggel
$('.menu-toggle').on('click', function () {
  $('.btn-wrapper').toggleClass('menu--is-revealed');
});

// menu link click close collapse
$('.navbar-collapse a').click(function () {
  $(".navbar-collapse").collapse('hide');
  $(".btn-wrapper").toggleClass('menu--is-revealed');
});

// On Scroll back to top button
$(window).on('scroll', function () {
  // Back Top Button
  if ($(window).scrollTop() > 500) {
    $('.scrollup').addClass('back-top');
  } else {
    $('.scrollup').removeClass('back-top');
  }
});
// On Click Section Switch
// used for back-top
$('[data-type="section-switch"]').on('click', function () {
  if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
    var target = $(this.hash);
    if (target.length > 0) {

      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});

//review slider
$('#carouselReview').owlCarousel({
  loop: false,
  margin: 30,
  nav: true,
  dots: false,
  items: 1,
  navText: ["<i className='bi bi-arrow-left-short'></i>", "<i className='bi bi-arrow-right-short'></i>"],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 1
    }
  }
});

// aos animation
AOS.init();

// video frame open popup
jQuery(document).ready(function ($) {
  // Define App Namespace
  var popup = {
    // Initializer
    init: function () {
      popup.popupVideo();
    },
    popupVideo: function () {

      $('.video_model').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        gallery: {
          enabled: true
        }
      });

      // Image Gallery Popup
      $('.gallery_container').magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        gallery: {
          enabled: true
        }
      });

    }
  };
  popup.init($);
});

//partner slider
$(document).ready(function () {
  $('#carouselPartner').owlCarousel({
    margin: 30,
    dots: false,
    nav: false,
    loop: true,
    autoplay: false,
    autoplaySpeed: 2000,
    items: 6,
    responsive: {
      0: {
        items: 2,
        center: true,
      },
      600: {
        items: 3
      },
      1000: {
        items: 6
      }
    }
  });
});

//trending game slider
$('#carouselTrending').owlCarousel({
  loop: false,
  margin: 20,
  nav: true,
  dots: false,
  items: 3,
  navText: ["<i className='bi bi-arrow-left-short'></i>", "<i className='bi bi-arrow-right-short'></i>"],
  navContainer: '.trending .custom-nav',
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 3
    }
  }
});

//streaming video slider
$('#carouselStream').owlCarousel({
  loop: true,
  center: true,
  margin: 50,
  nav: false,
  dots: false,
  items: 2,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 2
    }
  }
});

// Deal counter
function updateTimer() {
  future = Date.parse("March 11, 2024 11:30:00");
  now = new Date();
  diff = future - now;

  days = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours = Math.floor(diff / (1000 * 60 * 60));
  mins = Math.floor(diff / (1000 * 60));
  secs = Math.floor(diff / 1000);

  d = days;
  h = hours - days * 24;
  m = mins - hours * 60;
  s = secs - mins * 60;

  document.getElementById("timer")
    .innerHTML =
    '<div>' + d + '<span>Days</span></div>' +
    '<div>' + h + '<span>Hrs</span></div>' +
    '<div>' + m + '<span>Min</span></div>' +
    '<div>' + s + '<span>Sec</span></div>';
}
setInterval('updateTimer()', 1000);

//streamer slider
$('#carouselStreamer').owlCarousel({
  loop: false,
  margin: 20,
  nav: true,
  dots: true,
  items: 4,
  navText: ["<i className='bi bi-arrow-left-short'></i>", "<i className='bi bi-arrow-right-short'></i>"],
  navContainer: '.features .custom-nav',
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 4
    }
  }
});

// cursor dot js
var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor-f');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function () {
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function () {
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
})