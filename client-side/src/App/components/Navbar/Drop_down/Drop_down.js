import React from "react";
import {NavLink} from "react-router-dom";

export default function DropDown(props) {

    if (props.menuState) {
        if (props.loggedIn) {
            return (
                <div id="drop-down-container">
                    <nav id="drop-down">
    
                        <NavLink to="/">
                            <h3 onClick={props.toggleMenu}>Grocery Lists</h3>
                        </NavLink>
    
                        <NavLink to="/grocery-list/new-list">
                            <h3 onClick={props.toggleMenu}>Create Grocery List</h3>
                        </NavLink>
    
                        <NavLink to="/user">
                            <h3 onClick={props.signOut}>Log Out</h3>
                        </NavLink>
    
                        <small onClick={props.toggleMenu}>X</small>
    
                    </nav>                
                </div>
            )
        } else {
            return (
                <div id="drop-down-container">
                    <nav id="drop-down">

                        <NavLink to="/user/sign-in" >
                            <h3 onClick={props.toggleMenu}>Sign In</h3>
                        </NavLink>

                        <NavLink to="/user/sign-up">
                            <h3 onClick={props.toggleMenu}>Sign Up</h3>
                        </NavLink>

                        <small onClick={props.toggleMenu}>X</small>

                    </nav>
                </div>
            )
        }
    } else {
        return null
    }

}