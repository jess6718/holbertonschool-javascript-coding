#!/usr/bin/node
const url = process.argv[2];
const request = require('request');

request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  }
  const bodyObj = JSON.parse(body);
  const counts = {};
  for (const task of bodyObj) {

    if (task.completed === true) {
      const key = task.userId.toString();
      // Current value false assing 0, and increment 1
      counts[key] = (counts[key] || 0) + 1;
    }
  }

  console.log(counts);
});
