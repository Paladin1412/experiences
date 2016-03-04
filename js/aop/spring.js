// main idea from http://www.alloyteam.com/2013/08/yong-aop-gai-shan-javascript-dai-ma/
// 整理 by cuipeng
/**
 * 模拟java spring before
 * @param func
 * @returns {Function}
 */
Function.prototype.before = function (func) {
    var _self = this;
    return function () {
        if (func.apply(this, arguments) === false) {
            return false;
        }
        return _self.apply(this, arguments);
    }
};
/**
 * 模拟java spring after
 * @param func
 * @returns {Function}
 */
Function.prototype.after = function (func) {
    var _self = this;
    return function () {
        var ret = _self.apply(this, arguments);
        if (ret === false) {
            return false;
        }
        func.apply(this, arguments);
        return ret;
    }
};
// USE-CASE DEMO
// Define a use case ,log execute time-log aspect
var log_time = function (func, func_name) {
    return func = (function () {
        var d;
        return func.before(function () {
            d = +new Date();
        }).after(function () {
            console.log("execute " + func_name + " cost " + +new Date - d + " ms ");
        })
    })();
};
// this is a common function
var append_doms = function (u) {
    for (var i = 0; i < 1000; i++) {
        var div = document.createElement("div");
        document.body.appendChild(div);
        u ? div.getBoundingClientRect() : null;
    }
};
//bind it , so this function can have the time-log aspect
append_doms = log_time(append_doms, "append_doms");
// excute it ,then the time log auto cout..
append_doms();
