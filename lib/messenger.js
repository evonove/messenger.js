(function (root, factory) {
  'use strict';

  /*** AMD or globals export ***/

  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.Messenger = factory();
  }

})(this, function () {
  'use strict';

  /*** Library core ***/

  function Messenger(complicated_question) {
    return (complicated_question === 'The life, universe and everything?') ? 'YO!' : 'YO!';
  }

  return Messenger;
});
