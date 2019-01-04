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
        var NORMAL = '<label class="zr-upload-wrapper" for="' + _id + '">' +
            '<span class="zr-upload-clone">' +
            '<i class="zr-upload-icon"></i>' +
            '<span class="zr-upload-text">' + _text + '</span>' +
            '</span>' +
            '</label>';

        var PICTURE = '<label class="zr-upload-wrapper zr-upload-wrapper-picture" for="' + _id + '">' +
            '<span class="zr-upload-clone">' +
            '<i class="zr-upload-icon"></i>' +
            '</label>';

        var DRAG = '<label class="zr-upload-wrapper zr-upload-wrapper-drag" for="' + _id + '">' +
            '<span class="zr-upload-clone">' +
            '<i class="zr-upload-icon"></i>' +
            '<p class="zr-upload-text">' + _text + '</p>' +
            '<p class="zr-upload-tips">' + _tips + '</p>' +
            '</span>' +
            '</label>';
        var html = '';
        if (_picFlag) {
            html = PICTURE;
        } else if (_dragFlag) {
            html = DRAG;
        } else {
            html = NORMAL;
        }
        var $label = $(html);
        $original.after($label);
        $original.css('display', 'none');

        var $clone = $label.children('.zr-upload-clone');

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
                $text = $clone.siblings('.zr-upload-text');

            var opt = option || {};

            for (var name in opt) {
                if (name === 'disabled') $input.prop('disabled', opt[name]);
                if (name === 'value') $input.prop('value', opt[name]);
                if (name === 'text') {
                    if (opt[name].length == 0) {
                        $text.css('display', 'none');
                        $input.removeAttr('data-text');
                    } else {
                        $text.css('display', 'inline').html(opt[name]);
                        $input.attr('data-text', opt[name]);
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