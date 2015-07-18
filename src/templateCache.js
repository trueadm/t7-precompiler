var caches = {};

var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

var templateCache = {
  store: function(templateKey, funcId, template) {
    caches[templateKey] = {
      funcId: funcId,
      template: template
    };
  },
  clear: function() {
    caches = {};
  },
  generateSource: function() {
    var source = ["\n//t7 precompiled templates\n"];
    if(Object.keys(caches).length === 0) {
      return "";
    }
    for(var key in caches) {
      source.push(";function __" + caches[key].funcId + "(){" + caches[key].template + "};");
    }
    return source.join("\n");
  },
  makeId: function(templateKey) {
    var text = "";
    if(caches[templateKey]) {
      return caches[templateKey].funcId;
    }

    for( var i=0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
};

module.exports = templateCache;
