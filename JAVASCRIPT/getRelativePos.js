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
