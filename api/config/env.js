const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test') {
  result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
}

const env = {
	port: process.env.PORT || 8080,
	allowOrigin: process.env.ALLOW_ORIGIN || '*',
	secretkey: process.env.DB_SECRET_KEY || "applecarkey-90182"
}

env.sql = {
  host: process.env.SQL_HOST || 'applecarkey.database.windows.net',
  database: process.env.SQL_DB || 'iot_data',
  user: process.env.SQL_USER || 'applecarkey',
  pass: process.env.SQL_PASS || 'ed4ZmrZJ22k4'
}

module.exports = env;
