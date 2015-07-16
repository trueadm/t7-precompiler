var fs = require('fs');
var compiler = require("./compiler.js");


function handleFile(fileName, fileText, outputType) {
  var newName = fileName.replace(".js", ".compiled.js");
  console.time("Precompiled '" + fileName + "' to '" + newName + "'");
  //compile the file
  fileText = compiler.compile(fileText, outputType);
  if(fileText == false) {
    console.log("Precompile failed on '" + fileName + "'");
    return;
  }
  //make new file
  createCompiledFile(newName, fileText)
  console.timeEnd("Precompiled '" + fileName + "' to '" + newName + "'");
};

function createCompiledFile(fileName, fileText) {
  fs.writeFile(fileName, fileText);
};

var shell = {
  run: function(args, dir) {
    //we are looking at an input
    if(args[0] === "-i" && args[2] === "-o") {
      //check the file or folder
      var fileName = args[1];
      var output = args[3];
      if(fileName !== "") {
        fs.readFile(dir + "/" + fileName, 'utf8', function(err, fileText) {
          handleFile(dir + "/" + fileName, fileText, output)
        })
      }
    } else {
      console.log("Invalid arguments: Please define an input filename and an output type, for example '-i myFile.js -o react'");
    }
  }
};

module.exports = shell;
