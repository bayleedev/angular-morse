'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.play',
  'myApp.preferences',
  'mgcrea.ngStrap.navbar',
  'LocalStorageModule',
]).

config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, $storage) {
  $storage.setPrefix('morseMap');
  $routeProvider.otherwise({redirectTo: '/play'});
}]);
