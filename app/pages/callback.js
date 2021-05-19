import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'

// CALLBACK FOR AUTHORIZATION CODE FROM AWS AFTER SOCIAL SIGN IN (FACEBOOK)
export default function CallbackPage() {
    const router = useRouter()
    const { code } = router.query

    useEffect(()=>{
        if (code) {
            console.log(code)
            axios.post(`https://guguto-dev.auth.us-east-2.amazoncognito.com/oauth2/token`, null, {
                params: {
                    "grant_type": "authorization_code",
                    "client_id": "6ddeh1teq2kvff2abrn4qdrvr5",
                    "code": code,
                    "redirect_uri": "http://localhost:3000/callback"
                }
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },[code])

    return (
        <>
            <div></div>
        </>
    )
}