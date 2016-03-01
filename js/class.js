// js 实现面向对象类的继承，构造函数可能动态添加的属性和方法以及父元型对象的属性和方法
// [1]
function inherite (Self, Super) {
	"use strict";

	function o() { this.constructor = Self; }
	o.prototype = Super.prototype;
	
	return (Self.prototype = new o());
}
// [2]
function inherits(Self, Super) {
    var Temp = function () {
    };
    var Func = function () {
        Super.apply(this, arguments);
        Self.apply(this, arguments);
    };
    Func._super = Super.prototype;
    Temp.prototype = Super.prototype;
    Func.prototype = new Temp();

    return Func;
}
/**
 * @private
 * @deprecated
 * Implementaton of inheritance for Javascript objects
 * e.g. Class can access all of Base's function prototypes
 * <pre lang="javascript"><code>
 * Base = function () {}
 * Class = function () {}
 * Class = Class.extendsFrom(Base)
 * </code></pre>
 * @param {Object} Super
 */
Function.prototype.extendsFrom = function (Super) {
    return inherits(this,Super);
};



// 方法提升 实现类型面向对象，多态概念，方法的重载
function promote(subclass, prefix) {
    "use strict";

    var subP = subclass.prototype
        , supP = (Object.getPrototypeOf && Object.getPrototypeOf(subP)) || subP.__proto__;
        
    if (supP) {
    	// constructor is not always innumerable
        subP[(prefix += "_") + "constructor"] = supP.constructor; 
        for (var n in supP) {
            if (subP.hasOwnProperty(n) && (typeof supP[n] == "function")) {
                subP[prefix + n] = supP[n];
            }
        }
    }
    return subclass;
}
