// INITIALIZATION & ACTIVATION
require("dotenv").config();
const axios = require('axios')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = {
    origin: process.env.DOMAIN,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization']
}
const path = require('path')
const app = express()
const GADB = require('./src/db/pgWrapper_global_accounts')
const GUGUDB = require('./src/db/pgWrapper_gugu')
const jwt = require('jsonwebtoken')
const jwkToPem = require('jwk-to-pem')
    // ACCESS TOKEN JWK
const jwk_1 = {"alg":process.env.JWK_1_ALG,"e":process.env.JWK_1_E,"kid":process.env.JWK_1_KID,"kty":process.env.JWK_1_KTY,"n":process.env.JWK_1_N,"use":process.env.JWK_1_USE}
const pem_1 = jwkToPem(jwk_1)
    // ID TOKEN JWK
const jwk_2 = {"alg":process.env.JWK_2_ALG,"e":process.env.JWK_2_E,"kid":process.env.JWK_2_KID,"kty":process.env.JWK_2_KTY,"n":process.env.JWK_2_N,"use":process.env.JWK_2_USE}
const pem_2 = jwkToPem(jwk_2)
// ---------

// REGISTERING MIDDLEWARES
app.use(express.json())
app.use(cookieParser())
// ---------

// API REQUESTS ROUTING
    // REGISTER ACCOUNT REQUEST
app.options('/oauth/register', cors(corsOptions))
app.post('/oauth/register', cors(corsOptions), (req,res)=>{
    // LOG NEW USER DETAILS INTO DATABASE
    console.log('/oauth/register | new user details | ', req.body)
    GADB.none(`INSERT INTO public.accounts(username,email,first_name,surname,sub,country,gender,language,date_of_birth,last_login) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [req.body.username,req.body.userEmail,req.body.firstName,req.body.surname,req.body.sub,req.body.country,req.body.gender,req.body.language,req.body.birthdate,null])
    .then(()=>{console.log(`/oauth/register | success | ${req.body.sub} logged into global_accounts DB`)})
    .catch((err)=>{console.log(`/oauth/register | failure | ${req.body.sub} not logged into global_accounts DB | `, err)})
    GUGUDB.none(`INSERT INTO public.accounts(username,email,first_name,surname,sub,country,gender,language,date_of_birth,last_login) VALUES(1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [req.body.username,req.body.userEmail,req.body.firstName,req.body.surname,req.body.sub,req.body.country,req.body.gender,req.body.language,req.body.birthdate,null])
    .then(()=>{console.log(`/oauth/register | success | ${req.body.sub} logged into gugu DB`)})
    .catch((err)=>{console.log(`/oauth/register | failure | ${req.body.sub} not logged into gugu DB | `, err)})
    res.send({isRegistered: true})
})
    // LOGIN ACCESS TOKEN REQUEST
app.options('/oauth/signin', cors(corsOptions))
app.post('/oauth/signin', cors(corsOptions), (req,res)=>{
    jwt.verify(req.body.accessToken, pem_1, { algorithms: ['RS256'], issuer: process.env.JWT_ISS, maxAge: 24*60*60 }, (err, decodedToken)=>{
        if (decodedToken && decodedToken.token_use === 'access' && decodedToken.client_id === process.env.JWT_APP_CLIENT_ID) {
            console.log(`valid access token @ ${decodedToken.auth_time}`)
            console.log(decodedToken)
            jwt.verify(req.body.idToken, pem_2, { algorithms: ['RS256'], issuer: process.env.JWT_ISS, audience: process.env.JWT_APP_CLIENT_ID, maxAge: 24*60*60 }, (err, decodedToken)=>{
                if (decodedToken && decodedToken.token_use === 'id') {
                    // SEND COOKIES CONTAINING TOKENS AFTER VERIFICATIONS & SIGNIN STATUS
                    res.cookie('guguAccessToken', req.body.accessToken, { httpOnly: true, secure: false, maxAge: 24*60*60000 })
                    res.cookie('guguRefreshToken', req.body.refreshToken, { httpOnly: true, secure: false, maxAge: 365*24*60*60000 })
                    console.log(`valid id token @ ${decodedToken.auth_time}`)
                    console.log(decodedToken)
                    res.send({isSignedIn: true, accessToken: req.body.accessToken, refreshToken: req.body.refreshToken})
                }
                if (err) {
                    res.send({isSignedIn: false, location: 'idToken', err})
                }
            })
        }
        if (err) {
            res.send({isSignedIn: false, location: 'accessToken', err})
        }
    })
})
    // AUTHENTICATION REQUESTS
app.options('/oauth/auth', cors(corsOptions))
app.get('/oauth/auth', cors(corsOptions), (req,res)=>{
    console.log('/oauth/auth | req header | access token =>', req.cookies['guguAccessToken'])
    console.log('/oauth/auth | req header | refresh token =>', req.cookies['guguRefreshToken'])
    if (req.cookies['guguAccessToken']) {
        jwt.verify(req.cookies['guguAccessToken'], pem_1, { algorithms: ['RS256'], issuer: process.env.JWT_ISS, maxAge: 24*60*60 }, (err, decodedToken)=>{
            if (decodedToken && decodedToken.token_use === 'access' && decodedToken.client_id === process.env.JWT_APP_CLIENT_ID) {
                console.log(`/oauth/auth | decoded token success @ ${decodedToken.auth_time}`)
                console.log(decodedToken)
                // EXTRACT USER DETAILS FROM DATABASE
                // SEND AUTHENTICATION STATUS & USER DETAILS
                res.send({isAuthenticated: true})
            } 
            if (err) {
                console.log(`/oauth/auth | failed token validation`)
                res.send({isAuthenticated: false})
            }
        })
    }
    else if (req.cookies['guguRefreshToken']) {
        // SEND REFRESH TOKEN TO IDP TO GET NEW SETS OF TOKENS FOR CONTINUED ACCESS
        axios.post(process.env.AWS_TOKEN_ENDPOINT_REFRESH, null, {
            params: {
                "grant_type": "refresh_token",
                "client_id": process.env.JWT_APP_CLIENT_ID,
                "refresh_token": req.cookies['guguRefreshToken']
            }
        }, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        })
        .then((resp)=>{
            console.log(`/oauth/auth | success refresh token |`, resp.data)
            res.cookie('guguAccessToken', resp.data.access_token, { httpOnly: true, secure: false, maxAge: 24*60*60000 })
            // EXTRACT USER DETAILS FROM DATABASE
            // SEND AUTHENTICATION STATUS & USER DETAILS
            res.send({isAuthenticated: true})
        })
        .catch((err)=>{
            console.log(`/oauth/auth | failed refresh token |`, err)
            res.send({isAuthenticated: false})
        })
    }
    else {
        console.log(`/oauth/auth | no access token`)
        res.send({isAuthenticated: false})
    }
})

    // SIGN OUT REQUESTS
app.get('/oauth/signout', cors(corsOptions), (req,res)=>{
    console.log('/oauth/signout | signing out')
    res.clearCookie('guguAccessToken')
    res.clearCookie('guguRefreshToken')
    res.send({isSignedOut: true})
})


    // RESOURCE REQUESTS

    // GOOGLE AUTH REQUEST









// PORT LOCATION
app.listen(8000, () => {
    console.log("Listening on port 8000. Go to http://localhost:8000");
})
// ---------


