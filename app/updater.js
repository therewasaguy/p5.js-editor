var $ = require('jquery');
// var manifest = nodeRequire('./package.json');
// var semver = nodeRequire('semver');
var packageURL = 'https://raw.githubusercontent.com/processing/p5.js-editor/master/package.json?v='  + new Date().getTime();
var downloadURL = 'https://github.com/processing/p5.js-editor/releases/download/';

/**
 *  Updates to latest version of p5.js
 */
module.exports.check = function() {
  // TO DO

  // if (nodeGlobal.checkedUpdate === true) return false;
  // nodeGlobal.checkedUpdate = true;
  // $.ajax({url: packageURL, success: update, cache: false, dataType: 'json'});
  // function update(data) {
  //   if (semver.gt(data.version, manifest.version)) {
  //     var shouldDownload = confirm('A newer version of P5 is available. Do you want to download it?');
  //     if (shouldDownload) {
  //       gui.Shell.openExternal(downloadURL + 'v' + data.version + '/p5.zip');
  //     }
  //   }
  // }
};
