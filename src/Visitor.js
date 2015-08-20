"use strict";

var recast = require('recast');
var t7 = require("../t7");
var types = recast.types;
var PathVisitor = types.PathVisitor;
var n = types.namedTypes;
var b = types.builders;
var templateCache = require("./templateCache.js");

function Visitor() {
  PathVisitor.apply(this, arguments);
}
Visitor.prototype = Object.create(PathVisitor.prototype);
Visitor.prototype.constructor = Visitor;

Visitor.prototype.visitTemplateLiteral = function(path) {
  var node = path.node;
  var replacement = b.literal(node.quasis[0].value.cooked);

  for (var i = 1, length = node.quasis.length; i < length; i++) {
    replacement = b.binaryExpression(
      '+',
      b.binaryExpression(
        '+',
        replacement,
        node.expressions[i - 1]
      ),
      b.literal(node.quasis[i].value.cooked)
    );
  }

  return replacement;
};


Visitor.prototype.visitTaggedTemplateExpression = function(path) {
  var node = path.node;
  var templates = [];
  var expressions = [];
  var placeholders = [];
  var i = 0;
  var t7Node = null;
  var args = [];
  var ast = false;
  var output = "";
  var funcId = "";
  var m, m2;

  //we check for t7
  if(node.tag.name === "t7") {
    for(i = 0; i < node.quasi.quasis.length; i++) {
      templates.push(node.quasi.quasis[i].value.cooked);
    }
    for(i = 0; i < node.quasi.expressions.length; i++) {
      expressions.push(recast.print(node.quasi.expressions[i]).code);
      placeholders.push(null);
    }

    args = [templates].concat(placeholders);
    t7Node = t7.apply(null, args)
    if(t7Node.inlineObject) {
      //replace templateValues with the raw expression
      //replace the prpops with the expressions
      var re = /__\$props__\[(\d*)\]/g;
      var re2 = /t7._templateCache\["(-|.\d*)"\]/;
      var newInlineObject = t7Node.inlineObject;

      //make the new inline objects
      while ((m = re.exec(t7Node.inlineObject)) !== null) {
        newInlineObject = newInlineObject.replace(m[0], expressions[m[1]]);
      }

      var inlineObjectAndTemplate = newInlineObject;
      //make the new inline templates
      while ((m2 = re2.exec(inlineObjectAndTemplate)) !== null) {
        inlineObjectAndTemplate = inlineObjectAndTemplate.replace(m2[0], "__t7__" + m2[1].replace("-", "$"))
      }

      output = "(" + inlineObjectAndTemplate + ")";
    } else {
      //we need to store the t7Node.compiled code in its own place in the page
      funcId = templateCache.makeId(t7Node.templateKey);
      templateCache.store(t7Node.templateKey, funcId, t7Node.template);
      //then create an output for recast to parse
      expressions.push("{template: __" + funcId + ",templateKey: " + t7Node.templateKey + ", components: null}");
      output = "t7.precompile([" + expressions.join(", ") + "])";
    }
    ast = recast.parse(output);
  }

  return ast;
};

Visitor.visitor = new Visitor();
module.exports = Visitor;
