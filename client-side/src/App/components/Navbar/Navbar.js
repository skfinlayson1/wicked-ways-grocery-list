import React from "react";
import {NavLink} from 'react-router-dom';
import {url} from "../../../config/url_config";
import icons from "../../../data/icons/header_icons/index";

import DropDown from "./Drop_down";

class Navbar extends React.Component {

    constructor() {
        super();

        this.state = {
            showMenu: false
        };
        this.menuLogo = React.createRef();
    }

    menuClick = () => {
        this.setState((prevState) => {
            return ({
                showMenu: !prevState.showMenu
            })
        })
    }

    signOut = (e) => {
        e.preventDefault();

        fetch(`${url}/user/logout`)
        .then((res) => res.json().then((res) => {
            window.location.href="/";
        }))
    }

    render() {
        return (
            <div id="navigation">
                <div id='icons'>

                    <NavLink to="/">
                        <img className='home' src={icons.homeHeader} alt="Home"></img>    
                    </NavLink>
                    
                    <NavLink to="/">
                        <img className='small-logo' src={icons.logo} alt="Wicked Ways"></img>
                    </NavLink>
                    
                    
                    <img className='menu' onClick={this.menuClick} src={icons.menuHeader} alt="Menu"></img>
                    
                </div>

                <DropDown loggedIn={this.props.loggedIn} signOut={this.signOut} menuState={this.state.showMenu} toggleMenu={this.menuClick} />
            </div>


        ); 
    }

}

export default Navbar;