
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
        var isChecked = '';
        for (var i = 0; i < _arr.length; i++) {
            if(_arr[i] != 'jui-radio'){
                _list.push(_arr[i]);
            }
            if(_arr[i] === 'is-checked'){
                isChecked = 'is-checked';
            }
        }
        var newclass = _list.join(' ');
        var html = '<label class="jui-radio-wrapper ' + newclass + '">' +
            '<span class="jui-radio-input ' + isChecked + '">' +
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