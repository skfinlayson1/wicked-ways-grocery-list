import React from "react";
import {NavLink, Redirect} from "react-router-dom";
import {url} from "../../../config/url_config";

import InfoMessages from "../InfoMessages";

class Landing extends React.Component {
    constructor() {
        super()

        this.state = {
            groceryLists: [],
            messages: false,
            loading: true,
            interval: null
        }
    }

// ComonentDidMount -----------------------------------------------------------
    componentDidMount() {

        // Function to check for new grocery lists entries
        function requestList(state) {
            fetch(`${url}/grocery-list/check`)
            .then((res) => res.json().then((res) => {
                if (res.messages) {
                    state.setState((prev) => {return {messages: prev.messages = res.messages}});
                }
                if (res.data) {
                    const data = res.data;
                    state.setState((prev) => {
                        return {groceryLists: prev.groceryLists = data}
                    })
                }
            }))
        }
        
        // Function to create an interval and return it
        // so it can be cancelled when the component unmounts
        function interval(state) {
            const int = setInterval(() => {
                requestList(state);
            }, 15000)
            return int;
        }

        // Check to make sure the user session persists
        fetch(`${url}/user/check`)
        .then((res) => res.json().then((res) => {
            if (res.username) {
                const username = res.username;
                this.props.updateLoggedIn(username, true)
                this.setState((prev) => {return {loading: prev.loading = false}})
            } else {
                this.props.updateLoggedIn(null, false)
                this.setState((prev) => {return {loading: prev.loading = false}})
            }
        }))

        // Initial check for grocery lists
        requestList(this);
        // Create interval so the lists update as needed
        this.setState((prev) => {
            return {interval: prev.interval = interval(this)}
        })
    }

// ComponentWillUnmount --------------------------------------------------------------
    componentWillUnmount() {
        // Clear the interval that checks for new grocery lists
        clearInterval(this.state.interval);
    }

// Delete List -------------------------------------------------------------------------
    handleDelete = (e, listName) => {
        e.preventDefault()

        // Filter the unwanted list from state to avoid multiple clicks from user and unwanted confusion
        const list = this.state.groceryLists;
        const filteredList = list.filter((list) => list.name !== listName)
        this.setState((prev) => {return {groceryLists: prev.groceryLists = filteredList}})

        // Send request to delete list
        fetch(`${url}/grocery-list/delete-list`, {
            method: "POST",
            body: JSON.stringify({listName, username: this.props.username}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json().then((res) => {
            if (res.messages) {
                // Handle errors
                this.setState((prev) => {return {messages: prev.messages = res.messages}})
            }
        }))
    }

// Render =================================================================================
    render() {
        if (this.state.loading) {
            // Wait for response from the server to see if a user session exists
            return (
                <div>
                    <InfoMessages messages={this.state.messages} />
                    <h1>Loading...</h1>
                </div>
            )
        } else if (this.props.username) {
            // Once the user is loaded, render the grocery list or tell them to sign in
            return (
                <div id="landing">

                    <InfoMessages messages={this.state.messages} />

                    <h1>{this.props.username}'s grocery lists</h1>

                    <NavLink to="/grocery-list/new-list" >
                        <h3 className="create-list">Create new grocery list</h3>   
                    </NavLink>
    
                    {this.state.groceryLists.map((list) => {
                        return (
                            <div className="grocery-list-section">
                                <NavLink to={`/grocery-list/show/${list.name}`}>
                                    <h2 className="grocery-list-text">{list.name}</h2>
                                    <h4>Click to View</h4>
                                </NavLink>

                                <div className="update-delete">
                                    <NavLink className="update-list" to={`/grocery-list/edit/${list.name}`}>
                                        <h3>update</h3>
                                    </NavLink>
                                    <h3 className="delete-list" onClick={(e) => this.handleDelete(e, list.name)}>Delete</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            );
        } else {
            // Redirect to user to sign in or sign up
            return <Redirect to="/user" />
        }
    }
}

export default Landing;