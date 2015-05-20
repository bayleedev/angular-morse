'use strict';

angular.module('myApp.preferences').

factory('morseMap', ['localStorageService', function($storage) {
  var data = $storage.get('morse') || [
    {char: 'A', enabled: true, code: '.-'},
    {char: 'B', enabled: true, code: '-...'},
    {char: 'C', enabled: true, code: '-.-.'},
    {char: 'D', enabled: true, code: '-..'},
    {char: 'E', enabled: true, code: '.'},
    {char: 'F', enabled: true, code: '..-.'},
    {char: 'G', enabled: true, code: '--.'},
    {char: 'H', enabled: true, code: '....'},
    {char: 'I', enabled: true, code: '..'},
    {char: 'J', enabled: true, code: '.---'},
    {char: 'K', enabled: true, code: '-.-'},
    {char: 'L', enabled: true, code: '.-..'},
    {char: 'M', enabled: true, code: '--'},
    {char: 'N', enabled: true, code: '-.'},
    {char: 'O', enabled: true, code: '---'},
    {char: 'P', enabled: true, code: '.--.'},
    {char: 'Q', enabled: true, code: '--.-'},
    {char: 'R', enabled: true, code: '.-.'},
    {char: 'S', enabled: true, code: '...'},
    {char: 'T', enabled: true, code: '-'},
    {char: 'U', enabled: true, code: '..-'},
    {char: 'V', enabled: true, code: '...-'},
    {char: 'W', enabled: true, code: '.--'},
    {char: 'X', enabled: true, code: '-..-'},
    {char: 'Y', enabled: true, code: '-.--'},
    {char: 'Z', enabled: true, code: '--..'},
    {char: '1', enabled: true, code: '.----'},
    {char: '2', enabled: true, code: '..---'},
    {char: '3', enabled: true, code: '...--'},
    {char: '4', enabled: true, code: '....-'},
    {char: '5', enabled: true, code: '.....'},
    {char: '6', enabled: true, code: '-....'},
    {char: '7', enabled: true, code: '--...'},
    {char: '8', enabled: true, code: '---..'},
    {char: '9', enabled: true, code: '----.'},
    {char: '0', enabled: true, code: '-----'}
  ];
  return {
    items: function() {
      return data;
    },
    enabledItems: function() {
      var items = [];
      data.forEach(function(el, index) {
        if (el.enabled) items.push(el);
      });
      return items;
    },
    save: function() {
      $storage.set('morse', data);
    }
  };
}]);
