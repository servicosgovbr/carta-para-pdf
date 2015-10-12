module.exports = function(config) {
    'use strict';

    config.set({
        frameworks: ['jasmine'],
        reporters: ['spec', 'coverage'],
        browsers: ['PhantomJS'],
        files: [
          'lib/jquery-1.11.3.min.js',
          'src/*.js',
          'test/*.js'
        ],
        preprocessors: {
            'src/*.js': ['coverage']
        }
    });
};
