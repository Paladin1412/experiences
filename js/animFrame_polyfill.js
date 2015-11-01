
/**
 * Alias for `requestAnimationFrame` or
 * `setTimeout` function for deprecated browsers.
 *
 */
requestAnimFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback) {
            return window.setTimeout(callback, 1000 / 60);
        }
    );
})();

/**
 * Alias for `cancelAnimationFrame` or
 * `cancelTimeout` function for deprecated browsers.
 *
 */
cancelAnimFrame = (function () {
    return (
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        function (id) {
            return window.clearTimeout(id);
        }
    );
})();
