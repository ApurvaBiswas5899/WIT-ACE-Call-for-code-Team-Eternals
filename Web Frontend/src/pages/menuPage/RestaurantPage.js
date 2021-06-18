import React, { useEffect, useState } from 'react';
import './RestaurantPage.css';
import { useDispatch, useSelector } from 'react-redux';

//placeholder
import MapPlaceholder from '../../components/placeHolder/menuPage/mapPlaceholder';
import GalleryPlaceholder from '../../components/placeHolder/menuPage/galleryPlaceholder';
import RestInfoPlaceholder from '../../components/placeHolder/menuPage/restInfoPlaceholder';
import FoodItemPlaceHolder from '../../components/placeHolder/menuPage/foodItemPlaceholder';
import CartItemPlaceholder from '../../components/placeHolder/menuPage/cartItemPlaceholder';

//effects
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

//restoBack
import RestoBack from './restoBack';

//foodItem
import FoodItem from './foodItem';

//cartItem
import CartItem from './cartItem';

//header footer
import Header from '../../components/headerHomepage/headerHomepage';
import Footer from '../../components/footer/Footer';

//metadata
import MetaData from '../../utils/metaData';

// second component
import { Button } from 'reactstrap';
import { Tooltip } from 'reactstrap';
import direction from './images/direction.svg';
import share from './images/share.svg';
import foodItem1 from './images/foodItem1.png';
import foodItem2 from './images/foodItem2.png';
import foodItem3 from './images/foodItem3.png';
import Reviews from './displayreview';
import { useHistory } from 'react-router-dom';
//actions
import {
  getFood_items,
  getRestaurantDetails,
} from '../../actions/views/food.js';

