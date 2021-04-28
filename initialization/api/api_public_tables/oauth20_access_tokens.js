// CONNECT TO POSTGRESQL
    //  OAUTH_2.0 DATABASE
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'oauth_2.0',
    user: 'postgres',
    password: '19021991',
}
const pgp = require('pg-promise')()
const db = pgp(cn)

// TABLES CREATION
    // CREATE
db.none(`CREATE TABLE public.access_tokens (
    access_token_id SERIAL PRIMARY KEY,
    access_token TEXT UNIQUE NOT NULL,
    user_id BIGINT,
    created_on TIMESTAMPTZ NOT NULL
) WITH ( OIDS = FALSE );`)
.then((data)=>{
    console.log('access_tokens table created.')
})
.catch((error)=>{
    console.log('access_tokens table not created.')
})
    // ALTER
db.none(`

`)
.then((data)=>{
    console.log('access_tokens table altered.')
})
.catch((error)=>{
    console.log('access_tokens table not altered.')
})