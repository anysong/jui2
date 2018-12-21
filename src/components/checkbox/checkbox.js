
//jui-checkbox
$(function () {
    console.log($('.jui-checkbox').length);
    // var className = $('.jui-checkbox').prop('class');
    // console.log(className);
    $('.jui-checkbox').each(function (index, element) {
        // console.log('element', element);
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
        var html = '<label class="jui-checkbox-wrapper ' + adminStyle + '">' +
            '<span class="jui-checkbox-style' + juiStyle + '">' +
            '<span class="jui-checkbox-inner"></span>' +
            '<input type="checkbox" class="jui-checkbox-original" name="' + name + '">' +
            '</span>' +
            '<span class="jui-checkbox-label">' +
            '备选项<!---->' +
            '</span>' +
            '</label>';
        var dom = $(html)[0];
        $(element).after(dom);
        console.log('tt', dom);
        $(element).remove();
        addEvent(dom)
    })
    function addEvent(dom){
        dom.change = function(){
            // alert(8);            
        }
    }

    $('body').on('click', '.jui-checkbox-wrapper', function(){
        console.log(this.change());
    })
    
    //事件
    // $('input[type="checkbox"]').on('change', function(){
    //     console.log(this);
    //     alert(12);
    //     console.log($(this).prop('checked'));
    // })

    // $('.jui-checkbox-style').on('click', function(){
    //     alert(2);
    //     console.log($(this).children('input'));
    // })
})
