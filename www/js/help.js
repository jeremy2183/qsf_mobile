
$(function () {
    setTimeout(function () {
        $(function () {
            $(".sidy__content").scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('#return-to-top').fadeIn();
                } else {
                    $('#return-to-top').fadeOut();
                }
            });

            // scroll body to 0px on click
            $('#return-to-top').click(function () {
                $('.sidy__content').animate({
                    scrollTop: 0
                }, 1600);
                return false;
            });
        });


        $('#help_w').on('click',function () {

            $('.w_content').slideToggle('slow');
        });

        $('#register').on('click',function(){
            $('.help_content').load('').hide().fadeIn(300);
        });
        $('#online_bank').on('click',function(){
            $('.help_content').load('../html/help_register.html').hide().fadeIn(300);
        });
        $('#bank').on('click',function(){
            $('.help_content').load('../html/help_bank.html').hide().fadeIn(300);
        });
        $('#pay').on('click',function(){
            $('.help_content').load('../html/help_pay.html').hide().fadeIn(300);
        });
        $('#weixin').on('click',function(){
            $('.help_content').load('../html/help_weixin.html').hide().fadeIn(300);
        });
        $('#qq').on('click',function(){
            $('.help_content').load('../html/help_qq.html').hide().fadeIn(300);
        });
        $('#help_d').on('click',function(){
            $('.help_content').load('../html/help_deposit.html').hide().fadeIn(300);
        });
        $('#hand_order').on('click',function(){
            $('.help_content').load('../html/help_hand_order.html').hide().fadeIn(300);
        });

    }, 500);

});