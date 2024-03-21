// navbar

$(function () {
  // navbar
  var sticky = $('#navbar').offset();
  $(window).scroll(function () {
    if ($(this).scrollTop() >= sticky.top) {
      $('#dummy-nav').height($('#navbar').outerHeight());
      $('#navbar').addClass("sticky");
      $('#nav-logo').css("visibility", "visible");
      $('#nav-logo').css("opacity", "1");

    } else {
      $('#dummy-nav').height(0);
      $('#navbar').removeClass("sticky");
      $('#nav-logo').css("visibility", "hidden");
      $('#nav-logo').css("opacity", "0");

    }
  });


  //   carousel
  $(document).ready(function() {
    $('.owl-carousel').owlCarousel({
      center: false,
      loop: true,
      stagePadding: 0,
      margin: 20,
      smartSpeed: 1000,
      autoplay: true,
      autoplayTimeout: 7000,
      nav: true,
      navText: ['<i class="bi bi-caret-left-fill" aria-hidden="true"></i>', '<i class="bi bi-caret-right-fill" aria-hidden="true"></i>'],
      // navContainer: '.main-content .custom-nav',
      dots: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1140: {
          items: 4
        },
        1600: {
          items: 5
        }
      }
    })
  });
  let items = document.querySelectorAll('.carousel .carousel-item')

  items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i = 1; i < minPerSlide; i++) {
      if (!next) {
        // wrap carousel by using first child
        next = items[0]
      }
      let cloneChild = next.cloneNode(true)
      el.appendChild(cloneChild.children[0])
      next = next.nextElementSibling
    }
  })




});


