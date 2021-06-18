import React, { Component } from "react";
import "./login.css";

import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import sideimg from "../../components/images/Login_SignUp.png";
import Logo from "../../components/images/Burpp_logo.png";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "bootstrap/dist/css/bootstrap.min.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser, getAuth, emailVerify } from "../../actions/views/user";

import { encode, decode } from "string-encode-decode";

import Cookies from "js-cookie";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      autoLogin: false,
      error: "Login Successful",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  firsthandler = (event) => {
    // alert(event.target.value)
    this.setState({
      email: event.target.value,
    });
  };
  passwordhandler = (event) => {
    // alert(event.target.value)
    this.setState({
      password: event.target.value,
    });
  };

  checkHandler = (event) => {
    this.setState({
      autoLogin: !this.state.autoLogin,
    });
  };

  componentDidMount() {
    if (Cookies.get("autoLogin") === "true" || this.state.autoLogin) {
      const deEmail = decode(Cookies.get("Bcredmail")); // decode
      const dePass = decode(Cookies.get("Bcredpass")); // decode

      this.setState({
        password: dePass,
        email: deEmail,
        autoLogin: true,
      });
    }
    // alert(`${deEmail} + ${dePass} + ${this.autoLogin}`) // Testing purpose only
  }

  handleSubmit = (event) => {
    const { actions } = this.props;

    this.props.actions
      .loginUser(this.state.email, this.state.password)
      .then((result) => {
        if (result.success) {
          // localStorage.setItem("creds", JSON.stringify({
          // isLoggedIn: result.success
          // }));
          // Keep it for future reference
          // alert(`${this.state.error}`);

          const enEmail = encode(this.state.email);
          const enPass = encode(this.state.password);

          Cookies.set("Bcredmail", enEmail, { expires: 365 });
          Cookies.set("Bcredpass", enPass, { expires: 365 });
          Cookies.set("autoLogin", this.state.autoLogin, { expires: 365 });

          window.location = "/";

          // Auth part not reqd - March 2021

          // this.props.actions.getAuth().then((response) => {

          //     if (response.success) {

          //         window.location = '/home';
          //     } else {

          //         alert(`Error in Auth`)

          //         this.setState({
          //             error: response.error,
          //         });
          //     }
          // });
        } else {
          this.setState({
            error: result.error,
          });

          alert(`Error is coming`);
          alert(`${result.error}`);
        }
      });

    event.preventDefault();
  };

  render() {
    // const { actions } = this.props;

    return (
      <>
        <div className="row p-0 m-0">
          <div className="left-part-signUp col-12 col-md-8 m-0 p-0 image-pos-rel">
            <a>
              <img
                src={sideimg}
                alt="error"
                className="image-pos-rel"
                style={{ width: "100%" }}
              />
            </a>

            <a href="/home">
              <img src={Logo} alt="error" className="image-pos-abs" />
            </a>
          </div>

          <div className="right-part-signUp col-12 col-md-4 m-0 px-4 py-2">
            <div>
              <h1
                className="mt-5 mb-3 boldest-text"
                style={{ color: "#292A40" }}
              >
                Log in
              </h1>

              <div className="d-flex flex-row my-2">
                <p className="pt-2" style={{ color: "#686A79" }}>
                  Continue with{" "}
                </p>
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="mt-1 mx-3"
                  size="2x"
                />

                <FontAwesomeIcon
                  icon={faFacebook}
                  className="mt-1 mx-0"
                  size="2x"
                />
              </div>

              <p className="p-0 mx-1 boldest-text">or </p>

              <Form>
                <Row>
                  <Form.Group controlId="formGridPhoneNo formGridEmailId">
                    <Form.Label column="sm" style={{ color: "#3C3F52" }}>
                      Your e-mail or phone number
                    </Form.Label>
                    <Form.Control
                      value={this.state.email}
                      onChange={this.firsthandler}
                      type="text"
                      size="sm"
                      style={{ border: "1px solid #868893" }}
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label column="sm" style={{ color: "#3C3F52" }}>
                      Password
                    </Form.Label>
                    <Form.Control
                      value={this.state.password}
                      onChange={this.passwordhandler}
                      type="password"
                      size="sm"
                      style={{ border: "1px solid #868893" }}
                    />
                  </Form.Group>
                </Row>

                <Form.Group>
                  <Form.Check
                    name="terms"
                    label="Keep me logged in"
                    style={{ color: "#686A79" }}
                    id="validationFormik106"
                    className="mx-1"
                    onClick={this.checkHandler}
                    checked={this.state.autoLogin}
                    // feedbackTooltip
                  />
                </Form.Group>

                <div className="mt-4 mb-5 signbdiv">
                  <input
                    type="submit"
                    value="Log in"
                    onClick={this.handleSubmit}
                    className="signbdiv w-100 py-2"
                  />
                </div>
              </Form>

              <div
                className="d-flex flex-row justify-content-center account-bottom"
                style={{ color: "#686A79" }}
              >
                <p>Don’t have an account?</p>

                <a href="/signUp" style={{ textDecoration: "none" }}>
                  <p
                    href="#login"
                    className="mx-1 boldest-text"
                    style={{ color: "#fe019a" }}
                  >
                    Sign Up
                  </p>
                </a>
              </div>

              <div className="d-flex flex-row justify-content-center">
                <p
                  className="mx-auto boldest-text"
                  style={{ color: "#fe019a" }}
                  onClick={() => {
                    this.props.actions
                      .emailVerify(
                        this.props.userInfo.email,
                        this.props.userInfo.name
                      )
                      .then((response) => {
                        if (response.success) {
                          alert(`${response.result}`);
                        } else {
                          alert(`${response.message}`);
                        }
                      });
                  }}
                >
                  Verify Account
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        loginUser,
        getAuth,
        emailVerify,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
