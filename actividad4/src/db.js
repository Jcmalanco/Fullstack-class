require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({ //acceso base de datos
  connectionString: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
