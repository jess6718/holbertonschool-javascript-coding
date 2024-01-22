#!/usr/bin/node
const path = process.argv[2];
const content = process.argv[3];
const fs = require('fs');

fs.writeFile(path, content, (err) => {
  if (err) throw err;
});
