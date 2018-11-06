window.Remote = require('electron').remote;
window.fs = require('fs');
window.fetch = require('node-fetch');
var _setImmediate = setImmediate;
process.once('loaded', function() {
  global.setImmediate = _setImmediate;
});
