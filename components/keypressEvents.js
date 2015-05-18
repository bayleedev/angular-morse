angular.module('myApp')

.directive('keypressEvents', function ($document, $rootScope) {
  return {
    restrict: 'A',
    link: function () {
      $document.bind('keydown', function (e) {
        $rootScope.$broadcast('keypress', e);
      });
    }
  }
});
