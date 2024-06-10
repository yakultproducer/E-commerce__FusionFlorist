// public/js/owlCarousel.js

export const initializeOwlCarousel = () => {
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
        });
    });
};

