const { Pool } = require("pg");

const keys = require("../keys");

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

module.exports = { pgClient };
