'use strict';

module.exports = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

module.exports =function() {
    return {
        /**
         * @function
         * @name pc.guid.create
         * @description Create an RFC4122 version 4 compliant GUID
         * @return {String} A new GUID
         */
        create: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, 
                    v = (c == 'x') ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
    };
}()

 /**
     * 获取一个全局唯一的id。如Stage1，Bitmap2等。
     * @param {String} prefix 生成id的前缀。
     * @returns {String} 全局唯一id。
     */
var getUid=function(prefix){
        var id = ++uid;
        if(prefix){
            var charCode = prefix.charCodeAt(prefix.length - 1);
            if (charCode >= 48 && charCode <= 57) prefix += "_"; //0至9之间添加下划线
            return prefix + id;
        }
        return id;
    }
