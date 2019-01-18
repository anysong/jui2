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
                'pageSizeOptions': [], //[10,20,30,40]
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
                html += JUMP_M;
                html += '</ul>';
                $list.html(html);
            };
            var parseDOM = function () {

            }
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
                JUMP_M = '<li class="zr-pagination-options">'+
                '<div class="zr-pagination-options-jump">跳转'+
                '<input type="text">页'+
                '</div>'+
                '</li>';
                //总页数
                PAGE_M = '<li class="zr-pagination-total-page">'+ _page + '页</li>';
                //总条数
                TOTAL_M = '<li class="zr-pagination-total-text">'+ _total + '条</li>';
                //每页条数
                SIZE_M = '';
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