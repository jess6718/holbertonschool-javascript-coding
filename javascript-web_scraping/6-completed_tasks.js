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
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  // Sort the counts object by keys (user IDs)
  const sortedCounts =
  Object.fromEntries(Object.entries(counts).sort((a, b) =>
  parseInt(a[0]) - parseInt(b[0])));

  console.log(sortedCounts);
});
