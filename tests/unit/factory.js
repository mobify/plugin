define([
    '$',
    'plugin'
], function($) {

    describe('Plugin factory', function() {
        beforeEach(function() {

        });

        describe('Plugin extension', function() {

            it('creates plugin Zepto extension', function() {
                assert.isDefined($.plugin);
            });

            it('creates plugin Zepto extension as a function', function() {
                assert.isFunction($.plugin);
            });
        });

        describe('Plugin creation', function() {
            it('extends sub-object prototype with the name property', function() {
                function SubPlugin(element, options) {
                    SubPlugin._super.call(this, element, options);
                }

                $.plugin('subplugin', SubPlugin, {
                    _init: function() {

                    }
                });

                assert.isDefined(SubPlugin.prototype.name);
                assert.equal(SubPlugin.prototype.name, 'subplugin');
            });

            it('extends sub-object prototype', function() {
                function SubPlugin(element, options) {
                    SubPlugin._super.call(this, element, options);
                }

                $.plugin('subplugin', SubPlugin, {
                    _init: function() {

                    },
                    foo: function() {

                    },
                    bar: function() {

                    }
                });

                assert.isDefined(SubPlugin.prototype._init);
                assert.isDefined(SubPlugin.prototype.foo);
                assert.isDefined(SubPlugin.prototype.bar);
            });

            it('extends $.fn with the plugin function', function() {
                function SubPlugin(element, options) {
                    SubPlugin._super.call(this, element, options);
                }

                $.plugin('subplugin', SubPlugin, {
                    _init: function() {

                    }
                });

                assert.isDefined($.fn.subplugin);
            });

            it('invokes the _init function when creating the plugin', function(done) {
                function SubPlugin(element, options) {
                    SubPlugin._super.call(this, element, options);
                }

                $.plugin('subplugin', SubPlugin, {
                    _init: function() {
                        done();
                    }
                });

                $('<div />').subplugin();
            })
        });
    });
});