import React from "react";
import {NavLink} from "react-router-dom";

// Component to redirect user to sign-in or sign-up
function Selection() {
    return (
        <div id="home">
            <h1>Welcome to Wicked Ways Grocery lists</h1>
            <NavLink to="/user/sign-in">
                <div className="sign-in-section">
                    <h3>Please Sign In</h3>
                    <h2>Sign In</h2>
                </div>
            </NavLink>
            <h2>Or</h2>
            <NavLink to="/user/sign-up">
                <div className="sign-up-section">
                    <h3>If you are new here</h3>
                    <h2>Sign Up</h2>
                </div>
            </NavLink>
        </div>
    )
}

export default Selection;