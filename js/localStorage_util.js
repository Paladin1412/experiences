    var ls = {
        isSurportLS: (function () {
            return window.localStorage != null;
        })()
        // 获取网站下所有的localstorage缓存名称,fresh代表重新构造一下
        , getAllKeys: function (fresh) {
            var keys = ls._keys;
            if (keys == null || fresh) {
                keys = [];
                for (var i = 0; i < window.localStorage.length; i++) {
                    keys.push(window.localStorage.key(i))
                }
                ls._keys = keys;
            }
            return keys;
        }

        // 获取缓存值，包装ls api
        , getItem: function (key) {
            return window.localStorage.getItem(key);
        }
        // 添加缓存项，包装ls api
        , setItem: function (key, v) {
            console.log("addItem " + key);
            return window.localStorage.setItem(key, v);
        }
        // 删除缓存值，包装ls api
        , removeItem: function (key) {
            console.log("remove " + key);
            window.localStorage.removeItem(key);
        }

        , toKeyObj: function (keystr) {
            var reg = /([^#]+)#([^#]+)#([^#]+)#([^#]+)#$/;
            if (keystr.indexOf("#") >= 0) {
                if (keystr[keystr.length - 1] != "#") {
                    keystr = keystr + "#";
                }
                var km = keystr.match(reg);
                if (km && km.length > 1) {
                    return {
                        prefix: km[1]
                        , name: km[2]
                        , cur: +km[3]
                        , expire: +km[4]
                    }
                }
            }

            return null;
        }
        , toKeyStr: function (keyobj) {
            var keyname = keyobj.prefix + "#" + keyobj.name;
            var keytime = keyobj.cur + "#" + keyobj.expire;
            return keyname + "#" + keytime + "#";
        }

        /**
         * 删除过期的本地缓存
         * @param prefix 名字前缀
         */
        , removeExpiredData: function (prefix) {
            var keys = ls.getAllKeys();
            for (var i = 0; i < keys.length; i++) {
                var keyobj = ls.toKeyObj(keys[i]);
                if (keyobj) {
                    if (prefix && prefix != keyobj.prefix) {
                        continue
                    }
                    if (ls.checkIsExpired(keyobj)) {
                        ls.removeItem(keys[i]);
                    }
                }
            }
        }
        /**
         *
         * @param namekey 缓存名称（不包含时间戳，时间部分）
         * @param isobj 是否json对象，如果是会自动进行转换
         * @returns {*}
         */
        , getNameVal: function (namekey, isobj) {
            if (typeof namekey === "object") {
                namekey = namekey.prefix + "#" + namekey.name;
            }
            var keys = ls.getAllKeys();
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].indexOf(namekey) == 0) {
                    if (ls.checkIsExpired(keys[i])) {
                        return null;
                    }
                    else {
                        var v = ls.getItem(keys[i]);
                        if (isobj && v && typeof v === "string") {
                            v = JSON.parse(v);
                        }
                        return v;
                    }
                }
            }
            return null;
        }
        /**
         * 检测某一个缓存项是否过期
         * @param keyobj 全部值
         * @returns {boolean}
         */
        , checkIsExpired: function (keyobj) {
            if (typeof(keyobj) !== "object") {
                keyobj = ls.toKeyObj(keyobj);
            }
            var cur = Math.floor(new Date().getTime() / ls.oneminute);//当前多少分钟
            if (keyobj.expire + keyobj.cur < cur) {
                return true;
            }
            return false;
        }
        /**
         * 添加一个缓存项，会自动清理同名的缓存项
         * @param keyobj key对象，包含前缀（命名空间），名称，时间戳（分），时间超时(单位分）
         * @param v 值
         */
        , addItem: function (keyobj, v) {
            // #为特殊字符
            if (v == null) {
                return;
            }
            if (typeof(v) === "object") {
                v = JSON.stringify(v);
            }
            keyobj = keyobj || {};
            keyobj.expire = keyobj.expire || 10;
            keyobj.prefix = keyobj.prefix || "";
            keyobj.name = keyobj.name || "";
            keyobj.cur = Math.floor(new Date().getTime() / ls.oneminute);
            // 先删除!
            ls.removePre(keyobj.prefix + "#" + keyobj.name);
            ls.setItem(ls.toKeyStr(keyobj), v);
        }
        , oneminute: 1000 * 60
        /**
         * 删除缓存key以pre#开头的缓存项
         * @param Pre
         */
        , removePre: function (Pre) {
            var keys = ls.getAllKeys();
            var reg = Pre && new RegExp("^" + Pre + "#", "i");
            for (var i = 0; i < keys.length; i++) {
                if (reg == null || reg.test(keys[i])) {
                    ls.removeItem(keys[i]);
                }
            }
        }
    };
