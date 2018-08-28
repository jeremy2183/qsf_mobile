$(function () {
    setTimeout(function () {

        $(".v1").on('click', function () {
            $(this).toggleClass('open');
            $(this).next().stop().animate({
                height: "toggle",
                opacity: "toggle"
            }, "slow");
        });

    }, 500);

});