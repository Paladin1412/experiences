// i have a js aop requirement and i knew this is language-less ,programe thought is no coutryside.
// so i reseached this article http://www.alloyteam.com/2013/08/yong-aop-gai-shan-javascript-dai-ma/ 
// main code from that post
// 整理 by cuipeng

// #the AOP CORE
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



// #USE-CASE DEMO 演示示例

// ##Define a execute-time-log aspect
var log_time_aspect = function (func, func_name) {
    return func = (function () {
        var d;
        return func.before(function () {
            d = +new Date();
        }).after(function () {
            console.log("execute " + func_name + " cost " + (+new Date - d) + " ms ");
        })
    })();
};
// ##Define a stack log aspect
var log_stack_aspect=function (func, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return func.before(function(){
         var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        
    });
}


// ##this is a common function
var append_doms = function (u) {
    for (var i = 0; i < 1000; i++) {
        var div = document.createElement("div");
        document.body.appendChild(div);
        u ? div.getBoundingClientRect() : null;
    }
};

//##bind it , so this function can have the time-log aspect
append_doms = log_time_aspect(append_doms, "append_doms");
//##repeat bind it , so this function can have the error-log aspect
append_doms = log_stack_aspect(append_doms, "append_doms"," msg ");

// excute it ,then the time log auto cout..
append_doms();
