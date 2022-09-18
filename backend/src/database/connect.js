const {Client} = require('pg');
const {DBConfig} = require("./../configuration");

const client = new Client(DBConfig);

module.exports.connectDB = () => {
  client.connect()
  return client
}
module.exports.closeDB = () => client.end(console.log('Closed client connection'))