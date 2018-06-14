$(function() {

    $('#summernote').summernote({
        lang: 'ru-RU',
        height: 200
    });
    // субменю в шапке

    $(".main-nav__list li").on('mouseenter', function(event) {
        var submenu = $(this).find('ul');

        submenu.fadeIn(300);

    }).on('mouseleave', function(event) {
        var submenu = $(this).find('ul');

        submenu.fadeOut(300);
    });



// проджект меню
    $(".project-menu__toggler").on('click', function(event) {

        if ($(this).next('.dropdown').is(':visible')) {
            $(this).next('.dropdown').fadeOut(300);
        }
        else{
            $(this).next('.dropdown').fadeIn(300);
        }

    });

//    скрываем дропдаун при клике на любое место страницы, кроме самого дропдауна
//    второй ответ https://ru.stackoverflow.com/questions/140922/%D0%9A%D0%B0%D0%BA-%D0%B2-javascript-%D0%B7%D0%B0%D0%BA%D1%80%D1%8B%D0%B2%D0%B0%D1%82%D1%8C-div-%D0%BF%D1%80%D0%B8-%D0%BA%D0%BB%D0%B8%D0%BA%D0%B5-%D0%B2%D0%BD%D0%B5-%D1%8D%D1%82%D0%BE%D0%B3%D0%BE-%D0%B4%D0%B8%D0%B2%D0%B0
//    http://api.jquery.com/fadetoggle/

    $(document).on('click', function(e) {
        if (!$(e.target).closest(".project-menu__toggler-wrapper").length) {
            $('.dropdown').fadeOut('fade');
        }
        e.stopPropagation();
    });

// стилизация селектоы
    styleSelects();
    function styleSelects() {
        var xhr;
        var select_state, $select_state;
        var select_city, $select_city;

        $select_state = $('.form-field--drop').selectize({
            onChange: function(value) {
                if (!value.length) return;
                select_city.disable();
                select_city.clearOptions();
                select_city.load(function(callback) {
                    xhr && xhr.abort();
                    xhr = $.ajax({
                        url: 'http://www.corsproxy.com/api.sba.gov/geodata/primary_city_links_for_state_of/' + value + '.json',
                        success: function(results) {
                            select_city.enable();
                            callback(results);
                        },
                        error: function() {
                            callback();
                        }
                    })
                });
            }
        });
    }



// роскрытие фильтра на странице проектов (projects.html)
    $("#project-controls__toggler--filter").on('click', function(event) {
        $(this).toggleClass('is-active');
        $('.filter-form-wrapper').slideToggle();
    });



// табы на странице projects-page.html
    $(".tabs__list li").on('click', function(event) {

        var index = $(this).index(),
            target = $(".tabs-content__item").eq(index);

        target.addClass('is-shown').siblings().removeClass('is-shown');

        $(this).addClass('is-active').siblings().removeClass('is-active');

    });


// высота шапки может измениться. Узнаем высоту шапки, делаем паддинг для body - шапка фиксированная всегда
    paddigTopForBody();
    function paddigTopForBody() {
        var headerHeight = $('.header').height();
        $('body').css('padding-top', headerHeight);
    }


    $('#date-1').datepicker({
        uiLibrary: 'bootstrap4',
        locale: 'ru-ru',
        format: 'dd.mm.yyyy',
        icons: {
            rightIcon: '<i class="gj-icon"></i>'
        }
    });

    $('#date-2').datepicker({
        uiLibrary: 'bootstrap4',
        locale: 'ru-ru',
        format: 'dd.mm.yyyy',
        icons: {
            rightIcon: '<i class="gj-icon"></i>'
        }

    });


    $('#date-3').datepicker({
        uiLibrary: 'bootstrap4',
        locale: 'ru-ru',
        format: 'dd.mm.yyyy',
        icons: {
            rightIcon: '<i class="gj-icon"></i>'
        }

    });


    $('#date-4').datepicker({
        uiLibrary: 'bootstrap4',
        locale: 'ru-ru',
        format: 'dd.mm.yyyy',
        icons: {
            rightIcon: '<i class="gj-icon"></i>'
        }

    });



    $("#time").timepicker({
        locale: 'ru-ru',
        format: 'HH.MM',
        mode: '24hr'
    });


    $(".sample-control").on('click', function(e) {
        var input = $(this).siblings('.form-field--sample'),
            inputValue = input.val();


        if ($(this).is('.sample-control--minus') && inputValue >= 1) {
            inputValue--;
        }
        else{
            inputValue++;
        }

        input.val(inputValue);


    });


    $(".form-field--sample").on('keydown', function(e) {

        if((e.which >=48 && e.which <=57)  // цифры
            || (e.which >=96 && e.which <=105)  // num lock
            || e.which==8 // backspace
            || (e.which >=37 && e.which <=40) // стрелки
            || e.which==46) // delete
        {
            return true;
        } else {
            return false;
        }
    });


    $(".selection-list__label").on('change', function(event) {

        if ($(this).next('ul').length) {
            $(this).next('ul').slideToggle();

            $(this).toggleClass('selection-list__label--minus');
            if ($(this).is('.selection-list__label--minus')) {
                $(this).find('.selection-list__toggler').text('−');
            }
            else{
                $(this).find('.selection-list__toggler').text('+');
            }
        }

    });


    disableSelectize();
    function disableSelectize() {
        var prevSetup = Selectize.prototype.setup;

        Selectize.prototype.setup = function () {
            prevSetup.call(this);

            // This property is set in native setup
            // Unless the source code changes, it should
            // work with any version
            this.$control_input.prop('readonly', true);
        };
    }


    $("#pagination-control__drop").selectize();



    $("#js-events-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '.events-slider__control--prev',
        nextArrow: '.events-slider__control--next',
    });


    $(".tags-filter li").on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });


    autosize($('textarea'));


});
