// PACKAGES
import axios from 'axios';
// NEXT 
import Link from "next/link"
import Router from "next/router"
// AWS IdP
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
Amplify.configure(awsconfig);

export default function SignOutButton() {
    // FUNCTIONS
    // async function signOut() {
    //     try {
    //         const user = await Auth.signOut();
    //         console.log(user)
    //     } catch (error) {
    //         console.log('error signing out', error);
    //     }
    // }
    // HANDLERS
    const handleSignOut = event => {
        // SIGNOUT
        axios.get(`https://gugu.to/oauth/signout`, { withCredentials: true })
        .then((res)=>{
            console.log("axios promise | signout_button.js | sign-out success response =>", res)
            Router.reload()
        })
    }

    return (
        <>
            <button onClick={handleSignOut} type="button">Sign out</button>
        </>
    )
}