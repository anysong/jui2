//jui-dropdown
$(function () {
    $('.jui-dropdown').each(function (index, element) {
        var $element = $(element),
            $link = $element.children('.jui-dropdown-link'),
            $menu = $element.children('.jui-dropdown-menu');

        var type = $element.attr('data-type'),
            menuwidth = $element.attr('data-menuwidth'),
            menuheight = $element.attr('data-menuheight'),
            closeauto = $element.attr('data-close-auto'),
            closescroll = $element.attr('data-close-scroll'),
            closeresize = $element.attr('data-close-resize');

        //整体禁用
        if ($element.hasClass('jui-dropdown-disabled')) {
            return;
        }

        //事件委托 阻止冒泡
        $element.on('click', '.jui-dropdown-item-disabled', function (ev) {
            ev.stopPropagation();
            return false;
        })
        $element.on('click', '.jui-dropdown-item', function (ev) {
            ev.stopPropagation();
        })

        //自定义属性
        //展开框宽度限定
        if (menuwidth) {
            $menu.css('width', menuwidth);
        }
        if (menuheight) {
            $menu.css('height', menuheight);
        }
        //自动计算高度
        var autoHeight = function () {
            /**
             * 根据视窗距离屏幕上下距离,决定向上展示还是向下展示.
             * 上下同时不够,向下展开
             */
            var element_t = $element.offset().top,
                element_h = $element.height(),
                window_h = $(window).height(),
                scroll_h = $(document).scrollTop(),
                menu_pt_h = $menu.css('padding-top'),
                menu_pb_h = $menu.css('padding-bottom'),
                menu_h = $menu.height() + parseFloat(menu_pt_h) + parseFloat(menu_pb_h);
            //距离
            var bottom_h = window_h - (element_t - scroll_h) - element_h,
                top_h = window_h - bottom_h - element_h;

            if (menu_h < bottom_h) {
                $element.removeClass('jui-dropdown-up'); //down
            } else if (menu_h < top_h) {
                $element.addClass('jui-dropdown-up'); //up
            } else {
                $element.removeClass('jui-dropdown-up'); //down
            }
        }
        $(window).scroll(function () {
            if (!closeauto && !closescroll) autoHeight();
        })
        $(window).resize(function () {
            if (!closeauto && !closeresize) autoHeight();
        })
        //初始化
        if (!closeauto) autoHeight();
        //展开方式
        if (type === 'click') {
            $element.on('click', function (ev) {
                ev.stopPropagation();
                if (!closeauto) autoHeight();
                $element.hasClass('open') ? $element.removeClass('open') : $element.addClass('open');
            })
        } else {
            $element.on('mouseenter', function (ev) {
                ev.stopPropagation();
                if (!closeauto) autoHeight();
                $element.addClass('open');
            })
            $element.on('mouseleave', function (ev) {
                ev.stopPropagation();
                $element.removeClass('open');
            })
        }
    })
    //全局
    $(document).on('click', function () {
        $('.jui-dropdown').each(function (index, element) {
            var $element = $(element);
            $element.removeClass('open');
        })
    })
})