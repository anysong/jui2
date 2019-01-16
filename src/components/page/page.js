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
                var total = opt.total;

                var init = function(){

                };
            }else {
                //请传入分页条数
            }
        }
    }
})