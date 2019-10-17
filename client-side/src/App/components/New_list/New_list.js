import React from "react";
import {Redirect, NavLink} from "react-router-dom";
import {url} from "../../../config/url_config";

import InfoMessages from "../InfoMessages";

class NewList extends React.Component {
    constructor() {
        super();
        this.state = {
            name: null,
            messages: false,
            completed: false
        }
    }

    handleChange = (target, e) => {
        const val = e.target.value;
        this.setState((prevState) => {
            return {target: prevState[target] = val}
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const val = {username: this.props.username, name: this.state.name};

        fetch(`${url}/grocery-list/create-list`, {
            method: "POST",
            body: JSON.stringify(val),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json().then((res) => {
            if (res.messages) {
                this.setState((prev) => {return {messages: prev.messages = res.messages}})
            } else {
                this.setState((prev) => {return {completed: prev.completed = true}})
            }
        }))
    }

    render() {
        if (!this.state.completed) {
            return (
                <div id="new-list">

                    <NavLink to="/">
                        <h3 className="back-button">Back</h3>
                    </NavLink>

                    <InfoMessages messages={this.state.messages} />

                    <h1>Create a new list</h1>
                    <form className="standard-form">
                    
                        <div className="form-section">
                            <label htmlFor="name">Name of new grocery list</label>
                            <input type="text" name="name" placeholder="Name" onChange={(e) => this.handleChange("name", e)} />
                        </div>

                        <button className="submit-button" onClick={this.handleSubmit}>Create</button>

                    </form>
                </div>
            )
        } else {
             return <Redirect to={"/"} />
        }
    }
}

export default NewList;