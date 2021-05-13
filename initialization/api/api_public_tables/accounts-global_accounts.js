// CONNECT TO POSTGRESQL
    //  OAUTH_2.0 DATABASE
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'global_accounts',
    user: 'postgres',
    password: '19021991',
}
const pgp = require('pg-promise')()
const db = pgp(cn)

// TABLES CREATION
// 1. accounts
    // CREATE
db.none(`CREATE TABLE public.accounts (
    user_id serial PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    surname TEXT NOT NULL,
    sub TEXT UNIQUE NOT NULL,
    country TEXT NOT NULL,
    gender TEXT NOT NULL,
    language TEXT NOT NULL,
    date_of_birth DATE NOT NULL, 
    created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN DEFAULT false,
    last_login TIMESTAMPTZ
) WITH ( OIDS = FALSE );`)
.then((data)=>{
    console.log('accounts table created.')
})
.catch((error)=>{
    console.log('accounts table not created. |', error)
})
    // ALTER
db.none(`

`)
.then((data)=>{
    console.log('accounts columns altered.')
})
.catch((error)=>{
    console.log('accounts columns not altered.')
})