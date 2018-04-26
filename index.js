const express = require('express');
const app = express();
const gulp = require('gulp');
const config = require('./config');
const port = config.port;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`listen to the voices at ${port}`);
});
