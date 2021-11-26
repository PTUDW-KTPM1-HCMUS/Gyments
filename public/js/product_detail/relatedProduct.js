
(function ($) {
    "use Strict";
    /*----------------------------------------------------
    Hot Deal Product Activation
    -----------------------------------------------------*/
    $('.hot-deal-active').owlCarousel({
        loop: false,
        dots: false,
        smartSpeed: 1500,
        margin: 12,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
                smartSpeed: 500
            },
            480: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 5
            }
        }
    })
})(jQuery);

