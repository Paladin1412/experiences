(function (doc, win) {
    // 基准字体大小
    var remNum = 100;
    // 基准设计宽度
    var screenWidth = 640;
    var docEl = doc.documentElement;
    var recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = remNum * (clientWidth / screenWidth) + 'px';
    };
    win.addEventListener('resize', recalc, false);
    recalc();
})(document, window);
