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
                }, 800);
                return false;
            });
        });

        $(document).ready(function(){
            // Activate Carousel
            $("#myCarousel2").carousel();

            // Enable Carousel Indicators
            $(".item1").click(function(){
                $("#myCarousel2").carousel(0);
            });
            $(".item2").click(function(){
                $("#myCarousel2").carousel(1);
            });


            // Enable Carousel Controls
            $(".left2").click(function(){
                $("#myCarousel2").carousel("prev");
            });
            $(".right2").click(function(){
                $("#myCarousel2").carousel("next");
            });
        });

    }, 500);
});

    	var arrlanguage = new Array();
    	    arrlanguage['play1'] = 'rule info';
    	    arrlanguage['play2'] = 'back taogin';
    	$(document).ready(function(e){
    	   $('.lans').each(function(index, element){
    	      //$(this).text(arrlanguage[$(this).attr('key')]);
    	      //console.log($(this).attr('key'));
    	    });
    	  
    	 });