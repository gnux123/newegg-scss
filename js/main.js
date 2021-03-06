$(function() {
    var states = null;

    $(".menudropDown").click(function(){
        if(states == null || states == true){
            $("#mainMenu").slideDown();
            states = false;
        }else if(states == false) {
            $("#mainMenu").slideUp();
            states = true;
        }

    });

    $(".dropCon").hide();
    $("#dropAccount > a").click(function(){
        $(this).parent().addClass("active");

        if(states == null || states == true){
            $(".dropCon").slideDown();
            states = false;
        }else if(states == false) {
            $(".dropCon").slideUp();
            $(this).parent().removeClass("active");
            states = true;
        }

    });

    $("#FloatingSwitch").click(function(){
        if(states == null || states == true){
            $("#FloatingAccount").addClass("active");
            states = false;
        }else if(states == false) {
            $("#FloatingAccount").removeClass("active");
            states = true;
        }
    });

    $(".TabArea ul li").click(function(){
        var _id = $(this).attr("id");

        window.location.href = $(this).find('a').attr('href');
        $(this).addClass("TabSelected").siblings("li.TabSelected").removeClass("TabSelected");


        if(_id == "Account"){
            if(states == null || states == true){
                $("#Account .SubMenu").slideDown();
                states = false;
            }else if(states == false) {
                $("#Account .SubMenu").slideUp();
                states = true;
            }
        }else{
            $("#Account .SubMenu").slideUp();
            states = true;
        }

    });


    //box-effects
    $(".box .btn").click(function(){
        $(this).parents(".box").addClass("choose");
    });

    //cates page
    $('#carousel-logo').carouFredSel({
        items: 3,
        auto: false,
        scroll: { items: 1 }
    });

    $(".carousel-logo3 > .prev").click(function(){ $('#carousel-logo').trigger("prev", 1); });
    $(".carousel-logo3 > .next").click(function(){ $('#carousel-logo').trigger("next", 1); });

    //cate-chooseAny
    $("#subPageContainer").carouFredSel({
        items   : 5,
        auto    : false,
        prev    : "#prev",
        next    : "#next",
        width   : "100%",
        scroll  : {
            items       : 5,
            duration    : 800
        }
    });


    $(".InsExp > span").click(function(){
        $('.Installment').show();
        $('.Installment').hover(function(){ return false; }, function(){ $(this).hide(); });
    });



    //prodPage settings
    $('.tabs').find('.tab').eq(1).addClass('hover');
    $('.detail').eq(1).show();

    $('.tabs').find('.tab').click(function(){
        var _index = $(this).index();
        $(this).addClass('hover').siblings('div.hover').removeClass('hover');
        $('.detail').eq(_index).show().siblings('div.detail').hide();
    });

    //account center coupon table selects
    $(".selector-coupon").on('change', function(){
        var _value = $(this).find(":selected").val();
        $("#"+_value).show().siblings("table").hide();
    });

    $(".couponTipsTit").click(function(){
        if(states == null || states == true){
            $(".couponTxt").slideDown();
            states = false;
        }else if(states == false) {
            $(".couponTxt").slideUp();
            states = true;
        }
    });


    //qa-center tabs
    $(".RadiusTab > a").click(function(){
        var _index = $(this).parent().index();
        $(this).parent().addClass("TabSelected").siblings("li.TabSelected").removeClass("TabSelected");
        $(".qaContent > div").eq(_index + 1).show().siblings(".qaContent > div.TabArea").hide();
    });

});
