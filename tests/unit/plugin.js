define([
    '$',
    'plugin'
], function($, Plugin) {
    var $element;
    var createPlugin = function() {
        SubPlugin.DEFAULTS = {};

        function SubPlugin(element, options) {
            SubPlugin.__super__.call(this, element, options, SubPlugin.DEFAULTS);
        }

        Plugin.create('subplugin', SubPlugin, {
            _init: function(element) {
                this.element = $(element);
            },
            destroy: function() {
                this.element.removeData(this.name);
            },
            someMethod: function() {
                this._trigger('customEvent');
            },
            stringMethod: function() {
                return 'string value';
            },
            boolMethod: function() {
                return true;
            },
            numMethod: function() {
                return 42;
            },
            hello: function(name) {
                return 'Hello, ' + name;
            },
            add: function(num1, num2) {
                return num1 + num2;
            },
            someProperty: true
        });
    };

    describe('Plugin interface', function() {
        beforeEach(function() {
            $element = $('<div class="subplugin" />');

            createPlugin();
        });

        describe('invoking methods before plugin is initialized', function() {
            it('throws when not initialized', function() {
                assert.throws(function() {
                    $element.subplugin('someMethod');
                }, Error);
            });
        });

        describe('invoking methods using the plugin interface', function() {
            it('calls customEvent using the someMethod method', function(done) {
                $element.subplugin({
                    customEvent: function(e, ui) {
                        $element.subplugin('destroy');
                        done();
                    }
                });

                $element.subplugin('someMethod');
            });

            it('returns string when calling a method that returns a string', function() {
                $element.subplugin();

                var returnValue = $element.subplugin('stringMethod');

                assert.isString(returnValue);
                assert.equal(returnValue, 'string value');

                $element.subplugin('destroy');
            });

            it('returns bool when calling a method that returns a bool', function() {
                $element.subplugin();

                var returnValue = $element.subplugin('boolMethod');

                assert.isBoolean(returnValue);
                assert.isTrue(returnValue);

                $element.subplugin('destroy');
            });

            it('returns number when calling a method that returns a number', function() {
                $element.subplugin();

                var returnValue = $element.subplugin('numMethod');

                assert.isNumber(returnValue);
                assert.equal(returnValue, 42);

                $element.subplugin('destroy');
            });

            it('return correct value when a method is invoked that takes a parameter', function() {
                $element.subplugin();

                var returnValue = $element.subplugin('hello', 'Bob');

                assert.isString(returnValue);
                assert.equal(returnValue, 'Hello, Bob');

                $element.subplugin('destroy');
            });

            it('return correct value when a method is invoked that takes multiple parameters', function() {
                $element.subplugin();

                var returnValue = $element.subplugin('add', 11, 31);

                assert.isNumber(returnValue);
                assert.equal(returnValue, 42);

                $element.subplugin('destroy');
            });
        });

        describe('invoking invalid methods using the plugin interface', function() {
            it('throws for method calls that don\'t exist', function() {
                assert.throws(function() {
                    $element.subplugin().subplugin('noMethod');
                }, Error);
            });

            it('throws when attempting to invoke private methods', function() {
                assert.throws(function() {
                    $element.subplugin().subplugin('_init');
                }, Error);
            });

            it('throws when attempting to invoke methods that aren\'t functions', function() {
                assert.throws(function() {
                    $element.subplugin().subplugin('someProperty');
                }, Error);
            });
        });
    });
});