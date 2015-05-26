module.exports = {

  newProject: function() {
    // TO DO
  },

  exportProject: function() {
    console.log('hello');
  },

  saveAs: function(path) {
    // TO DO
  },

  run: function() {
    // TO DO
  },

  stop: function() {
    if (this.outputWindow) {
      this.outputWindow.close();
    }
  },

  update: function(callback) {
    var pathPrefix = 'mode_assets/p5/empty_project/libraries/';
    var urlPrefex = 'https://raw.githubusercontent.com/lmccart/p5.js/master/lib/';

    var files = [
      { local: pathPrefix + 'p5.js', remote: urlPrefex + 'p5.js' },
      { local: pathPrefix + 'p5.sound.js', remote: urlPrefex + 'addons/p5.sound.js' },
      { local: pathPrefix + 'p5.dom.js', remote: urlPrefex + 'addons/p5.dom.js' }
    ];

    var checked = 0;

    files.forEach(function(file) {
      download(file.remote, file.local, function(data){
        if (data) {
          fs.writeFile(file.local, data, function(err){
            if (err) throw err;
          });
        }
        checked ++;
        if (checked == files.length && typeof callback !== 'undefined') {
          callback();
        }
      });
    });
  },

  referenceURL: 'http://p5js.org/reference/'

};

var running = false;
var url = '';

function startServer(path, app, callback) {
  if (running === false) {
    var portscanner = nodeRequire('portscanner');
    portscanner.findAPortNotInUse(3000, 4000, '127.0.0.1', function(error, port) {
      var staticServer = nodeRequire('node-static');
      var server = nodeRequire('http').createServer(handler);
      var io = nodeRequire('socket.io')(server);
      var file = new staticServer.Server(path);

      server.listen(port, function(){
        url = 'http://localhost:' + port;
        callback(url);
        running = true;
      });

      function handler(request, response) {
        request.addListener('end', function () {
          file.serve(request, response);
        }).resume();
      }

      io.on('connection', function (socket) {
        socket.on('console', function (data) {
          app.debugOut(data.msg, data.num, data.type);
        });
      });
    });


  } else {
    callback(url);
  }

}

function download(url, local, cb) {
  getLine(local, 0, function(line) {
    var shouldUpdate = true;
    var data = '';
    var lines = [];
    var request = nodeRequire('https').get(url, function(res) {
      res.on('data', function(chunk) {
        data += chunk;
        lines = data.split('\n');
        if (lines.length > 1 && line == lines[0]) {
          shouldUpdate = false;
          res.destroy();
        }
      });

      res.on('end', function() {
        if (shouldUpdate) {
          cb(data);
        } else {
          cb(null);
        }
      })
    });

    request.on('error', function(e) {
      console.log("Got error: " + e.message);
      cb(null);
    });
  });
}

function getLine(filename, lineNo, callback) {
  // TO DO

  // fs.readFile(filename, function (err, data) {
  //   if (err) throw err;

  //   var lines = data.toString('utf-8').split("\n");
  //   callback(lines[lineNo]);
  // });
}
