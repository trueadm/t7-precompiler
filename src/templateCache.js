var caches = {};

var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function cleanTemplate(template, key, caches) {
  //these are Inferno templates
  if (template.indexOf("function anonymous() {") > -1 ) {
    template = template.replace("function anonymous() {", "");
    template = template.replace("var fragment = arguments[0];var component = arguments[1];", "");
    template = template.substring(0, template.length - 1);
    template = template.replace(/(\r\n|\n|\r)/gm,"");
    return  "(fragment, component){" + template + "};" + caches[key].funcId  + ".key=" + key  + ";"
  }
  return "(__$props__, __$components__){" + template + "};";
}

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
    var source = ["\n/*t7 precompiled templates*/"];
    if(Object.keys(caches).length === 0) {
      return "";
    }
    for(var key in caches) {
      source.push(";function " + caches[key].funcId + cleanTemplate(caches[key].template, key, caches));
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
