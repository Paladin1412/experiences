// js 实现面向对象类的继承，构造函数可能动态添加的属性和方法以及父元型对象的属性和方法

function inherite (subclass, superclass) {
	"use strict";

	function o() { this.constructor = subclass; }
	o.prototype = superclass.prototype;
	return (subclass.prototype = new o());
}

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
