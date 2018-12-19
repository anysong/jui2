//jui-radio
$(function () {
    console.log($('.jui-radio').length);
    // var className = $('.jui-radio').prop('class');
    // console.log(className);
    $('.jui-radio').each(function (index, element) {
        console.log('element', element);
        var className = $(element).prop('class');
        //TODO 处理 className；
        console.log(className);
        var radio = '<label class="jui-radio-wrapper ' + className + '">' +
            '<span class="jui-radio-input">' +
            '<input type="radio">' +
            '<span></span>' +
            '</span>' +
            '<span class="jui-radio-label">' +
            '2222' +
            '</span>' +
            '</label>'
        $(element).after(radio);
        $(element).remove();
    })
})