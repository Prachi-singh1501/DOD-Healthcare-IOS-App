cordova.define("com.bandpad.cordova.microphone.microphone", function(require, exports, module) {
var
  exec = require('cordova/exec');

module.exports = function (next) {
  exec(function (granted) {
    next(granted);
  }, null, 'Microphone', 'microphone');
};

});
