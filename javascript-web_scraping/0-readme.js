#!/usr/bin/node
const path = process.argv[2];
const fs = require('fs');

fs.readFile(path, (err, inputText) => {
  if (err) throw err;
  console.log(inputText.toString());
});
