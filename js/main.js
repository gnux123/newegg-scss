$(function() {
    $('#carousel-logo').carouFredSel({
        items: 3,
        auto: false,
        scroll: { items: 1 }
    });

    $(".carousel-logo3 > .prev").click(function(){ $('#carousel-logo').trigger("prev", 1); });
    $(".carousel-logo3 > .next").click(function(){ $('#carousel-logo').trigger("next", 1); });
});
