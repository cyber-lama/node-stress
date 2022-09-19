const http = require('node:http');

// SERVER -----------------------------------------
const port = 8080;

const server = http.createServer((req, res) => {
  console.log(req.url)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});