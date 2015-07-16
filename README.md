#t7.js Precompiler

This a Node precompiler for [t7.js](https://github.com/trueadm/t7). This precompiler replaces all t7 template string instances
in a given file and produces raw JavaScript output that can be interpreted at run-time for better start-up times and better performance.

It's highly recommended that you use this precompiler in your build pipeline when using t7 in production environments.

To install the t7-precompiler, simply run the following:

```sh
npm install -g t7-precompiler
```

To use the precompiler via command line use the `t7-compiler` command pass an input filename and an output t7 library syntax (React, Universal, Mitrhil, etc):

```sh
t7-compiler -i fileName.js -o react
```

The precompiled file should be output to the same directory.

Alternatively, you can require t7-precompiler in your Node module by using:

```javascript
var precompiler = require("t7-precompiler");

precompiler.compile("var foo = 'bar';", "react");
```
