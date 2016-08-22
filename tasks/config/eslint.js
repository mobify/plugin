module.exports = function(grunt) {
    var lintingTargets = [
        'src/**/*.js'
    ];

    return {
        src: lintingTargets,
        options: {
            reset: true,
            configFile: './.eslintrc.yml'
        }
    };
};
