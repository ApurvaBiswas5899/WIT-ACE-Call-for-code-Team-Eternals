// import img1 from './images/img1.png';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { bindActionCreators } from "redux";
import { updateFilter } from "../../actions/views/filter";
import Footer from "../../components/footer/Footer.js";
import NavHomepage from "../../components/headerHomepage/headerHomepage.js";
import "./homepage.css";



function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function setCount(screenWidth, restDesktop, restTab1, restTab2, restMobile) {
  // console.log("Somehting Here!!");
  if (screenWidth >= 1220) {
    return restDesktop;
  } else if (screenWidth >= 767 && screenWidth < 1220) {
    return restTab1;
  } else if (screenWidth >= 585 && screenWidth < 767) {
    return restTab2;
  } else {
    return restMobile;
  }
}

function RestDesktopView(restaurants) {
  // console.log("Destop");
  const restDesktop = [];
  for (var i = 0; i < 7; i++) {
    restDesktop.push(restaurants[i]);
  }
  return restDesktop;
}

function RestTab1View(restaurants) {
  // console.log("Tab1");
  const restDesktop = [];
  for (var i = 0; i < 5; i++) {
    restDesktop.push(restaurants[i]);
  }
  return restDesktop;
}

function RestTab2View(restaurants) {
  // console.log("Tab2");
  const restDesktop = [];
  for (var i = 0; i < 3; i++) {
    restDesktop.push(restaurants[i]);
  }
  return restDesktop;
}

function RestMobileView(restaurants) {
  // console.log("Mobile");
  const restDesktop = [];
  for (var i = 0; i < 3; i++) {
    restDesktop.push(restaurants[i]);
  }
  return restDesktop;
}

