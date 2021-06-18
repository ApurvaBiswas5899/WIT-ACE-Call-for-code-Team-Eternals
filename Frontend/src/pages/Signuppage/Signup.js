import React, { useState, setState, Component } from "react";
import "./signup.css";

import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { FormFeedback, Input, Button } from "reactstrap";
// import FormControl from 'react-bootstrap/FormControl'
// import FormCheck from 'react-bootstrap/FormCheck'
import { Row, Col } from "react-bootstrap";
import sideimg from "../../components/images/Login_SignUp.png";
import Logo from "../../components/images/Burpp_logo.png";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "bootstrap/dist/css/bootstrap.min.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  registerUser,
  updateUserInfo,
  googleLogin,
} from "../../actions/views/user";

//google-facebook signin
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
//metadata
import MetaData from "../../utils/metaData";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastname: "",
      password: "",
      gender: "",
      email: "",
      dateOfBirth: "",
      contactNo: "",
      dd: "",
      mm: "",
      yy: "",
      loginRes: "",
      checkDate: false,
      checkFirstName: false,
      checkLastName: false,
      checkPhone: false,
      checkPassword: false,
      checkEmail: false,
      checkDay: false,
      checkGender: false,
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.current_date = new Date(); //for year valdation
    this.cmm = this.current_date.getFullYear();
    //regex for email
    this.re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  firsthandler = (event) => {
    this.setState({
      name: event.target.value,
      checkFirstName: false,
    });
  };
  lasthandler = (event) => {
    this.setState({
      lastname: event.target.value,
      checkLastName: false,
    });
  };
  passwordhandler = (event) => {
    this.setState({
      password: event.target.value,
      checkPassword: false,
    });
  };
  genderhandler = (event) => {
    this.setState({
      gender: event.target.value,
      checkGender: false,
    });
    // alert(this.state.gender)
  };
  emailhandler = (event) => {
    this.setState({
      email: event.target.value,
      checkEmail: false,
    });
  };
  ddhandler = (event) => {
    this.setState({
      dd: event.target.value,
      checkDay: false,
    });
  };
  mmhandler = (event) => {
    this.setState({
      mm: event.target.value,
    });
  };
  yyhandler = (event) => {
    if (event.target.value > this.cmm) return;
    this.setState({
      yy: event.target.value,
      checkDate: false,
    });
  };
  contacthandler = (event) => {
    this.setState({
      contactNo: event.target.value,
      checkPhone: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let decision = true;

    //validations
    if (this.state.name === "") {
      this.setState({
        checkFirstName: true,
      });

      decision = false;
    }

    if (this.state.lastname === "") {
      this.setState({
        checkLastName: true,
      });

      decision = false;
    }

    if (this.state.contactNo.length < 10) {
      this.setState({
        checkPhone: true,
      });

      decision = false;
    }

    if (!this.re.test(this.state.email)) {
      this.setState({
        checkEmail: true,
      });

      decision = false;
    }

    if (this.state.password.length < 5) {
      this.setState({
        checkPassword: true,
      });

      decision = false;
    }

    if (this.state.yy.length !== 4) {
      this.setState({
        checkDate: true,
      });

      decision = false;
    }
    if (!this.state.dd) {
      this.setState({
        checkDay: true,
      });

      decision = false;
    }

    if (!this.state.gender) {
      this.setState({
        checkGender: true,
      });

      decision = false;
    }

    if (!decision) return;

    // if (!this.state.contactNo) {
    //   alert('Please enter your mobile number!');
    //   return;
    // }

    this.setState({
      dateOfBirth: `${this.state.dd}-${this.state.mm}-${this.state.yy}`,
      loading: true,
    });
    const { actions } = this.props;

    this.props.actions
      .registerUser(
        this.state.email,
        this.state.password,
        this.state.name,
        this.state.lastname,
        this.state.dateOfBirth,
        this.state.gender,
        this.state.contactNo
      )
      .then((result) => {
        if (result.success) {
          // localStorage.setItem("creds", JSON.stringify({
          //     isLoggedIn: result.loginSuccess
          // }));
          this.setState({
            loading: false,
          });
          alert(`${result.result}`);

          this.props.actions
            .updateUserInfo(this.state.email, this.state.name) // Update email & name in store
            .then(() => {
              window.location = "/login";
            });
        } else {
          alert(`${result.error}`);

          this.setState({
            error: result.error,
            loading: false,
          });
        }
      });

    event.preventDefault();
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
    return (
      <>
        <MetaData
          title={"SignUp"}
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
              <h1 className="my-3 boldest-text">Sign up</h1>
              <div className="d-flex flex-row my-2">
                <p className="pt-2">Sign up with </p>
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
                  appId="731005534463597"
                  fields="name,email,picture"
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

                <p className="pt-2 mx-4 boldest-text">or </p>
              </div>
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label column="sm">First Name</Form.Label>
                    <Input
                      size="sm"
                      value={this.state.name}
                      onChange={this.firsthandler}
                      invalid={this.state.checkFirstName}
                    />
                    <FormFeedback>Please enter first name</FormFeedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label column="sm">Last Name</Form.Label>
                    <Input
                      size="sm"
                      value={this.state.lastName}
                      onChange={this.lasthandler}
                      invalid={this.state.checkLastName}
                    />
                    <FormFeedback>Please enter last name</FormFeedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="formGridPhoneNo">
                    <Form.Label column="sm">Phone No.</Form.Label>
                    <Input
                      type="number"
                      pattern="[0-9]*"
                      maxLength="10"
                      size="sm"
                      value={this.state.contactNo}
                      onChange={this.contacthandler}
                      invalid={this.state.checkPhone}
                    />
                    <FormFeedback>Please enter Mobile number</FormFeedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="formGridEmailId">
                    <Form.Label column="sm">Email ID</Form.Label>
                    <Input
                      type="text"
                      size="sm"
                      value={this.state.email}
                      onChange={this.emailhandler}
                      invalid={this.state.checkEmail}
                    />
                    <FormFeedback>Please enter valid Email id</FormFeedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label column="sm">Create a password</Form.Label>
                    <Input
                      type="password"
                      size="sm"
                      value={this.state.password}
                      onChange={this.passwordhandler}
                      invalid={this.state.checkPassword}
                    />
                    <FormFeedback>
                      Password must be 5-10 characters long.
                    </FormFeedback>
                    <Form.Text muted> Must be 5-10 characters long.</Form.Text>
                  </Form.Group>
                </Row>

                <p className="boldest-text mt-3 mb-1">
                  What's your date of birth?
                </p>

                <Row>
                  <Form.Group as={Col} xs={4} controlId="formGridYear">
                    <Form.Label column="sm">Year</Form.Label>
                    <Input
                      placeholder="YYYY"
                      size="sm"
                      value={this.state.yy}
                      onChange={this.yyhandler}
                      type="number"
                      invalid={this.state.checkDate}
                    />
                    <FormFeedback>Please enter correct year</FormFeedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={5}
                    controlId="exampleForm.SelectCustomSizeSm"
                  >
                    <Form.Label column="sm">Month</Form.Label>

                    <Form.Control
                      as="select"
                      placeholder="Month"
                      size="sm"
                      value={this.state.mm}
                      onChange={this.mmhandler}
                      required
                    >
                      <option>Jan</option>
                      <option>Feb</option>
                      <option>Mar</option>
                      <option>Apr</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>Aug</option>
                      <option>Sept</option>
                      <option>Oct</option>
                      <option>Nov</option>
                      <option>Dec</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} xs={3} controlId="formGridYear">
                    <Form.Label column="sm">Day</Form.Label>
                    <Input
                      placeholder="DD"
                      size="sm"
                      value={this.state.dd}
                      onChange={this.ddhandler}
                      type="number"
                      invalid={this.state.checkDay}
                      max="31"
                      min="1"
                    />
                    <FormFeedback>Please enter correct day</FormFeedback>
                  </Form.Group>
                </Row>
                <p className="boldest-text my-4">What's your gender?</p>

                <div className="my-3">
                  <Input
                    className="mx-1"
                    type="radio"
                    value="Male"
                    checked={this.state.gender === "Male"}
                    onChange={this.genderhandler}
                    invalid={this.state.checkGender}
                  />{" "}
                  Male
                  <Input
                    className="mx-1"
                    type="radio"
                    value="Female"
                    checked={this.state.gender === "Female"}
                    onChange={this.genderhandler}
                    invalid={this.state.checkGender}
                  />{" "}
                  Female
                  <Input
                    className="mx-1"
                    type="radio"
                    value="Other"
                    checked={this.state.gender === "Other"}
                    onChange={this.genderhandler}
                    invalid={this.state.checkGender}
                  />{" "}
                  Other
                  <FormFeedback>Please enter gender</FormFeedback>
                </div>
                <div className="my-4 signbdiv">
                  {this.state.loading ? (
                    <Button
                      type="submit"
                      className="signbdiv w-100 py-2"
                      disabled={true}
                    >
                      Creating your space ...
                    </Button>
                  ) : (
                    <Button type="submit" className="signbdiv w-100 py-2">
                      Sign up
                    </Button>
                  )}
                </div>
              </Form>
              <div className="d-flex flex-row justify-content-center">
                <p>Have an account?</p>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <p
                    href="#login"
                    className="mx-1 boldest-text"
                    style={{ color: "#fe019a" }}
                  >
                    Log in{" "}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        registerUser,
        updateUserInfo,
        googleLogin,
      },
      dispatch
    ),
  };
}

export default connect(null, mapDispatchToProps)(SignUp);
