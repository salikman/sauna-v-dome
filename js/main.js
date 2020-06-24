(function ($) {
  "use strict";
  
  AOS.init();
  ///////////////////////////
  // Презагрузка
  $(window).on("load", function () {
    $("#preloader").delay(600).fadeOut();
  });

  ///////////////////////////
  // Кнопка navbar-collapse
  $("#nav .navbar-collapse").on("click", function () {
    $("#nav").toggleClass("open");
  });
  $("#nav .navbar-aside").on("click", function () {
    $(".page").toggleClass("open-aside");
  });
  $("#nav .navbar-aside").on("click", function () {
    $(".left-side").toggleClass("visible");
  });
  ///////////////////////////
  // On Scroll
  $(window).on("resize load scroll", function () {
    var wWidth = $(this).width();
    var wScroll = $(this).scrollTop();

    wScroll > 1
      ? $("#nav").addClass("fixed-nav")
      : $("#nav").removeClass("fixed-nav");

    if (wWidth <= 530) {
      $("#services__gallery").slick({
        arrows: false,
        dots: true,
        dotsClass: "dots",
      });
    }
  });
  // Init fancybox
  // =============
  var selector = ".slick-slide:not(.slick-cloned)";

  // Attach custom click event on cloned elements,
  // trigger click event on corresponding link
  $(document).on("click", ".slick-cloned", function (e) {
    $(selector)
      .eq(
        ($(e.currentTarget).attr("data-slick-index") || 0) % $(selector).length
      )
      .trigger("click.fb-start", {
        $trigger: $(this),
      });

    return false;
  });

  $(".slider-single").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    adaptiveHeight: true,
    infinite: false,
    useTransform: true,
    speed: 400,
    prevArrow:
      '<button type="button" class="single-gallery-prev"><i class="fa fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="single-gallery-next"><i class="fa fa-chevron-right"></i></button>',
    cssEase: "cubic-bezier(0.77, 0, 0.18, 1)",
  });

  $(".slider-nav")
    .on("init", function (event, slick) {
      $(".slider-nav .slick-slide.slick-current").addClass("is-active");
    })
    .slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      infinite: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    });

  $(".slider-single").on("afterChange", function (event, slick, currentSlide) {
    $(".slider-nav").slick("slickGoTo", currentSlide);
    var currrentNavSlideElem =
      '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
    $(".slider-nav .slick-slide.is-active").removeClass("is-active");
    $(currrentNavSlideElem).addClass("is-active");
  });

  $(".slider-nav").on("click", ".slick-slide", function (event) {
    event.preventDefault();
    var goToSingleSlide = $(this).data("slick-index");

    $(".slider-single").slick("slickGoTo", goToSingleSlide);
  });

  
  $("#show-category").on("click", function () {
    $(".left-side").toggleClass("visible");
  });

  $(".left-side").mCustomScrollbar({
    axis: "y", // vertical scrollbar
  });

  $(".scrollTable").mCustomScrollbar({
    axis: "x", // vertical scrollbar
    teme: "dark-thick",
  });
})(jQuery);
// Accordion
$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find(".link");
    // Evento
    links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el;
    ($this = $(this)), ($next = $this.next());

    $next.slideToggle();
    $this.parent().toggleClass("open");

    if (!e.data.multiple) {
      $el.find(".submenu").not($next).slideUp().parent().removeClass("open");
    }
  };

  if ($(window).width() < 980) {
    var accordion = new Accordion($("#accordion"), false);
  } else {
    var accordion = new Accordion($("#accordion"), true);
  }
});
