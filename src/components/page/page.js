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
            console.log(element);
            var opt = $.extend({
                'current': 1, //当前页数
                'pageSize': 10, //每页条数
                'total': 0, //总数
                'defaultCurrent': 1, //默认的当前页数
                'defaultPageSize': 15, //默认的每页条数
                'pageSizeOptions': [], //[10,20,30,40]
                'showSizeChanger': false, //是否显示每页展示条数菜单
                'showTotal': false, //是否显示总数
                'onChange': function () {}, //分页点击
                'onShowSizeChange': function () {} //每页下拉回调
            }, option)
            //有条数再做操作
            if (typeof opt.total === 'number' && !isNaN(opt.total) && opt.total > 0) {
                console.log(opt.total);
            } else {
                //请传入分页条数
                return;
            }
            console.log('go on');
            var _total = opt.total,
                _currentPage = opt.current,
                _pageSize = opt.pageSize,
                _page = Math.ceil(_total / _pageSize),
                _pageList = [];

            console.log('_page', _page);
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
                var html = '<ul class="zr-pagination-list"><li class="zr-pagination-item"><a href="javascript:;">Home</a></li>';
                for(var i=0; i<_pageList.length;i++){
                    html += '<li class="zr-pagination-item"><a href="javascript:;">' + _pageList[i] + '</a></li>'
                }
                html += '<li class="zr-pagination-item"><a href="javascript:;">Next</a></li></ul>';
                $list.html(html);
            };
            var parseDOM = function () {

            }
            var bindListener = function () {
                $list.on('click', '.zr-pagination-item', function () {
                    var $li = $(this),
                        text = $li.children('a').text();

                    if (text === 'Home') {
                        _currentPage = 1;
                    } else if (text === 'Next') {
                        _currentPage += 1;
                    } else {
                        _currentPage = parseInt(text)
                    }
                    countPageBar(); //计算分页;
                    opt.onChange(_currentPage); //执行回调
                });
            }
            var init = function () {
                countPageBar();
                parseDOM();
                bindListener();
            };
            init();
        }
    }
})