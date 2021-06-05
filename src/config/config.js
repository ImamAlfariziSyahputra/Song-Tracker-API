const path = require('path');

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'songtracker',
    user: process.env.DB_USER || 'songtracker',
    password: process.env.DB_PASS || 'songtracker',
    option: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../songtracker.sqlite'),
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  }
}
