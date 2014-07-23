'use strict';

var assert = require('assert');
var lib = require('../lib/messenger.js');

describe('Basic library test', function () {
  it('should answer all questions with YO!', function () {
    var answer = lib.Messenger('Should I tickle this unicorn?');
    assert.equal(answer, 'YO!');
  });
});
