var _ = require('underscore');

var Files = {
  setup: function(path, options) {
    // TO DO

    // var name = Path.basename(path);
    // var ext = Path.extname(path);
    // var fileObject = {
    //   name: name,
    //   path: path,
    //   id: path,
    //   ext: ext,
    //   type: 'file',
    //   open: false,
    //   contents: undefined,
    //   originalContents: undefined
    // };
    // return _.extend(fileObject, options);
  },

  addToTree: function(fileObject, fileArray, projectRoot){
    // TO DO

    // if (Path.dirname(fileObject.path) === projectRoot && !Files.contains(fileArray, fileObject)) {
    //   fileArray.push(fileObject);
    //   return true;
    // }
    // fileArray.forEach(function(f){
    //   if (f.type === 'folder') {
    //     if (f.path === Path.dirname(fileObject.path) && !Files.contains(f.children, fileObject)) {
    //       f.children.push(fileObject);
    //       return true;
    //     }
    //     Files.addToTree(fileObject, f.children);
    //   }
    // });
  },

  removeFromTree: function(path, fileArray) {
    // TO DO

    // var f = _.findWhere(fileArray, {path: path});
    // if (f) {
    //   fileArray.splice(_.indexOf(fileArray, f), 1);
    //   return true;
    // }
    // fileArray.forEach(function(fileObject){
    //   if (fileObject.type === 'folder' && fileObject.children.length > 0) {
    //     Files.removeFromTree(path, fileObject.children);
    //   }
    // });
  },

  contains: function(files, fileObject) {
    if (_.findWhere(files, {
        path: fileObject.path
      })) {
      return true;
    } else {
      return false;
    }
  },

  find: function(files, path) {
    // TO DO

    // var result = undefined;
    // _find(files, path);
    // return result;

    // function _find(files, path) {
    //   if (result) return false;
    //   var f = _.findWhere(files, {path: path});
    //   if (f) {
    //     result = f;
    //     return true;
    //   }
    //   files.forEach(function(f){
    //     if (f.type === 'folder') {
    //       _find(f.children, path);
    //     }
    //   });
    // }
  },

  list: function(dir, callback) {
    // TO DO
  },

  cleanExampleName: function(examplePath) {
    examplePath = Path.basename(examplePath);
    examplePath = examplePath.replace(/([0-9]+_)|(\.js)/g,'');
    examplePath = examplePath.replace(/_/g,' ');
    return examplePath;
  },
};

module.exports = Files;