const RestaurantPage = ({ match }) => {
  const currentLocation = window.location.href;
  const dispatch = useDispatch();
  //accessing state
  const details = useSelector((state) => state.menu);
  console.log(details);
  const restDetails = details.getRestaurantDetails;
  const foodItemDetails = details.food_items;

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [latitude, setLatitude] = useState(-73.9749);
  const [longitude, setLongitude] = useState(40.7736);
  const [restSuccess, setRestSuccess] = useState(false);
  const [foodSuccess, setFoodSuccess] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const url = `https://www.google.co.in/maps?q=${restDetails.latitude},${restDetails.longitude}`;

  const { foodItems } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getRestaurantDetails(match.params.id)).then((result) => {
      if (result.success) {
        setRestSuccess(true);
      }
    });
    dispatch(getFood_items(match.params.id)).then((result) => {
      if (result.success) {
        setFoodSuccess(true);
      }
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          console.log('err', err);
        },
        { timeout: 10000 }
      );
    }
  }, []);

  const copyToClipboard = (text) => {
    if (window.clipboardData && window.clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData('Text', text);
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported('copy')
    ) {
      var textarea = document.createElement('textarea');
      textarea.textContent = text;
      textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand('copy'); // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn('Copy to clipboard failed.', ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const toggle = () => {
    setTooltipOpen(!tooltipOpen);
    setTimeout(() => {
      setTooltipOpen(false);
    }, 2000);
  };
  let history = useHistory();
  function redirectTOCatPage() {
    history.push('/cart');
  }

  return (
    <>
      <MetaData
        title={
          restDetails.restaurantName ? restDetails.restaurantName : 'Book Order'
        }
        description={restDetails.description}
      />
      <Header />
      <Zoom>
        {restSuccess ? (
          <>
            <RestoBack
              details={restDetails}
              latitude={latitude}
              longitude={longitude}
            />
          </>
        ) : (
          <>
            <RestInfoPlaceholder />
          </>
        )}
      </Zoom>
      {/* next component */}

      <div className="container container-fluid info-container">
        <div className="row ">
          <div className="col-xl-3 my-3">
            <h4 className="text-center">About this place</h4>
            <Fade bottom>
              {restSuccess ? (
                <>
                  <div className="d-flex flex-column direction-div mx-auto">
                    <div className="info-heading-color info-heading-size info-low-margin">
                      Call
                    </div>
                    <span className="info-content-color info-content-size info-low-margin">
                      +91 {restDetails.contactNo}
                    </span>
                    <div className="info-heading-color info-heading-size info-low-margin">
                      Direction
                    </div>
                    <span className="info-content-color info-content-size info-low-margin">
                      {`${restDetails.Address}, ${restDetails.Pincode}`}
                    </span>
                    <div className="location-box">
                      <iframe
                        className="iframe-width"
                        src={`${url}&output=embed`}
                      ></iframe>
                    </div>
                    <div className="info-button-div">
                      <Button
                        className="btn btn-outline-danger btn-sm bg-light text-dark mx-1"
                        onClick={async () => {
                          await window.open(url);
                        }}
                      >
                        <img src={direction} alt="" />
                        <p className="d-inline mx-1 info-content-color">
                          Direction
                        </p>
                      </Button>

                      <Button
                        className="btn btn-outline-danger btn-sm bg-light text-dark mx-1"
                        id="TooltipExample"
                        onClick={() => {
                          copyToClipboard(currentLocation);
                        }}
                      >
                        <img src={share} alt="" />
                        <p className="d-inline mx-1 info-content-color">
                          Share
                        </p>
                      </Button>
                      <Tooltip
                        placement="bottom"
                        isOpen={tooltipOpen}
                        target="TooltipExample"
                        toggle={toggle}
                        trigger="click"
                      >
                        Copied to Clipboard!
                      </Tooltip>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <MapPlaceholder />
                </>
              )}
            </Fade>
          </div>
          <div className="col-xl-9 my-3">
            <div className="row menu-cart-scroller">
              <div className="col-lg-6 my-4 my-lg-3">
                <h2 style={{ paddingLeft: '12px', fontWeight: '700' }}>Menu</h2>
                <Fade bottom>
                  <div className="scroller mx-4">
                    {foodSuccess ? (
                      <>
                        {foodItemDetails.map((foodItem) => {
                          const isItemExist = foodItems.find(
                            (i) => i.id === foodItem._id
                          );
                          if (isItemExist) {
                            return (
                              <FoodItem
                                foodItem={foodItem}
                                key={foodItem._id}
                                quantity={isItemExist.qty}
                                restID={match.params.id}
                                restaurantName={restDetails.restaurantName}
                              />
                            );
                          } else {
                            return (
                              <FoodItem
                                foodItem={foodItem}
                                key={foodItem._id}
                                quantity={0}
                                restID={match.params.id}
                                restaurantName={restDetails.restaurantName}
                              />
                            );
                          }
                        })}
                      </>
                    ) : (
                      <>
                        <FoodItemPlaceHolder />
                      </>
                    )}
                  </div>
                </Fade>
              </div>
              <div className="col-lg-6 my-4 my-lg-3">
                {foodItems.length > 0 && (
                  <div className="cart-wrapper mx-3">
                    <h2 style={{ fontWeight: '700' }}>Cart</h2>
                    <div style={{ color: '#686A79', fontWeight: '700' }}>
                      {foodItems.length} ITEM
                    </div>
                    <Fade bottom>
                      <div className="d-flex flex-column cart-wrapper">
                        {foodSuccess ? (
                          <>
                            {foodItems.map((item) => (
                              <CartItem item={item} key={item.id} />
                            ))}
                          </>
                        ) : (
                          <>
                            <CartItemPlaceholder />
                          </>
                        )}
                      </div>
                      {foodSuccess ? (
                        <>
                          <div className="d-flex flex-row justify-content-between my-1">
                            <span
                              className="info-heading-color"
                              style={{ fontWeight: 600 }}
                            >
                              Subtotal
                            </span>
                            <span>
                              ₹{' '}
                              {foodItems.reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0
                              )}
                            </span>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <Button
                        className="btn btn-success btn-sm cart-button"
                        disabled={!foodSuccess}
                        onClick={redirectTOCatPage}
                      >
                        CHECKOUT
                      </Button>
                    </Fade>
                  </div>
                )}
                <div className="gallery-wrapper m-3 my-0">
                  <h2 style={{ fontWeight: '700' }}>Gallery</h2>
                  {restSuccess ? (
                    <>
                      <div className="row justify-content-center my-2">
                        <div className="col-4">
                          <img src={foodItem1} alt="" />
                        </div>
                        <div className="col-4">
                          <img src={foodItem2} alt="" />
                        </div>
                        <div className="col-4">
                          <img src={foodItem3} alt="" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <GalleryPlaceholder />
                    </>
                  )}
                  <Button
                    className="btn btn-danger btn-sm cart-button"
                    disabled={!foodSuccess}
                  >
                    VIEW ALL
                  </Button>
                </div>
              </div>
              {/* <div className="row my-4">
                <div>
                  <h2>Reviews</h2>
                  <div style={{ height: 450 }}></div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RestaurantPage;
