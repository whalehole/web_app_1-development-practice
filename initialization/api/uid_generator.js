// CONNECT TO POSTGRESQL
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'gugu',
    user: 'postgres',
    password: '19021991',
}
const initOptions = {
    schema: 'public'
}
const pgp = require('pg-promise')(initOptions)
const db = pgp(cn)
// 

