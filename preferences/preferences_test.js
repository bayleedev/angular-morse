'use strict';

describe('myApp.preferences module', function() {

  beforeEach(module('myApp.preferences'));

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $difficulty = {
      value: sinon.spy(),
      save: sinon.spy(),
    };
    $map = {
      items: function() {
        return [{name: 'Jim', enabled: true}];
      },
      save: sinon.spy(),
    };
    controller = $controller('PreferencesCtrl', {
      $scope: $scope,
      morseMap: $map,
      difficulty: $difficulty,
    });
  }));

  describe('PreferenceCtrl', function() {
    it('should exist', function() {
      expect(controller).toBeDefined();
    });

    describe('When I change the difficulty', function() {
      beforeEach(function() {
        $scope.difficulty = 'hard';
        $scope.$apply();
      });

      it('calls value with new difficulty', function() {
        expect($difficulty.value.calledWith('hard')).toBeTruthy();
      });

      it('calls save', function() {
        expect($difficulty.save.calledOnce).toBeTruthy();
      });
    });

    describe('When I change the preferences', function() {
      beforeEach(function() {
        $scope.preferences[0].enabled = false;
        $scope.$apply();
      });

      it('calls save', function() {
        expect($map.save.calledOnce).toBeTruthy();
      });
    });
  });

  var controller,
    $scope,
    $map,
    $difficulty;
});
