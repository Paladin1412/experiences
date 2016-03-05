
/**
 * 获取DOM元素在页面中的内容显示区域。
 * @param {HTMLElement} elem DOM元素。
 * @returns {Object} DOM元素的可视区域。格式为：{left:0, top:0, width:100, height:100}。
 */
function getElementRect(elem){
    try{
        //this fails if it's a disconnected DOM node
        var bounds = elem.getBoundingClientRect();
    }catch(e){
        bounds = {top:elem.offsetTop, left:elem.offsetLeft, width:elem.offsetWidth, height:elem.offsetHeight};
    }

    var offsetX = ((window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0)) || 0;
    var offsetY = ((window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)) || 0;
    var styles = window.getComputedStyle ? getComputedStyle(elem) : elem.currentStyle;
    var parseIntFn = parseInt;

    var padLeft = (parseIntFn(styles.paddingLeft) + parseIntFn(styles.borderLeftWidth)) || 0;
    var padTop = (parseIntFn(styles.paddingTop) + parseIntFn(styles.borderTopWidth)) || 0;
    var padRight = (parseIntFn(styles.paddingRight) + parseIntFn(styles.borderRightWidth)) || 0;
    var padBottom = (parseIntFn(styles.paddingBottom) + parseIntFn(styles.borderBottomWidth)) || 0;
    var top = bounds.top || 0;
    var left = bounds.left || 0;

    return {
        left: left + offsetX + padLeft,
        top: top + offsetY + padTop,
        width: bounds.right - padRight - left - padLeft,
        height: bounds.bottom - padBottom - top - padTop
    };
}

// My thanks to QuirksMode.org for the insight here
function getRelativePos(x, y) {
    var curleft = curtop = 0;

    var obj = document.getElementById('canvas1');
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }

    // Webkit isn't compliant with CSS OM View here; thus, we need to grab scrollTop from body instead of documentElement

    if (document.body.scrollLeft > 0) {
        var scrollLeft = document.body.scrollLeft;
    }
    else {
        scrollLeft = document.documentElement.scrollLeft;
    }

    if (document.body.scrollTop > 0) {
        var scrollTop = document.body.scrollTop;
    }
    else {
        scrollTop = document.documentElement.scrollTop;
    }

    return [(x - curleft + scrollLeft), (y - curtop + scrollTop)];
}
