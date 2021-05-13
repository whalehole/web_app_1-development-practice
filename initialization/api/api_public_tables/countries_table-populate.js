(async ()=>{
    // CONNECT TO POSTGRESQL DB
    const pgp = require('pg-promise')()
    const db = pgp({host: 'localhost', port: 5432, database: 'gugu', user: 'postgres', password: '19021991'})
    // GET COUNTRIES VIA HTTP
    var GET_countries = require('../GET_scripts/GET_countries')
    var countries = await GET_countries
    // INSERT COUNTRIES
    for (let x of countries) {
        // TABLE POPULATION
        db.none(`INSERT INTO public.countries(
            alpha2_code,
            alpha3_code,
            top_level_domain,
            name,
            calling_codes,
            capital,
            alt_spellings,
            region,
            subregion,
            population,
            demonym,
            timezones,
            native_name,
            currencies,
            languages
            ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
            [x['alpha2Code'],x['alpha3Code'],x['topLevelDomain'].toString(),x['name'],x['callingCodes'].toString(),x['capital'],x['altSpellings'].toString(),x['region'],x['subregion'],x['population'],x['demonym'],x['timezones'].toString(),x['nativeName'],
            x['currencies'].toString(),x['languages'].toString()])
        .then(()=>{console.log(`countries_table-populate | success | `, x['name'])})
        .catch((err)=>{console.log(`countries-table-populate | failed | `, err)})
    }
})()

 