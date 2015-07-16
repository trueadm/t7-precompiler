var fs = require('fs');
var compiler = require("./compiler.js");


function handleFile(fileName, fileText, outputType) {
  console.time("Precompiled '" + fileName + "'");
  //compile the file
  compiler.compile(fileText)
  //make new file
  createCompiledFile(fileName.replace(".js", ".compiled.js"), output)
  console.timeEnd("Precompiled '" + fileName + "'");
};

function createCompiledFile(fileName, fileText) {
  fs.writeFile("./" + fileName, fileText);
};

var shell = {
  run: function(args) {
    //we are looking at an input
    if(args[0] === "-i" && args[2] === "-o") {
      //check the file or folder
      var fileName = args[1];
      var output = args[3];
      if(fileName !== "") {
        fs.readFile("./" + fileName, 'utf8', function(err, fileText) {
          handleFile(fileName, fileText, output)
        })
      }
    } else {
      console.log("Invalid arguments: Please define an input filename and an output type, for example '-i myFile.js -o react'");
    }
  }
};

module.exports = shell;
