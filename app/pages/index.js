import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { setCookie, getCookie, checkCookie } from '../src/cookie'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
// COMPONENTS
import Header from '../components/header'
import Div from '../components/div'
// SCRIPTS
import { signedIn } from '../src/signin_status';

// HOME PAGE
export default function Home() {
  // SIGN-IN FETCH
  const { isLoading, isError, data, error } = useQuery('data', signedIn, { refetchOnWindowFocus: false })

  // STATES
  // ONE-TIME SETUP
  useEffect(()=>{

  }, [])

  if (isLoading) {return null}
  return (
    <>
      {console.log("page | index.js | signed in =>", data.data.isAuthenticated)}
      <Head>
        <title>Gu Gu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      {/* BODY */}
      <div className="first-container">
        {/* STYLES */}
        <style jsx>{`
          // MOBILE
          // DESKTOP
          @media only screen and (max-width: 576px) {
            .content-container {
              display: grid;
              grid-template-columns: repeat(16, [col-start] 1fr);
              width: 100%;
            }
          }
          @media only screen and (min-width: 576px) {
            .content-container {
              display: grid;
              grid-template-columns: repeat(16, [col-start] 1fr);
              width: 540px;
            }
          }
          @media only screen and (min-width: 768px) {
            .content-container {
              display: grid;
              grid-template-columns: repeat(16, [col-start] 1fr);
              width: 720px;
            }
          }
          @media only screen and (min-width: 992px) {
            .content-container {
              display: grid;
              grid-template-columns: repeat(16, [col-start] 1fr);
              width: 960px;
            }
          }
          @media only screen and (min-width: 1200px) {
            .content-container {
              width: 1500px;
            }
            .home-left-panel {
              display: inline-block;
              width: 375px;
              height: max-content;
              background-color: lightcoral;
            }
            .home-center-panel {
              display: inline-block;
              width: 750px;
              height: max-content;
              background-color: lightcoral;
            }
            .home-right-panel {
              display: inline-block;
              width: 375px;
              height: max-content;
              background-color: lightcoral;
            }
          }
          .content-container {
            background-color: lightgray;
            margin: auto;
            margin-top: 800px;
          }
        `}</style>
        
        {/* HEADER */}
        <Header signedIn={data.data.isAuthenticated}/>

        {/* CONTENT */}
        <div className="content-container">
          {/* LEFT SIDE PANEL */}
          <div className="home-left-panel">hi</div>
          {/* CENTER PANEL */}
          <div className="home-center-panel">
            hi
            {/* EMOTION SELECTOR */}
            <div>hi</div>
            {/* CONTENT FLOW CARDS */}
          </div>
          {/* RIGHT SIDE PANEL */}
          <div className="home-right-panel">hi</div>
        </div>
      </div>
    </>
  )
}
