const { Client } = require('pg')

const client = new Client({
  user: 'ottospigariol',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'ottospigariol',
  port: 5432,
})

module.exports = {client};

