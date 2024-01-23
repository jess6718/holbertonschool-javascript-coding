#!/usr/bin/node
const url = process.argv[2];
const request = require('request');

let count = 0;
request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  }
  const resultObj = JSON.parse(body).results;
  for (const attr of resultObj) {
    for (const character of attr.characters) {
    //  if the character contains 18
      if (character.indexOf('18') > -1) {
      //  increase the count
        count = count + 1;
      }
    }
  }
  //  print the total count
  console.log(count);
});
