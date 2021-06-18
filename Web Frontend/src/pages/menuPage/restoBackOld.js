import React, { Component } from "react";
import Restaurant_img from "../../components/images/restaurant_back-2.png";
import Line from "../../components/line.svg";
import Contact from "../../components/images/contact.svg";
import WalkIcon from '@material-ui/icons/DirectionsWalk';
import StarIcon from '@material-ui/icons/Star';
import Box from '@material-ui/core/Box';
import { restoInfo } from "./menu.js";
import { Modal, ModalBody, ModalHeader, Button, Form, FormGroup } from 'reactstrap';
import { faStar, faStarHalf, faPlus } from '@fortawesome/free-solid-svg-icons';
import './RestaurantPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Zoom from 'react-reveal/Zoom';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { saveReview } from '../../actions/views/review.js';

// class AddReview extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isModalOpen: false,
//             rating: 1, // make default
//             image: '',
//             title: '',
//             review: '',
//             postId: 1 // Default
//         }
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.toggleModal = this.toggleModal.bind(this);
//     }

//     toggleModal() {
//         this.setState({
//             isModalOpen: !this.state.isModalOpen
//         });
//     }

//     ratinghandler = (event) => {
//         // alert(event.target.value)
//         this.setState({
//             rating: event.target.value
//         })
//     }

//     imagehandler = (event) => {
//         // alert(event.target.value)
//         this.setState({
//             image: event.target.value
//         })
//     }

//     titlehandler = (event) => {
//         // alert(event.target.value)
//         this.setState({
//             title: event.target.value
//         })
//     }

//     reviewhandler = (event) => {
//         // alert(event.target.value)
//         this.setState({
//             review: event.target.value
//         })
//     }

//     handleSubmit = (event) => {


//         const { actions } = this.props;
//         actions.saveReview(this.state.comment, this.state.rating, this.state.postId).then((response) => {
//             if (response.success) {
//                 alert("Review Successfully Added");
//             } else {
//                 this.setState({
//                     error: response.result
//                 });
//             }
//         });

//         this.setState({
//             isModalOpen: !this.state.isModalOpen
//         });

//         event.preventDefault()
//     }


//     render() {
//         return (
//             <React.Fragment>
//                 <Button onClick={this.toggleModal} type="button" className="btn btn-outline-danger btn-sm bg-light text-dark contact-buttons mx-3">
//                     <span>
//                         <img src={Contact} alt="Error" /> <p className="d-none d-sm-inline">Add Review</p>
//                     </span>
//                 </Button>
//                 <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="reviewModal">
//                     <ModalHeader>
//                         <div style={{ fontSize: "2rem" }}>Create Review</div>
//                         <div style={{ fontWeight: "100" }}>Some text about review form</div>
//                     </ModalHeader>
//                     <ModalBody>
//                         <Form>
//                             <FormGroup style={{ marginTop: "0" }}>
//                                 <div className="modalHeadings">Overall Rating</div>
//                                 <div id="half-stars-example">
//                                     <div className="rating-group">
//                                         <input className="rating__input rating__input--none" checked name="rating2" id="rating2-0" value="0" type="radio" />
//                                         <label aria-label="0 stars" className="rating__label" for="rating2-0" checked>&nbsp;</label>
//                                         <label aria-label="0.5 stars" className="rating__label rating__label--half" for="rating2-05"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStarHalf} /></label>
//                                         <input className="rating__input" name="rating2" id="rating2-05" value="0.5" type="radio" />
//                                         <label aria-label="1 star" className="rating__label" for="rating2-10"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStar} /></label>
//                                         <input className="rating__input" name="rating2" id="rating2-10" value="1" type="radio" />
//                                         <label aria-label="1.5 stars" className="rating__label rating__label--half" for="rating2-15"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStarHalf} /></label>
//                                         <input className="rating__input" name="rating2" id="rating2-15" value="1.5" type="radio" />
//                                         <label aria-label="2 stars" className="rating__label" for="rating2-20"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStar} /></label>
//                                         <input className="rating__input" name="rating2" id="rating2-20" value="2" type="radio" />
//                                         <label aria-label="2.5 stars" className="rating__label rating__label--half" for="rating2-25"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStarHalf} /></label>
//                                         <input className="rating__input" name="rating2" id="rating2-25" value="2.5" type="radio" />
//                                         <label aria-label="3 stars" className="rating__label" for="rating2-30"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStar} /></label>
//                                         <input className="rating__input" name="rating2" id="rating2-30" value="3" type="radio" />
//                                         <label aria-label="3.5 stars" className="rating__label rating__label--half" for="rating2-35"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStarHalf} /></label>
//                                         <input className="rating__input" name="rating2" id="rating2-35" value="3.5" type="radio" />
//                                         <label aria-label="4 stars" className="rating__label" for="rating2-40"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStar} /></label>
//                                         <input className="rating__input" name="rating2" id="rating2-40" value="4" type="radio" />
//                                         <label aria-label="4.5 stars" className="rating__label rating__label--half" for="rating2-45"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStarHalf} /></label>
//                                         <input className="rating__input" name="rating2" id="rating2-45" value="4.5" type="radio" />
//                                         <label aria-label="5 stars" className="rating__label" for="rating2-50"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStar} /></label>
//                                         <input className="rating__input" name="rating2" id="rating2-50" value="5" type="radio" />
//                                     </div>
//                                 </div>
//                             </FormGroup>
//                             <FormGroup>
//                                 <div className="modalHeadings">Upload a Photo or Video</div>
//                                 <div>Shoppers find images and videos more helpful than text alone</div>
//                                 <label style={{ cursor: "pointer" }}>
//                                     <div className="imageInput">
//                                         <FontAwesomeIcon className="uploadPlus" icon={faPlus} />
//                                         <input style={{ display: "none" }} value={this.image} onChange={this.imagehandler} name="upload" type="file" accept="image/*|video/*" />
//                                     </div>
//                                 </label>
//                             </FormGroup><hr />
//                             <FormGroup>
//                                 <div className="modalHeadings">Add a Headline</div>
//                                 <input type="text" name="headline" value={this.title} onChange={this.titlehandler} className="textInput" />
//                             </FormGroup>
//                             <FormGroup>
//                                 <div className="modalHeadings">Write your Review</div>
//                                 <label>
//                                     <textarea name="review" rows="5" cols="100" value={this.comment} onChange={this.commenthandler} className="textAreaInput"></textarea>
//                                 </label>
//                             </FormGroup>
//                             <div className="submitBtnDiv">
//                                 <input type="submit" className="submitBtn" />
//                             </div>
//                         </Form>
//                     </ModalBody>
//                 </Modal>
//             </React.Fragment>
//         )
//     }
// }

