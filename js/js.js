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
//##################################
function request(url, callback, charset, crossorigin) {
    var node = doc.createElement("script")

    if (charset) {
      node.charset = charset
    }

    if (!isUndefined(crossorigin)) {
      node.setAttribute("crossorigin", crossorigin)
    }

    addOnload(node, callback, url)

    node.async = true
    node.src = url

    // For some cache cases in IE 6-8, the script executes IMMEDIATELY after
    // the end of the insert execution, so use `currentlyAddingScript` to
    // hold current node, for deriving url in `define` call
    currentlyAddingScript = node

    // ref: #185 & http://dev.jquery.com/ticket/2709
    baseElement ?
        head.insertBefore(node, baseElement) :
        head.appendChild(node)

    currentlyAddingScript = null;
  }
  function addOnload(node, callback, url) {
    var supportOnload = "onload" in node

    if (supportOnload) {
      node.onload = onload
      node.onerror = function() {
        emit("error", { uri: url, node: node })
        onload(true)
      }
    }
    else {
      node.onreadystatechange = function() {
        if (/loaded|complete/.test(node.readyState)) {
          onload()
        }
      }
    }

    function onload(error) {
      // Ensure only run once and handle memory leak in IE
      node.onload = node.onerror = node.onreadystatechange = null

      // Remove the script to reduce memory leak
      if (!data.debug) {
        head.removeChild(node)
      }

      // Dereference the node
      node = null

      callback(error)
    }
#########################
// get almost percenter of the cavas.
var getTransparentPercent=function (ctx, width, height) {
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
    },
