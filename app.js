'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.play',
  'myApp.preferences',
  'myApp.preferences',
  'mgcrea.ngStrap.navbar',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/play'});
}]);
