var recast = require('recast');
var types = recast.types;
var Visitor = require('./visitor');
var templateCache = require("./templateCache.js");
var t7 = require("t7");

t7.setPrecompile(true);

function transform(ast) {
  return types.visit(ast, Visitor.visitor);
};

var compiler = {
  compile: function() {
    var ast = recast.parse(fileText);

    for(outputName in t7.Outputs) {
      if(outputName.toLowerCase() === outputType.toLowerCase()) {
        t7.setOutput(t7.Outputs[outputName]);
        break;
      }
    }

    var output = recast.print(transform(ast)).code;

    //add the template sources to bottom of file
    output += "\n//t7 precompiled templates\n" + templateCache.generateSource();

    return output;
  }
};

module.exports = compiler;
