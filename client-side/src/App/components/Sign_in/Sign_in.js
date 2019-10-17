import React from "react";
import {Redirect, NavLink} from "react-router-dom";
import {url} from "../../../config/url_config";

import InfoMessages from "../InfoMessages";


class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            messages: false,
            completed: false
        };
    }

// Handle Change -----------------------------------------------------
    handleChange = (target, e) => {
        const val = e.target.value;
        this.setState((prevState) => {
            return {target: prevState[target] = val}
        });
    }

// Handle Submit -----------------------------------------------------
    handleSubmit = (e) => {
        e.preventDefault();

        const val = JSON.stringify(this.state);

        fetch(`${url}/user/sign-in`, {
            method: "POST",
            body: val,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json().then((res) => {
            if (res.messages) {
                // Handle errors
                this.setState((prev) => {return {messages: prev.messages = res.messages}})
            } else {
                this.props.updateLoggedIn(res.username, true);
                this.setState((prev) => {return {completed: prev.completed = true}});
            }
        }))
    }

// Render ==============================================================================
    render() {
        if (!this.state.completed) {
            // If user has not signed in, show log-in inputs
            return (
                <div id="sign-in">

                    <NavLink to="/">
                        <h3 className="back-button">Back</h3>
                    </NavLink>

                    <InfoMessages messages={this.state.messages} />

                    <form className="standard-form">

                        <div className="form-section">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                placeholder="Username"
                                onChange={(e) => this.handleChange("username", e)}
                            ></input>
                        </div>

                        <div className="form-section">
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                name="password"
                                value={this.state.password}
                                placeholder="Password"
                                onChange={(e) => this.handleChange("password", e)}
                            ></input>
                        </div>

                        <button className="submit-button" onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>
            )
        } else {
            // if user has signed in, redirect to Landing
            return <Redirect to="/" />
        }
    }
}

export default SignIn;