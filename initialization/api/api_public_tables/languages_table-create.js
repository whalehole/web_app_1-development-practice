// CONNECT TO POSTGRESQL DB
const pgp = require('pg-promise')()
const db = pgp({host: 'localhost', port: 5432, database: 'gugu', user: 'postgres', password: '19021991'})

// TABLE CREATION
// languages
    // CREATE
db.none(`CREATE TABLE public.languages (
    code TEXT PRIMARY KEY,
    simple_code TEXT NOT NULL,
    name VARCHAR,
    native_name VARCHAR
) WITH ( OIDS = FALSE );`)
.then((data)=>{
    console.log('table created.')
})
.catch((error)=>{
    console.log('table not created. |', error)
})
    // ALTER
db.none(`

`)
.then((data)=>{
    console.log('columns altered.')
})
.catch((error)=>{
    console.log('columns not altered.')
})