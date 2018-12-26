//zr-radio
$(function () {
    $('.zr-radio').each(function (index, element) {
        var $original = $(element);
        var _checked = $original.prop('checked'),
            _disabled = $original.prop('disabled'),
            _value = $original.prop('value');
           
        var html = '<label class="zr-radio-wrapper">' +
            '<span class="zr-radio-clone">' +
            '<span class="zr-radio-inner"></span>' +
            '</span>' +
            '<span class="zr-radio-label">' + _value +
            '</span>' +
            '</label>';
        var $label = $(html);
        $original.after($label);
        $label.children('.zr-radio-clone').append(element);
        $original.addClass('zr-radio-original');
        $original.removeClass('zr-radio');

        var $clone = $original.parent(),
            $text = $clone.siblings('.zr-radio-label');
        
        if(_value.length == 0){
            $text.css('display','none');
        }else {
            $text.css('display','inline');
        }
        //已选中
        if(_checked){
            $clone.addClass('zr-radio-checked');
            $label.addClass('zr-radio-wrapper-checked');
        }
        //已禁用
        if(_disabled){
            $clone.addClass('zr-radio-disabled');
            $label.addClass('zr-radio-wrapper-disabled');
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
                $clone = $input.parent(),
                $label = $input.closest('label'),
                inputName = $input.prop('name');
            var opt = option || {};

            for(var name in opt){
                if(name === 'checked') $input.prop('checked', opt[name]);
                if(name === 'disabled') $input.prop('disabled', opt[name]);
                if(name === 'value') {
                    if(opt[name].length == 0){
                        $clone.siblings('.zr-radio-label').css('display','none');
                    }else {
                        $clone.siblings('.zr-radio-label').css('display','inline').html(opt[name]);
                    }
                };
            }
            if(opt.beforeFn) opt.beforeFn.call(this);
            //选中
            if ($input.prop('checked')) {
                $clone.addClass('zr-radio-checked');
                $label.addClass('zr-radio-wrapper-checked');
                //其他项目取消选中
                var aInput = $('input[name=' + inputName + ']');
                aInput.each(function (i, element) {
                    if (original !== element) {
                        element.onzrchange? element.onzrchange(): '';
                    }
                })
            }else {
                $clone.removeClass('zr-radio-checked');
                $label.removeClass('zr-radio-wrapper-checked');
            }
            //禁用
            if ($input.prop('disabled')) {
                $clone.addClass('zr-radio-disabled');
                $label.addClass('zr-radio-wrapper-disabled');
            }else {
                $clone.removeClass('zr-radio-disabled');
                $label.removeClass('zr-radio-wrapper-disabled');
            }

            if(opt.afterFn) opt.afterFn.call(this);
        }
    }

    $('.js-select').on('click', function () {
        //选中
        $('#id1')[0].onzrchange({
            checked: true,
            disabled: true,
            value: 'xx',
            beforeFn: function () {
                console.log(this);
            },
            afterFn: function(){
                console.log(this);
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