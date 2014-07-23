(function (root, factory) {
  'use strict';

  // Export
  // ------

  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.Messenger = factory();
  }

})(this, function () {
  'use strict';

  // Publisher / Subscribe pattern
  // -----------------------------

  function Messenger() {
    var _topics = {};
    var _subUid = -1;

    this.publish = function (topic, args) {
      if (!_topics[topic]) {
        return false;
      }

      var subscribers = _topics[topic],
        len = subscribers ? subscribers.length : 0;

      while (len--) {
        subscribers[len].func.apply(this, args);
      }

      return this;
    };

    this.subscribe = function (topic, func) {
      if (!topic || typeof func !== 'function') {
        throw new Error('Missing a valid channel or callback');
      }

      if (!_topics[topic]) {
        _topics[topic] = [];
      }

      var token = (++_subUid).toString();
      _topics[topic].push({
        token: token,
        func: func
      });

      return token;
    };

    this.unsubscribe = function (token) {
      if (!token) {
        throw new Error('Can\'t unsubscribe without a valid token');
      }

      for (var m in _topics) {
        if (_topics[m]) {
          for (var i = 0, j = _topics[m].length; i < j; i++) {
            if (_topics[m][i].token === token) {
              _topics[m].splice(i, 1);
              return token;
            }
          }
        }
      }

      throw new Error('Can\'t unsubscribe from a token that doesn\'t exist');
    };
  }

  return Messenger;
});
