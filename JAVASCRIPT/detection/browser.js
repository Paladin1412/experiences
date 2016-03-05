/**
 * 浏览器特性集合。包括：
 * <ul>
 * <li><b>jsVendor</b> - 浏览器厂商CSS前缀的js值。比如：webkit。</li>
 * <li><b>cssVendor</b> - 浏览器厂商CSS前缀的css值。比如：-webkit-。</li>
 * <li><b>supportTransform</b> - 是否支持CSS Transform变换。</li>
 * <li><b>supportTransform3D</b> - 是否支持CSS Transform 3D变换。</li>
 * <li><b>supportStorage</b> - 是否支持本地存储localStorage。</li>
 * <li><b>supportTouch</b> - 是否支持触碰事件。</li>
 * <li><b>supportCanvas</b> - 是否支持canvas元素。</li>
 * </ul>
 */
browser = (function () {
    var ua = navigator.userAgent;
    var data = {
        iphone: /iphone/i.test(ua),
        ipad: /ipad/i.test(ua),
        ipod: /ipod/i.test(ua),
        ios: /iphone|ipad|ipod/i.test(ua),
        android: /android/i.test(ua),
        webkit: /webkit/i.test(ua),
        chrome: /chrome/i.test(ua),
        safari: /safari/i.test(ua),
        firefox: /firefox/i.test(ua),
        ie: /msie/i.test(ua),
        opera: /opera/i.test(ua),
        supportTouch: 'ontouchstart' in window,
        supportCanvas: document.createElement('canvas').getContext != null,
        supportStorage: false,
        supportOrientation: 'orientation' in window,
        supportDeviceMotion: 'ondevicemotion' in window
    };

    //`localStorage` is null or `localStorage.setItem` throws error in some cases (e.g. localStorage is disabled)
    try {
        var value = 'hilo';
        localStorage.setItem(value, value);
        localStorage.removeItem(value);
        data.supportStorage = true;
    } catch (e) {
    }
    ;

    //vendro prefix
    var jsVendor = data.jsVendor = data.webkit ? 'webkit' : data.firefox ? 'Moz' : data.opera ? 'O' : data.ie ? 'ms' : '';
    var cssVendor = data.cssVendor = '-' + jsVendor + '-';

    //css transform/3d feature dectection
    var testElem = document.createElement('div'), style = testElem.style;
    var supportTransform = style[jsVendor + 'Transform'] != undefined;
    var supportTransform3D = style[jsVendor + 'Perspective'] != undefined;
    if (supportTransform3D) {
        testElem.id = 'test3d';
        style = document.createElement('style');
        style.textContent = '@media (' + cssVendor + 'transform-3d){#test3d{height:3px}}';
        document.head.appendChild(style);

        document.documentElement.appendChild(testElem);
        supportTransform3D = testElem.offsetHeight == 3;
        document.head.removeChild(style);
        document.documentElement.removeChild(testElem);
    }
    ;
    data.supportTransform = supportTransform;
    data.supportTransform3D = supportTransform3D;

    return data;
})();