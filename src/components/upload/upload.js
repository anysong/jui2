//zr-upload
$(function () {
    $('.zr-upload').each(function (index, element) {
        var $original = $(element);
      
    })
    //监听
    $(document).on("DOMNodeInserted", function(){
        console.log('is');
    })
    $(document).on("DOMNodeRemoved", function(){
        console.log('rm');
    })
})