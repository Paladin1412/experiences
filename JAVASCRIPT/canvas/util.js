
// get almost percenter of the cavas.
var getTransparentPercent = function (ctx, width, height) {
    var imgData = ctx.getImageData(0, 0, width, height),
        pixles = imgData.data,
        transPixs = [];
    for (var i = 0, j = pixles.length; i < j; i += 4) {
        var a = pixles[i + 3];
        if (a < 128) {
            transPixs.push(i);
        }
    }
    return (transPixs.length / (pixles.length / 4) * 100).toFixed(2);
}
// canvas get the deal position .
var getRelativePosition = function (evt) {
    var mouseX, mouseY;
    var e = evt.originalEvent || evt,
        canvas = evt.currentTarget || evt.srcElement,
        boundingRect = canvas.getBoundingClientRect();

    if (e.touches) {
        mouseX = e.touches[0].clientX - boundingRect.left;
        mouseY = e.touches[0].clientY - boundingRect.top;
    }
    else {
        mouseX = e.clientX - boundingRect.left;
        mouseY = e.clientY - boundingRect.top;
    }

    return {
        x: mouseX,
        y: mouseY
    };

}