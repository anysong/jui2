
//jui-radio
$(function () {
    console.log($('.jui-radio').length);
    // var className = $('.jui-radio').prop('class');
    // console.log(className);
    $('.jui-radio').each(function (index, element) {
        // console.log('element', element);
        var className = $(element).prop('class');
        var name = $(element).prop('name');
        var id = $(element).prop('id');
        //TODO 处理 className；
        var _arr = className.split(' ');
        var juiStyle = '',
            adminStyle = '';
        for (var i = 0; i < _arr.length; i++) {
            if(_arr[i].indexOf('jui-') != -1){
                juiStyle += ' ' + _arr[i];
            }else {
                adminStyle += ' ' + _arr[i];
            }
        }
        var html = '<label class="jui-radio-wrapper ' + adminStyle + '">' +
            '<span class="jui-radio-style' + juiStyle + '">' +
            '<span class="jui-radio-inner"></span>' +
            '<input type="radio" class="jui-radio-original" name="' + name + '">' +
            '</span>' +
            '<span class="jui-radio-label">' +
            '备选项<!---->' +
            '</span>' +
            '</label>';
        var $dom = $(html);
        var $input = $dom.find('input');
        $input.attr('id', id); //id 传入
        var input = $dom.find('input')[0];
        addEvent(input) //绑定事件
        $(element).after($dom);
        $(element).remove();
        
    })
    //绑定自定义事件
    function addEvent(dom){
        dom.onzrchange = function(option){
            var $input = $(this),
                _input = this,
                name = $input.prop('name');
            var opt = option || {};
            // 选中
            if($input.prop('checked')){
                $input.parent().attr('class', 'jui-radio-style jui-radio-checked'); //选中当前
                $input.closest('label').attr('class', 'jui-radio-wrapper jui-radio-wrapper-checked'); //外包裹
                //其他项目取消选中
                var aInput = $('input[name=' + name + ']');
                aInput.each(function(i, element){
                    if(_input !== element){
                        var $element = $(element);
                        $element.parent().attr('class', 'jui-radio-style');
                        $element.closest('label').attr('class', 'jui-radio-wrapper'); //外包裹
                    }
                })
            }
            if(opt.checked){
                $input.prop('checked', true);
                
                $input.parent().attr('class', 'jui-radio-style jui-radio-checked'); //选中当前
                $input.closest('label').attr('class', 'jui-radio-wrapper jui-radio-wrapper-checked'); //外包裹
                //其他项目取消选中
                var aInput = $('input[name=' + name + ']');
                aInput.each(function(i, element){
                    if(_input !== element){
                        var $element = $(element);
                        $element.parent().attr('class', 'jui-radio-style');
                        $element.closest('label').attr('class', 'jui-radio-wrapper'); //外包裹
                    }
                })
            }
            //执行回调
            if(opt.fn){
                opt.fn();
            }
        }
    }
    $('input[type="radio"]').on('change', function(){
        this.onzrchange()
    })

    $('.js-select').on('click',function(){
        console.log($('#id1')[0])
        //选中
        $('#id1')[0].onzrchange(
            {
                checked: true,
                fn: function(){
                    alert(1);
                }
            }
        )
    })
    /**
     * 每次change事件触发
     * wrap包裹层和样式层class重置
     * 没有input元素不执行操作
     * 选中添加 aria-checked="true" 属性
     * role="radio" x
     * tabindex="0" x
     * input元素自身 aria-hidden="true"
     * label
     * 
     * 
     * 
     * input 添加了 原生onchange事件：
     * 父级添加class 而label级别判断条件是label
     * 
     * 
     * */


    // 没有 jui-radio-wrapper 照样执行
    // 外层并不支持添加class 允许添加id 
    // $('body').on('click', '.jui-radio-wrapper', function(){
    //     console.log(this.onzrchange());
    // })
    
    //自定义事件
    // $('input[type="radio"]').on('onzrchange', function(){
    //     console.log(this);
    //     alert(12);
    //     console.log($(this).prop('checked'));
    // })
    // $('input[type="radio"]').on('change', function(){
    //     alert(2);
    // })
    // $('input[type="radio"]').on('change', function(){
    //     alert(3);
    // })
    // $('input[type="radio"]').on('blur', function(){
    //     alert('blur');
    // })
    // $('input[type="radio"]').on('focus', function(){
    //     alert('focus');
    // })
    // $('.jui-radio-style').on('click', function(){
    //     alert(2);
    //     console.log($(this).children('input'));
    // })
})
