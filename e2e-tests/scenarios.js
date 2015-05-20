'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /play when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/play");
  });


  describe('play', function() {

    beforeEach(function() {
      browser.get('index.html#/play');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] h3')).first().getText()).
        toMatch(/playing/i);
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
