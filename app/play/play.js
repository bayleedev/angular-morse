'use strict';

angular.module('myApp.play', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/play', {
    templateUrl: 'play/play.html',
    controller: 'PlayCtrl'
  });
}])

.controller('PlayCtrl', ['$rootScope', 'morseMap', '$scope', function($rootScope, $map, $scope) {
  $scope.input = '';
  $scope.character = { letter: '', code: '' };
  $scope.points = 0;

  $scope.keys = {
    left: 37,
    right: 39,
    dash: 189,
    dot: 190
  };

  // Listen for keystrokes
  $rootScope.$on('keypress', function (evt, e) {
    $scope.safeApply(function() {
      var char = e.which;
      if (char === $scope.keys.left || char === $scope.keys.dot) {
        $scope.input += '.';
      } else if (char === $scope.keys.right || char === $scope.keys.dash) {
        $scope.input += '-';
      }
    });
  });

  // Determine if it matches, or is a failed attempt.
  $scope.$watch('input', function() {
    if ($scope.input === $scope.character.code) {
      $scope.win();
    } else if ($scope.character.code.indexOf($scope.input) !== 0) {
      $scope.lose();
    }
  });

  $scope.newGame = function() {
    var char = $scope.randomCharacter();
    $scope.input = '';
    $scope.character = {
      letter: char[0],
      code: char[1]
    };
  };

  $scope.randomCharacter = function() {
    var key = Math.floor(Math.random() * $map.length);
    console.log('char seed', key);
    return $map[key];
  };

  $scope.win = function() {
    console.log('Win!', $scope.character, $scope.input);
    $scope.points += 10;
    $scope.newGame();
  };

  $scope.lose = function() {
    console.log('Lose!', $scope.character, $scope.input);
    $scope.points -= 10;
    $scope.newGame();
  };

  // Listen for button pushes
  $scope.trigger = function(char) {
    var e = {};
    if (char === '.') {
      e.which = this.keys.dot;
    } else if (char === '-') {
      e.which = this.keys.dash;
    }
    $rootScope.$broadcast('keypress', e);
  };

  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  $scope.newGame();
}]);
