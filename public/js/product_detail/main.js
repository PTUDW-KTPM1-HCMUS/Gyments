(function ($) {
    "use Strict";
    /*----------------------------------------------------
    Hot Deal Product Activation
    -----------------------------------------------------*/
    $('.hot-deal-active').owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        smartSpeed: 1500,
        navText: ["<i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i>", "<i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>"],
        margin: 10,
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
    // $('.hot-deal-active3').owlCarousel({
    //     loop: false,
    //     nav: true,
    //     dots: false,
    //     smartSpeed: 1500,
    //     navText: ["<i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i>", "<i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>"],
    //     margin: 10,
    //     responsive: {
    //         0: {
    //             items: 1,
    //             autoplay: true,
    //             smartSpeed: 500
    //         },
    //         480: {
    //             items: 1
    //         },
    //         768: {
    //             items: 1
    //         },
    //         992: {
    //             items: 1
    //         },
    //         1200: {
    //             items: 1
    //         }
    //     }
    // })

    /*-------------------------------------
    Thumbnail Product activation
    --------------------------------------*/
    $('.thumb-menu').owlCarousel({
        loop: false,
        // navText: ["<i class='lnr lnr-arrow-left'></i>", "<i class='lnr lnr-arrow-right'></i>"],
        navText: ["<i class=\"arrow_slider fa fa-arrow-left\" aria-hidden=\"true\"></i>", "<i class=\"arrow_slider fa fa-arrow-right\" aria-hidden=\"true\"></i>"],
        margin: 15,
        smartSpeed: 1000,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 3,
                autoplay: true,
                smartSpeed: 500
            },
            768: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })
    $('.thumb-menu a').on('click', function () {
        $('.thumb-menu a').removeClass('active');
    })

})(jQuery);