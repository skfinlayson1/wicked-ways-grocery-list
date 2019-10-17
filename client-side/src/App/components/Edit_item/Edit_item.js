import React from "react";
import {Redirect, NavLink} from "react-router-dom";
import {url} from "../../../config/url_config";

import InfoMessages from "../InfoMessages";

class EditItem extends React.Component {
    constructor() {
        super();

        this.state = {
            name: null,
            groceryListName: null,
            quantity: null,
            location: null,
            messages: false,
            loading: true,
            completed: false
        }
    }

// Component will mount -------------------------------------------------------------
    componentWillMount() {
        if (this.props.url) {
            this.setState((prev) => {return {groceryListName: prev.groceryListName = this.props.url.match.params.groceryListName}})
            // Initial fetch for specific grocery list data
            fetch(`${url}/grocery-item/find/${this.props.url.match.params.groceryListName}/${this.props.url.match.params.name}`)
            .then((res) => res.json().then((res) => {
                if (res.messages) {
                    // Handle errors
                    this.setState((prev) => {return {messages: prev.message = res.messages}})
                } else {
                    // Set state values to specified grocery list
                    this.setState((prev) => {
                        return {
                            name: prev.name = res.name,
                            quantity: prev.quantity = res.quantity,
                            location: prev.location = res.location,
                            loading: false,
                        }
                    })
                }
            }))
        }
    }
    
// Handle change --------------------------------------------------------------------
    handleChange = (target, e) => {
        const val = e.target.value;

        this.setState((prevState) => {
            return {target: prevState[target] = val}
        });
    }

// Handle submit --------------------------------------------------------------------
    handleSubmit = (e) => {
        e.preventDefault();
        // Send updated data to server
        fetch(`${url}/grocery-item/update/${this.props.url.match.params.groceryListName}/${this.props.url.match.params.name}`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json().then((res) => {
            if(res.messages) {
                // Handle errors
                this.setState((prev) => {return {messages: prev.messages = res.messages}})
            } else {
                // Prompt redirect if updated
                this.setState((prev) => {return {completed: prev.completed = true}})
            }
        }))
    }

// Render ============================================================================
    render() {
        if (this.state.loading) {
            // Show loading screen while data is returned from server
            return (
                <div>
                    <InfoMessages messages={this.state.messages} />
                    <h1>Loading...</h1>
                </div>
            )
        } else if (this.state.completed) {
            // Redirect if updated
            return <Redirect to={`/grocery-list/show/${this.props.url.match.params.groceryListName}`} />
        } else {
            // Allow user input once loaded
            return (
                <div>

                    <NavLink to={`/grocery-list/show/${this.props.url.match.params.groceryListName}`}>
                        <h3 className="back-button">Back</h3>
                    </NavLink>

                    <InfoMessages messages={this.state.messages} />

                    <form className="standard-form">

                        <div className="form-section">
                            <label htmlFor="name">Edit Grocery Item Name</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                placeholder="Edit Name"
                                onChange={(e) => this.handleChange("name", e)}
                            />
                        </div>

                        <div className="form-section">
                            <label htmlFor="quantity">Edit Grocery Item Quantity</label>
                            <input
                                type="text"
                                name="quantity"
                                value={this.state.quantity}
                                placeholder="Edit Quantity"
                                onChange={(e) => this.handleChange("quantity", e)}
                            />
                        </div>

                        <div className="form-section">
                            <label htmlFor="location">Edit Grocery Location</label>
                            <input
                                type="text"
                                name="location"
                                value={this.state.location}
                                placeholder="Edit location"
                                onChange={(e) => this.handleChange("location", e)}
                            />
                        </div>

                        <button className="submit-button" onClick={this.handleSubmit}>Update</button>

                    </form>

                </div>
            )
        }
    }
}

export default EditItem;