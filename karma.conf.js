module.exports = function (config) {
  'use strict';

  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage', 'coveralls'],
    browsers: ['PhantomJS'],
    coverageReporter: {
      repoToken: 'khhm0L9sekEGN2r12dWspLyYT7D7cK2KA',
      type: 'lcov',
      dir: 'coverage/'
    },
    files: [
          'lib/*.js',
          'src/*.js',
          'test/*.js'
        ],
    preprocessors: {
      'src/*.js': ['coverage']
    }
  });
};
