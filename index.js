#! /usr/bin/env node

var args = process.argv.slice(2);
var shell = require("./src/shell.js");
var compiler = require("./src/compiler.js");
var exec = require('child_process').exec;

if(args.length > 0) {
  var child = exec('pwd', function(err, stdout, stderr) {
    shell.run(args, stdout.replace("\n", ""));
  });
}

module.exports = compiler;
