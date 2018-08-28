$(function () {
    setTimeout(function () {
        $(document).ready(function() {
            $(".dropdown img.flag").addClass("flagvisibility");

            $(".dropdown dt a").click(function() {
                $(".dropdown dd ul").slideToggle("slow");
            });

            $(".dropdown dd ul li a").click(function() {
                var text = $(this).html();
                $(".dropdown dt a span").html(text);
                $(".dropdown dd ul").hide();
                $("#result").html("Selected value is: " + getSelectedValue("sample"));
            });

            function getSelectedValue(id) {
                return $("#" + id).find("dt a span.value").html();
            }

            $(document).bind('click', function(e) {
                var $clicked = $(e.target);
                if (! $clicked.parents().hasClass("dropdown"))
                    $(".dropdown dd ul").hide();
            });


            $("#flagSwitcher").click(function() {
                $(".dropdown img.flag").toggleClass("flagvisibility");
            });
        });
        
        /*
        $("#submit2").on('click',function () {
            $("#Modal_cover").css('display','block');
        });
        
        $("#next").on('click', function () {
            $("#Modal_cover").css('display', 'none');
            $("#Modal_cover2").css('display','block');
        });
        */
        $(".cancel_btn").on('click', function () {
            $("#Modal_cover").css('display', 'none');

        });
        
    }, 500);

$('.icon_bar_cell > a').removeClass('active');
$('.icon_bar_cell > #my_a').addClass('active');
});