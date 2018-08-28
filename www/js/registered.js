$(document).ready(function () {
    $("#selector1 dt a").click(function () {
        $("#selector1 dd ul").toggle("slow");
    });

    $("#selector1 dd ul li a").click(function () {
        var text = $(this).html();
        $("#selector1 dt a span").html(text);
        $("#selector1 dd ul").hide();
        $("#result").html("Selected value is: " + getSelectedValue("selector1"));
        $("#selector1").siblings('.select-value').val(getSelectedValue("selector1"));
        console.log(getSelectedValue("selector1"));
    });

    function getSelectedValue(id) {
        return $("#" + id).find("dt a span.value").html();
    }

    $(document).bind('click', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("dropdown"))
            $("#selector1 dd ul").hide();
        e.preventDefault();
    });





    $("#selector2 dt a").click(function () {
        $("#selector2 dd ul").toggle("slow");
    });

    $("#selector2 dd ul li a").click(function () {
        var text = $(this).html();
        $("#selector2 dt a span").html(text);
        $("#selector2 dd ul").hide();
        $("#result").html("Selected value is: " + getSelectedValue("sample"));
    });

    function getSelectedValue(id) {
        return $("#" + id).find("dt a span.value").html();
    }

    $(document).bind('click', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("dropdown"))
            $("#selector2 dd ul").hide();
        e.preventDefault();
    });


    $("#selector3 dt a").click(function () {
        $("#selector3 dd ul").toggle("slow");
    });

    $("#selector3 dd ul li a").click(function () {
        var text = $(this).html();
        $("#selector3 dt a span").html(text);
        $("#selector3 dd ul").hide();
        $("#result").html("Selected value is: " + getSelectedValue("sample"));
    });

    function getSelectedValue(id) {
        return $("#" + id).find("dt a span.value").html();
    }

    $(document).bind('click', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("dropdown"))
            $("#selector3 dd ul").hide();
        e.preventDefault();

    });
});
