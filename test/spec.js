'use strict';

var chai = require('chai').should()
  , Messenger = require('../lib/messenger.js').Messenger;

describe('Messenger library', function () {
  describe('instance', function () {
    it('should create an object with pub/sub standard methods');
  });

  describe('channel subscribing', function () {
    it('should fail for a missing channel');
    it('should fail for a missing callback');
    it('should return a token when used');
  });

  describe('channel publishing', function () {
    it('shouldn\'t fail if there aren\'t any subscribers');
    it('shouldn\'t fail if the channel doesn\'t exist');
    it('should publish and call all related callbacks');
    it('should publish and call related callbacks with arguments');
  });

  describe('channel unsubscribing', function () {
    it('should fail for a missing token argument');
    it('should fail if token is not valid');
    it('should unsubscribe from this channel with a valid token');
  });
});
