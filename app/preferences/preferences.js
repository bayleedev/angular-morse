'use strict';

angular.module('myApp.preferences', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preferences', {
    templateUrl: 'preferences/preferences.html',
    controller: 'PreferencesCtrl',
  });
}])

.controller('PreferencesCtrl', ['$scope', 'morseMap', 'difficulty', function($scope, $map, $difficulty) {
  $scope.preferences = $map.items();
  $scope.difficulty = $difficulty.value();
  $scope.$watch('difficulty', function(value) {
    $difficulty.value(value);
    $difficulty.save();
  });
  $scope.$watch('preferences', function() {
    $map.save();
  }, true);
}]);
