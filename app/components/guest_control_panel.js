import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
// COMPONENTS
import CreateAccountButton from '../components/buttons/create_account_button'
import SignInButton from '../components/buttons/signin_button'
import RegisterModal from './register_modal';
import SigninModal from './signin_modal';

export default function GuestControlPanel() {
    // STATES
    const [regModal, setRegModal] = useState('noShow')
    const [signinModal, setSigninModal] = useState('noShow')
    // NODES

    // HANDLERS
    const handleShowRegModal = mode => {
        setRegModal(mode)
    }
    const handleShowSigninModal = mode => {
        setSigninModal(mode)
    }

    return (
        <>
            <div className="guestcontrolpanel-grid-container">
                <RegisterModal setMode={handleShowRegModal} mode={regModal} />
                <SigninModal setMode={handleShowSigninModal} mode={signinModal} />
                {/* STYLES */}
                <style jsx>{`
                    // MOBILE
                    // DESKTOP 
                    .guestcontrolpanel-grid-container {
                        display: grid;
                        grid-gap: 10px;
                        grid-template-columns: repeat(2, [col-start] minmax(40px, auto));
                        height: 100%;
                        justify-content: end;
                    }
                    .guestcontrolpanel-grid-item1 {
                        display: flex;
                        align-items: center;
                    }
                    .guestcontrolpanel-grid-item2 {
                        display: flex;
                        align-items: center;
                    }
                `}</style>
                <div className="guestcontrolpanel-grid-item1">
                    <Link href="">
                        <a id="registerButton" onClick={()=>{handleShowRegModal('show')}}>Create account</a>
                    </Link>
                </div>
                <div className="guestcontrolpanel-grid-item2">
                    <Link href="">
                        <a id="signinButton" onClick={()=>{handleShowSigninModal('show')}}>Sign in</a>
                    </Link>
                </div>
            </div>
        </>
    )
}