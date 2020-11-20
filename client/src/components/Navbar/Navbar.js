import React from "react";
import "./Navbar.css";

const navbar = () => {
    return (   
        <header className="navbar">
            <div className="navbar-navigation">
                <div className="navbar-logo"><a href="/">MoneyVestor</a></div>
                <div className="navbar-items">
                    <ul>
                        <li className="items"><a href="/how-it-works">How it works</a></li>
                        <li className="items"><a href="/investing-basics">Beginner's guide</a></li>
                        <li className="items"><a href="/trade"></a>Trade</li>
                    </ul>
                </div>
                <div className="spacer" />
                <div className="navbar-links">
                    <ul>
                        <li className="links"><a href="/login">Login</a></li>
                        <li className="links"><a href="/">Log Out</a></li>
                        <li><button class="button"><a href="/signup">Sign Up</a></button></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default navbar;
