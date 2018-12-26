//zr-checkbox
$(function () {
    $('.zr-checkbox').each(function (index, element) {
        var $original = $(element),
            original = element;
        var _checked = $original.prop('checked'),
            _disabled = $original.prop('disabled'),
            _id = $original.prop('id'),
            _value = $original.prop('value'),
            _name = $original.prop('name'),
            all = $original.attr('data-all');

        var update = function ($input, name) {
            if (name) {
                var $aCheckbox = $('input[name="' + name + '"]');
                //是否当前为全选
                if (all) {
                    $aCheckbox.each(function (index, element) {
                        if (element !== original) {
                            console.log('ee',element);
                            $(element).prop('checked', true);
                        }
                    })
                } else {

                }
            }
        }
        
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
        var html = '<label class="zr-checkbox-wrapper" for="' + _id + '">' +
            '<span class="zr-checkbox-clone">' +
            '<span class="zr-checkbox-inner"></span>' +
            '</span>' +
            '<span class="zr-checkbox-label">' + _value +
            '</span>' +
            '</label>';
        var $label = $(html);
        $original.after($label);
        $original.css('display', 'none');

        var $clone = $label.children('.zr-checkbox-clone'),
            $text = $clone.siblings('.zr-checkbox-label');

        if (_value.length == 0) {
            $text.css('display', 'none');
        } else {
            $text.css('display', 'inline');
        }
        //已选中
        if (_checked) {
            $clone.addClass('zr-checkbox-checked');
            $label.addClass('zr-checkbox-wrapper-checked');
        }
        //已禁用
        if (_disabled) {
            $clone.addClass('zr-checkbox-disabled');
            $label.addClass('zr-checkbox-wrapper-disabled');
        }
        
        addEvent(element) //绑定事件
        update($original, _name);
    })
    //绑定自定义事件
    function addEvent(dom) {
        $(dom).on('change', function () {
            this.onzrchange ? this.onzrchange() : '';
        })
        dom.onzrchange = function (option) {
            var $input = $(this),
                _id = $input.prop('id'),
                $label = $input.siblings('[for="' + _id + '"]'),
                $clone = $label.children('.zr-checkbox-clone');
            var opt = option || {};

            for (var name in opt) {
                if (name === 'checked') $input.prop('checked', opt[name]);
                if (name === 'disabled') $input.prop('disabled', opt[name]);
                if (name === 'value') {
                    if (opt[name].length == 0) {
                        $clone.siblings('.zr-checkbox-label').css('display', 'none');
                    } else {
                        $clone.siblings('.zr-checkbox-label').css('display', 'inline').html(opt[name]);
                    }
                };
            }
            if (opt.beforeFn) opt.beforeFn.call(this);
            //选中
            if ($input.prop('checked')) {
                $clone.addClass('zr-checkbox-checked');
                $label.addClass('zr-checkbox-wrapper-checked');
            } else {
                $clone.removeClass('zr-checkbox-checked');
                $label.removeClass('zr-checkbox-wrapper-checked');
            }

            //禁用
            if ($input.prop('disabled')) {
                $clone.addClass('zr-checkbox-disabled');
                $label.addClass('zr-checkbox-wrapper-disabled');
            } else {
                $clone.removeClass('zr-checkbox-disabled');
                $label.removeClass('zr-checkbox-wrapper-disabled');
            }

            if (opt.afterFn) opt.afterFn.call(this);
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
            afterFn: function () {
                console.log(this);
            }
        })
    })

    //监听
    $(document).on("DOMNodeInserted", function () {
        console.log('is');
    })
    $(document).on("DOMNodeRemoved", function () {
        console.log('rm');
    })
})