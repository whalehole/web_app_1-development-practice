import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

// CALLBACK FOR AUTHORIZATION CODE FROM AWS AFTER SOCIAL SIGN IN (FACEBOOK)
export default function CallbackPage() {
    const router = useRouter()
    const { code, state } = router.query

    useEffect(()=>{
        if (code) {
            console.log(code, '|', state)
            axios.post(`https://gugu-prod.auth.us-east-2.amazoncognito.com/oauth2/token`, qs.stringify({
                grant_type: "authorization_code",
                code: code,
                client_id: "6ddeh1teq2kvff2abrn4qdrvr5",
                redirect_uri: "https://gugu.vercel.app/callback"
            }), {
                headers: {
                    "content-type": 'application/x-www-form-urlencoded'
                }
            })
            .then((res=>{
                console.log(res)
            }))
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