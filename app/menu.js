var $ = require('jquery');
var _ = require('underscore');
// var menubar = new gui.Menu({ type: 'menubar' });
// menubar.createMacBuiltin("p5");
// var fileMenu = new gui.Menu();
// var help = new gui.Menu();
// var win = gui.Window.get();
// var recentFilesMenu = new gui.Menu();
var Files = require('./files');
var openRecent, examples;

module.exports.setup = function(app) {
  // TO DO
  // fileMenu.append(new gui.MenuItem({ label: 'New Project', modifiers: 'shift-cmd', key: 'n', click: function(){
  //   app.newWindow(app.windowURL);
  // }}));
  
  // fileMenu.append(new gui.MenuItem({ label: 'New File', modifiers: 'cmd', key: 'n', click: function(){
  //   app.newFile();
  // }}));

  // fileMenu.append(new gui.MenuItem({ label: 'New Folder', click: function(){
  //   app.newFolder();
  // }}));

  // fileMenu.append(new gui.MenuItem({ label: 'Open', modifiers: 'cmd', key: 'o', click: function(){
  //   $('#openFile').trigger('click');
  // }}));

  // openRecent = new gui.MenuItem({label: 'Open Recent'});
  // openRecent.submenu = recentFilesMenu;
  // fileMenu.append(openRecent);

  // fileMenu.append(new gui.MenuItem({ label: 'Close', modifiers: 'cmd', key: 'w', click: function(){
  //   app.closeProject();
  // }}));

  // fileMenu.append(new gui.MenuItem({ label: 'Save', modifiers: 'cmd', key: 's', click: function(){
  //   app.saveFile();
  // }}));

  // fileMenu.append(new gui.MenuItem({ label: 'Save File As...', modifiers: 'shift-cmd', key: 's', click: function(){
  //   app.saveFileAs(app.currentFile.path);
  // }}));

  // fileMenu.append(new gui.MenuItem({ label: 'Save Project As...', modifiers: 'alt-shift-cmd', key: 's', click: function(){
  //   $('#saveProject').trigger('click');
    
  // }}));

  // add menu option for loading example sketches
  // examples = new gui.MenuItem({label: 'Examples'});
  // create submenu
  var exampleDir = 'mode_assets/p5/examples';

  // get latest example categories

};

module.exports.resetMenu = function() {
  // TO DO
};

module.exports.updateRecentFiles = function(app, path) {
  // TO DO
};
