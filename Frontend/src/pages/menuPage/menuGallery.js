import React, { Component } from "react";
import AddPhoto from "../../components/add_photo.png";
import Rect from "../../components/rect.png";
import { restoInfo } from "./menu.js";
import { Modal, ModalBody } from 'reactstrap';
import './RestaurantPage.css';
import { Image } from 'react-bootstrap';
import xsign from './images/X.png';
import Fade from 'react-reveal/Fade';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import vertical from './images/vertical.jpg';
// Props to be included when we take data for varios restaurants

class ViewGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="view-gallery-1" onClick={this.toggleModal}>
                    <img src={restoInfo[0].gallery[2]} alt="Error" className="view-gallery" />
                    <p className="extra-layer"></p> {/* Leave it as it is */}
                    <p className="text-white text-decoration-none">View Gallery</p>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="reviewModal text-dark">
                    <ModalBody>
                        <div className="row">
                            <div className="col-8 ">
                                <div className="fs-4 fs-sm-3 fs-md-2" style={{ color: "#FF5454" }}>
                                    Gallery
                                </div>
                            </div>

                            <div className=" col-4 my-auto ">
                                <div className="d-flex flex-row justify-content-end">
                                    {/* <Image src={xsign} fluid onClick={this.toggleModal} /> */}
                                    <FontAwesomeIcon icon={faTimes} onClick={this.toggleModal} size="2x" style={{ color: "#FF5454" }} />
                                </div>
                            </div>

                        </div>
                        {/* <hr /> */}
                        <div className="gallery-grid row mx-auto">
                            <div className="col-xl-2 col-md-3 col-sm-4 col-6 p-2 text-white grid-layout">
                                <img src={Rect} />
                            </div>
                            <div className="col-xl-2 col-md-3 col-sm-4 col-6 p-2 text-white grid-layout">
                                <img src={Rect} />
                            </div>
                            <div className="col-xl-2 col-md-3 col-sm-4 col-6 p-2 text-white grid-layout">
                                <img src={Rect} />
                            </div>
                            <div className="col-xl-2 col-md-3 col-sm-4 col-6 p-2 text-white grid-layout">
                                <img src={Rect} />
                            </div>
                            <div className="col-xl-2 col-md-3 col-sm-4 col-6 p-2 text-white grid-layout">
                                <img src={Rect} />
                            </div>
                            <div className="col-xl-2 col-md-3 col-sm-4 col-6 p-2 text-white grid-layout">
                                <img src={Rect} />
                            </div>
                            <div className="col-xl-2 col-md-3 col-sm-4 col-6 p-2 text-white grid-layout">
                                <img src={Rect} />
                            </div>
                            <div className="col-xl-2 col-md-3 col-sm-4 col-6 p-2 text-white grid-layout">
                                <img src={Rect} />
                            </div>
                            <div className="col-xl-2 col-md-3 col-sm-4 col-6 p-2 text-white grid-layout">
                                <img src={Rect} />
                            </div>
                            <div className="col-xl-2 col-md-3 col-sm-4 col-6 p-2 text-white grid-layout">
                                <img src={Rect} />
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </React.Fragment>

        )
    }
}

const MenuGallery = () => {

    return (
        <>
            <div className="row">
                <div>
                    <Fade bottom>
                        {/* <h3 className="d-block d-md-none mt-4">Gallery</h3>
                        <hr className="d-block d-md-none" />

                        <img src={restoInfo[0].gallery[0]} alt="Error" className="col-4 col-md-12 my-1 px-1" />

                        <img src={restoInfo[0].gallery[1]} alt="Error" className="col-4 col-md-6 my-1 px-1" />
                        <div className="gallery-set d-inline-block col-4 col-md-6 my-1 px-1">
                            <ViewGallery />
                        </div>
                        <div className="add-image-button">
                            <img src={AddPhoto} alt="Error" className="col-12 my-1 px-1 d-none d-md-block"
                                style={{ display: (restoInfo[0].owner === "true") ? "block" : "none" }} />
                        </div> */}
                        <span className="d-flex justify-content-center">
                            <img src={vertical} alt="Error" className="col-12 col-sm-8 col-md-12 my-1 px-1" />
                        </span>
                    </Fade>
                </div>
            </div>
        </>
    );
};
export default MenuGallery;
