import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import React, { useEffect, useState, Component } from "react";
import revimg from './imagesOld/review.png'
// import Rating from '../../../node_modules/@material-ui/lab/Rating'
import Rating from '@material-ui/lab/Rating';
// import Rating from 'material-ui-rating'
import { Image } from 'react-bootstrap';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./review.css";


class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
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

    const { reviews } = this.props;

    return (
      <React.Fragment>

        <h2 onClick={this.toggleModal} className="reviews-click">
          Reviews
        </h2>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="reviewModal">

          <ModalBody>

            {/* while implementing review.map() pass id as keys for the carousel */}

            <div class="container">
              <div class="row d-flex justify-content-center">
                <div class="row justify-content-md-center">
                  <div className=" col-12  my-auto ">
                    <div className="d-flex flex-row justify-content-end">
                      <FontAwesomeIcon icon={faTimes} onClick={this.toggleModal} size="2x" style={{ color: "#FF5454" }} />
                    </div>
                  </div>
                  <div class="col col-lg-2">

                  </div>
                  <div class="col-sm-12 col-lg-4">
                    <Image className="img" src={revimg} fluid />
                  </div>

                  <div class="side col-sm-12 col-lg-4">
                    <div class="row">
                      <h1 className="heading">{reviews[0].name}</h1>
                    </div>
                    <div className="rating">
                      <Rating name="half-rating-read" defaultValue={reviews[0].rating} precision={0.5} readOnly />
                      <p className="Title">{reviews[0].headline}</p>
                    </div>
                    <div className="row d-flex " >
                      <p className="time">
                        By crystel on March 24,2019
                      </p>
                    </div>
                    <div>
                      <p className="para">
                        {reviews[0].text}
                      </p>
                    </div>
                    <div>
                      <h3 className="Title">Image for review</h3>
                      <img className="smallimg" src={revimg} alt="reviewimg" />
                    </div>
                  </div>

                  <div class="col col-lg-2">

                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>

    )

  }
}
export default Reviews