var defaults = {
  fontSize: 14,
  tabSize: 2,
  tabType: "spaces",
  theme: 'tomorrow',
  consoleOrientation: 'horizontal',
  showSidebar: false,
  wordWrap: false,
  runInBrowser: false
};

module.exports.load = function() {
  // TO DO

  // if (typeof nodeGlobal.userSettings === 'object') {
  //   return nodeGlobal.userSettings;
  // }

  var settings = localStorage.userSettings;
  if (!settings) {
    settings = defaults;
  } else {
    try {
      settings = JSON.parse(settings);
    } catch(err) {
      settings = defaults;
    }
  }

  // nodeGlobal.userSettings = settings;

  return settings;
};

module.exports.save = function(settings) {
  // TO DO
  // nodeGlobal.userSettings = settings;
  // localStorage.userSettings = JSON.stringify(nodeGlobal.userSettings);
};

module.exports.write = function() {
  // TO DO
  // localStorage.userSettings = JSON.stringify(nodeGlobal.userSettings);
};

module.exports.defaults = defaults;
