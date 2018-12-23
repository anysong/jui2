//jui-radio

$(function () {
    $('.jui-radio').each(function (index, element) {
        var $original = $(element);
        var _class = $original.prop('class'),
            _name = $original.prop('name'),
            _checked = $original.prop('checked'),
            _disabled = $original.prop('disabled'),
            _value = $original.prop('value'),
            _id = $original.prop('id');
        console.log('_value',_value);
        var html = '<label class="jui-radio-wrapper">' +
            '<span class="jui-radio-clone">' +
            '<span class="jui-radio-inner"></span>' +
            '<input type="radio" class="' + _class + '">' + 
            '</span>' +
            '<span class="jui-radio-label">' + _value +
            '</span>' +
            '</label>';
        var $dom = $(html),
            $input = $dom.find('input');
        //暂时不添加class
        $input.prop('checked', _checked); //checked
        $input.prop('disabled', _disabled); //disabled
        $input.attr('name', _name); //name
        $input.attr('id', _id); //id
        $input.addClass('jui-radio-original');
        //已选中
        if(_checked){
            $input.parent().addClass('jui-radio-checked');
            $input.closest('label').addClass('jui-radio-wrapper-checked');
        }
        //已禁用
        if(_disabled){
            $input.parent().addClass('jui-radio-disabled');
            $input.closest('label').addClass('jui-radio-wrapper-disabled');
        }
        
        var input = $input[0];
        addEvent(input) //绑定事件
        //
        $original.after($dom);
        $original.remove();
    })
    //绑定自定义事件
    function addEvent(dom) {
        dom.onzrchange = function (option) {
            var $input = $(this),
                original = this,
                $parent = $input.parent(),
                inputName = $input.prop('name');
            var opt = option || {};

            for(var name in opt){
                if(name === 'checked') $input.prop('checked', opt[name]);
                if(name === 'disabled') $input.prop('disabled', opt[name]);
                if(name === 'value') $parent.siblings('span').html(opt[name]);
            }
            if(opt.beforeFn) opt.beforeFn();
            //选中
            if ($input.prop('checked')) {
                $parent.addClass('jui-radio-checked');
                $input.closest('label').addClass('jui-radio-wrapper-checked');
                //其他项目取消选中
                var aInput = $('input[name=' + inputName + ']');
                aInput.each(function (i, element) {
                    if (original !== element) {
                        element.onzrchange? element.onzrchange(): '';
                    }
                })
            }else {
                $parent.removeClass('jui-radio-checked');
                $input.closest('label').removeClass('jui-radio-wrapper-checked');
            }
            //禁用
            if ($input.prop('disabled')) {
                $parent.addClass('jui-radio-disabled');
                $input.closest('label').addClass('jui-radio-wrapper-disabled');
            }else {
                $parent.removeClass('jui-radio-disabled');
                $input.closest('label').removeClass('jui-radio-wrapper-disabled');
            }

            if(opt.afterFn) opt.afterFn();
        }
    }
    $('input[type="radio"]').on('change', function () {
        this.onzrchange? this.onzrchange():''; //普通radio 没有onzrchange
    })

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
})