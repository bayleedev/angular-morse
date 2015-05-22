# Morse Code Flash Cards

[![Build Status](https://travis-ci.org/blainesch/angular-morse.svg?branch=master)](https://travis-ci.org/blainesch/angular-morse)

This will help you memorize morse code. First you'll always see the answer, but
as you get better you'll see the answer less likely.

![screenshot](/screenshots/original.png)

## Tests

To run the unit tests run:
~~~
npm test
# or
npm run test-single-run
~~~

To run the end to end tests:
~~~
# start the server
npm start

# start the webdriver
npm run update-webdriver
node_modules/.bin/webdriver-manager start

# Run the tests
npm run protractor
~~~
