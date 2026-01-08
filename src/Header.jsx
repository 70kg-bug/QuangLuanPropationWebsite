import "./Header.css"
const Header = () => {
    return (
        <>
            <header className="main-header">
                <div className="logo"><h3>MY NOTES</h3></div>
                <div className="signIn-signUp">
                    <a href="">Sign in</a> | <a href="">Sign up</a>
                </div>
            </header>
            <hr />
        </>
    )
}
export default Header