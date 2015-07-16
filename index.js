var args = process.argv.slice(2);
var shell = require("./src/shell.js");

if(args.length > 0) {
  shell.run(args);
}
