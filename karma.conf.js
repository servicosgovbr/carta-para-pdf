module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
      'lib/jquery-1.11.3.min.js',
      'src/*.js',
      'test/*.js'
    ]
  });
};
