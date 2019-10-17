import React from "react";
import {Redirect, NavLink} from "react-router-dom";
import {url} from "../../../config/url_config";

import InfoMessages from "../InfoMessages";

class NewList extends React.Component {
    constructor() {
        super();

        this.state = {
            itemName: "",
            quantity: "",
            location: "",
            messages: false,
            created: false
        };
    }

// Handle Change --------------------------------------------------------
    handleChange = (target, e) => {
        const val = e.target.value;

        this.setState((prevState) => {
            return {target: prevState[target] = val}
        });
    }

// Handle Submit --------------------------------------------------------
    handleSubmit = (e) => {
        e.preventDefault()

        // Create grocery item values to create grocery item
        let val = this.state;
        val.groceryListName = this.props.url.match.params.name;
        val.username = this.props.username;
        val = JSON.stringify(val);

        // Send grocery item data to server
        fetch(`${url}/grocery-item/create-item`, {
            method: "POST",
            body: val,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json().then((res) => {
            if (res.messages) {
                this.setState((prev) => {return {messages: prev.messages = res.messages}})
            } else {
                this.setState((prev) => {return {created: prev.created = true}})
            }
        }))
    }

// Render ===================================================================
    render() {
        if (!this.state.created) {
            return (
                <div id="new-item">

                    <NavLink to={`/grocery-list/show/${this.props.url.match.params.name}`}>
                        <h3 className="back-button">Back</h3>
                    </NavLink>

                    <InfoMessages messages={this.state.messages} />

                    <form className="standard-form">

                        <div className="form-section">
                            <label htmlFor="name">New Item Name</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                placeholder="Name"
                                onChange={(e) => this.handleChange("itemName", e)}
                            ></input>
                        </div>

                        <div className="form-section">
                            <label htmlFor="quantity">Quantity of item</label>
                            <input
                                type="text"
                                name="quantity"
                                value={this.state.quantity}
                                placeholder="Quantity"
                                onChange={(e) => this.handleChange("quantity", e)}
                            ></input>
                        </div>

                        <div className="form-section">
                            <label htmlFor="location">Desired Location to Purchase</label>
                            <input
                                type="text"
                                name="location"
                                value={this.state.location}
                                placeholder="Location"
                                onChange={(e) => this.handleChange("location", e)}
                            ></input>
                        </div>

                        <button className="submit-button" onClick={this.handleSubmit}>Create New Item</button>

                    </form>
                </div>
            )
        } else {
            return <Redirect to={`/grocery-list/show/${this.props.url.match.params.name}`} />
        }
    }
}

export default NewList;