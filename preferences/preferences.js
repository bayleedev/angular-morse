'use strict';

angular.module('myApp.preferences', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/preferences', {
    templateUrl: 'preferences/preferences.html',
    controller: 'PreferencesCtrl'
  });
}])

.controller('PreferencesCtrl', [function() {

}]);
