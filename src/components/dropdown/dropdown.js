//jui-dropdown
$(function () {
    $('.jui-dropdown').each(function (index, element) {
        var $element = $(element),
            $link = $element.children('.jui-dropdown-link'),
            $menu = $element.children('.jui-dropdown-menu');
        
        var droptype = $element.attr('data-droptype'),
            menuwidth = $element.attr('data-menuwidth'),
            menuheight = $element.attr('data-menuheight'),
            autodrop = $element.attr('data-autodrop');
        
        //绑定事件
        //addEvent(element);
        //整体禁用
        if($element.hasClass('jui-dropdown-disabled')){
            return;
        }
        
        //事件委托 阻止冒泡
        $element.on('click', '.jui-dropdown-item-disabled', function(ev){
            ev.stopPropagation();
            return false;
        })
        $element.on('click','.jui-dropdown-item',function(ev){
            ev.stopPropagation();
        })
        
        
        //自定义属性
        //展开框宽度限定
        if(menuwidth){
            $menu.css('width', menuwidth);
        }
        if(menuheight){
            $menu.css('height', menuheight);
        }
        var autoHeight = function(){
             //根据视窗距离屏幕上下距离,决定向上展示还是向下展示.
             console.log('element_h', $element.offset().top);
             console.log('window_h', $(window).height());
             console.log('scroll_h', $(document).scrollTop());
             console.log('menu_h', $menu.height());
 
             var element_h = $element.offset().top,
                 window_h = $(window).height(),
                 scroll_h = $(document).scrollTop(),
                 menu_h = $menu.height();
             //向上翻折
             var bottom_h = window_h - element_h - scroll_h;
             console.log('bottom_h',bottom_h);
             if(bottom_h < menu_h){
                 console.log('上开');
                 $element.addClass('jui-dropdown-up');
             }else {
                 console.log('下开');
                 $element.removeClass('jui-dropdown-up');
             }
        }
       
        //展开方式
        if (droptype === 'click') {
            $element.on('click', function (ev) {
                autoHeight(); //
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
    })
    //绑定自定义事件
    function addEvent(dom) {
        dom.onzrchange = function (option) {
            var opt = option || {};
            if(opt.beforeFn) opt.beforeFn.call(this);
            if(opt.afterFn) opt.afterFn.call(this);
        }
    }
     //全局
    $(document).on('click', function(){
        $('.jui-dropdown').each(function (index, element) {
            var $element = $(element);
            $element.removeClass('open');
        })
    })
})