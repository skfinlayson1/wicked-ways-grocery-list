import React from "react";
import {NavLink} from "react-router-dom";
import {url} from "../../../config/url_config";

import GroceryListTable from "./components/GroceryItemTable";
import InfoMessages from "../InfoMessages";

class GroceryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            interval: null,
            messages: false,
            loading: true
        }
    }

// Componet did mount -----------------------------------------------------------------
    componentDidMount() {
        if (this.props.url) {
            // function to create an interval to check for new grocery items every 15 seconds
            function interval(state) {
                const int = setInterval(() => {
                    makeRequest(state);
                }, 15000)
                return int;
            }
            // function to make request to server for grocery list items
            function makeRequest(state) {
                fetch(`${url}/grocery-list/show/${state.props.url.match.params.name}`)
                .then((res) => res.json().then((res) => {
                    if (res.messages) {
                        state.setState((prev) => {return {messages: prev.messages = res.messages}})
                    } else {
                        state.setState((prev) => {
                            return {items: prev.items = res.groceryitems, loading: prev.loading = false}
                        })
                    }
                }))
                .catch((err) => {
                    console.log(err);
                })
            }
            // initial request
            makeRequest(this);
            // Add interval to state so it can be cleared when the component unmounts
            this.setState((prev) => {
                return {interval: prev.interval = interval(this)}
            })
        }
    }

// UNMOUNT ------------------------------------------------------------------------
    componentWillUnmount() {
        // clear the 15 second grocery list update interval
        clearInterval(this.state.interval);
    }

// Delete Item
    deleteItem = (e, itemName) => {
        e.preventDefault();

        // Filter the unwanted item from state to avoid multiple clicks from user and unwanted confusion
        const items = this.state.items;
        const filteredList = items.filter((item) => item.name !== itemName)
        this.setState((prev) => {return {items: prev.items = filteredList}})

        fetch(`${url}/grocery-item/delete/${this.props.url.match.params.name}/${itemName}`)
        .then((res) => {
            if (res.messages) {
                this.setState((prev) => {return {messages: prev.messages = res.messages}})
            }
        })
    }

// Update Purchased Checkbox
    updatePurchased = (valueToChangeTo, itemName) => {
        fetch(`${url}/grocery-item/update-checkbox/${this.props.url.match.params.name}/${itemName}`, {
            method: "POST",
            body: JSON.stringify({purchased: valueToChangeTo}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.messages) {
                // Handle Errors
                this.setState((prev) => {return {messages: prev.messages = res.messages}})
            } else {
                // Update the checkbox to the specified item
                const items = this.state.items;
                items.forEach((item) => {
                    if (item.name === itemName) item.purchased = !item.purchased;
                })
                this.setState((prev) => {return {items: prev.items = items}});
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

// Render ==========================================================================
    render() {
        if (this.state.loading) {
            // Show loading screen while data is returned
            return (
                <div>
                    <InfoMessages messages={this.state.messages} />
                    <h1>Loading...</h1>
                </div>
            )
        } else {
            // Show grocery items related to grocery list
            return (
                <div>

                    <NavLink to="/">
                        <h3 className="back-button">Back</h3>
                    </NavLink>

                    <InfoMessages messages={this.state.messages} />

                    <h1>{this.props.url.match.params.name}</h1>

                    <NavLink to={`/grocery-list/create-item/${this.props.url.match.params.name}`}>
                        <h3 className="create-item">Add new grocery item</h3>
                    </NavLink>

                    {/* Show items if any exist or display text telling the user where their items will be displayed */}
                    {this.state.items.length > 0 ?
                        <GroceryListTable
                            deleteItem={this.deleteItem}
                            groceryListName={this.props.url.match.params.name}
                            items={this.state.items}
                            updatePurchased={this.updatePurchased} />
                    : 
                        <h2>Add Grocery Items to View Them Here</h2>
                    }          
                </div>
            )
        }
    }
}

export default GroceryList;