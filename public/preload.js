window.Remote = require('electron').remote;
window.fs = require('fs');
window.fetch = require('node-fetch');
window.config = require('electron-json-config');
var _setImmediate = setImmediate;
process.once('loaded', function() {
  global.setImmediate = _setImmediate;
});
