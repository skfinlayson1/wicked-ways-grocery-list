import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";

import Navbar from "./components/Navbar";
import GroceryList from "./components/Grocery_list";
import Landing from "./components/Landing";
import NewList from "./components/New_list";
import Selection from "./components/Selection";
import SignIn from "./components/Sign_in";
import SignUp from "./components/Sign_up";
import NewItem from "./components/New_item";
import EditList from "./components/Edit_list";
import EditItem from "./components/Edit_item";


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
			username: null,
		}
	}

	updateLoggedIn = (username, loggedInState) => {
		this.setState((prev) => {
			return {username: prev.username = username, loggedIn: prev.loggedIn = loggedInState}
		})
	}
	
	render() {
		return (
			<HashRouter>
				<div className="App">
				
					<header>
						<Navbar loggedIn={this.state.loggedIn}
								username={this.state.username}
								updateInfoMessage={this.updateInfoMessage}
						 />
						<p style={{margin: "0px"}}>.</p> 
					</header>

					<main>
						<Switch>
							<Route exact path="/" render={() =>
								<Landing
									loggedIn={this.state.loggedIn}
									username={this.state.username}
									updateLoggedIn={this.updateLoggedIn}									
								/>}
							/>

							<Route path="/grocery-list/new-list" render={() =>
								<NewList
									username={this.state.username}											
								/>}
							/>

							<Route path="/grocery-list/create-item/:name" render={(props) =>
								<NewItem
									url={props}
									username={this.state.username}												
								/>}
							/>

							<Route path="/grocery-list/show/:name" render={(props) =>
								<GroceryList
									url={props}
									username={this.state.username}												
								/>}
							/>

							<Route path="/grocery-list/edit/:name" render={(props) =>
								<EditList
									url={props}
									username={this.state.username}												
								/>}
							/>

							<Route path="/grocery-item/edit/:groceryListName/:name" render={(props) =>
								<EditItem
									url={props}
									username={this.state.username}												
								/>}
							/>

							<Route path="/user/sign-in" render={() => 
								<SignIn
									loggedIn={this.state.loggedIn}
									username={this.state.username}
									updateLoggedIn={this.updateLoggedIn}									
								/>}
							/>

							<Route path="/user/sign-up" render={() =>
								<SignUp
									loggedIn={this.state.loggedIn}
									username={this.state.username}
									updateLoggedIn={this.updateLoggedIn}
								/>}
							/>	
																

							<Route exact path="/user" component={Selection} />

						</Switch>
						
					</main>
				</div>
			</HashRouter>
		);
	}
}

export default App;
