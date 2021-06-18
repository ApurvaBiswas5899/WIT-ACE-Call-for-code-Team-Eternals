import React, { useEffect, useState, Component } from "react";
import Header from "../../../components/header/header.js";
import Direction from "../../components/images/direction.png";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { restoInfo } from "../menu.js";
import Footer from '../../../components/footer/Footer.js';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import './RestaurantPage.css';

import carsign from './images/sports-car 1.png';
// import { Image } from 'react-bootstrap';
import personwalk from './images/person-walking-2 1.png';
import dirsign from './images/image 4.png';

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from 'mapbox-gl';
import Fade from 'react-reveal/Fade';
// import Slide from 'react-reveal/Slide';
// import Collapse from 'react-bootstrap/Collapse';

import Reviews from '../reviews.js';
import DisplayMenu from '../displayMenu.js';
import MenuGallery from "../menuGallery.js";
import RestaurantBack from '../restoBack.js';
import Review from '../displayreview.js';

// import Box from '@material-ui/core/Box';
// import { Backdrop } from "@material-ui/core";
// import { Filter } from "@material-ui/icons";
// import { Restaurant } from "@material-ui/icons";
// import ClearIcon from '@material-ui/icons/Clear';
// import CameraAltIcon from "@material-ui/icons/CameraAlt";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFood_items, getRestaurantDetails } from '../../../actions/views/food.js';
// import { getReview } from '../../actions/views/review.js';

import Preloader from '../../../components/preloader.js';

class ViewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      latitude: -73.9749,
      longitude: 40.7736
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

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    });
  }

  // componentDidMount() {
  //   mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fpa2VzaGFyaSIsImEiOiJja2swdzdsenEwNG9lMnBvYng2MHcyeHM2In0.mDb-u84xTCaZ8j9VH0fKSQ'
  //   var map = new mapboxgl.Map({
  //     container: this.map,
  //     style: 'mapbox://styles/mapbox/light-v8',
  //     center: [-87.62979819999998, 41.8781136],
  //     zoom: 9
  //   })
  // }

  render() {

    const mapStyles = {
      height: "200px",
      width: "100%"
    }
    const fullMapStyle = {
      height: '85vh',
      width: '100%'
    }


    // const latitude = -73.9749
    // const longitude = 40.7736

    const Map = ReactMapboxGl({
      accessToken:
        'pk.eyJ1Ijoic2Fpa2VzaGFyaSIsImEiOiJja2swdzdsenEwNG9lMnBvYng2MHcyeHM2In0.mDb-u84xTCaZ8j9VH0fKSQ'
    });

    return (
      <React.Fragment>

        <Button onClick={this.toggleModal} type="button" className="btn btn-outline-danger btn-sm bg-light text-dark contact-buttons mb-3 direction-btn">
          <span>
            <img src={Direction} alt="Error" />
            <p className="d-inline">
              {/* Directions */}
               Location
            </p>
          </span>
        </Button>
        <span className="d-none d-md-block">
          <Map
            style="mapbox://styles/mapbox/streets-v11"
            center={[this.state.longitude,
            this.state.latitude]}
            containerStyle={mapStyles}>
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
              <Feature coordinates={[]} />
            </Layer>
          </Map>
        </span>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="reviewModal">

          <ModalBody>
            <div className="p-3">
              <div className="p-4" style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                <div className="row pb-3">
                  <div className="col-5 col-sm-4 ">
                    <div className="fs-4 fs-sm-3 fs-md-2" style={{ color: "#FF5454" }}>
                      Direction
                    </div>
                  </div>

                  <div className="col-4 my-auto ">
                    <div className="d-flex justify-content-center">
                      <img className="px-xl-3 px-md-2 px-1 px-xs-0" src={personwalk} alt="error" fluid />
                      <img className="px-xl-3 px-md-2 px-1 px-xs-0" src={carsign} alt="error" fluid />
                      <img className="px-xl-3 px-md-2 px-1 px-xs-0" src={dirsign} alt="error" fluid />
                    </div>
                  </div>
                  <div className=" col-3 col-sm-4 my-auto ">
                    <div className="d-flex flex-row justify-content-end">
                      {/* <Image src={xsign} fluid onClick={this.toggleModal} /> */}
                      <FontAwesomeIcon icon={faTimes} onClick={this.toggleModal} size="2x" style={{ color: "#FF5454" }} />
                    </div>
                  </div>

                </div>
                {/* <hr /> */}
                {/* <LoadScript googleMapsApiKey='AIzaSyCE_RlPAVZTJ_gUjC0IwZgRLkN_Xviv8wk'>
              <GoogleMap
                mapContainerStyle={fullMapStyle}
                zoom={13}
                center={defaultCenter}
              >
                <Marker position={defaultCenter} />
              </GoogleMap>
            </LoadScript> */}
                <div style={{ boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                  <Map
                    style="mapbox://styles/mapbox/streets-v11"
                    center={[this.state.longitude,
                    this.state.latitude]}
                    containerStyle={fullMapStyle}>
                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                      <Feature coordinates={[]} />
                    </Layer>
                  </Map>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>

    )
  }
}

const RestaurantPage = (props) => {

  const mapStyles = {
    height: "300px",
    width: "100%"
  }

  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }

  const latitude = -73.9749
  const longitude = 40.7736

  const [isLoaded, setIsLoaded] = useState(false)
  const [isFullyLoaded, setIsFullyLoaded] = useState(false)

  useEffect(() => {

    props.actions.getRestaurantDetails(props.match.params.id).then((result) => {
      if (result.success) {
        setIsFullyLoaded(true);
      }
    })

    props.actions.getFood_items(props.match.params.id).then((result) => {

      if (result.success) {
        setIsLoaded(true);
      }
    })

  }, []);

  const [open, setOpen] = useState(false);
  // const restaurantId = '1'
  // // passed a default value in restaurantId <-> Not tested the working
  // useEffect(() => {
  //   window.addEventListener('load', actions.getReview(restaurantId).then((result) => {
  //     if (result.success) {
  //       // to load the review array
  //     } else {
  //       this.setState({
  //         error: result.message,
  //       });
  //     }
  //   }));
  //   // returned function will be called on component unmount 
  //   return () => {

  //   }
  // }, [])

  // const [reviewCounter, setReviewCounter] = useState(1);

  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1Ijoic2Fpa2VzaGFyaSIsImEiOiJja2swdzdsenEwNG9lMnBvYng2MHcyeHM2In0.mDb-u84xTCaZ8j9VH0fKSQ'
  });

  if (isLoaded == false || isFullyLoaded == false) {
    return (
      <>
        <Preloader />
      </>
    )
  }
  else {
    // console.log(props.myMenu);
    return (
      <>
        <Header />
        <RestaurantBack details={props.restaurantDetails} />
        <div className="p-3 m-1 m-md-0 gallery-menu-map">
          <div className="row ">
            <div className="col-12 col-md-4 order-1 my-3 order-md-0 m-0 gallery">
              <MenuGallery />
            </div>
            <div className="col-12 col-md-5 m-md-0 mx-0 mt-3 mt-md-1 order-0 order-md-1">
              <h3>Menu</h3>
              <div style={{ maxHeight: "500px" }} className="overflow-auto menu-details px-2">

                {
                  props.myMenu.slice(0).reverse().map(item => (
                    <DisplayMenu item={item} />
                  ))
                }
              </div>
            </div>

            <div className="col-12 col-md-3 m-0 my-3 mt-md-2 map-and-navigation order-2 d-block">
              <span>
                <h4>Address</h4>

                <p>{props.restaurantDetails.Address}</p>

                <p>{props.restaurantDetails.contactNo}</p>

                {/* props.restaurantDetails.latitude , props.restaurantDetails.longitude */}

                {/* <ViewMap /> */}

                <Button onClick={
                  () => {
                    window.open(`https://www.google.co.in/maps?q=${props.restaurantDetails.latitude},${props.restaurantDetails.longitude}`)
                  }
                } type="button" className="btn btn-outline-danger btn-sm bg-light text-dark contact-buttons mb-3 direction-btn">
                  <span>
                    <img src={Direction} alt="Error" />
                    <p className="d-inline">
                      {/* Directions */}

                      Location
                    </p>
                  </span>
                </Button>

              </span>
              {/* <LoadScript
                  googleMapsApiKey='AIzaSyCE_RlPAVZTJ_gUjC0IwZgRLkN_Xviv8wk_GeneratedErrorForLimitedUse'>
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={7}
                    center={defaultCenter}
                  />
                </LoadScript> */}
            </div>
          </div>
        </div>

        {/* <div className="container bg-white">
          <span className="d-flex justify-content-between mt-3 mt-md-0 mt-xl-4 pt-xl-2 ml-1">
            <Review reviews={reviews} />
            <h4>Sort By:</h4>
          </span>
          <hr />
          {
            reviews.map(review => (
              <Reviews rating={review.rate} id={review.id} name={review.name} headline={review.headline} text={review.text} />
            ))
          }
        </div> */}
        <Fade bottom>
          <Footer />
        </Fade>

      </>
    );

  };
}


// const mapStateToProps = (state) => {
//   return {
//     reviews: state.review.reviews
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     actions: bindActionCreators({
//       getReview,
//     }, dispatch),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);

const mapStateToProps = (state) => {
  return {
    myMenu: state.menu.food_items,
    restaurantDetails: state.menu.getRestaurantDetails,
    userInfo: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getFood_items,
      getRestaurantDetails,
    }, dispatch),
  };
}

export default connect(mapStateToProps,
  mapDispatchToProps)(RestaurantPage);