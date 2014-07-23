'use strict';

var chai = require('chai').should()
  , Messenger = require('../lib/messenger.js').Messenger
  , channels;

describe('Messenger library', function () {

  beforeEach(function () {
    channels = new Messenger();
  });

  describe('instance', function () {
    it('should create an object with pub/sub standard methods', function () {
      channels.should.be.a('object');
      channels.publish.should.be.a('function');
      channels.subscribe.should.be.a('function');
      channels.unsubscribe.should.be.a('function');
    });
  });

  describe('channel subscribing', function () {
    it('should fail for a missing channel', function () {
      channels.subscribe.should.throw(Error);
    });

    it('should fail for a missing callback', function () {
      channels.subscribe.bind(channels, '/workers').should.throw(Error);
    });

    it('should fail if the callback is not a function', function () {
      channels.subscribe.bind(channels, '/workers', {}).should.throw(Error);
    });

    it('should return a token when used', function () {
      var fn = function () {
        return 'It\'s working!'
      };

      var token = channels.subscribe('/workers', fn);
      token.should.equal('0');
    });

    it('should return many tokens when used many times', function () {
      var fn = function () {
        return 'It\'s working!'
      };

      var token = channels.subscribe('/workers', fn);
      token.should.equal('0');

      token = channels.subscribe('/workers', fn);
      token.should.equal('1');
    });
  });

  describe('channel publishing', function () {
    it('shouldn\'t fail if there aren\'t any subscribers', function () {
      channels.publish('/workers');
    });

    it('should publish and call all related callbacks', function (done) {
      var fn = function () {
        done();
      };

      channels.subscribe('/workers', fn);
      channels.publish('/workers');
    });

    it('should publish and call related callbacks with arguments', function (done) {
      var fn = function (first, second) {
        first.should.below(second);
        done();
      };

      channels.subscribe('/workers', fn);
      channels.publish('/workers', [1, 42]);
    });
  });

  describe('channel unsubscribing', function () {
    it('should fail for a missing token argument', function () {
      channels.unsubscribe.should.throw(Error);
    });

    it('should fail if token is not valid', function () {
      channels.unsubscribe.bind(channels, '0').should.throw(Error);
    });

    it('should unsubscribe from this channel with a valid token', function () {
      var fn = function () {
        return 'Unused callback'
      };

      var token = channels.subscribe('/workers', fn);
      var result = channels.unsubscribe(token);
      result.should.equal(token);
    });
  });
});
