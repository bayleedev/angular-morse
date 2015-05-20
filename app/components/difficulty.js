'use strict';

angular.module('myApp.preferences').

factory('difficulty', ['localStorageService', function($storage) {
  var difficulty = null;
  var self = {
    difficulties: ['easy', 'medium', 'hard'],
    initialize: function() {
      self.value($storage.get('difficulty') || self.difficulties[0]);
    },
    value: function(value) {
      if (self.difficulties.indexOf(value) !== -1) difficulty = value;
      return difficulty;
    },
    save: function() {
      $storage.set('difficulty', difficulty);
    }
  };

  self.initialize();

  return self;
}]);
