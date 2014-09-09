(function (factory) {
    if (typeof define === 'function' && define.amd) {
        /*
         In AMD environments, you will need to define an alias
         to your selector engine. i.e. either zepto or jQuery.
         */
        define([
            '$'
        ], factory);
    } else {
        /*
         Browser globals
         */
        var framework = window.Zepto || window.jQuery;
        factory(framework);
    }
}(function($) {
    function Plugin(element, options, defaultOptions) {
        this.options = $.extend(true, {}, defaultOptions, options);
        this._init(element);
    }

    Plugin.prototype._trigger = function(eventName, data) {
        eventName in this.options && this.options[eventName].call(this, $.Event(this.name + ':' + eventName, { bubbles: false }), data);
    };

    $.extend(true, $, {
        plugin: function(name, SubConstructor, prototype) {
            SubConstructor._super = Plugin;
            SubConstructor.prototype = $.extend(true, Plugin.prototype, prototype);
            SubConstructor.prototype.constructor = SubConstructor;
            SubConstructor.prototype.name = name;

            $.fn[name] = function(option) {
                var args = Array.prototype.slice.call(arguments);

                return this.each(function() {
                    var $this = $(this);
                    var plugin = $this.data(name);
                    var isMethodCall = typeof option === 'string';

                    // If plugin isn't initialized, we lazy-load initialize it. If it's
                    // already initialized, we can safely ignore the call.
                    if (!plugin) {
                        if (isMethodCall) {
                            throw 'cannot call methods on "' + name + '" prior to initialization; attempted to call method "' + option + '"';
                        }
                        $this.data(name, (plugin = new SubConstructor(this, option)));
                    }

                    // invoke a public method on plugin, and skip private methods
                    if (isMethodCall) {
                        if (option.charAt(0) === '_' || typeof plugin[option] !== 'function') {
                            throw 'no such method "' + option + '" for "' + name + '"';
                        }

                        plugin[option].apply(plugin, args.length > 1 ? args.slice(1) : null);
                    }
                });
            };

            $.fn[name].Constructor = SubConstructor;
        },
        noop: function() {}
    });

    return $;
}));
