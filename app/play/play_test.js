'use strict';

function repeat(times, func) {
  var results = {},
    result, i;
  for (i = 0;i<times;i++) {
    result = func();
    results[result] = (results[result] || 0) + 1;
  }
  return results;
};

describe('myApp.play module', function() {

  beforeEach(module('myApp.play'));

  beforeEach(inject(function(_$rootScope_, $controller) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $difficulty = {
      value: sinon.stub().returns('easy'),
    };
    $map = {
      enabledItems: function() {
        return [{char: 'L', enabled: true, code: '.-..'}];
      },
    };
    controller = $controller('PlayCtrl', {
      $scope: $scope,
      morseMap: $map,
      difficulty: $difficulty,
    });
  }));

  describe('PlayCtrl', function() {

    it('should exist', function() {
      expect(controller).toBeDefined();
    });

    describe('input', function() {
      ['right', 'dash'].forEach(function(val) {
        describe('given I hit ' + val, function() {
          beforeEach(function() {
            $rootScope.$broadcast('keypress', {
              which: $scope.keys[val]
            });
          });

          it('should append a dash to the input', function() {
            expect($scope.input.slice(-1)).toBe('-');
          });
        });
      });

      ['left', 'dot'].forEach(function(val) {
        describe('given I hit ' + val, function() {
          beforeEach(function() {
            $rootScope.$broadcast('keypress', {
              which: $scope.keys[val]
            });
          });

          it('should append a dot to the input', function() {
            expect($scope.input.slice(-1)).toBe('.');
          });
        });
      });
    });

    describe('hideHint', function() {
      beforeEach(function() {
        $scope.newGame();
        $scope.state = 'play';
      });

      describe('given an easy difficulty', function() {
        beforeEach(function() {
          $difficulty.value.returns('easy');
          $scope.difficulty = 'easy';
          $scope.state = 'play';
          $scope.$digest();
        });

        it('always shows the hint', function() {
          expect($scope.hideHint).toBe(false);
        });
      });

      describe('given I just lost', function() {
        beforeEach(function() {
          $difficulty.value.returns('hard');
          $scope.difficulty = 'hard';
          $scope.state = 'loss';
          $scope.$digest();
        });

        it('always shows the hint', function() {
          expect($scope.hideHint).toBe(false);
        });
      });

      describe('given a medium difficulty', function() {
        var results;

        beforeEach(function() {
          $difficulty.value.returns('medium');
          $scope.difficulty = 'medium';
          results = repeat(1000, function() {
            $scope.state = Math.random();
            $scope.$digest();
            return $scope.hideHint;
          });
        });

        it('doesnt always hide the hint', function() {
          expect(results[true]).toNotBe(1000);
        });

        it('doesnt always show the hint', function() {
          expect(results[false]).toNotBe(1000);
        });
      });

      describe('given a hard difficulty', function() {
        beforeEach(function() {
          $difficulty.value.returns('hard');
          $scope.difficulty = 'hard';
          $scope.state = 'play';
          $scope.$digest();
        });

        it('always hides the hint', function() {
          expect($scope.hideHint).toBe(true);
        });
      });
    });

  });

  var controller,
    $scope,
    $map,
    $difficulty,
    $rootScope;
});
