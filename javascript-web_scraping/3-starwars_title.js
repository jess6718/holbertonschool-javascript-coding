#!/usr/bin/node
const id = process.argv[2];
const request = require('request');

request(`https://swapi-api.hbtn.io/api/films/${id}`, function (error, response, body) {
  if (error) {
    console.error(error);
  }
  const filmRes = JSON.parse(body);
  console.log(filmRes.title);
});
