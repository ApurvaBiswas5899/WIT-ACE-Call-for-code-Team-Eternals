import React, { Component } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import BurppLogo from './Burpp_logo3.png';
import CartLogo from './CartLogo.png';
import './headerHomepage.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/views/user.js';

function HeaderHomepage(props) {

    const logMeOut = (event) => {

        props.actions.logout().then((res) => {

            localStorage.removeItem("persist:root")

            window.location = '/login';
        })

        event.preventDefault()
    }
    return (
        <>
            <div className="margin-header-home">
                <Navbar collapseOnSelect expand="lg" className="nav-header-home">

                    <Navbar.Brand style={{ backgroundColor: "" }} href="/"><img alt="BURPP" src={BurppLogo}></img></Navbar.Brand>

                    {/* <Navbar.Brand className="justify-content-end" style={{ backgroundColor: "" }} href="/">Mumbai, MH</Navbar.Brand> */}
                    <div className="d-none d-sm-inline d-sm-flex justify-content-start justify-content-lg-end location-home" style={{ width: "35%", backgroundColor: "" }} >
                        Mumbai, MH
                    </div>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="" />

                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end ">

                        <Nav>
                            <Nav.Link className="Navlinks" href="/cart">
                                {/* <img alt="cart Logo" src={CartLogo} className="navbarImages"></img> */}
                                    Cart</Nav.Link>
                            {
                                props.isLoggedIn ?
                                    <Nav.Link className="Navlinks" onClick={logMeOut}>Log Out</Nav.Link>
                                    : <Nav.Link className="Navlinks" href="/login">Login</Nav.Link>
                            }
                            <Nav.Link className="Navlinks" href="/profile">Profile</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>

                </Navbar>

            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.loginSuccess,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            logout,
        }, dispatch),
    };
}

export default connect(mapStateToProps,
    mapDispatchToProps)(HeaderHomepage);
