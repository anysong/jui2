
//jui-radio
$(function () {
    console.log($('.jui-radio').length);
    // var className = $('.jui-radio').prop('class');
    // console.log(className);
    $('.jui-radio').each(function (index, element) {
        console.log('element', element);
        var className = $(element).prop('class');
        var name = $(element).prop('name');
        //TODO 处理 className；
        var _arr = className.split(' ');
        var _list = [];
        var juiStyle = '',
            adminStyle = '';
        for (var i = 0; i < _arr.length; i++) {
            if(_arr[i].indexOf('jui-') != -1){
                juiStyle += ' ' + _arr[i];
            }else {
                adminStyle += ' ' + _arr[i];
            }
        }
        var newclass = _list.join(' ');
        var html = '<label class="jui-radio-wrapper ' + adminStyle + juiStyle +'">' +
            '<span class="jui-radio-style' + juiStyle + '">' +
            '<span class="jui-radio-inner"></span>' +
            '<input type="radio" class="jui-radio-original" name="' + name + '">' +
            '</span>' +
            '<span class="jui-radio-label">' +
            '备选项<!---->' +
            '</span>' +
            '</label>';
       
        $(element).after(html);
        $(element).remove();
    })
})