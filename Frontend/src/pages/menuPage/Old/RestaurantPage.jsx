import React, { useEffect, useState, Component } from "react";
import Header from "../../../components/header/header.js";
import Restaurant_img from "../../components/images/restaurant_back-2.png";
//import BackImg from '../../components/images/Back.svg';
// import Rate from "../../components/images/Rate.svg";
// import Star from "../../components/star.svg";
import Line from "../../components/line.svg";
import Contact from "../../components/images/contact.svg";
// import Dish5 from "../../components/view_gallery.jpg";
import AddPhoto from "../../components/add_photo.png";
import Review from "../../components/images/review.svg";
import Fab from "@material-ui/core/Fab";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Rect from "../../components/rect.png";
import VegNonVeg from "../../components/veg.svg";
import WalkIcon from '@material-ui/icons/DirectionsWalk';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import Box from '@material-ui/core/Box';
import { restoInfo } from "../menu.js";
import Footer from '../../../components/footer/Footer.js';
import ClearIcon from '@material-ui/icons/Clear';
// import Container from '@material-ui/core/Container';
// import Button from '@material-ui/core/Button';
// import ForumIcon from '@material-ui/icons/Forum';
import { Modal, ModalBody, ModalHeader, Button, Form, FormGroup } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Divider from '@material-ui/core/Divider';
import { faStar, faStarHalf, faPlus } from '@fortawesome/free-solid-svg-icons';
import Collapse from 'react-bootstrap/Collapse';
import './RestaurantPage.css';

class AddReview extends Component {
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
        <Button onClick={this.toggleModal} type="button" className="btn btn-outline-danger btn-sm bg-light text-dark contact-buttons mx-3">
          <span>
            <img src={Contact} alt="Error" /> <p className="d-none d-sm-inline">Add Review</p>
          </span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="reviewModal">
          <ModalHeader>
            <div style={{ fontSize: "2rem" }}>Create Review</div>
            <div style={{ fontWeight: "100" }}>Some text about review form</div>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup style={{ marginTop: "0" }}>
                <div className="modalHeadings">Overall Rating</div>
                <div id="half-stars-example">
                  <div className="rating-group">
                    <input className="rating__input rating__input--none" checked name="rating2" id="rating2-0" value="0" type="radio" />
                    <label aria-label="0 stars" className="rating__label" for="rating2-0" checked>&nbsp;</label>
                    <label aria-label="0.5 stars" className="rating__label rating__label--half" for="rating2-05"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStarHalf} /></label>
                    <input className="rating__input" name="rating2" id="rating2-05" value="0.5" type="radio" />
                    <label aria-label="1 star" className="rating__label" for="rating2-10"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStar} /></label>
                    <input className="rating__input" name="rating2" id="rating2-10" value="1" type="radio" />
                    <label aria-label="1.5 stars" className="rating__label rating__label--half" for="rating2-15"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStarHalf} /></label>
                    <input className="rating__input" name="rating2" id="rating2-15" value="1.5" type="radio" />
                    <label aria-label="2 stars" className="rating__label" for="rating2-20"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStar} /></label>
                    <input className="rating__input" name="rating2" id="rating2-20" value="2" type="radio" />
                    <label aria-label="2.5 stars" className="rating__label rating__label--half" for="rating2-25"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStarHalf} /></label>
                    <input className="rating__input" name="rating2" id="rating2-25" value="2.5" type="radio" />
                    <label aria-label="3 stars" className="rating__label" for="rating2-30"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStar} /></label>
                    <input className="rating__input" name="rating2" id="rating2-30" value="3" type="radio" />
                    <label aria-label="3.5 stars" className="rating__label rating__label--half" for="rating2-35"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStarHalf} /></label>
                    <input className="rating__input" name="rating2" id="rating2-35" value="3.5" type="radio" />
                    <label aria-label="4 stars" className="rating__label" for="rating2-40"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStar} /></label>
                    <input className="rating__input" name="rating2" id="rating2-40" value="4" type="radio" />
                    <label aria-label="4.5 stars" className="rating__label rating__label--half" for="rating2-45"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStarHalf} /></label>
                    <input className="rating__input" name="rating2" id="rating2-45" value="4.5" type="radio" />
                    <label aria-label="5 stars" className="rating__label" for="rating2-50"><FontAwesomeIcon className="rating__icon rating__icon--star" icon={faStar} /></label>
                    <input className="rating__input" name="rating2" id="rating2-50" value="5" type="radio" />
                  </div>
                </div>
              </FormGroup>
              <FormGroup>
                <div className="modalHeadings">Upload a Photo or Video</div>
                <div>Shoppers find images and videos more helpful than text alone</div>
                <label style={{ cursor: "pointer" }}>
                  <div className="imageInput">
                    <FontAwesomeIcon className="uploadPlus" icon={faPlus} />
                    <input style={{ display: "none" }} name="upload" type="file" accept="image/*|video/*" />
                  </div>
                </label>
              </FormGroup><hr />
              <FormGroup>
                <div className="modalHeadings">Add a Headline</div>
                <input type="text" name="headline" className="textInput" />
              </FormGroup>
              <FormGroup>
                <div className="modalHeadings">Write your Review</div>
                <lebel>
                  <textarea name="review" rows="5" cols="100" className="textAreaInput"></textarea>
                </lebel>
              </FormGroup>
              <div className="submitBtnDiv">
                <input type="submit" className="submitBtn" />
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>

    )
  }
}

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
          <p className="text-white text-decoration-underline">View Gallery</p>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="reviewModal text-dark">
          <ModalHeader>
            <div className="gallery-header d-flex">
              <div className="text-danger fs-4 fs-sm-3 fs-md-2 flex-grow-1">Gallery</div>
              {/* <ClearIcon onClick={this.toggleModal} /> */}
            </div>
          </ModalHeader>
          <ModalBody>
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


