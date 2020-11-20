import React from "react";
import "./Navbar.css";

const navbar = (props) => {
    return (   
        <header className="navbar">
            <div className="navbar-navigation">
                <div className="navbar-logo"><a href="/">MoneyVestor</a></div>
                <div className="navbar-items">
                    <ul>
                        <li className="items"><a href="/how-it-works">How it works</a></li>
                        <li className="items"><a href="/investing-basics">Beginner's guide</a></li>
                        {props.loggedIn && <li className="items"><a href="/trade">Trade</a></li>}
                    </ul>
                </div>
                <div className="spacer" />
                <div className="navbar-links">
                    <ul>
                        {!props.loggedIn && <li className="links"><a href="/login">Login</a></li>}
                        {props.loggedIn && <li className="links"><a href="/" onClick={props.logoutUser}>Log Out</a></li>}
                        {!props.loggedIn && <li><button class="button"><a href="/signup">Sign Up</a></button></li>}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default navbar;
