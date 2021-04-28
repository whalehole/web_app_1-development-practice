// COMPONENTS
import CreateAccountButton from '../components/buttons/create_account_button'
import SignInButton from '../components/buttons/signin_button'

export default function GuestControlPanel() {
    return (
        <>
            <div className="guestcontrolpanel-grid-container">
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
                    <CreateAccountButton />
                </div>
                <div className="guestcontrolpanel-grid-item2">
                    <SignInButton />
                </div>
            </div>
        </>
    )
}