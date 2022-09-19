const http = require('node:http');
const {Client} = require("pg");
const {DBConfig} = require("./configuration");


// SERVER -----------------------------------------
const port = 8080;

const apiHandler = async () => {
  const client = new Client(DBConfig);
  client.connect()

  const res = await client
     .query(`select * from users limit 5000`)

  client.end()
  return res.rows
}

const server = http.createServer(async (req, res) => {
  const {url, method} = req
  if (url === "/api" && method === "GET") {
    const users = await apiHandler()
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: users}));
    return
  }
  if (url === "/" && method === "GET") {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: "Hello, World!\n"}));
    return;
  }
  res.writeHead(404, {"Content-Type": "application/json"});
  res.end(JSON.stringify({message: "Route not found"}));
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});