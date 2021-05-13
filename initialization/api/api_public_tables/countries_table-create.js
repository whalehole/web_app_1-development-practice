// CONNECT TO POSTGRESQL DB
const pgp = require('pg-promise')()
const db = pgp({host: 'localhost', port: 5432, database: 'gugu', user: 'postgres', password: '19021991'})

// TABLE CREATION
// countries
    // CREATE
    db.none(`CREATE TABLE public.countries (
        alpha2_code TEXT PRIMARY KEY,
        alpha3_code TEXT NOT NULL,
        top_level_domain TEXT NOT NULL,
        name TEXT NOT NULL,
        calling_codes TEXT,
        capital TEXT,
        alt_spellings VARCHAR NOT NULL,
        region TEXT,
        subregion TEXT,
        population BIGINT NOT NULL,
        demonym TEXT NOT NULL,
        timezones TEXT NOT NULL,
        native_name VARCHAR NOT NULL,
        currencies VARCHAR,
        languages VARCHAR
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