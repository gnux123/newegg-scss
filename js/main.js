$(function() {
    var dropcount = 0;
    $(".dropCon").hide();
    $("#dropAccount > a").click(function(){
        $(this).parent().addClass("active");

        dropcount++;
        if( dropcount == 1 ){
            $(".dropCon").slideDown();
        }else if( dropcount == 2 ) {
            $(".dropCon").slideUp();
            $(this).parent().removeClass("active");
            dropcount = 0;
        }

    });



    $('#carousel-logo').carouFredSel({
        items: 3,
        auto: false,
        scroll: { items: 1 }
    });

    $(".carousel-logo3 > .prev").click(function(){ $('#carousel-logo').trigger("prev", 1); });
    $(".carousel-logo3 > .next").click(function(){ $('#carousel-logo').trigger("next", 1); });




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

});
