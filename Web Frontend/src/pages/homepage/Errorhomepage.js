import React, { useState, useEffect, useRef } from "react";
import AltNavHomepage from "../../components/headerHomepage/altheaderHomepage.js";
import Footer from "../../components/footer/Footer.js";
import "./althomepage.css";
import defaultRestaurantImage from "../../components/images/Back-2.png";
import { restaurants } from "../restaurants.js";
import SearchIcon from "../images/SearchIcon.png";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

// import { RestaurantPage } from '../menuPage/RestaurantPage.js';
import { Link } from "react-router-dom";
// import img1 from './images/img1.png';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Fade from "react-reveal/Fade";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateFilter } from "../../actions/views/filter";
// import { restaurantDetails } from '../../actions/views/food';

import Preloader from "../../components/preloader.js";

import Geocode from "react-geocode";

import { homeRest } from "../restaurants.js";
import { Card } from "react-bootstrap";
import Start from "./stars.svg";
import { Images } from "./images";
import { Point } from "mapbox-gl";

const toggleButton = (state) => {};

function Homepage(props) {
  const [veg, setVeg] = useState("0");
  const [userLongitude, setUserLongitude] = useState("-70");
  const [userLatitude, setUserLatitude] = useState("40");
  const [isLoaded, setIsLoaded] = useState(false);
  const [toggleveg, settoggleveg] = useState("#212529");
  const [togglenonveg, settogglenonveg] = useState("#212529");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // alert(`${position.coords.latitude}`)
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setUserLatitude(position.coords.latitude);
      setUserLongitude(position.coords.longitude);
    });

    props.actions
      .updateFilter("true", "1", veg, userLatitude, userLongitude)
      .then((result) => {
        if (result.success) {
          setTimeout(() => {
            setIsLoaded(true);
          }, 1000);
        }
      });

    // setTimeout(() => {
    //     display(result.restaurants)
    // }, 1000);

    // var getCurrentTime = new Promise(function (resolve, reject) {
    //     setTimeout(() => {
    //         setRestDisplay(result.restaurants)
    //         // resolve(console.log(restDisplay))
    //     }, 1500)
    // })
  }, [veg]);

  if (isLoaded === false) {
    return (
      <>
        <Preloader />
      </>
    );
  } else {
    return (
      <div>
        <AltNavHomepage />
        <div
          className="searchDiv d-flex justify-content-center"
          style={{ position: "relative" }}
        >
          {/* <div className="searchBox">
                        <span className="d-none d-sm-inline mx-1" style={{ color: "#FF5454" }}>Search for</span>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="searchInput1 " type="search" aria-label="Search" />
                            <button className="searchButton" type="submit" style={{ backgroundColor: "#FF5454" }}>In All</button>
                        </form>

                    </div> */}

          <div
            className="d-flex w-75 bg-white form-group has-search"
            style={{
              height: "40px",
              borderRadius: "10px",
              position: "absolute",
              top: "20%",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <span className="form-control-feedback">
              <img src={SearchIcon} />
            </span>

            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </div>
        {/* <div className="vegNon w-100 mt-5 px-3 px-sm-4 d-flex justify-content-end">
          <div></div>
        </div> */}
        <Fade left>
          <div className={"cards__container"} style={{ margin: "5rem" }}>
            <div className="toggle__menu">
              <h2
                className="heading__of__food__sections"
                style={{ fontWeight: "700" }}
              >
                Meals near you
              </h2>
              <div className="toggle__veg__nonveg">
                <span
                  // className="vegText"
                  style={{ color: toggleveg, cursor: "pointer" }}
                  onClick={() => {
                    setVeg(1);
                    settoggleveg("#198754");
                    settogglenonveg("#212529");
                  }}
                >
                  Veg
                </span>
                <span> | </span>
                <span
                  // className="nonVegText"
                  style={{ color: togglenonveg, cursor: "pointer" }}
                  onClick={() => {
                    setVeg(0);
                    settoggleveg("#212529");
                    settogglenonveg("#dc3545");
                  }}
                >
                  Non-Veg
                </span>
              </div>
            </div>
            <div
              className="restingrid "
              style={{ justifyContent: "space-around" }}
            >
              {
                // homeRest
                Images.restaurants.map((rest) => {
                  return (
                    <div class="d-flex justify-content-between">
                      <Card style={{ width: "24rem" }}>
                        <Card.Body>
                          {rest.images.length ? (
                            <Card.Img
                              style={{ width: "350px", height: "250px" }}
                              src={rest.images[0]}
                              alt="e"
                            />
                          ) : (
                            //   className="card-img-top home-default-img"
                            <Card.Img
                              className="card-img-top home-default-img"
                              style={{ width: "350px", height: "250px" }}
                              src={rest.images[0]}
                              alt="e"
                            />
                          )}
                          <div className="card__flex__space__between">
                            <Card.Title>
                              Nilkamal Pure Veg Restaurant
                            </Card.Title>
                            <Card.Text style={{ color: "#FF5454" }}>
                              700 m
                            </Card.Text>
                          </div>
                          <div className="card__flex__space__between">
                            <Card.Title>
                              Indian | Chineese | South Indian
                            </Card.Title>

                            <div className="rating">
                              <img
                                className={"star"}
                                src={`${Start}`}
                                alt="rating"
                              />
                              <Card.Text style={{ color: "#FFF" }}>
                                4.7
                              </Card.Text>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    // <div className="m-0 mx-2 mx-sm-3 my-3 p-0">
                    //   <Link to={`/menu/${rest._id}`}>
                    //     <div className="card homepage-card-width">
                    //       {rest.images.length ? (
                    //         <img
                    //           className="card-img-top home-default-img"
                    //           style={{ width: "300px", height: "150px" }}
                    //           src={rest.images[0]}
                    //           alt="e"
                    //         />
                    //       ) : (
                    //         <img
                    //           className="card-img-top home-default-img"
                    //           style={{ width: "300px", height: "150px" }}
                    //           src={defaultRestaurantImage}
                    //           alt="e"
                    //         />
                    //       )}

                    //       <div className="card-body p-0">
                    //         <p className="m-0">{rest.restaurantName}</p>

                    //         <p className="card-text my-1">
                    //           {rest.description} | {rest.Address} |{" "}
                    //           {rest.rating}
                    //         </p>
                    //       </div>
                    //     </div>
                    //   </Link>
                    // </div>
                  );
                })
              }
              {/* <div className="col-lg-3 col-md-3 col-sm-6 mb-4 restCard restCard1 seeMoreCard">
                                    <div className="card restCard" style={{ background: "inherit", fontSize: "2rem", marginTop: "14%" }}>
                                        <a href="/pantryItemsNearYou" style={{ textDecoration: "none" }}>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </div>
          2                                  <div style={{ display: "flex", justifyContent: "center" }}>See More</div>
                                        </a>
                                    </div>
                                </div> */}
            </div>
          </div>
        </Fade>

        <Fade bottom>
          <Footer />
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.filter.restaurants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        updateFilter,
        // restaurantDetails,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
