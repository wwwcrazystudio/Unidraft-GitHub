document.body.onload = function() {

    setTimeout( function() {

        var preloader = document.getElementById('preloader');

        if ( !preloader.classList.contains('done') ) {
            preloader.classList.add('done');
        }


    }, 1000 );

};



$(function() {


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
//    https://selectize.github.io/selectize.js/
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


//datapicker-u на странице edit.html
//http://gijgo.com/datepicker/example/bootstrap-4

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



//timepicker на странице edit.html
//     http://gijgo.com/timepicker

    $("#time").timepicker({
        locale: 'ru-ru',
        format: 'HH.MM',
        mode: '24hr'
    });


// добавление года/ даты рождения на стран це edit.html
    $(".sample-control").on('click', function(e) {
        var input = $(this).siblings('.form-field--sample');

        if ($(this).is('.sample-control--plus') ) {
            a = input.val();
            a++; // увеличить на 1
            input.val(a);
        }
        else{
            a = input.val();
            a = (a<1)?0:a-1;
            //  a--; // уменьшить на 1
            input.val(a); // вернуть инпуту
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






//открытие списка на странице edit.html (список, где есть чекбоксы)
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


// selectize
//    //    https://selectize.github.io/selectize.js/

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



//слайдер на странице events.html
    $("#js-events-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '.events-slider__control--prev',
        nextArrow: '.events-slider__control--next',
    });


//теги
    $(".tags-filter li").on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });


    //resize textarea
    autosize($('textarea'));



//работа с таблицой на странице timesheets-week.html

    $('#timesheets-form').submit(function(e) {

        e.preventDefault();

    });


    $(".timesheets-table__btn-edit").on('click', function () {

        if (! $(this).is('.timesheets-table__btn-submit') ) {

            $(this).addClass('timesheets-table__btn-submit');

            $(".timesheets-table-wrapper").addClass('timesheets-table--edit');

            $(this).text('Сохранить');

            $(".timesheets-table-body__row--editable .timesheets-table-body__item-val .form-field").removeAttr('disabled');
        }

        else{

            $(this).removeClass('timesheets-table__btn-submit');

            $(".timesheets-table-wrapper").removeClass('timesheets-table--edit');

            $(this).text('Редактировать');

            $(".timesheets-table-body__row--editable .timesheets-table-body__item-val .form-field").attr('disabled', true);

        }

    });


//попап на странице timesheets-week.html

    $('.open-popup-link').magnificPopup({
        type:'inline',
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        callbacks: {
            open: function() {
                $(".mfp-wrap").addClass('overflow-y');
            },
            close: function() {
                $(".mfp-wrap").removeClass('overflow-y');
            }
            // e.t.c.
        }
    });

    $('.popup__close').on( "click", function() {
        $.magnificPopup.close();
    });

//сеелекты в попапе на странице timesheets-week.html

    $('.timesheets-popup .selection-list__item-inner input').on('change', function () {

        if ($(this).is(':checked') ) {
            $(this).closest('.selection-list__item-inner').find('.selectize-control.form-field').addClass('is-shown');
        }
        else{
            $(this).closest('.selection-list__item-inner').find('.selectize-control.form-field').removeClass('is-shown');
        }
    });



// dropdown таблица на странице timesheets-approval.html

    $(".approval-table__item-inner").on('click', function () {

        if( $(this).closest('.approval-table__item').find('.approval-drop-table').is(":visible") ) {
            $(this).closest('.approval-table__item').removeClass('dropdown-show').find('.approval-drop-table').slideUp('fast');
        }
        else{
            $(this).closest('.approval-table__item').addClass('dropdown-show').find('.approval-drop-table').slideDown('fast');
        }

    });


// при клике на йтем таблицы на странице timesheets-approval.html открываеться dropdown-таблица. При клике на самый верхний чекбокс в правом углу мы можем выбрать сразу все чекбоксы

    $(".approval-drop-table .timesheets-table-header__row .timesheets-table__checkbox input").on('change', function() {

        if ( $(this).prop('checked') ) {
            $(this).closest('.approval-drop-table').find('.timesheets-table__checkbox input').prop('checked', true);
        }
        else{
            $(this).closest('.approval-drop-table').find('.timesheets-table__checkbox input').prop('checked', false);
        }

    });


// когда мы кликнули не на самый верхний чекбокс в правом углу в дпропдаун-таблице на странице timesheets-approval.html, то убираем поведение самоо верхнего чекбокса (смотрите выше)
    $(".approval-drop-table  .timesheets-table__checkbox input").on('change', function() {

        if ( !$(this).prop('checked') && !$(this).closest('.timesheets-table-header__row').length ) {
            $(this).closest('.approval-drop-table').find('.timesheets-table-header__row .timesheets-table__checkbox input').prop('checked', false);
        }

    });



//  календарь на странице calendar.html
//http://www.bootstrap-year-calendar.com/

    $('#calendar').calendar({
        displayWeekNumber: true,
        language: "ru"
    });


// в зависимости от статуса отчета добавляем классы на номера недели. Классы меняют бекграундные цвета дней недели (зеленый, голубой, розовый). Сделано чисто для демо (календарь на странице calendar.html_)


    // всем номерам недели января и февраля добавляем зеленый цвет в качестве фона (это цвет какого-то статуса отчета)
    $(".month-container:first-child").find('td.week-number').addClass('week-number--green-status');
    $(".month-container:nth-child(2)").find('td.week-number').addClass('week-number--green-status');

    // последнему номеру недели устанавливаем голубой цвет в качестве фона (это цвет какого-то статуса отчета)
    $(".month-container:nth-child(2)").find('td.week-number').last().addClass('week-number--blue-status');

    // номерам недели в третьей таблице устанавливем голубой цвет в качестве фона (это цвет какого-то статуса отчета)
    $(".month-container:nth-child(3)").find('td.week-number').addClass('week-number--blue-status');

    $(".month-container:nth-child(4)").find('td.week-number').addClass('week-number--pink-status');



//  делаем елементы редактируемыми при клике на иконку редактироваания на странице projects-page-timesheets

    $(".timesheets-types-list__edit-icon").on('click', function () {

        $(this).siblings('.form-field').prop('contenteditable', true).focus();


    });



//  убавляем редактирование елементах при уходе с них (при потере фокуса)  на странице projects-page-timesheets
    $(".timesheets-types-list .form-field").on("focusout", function () {

        $(this).prop('contenteditable', false);

    });


//  при клике показываем разные таймшиты  на странице projects-page-timesheets

    $(".timesheets-types__item--departament li").on('click', function () {

        $(this).addClass('is-active').siblings().removeClass('is-active');

        $(".timesheets-types__item--types").find('.timesheets-types-list').show();

    });


    $(".timesheets-types__item--types li").on("click", function(event) {

        //  если мы кликаем на кнопку редактирования таймшита, то не открывать другой блок с таймшитами

        if ( ! $(event.target).closest('.timesheets-types-list__edit-icon').length ) {

            $(this).addClass('is-active').siblings().removeClass('is-active');

            $(".timesheets-types__item--subtypes").find('.timesheets-types-list').show();

        }

    });


// работа с input[type="file"] на странице employees-page-edit

    $( '.inputfile' ).each( function()
    {
        var $input	 = $( this ),
            $label	 = $input.next( 'label' ),
            labelVal = $label.html();

        $input.on( 'change', function( e )
        {
            var fileName = '';

            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else if( e.target.value )
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
                $label.find( 'span' ).html( fileName );
            else
                $label.html( labelVal );
        });

        // Firefox bug fix
        $input
            .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
            .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
    })






});
