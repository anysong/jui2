//zr-radio
$(function () {
    $('.zr-radio').each(function (index, element) {
        var $original = $(element);
        var _checked = $original.prop('checked'),
            _disabled = $original.prop('disabled'),
            _id = $original.prop('id'),
            _label = $original.attr('data-label') || '';

        var uuid = function () {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 6; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            var uuid = s.join("");
            return uuid;
        }
        var checkOnly = function () {
            var id = uuid();
            $(id).lenth > 0 ? checkOnly() : _id = id;
        }
        if (!_id) {
            checkOnly();
            $original.prop('id', _id);
        }
        var html = '<label class="zr-radio-wrapper" for="' + _id + '">' +
            '<span class="zr-radio-clone">' +
            '<span class="zr-radio-inner"></span>' +
            '</span>' +
            '<span class="zr-radio-label">' + _label +
            '</span>' +
            '</label>';
        var $label = $(html);
        $original.after($label);
        $original.css('display', 'none');
        
        var $clone = $label.children('.zr-radio-clone'),
            $text = $clone.siblings('.zr-radio-label');

        if (_label.length == 0) {
            $text.css('display', 'none');
        } else {
            $text.css('display', 'inline');
        }
        //已选中
        if (_checked) {
            $clone.addClass('zr-radio-checked');
            $label.addClass('zr-radio-wrapper-checked');
        }
        //已禁用
        if (_disabled) {
            $clone.addClass('zr-radio-disabled');
            $label.addClass('zr-radio-wrapper-disabled');
        }
        
        addClickEvent($label, element); //label绑定事件
        addEvent(element); //绑定事件
    })
    function addClickEvent($label, original){
        $label.on('click', function () {
            setTimeout(function(){
                original.onzrchange ? original.onzrchange() : '';
            },30)
        })
    };
    //绑定自定义事件
    function addEvent(dom) {
        dom.onzrchange = function (option) {
            var $input = $(this),
                input = this,
                _name = $input.prop('name'),
                _id = $input.prop('id');
            
            var $label = $input.siblings('[for="' + _id + '"]'),
                $clone = $label.children('.zr-radio-clone'),
                $text = $clone.siblings('.zr-radio-label');

            var opt = option || {};

            for (var name in opt) {
                if (name === 'checked') $input.prop('checked', opt[name]);
                if (name === 'disabled') $input.prop('disabled', opt[name]);
                if (name === 'value') $input.prop('value', opt[name]);
                if (name === 'label') {
                    if (opt[name].length == 0) {
                        $text.css('display', 'none');
                        $input.removeAttr('data-label');
                    } else {
                        $text.css('display', 'inline').html(opt[name]);
                        $input.attr('data-label', opt[name]);
                    }
                };
            }
            if (opt.beforeFn) opt.beforeFn.call(this, opt);
            //选中
            if ($input.prop('checked')) {
                $clone.addClass('zr-radio-checked');
                $label.addClass('zr-radio-wrapper-checked');
                //其他项目取消选中
                var aInput = $('input[name=' + _name + ']');
                aInput.each(function (i, element) {
                    if (input !== element) {
                        element.onzrchange ? element.onzrchange() : '';
                    }
                })
            } else {
                $clone.removeClass('zr-radio-checked');
                $label.removeClass('zr-radio-wrapper-checked');
            }
            //禁用
            if ($input.prop('disabled')) {
                $clone.addClass('zr-radio-disabled');
                $label.addClass('zr-radio-wrapper-disabled');
            } else {
                $clone.removeClass('zr-radio-disabled');
                $label.removeClass('zr-radio-wrapper-disabled');
            }

            if (opt.afterFn) opt.afterFn.call(this);
        }
    };

    $('.js-select').on('click', function () {
        //选中
        $('#id1')[0].onzrchange({
            checked: true,
            disabled: true,
            value: 'xx1',
            label: 14,
            beforeFn: function () {
                // console.log(arguments);
                console.log(this);
            },
            afterFn: function () {
                // console.log(this);
            }
        })
    })
    $('.js-disabled').on('click', function(){
        $('#id2').prop('checked', true);
        // $('#id2')[0].onzrchange({
        //     checked: true,
        //     disabled: true,
        //     value: 'xx',
        //     beforeFn: function () {
        //         // console.log(this);
        //     },
        //     afterFn: function () {
        //         // console.log(this);
        //     }
        // })
    })
    //监听
    $(document).on("DOMNodeInserted", function () {
        // console.log('is');
    });
    $(document).on("DOMNodeRemoved", function () {
        // console.log('rm');
    })
})