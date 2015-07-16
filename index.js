var args = process.argv.slice(2);
var shell = require("./src/shell.js");
var compiler = require("./src/compiler.js");

if(args.length > 0) {
  shell.run(args, __dirname);
}

module.exports = compiler;