class ViewMap extends Component {
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

    const mapStyles =
    {
      height: "85vh",
      width: "100%"
    };

    const defaultCenter = {
      lat: 13.709698225781432, lng: 79.59385563861416

    }

    return (
      <React.Fragment>
        <div className="col-12 col-md-3 m-0 mt-3 mt-md-2 map-and-navigation order-2 d-none d-md-block">
          <LoadScript
            googleMapsApiKey='AIzaSyCE_RlPAVZTJ_gUjC0IwZgRLkN_Xviv8wk_GeneratedErrorForLimitedUse'>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={7}
              center={defaultCenter}
            />
          </LoadScript>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="reviewModal text-dark">
          <ModalHeader>
            <div className=" row  m-0 pl-md-5">
              <div className="col-5 col-sm-4 name  ">
                <p className=" dir " style={{ color: "#FF5454" }}>
                  Directions </p>
              </div>

              <div className="col-4 contact my-auto ">
                <div className="d-flex -flex-row justify-content-center">
                  <img className="px-xl-3 px-md-2 px-1 px-xs-0" src={personwalk} alt="error" fluid />
                  <img className="px-xl-3 px-md-2 px-1 px-xs-0" src={carsign} alt="error" fluid />
                  <img className="px-xl-3 px-md-2 px-1 px-xs-0" src={dirsign} alt="error" fluid />
                </div>
              </div>
              <div className=" col-3 col-sm-4 mail my-auto ">
                <div className="d-flex flex-row justify-content-end">
                  <Image src={xsign} fluid />
                </div>

              </div>

            </div>
          </ModalHeader>
          <ModalBody>
            <div>

              <LoadScript googleMapsApiKey='AIzaSyCE_RlPAVZTJ_gUjC0IwZgRLkN_Xviv8wk'>
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={13}
                  center={defaultCenter}
                >
                  <Marker position={defaultCenter} />
                </GoogleMap>
              </LoadScript>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>

    )
  }
}


