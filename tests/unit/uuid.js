define([
    '$',
    'plugin'
], function($, Plugin) {
    describe('uuid function', function() {
        describe('functions as expected', function() {
            it('creates a uuid function bound to $', function() {
                assert.isDefined($.uuid);
            });

            it('creates uuid as a function', function() {
                assert.isFunction($.uuid);
            });
        });
    });
});