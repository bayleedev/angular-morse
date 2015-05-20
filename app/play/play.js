'use strict';

angular.module('myApp.play', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/play', {
    templateUrl: 'play/play.html',
    controller: 'PlayCtrl',
  });
}])

.controller('PlayCtrl', [
    '$rootScope', 'morseMap', '$scope', '$timeout', 'difficulty',
    function($rootScope, $map, $scope, $timeout, $difficulty) {
      $scope.input = '';
      $scope.character = { letter: '', code: '' };
      $scope.points = 0;
      $scope.locked = true;
      $scope.title = 'Play';
      $scope.state = 'loading';

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

      $scope.hideHint = function() {
        if ($scope.state === 'loss') return false;
        if ($scope.difficulty === 'easy') return false;
        if ($scope.difficulty === 'hard') return true;
        return Math.round(Math.random() * 1000) % 2 === 0;
      };

      $scope.newGame = function() {
        var item = $scope.randomCharacter();
        $scope.difficulty = $difficulty.value();
        $scope.locked = false;
        $scope.input = '';
        $scope.setTitle();
        $scope.state = 'play';
        $scope.character = {
          letter: item.char,
          code: item.code
        };
      };

      $scope.randomCharacter = function() {
        var items = $map.enabledItems();
        var key = Math.floor(Math.random() * items.length);
        console.log('char seed', key);
        return items[key];
      };

      $scope.win = function() {
        if ($scope.locked) return;
        $scope.points += 10;
        $scope.locked = true;
        $scope.state = 'won';
        $scope.setTitle();
        $timeout($scope.newGame, 2000);
      };

      $scope.setTitle = function() {
        if ($scope.state == 'won') {
          $scope.title = 'Playing - You got it!';
        } else if ($scope.state == 'loss') {
          $scope.title = 'Playing - You suck bro!';
        } else {
          $scope.title = 'Playing';
        }
      };

      $scope.lose = function() {
        if ($scope.locked) return;
        $scope.points -= 10;
        $scope.locked = true;
        $scope.state = 'loss';
        $scope.setTitle();
        $timeout($scope.newGame, 2000);
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
    }
]);
