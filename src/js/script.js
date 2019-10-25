$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 300,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #little').fadeOut('fast');
    });
    $(document).on('click', '.overlay', function(event) {
        if ($(event.target).closest('.modal').length === 0) {
            $('.overlay, #consultation, #order, #little').fadeOut('fast');
        }
    });
    $(document).on('keydown', function(event) {
        if (event.keyCode === 27) {
            $('.overlay, #consultation, #order, #little').fadeOut('fast');
        }
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function ValidaForms(form){
        $(form).validate({
            rules:{
                name:{
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true
                },
                email:{
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Минимальное количество символов {0}")
                },
                phone: {
                    required: "Пожалуйста, введите номер телефона"
                },
                email: {
                  required: "Пожалуйста, введите адрес электронной почты",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    }
    ValidaForms('#consultation-form');
    ValidaForms('#consultation form');
    ValidaForms('#order form');
    
    $('input[name=phone').mask("+7(999) 999-9999");

    $('form').submit(function(e){
        console.log('it works')
        e.preventDefault();
        $.ajax({
            type:'POST',
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #little').fadeIn();
            $('form').trigger('reset');
        });
        return false;
    });

    //scroll and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1200) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $("a[href^='#']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
  });
      