const RestaurantBack = props => {

    // console.log(props.details);

    return (
        <>
            <div className="mx-2 mx-md-3">
                <Zoom>
                    <div className="restro-pic card bg-dark text-white">
                        <div className="row restro-info" >
                            <img src={Restaurant_img} className="col-12 card-img img-fluid" alt="Error Loading Image" />
                        </div>
                        <div className="card-img-overlay container-fluid">
                            <Box display="flex" flexDirection="column" className="textover-image m-0 p-0">
                                <h1 className="card-title fs-3 fs-sm-2">{props.details.restaurantName}</h1>
                                <p className="card-text fs-6 font-weight-light">{props.details.description}</p>
                                <Box display="flex" id="spn1" className="upper-part fs-3">
                                    <WalkIcon fontSize="default" />
                                    <p className="ms-2 fs-4 font-weight-light">{restoInfo[0].distance}</p>
                                </Box>
                                <Box display="flex">
                                    <Box display="flex" className="left-part justify-content-start">
                                        <Box display="flex">
                                            <Box display="flex" flexDirection="column">
                                                <Box display="flex" id="spn2" className="fs-3">
                                                    <StarIcon fontSize="large" />
                                                    <p className="ms-2 mt-1 fs-5 font-weight-light">{props.details.rating}</p>
                                                </Box>
                                                <Box display="flex">
                                                    <p className="font-weight-light">{props.details.orders}+ Orders</p>
                                                </Box>
                                            </Box>
                                            <img id="line1" src={Line} alt="Error loading" className="ms-3 mt-2" />
                                        </Box>
                                    </Box>
                                    <Box className="right-part d-flex justify-content-end flex-grow-1">
                                        <Box className="align-self-center d-flex">
                                            {/* <Button className="btn btn-outline-danger btn-sm bg-light text-dark contact-buttons mx-2">
                                        <span>
                                            <img src={Contact} alt="Error" /> <p className="d-none d-sm-inline">Contact</p>
                                        </span>
                                        </Button> 
                                        Can be kept for future reference                  
                                        */}
                                            {/* <AddReview /> */}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                    </div>
                </Zoom>
            </div>
        </>
    );
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators({
//             saveReview,
//         }, dispatch),
//     };
// }

// export default connect(null,
//     mapDispatchToProps)(RestaurantBack);

export default RestaurantBack;
