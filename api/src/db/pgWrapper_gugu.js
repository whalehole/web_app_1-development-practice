// CONNECT TO POSTGRESQL DB
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'gugu',
    user: 'postgres',
    password: '19021991',
}
const pgp = require('pg-promise')()
const db = pgp(cn)

module.exports = db
