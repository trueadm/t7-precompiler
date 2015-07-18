var recast = require('recast');
var types = recast.types;
var Visitor = require('./visitor');
var templateCache = require("./templateCache.js");
var t7 = require("../t7");

t7.setPrecompile(true);

function transform(ast) {
  return types.visit(ast, Visitor.visitor);
};

var compiler = {
  compile: function(fileText, outputType) {
    var ast = recast.parse(fileText);
    var output = "";

    for(outputName in t7.Outputs) {
      if(outputName.toLowerCase() === outputType.toLowerCase()) {
        t7.setOutput(t7.Outputs[outputName]);
        break;
      }
    }

    var code = recast.print(transform(ast)).code;

    if(code !== "undefined") {
      output += code;
    } else {
      return false;
    }
    //add the template sources to bottom of file
    output += templateCache.generateSource();

    return output;
  }
};

module.exports = compiler;
