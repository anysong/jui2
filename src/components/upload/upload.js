//zr-upload
$(function () {
    $('.zr-upload').each(function (index, element) {
        var $original = $(element);
        var _disabled = $original.prop('disabled'),
            _id = $original.prop('id'),
            _text = $original.attr('data-text') || '',
            _tips = $original.attr('data-tips') || '',
            _picFlag = $original.hasClass('zr-upload-picture'),
            _dragFlag = $original.hasClass('zr-upload-drag');

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
        var html = '<label class="zr-upload-wrapper" for="' + _id + '">' +
            '<span class="zr-upload-clone">' +
            '<i class="zr-upload-icon"></i>' +
            '<span class="zr-upload-label">' + _text + '</span>' +
            '</span>' +
            '</label>';
        var $label = $(html);
        $original.after($label);
        $original.css('display', 'none');

        var $clone = $label.children('.zr-upload-clone'),
            $text = $clone.children('.zr-upload-label');

        //图片格式
        if (_picFlag) {
            $label.addClass('zr-upload-wrapper-picture');
        }
        //拖拽样式
        if (_dragFlag) {
            $label.addClass('zr-upload-wrapper-drag');
            var draginner = '<i class="zr-upload-icon"></i>' +
                '<p class="zr-upload-text">' + _text + '</p>' +
                '<p class="zr-upload-tips">' + _tips + '</p>';
            $clone.html(draginner);
        }

        if (_picFlag || _text.length == 0) {
            $text.css('display', 'none');
        } else {
            $text.css('display', 'inline');
        }
        //已禁用
        if (_disabled) {
            $clone.addClass('zr-upload-disabled');
            $label.addClass('zr-upload-wrapper-disabled');
        }

        addClickEvent($label, element); //label绑定事件
        addEvent(element); //绑定事件
    })

    function addClickEvent($label, original) {
        $label.on('click', function () {
            setTimeout(function () {
                original.onzrchange ? original.onzrchange() : '';
            }, 30)
        })
    };
    //绑定自定义事件
    function addEvent(dom) {
        dom.onzrchange = function (option) {
            console.log(11)
            var $input = $(this),
                _id = $input.prop('id');

            var $label = $input.siblings('[for="' + _id + '"]'),
                $clone = $label.children('.zr-upload-clone'),
                $text = $clone.siblings('.zr-upload-label');

            var opt = option || {};

            for (var name in opt) {
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

            //禁用
            if ($input.prop('disabled')) {
                $clone.addClass('zr-upload-disabled');
                $label.addClass('zr-upload-wrapper-disabled');
            } else {
                $clone.removeClass('zr-upload-disabled');
                $label.removeClass('zr-upload-wrapper-disabled');
            }

            if (opt.afterFn) opt.afterFn.call(this);
        }
    };

    //监听
    $(document).on("DOMNodeInserted", function () {
        // console.log('is');
    });
    $(document).on("DOMNodeRemoved", function () {
        // console.log('rm');
    })
})