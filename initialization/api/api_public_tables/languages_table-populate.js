(async ()=>{
    // CONNECT TO POSTGRESQL DB
    const pgp = require('pg-promise')()
    const db = pgp({host: 'localhost', port: 5432, database: 'gugu', user: 'postgres', password: '19021991'})
    // INSERT LANGUAGES
        // TABLE POPULATION
    const insertList = [
        ['en-US','EN','english','english'],
        ['ja-JP','JP','japanese','日本語'],
        ['ko-KR','KOR','korean','한국어'],
        ['zh-CH','CHN','simplified chinese','中文']
    ]
    for (let x of insertList) {
        console.log(x)
        db.none(`INSERT INTO public.languages(
            code,
            simple_code,
            name,
            native_name
            ) VALUES($1,$2,$3,$4)`,
            [x[0],x[1],x[2],x[3]])
        .then(()=>{console.log(`languages_table-populate | success | `, x[2])})
        .catch((err)=>{console.log(`languages-table-populate | failed | `, err)})
    }
})()