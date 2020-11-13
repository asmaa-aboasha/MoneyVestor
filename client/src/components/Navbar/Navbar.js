import React from "react";
import "./Navbar.css";

const navbar = () => {
    return (   
        <header className="navbar">
            <div className="navbar-navigation">
                <div className="navbar-logo"><a href="/">MoneyVestor</a></div>
                <div className="spacer" />
                <div className="navbar-items">
                    <ul>
                        <li className="login-link"><a href="">Login</a></li>
                        <li><button class="button"><a href="">Get Started</a></button></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
    
export default navbar;
