(function () {
    var _globals = this;

    var _namespace = function (ns) {
        var a = ns.split("."),
            p = _globals, i;
        for (i = 0; i < a.length; i++) {
            p[a[i]] = p = p[a[i]] || {};
        }
        return p;
    };

    var _defLookup = {};

    var Definition = function (ns, dependencies, func, global) {
        var a;
        this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
        _defLookup[ns] = this;
        this.gsClass = null;
        this.func = func;
        var _classes = [];
        this.check = function (init) {
            var i = dependencies.length,
                missing = i,
                cur, a, n, cl, hasModule;
            while (--i > -1) {
                if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
                    _classes[i] = cur.gsClass;
                    missing--;
                } else if (init) {
                    cur.sc.push(this);
                }
            }
            if (missing === 0 && func) {
                a = ns.split(".");
                n = a.pop();
                cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

                //exports to multiple environments
                if (global) {
                    _globals[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
                    hasModule = (typeof(module) !== "undefined" && module.exports);
                    if (!hasModule && typeof(define) === "function" && define.amd) { //AMD
                        define(ns.split(".").pop(), [], function () {
                            return cl;
                        });
                    } else if (hasModule) { //node
                        module.exports = cl;
                    }
                }
                for (i = 0; i < this.sc.length; i++) {
                    this.sc[i].check();
                }
            }
        };
        this.check(true);
    };

    var define = function (ns, dependencies, func, global) {
        return new Definition(ns, dependencies, func, global);
    };

    window.define = define;
})();
