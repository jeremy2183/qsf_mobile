/**
 * Created by SandySung on 2017/8/1.
 */

$(function () {
    setTimeout(function () {
        var cover = document.getElementById('Modal_cover');
        var cover2 = document.getElementById('Modal_cover2');
        var cover3 = document.getElementById('Modal_cover3');
        var cover4 = document.getElementById('Modal_cover4');
        
        
        
        $(".content_row").on('click', function () {
            $("#Modal_cover").css('display', 'block');
        });
        
        $("#confirm1").on('click', function () {
            $("#Modal_cover").css('display', 'none');
            $("#Modal_cover2").css('display', 'block');
        });
        
        $("#confirm2").on('click', function () {
            $("#Modal_cover2").css('display', 'none');
            $("#Modal_cover3").css('display', 'block');
        });
        
        $("#confirm3").on('click', function () {
            $("#Modal_cover3").css('display', 'none');
        })

        $("#cancel1").on('click', function () {
            $("#Modal_cover").css('display', 'none');

        })
        $("#cancel2").on('click', function () {
            $("#Modal_cover2").css('display', 'none');

        })
        
        $("#battle").on('click',function () {
            $("#Modal_cover4").css('display','block');
        });
        $(".close_x").on('click', function () {
            $("#Modal_cover4").css('display', 'none');

        });
        window.onclick = function (event) {
            if (event.target == cover) {
                cover.style.display = "none";
            }
            if (event.target == cover2) {
                cover2.style.display = "none";
            }
            if (event.target == cover3) {
                cover3.style.display = "none";
            }
            if (event.target == cover4) {
                cover4.style.display = "none";
            }
        }

        //$(".game_detail").on('click',function(){
            //window.open("../html/marketlist.html","_self")
        //})
    }, 500);

/*
$('.icon_bar_cell > a').removeClass('active');
$('.icon_bar_cell > #market_a').addClass('active');
*/
});

