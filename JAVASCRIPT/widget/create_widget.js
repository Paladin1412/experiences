function create_widget(name, Component, pluginOption) {
    var old = $.fn[name];
    pluginOption = pluginOption || {};

    $.fn[name] = function (option) {
        var allArgs = Array.prototype.slice.call(arguments, 0);
        var args = allArgs.slice(1);
        var propReturn;
        var $set = this.each(function () {
            var $this = $(this);
            var dataName = 'hi.' + name;
            var instance = $this.data(dataName);
            var options = $.extend({},typeof option === 'object' && option);

            if (!instance && option === 'destroy') {
                return;
            }

            if (!instance) {
                $this.data(dataName, (instance = new Component(this, options)));
            }

            // custom method call
            if (pluginOption.methodCall) {
                pluginOption.methodCall.call($this, allArgs, instance);
            } else {
                // before method call
                pluginOption.before &&
                pluginOption.before.call($this, allArgs, instance);

                if (typeof option === 'string') {
                    propReturn = typeof instance[option] === 'function' ?
                        instance[option].apply(instance, args) : instance[option];
                }

                // after method call
                pluginOption.after && pluginOption.after.call($this, allArgs, instance);
            }
        });

        return (propReturn === undefined) ? $set : propReturn;
    };

    $.fn[name].Constructor = Component;

    // no conflict
    $.fn[name].noConflict = function () {
        $.fn[name] = old;
        return this;
    };
};
