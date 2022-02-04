const fs = require('fs-extra');
const path = require('path');
const express = require('express');

const mode = process.env.ENV;
const port = process.env.PORT;


const server = express();

console.log('MODE', mode);

// Serves all static assets.
server.use('/styles', express.static('playground/compiled-css'));

// Catch-all to redirect any request to the main entry point (index.html).
server.get('/', (_request, response, next) => {
  response.sendFile(path.join(__dirname, '/index.html'));
});

server.listen(port, () => {
  console.log(`Server is up. Port : ${port}`);
});