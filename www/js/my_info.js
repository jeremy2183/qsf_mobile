$(function () {
    setTimeout(function () {
        var cover = document.getElementById('Modal_cover');
        var cover2 = document.getElementById('Modal_cover2');
        var cover3 = document.getElementById('Modal_cover3');
        $("#modify1").on('click', function () {
            $("#Modal_cover").css('display', 'block');
        });
        $("#modify2").on('click', function () {
            $("#Modal_cover2").css('display', 'block');
        });
        $("#setting").on('click', function () {
            $("#Modal_cover3").css('display', 'block');
        });

        $("#confirm1").on('click', function () {
            $("#Modal_cover").css('display', 'none');
        });
        $("#confirm2").on('click', function () {
            $("#Modal_cover2").css('display', 'none');
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
        $("#cancel3").on('click', function () {
            $("#Modal_cover3").css('display', 'none');

        })
        
        $(".x").on('click', function () {
            $("#Modal_cover").css('display', 'none');

        })
        $(".x").on('click', function () {
            $("#Modal_cover2").css('display', 'none');

        })
        $(".x").on('click', function () {
            $("#Modal_cover3").css('display', 'none');

        })
        
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
        }

    }, 500);

});