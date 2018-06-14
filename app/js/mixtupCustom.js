$(function() {

    filterGridItems();
    function filterGridItems() {
        var containerEl = document.querySelector('.filter-row');

        var mixer = mixitup(containerEl, {
            animation: {
                animateResizeTargets: true
            }
        });
    }


    $(".tags-filter li").on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });



});
