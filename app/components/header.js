import { useState, useEffect } from 'react'
import Image from 'next/image'
// COMPONENTS
import SearchBar from './search_bar'
import GuestControlPanel from '../components/guest_control_panel'
import UserControlPanel from '../components/user_control_panel'

export default function Header(props) {

    console.log('component | header.js | signed in =>', props.signedIn)
    return (
        <>
            <div className="header-grid-container">
                {/* STYLES */}
                <style jsx>{`
                    // MOBILE 
                    // DESKTOP (breakpoints: 320px, 640px, 1024px)
                    
                    @media only screen and (min-width: 1200px) {
                        .header-grid-container {
                            max-width: 100%;
                            height: 60px;
                            padding: 7px 7px 7px 7px;
                            display: grid;
                            grid-template-columns: minmax(225px, 1fr) 500px minmax(441px, 1fr);
                            grid-gap: 10px;
                        }
                        .header-grid-item1 {
                            height: 100%;
                            text-align: start;
                        }
                        .header-grid-item2 {
                            height: 100%;
                        }
                        .header-grid-item3 {
                            height: 100%;
                        }
                    }
                `}</style>
                {/* LOGO */}
                <div className="header-grid-item1">
                    <Image 
                        src="/images/logo.svg"
                        height={40}
                        width={220}
                        alt="logo.svg"
                    />
                </div>
                {/* SEARCH BAR COMPONENT */}
                <div className="header-grid-item2">
                    <SearchBar />
                </div>
                {/* USER CONTROLS COMPONENT */}
                <div className="header-grid-item3">
                    {/* GUEST CONTROLS */}
                    {props.signedIn ? <UserControlPanel /> : <GuestControlPanel />}
                    {/* USER CONTROLS */}
                </div>
            </div>
        </>
    )
}