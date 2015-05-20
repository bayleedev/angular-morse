'use strict';

angular.module('myApp.preferences')

.factory('difficulty', function() {
  var difficulty = null;
  var self = {
    difficulties: ['easy', 'medium', 'hard'],
    initialize: function() {
      self.value(self.difficulties[0]);
    },
    value: function(value) {
      if (self.difficulties.indexOf(value) !== -1) difficulty = value;
      return difficulty;
    }
  };
  window.foo = self;

  self.initialize();

  return self;
});