function Homepage(props) {
  const [veg, setVeg] = useState("0");
  const [restDesktop, setRestDesktop] = useState(null);
  const [restTab1, setRestTab1] = useState(null);
  const [restTab2, setRestTab2] = useState(null);
  const [restMobile, setRestMobile] = useState(null);
  const [restDisplay, setRestDisplay] = useState(null);
  const [userLongitude, setUserLongitude] = useState("-70");
  const [userLatitude, setUserLatitude] = useState("40");

  let error = "";
  const { height, width } = useWindowDimensions();

  // useEffect(() => {
  //     setRestDesktop(RestDesktopView(restaurants)); // replace by props.restaurants
  //     setTab1(RestTab1View(restaurants));
  //     setTab2(RestTab2View(restaurants));
  //     setMobile(RestMobileView(restaurants));
  //     setRestDisplay(setCount(width, restDesktop, restTab1, restTab2, restMobile));
  // })

  // function handleDesktop(restArray) {
  //     setRestDesktop(RestDesktopView(restArray))
  // }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // alert(`${position.coords.latitude}`)
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      setUserLatitude(position.coords.latitude);
      setUserLongitude(position.coords.longitude);
    });

    props.actions
      .updateFilter("true", "1", veg, userLatitude, userLongitude)
      .then((result) => {
        if (result.success) {
          // console.log(result.restaurants);
          // handleDesktop(result.restaurants)

          setRestDesktop(RestDesktopView(result.restaurants));
          setRestTab1(RestTab1View(result.restaurants));
          setRestTab2(RestTab2View(result.restaurants));
          setRestMobile(RestMobileView(result.restaurants));

          // setRestDisplay(setCount(width, restDesktop, restTab1, restTab2, restMobile)) // Not Gettign updated values
        } else {
          error = result.error;
        }
      });
  }, []);

  useEffect(() => {
    setRestDisplay(
      setCount(width, restDesktop, restTab1, restTab2, restMobile)
    );
  }, [restDesktop, restTab1, restTab2, restMobile]);
  // if (restDesktop && restTab2 && restTab1 && restMobile) {

  //     setRestDisplay(setCount(width, restDesktop, restTab1, restTab2, restMobile)) // Too many re-renders
  // }

  if (restDisplay === null) {
    return <>Add preLoader...</>;
  } else {
    // console.log(restDisplay); // This array is displaying comepletely diff content from one in postman !!!!!!!!!!!
    return (
      <div>
        <NavHomepage />
        <div className="searchDiv">
          <div className="searchBox">
            <span className="d-none d-sm-inline mx-1">Search for</span>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="searchInput1 "
                type="search"
                aria-label="Search"
              />
              <button className="searchButton" type="submit">
                In All
              </button>
            </form>
          </div>
          <div className="searchBoxLower">
            <a href="/readmore" style={{ textDecoration: "none" }}>
              Read More &gt;{" "}
            </a>
            <p style={{ minHeight: "50px" }}></p>
            {/* 
                    <img alt="search" src={searchBoxImage} className="searchImage"></img> 
                    Leave Space for doodle 
                    */}
          </div>
        </div>
        <Fade bottom>
          <div className="restGrid">
            <div className="gridHead">
              <h2>Pantry Items Near You</h2>
              <div className="vegNon">
                <div className="lineVeg">
                  {veg == 0 ? (
                    <>
                      <div className="greenLineNo"></div>
                      <div className="redLine"></div>
                    </>
                  ) : (
                    <>
                      <div className="greenLine"></div>
                      <div className="redLineNo"></div>
                    </>
                  )}
                </div>
                <div>
                  <span className="vegText" onClick={() => setVeg(1)}>
                    Veg
                  </span>
                  <span> | </span>
                  <span className="nonVegText" onClick={() => setVeg(0)}>
                    Non-Veg
                  </span>
                </div>
              </div>
            </div>

            <div className="restingrid">
              <div className="row restCards">
                {restDisplay.map((rest) => {
                  return (
                    // <Rotate>
                    <div className="col-lg-3 col-md-3 col-sm-6 mb-4 restCard restCard1">
                      <div className="card restCard">
                        <a href="#">
                          <img
                            className="card-img-top"
                            src={rest.images}
                            alt=""
                          />
                        </a>
                        <div className="card-body p-0">
                          <h4 className="card-title mb-0">
                            <a href="/menu" style={{ textDecoration: "none" }}>
                              {rest._id}
                            </a>
                          </h4>
                          <p className="card-text">
                            {rest.description}
                            {/* {rest.map((det) => {
                                                            return (
                                                                <span>{det} </span>
                                                            )
                                                        })} */}
                          </p>
                        </div>
                      </div>
                    </div>
                    //</Rotate>
                  );
                })}
                <div className="col-lg-3 col-md-3 col-sm-6 mb-4 restCard restCard1 seeMoreCard">
                  <div
                    className="card restCard"
                    style={{
                      background: "inherit",
                      fontSize: "2rem",
                      marginTop: "14%",
                    }}
                  >
                    <a
                      href="/pantryItemsNearYou"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        See More
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        <Fade bottom>
          <div className="restGrid">
            <div className="gridHead">
              <h2>Restaurants Near You</h2>
            </div>

            <div className="restingrid">
              <div className="row restCards">
                {restDisplay.map((rest) => {
                  return (
                    // <Rotate>
                    <div className="col-lg-3 col-md-3 col-sm-6 mb-4 restCard restCard1">
                      <div className="card restCard">
                        <a href="#">
                          <img
                            className="card-img-top"
                            src={rest.images}
                            alt=""
                          />
                        </a>
                        <div className="card-body p-0">
                          <h4 className="card-title mb-0">
                            <a href="/menu" style={{ textDecoration: "none" }}>
                              {rest.restaurantName}
                            </a>
                          </h4>
                          <p className="card-text">
                            {rest.description}
                            {/* {rest.map((det) => {
                                                            return (
                                                                <span>{det} </span>
                                                            )
                                                        })} */}
                          </p>
                        </div>
                      </div>
                    </div>
                    //</Rotate>
                  );
                })}
                <div className="col-lg-3 col-md-3 col-sm-6 mb-4 restCard restCard1 seeMoreCard">
                  <div
                    className="card restCard"
                    style={{
                      background: "inherit",
                      fontSize: "2rem",
                      marginTop: "14%",
                    }}
                  >
                    <a
                      href="/pantryItemsNearYou"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        See More
                      </div>
                    </a>
                  </div>
                </div>
              </div>
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
    restaurants: state.filter.restaurants, // Just declared, not used !
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        updateFilter,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
