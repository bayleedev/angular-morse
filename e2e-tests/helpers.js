var self = {
  syncForEach: function(items, yield, complete) {
    var i = -1;
    var length = items.length;
    var next = function() {
      if (++i < length) { 
        yield(items[i], next);
      } else {
        complete();
      }
    };
    return next();
  },

  click: function(char) {
    if (char === '.') {
      return element(by.css('button.dot')).click();
    } else {
      return element(by.css('button.dash')).click();
    }
  },

  processInput: function processInput(value, done) {
    self.syncForEach(value.split(''), function(char, next) {
      self.click(char).then(next);
    }, done);
  }
};

module.exports = self;
