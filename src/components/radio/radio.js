//jui-radio
$(function () {
    $('.jui-radio').each(function (index, element) {
        var $original = $(element);
        var _checked = $original.prop('checked'),
            _disabled = $original.prop('disabled'),
            _value = $original.prop('value');
           
        var html = '<label class="jui-radio-wrapper">' +
            '<span class="jui-radio-clone">' +
            '<span class="jui-radio-inner"></span>' +
            '</span>' +
            '<span class="jui-radio-label">' + _value +
            '</span>' +
            '</label>';
        var $shell = $(html);
        $original.after($shell);
        $shell.children('.jui-radio-clone').append(element);
        $original.addClass('jui-radio-original');
        $original.removeClass('jui-radio');

        var $parent = $original.parent(),
            $label = $original.closest('label');
        
        if(_value.length == 0){
            $parent.siblings('.zr-radio-label').css('display','none');
        }else {
            $parent.siblings('.zr-radio-label').css('display','inline');
        }
        //已选中
        if(_checked){
            $parent.addClass('jui-radio-checked');
            $label.addClass('jui-radio-wrapper-checked');
        }
        //已禁用
        if(_disabled){
            $parent.addClass('jui-radio-disabled');
            $label.addClass('jui-radio-wrapper-disabled');
        }
        addEvent(element) //绑定事件
    })
    //绑定自定义事件
    function addEvent(dom) {
        $(dom).on('change', function () {
            this.onzrchange? this.onzrchange():'';
        })
        dom.onzrchange = function (option) {
            var $input = $(this),
                original = this,
                $parent = $input.parent(),
                $label = $input.closest('label'),
                inputName = $input.prop('name');
            var opt = option || {};

            for(var name in opt){
                if(name === 'checked') $input.prop('checked', opt[name]);
                if(name === 'disabled') $input.prop('disabled', opt[name]);
                if(name === 'value') {
                    if(opt[name].length == 0){
                        $parent.siblings('.zr-radio-label').css('display','none');
                    }else {
                        $parent.siblings('.zr-radio-label').css('display','inline').html(opt[name]);
                    }
                };
            }
            if(opt.beforeFn) opt.beforeFn();
            //选中
            if ($input.prop('checked')) {
                $parent.addClass('jui-radio-checked');
                $label.addClass('jui-radio-wrapper-checked');
                //其他项目取消选中
                var aInput = $('input[name=' + inputName + ']');
                aInput.each(function (i, element) {
                    if (original !== element) {
                        element.onzrchange? element.onzrchange(): '';
                    }
                })
            }else {
                $parent.removeClass('jui-radio-checked');
                $label.removeClass('jui-radio-wrapper-checked');
            }
            //禁用
            if ($input.prop('disabled')) {
                $parent.addClass('jui-radio-disabled');
                $label.addClass('jui-radio-wrapper-disabled');
            }else {
                $parent.removeClass('jui-radio-disabled');
                $label.removeClass('jui-radio-wrapper-disabled');
            }

            if(opt.afterFn) opt.afterFn();
        }
    }

    $('.js-select').on('click', function () {
        console.log($('#id1')[0])
        //选中
        $('#id1')[0].onzrchange({
            checked: true,
            disabled: true,
            value: 'xx',
            beforeFn: function () {
                console.log(1);
            },
            afterFn: function(){
                console.log(2);
            }
        })
    })
    //监听
    $(document).on("DOMNodeInserted", function(){
        console.log('is');
    })
    $(document).on("DOMNodeRemoved", function(){
        console.log('rm');
    })
})