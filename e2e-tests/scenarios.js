'use strict';

var helpers = require('./helpers');

describe('my app', function() {
  browser.get('index.html');

  it('should automatically redirect to /play when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/play");
  });


  describe('play', function() {
    var body,
      answer,
      points;

    beforeEach(function() {
      browser.get('index.html#/play');
      body = $('body');
      answer = $('.answer');
      points = $('.points');
    });

    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] h3')).first().getText()).
        toMatch(/playing/i);
    });

    describe('getting the correct combination', function() {
      beforeEach(function(done) {
        answer.getText().then(function(value) {
          helpers.processInput(value, done);
        });
      });

      it('giveth points', function() {
        expect(points.getText()).toBe('10 Points');
      });
    });

    describe('getting the incorrect combination', function() {
      beforeEach(function(done) {
        answer.getText().then(function(value) {
          if (value.slice(0, 1) === '.') {
            helpers.processInput('-', setTimeout.bind(this, done, 5000));
          } else {
            helpers.processInput('.', setTimeout.bind(this, done, 5000));
          }
        });
      });

      it('taketh away points', function() {
        expect(points.getText()).toBe('-10 Points');
      });
    });
  });


  describe('preferences', function() {
    beforeEach(function() {
      browser.get('index.html#/preferences');
    });

    it('should have the difficulty sections', function() {
      expect(element.all(by.css('[ng-view] h3')).first().getText()).
        toMatch(/difficulty/i);
    });

    it('should have the characters sections', function() {
      expect(element.all(by.css('[ng-view] h3')).last().getText()).
        toMatch(/characters/i);
    });
  });
});
