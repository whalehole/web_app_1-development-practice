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
import Router from 'next/router';
// REACT
import { useRef, useState, useEffect } from 'react';
// SCRIPTS
// COMPONENTS
import RegisterModal from '../components/register_modal';

// SIGN IN PAGE
export default function RegisterPage() {
    // SIGN IN FETCH
    const { isLoading, isError, data, error } = useQuery('data', signedIn, { refetchOnWindowFocus: false })
    // STATES
    const [modal, setModal] = useState('noShow')

    // INPUT VALUES
    const email = useRef()
    const password = useRef()
    const firstName = useRef()
    const surname = useRef()
    const username = useRef()
    const birthdate = useRef()
    const gender = useRef()

    // FUNCTIONS
    async function register() {
        try {
            const user = await Auth.signUp({
                username: email.current.value, 
                password: password.current.value, 
                attributes: {
                    'custom:username': username.current.value,
                    'custom:birthdate': birthdate.current.value,
                    'custom:first_name': firstName.current.value,
                    'custom:surname': surname.current.value,
                    'custom:gender': gender.current.value
                } 
            });
            console.log(user)
            Router.replace('/verification')
        } catch (error) {
            console.log('error signing up', error);
            console.log(error.code)
        }
    }
    // HANDLERS
    const handleRegister = event => {
        // VALIDATION
        register()
    }
    const handleShowModal = mode => {
        setModal(mode)
    }
    // EFFECTS ON CHANGE
    useEffect(()=>{

    }, [])

    if (isLoading) {return null}
    return (
        <>
            <div className="signinpage-grid-container">
                <style jsx>{`
                input[type=text]:focus {
                    outline-style: none;
                    box-shadow: 0 0 0 2pt gray;
                }
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
                    padding: 1px 15px 1px 15px;
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
                        <input ref={firstName} type="text" placeholder="First name"/>
                        <input ref={surname} type="text" placeholder="Surname"/>
                        <input ref={email} type="text" placeholder="Email address"/>
                        <input ref={password} type="password" placeholder="Password"/>
                        <input ref={username} type="text" placeholder="Username"/>
                        <input ref={birthdate} type="text" />
                        <input ref={gender} type="text" />
                        <button onClick={handleRegister}>Sign up</button>
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
                <RegisterModal setMode={handleShowModal} mode={modal} />
                <button type="button" onClick={()=>{handleShowModal('show')}}>show modal</button>
            </div>
        </>
    )
}