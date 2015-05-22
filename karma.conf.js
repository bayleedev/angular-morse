module.exports = function(config){
  config.set({

    basePath : './app',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/sinon/index.js',
      'preferences/*.js',
      'play/*.js',
    ],

    logLevel : config.LOG_DEBUG,

    autoWatch : true,

    singleRun : false,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
