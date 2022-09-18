const {connectDB, closeDB} = require("./connect");
const {faker} = require("@faker-js/faker");

migrationRun = async () => {
  const USERS = []
  Array.from({ length: 5000 }).forEach(() => {
    USERS.push(faker.internet.userName());
  });
  const query = `
      DROP TABLE IF EXISTS users;
      CREATE TABLE users
      (
          id       serial PRIMARY KEY,
          name     VARCHAR(50)
      );
  `;
  const query2 = `INSERT INTO users(name) VALUES ($1)`;

  const client = await connectDB()

  client
    .query(query)

  await Promise.all(USERS.map(async item => {
    await client.query(query2, [item])
  }))
}
migrationRun()
  .then(() => console.log('Migration successfully!'))
  .catch(err => console.log(err))
  .finally(() => {
    closeDB()
    console.log('Finished execution');
  });