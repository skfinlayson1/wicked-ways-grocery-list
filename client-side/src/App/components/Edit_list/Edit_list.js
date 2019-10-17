import React from "react";
import {Redirect} from "react-router-dom";
import {url} from "../../../config/url_config";

import InfoMessages from "../InfoMessages";

class EditList extends React.Component {
    constructor() {
        super();

        this.state = {
            name: null,
            staticName: null,
            listCount: null,
            messages: false,
            loading: true,
            completed: false
        }
    }

// Component will mount -------------------------------------------------------------
    componentWillMount() {
        if (this.props.url) {
            // Initial fetch for specific grocery list data
            fetch(`${url}/grocery-list/edit/${this.props.url.match.params.name}`)
            .then((res) => res.json().then((res) => {
                if (res.messages) {
                    // Handle errors
                    this.setState((prev) => {return {messages: prev.message = res.messages}})
                } else {
                    // Set state values to specified grocery list
                    this.setState((prev) => {
                        return {
                            name: prev.name = res.name,
                            staticName: prev.staticName = res.name,
                            listCount : prev.listCount = res.groceryitems.length || "None",
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
        fetch(`${url}/grocery-list/update/${this.props.url.match.params.name}`, {
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
            return <Redirect to={`/`} />
        } else {
            // Allow user input once loaded
            return (
                <div>

                    <InfoMessages messages={this.state.messages} />

                    <form className="standard-form">

                        <div className="form-section">
                            <label htmlFor="name">Edit Grocery List Name</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                placeholder="Edit Name"
                                onChange={(e) => this.handleChange("name", e)}
                            />
                        </div>

                        <h3>Grocery Items in {this.state.staticName}: {this.state.listCount}</h3>

                        <button className="submit-button" onClick={this.handleSubmit}>Update</button>

                    </form>
                </div>
            )
        }
    }
}

export default EditList;