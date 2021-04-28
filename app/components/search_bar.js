export default function SearchBar() {
    return (
        <>
            <div className="searchbar-container">
                <style jsx>{`
                    // MOBILE
                    // DESKTOP
                    @media only screen and (min-width: 1200px) {
                        .searchbar-container {
                            height: 100%;
                            width: 100%;
                        }
                        input {
                            height: 100%;
                            width: 100%;
                            padding: 0px 10px 0px 10px;
                            font-size: 16px;
                        }
                    }
                `}</style>
                <input type="text" placeholder="Search..." />
            </div>
        </>
    )
}