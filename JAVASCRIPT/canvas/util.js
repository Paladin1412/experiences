
// get almost percenter of the cavas.
function getTransparentPercent(ctx, width, height) {
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
function getRelativePosition   (evt) {
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


/**
 * Draw a linear gradient
 *
 * @param {CanvasContext} ctx
 * @param {Number} x1 gradient start-x coordinate
 * @param {Number} y1 gradient start-y coordinate
 * @param {Number} x2 gradient end-x coordinate
 * @param {Number} y2 gradient end-y coordinate
 * @param {Array} colorStops Array of {(String)color, (Number)position} values
 * @param {Number} x x-coordinate to begin fill
 * @param {Number} y y-coordinate to begin fill
 * @param {Number} width how wide to fill
 * @param {Number} height how tall to fill
 */
function drawGradient(ctx, x1, y1, x2, y2, colorStops, x, y, width, height) {
  var grad;

  ctx.save();
  grad = ctx.createLinearGradient(x1, y1, x2, y2);

  colorStops.forEach(function (colorStop) {
    grad.addColorStop(colorStop.position, colorStop.color);
  });

  ctx.fillStyle = grad;
  ctx.fillRect(x, y, width, height);
  ctx.restore();
}
