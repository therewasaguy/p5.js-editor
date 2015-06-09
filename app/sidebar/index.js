var File = require('./../files');
var _ = require('underscore');
var $ = require('jquery');

module.exports = {
  template: require('./sidebar.html'),

  data: {
    sidebarWidth: undefined
  },

  computed: {
    className: function() {
      var container = $('#sidebar-container');
      if (!this.$root.settings.showSidebar) {
        container.css({
          width: this.sidebarWidth
        });
        ace.resize();
        return "expanded";
      } else {
        this.sidebarWidth = container.width();
        container.css({
          width: 10
        });
        ace.resize();
        return "";
      }
    }
  },

  ready: function() {
    this.$on('open-nested-file', this.openNestedFile);
    var container = $('#sidebar-container');
    this.sidebarWidth = container.width();
  },

  components: {

    file: {
      template: require('./file.html'),
      computed: {
        hidden: function() {
          return this.name[0] === '.';
        },
        icon: function() {
          if (this.ext.match(/(png|jpg|gif|svg|jpeg)$/i)) return 'image';
          else if (this.ext.match(/db$/i)) return 'db';
          else return 'file';
        },
        className: function() {
          var c = 'item';
          if (this.$root.currentFile.path == this.path) c += ' selected';
          return c;
        }
      },

      methods: {
        popupMenu: function(target, event) {
          popupMenu.apply(this, arguments);
        }
      }
    },

    folder: {
      template: require('./folder.html'),
      data: {
        open: false,
        icon: 'folder'
      },
      computed: {},
      methods: {
        popupMenu: function(target, event) {
          popupMenu.apply(this, arguments);
        }
      }
    },
  },

  methods: {
    popupMenu: function(target, event) {
      popupMenu.apply(this, arguments);
    },

    openFile: function(file) {
      this.$root.openFile(file.path);
    },

    toggleFolder: function(folder, cb) {
      var self = this;
      folder.open = !folder.open;
      if (folder.open) {
        File.list(folder.path, function(files) {
          folder.children = files;
          if (!folder.watching) {
            folder.watching = true;
            self.$root.watch(folder.path);
          }
          if (typeof cb === 'function') cb();
        });
      }
    },


    openNestedFile: function(path) {
      var self = this;
      var dirname = Path.dirname(path);
      var f = _.findWhere(this.$root.files, {
        path: dirname
      });
      if (f) {
        this.toggleFolder(f, function() {
          self.$root.openFile(path);
        });
      }
    },

    startDrag: function(e) {
      var container = $('#sidebar-container');
      $(document).on('mousemove', function(e) {
        container.css({
          width: e.clientX
        });
        ace.resize();
      }).on('mouseup', function(e) {
        $(document).off('mouseup').off('mousemove');
      });
    }
  }
};

// to do - onely make this once! don't generate each time
var popupMenu = function(file, e) {
  e.preventDefault();
  var self = this;
  var menu = new gui.Menu();
  if (file.type === "file" || file.type === "folder") {
    menu.append(new gui.MenuItem({
      label: "Reveal",
      click: function() {
        gui.Shell.showItemInFolder(file.path);
      }
    }));
    menu.append(new gui.MenuItem({
      label: "Rename",
      click: function() {
        self.$root.renameFile(file.path);
      }
    }));
    menu.append(new gui.MenuItem({
      label: "Delete",
      click: function() {
        trash([file.path], function(err) {});
      }
    }));
  }

  menu.append(new gui.MenuItem({
    label: "New file",
    click: function() {
      // TO DO
      // self.$root.newFile(file.type == 'folder' ? file.path : self.$root.projectPath);
    }
  }));

  menu.append(new gui.MenuItem({
    label: "New folder",
    click: function() {
      // TO DO
      // self.$root.newFolder(file.type=='folder' ? file.path : Path.dirname(file.path));
    }
  }));
  menu.append(new gui.MenuItem({
    label: "Rename",
    click: function() {
      // TO DO
      // self.$root.renameFile(file.path);
    }
  }));
  menu.append(new gui.MenuItem({
    label: "Delete",
    click: function() {
      // TO DO
      // trash([file.path], function(err) {});
      // self.$root.newFolder(file.type == 'folder' ? file.path : self.$root.projectPath);
    }
  }));
  menu.popup(e.clientX, e.clientY);

};
