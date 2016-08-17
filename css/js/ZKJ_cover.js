(function ($) {
    $.ZKJ_cover = function  () {
        $ZKJ_content = $(".ZKJ-content");
        $ZKJ_content.hover(function () {
            $ZKJ_cover = $(this).children(".ZKJ-cover");
            $ZKJ_cover.css("display","block");
        },
        function () {
            $ZKJ_cover = $(this).children(".ZKJ-cover");
            $ZKJ_cover.css("display","none");
        })
    }
})(jQuery)