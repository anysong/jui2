//zr-pagination
$(function () {
    $('.zr-pagination').each(function (index, element) {
        var $original = $(element);
        var html = '<ul class="zr-pagination-list">' +
            '<li class="zr-pagination-pre zr-pagination-disable"><a href="javascript:;"></a></li>' +
            '<li class="zr-pagination-item active"><a href="javascript:;">1</a></li>' +
            '<li class="zr-pagination-next zr-pagination-disable"><a href="javascript:;"></a></li>' +
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
                'defaultPageSize': 20, //默认的每页条数
                'pageSizeOptions': [10, 50, 100], //[10,20,30,40]
                'showPageSize': false, //是否显示分页切换
                'showTotal': false, //是否显示总条数
                'showTotalPage': false, //是否显示总页数
                'showInfo': false, //是否显示分页信息
                'showJump': false, //是否显示跳转框
                'onChange': function () {}, //分页点击
                'onShowSizeChange': function () {}, //每页下拉回调
                'errNotice': '输入有误,请检查后重新尝试'
            }, option);
            // 可选模块
            var BAR,
                SIZE_M,
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
                _pageSize = opt.pageSize || opt.defaultPageSize,
                _page = Math.ceil(_total / _pageSize),
                _pageList = [];


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
                        //重新计算页数
                        _currentPage = 1,
                            _pageSize = num,
                            _page = Math.ceil(_total / _pageSize);
                        reloadBar();
                        //执行回调
                        opt.onShowSizeChange.call(this, _pageSize);
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

                    _currentPage = parseInt(pageNo);
                    reloadBar(); //计算分页;
                    opt.onChange(_currentPage); //执行回调
                });
                $list.on('click', '.zr-pagination-pre', function () {
                    if(_currentPage > 1){
                        _currentPage --;
                        reloadBar(); //计算分页;
                        opt.onChange(_currentPage); //执行回调   
                    }
                });
                $list.on('click', '.zr-pagination-next', function () {
                    if(_currentPage < _page){
                        _currentPage ++;
                        reloadBar(); //计算分页;
                        opt.onChange(_currentPage); //执行回调
                    }
                });
                $element.on('input', '.zr-pagination-options-jump input', function (ev) {
                    var value = ev.target.value;
                    $(this).val(value.replace(/[^\d]/g, ''));
                })
                $element.on('keyup', '.zr-pagination-options-jump input', function (ev) {
                    if (ev.keyCode == 13) {
                        var pageNo = parseInt(ev.target.value);
                        console.log(pageNo);
                        if (!isNaN(pageNo) && pageNo > 0 && pageNo < _page + 1) {
                            //执行跳转
                            _currentPage = pageNo;
                            reloadBar();
                        } else {
                            //输入有误
                            alert(opt.errNotice);
                        }
                    }
                })
            };

            // new
            var countBar = function () {
                _pageList = [];
                if (_page < 7) {
                    for (var i = 0; i < _page; i++) {
                        _pageList.push(i + 1);
                    }
                    return;
                }
                if (_currentPage < 4) {
                    _pageList = [1, 2, 3, 4, 5, '...', _page];
                } else if (_currentPage == 4) {
                    _pageList = [1, 2, 3, 4, 5, 6, '...', _page];
                } else if (_page - _currentPage < 3) {
                    _pageList = [1, '...', _page - 4, _page - 3, _page - 2, _page - 1, _page];
                } else if (_page - _currentPage == 3) {
                    _pageList = [1, '...',_page - 5, _page - 4, _page - 3, _page - 2, _page - 1, _page];
                } else {
                    _pageList = [1, '...', _currentPage - 2, _currentPage - 1, _currentPage, _currentPage + 1, _currentPage + 2, '...', _page];
                }
            };
            //初始化分页
            var initBar = function () {
                BAR = '';
                for (var i = 0; i < _pageList.length; i++) {
                    if (_currentPage == _pageList[i]) {
                        BAR += '<li class="zr-pagination-item active"><a href="javascript:;">' + _pageList[i] + '</a></li>'
                    }else if(_pageList[i] === '...'){
                        BAR += '<li class="zr-pagination-ellipsis"><a href="javascript:;">' + _pageList[i] + '</a></li>'
                    } else {
                        BAR += '<li class="zr-pagination-item"><a href="javascript:;">' + _pageList[i] + '</a></li>'
                    }
                }
            };
            //初始化各个模块
            var initModule = function () {
                //上一页
                if(_currentPage === 1){
                    PRE_M = '<li class="zr-pagination-pre zr-pagination-disable"><a href="javascript:;"></a></li>';
                }else {
                    PRE_M = '<li class="zr-pagination-pre"><a href="javascript:;"></a></li>';
                }
                //下一页
                if(_currentPage === _page){
                    NEXT_M = '<li class="zr-pagination-next zr-pagination-disable"><a href="javascript:;"></a></li>';
                }else {
                    NEXT_M = '<li class="zr-pagination-next"><a href="javascript:;"></a></li>';
                }
                
                //跳转
                JUMP_M = '<li class="zr-pagination-options">' +
                    '<div class="zr-pagination-options-jump">跳转' +
                    '<input type="text" value="' + _currentPage + '">页' +
                    '</div>' +
                    '</li>';
                //总页数
                PAGE_M = '<li class="zr-pagination-total-page">共' + _page + '页</li>';
                //总条数
                TOTAL_M = '<li class="zr-pagination-total-text">共' + _total + '条</li>';
                //信息
                INFO_M = '';
                //分页下拉
                initSize();
            }
            //初始化分页下拉
            var initSize = function () {
                //每页条数
                SIZE_M = '<div class="zr-dropdown zr-dropdown-btn zr-dropdown-equal" data-type="click">' +
                    '<a class="zr-dropdown-link" href="javascript:;">' +
                    _pageSize + '/页<i class="zr-icon-angle zr-icon-down"></i></a>' +
                    '<div class="zr-dropdown-menu">';
                var html_li = '';
                opt.pageSizeOptions.map(function (item) {
                    html_li += '<li class="zr-dropdown-item"><a href="javascript:;">' + parseInt(item) + '</a></li>';
                })
                SIZE_M += html_li;
                SIZE_M += '</div></div>';
            };
            //渲染
            var render = function () {
                var html = '<ul class="zr-pagination-list">';
                if (opt.showTotal) {
                    html += TOTAL_M;
                }
                html += PRE_M;
                html += BAR;
                html += NEXT_M;
                if (opt.showTotalPage) {
                    html += PAGE_M;
                }
                if (opt.showPageSize) {
                    html += SIZE_M;
                }
                if (opt.showJump) {
                    html += JUMP_M;
                }
                html += '</ul>';
                //渲染
                $list.html(html);
                initDropdown(); //初始化下拉模块
            };
            var reloadBar = function () {
                countBar();
                initModule();
                initBar();
                render();
            };
            var init = function () {
                bindListener();
                countBar();
                initModule(); //初始化各部分模块(除页码)
                initBar(); //初始化分页条
                render(); //组装渲染;
            };
            init();
        }
    }
})