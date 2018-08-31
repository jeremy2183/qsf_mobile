$(function () {
    setTimeout(function () {
        $(".v1").on('click', function () {
            if (!$(".v1.open").is($(this))) {
                for (var i = 0; i < $(".v1.open").length; i++) {
                    drop_switch($(".v1.open").eq(i));
                }
            }
            drop_switch($(this));
        });

        // function drop_switch(jq) {
        //     jq.toggleClass('open');
        //     jq.next().stop().animate({
        //         height: "toggle",
        //         opacity: "toggle"
        //     }, "slow");
        // }


        $(document).ready(function() {

            $(".dropdown dt a").click(function() {
                $(".dropdown dd ul").toggle("slow");
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



        });

    }, 500);

});


$('#return-to-top').click(function() {      // When arrow is clicked
    $(".sidy__content").scrollTop(0);

});
$('#return-to-bottom').click(function() {      // When arrow is clicked
    $(".sidy__content").scrollTop(9999999);

});

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
