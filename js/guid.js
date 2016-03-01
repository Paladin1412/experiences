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
