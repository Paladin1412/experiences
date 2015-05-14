//#######################
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
//#######################
var browser = {
    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    safari: /webkit/.test(userAgent),
    opera: /opera/.test(userAgent),
    msie: (/msie/.test(userAgent)) && (!/opera/.test(userAgent)),
    mozilla: (/mozilla/.test(userAgent)) && (!/(compatible|webkit)/.test(userAgent))
};
//#######################
$.fn.is_on_screen = function (originY) {
    var win = el;
    var viewport = {
        top: originY
    };
    viewport.bottom = viewport.top + $(window).height();
    var bounds = this.offset();
    bounds.top = this.offset().top;
    bounds.bottom = this.offset().top + this.height();
    return (!(viewport.bottom - settings.offsetBottom < bounds.top || viewport.top - settings.offsetTop > bounds.bottom ));
};
//#######################
// This should find all Android browsers lower than build 535.19 (both stock browser and webview)
var isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));
//#######################
({}).toString.call(obj) == "[object " + type + "]"
// above,so why not Object.prototype.toString ..??
	
