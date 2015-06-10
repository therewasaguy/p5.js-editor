// node modules

// var Path = nodeRequire('path');
// var fs = nodeRequire('fs');
// var os = nodeRequire('os');
// var chokidar = nodeRequire('chokidar');
// var rimdir = nodeRequire('rimraf');

// front-end modules
var Vue = require('vue');
var $ = require('jquery');
var _ = require('underscore');
var AutoLinker = require('autolinker');
var keybindings = require('./keybindings');
var Files = require('./files');
var menu = require('./menu');
var windowstate = require('./windowstate');
var updater = require('./updater');
var settings = require('./settings');
var modes = {
  p5: require('./modes/p5/p5-mode')
};

var appConfig = {

  el: '#app',

  mode: modes.p5,

  components: {
    editor: require('./editor/index'),
    sidebar: require('./sidebar/index'),
    settings: require('./settings/index'),
    debug: require('./debug/index'),
    tabs: require('./tabs/index')
  },

  data: {
    title: 'Untitled',
    // projectPath: window.PATH,
    unsaved: window.UNSAVED ? true : false,
    windowURL: window.location.href,
    temp: true,
    running: false,
    focused: false,
    settings: {},
    showSettings: false,
    files: [],
    tabs: [],
    justSaved: false,
    askReload: false
  },

  computed: {
    projectName: function() {
      // TO DO
      return 'Hello p5!';
      // return Path.basename(this.projectPath);
    },

    orientation: function(){
     var orientation = this.settings.consoleOrientation;
     return orientation;
    }
  },

  ready: function() {
    this.modeFunction('update');
    updater.check();
    keybindings.setup(this);
    menu.setup(this);

    this.setupFileListener();
    this.setupCloseHandler();
    this.setupDragListener();
    this.setupSettings();

    // TO DO: make it possible to define projectPath
    if (this.projectPath) {
      // if (!this.unsaved) this.temp = false;
      // var filename = null;

      // if (fs.lstatSync(this.projectPath).isFile()) {
      //   // keep the name of the file to be opened
      //   filename = this.projectPath;

      //   // set the projectPath to the enclosing folder
      //   this.projectPath = Path.dirname(this.projectPath);
      // }

      // load the project and open the selected file

      // menu.updateRecentFiles(this, this.projectPath);
    } else {
      // if we don't have a project path global, create a new project
      this.modeFunction('newProject');
      menu.updateRecentFiles(this);
    }
  },

  methods: {
    modeFunction: function(func, args) {
      var mode = this.$options.mode;
      if (typeof mode[func] === 'function') {
        // make args an array if it isn't already
        // typeof args won't work because it returns 'object'
        if (Object.prototype.toString.call(args) !== '[object Array]') {
          args = [args];
        }
        mode[func].apply(this, args);
      }
    },

    setupSettings: function() {
      this.settings = settings.load();
      this.$watch('settings', function(value){
        this.$broadcast('settings-changed', value);
        settings.save(value);
      });
    },

    // use jquery to handle file changes
    // (I should move this over to vuejs but it wasn't dealing
    // with the html file element properly)
    setupFileListener: function() {
      $('#openFile').change(this.open.bind(this));
      $('#saveFile').change(this.saveAs.bind(this));
      $('#saveProject').change(this.saveProjectAs.bind(this));
    },

    setupCloseHandler: function() {
      var self = this;
      // TO DO
    },

    // todo: setup drag and drop
    setupDragListener: function() {
      var self = this;
      window.ondragover = function(e) { e.preventDefault(); return false };
      window.ondrop = function(e) {
        e.preventDefault();
        if (e.dataTransfer.files[0]) {
          var path = e.dataTransfer.files[0].path;
          self.openProject(path);
        }
        return false
      };
    },

    // create a new window 50px below current window
    newWindow: function(url, options) {
      // TO DO

      // var currentWindow = gui.Window.get();
      // var win = gui.Window.open(url, _.extend({
      //   x: currentWindow.x + 50,
      //   y: currentWindow.y + 50,
      //   width: 1024,
      //   height: 768,
      //   toolbar: false,
      //   focus: true,
      //   show: false
      // }, options));
      // return win;
    },

    // open an existing project with a new window
    open: function(event) {
      var path = event.target.files[0].path;
      this.openProject(path);
      // reset value in case the user wants to open the same file more than once
      $('#openFile').val('');
    },

    openProject: function(path, temp) {
      // create the new window
      var win = this.newWindow(this.windowURL);

      // set the project path of the new window
      win.on('document-start', function(){
        if (fs.lstatSync(path).isDirectory()) {
          var sketchPath = Path.join(path, 'sketch.js');
          if (fs.existsSync(sketchPath)) path = sketchPath;
        }
        win.window.PATH = path;
        if (typeof temp === 'boolean' && temp === true) {
          win.window.UNSAVED = true;
        }
      });
      return win;
    },

    // load project files
    loadProject: function(path, callback) {
      var self = this;
      Files.list(path, function(files){
        self.files = files;
        self.watch(path);
        if (typeof callback === 'function') callback();
      });
    },

    resetMenu: function(){
      menu.resetMenu();
    },

    // watch the project file tree for changes
    watch: function(path) {
      var self = this;
      // TO DO
    },




    // close the window, checking for unsaved file changes
    closeProject: function() {
      if (this.focused) {
        if (this.outputWindow) {
          this.outputWindow.close(true);
          this.outputWindow = null;
        }
        gui.Window.get().close();
      } else {
        if (this.outputWindow) {
          this.toggleRun();
        }
      }
    },

    // save all open files
    saveAll: function() {
      // TO DO

      // _.where(this.files, {type: 'file', open: true}).forEach(function(file) {
      //   if (file.originalContents != file.contents) {
      //     fs.writeFileSync(file.path, file.contents, "utf8");
      //     file.originalContents = file.contents;
      //   }
      // });
    },

    saveAs: function(event) {
      // TO DO

      // // capture the filename selected by the user
      // var file = event.target.files[0].path;

      // if (this.temp) {
      //   // mode specific action
      //   this.modeFunction('saveAs', file);
      // } else {
      //   // save a file
      //   // if the we are saving inside the project path just open the new file
      //   // otherwise open a new window
      //   fs.writeFileSync(file, this.currentFile.contents, "utf8");
      //   if ((Path.dirname(file) + '/').indexOf(this.projectPath + '/') > -1) {
      //     var f = Files.setup(file);
      //     Files.addToTree(f, this.files, this.projectPath);
      //     this.openFile(file);
      //   } else {
      //     this.openProject(file);
      //   }
      // }

      // // reset value in case the user wants to save the same filename more than once
      // $('#saveFile').val('');
    },

    saveAs: function(event) {
      // TO DO
    },

    saveProjectAs: function(event) {
      // TO DO
    },

   

    saveFile: function() {
      // TO DO
    },

    saveFileAs: function(path) {
      // TO DO
    },

    writeFile: function() {
      // TO DO
    },

    // open up a file - read its contents if it's not already opened
    openFile: function(path, callback) {
      // TO DO
    },
    
    closeFile: function(path){
        var shouldClose = true;

        if (file.contents != file.originalContents){
          shouldClose = confirm('You have unsaved changes. Close file and lose changes?');
        }

        if (shouldClose) {
          file.open = false;
          file.contents = file.originalContents; 
          this.$broadcast('close-file', file);
          return true;
        }
        return false;
    },

    // create a new file and save it in the project path
    newFile: function(basepath) {
      var title = prompt('File name:');

      // TO DO
    },

    newFolder: function(basepath) {
      var title = prompt('Folder name:');
      // TO DO
    },

    renameFile: function(path) {
      // TO DO

      // var originalName = Path.basename(path);
      // var newName = prompt('Rename ' + originalName + ' to:', originalName);
      // if (!newName) return false;

      // fs.rename(path, Path.join(Path.dirname(path), newName));
    },

    debugOut: function(data) {
      var msg = data.msg;
      var style = data.style;
      var line = data.num;
      var type = data.type;
      if (typeof msg === 'object') msg = JSON.stringify(msg);
      if (msg === 'Uncaught ReferenceError: require is not defined') return false;
      if (style) {
        msg = msg.replace(/%c/g, '');
        msg = msg.replace('[', '');
        msg = msg.replace(']', '');
      }
      msg = AutoLinker.link(msg);
      // console.log(data);
      $('#debug').append('<div class="'+type+'" style="'+(style ? style : '')+'">' + (line ? line + ': ' : '') + msg + '</div>');
      $('#debug').scrollTop($('#debug')[0].scrollHeight);
    },

    run: function() {
      $('#debug').html('');
      this.modeFunction('run');
    },

    toggleRun: function() {
      if (this.running) {
        this.modeFunction('stop');
      } else {
        $('#debug').html('');
        this.modeFunction('run');
      }
    },

    changeFontSize: function(sz) {
      this.settings.fontSize = parseInt(this.settings.fontSize) + sz;
    },

    toggleSettingsPane: function() {
      this.showSettings = !this.showSettings;
    },

    toggleSidebar: function() {
      this.settings.showSidebar = !this.settings.showSidebar;
    },

    showHelp: function() {
      // TO DO
      // gui.Shell.openExternal(this.$options.mode.referenceURL);
    }

  }

};


windowstate.load(function(createNewProject){

  if (createNewProject) {
    var app = new Vue(appConfig);
  } else {
    // TO DO
    // gui.Window.get().close(true);
  }
});
