//jui-checkbox

$(function () {
    $('.jui-checkbox').each(function (index, element) {
        var $original = $(element);
        var _class = $original.prop('class'),
            _name = $original.prop('name'),
            _checked = $original.prop('checked'),
            _disabled = $original.prop('disabled'),
            _value = $original.prop('value'),
            _id = $original.prop('id');
        
        var html = '<label class="jui-checkbox-wrapper">' +
            '<span class="jui-checkbox-clone">' +
            '<span class="jui-checkbox-inner"></span>' +
            '<input type="checkbox" class="' + _class + '">' + 
            '</span>' +
            '<span class="jui-checkbox-label">' + _value +
            '</span>' +
            '</label>';
        var $dom = $(html),
            $input = $dom.find('input');
        //暂时不添加class
        $input.prop('checked', _checked); //checked
        $input.prop('disabled', _disabled); //disabled
        $input.attr('name', _name); //name
        $input.attr('id', _id); //id
        $input.addClass('jui-checkbox-original');
        $input.removeClass('jui-checkbox');
        //已选中
        if(_checked){
            $input.parent().addClass('jui-checkbox-checked');
            $input.closest('label').addClass('jui-checkbox-wrapper-checked');
        }
        //已禁用
        if(_disabled){
            $input.parent().addClass('jui-checkbox-disabled');
            $input.closest('label').addClass('jui-checkbox-wrapper-disabled');
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
                $parent.addClass('jui-checkbox-checked');
                $input.closest('label').addClass('jui-checkbox-wrapper-checked');
            }else {
                $parent.removeClass('jui-checkbox-checked');
                $input.closest('label').removeClass('jui-checkbox-wrapper-checked');
            }
            //禁用
            if ($input.prop('disabled')) {
                $parent.addClass('jui-checkbox-disabled');
                $input.closest('label').addClass('jui-checkbox-wrapper-disabled');
            }else {
                $parent.removeClass('jui-checkbox-disabled');
                $input.closest('label').removeClass('jui-checkbox-wrapper-disabled');
            }

            if(opt.afterFn) opt.afterFn();
        }
    }
    $('input[type="checkbox"]').on('change', function () {
        this.onzrchange? this.onzrchange():''; //普通checkbox 没有onzrchange
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

        $('body').append('<input type="checkbox" class="zr-checkbox">')
    })
})