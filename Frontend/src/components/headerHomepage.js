import React from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  Nav,
  FormControl,
  Button,
} from "react-bootstrap";
import BurppLogo from "./Burpp_logo3.jpg";
import BlogLogo from "./Blog_logo.jpg";
import CartLogo from "./CartLogo.jpg";
import "./headerHomepage.css";
function headerHomepage(props) {
  return (
    <div>
      <Navbar style={{ padding: "0rem 1rem" }} expand="lg">
        <Navbar.Brand href="#home">
          <img alt="BURPP" src={BurppLogo}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ml-auto">
            <NavDropdown
              className="NavDropdown mr-5 "
              title="Mumbai,MH"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{
                  borderColor: "#FF5454",
                  width:"500px",  
                  borderRadius: "0px",
                }}
              />
              <button
                className="btn btn-danger"
                type="submit"
                style={{
                  backgroundColor: "#FF5454",
                  borderTopLeftRadius: "0px",
                  borderBottomLeftRadius: "0px",
                  width: "150px",
                  borderRadius: "0px",
                }}
              >
                in All
              </button>
            </form>
          </Nav>
          {props.bool_value === "True" ? (
            <Nav.Link className="Navlinks" href="#home">
              <img
                alt="Blog Logo"
                src={BlogLogo}
                className="navbarImages"
              ></img>
              Blog
            </Nav.Link>
          ) : (
            ""
          )}
          <Nav.Link className="Navlinks mr-5" href="#home">
            <img alt="cart Logo" src={CartLogo} className="navbarImages"></img>
            Cart
          </Nav.Link>
          <Nav.Link className="Navlinks" href="#link">
            Login / Sign Up
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default headerHomepage;
