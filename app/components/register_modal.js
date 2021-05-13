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
import { signedIn } from '../src/signin_status';

export default function RegisterModal(props) {
    // STATES

    // INPUT VALUES
    const email = useRef()
    const password = useRef()
    const firstName = useRef()
    const surname = useRef()
    const username = useRef()
    const birthdate = useRef()
    const gender = useRef()
    const countryFullName = useRef()

    // NODES
    const modal = useRef()

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
                    'custom:gender': gender.current.value,
                    'custom:countryfullname': countryFullName.current.value
                } 
            });
            console.log('register_modal.js | registered user into IDP | response | ', user)
            axios.post(`http://localhost:8000/oauth/register`, {
                userEmail: email.current.value,
                birthdate: birthdate.current.value,
                firstName: firstName.current.value,
                surname: surname.current.value,
                username: username.current.value,
                gender: gender.current.value,
                country: countryFullName.current.value,
                sub: user.userSub,
                language: 'english'
            }, { withCredentials: true })
            .then((resp)=>{
                console.log('register_modal.js | logged user into database! | ', resp)
            })
            .catch((err)=>{
                console.log('register_modal.js | error logging user into database | ', err)
            })
            // Router.push('/verification')
        } catch (error) {
            console.log('register_modal.js | error signing up', error);
            console.log(error.code)
        }
    }
    // HANDLERS
    const handleRegister = event => {
        // VALIDATION
        register()
    }
    // const handleClickOutside = event => {
    //     if (modal.current && !modal.current.contains(event.target) && event.target != document.getElementById("registerButton")) {
    //         props.setMode('')
    //     }
    // }
    // EFFECTS ON CHANGE
    useEffect(()=>{
        // document.addEventListener('mousedown', handleClickOutside)
    }, [])

    if (props.mode !== 'show') {return null}
    return (
        <>
            <div ref={modal} className="registermodal-grid-container">
                <style jsx>{`
                input:focus, select:focus {
                    outline-style: none;
                    box-shadow: 0 0 0 2pt lightgray;
                }
                .registermodal-grid-container {
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
                .registermodal-grid-container {
                    display: grid;
                    grid-template-rows: auto auto auto;
                    grid-gap: 10px;
                    width: 400px;
                    background-color: white;
                    position: fixed;
                    top: 30vh;
                    left: 50%;
                    margin-left: -200px;
                    padding: 15px;
                    z-index: 1;
                }
                .registermodal-grid-item1 > p:nth-child(1) {
                    font-size: 30px;
                    font-weight: bold;
                    margin: 0px;
                }
                .registermodal-grid-item1 > p:nth-child(2) {
                    margin: 0px;
                }
                .registermodal-grid-item2 input, select {
                    width: 100%;
                    height: 45px;
                    border-radius: 10px;
                    border: 1px solid black;
                    margin: 5px auto 5px auto;
                    padding: 1px 15px 1px 15px;
                    font-size: 17px;
                }
                .registermodal-grid-item2 {
                    height: 390px;
                }
                .registermodal-grid-item2 > div > input:nth-of-type(1) {
                    width: 178px;
                    margin-right: 12px;
                }
                .registermodal-grid-item2 > div > input:nth-of-type(2) {
                    width: 178px;
                }
                .registermodal-grid-item2 > div > div:nth-of-type(1) {
                    display: inline-block;
                    width: 190px;
                    margin-right: 12px;
                }
                .registermodal-grid-item2 > div > div:nth-of-type(2) {
                    display: inline-block;
                    width: 166px;
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
                .registermodal-grid-item2 > div > div {
                    margin-top: 10px;
                }
                .registermodal-grid-item3 > p {
                    font-size: 12px;
                    margin-bottom: 0px;
                }
                hr {
                    width: 100%;
                    height: 1px;
                }
                .overlay {
                    z-index: -1;
                    background-color: white;
                    opacity: 0.7;
                    position: fixed;
                    height: 100vh;
                    width: 100vw;
                    top: 0px;
                    left: 0px;
                }
                `}</style>
                {/* OVERLAY */}
                <div className="overlay"></div>
                {/* MODAL HEADER */}
                <div className="registermodal-grid-item1">
                    <p>Sign up</p>
                    <p>One step away to world domini..</p>
                    <hr></hr>
                </div>
                {/* USER LOGIN & REGISTER */}
                <div className="registermodal-grid-item2">
                    <div>
                        <input ref={firstName} type="text" placeholder="First name"/>
                        <input ref={surname} type="text" placeholder="Surname"/>
                        <input ref={email} type="text" placeholder="Email address"/>
                        <input ref={password} type="password" placeholder="Password"/>
                        <input ref={username} type="text" placeholder="Username"/>
                        <div>
                            <label htmlFor="registerDateOfBirthInput">Date of birth</label>
                            <input id="registerDateOfBirthInput" ref={birthdate} type="date" />
                        </div>
                        <div>
                            <label htmlFor="registerGenderInput">Gender</label>
                            <select id="registerGenderInput" ref={gender} required>
                                <option value="" disabled selected>---</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="registerCountryInput">Country</label>
                            <select id="registerCountryInput" ref={countryFullName} required>
                                <option value="" disabled selected>---</option>
                                <option value="singapore">Singapore</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="registermodal-grid-item3">
                    <p>By signing up, you agree to our Terms, Data Policy and Cookie Policy.</p>
                </div>
                <button type="button" onClick={handleRegister}>Sign up</button>
                <button type="button" onClick={()=>{props.setMode('')}}>Cancel</button>
            </div>
        </>
    )
}