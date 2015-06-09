var Files = require('../../files');


module.exports = {

  newProject: function() {
    // TO DO
  },


  launchExample: function(examplePath) {
    //copy the empty project folder to a temporary directory
  },

  exportProject: function() {
    console.log('hello');
  },

  saveAs: function(path) {
    // TO DO
  },

  run: function() {
    // TO DO
    //save all files
    // var self = this;
    // this.saveAll();

    // if (this.outputWindow) {
    //   if (this.settings.runInBrowser) {
    //     gui.Shell.openExternal(url);
    //   } else {
    //     this.outputWindow.reloadIgnoringCache();
    //   }
    // } else {
    //   // gui.App.clearCache();
    //   startServer(this.projectPath, this, function(url) {
    //     if (self.settings.runInBrowser) {
    //       gui.Shell.openExternal(url);
    //     } else {
    //       self.outputWindow = self.newWindow(url, {toolbar: true, 'inject-js-start': 'js/debug-console.js'});
    //       self.outputWindow.on('document-start', function(){
    //         self.outputWindow.show();
    //       });
    //       self.outputWindow.on("close", function(){
    //         self.running = false;
    //         self.outputWindow = null;
    //         this.close(true);
    //       });
    //       self.outputWindow.on('focus', function(){
    //         self.resetMenu();
    //       });
    //     }
    //     self.running = true;
    //   });
    // }
  },

  stop: function() {
    if (this.outputWindow) {
      this.outputWindow.close();
    }
  },

  update: function(callback) {
    var pathPrefix = 'mode_assets/p5/empty_project/libraries/';
    var urlPrefex = 'https://raw.githubusercontent.com/processing/p5.js/master/lib/';

    var files = [
      { local: pathPrefix + 'p5.js', remote: urlPrefex + 'p5.js' },
      { local: pathPrefix + 'p5.sound.js', remote: urlPrefex + 'addons/p5.sound.js' },
      { local: pathPrefix + 'p5.dom.js', remote: urlPrefex + 'addons/p5.dom.js' }
    ];

    var checked = 0;

    files.forEach(function(file) {
        // TO DO
        console.log('got a file');
        checked ++;
        if (checked == files.length && typeof callback !== 'undefined') {
          callback();
        }
      });
  },

  referenceURL: 'http://p5js.org/reference/'

};

var running = false;
var url = '';

function startServer(path, app, callback) {
  // Not needed
}

function download(url, local, cb) {
  // TO DO
}

function getLine(filename, lineNo, callback) {
  // TO DO

  // fs.readFile(filename, function (err, data) {
  //   if (err) throw err;

  //   var lines = data.toString('utf-8').split("\n");
  //   callback(lines[lineNo]);
  // });
}
