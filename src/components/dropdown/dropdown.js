//jui-dropdown
$(function () {
    $('.jui-dropdown').each(function (index, element) {
        var $element = $(element),
            event = $element.attr('data-event');

        //点击
        if (event === 'click') {
            $element.on('click', function (ev) {
                ev.stopPropagation();
                $element.hasClass('open') ? $element.removeClass('open') : $element.addClass('open');
            })
        }else {
            $element.on('mouseenter', function (ev) {
                ev.stopPropagation();
                $element.addClass('open');
            })
            $element.on('mouseleave', function (ev) {
                ev.stopPropagation();
                $element.removeClass('open');
            })
        }
        //阻止冒泡
        $element.on('click','.jui-dropdown-menu',function(ev){
            ev.stopPropagation();
        })
        //事件
        $element.on('click','.jui-dropdown-item',function(ev){
            ev.stopPropagation();
            //opt.callback
        })
        
    })
     //全局
    $(document).on('click', function(){
        $('.jui-dropdown').each(function (index, element) {
            var $element = $(element);
            $element.removeClass('open');
        })
    })
})