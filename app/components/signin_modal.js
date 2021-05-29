// PACKAGES
import axios from 'axios';
import { useQuery } from 'react-query';
// AWS IdP
import Amplify, { Auth, Cache } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);
// NEXT
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// REACT
import { useRef, useState, useEffect } from 'react';
// SCRIPTS
import { signedIn } from '../src/GET-local_signin_status';
// COMPONENTS

export default function SigninModal(props) {
    const router = useRouter()

    // STATES
    const [user, setUser] = useState(null);

    // INPUT VALUES
    const email = useRef()
    const password = useRef()
    const modal = useRef()

    // FUNCTIONS
    async function signIn() {
        try {
            const user = await Auth.signIn(email.current.value, password.current.value)
            console.log("aws promise | signin.js | sign-in success response =>", user)
            axios.post(`https://gugu.to/oauth/signin`, {
                accessToken: user.signInUserSession.accessToken.jwtToken,
                refreshToken: user.signInUserSession.refreshToken.token,
                idToken: user.signInUserSession.idToken.jwtToken
            }, { withCredentials: true })
            .then((resp)=>{
                console.log("axios promise | signin_modal.js | tokens validation success response =>", resp)
                router.replace('/')
            })
        } catch (error) {
            console.log("promise | signin_modal.js | sign-in failure response =>", error)
        }
    }

    // HANDLERS
    const handleSignIn = event => {
        // VALIDATION
        signIn()
    }
    const handleClickOutside = event => {
        if (modal.current && !modal.current.contains(event.target) && event.target != document.getElementById("signinButton")) {
            props.setMode('')
        }
    }
    // EFFECTS ONCE
    useEffect(()=>{
        // TOGGLE VIEW OF MODAL 
        if (!window.FB) createScript();
        document.addEventListener('mousedown', handleClickOutside)
    }, [])

    //////////////////////////////////////////////////////
    const federatedSignIn = () => {
        const fb = window.FB;
        fb.getLoginStatus(response => {
            if (response.status === 'connected') {
                getAWSCredentials(response.authResponse);
            } else {
                fb.login(
                    response => {
                        if (!response || !response.authResponse) {
                            return;
                        }
                        getAWSCredentials(response.authResponse);
                    },
                    {
                        // the authorized scopes
                        scope: 'public_profile,email'
                    }
                );
            }
        });
    }

    const getAWSCredentials = (response) => {
            const { accessToken, expiresIn } = response;
            const date = new Date();
            const expires_at = expiresIn * 1000 + date.getTime();
            if (!accessToken) {
                return;
            }

            const fb = window.FB;
            fb.api('/me', { fields: 'name,email' }, response => {
                const user = {
                    name: response.name,
                    email: response.email
                };

                Auth.federatedSignIn('facebook', { token: accessToken, expires_at }, user)
                .then(credentials => {
                    const federatedInfo = Cache.getItem('federatedInfo')
                    const { token } = federatedInfo
                    console.log(token);
                    console.log(federatedInfo)
                    console.log(credentials)
                });
            });
        }

    const createScript = () => {
        // load the sdk
        window.fbAsyncInit = fbAsyncInit;
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.onload = initFB;
        document.body.appendChild(script);
    }

    const initFB = () => {
        const fb = window.FB;
        console.log('FB SDK initialized');
    }

    const fbAsyncInit = () => {
        // init the fb sdk client
        const fb = window.FB;
        fb.init({
            appId   : '145983097440101',
            cookie  : true,
            xfbml   : true,
            version : 'v2.11'
        });
    }
    //////////////////////////////////////////////////////

    if (props.mode !== 'show') {return null}
    Auth.currentAuthenticatedUser()
    .then((user) => console.log(user))
    .catch(() => console.log("Not signed in"));
    Auth.signOut()
    return (
        <>
            <div ref={modal} className="sigininmodal-grid-container">
                <style jsx>{`
                input:focus, select:focus {
                    outline-style: none;
                    box-shadow: 0 0 0 2pt lightgray;
                }
                .sigininmodal-grid-container {
                    border-radius:10px;
                    border: 0px solid rgba(0, 0, 0, 0.3);
                    -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
                    -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
                    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
                    -webkit-background-clip: padding-box;
                    -moz-background-clip: padding-box;
                    background-clip: padding-box;
                }
                // MOBILE
                // DESKTOP
                .sigininmodal-grid-container {
                    display: grid;
                    grid-template-rows: auto auto auto;
                    grid-gap: 10px;
                    width: 250px;
                    background-color: white;
                    position: absolute;
                    top: 54px;
                    right: 10px;
                    padding: 15px;
                    z-index: 1;
                }
                .sigininmodal-grid-item1 input {
                    width: 100%;
                    height: 30px;
                    border-radius: 10px;
                    border: 1px solid black;
                    margin: 5px auto 5px auto;
                    padding: 1px 15px 1px 15px;
                    font-size: 14px;
                }
                button:nth-of-type(1) {
                    background-color: rgb(49, 156, 49);
                    color: white;
                    font-weight: bold;
                    font-size: 15px;
                }
                button:nth-of-type(2) {
                    background-color: rgb(201, 69, 69);
                    color: white;
                    font-weight: bold;
                    font-size: 15px;
                }
                .sigininmodal-grid-item1 > div > div {
                    margin-top: 10px;
                }
                .sigininmodal-grid-item1 a {
                    font-size: 10px;
                    margin-bottom: 0px;
                    float: right;
                    text-decoration: underline;
                }
                .signinmodal-grid-item4-1 > p {
                    font-size: 12px;
                    text-align: center;
                }
                .signinmodal-grid-item4-2 {
                    display: grid;
                    grid-template-columns: repeat(4, 35px);
                    justify-content: center;
                    grid-gap: 15px;
                }
                .signinmodal-grid-item4-2-1 {
                    height: 35px;
                }
                hr {
                    width: 100%;
                    height: 1px;
                }
                `}</style>
                {/* USER LOGIN & siginin */}
                <div className="sigininmodal-grid-item1">
                    <div>
                        <input ref={email} type="email" placeholder="Email"/>
                        <input ref={password} type="password" placeholder="Password"/>
                        <Link href="">
                            <a>forgotten password</a>
                        </Link>
                    </div>
                </div>
                <button type="button" onClick={handleSignIn}>Sign in</button>
                {/* <button type="button" onClick={()=>{props.setMode('')}}>Cancel</button> */}
                <div className="signinmodal-grid-item4">
                    <div className="signinmodal-grid-item4-1">
                        <p>Or sign in with</p>
                    </div>
                    <div className="signinmodal-grid-item4-2">
                        <div className="signinmodal-grid-item4-2-1">
                            <a type="button" onClick={federatedSignIn}>
                                <Image 
                                    src="/images/facebook-logo.svg"
                                    height={35}
                                    width={35}
                                    alt="facebook-logo.svg"
                                />
                            </a>
                        </div>
                        <div className="signinmodal-grid-item4-2-1">
                            <Link href=""><a>
                                <Image 
                                    src="/images/twitter-logo.svg"
                                    height={35}
                                    width={35}
                                    alt="twitter-logo.svg"
                                />
                                </a></Link>
                        </div>
                        <div className="signinmodal-grid-item4-2-1">
                            <a type="button" onClick={() => Auth.federatedSignIn({provider: 'Google'})}>
                                <Image 
                                    src="/images/google-logo.svg"
                                    height={35}
                                    width={35}
                                    alt="google-logo.svg"
                                />
                            </a>
                        </div>
                        <div className="signinmodal-grid-item4-2-1">
                            <Link href="/"><a>
                                <Image 
                                    src="/images/apple-logo.svg"
                                    height={35}
                                    width={35}
                                    alt="apple-logo.svg"
                                />
                                </a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}