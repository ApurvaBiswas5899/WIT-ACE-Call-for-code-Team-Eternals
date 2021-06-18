import React, { useState, Component } from "react";
import profileImage from './images/Profile.png';
import { Image, Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import CallImage from './images/call.png';
import MsgImage from './images/message.png';
import EditImage from './images/Edit.png';
import './profile.css';
import Zoom from 'react-reveal/Zoom';
import { Modal, ModalBody, ModalHeader, Button, Form, FormGroup } from 'reactstrap';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Bounce from 'react-reveal/Bounce';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Data from "./data.json"
import axios from 'axios';


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            d: Data,
            isModalOpen: false,
            name: "John Brighton",
            email: "burppit@gmail.com",
            number: "999999999",
            password: "123456",
            disName: true, // For future Use
            disNumber: true,
            disEmail: true,
            disPassword: true,
            enable: false
        };

        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEnable = this.handleEnable.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            enable: false
        });
        // this.populatePost(this.state.d[0].firstName, this.state.d[0].lastName, this.state.d[0].email, this.state.d[0].conNum)
    }
    // populatePost = (f, l, e, c) => {
    //     this.setState({ firstName: f, lastName: l, email: e, conNum: c })
    // }
    handleName(event) {
        this.setState({ name: event.target.value });
    }
    handleEmail(event) {
        this.setState({ email: event.target.value });
    }
    handleNumber(event) {
        this.setState({ number: event.target.value });
    }
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleEnable(event) {
        this.setState({ enable: true })
    }
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        // let d = [{
        //     "firstName": this.state.name,
        //     "lastName": this.state.name,
        //     "email": this.state.email,
        //     "conNum": this.state.conNum
        // }]
        // this.saveJson(d);
        this.setState({ isModalOpen: !this.state.isModalOpen, name: '', number: '', email: '', password: '', enable: false })

    }
    saveJson = (posts) => {
        const url = 'http://localhost:5000/write'
        axios.post(url, posts)
            .then(response => {
                // console.log(response);
            });
    }

    render() {


        return (

            <React.Fragment>

                <Image className="edit mx-0" src={EditImage} fluid onClick={this.toggleModal} />

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="review-Modal">

                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>

                            <div className="d-flex flex-row justify-content-end">
                                <FontAwesomeIcon icon={faTimes} onClick={this.toggleModal} size="2x" style={{ color: "#FF5454" }} />
                            </div>

                            <div className="input">
                                <Container>
                                    <Row>
                                        <Col xs={0} md={1}></Col>
                                        <Col xs={12} md={10}>
                                            <FormGroup>
                                                <div className="modalHeadings">Name</div>
                                                <input type="text" disabled={!this.state.enable} name="headline" className={(this.state.enable ? "text-Input-enable" : "text-Input-disable")} value={this.state.name} onChange={this.handleName} />
                                            </FormGroup>
                                            <FormGroup>
                                                <div className="modalHeadings">Phone NO.</div>
                                                <input type="text" disabled={!this.state.enable} name="headline" className={(this.state.enable ? "text-Input-enable" : "text-Input-disable")} value={this.state.number} onChange={this.handleNumber} />
                                            </FormGroup>
                                            <FormGroup>
                                                <div className="modalHeadings">Email ID</div>
                                                <input type="email" disabled={!this.state.enable} name="headline" className={(this.state.enable ? "text-Input-enable" : "text-Input-disable")} value={this.state.email} onChange={this.handleEmail} />
                                            </FormGroup>
                                            <FormGroup>
                                                <div className="modalHeadings">Create a password</div>
                                                <input type="password" disabled={!this.state.enable} name="headline" className={(this.state.enable ? "text-Input-enable" : "text-Input-disable")} value={this.state.password} onChange={this.handlePassword} />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={0} md={1}></Col>
                                    </Row>
                                </Container>
                                {
                                    this.state.enable ? (<p className="text-success d-flex justify-content-center">Edit Your Profile !! </p>) : (<> </>)
                                }
                            </div>
                            <div className="d-flex mx-auto justify-content-center my-3">
                                <input type="button" value="UPDATE" className="bottom-buttons" />
                                <input type="button" value="EDIT" onClick={this.handleEnable} className="bottom-buttons" />
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>

        );
    }
}


function ProfileDetails({ info }) {
    const [toggler, setToggler] = useState('contact-us')

    function triggerPast() {
        setToggler('past-orders')
    }

    function triggerContact() {
        setToggler('contact-us')
    }

    return (
        <>
            <div className="profile-details px-0 mx-0 py-2">
                {/* <div className="edit-button">
                    <EditProfile />
                </div> */}

                <div className="d-flex px-2">
                    <div className="mx-0 my-auto">
                        <Bounce>
                            {/* src='http://res.cloudinary.com/burppit/image/upload/v1614502680/fljt4nl85vskyzydxqdf.jpg' */}
                            <Image src={profileImage} className="rounded-circle" style={{ height: "80px" }} fluid />
                        </Bounce>
                    </div>
                    <div className="mx-2 name text-uppercase flex-grow-sm-1">
                        <Zoom>
                            <p className="mx-1 d-inline name text-white boldest-text">
                                {info.name}
                            </p>
                            <p className="mx-1 name d-inline boldest-text">
                                {info.lastname}
                            </p>
                        </Zoom>
                    </div>
                    <div className="d-none d-sm-inline contact mx-4 mx-md-5 my-auto mb-1 text-white">
                        <Zoom>
                            <Image src={CallImage} style={{ height: "23px" }} fluid />
                            <p>{info.contactNo}</p>
                        </Zoom>
                    </div>
                    <div className="d-none d-sm-inline mail mx-4 my-auto mb-1 text-white">
                        <Zoom>
                            <Image src={MsgImage} fluid />
                            <p className="limit-length">{info.email}</p>
                        </Zoom>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileDetails;