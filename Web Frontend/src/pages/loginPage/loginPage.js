import React, { Component } from "react";
import "./login.css";

import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { FormFeedback, Input, Button } from "reactstrap";
import { Row, Col } from "react-bootstrap";
import sideimg from "../../components/images/Login_SignUp.png";
import Logo from "../../components/images/Burpp_logo.png";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  loginUser,
  getAuth,
  emailVerify,
  googleLogin,
} from "../../actions/views/user";

import { encode, decode } from "string-encode-decode";

import Cookies from "js-cookie";

//metadata
import MetaData from "../../utils/metaData";

//google-facebook signin
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      autoLogin: false,
      error: "Login Successful",
      checkEmail: false,
      checkPassword: false,
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  firsthandler = (event) => {
    // alert(event.target.value)
    this.setState({
      email: event.target.value,
      checkEmail: false,
    });
  };
  passwordhandler = (event) => {
    // alert(event.target.value)
    this.setState({
      password: event.target.value,
      checkPassword: false,
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
    event.preventDefault();

    let decision = true;

    //validations
    if (!this.state.email) {
      this.setState({
        checkEmail: true,
      });

      decision = false;
    }

    if (!this.state.password) {
      this.setState({
        checkPassword: true,
      });

      decision = false;
    }

    if (!decision) return;

    const { actions } = this.props;

    this.setState({
      loading: true,
    });

    this.props.actions
      .loginUser(this.state.email, this.state.password)
      .then((result) => {
        if (result.success) {
          // localStorage.setItem("creds", JSON.stringify({
          // isLoggedIn: result.success
          // }));
          // Keep it for future reference
          // alert(`${this.state.error}`);

          this.setState({
            loading: false,
          });

          const enEmail = encode(this.state.email);
          const enPass = encode(this.state.password);

          Cookies.set("Bcredmail", enEmail, { expires: 365 });
          Cookies.set("Bcredpass", enPass, { expires: 365 });
          Cookies.set("autoLogin", this.state.autoLogin, { expires: 365 });

          const { from } = this.props.location.state || {
            from: { pathname: "/" },
          };

          window.location = from.pathname;

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
            loading: false,
          });

          alert(`Error is coming`);
          alert(`${result.error}`);
        }
      });
  };

  responseGoogle = async (googleData) => {
    console.log("datagoogle", googleData);
    let res = await axios.post("http://localhost:5000/api/users/googleauth", {
      token: googleData.tokenId,
    });

    const { data } = res;
    console.log("backend response", data);
    if (data.success === true) {
      this.props.actions.googleLogin(data);
      window.location = "/";
    } else {
      alert("Google mail id not valid");
    }
  };

  responseFacebook = (data) => {
    console.log("facebookdata", data);
  };

  render() {
    // const { actions } = this.props;

    return (
      <>
        <MetaData
          title={"Login"}
          description={
            "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs."
          }
        />
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

            <Link to="/home">
              <img src={Logo} alt="error" className="image-pos-abs" />
            </Link>
          </div>

          <div className="right-part-signUp col-12 col-md-4 m-0 px-4 py-2">
            <div>
              <h1 className="mt-5 mb-3 boldest-text">Log in</h1>

              <div className="d-flex flex-row my-2">
                <p className="pt-2">Continue with </p>
                <GoogleLogin
                  clientId="43754873917-itslpvbfof22ribqlb7koujgskhpfq6p.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <div
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon
                        icon={faGoogle}
                        className="mt-1 mx-3"
                        size="2x"
                      />
                    </div>
                  )}
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />

                {/* <FacebookLogin
                  appId="1088597931155576"
                  autoLoad
                  callback={this.responseFacebook}
                  render={(renderProps) => (
                    <div
                      onClick={renderProps.onClick}
                      style={{ cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="mt-1 mx-0"
                        size="2x"
                      />
                    </div>
                  )}
                /> */}
              </div>

              <p className="p-0 mx-1 boldest-text">or </p>

              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Form.Group controlId="formGridPhoneNo formGridEmailId">
                    <Form.Label column="sm">
                      Your e-mail or phone number
                    </Form.Label>
                    <Input
                      value={this.state.email}
                      onChange={this.firsthandler}
                      type="text"
                      size="sm"
                      invalid={this.state.checkEmail}
                    />
                    <FormFeedback>
                      Please enter email or phone number
                    </FormFeedback>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label column="sm">Password</Form.Label>
                    <Input
                      value={this.state.password}
                      onChange={this.passwordhandler}
                      type="password"
                      size="sm"
                      invalid={this.state.checkPassword}
                    />
                    <FormFeedback>Please enter password</FormFeedback>
                  </Form.Group>
                </Row>

                <Form.Group>
                  <Form.Check
                    name="terms"
                    label="Keep me logged in"
                    id="validationFormik106"
                    className="mx-1"
                    onClick={this.checkHandler}
                    checked={this.state.autoLogin}
                    // feedbackTooltip
                  />
                </Form.Group>

                <div className="mt-4 mb-5 signbdiv">
                  {this.state.loading ? (
                    <Button
                      type="submit"
                      value="Logging In ..."
                      className="signbdiv w-100 py-2"
                      disabled={true}
                    >
                      Logging In ...
                    </Button>
                  ) : (
                    <Button type="submit" className="signbdiv w-100 py-2">
                      Log In
                    </Button>
                  )}
                </div>
              </Form>

              <div className="d-flex flex-row justify-content-center account-bottom">
                <p>Don’t have an account?</p>

                <Link to="/signUp" style={{ textDecoration: "none" }}>
                  <p
                    href="#login"
                    className="mx-1 boldest-text"
                    style={{ color: "#fe019a" }}
                  >
                    Sign Up
                  </p>
                </Link>
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
        googleLogin,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
