const { Pool } = require('pg');

module.exports = new Pool({
  connectionString: "postgres://pvqgkass:3-sR5MsZvfmKF24Vd7n2cZwBUvqyKXwh@raja.db.elephantsql.com:5432/pvqgkass",
  idleTimeoutMillis: 30000,
})