// COMPONENTS
import CreateAccountButton from '../components/buttons/create_account_button'
import SignOutButton from '../components/buttons/signout_button'

export default function UserControlPanel() {
    return (
        <>
            <div className="usercontrolpanel-grid-container">
                {/* STYLES */}
                <style jsx>{`
                    // MOBILE
                    // DESKTOP 
                    .usercontrolpanel-grid-container {
                        display: grid;
                        grid-gap: 10px;
                        grid-template-columns: repeat(2, [col-start] minmax(40px, auto));
                        height: 100%;
                        justify-content: end;
                    }
                    .usercontrolpanel-grid-item1 {
                        display: flex;
                        align-items: center;
                    }
                    .usercontrolpanel-grid-item2 {
                        display: flex;
                        align-items: center;
                    }
                `}</style>
                <div className="usercontrolpanel-grid-item1">

                </div>
                <div className="usercontrolpanel-grid-item2">
                    <SignOutButton />
                </div>
            </div>
        </>
    )
}