const RestaurantPage = () => {
  const mapStyles = {
    height: "300px",
    width: "100%"
  }

  // function openNav() {
  //   document.getElementById("myNav").style.width = "100%";
  // }

  // function closeNav() {
  //   document.getElementById("myNav").style.width = "0%";
  // }

  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }

  const [open, setOpen] = useState(false);

  return (
    <>


      <Header />

      <div className="restro-pic card bg-dark text-white">
        <div className="row restro-info" >
          <img src={Restaurant_img} className="col-12 card-img img-fluid" alt="Error Loading Image" />
        </div>
        <div className="card-img-overlay container-fluid">
          <Box display="flex" flexDirection="column" className="textover-image m-0 p-0">
            <h1 className="card-title fs-3 fs-sm-2">{restoInfo[0].name}</h1>
            <p className="card-text fs-6 font-weight-light">{restoInfo[0].description}</p>
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
                      <p className="ms-2 mt-1 fs-5 font-weight-light">{restoInfo[0].rating[0]}</p>
                    </Box>
                    <Box display="flex">
                      <p className="font-weight-light">{restoInfo[0].rating[1]}+ Ratings</p>

                    </Box>
                  </Box>
                  <img id="line1" src={Line} alt="Error loading" className="ms-3 mt-2" />
                </Box>
              </Box>
              <Box className="right-part d-flex justify-content-end flex-grow-1">
                <Box className="align-self-center d-flex">
                  <Button className="btn btn-outline-danger btn-sm bg-light text-dark contact-buttons mx-2">
                    <span>
                      <img src={Contact} alt="Error" /> <p className="d-none d-sm-inline">Contact</p>
                    </span>
                  </Button>
                  <AddReview />

                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
      <div className="p-3 m-1 m-md-0 gallery-menu-map">
        <div className="row ">
          <div className="col-12 col-md-4 order-1 order-md-0 m-0 gallery">
            <div className="row">
              <div>
                <h3 className="d-block d-md-none mt-4">Gallery</h3>
                <hr className="d-block d-md-none" />
                <img src={restoInfo[0].gallery[0]} alt="Error" className="col-4 col-md-12 my-1 px-1" />
                <img src={restoInfo[0].gallery[1]} alt="Error" className="col-4 col-md-6 my-1 px-1" />
                <div className="gallery-set d-inline-block col-4 col-md-6 my-1 px-1">
                  <ViewGallery />
                </div>
                <div className="add-image-button">
                  <img src={AddPhoto} alt="Error" className="col-12 my-1 px-1 d-none d-md-block"
                    style={{ display: (restoInfo[0].owner === "true") ? "block" : "none" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 m-md-0 mx-0 mt-3 mt-md-1 order-0 order-md-1 menu-details">
            <div className="row">
              <div>
                <h3>Menu</h3>
                <div className="menu-item card p-2 p-sm-1 p-md-2 border">
                  <div className="card-body" >
                    <span className="d-flex">
                      <div className="m-0">
                        <img src={VegNonVeg} alt="Error" style={{ width: "23px" }} />
                      </div>
                      <div className="restro-details d-flex flex-column mx-1">
                        <h3>{restoInfo[0].menu[0].name}</h3>
                        <p>
                          <span className="text-decoration-line-through ml-5 text-muted">
                            &#8377;{restoInfo[0].menu[0].originalPrice}
                          </span>
                          <span className="px-2">&#8377;{restoInfo[0].menu[0].discountedPrice}</span>
                          <span className="text-danger px-2">{restoInfo[0].menu[0].discount}off</span>
                        </p>
                        <p className="text-dark ml-5 adjust-text-size">
                          <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            color="white" size="sm"
                          >
                            {restoInfo[0].menu[0].text}
                          </Button>
                        </p>
                      </div>
                      <div className="flex-grow-1 ">
                        {/* This should be kept as it is to give an empty space.   */}
                      </div>
                      <button className="add-btn justify-content-end mb-5 mt-0 btn btn-outline-danger ">
                        Add +

                    </button>
                    </span>
                    <Collapse in={open}>
                      <div id="example-collapse-text">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                      </div>
                    </Collapse>
                  </div>
                </div>
                <div className="menu-item card p-2 p-sm-1 p-md-2 border mt-3">
                  <div className="card-body">


                    <span className="d-flex">
                      <div className="m-0">
                        <img src={VegNonVeg} alt="Error" style={{ width: "23px" }} />
                      </div>
                      <div className="restro-details d-flex flex-column mx-1">
                        <h3>{restoInfo[0].menu[0].name}</h3>
                        <p>
                          <span className="text-decoration-line-through ml-5 text-muted">
                            &#8377;{restoInfo[0].menu[0].originalPrice}
                          </span>
                          <span className="px-2">&#8377;{restoInfo[0].menu[0].discountedPrice}</span>
                          <span className="text-danger px-2">{restoInfo[0].menu[0].discount}off</span>
                        </p>
                        <p className="text-light ml-5 adjust-text-size">
                          <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            color="white" size="sm"
                          >
                            {restoInfo[0].menu[0].text}
                          </Button>
                        </p>
                      </div>
                      <div className="flex-grow-1 ">
                        {/* This should be kept as it is to give an empty space.   */}
                      </div>
                      <button className="add-btn justify-content-end mb-5 mt-0 btn btn-outline-danger ">
                        Add +
                        </button>
                    </span>
                    <Collapse in={open}>
                      <div id="example-collapse-text">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                      </div>
                    </Collapse>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="maptobeaddedhere">





          </div>

        </div>
      </div>

      <div className="container bg-white">
        <span className="d-flex justify-content-between mt-3 ml-1">
          <h2>Reviews</h2>
          <h4>Sort By:</h4>
        </span>
        <hr />

        <span className="d-flex justify-content-between">
          <div className="col-sm-5 ">
            <StarIcon fontSize="small" className="text-warning bg-light" />
            <StarIcon fontSize="small" className="text-warning bg-light" />
            <StarIcon fontSize="small" className="text-warning bg-light" />
            <StarIcon fontSize="small" className="text-warning bg-light" />
            <StarHalfIcon fontSize="small" className="text-warning bg-light" />
            <p>{restoInfo[0].reviews[1]}</p>
            <p>{restoInfo[0].reviews[2]}</p>
          </div>
          <span className="d-inline ">
            <img src={Rect} alt="Error" />
            <img className="ml-2" src={Rect} alt="Error" />
          </span>

        </span>
        <span className="d-flex justify-content-between">
          <div className="col-sm-5 ">
            <StarIcon fontSize="small" className="text-warning bg-light" />
            <StarIcon fontSize="small" className="text-warning bg-light" />
            <StarIcon fontSize="small" className="text-warning bg-light" />
            <StarIcon fontSize="small" className="text-warning bg-light" />
            <StarHalfIcon fontSize="small" className="text-warning bg-light" />
            <p>{restoInfo[0].reviews[1]}</p>
            <p>{restoInfo[0].reviews[2]}</p>
          </div>
          <span className="d-inline ">
            <img src={Rect} alt="Error" />
            <img className="ml-2" src={Rect} alt="Error" />
          </span>
        </span>
      </div>
      <Footer />
    </>
  );
};
export default RestaurantPage;
