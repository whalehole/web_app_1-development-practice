// INITIALIZATION & ACTIVATION
require("dotenv").config();
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
const oauthDB = require('./db/pgWrapper_oauth2')
const jwt = require('jsonwebtoken')
const jwkToPem = require('jwk-to-pem')
    // ACCESS TOKEN JWK
const jwk_1 = {"alg":"RS256","e":"AQAB","kid":"lgFuNxgkRYI5vYmt/dq3Z5DUJU7BatetEdIG4Vs2z8k=","kty":"RSA","n":"sXtOczy4zB8CD3t77uWnkO70_0neS_j6HvUorfkinV5TC1VNoB6Jnm8qaO7i2ey1SHueKLSJeZ2sAQIwPdHj4AyXyL7jO-JB2lzliBRqs3Sr3TDgMie8fQjsHhDuf1_4h_wohzgbxC2iSjiZky2phez5ByD0nX9HIdFNJmbbS52it8g-myFQwn1DFN_mtzB33181fEedZcbPCtVoaBC-UVK8OButELqvJRN9ch9dDkuKPnWOXizYUin_Db8rMY85N37JN1J_PBrSH1s7B6H2JjZF7Cr4hPrM71kabSu8r10rfk-I1J0JCtDc0_dLOfx6HS8fp9ebBhzaxHE6YH14YQ","use":"sig"}
const pem_1 = jwkToPem(jwk_1)
    // ID TOKEN JWK
const jwk_2 = {"alg":"RS256","e":"AQAB","kid":"j7nSGgyvtfs+l23zzjZFaaAm9lMWsAJ3HJBmOOGGVy8=","kty":"RSA","n":"3VPjrKwN70koJwAy-q9dupUvTyhnSgcUdY-jXLzY2nyiF1PK3rcA0mhHkPZr0t8f9fo7EiuBRIVCwa3eHVEmwspvi3VmKK-z9zT-svLI-go19SW8XPjCDXP5jwKMkwEIwVbbXS6AR837uzOv2u6OY8Ni-WYAyVmkrzCBjcINZLtStiaB5Dk7zX0eMHlRNdat0dCxMD4jUG97yNW_KubKsVCAQujHLIL3-f-d0UqCzoBgERTCCnqAajIvrA0dd-GHD071DDm0VnkhozRNlDiPbUVjyIK1kNxeM24HOuv5PFqH7dvY8y4UAJPjHvOAAO0PYzwI_Z75df35P95YIvh5AQ","use":"sig"}
const pem_2 = jwkToPem(jwk_2)
// ---------

// REGISTERING MIDDLEWARES
app.use(express.json())
app.use(cookieParser())
// ---------

// API REQUESTS ROUTING
    // REGISTER ACCOUNT REQUEST

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


