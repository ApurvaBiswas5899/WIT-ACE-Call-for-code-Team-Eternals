import React from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
// import BurppLogo from './Burpp_logo3.jpg';
// import CartLogo from './CartLogo.jpg';
import BurppLogo from './Burpp_logo3.png';
import CartLogo from './CartLogo.png';
import './header.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/views/user.js';

function Header(props) {

    const logMeOut = (event) => {

        props.actions.logout().then((res) => {

            localStorage.removeItem("persist:root")

            window.location = '/login';
        })

        event.preventDefault()
    }

    return (
        <>
            <div>
                <Navbar style={{ padding: "0.2rem 1.5rem" }} expand="lg" >

                    <Navbar.Brand href="/"><img alt="BURPP" src={BurppLogo}></img></Navbar.Brand>

                    <Nav className="d-none d-sm-inline d-sm-flex justify-content-center" style={{ width: "150px" }} >
                        <Nav.Item > <span >Mumbai, MH</span> </Nav.Item>
                    </Nav>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
                    <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: "space-around" }} >

                        <form className="form-inline my-2 my-lg-0 d-flex mx-lg-3">
                            <input className="searchInput h-25 p-2 " type="search" aria-label="Search" />
                            <button className="searchBtn p-0" style={{ width: "120px" }} type="submit">In All</button>
                        </form>

                        <div className="d-flex justify-content-between" >
                            <Nav.Link className="Navlinks" href="/cart"><img alt="cart Logo" src={CartLogo} className="navbarImages"></img>Cart</Nav.Link>
                            {
                                props.isLoggedIn ?
                                    <Nav.Link className="Navlinks" onClick={logMeOut}>Log Out</Nav.Link>
                                    : <Nav.Link className="Navlinks" href="/login">Login</Nav.Link>
                            }

                        </div>
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
    mapDispatchToProps)(Header);
