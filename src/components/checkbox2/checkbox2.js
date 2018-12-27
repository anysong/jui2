//zr-checkbox
$(function () {
    $('.zr-checkbox').each(function (index, element) {
        var $original = $(element);
        var _checked = $original.prop('checked'),
            _disabled = $original.prop('disabled'),
            _id = $original.prop('id'),
            _value = $original.prop('value');

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
    })
    //绑定自定义事件
    function addEvent(dom) {
        $(dom).on('change', function () {
            this.onzrchange ? this.onzrchange() : '';
        })
        dom.onzrchange = function (option) {
            var $input = $(this),
                input = this,
                _name = $input.prop('name'),
                all = $input.attr('data-all'),
                _id = $input.prop('id'),
                $label = $input.siblings('[for="' + _id + '"]'),
                $clone = $label.children('.zr-checkbox-clone');
            var config = {
                checkedall: false
            }
            var opt = $.extend({}, config, option);

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
            //全选
            for (var name in opt) {
                if (name === 'checkedAll') {
                    var $checkboxAll = $('input[name="' + _name + '"]');
                    $checkboxAll.each(function(i, element){
                        var $element = $(element),
                            _id = $element.prop('id'),
                            _$label = $('label[for="' + _id + '"]'),
                            _$clone = _$label.children('.zr-checkbox-clone');
                        if (name) {
                            _$clone.addClass('zr-checkbox-checked');
                            _$label.addClass('zr-checkbox-wrapper-checked');
                        } else {
                            _$clone.removeClass('zr-checkbox-checked');
                            _$label.removeClass('zr-checkbox-wrapper-checked');
                        }
                    })
                    return
                };
            }
            var $checkAll = $('input[name="' + _name + '"][data-all="true"]'),
                $aCheckItems = $('input[name="' + _name + '"][data-all!="true"]');

            var checkedFn = function () {
                if (all) {
                    //全选
                    $aCheckItems.prop('checked', $checkAll.prop('checked'));
                    $aCheckItems.each(function (index, element) {
                        var $element = $(element),
                            _id = $element.prop('id'),
                            _checked = $element.prop('checked'),
                            _$label = $('label[for="' + _id + '"]'),
                            _$clone = _$label.children('.zr-checkbox-clone');
                        if (_checked) {
                            _$clone.addClass('zr-checkbox-checked');
                            _$label.addClass('zr-checkbox-wrapper-checked');
                        } else {
                            _$clone.removeClass('zr-checkbox-checked');
                            _$label.removeClass('zr-checkbox-wrapper-checked');
                        }
                    })
                } else {
                    var flag = $aCheckItems.length === $aCheckItems.filter(':checked').length;
                    $checkAll.prop('checked', flag);

                    var $element = $checkAll,
                        _id = $element.prop('id'),
                        _checked = $element.prop('checked'),
                        _$label = $('label[for="' + _id + '"]'),
                        _$clone = _$label.children('.zr-checkbox-clone');
                    if (_checked) {
                        _$clone.addClass('zr-checkbox-checked');
                        _$label.addClass('zr-checkbox-wrapper-checked');
                    } else {
                        _$clone.removeClass('zr-checkbox-checked');
                        _$label.removeClass('zr-checkbox-wrapper-checked');
                    }
                }
            }
            checkedFn();
        }
    }

    $('.js-all').on('click',function(){
        $('#m2')[0].onzrchange({
            checked: true,
            checkedAll: true
        })
        // $('#m3')[0].onzrchange({
        //     checked: true
        // })
        // $('#m4')[0].onzrchange({
        //     checked: true
        // })
        // $('#m5')[0].onzrchange({
        //     checked: true
        // })
        // $('#m1')[0].onzrchange({
        //     checked: true
        // })
        // $('#m1').prop('checked', true);
        // $('#m1').change();
    })
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