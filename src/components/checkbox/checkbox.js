//jui-checkbox
$(function () {
    $('.jui-checkbox').each(function (index, element) {
        var $original = $(element);
        var _checked = $original.prop('checked'),
            _disabled = $original.prop('disabled'),
            _value = $original.prop('value');
        
        var html = '<label class="jui-checkbox-wrapper">' +
            '<span class="jui-checkbox-clone">' +
            '<span class="jui-checkbox-inner"></span>' +
            '</span>' +
            '<span class="jui-checkbox-label">' + _value +
            '</span>' +
            '</label>';
        var $shell = $(html);
        $original.after($shell);
        $shell.children('.jui-checkbox-clone').append(element);
        $original.addClass('jui-checkbox-original');
        $original.removeClass('jui-checkbox');

        var $parent = $original.parent(),
            $label = $original.closest('label');
        
        if(_value.length == 0){
            $parent.siblings('.zr-checkbox-label').css('display','none');
        }else {
            $parent.siblings('.zr-checkbox-label').css('display','inline');
        }
        //已选中
        if(_checked){
            $parent.addClass('jui-checkbox-checked');
            $label.addClass('jui-checkbox-wrapper-checked');
        }
        //已禁用
        if(_disabled){
            $parent.addClass('jui-checkbox-disabled');
            $label.addClass('jui-checkbox-wrapper-disabled');
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
                $parent = $input.parent(),
                $label = $input.closest('label');
            var opt = option || {};

            for(var name in opt){
                if(name === 'checked') $input.prop('checked', opt[name]);
                if(name === 'disabled') $input.prop('disabled', opt[name]);
                if(name === 'value') {
                    if(opt[name].length == 0){
                        $parent.siblings('.zr-checkbox-label').css('display','none');
                    }else {
                        $parent.siblings('.zr-checkbox-label').css('display','inline').html(opt[name]);
                    }
                };
            }
            if(opt.beforeFn) opt.beforeFn();
            //选中
            if ($input.prop('checked')) {
                $parent.addClass('jui-checkbox-checked');
                $label.addClass('jui-checkbox-wrapper-checked');
            }else {
                $parent.removeClass('jui-checkbox-checked');
                $label.removeClass('jui-checkbox-wrapper-checked');
            }
           
            //禁用
            if ($input.prop('disabled')) {
                $parent.addClass('jui-checkbox-disabled');
                $label.addClass('jui-checkbox-wrapper-disabled');
            }else {
                $parent.removeClass('jui-checkbox-disabled');
                $label.removeClass('jui-checkbox-wrapper-disabled');
            }

            if(opt.afterFn) opt.afterFn();
        }
    }
   
    $('.js-select').on('click', function () {
        //选中
        $('#id1')[0].onzrchange({
            checked: true,
            disabled: true,
            value: 'xx',
            beforeFn: function () {
                // console.log(1);
            },
            afterFn: function(){
                // console.log(2);
            }
        })
        // setTimeout(function(){
        $('body').append('<input type="checkbox" class="jui-checkbox">');
        // },3000)
        
    })

    //监听
    $(document).on("DOMNodeInserted", function(){
        console.log('is');
    })
    $(document).on("DOMNodeRemoved", function(){
        console.log('rm');
    })
})




