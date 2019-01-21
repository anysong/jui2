//zr-pagination
$(function () {
    $('.zr-pagination').each(function (index, element) {
        var $original = $(element);
        var html = '<ul class="zr-pagination-list">' +
            '<li class="zr-pagination-item"><a href="javascript:;">Home</a></li>' +
            '<li class="zr-pagination-item active"><a href="javascript:;">1</a></li>' +
            '<li class="zr-pagination-item"><a href="javascript:;">Next</a></li>' +
            '</ul>';
        $original.html(html);
        addEvent(element);
    })
    //绑定自定义事件
    function addEvent(dom) {
        dom.onzrinit = function (option) {
            var $element = $(this),
                $list = $element.children('ul'),
                element = this;

            var opt = $.extend({
                'current': 1, //当前页数
                'pageSize': 10, //每页条数
                'total': 0, //总数
                'defaultCurrent': 1, //默认的当前页数
                'defaultPageSize': 15, //默认的每页条数
                'pageSizeOptions': [50, 100], //[10,20,30,40]
                'showPageSize': false, //是否显示分页切换
                'showTotal': false, //是否显示总条数
                'showTotalPage': false, //是否显示总页数
                'showInfo': false, //是否显示分页信息
                'showJump': false, //是否显示跳转框
                'onChange': function () {}, //分页点击
                'onShowSizeChange': function () {} //每页下拉回调
            }, option);
            // 可选模块
            var SIZE_M,
                TOTAL_M,
                PAGE_M,
                INFO_M,
                JUMP_M,
                PRE_M,
                NEXT_M;

            //有条数再做操作
            if (typeof opt.total === 'number' && !isNaN(opt.total) && opt.total > 0) {
                console.log('总条数=> ', opt.total);
            } else {
                //请传入分页条数
                return;
            }
            var _total = opt.total,
                _currentPage = opt.current,
                _pageSize = opt.pageSize,
                _page = Math.ceil(_total / _pageSize),
                _pageList = [];

            console.log('总页数=> ', _page);
            console.log('每页条数=> ', _pageSize);
            //计算
            var countPageBar = function () {
                _pageList = [];
                if (_page < 7) {
                    for (var i = 0; i < _page; i++) {
                        _pageList.push(i + 1);
                    }
                } else {
                    if (_currentPage < 5) {
                        _pageList = [1, 2, 3, 4, 5, '...', _page];
                    } else if (_currentPage < _page - 6) {
                        _pageList = [1, '...', (_page / 2) - 1, Math.ceil(_page / 2), (_page / 2) + 1, '...', _page];
                    } else {
                        _pageList = [1, '...', _page - 4, _page - 3, _page - 2, _page - 1, _page];
                    }

                }
                console.log(_pageList);
                renderPageBar();
            }
            var renderPageBar = function () {
                var html = '<ul class="zr-pagination-list">';
                html += TOTAL_M;
                html += PRE_M;
                for (var i = 0; i < _pageList.length; i++) {
                    if (_currentPage == _pageList[i]) {
                        console.log(_currentPage);
                        console.log(typeof _currentPage);
                        html += '<li class="zr-pagination-item active"><a href="javascript:;">' + _pageList[i] + '</a></li>'
                    } else {
                        html += '<li class="zr-pagination-item"><a href="javascript:;">' + _pageList[i] + '</a></li>'
                    }
                }
                html += NEXT_M;
                html += PAGE_M;
                html += SIZE_M;
                html += JUMP_M;
                html += '</ul>';
                $list.html(html);
                initDropdown(); //初始化下拉
            };
            var parseDOM = function () {

            };
            var initDropdown = function () {
                //初始化下拉组件
                $element.find('.zr-dropdown').each(function (index, element) {
                    var $element = $(element),
                        $link = $element.children('.zr-dropdown-link'),
                        $menu = $element.children('.zr-dropdown-menu');

                    var type = $element.attr('data-type'),
                        menuwidth = $element.attr('data-menuwidth'),
                        menuheight = $element.attr('data-menuheight'),
                        closeauto = $element.attr('data-close-auto'),
                        closescroll = $element.attr('data-close-scroll'),
                        closeresize = $element.attr('data-close-resize');

                    //整体禁用
                    if ($element.hasClass('zr-dropdown-disabled')) {
                        return;
                    }

                    //事件委托 阻止冒泡
                    $element.on('click', '.zr-dropdown-item-disabled', function (ev) {
                        ev.stopPropagation();
                        return false;
                    })
                    $element.on('click', '.zr-dropdown-item', function (ev) {
                        var num = $(this).children('a').html();
                        var inner = num + '/页<i class="zr-icon-angle zr-icon-down"></i>'
                        $link.html(inner);
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
                            $element.removeClass('zr-dropdown-up'); //down
                        } else if (menu_h < top_h) {
                            $element.addClass('zr-dropdown-up'); //up
                        } else {
                            $element.removeClass('zr-dropdown-up'); //down
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
                    $('.zr-dropdown').each(function (index, element) {
                        var $element = $(element);
                        $element.removeClass('open');
                    })
                })
            };
            var bindListener = function () {
                $list.on('click', '.zr-pagination-item', function () {
                    var $li = $(this),
                        pageNo = $li.children('a').text();

                    if (pageNo === 'Home') {
                        _currentPage = 1;
                    } else if (pageNo === 'Next') {
                        _currentPage += 1;
                    } else {
                        _currentPage = parseInt(pageNo)
                    }
                    countPageBar(); //计算分页;
                    opt.onChange(_currentPage); //执行回调
                });
            }
            var initModule = function () {
                //上一页
                PRE_M = '<li class="zr-pagination-item"><a href="javascript:;">Pre</a></li>';
                //下一页
                NEXT_M = '<li class="zr-pagination-item"><a href="javascript:;">Next</a></li>';
                //跳转
                JUMP_M = '<li class="zr-pagination-options">' +
                    '<div class="zr-pagination-options-jump">跳转' +
                    '<input type="text">页' +
                    '</div>' +
                    '</li>';
                //总页数
                PAGE_M = '<li class="zr-pagination-total-page">共' + _page + '页</li>';
                //总条数
                TOTAL_M = '<li class="zr-pagination-total-text">共' + _total + '条</li>';
                //每页条数
                SIZE_M = '<div class="zr-dropdown zr-dropdown-btn" data-type="click">' +
                    '<a class="zr-dropdown-link" href="javascript:;">50/页<i class="zr-icon-angle zr-icon-down"></i></a>' +
                    '<div class="zr-dropdown-menu">';
                var html_li = '';
                opt.pageSizeOptions.map(function (item) {
                    html_li += '<li class="zr-dropdown-item"><a href="javascript:;">' + parseInt(item) + '</a></li>';
                })
                SIZE_M += html_li;
                SIZE_M += '</div></div>';

                //信息
                INFO_M = '';
            }
            //是否显示总条数
            //是否显示分页信息
            //是否显示总页数
            //是否显示跳转框
            //是否显示分页切换


            var init = function () {
                parseDOM();
                bindListener();
                initModule();
                countPageBar();
            };
            init();
        }
    }
})