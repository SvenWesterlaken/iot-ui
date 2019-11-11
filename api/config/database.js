// Make connection to the base and export it for use in the index.js
const config = require('./env');
const sql = require('mssql')

const pool = new sql.ConnectionPool({
    user: config.sql.user,
    password: config.sql.pass,
    server: config.sql.host,
    database: config.sql.database,
    encrypt: true
})

pool.connect();

module.exports = pool;
