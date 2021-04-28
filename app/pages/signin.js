// PACKAGES
import axios from 'axios';
import { useQuery } from 'react-query';
// AWS IdP
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);
// NEXT
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// REACT
import { useRef, useState, useEffect } from 'react';
// SCRIPTS
import { signedIn } from '../src/signin_status';
// COMPONENTS
import RegisterModal from '../components/register_modal';

// SIGN IN PAGE
export default function SignInPage() {
    const router = useRouter()
    // PROMISES
    const { isLoading, isError, data, error } = useQuery('data', signedIn, { refetchOnWindowFocus: false })
    // STATES
    const [modal, setModal] = useState('noShow')
    
    // INPUT VALUES
    const email = useRef()
    const password = useRef()

    // FUNCTIONS
    async function signIn() {
        try {
            const user = await Auth.signIn(email.current.value, password.current.value)
            console.log("aws promise | signin.js | sign-in success response =>", user)
            axios.post(`http://localhost:8000/oauth/signin`, {
                accessToken: user.signInUserSession.accessToken.jwtToken,
                refreshToken: user.signInUserSession.refreshToken.token,
                idToken: user.signInUserSession.idToken.jwtToken
            }, { withCredentials: true })
            .then((resp)=>{
                console.log("axios promise | signin.js | tokens validation success response =>", resp)
                router.replace('/')
            })
        } catch (error) {
            console.log("promise | signin.js | sign-in failure response =>", error)
        }
    }

    // HANDLERS
    const handleSignIn = event => {
        // VALIDATION
        signIn()
    }
    const handleShowModal = mode => {
        setModal(mode)
    }

    // EFFECTS ON CHANGE
    useEffect(()=>{

    }, [])

    if (isLoading) {return null}
    else if (data.data.isAuthenticated) {router.replace('/')}
    if (isError) {return null}
    return (
        <>
            {console.log("page | signin.js | signed in =>", data.data.isAuthenticated)}
            <RegisterModal setMode={handleShowModal} mode={modal} />
            <div className="signinpage-grid-container">
                <style jsx>{`
                // MOBILE
                // DESKTOP
                .signinpage-grid-container {
                    display: grid;
                    grid-template-rows: 80px 170px 30px 40px 100px;
                    grid-gap: 10px;
                    width: 400px;
                    height: 450px;
                    margin: auto;
                    margin-top: 20vh;
                }
                .signinpage-grid-item1 {
                    height: 100%;
                    text-align: center;
                }
                .signinpage-grid-item2 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .signinpage-grid-item2 > div > input {
                    display: flex;
                    width: 250px;
                    height: 40px;
                    border-radius: 25px;
                    border: 1px solid black;
                    justify-content: center;
                    align-items: center;
                    margin: 10px auto 10px auto;
                }
                .signinpage-grid-item2 > div > button {
                    margin: auto;
                    display: block;
                    width: 250px;
                    height: 40px;
                    font-size: 16px;
                    border-radius: 25px;
                    border: 1px solid black;
                }
                .signinpage-grid-item3 > p {
                    text-align: center;
                    font-size: 12px;
                }
                .signinpage-grid-item4 {
                    display: grid;
                    grid-template-columns: repeat(4, 40px);
                    justify-content: center;
                    grid-gap: 15px;
                }
                .signinpage-grid-item4-1 {
                    height: 40px;
                }
                hr {
                    width: 150px;
                }
                `}</style>
                {/* LOGO */}
                <div className="signinpage-grid-item1">
                    <Image 
                        src="/../public/images/logo.svg"
                        height={"40px"}
                        width={""}
                        alt="logo.svg"
                    />
                    <p>Bringing hearts together</p>
                </div>
                {/* USER LOGIN & REGISTER */}
                <div className="signinpage-grid-item2">
                    <div>
                        <input ref={email} type="text" />
                        <input ref={password} type="password" />
                        <button onClick={handleSignIn}>Sign in</button>
                    </div>
                </div>
                <div className="signinpage-grid-item3"><p>Sign in with</p></div>
                {/* FEDERATED LOGINS */}
                <div className="signinpage-grid-item4">
                    <div className="signinpage-grid-item4-1">
                        <a type="button" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>
                            <Image 
                                src="/../public/images/facebook-logo.svg"
                                height={40}
                                width={40}
                                alt="facebook-logo.svg"
                            />
                         </a>
                    </div>
                    <div className="signinpage-grid-item4-1">
                        <Link href=""><a>
                            <Image 
                                src="/../public/images/twitter-logo.svg"
                                height={40}
                                width={40}
                                alt="twitter-logo.svg"
                            />
                            </a></Link>
                    </div>
                    <div className="signinpage-grid-item4-1">
                        <Link href=""><a>
                            <Image 
                                src="/../public/images/google-logo.svg"
                                height={40}
                                width={40}
                                alt="google-logo.svg"
                            />
                            </a></Link>
                    </div>
                    <div className="signinpage-grid-item4-1">
                        <Link href="/"><a>
                            <Image 
                                src="/../public/images/apple-logo.svg"
                                height={40}
                                width={40}
                                alt="apple-logo.svg"
                            />
                            </a></Link>
                    </div>
                </div>
                {/* WARNING */}
                <div className="signinpage-grid-item5">
                    <hr></hr>
                    <p></p>
                </div>
                <button type="button" onClick={()=>{handleShowModal('show')}}>show modal</button>
            </div>
        </>
    )
}