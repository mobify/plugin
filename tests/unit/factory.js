define([
    '$',
    'plugin'
], function($, Plugin) {
    var element;

    describe('Plugin factory', function() {
        beforeEach(function() {
            element = $('<div class="subplugin" />');
        });

        describe('Plugin create', function() {

            it('creates create function', function() {
                assert.isDefined(Plugin.create);
            });

            it('creates Plugin.create as a function', function() {
                assert.isFunction(Plugin.create);
            });
        });

        describe('Plugin creation', function() {
            it('extends sub-object prototype with the name property', function() {
                function SubPlugin(element, options) {
                    SubPlugin.__super__.call(this, element, options);
                }

                Plugin.create('subplugin', SubPlugin, {
                    _init: function() {

                    }
                });

                assert.isDefined(SubPlugin.prototype.name);
                assert.equal(SubPlugin.prototype.name, 'subplugin');
            });

            it('extends sub-object prototype', function() {
                function SubPlugin(element, options) {
                    SubPlugin.__super__.call(this, element, options);
                }

                Plugin.create('subplugin', SubPlugin, {
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
                    SubPlugin.__super__.call(this, element, options);
                }

                Plugin.create('subplugin', SubPlugin, {
                    _init: function() {

                    }
                });

                assert.isDefined($.fn.subplugin);
            });

            it('invokes the _init function when creating the plugin', function(done) {
                function SubPlugin(element, options) {
                    SubPlugin.__super__.call(this, element, options);
                }

                Plugin.create('subplugin', SubPlugin, {
                    _init: function() {
                        done();
                    }
                });

                element.subplugin();
            })
        });
    });
});