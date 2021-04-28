// NEXT
import Image from 'next/image';
import Link from 'next/link';

// USER SIGN IN & REGISTER PAGE
export default function GatePage() {
    return (
        <>
            <div className="gatepage-grid-container">
                <style jsx>{`
                // MOBILE
                // DESKTOP
                .gatepage-grid-container {
                    display: grid;
                    grid-template-rows: 80px 130px 30px 40px 100px;
                    grid-gap: 10px;
                    width: 400px;
                    height: 450px;
                    margin: auto;
                    margin-top: 20vh;
                }
                .gatepage-grid-item1 {
                    height: 100%;
                    text-align: center;
                }
                .gatepage-grid-item2 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .gatepage-grid-item2 > div > a {
                    display: flex;
                    background-color: lightcoral;
                    width: 250px;
                    height: 40px;
                    border-radius: 25px;
                    justify-content: center;
                    align-items: center;
                    margin: 10px auto 10px auto;
                }
                .gatepage-grid-item3 > p {
                    text-align: center;
                    font-size: 12px;
                }
                .gatepage-grid-item4 {
                    display: grid;
                    grid-template-columns: repeat(4, 40px);
                    justify-content: center;
                    grid-gap: 15px;
                }
                .gatepage-grid-item4-1 {
                    height: 40px;
                }
                hr {
                    width: 150px;
                }
                `}</style>
                {/* LOGO */}
                <div className="gatepage-grid-item1">
                    <Image 
                        src="/../public/images/logo.svg"
                        height={"40px"}
                        width={""}
                        alt="logo.svg"
                    />
                    <p>Bringing hearts together</p>
                </div>
                {/* USER LOGIN & REGISTER */}
                <div className="gatepage-grid-item2">
                    <div>
                        <Link href="/signin"><a>Login</a></Link>
                        <Link href="/register"><a>Create account</a></Link>
                    </div>
                </div>
                <div className="gatepage-grid-item3"><p>Sign in with</p></div>
                {/* FEDERATED LOGINS */}
                <div className="gatepage-grid-item4">
                    <div className="gatepage-grid-item4-1">
                        <Link href="/"><a>
                            <Image 
                                src="/../public/images/facebook-logo.svg"
                                height={40}
                                width={40}
                                alt="facebook-logo.svg"
                            />
                            </a></Link>
                    </div>
                    <div className="gatepage-grid-item4-1">
                        <Link href=""><a>
                            <Image 
                                src="/../public/images/twitter-logo.svg"
                                height={40}
                                width={40}
                                alt="twitter-logo.svg"
                            />
                            </a></Link>
                    </div>
                    <div className="gatepage-grid-item4-1">
                        <Link href=""><a>
                            <Image 
                                src="/../public/images/google-logo.svg"
                                height={40}
                                width={40}
                                alt="google-logo.svg"
                            />
                            </a></Link>
                    </div>
                    <div className="gatepage-grid-item4-1">
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
                <div className="gatepage-grid-item5">
                    <hr></hr>
                    <p></p>
                </div>
            </div>
        </>
    )
}