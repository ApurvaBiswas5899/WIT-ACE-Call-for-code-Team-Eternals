import { React, useState, useEffect } from "react";
import cartsign from "./images/cartImage.png";
import emptyCart from "./images/emptyCart.png";
// import paytm from "./images/Paytm.png";
// import paypal from "./images/Paypal.png";
// import payu from "./images/Payu.png";
// import razorpay from "./images/Razorpay.png";
import Header from "../../../components/header/header.js";
import Fade from "react-reveal/Fade";

import "bootstrap/dist/css/bootstrap.css";
import "./cartPage.css";

import { Link } from "react-router-dom";
import { Image, Button, Collapse } from "react-bootstrap";

import {
  faPlusCircle,
  faMinusCircle,
  faAngleDown,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cartItem } from "../cartItems.js";
import OnlinePayment from "./onlinepaymentdiv.js";
import PayonPickup from "./PayonPickup.js";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addToOrder,
  removeFromOrder,
  getTotal,
  placeOrder,
  postOrder,
  clearCart,
} from "../../../actions/views/order.js";
import { getRestaurantDetails } from "../../../actions/views/food.js";

import Preloader from "../../../components/preloader.js";

// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Summary = ({ orderSummary }) => {
  return (
    <div className="content_div bg-white mx-auto px-2 py-3 my-3 row border my-border rounded">
      <div className="d-flex justify-content-between mx-0 mx-sm-2">
        <div className="d-flex">
          <Image
            className="rounded-circle eatery-image"
            src={orderSummary.restaurantImages[0]}
            fluid
          />
          <div className="mt-2 ml-sm-auto mx-3 cartrers ">
            <h3 className="boldest-text">{orderSummary.restaurantName}</h3>
          </div>
        </div>
        <div className="mt-2 ml-sm-auto mx-3 mx-md-4 mx-lg-5 cartrers">
          <h3 className="boldest-text">Rs. {orderSummary.total}</h3>
        </div>
      </div>
      {orderSummary.foodItems.map((foodItem) => (
        // getTotal(foodItem.totalPrice),
        <div className="row my-1 my-sm-0">
          <div className="col-sm-1"></div>
          <div className="col-2 ml-2 imagecart">
            <Image className="rounded-circle" src={foodItem.image} fluid />
          </div>
          <div className="head d-flex flex-row col-3 cartcontent mt-1">
            <h3>{foodItem.name}</h3>
          </div>
          <div className="countings d-flex flex-row col-4 cartcontent mt-1">
            <h3 className="px-2 mt-1">
              {foodItem.price} X {foodItem.qty}
            </h3>
          </div>
          <div className="col-auto mt-1 cartcontent px-0">
            <h3 className="px-2 mt-1">Rs. {foodItem.price * foodItem.qty}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

function CartPage(props) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [display, setDisplay] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  function trigger() {
    if (count == 1) {
      setCount(0);
    } else {
      setCount(1);
    }
  }

  function orderPost() {
    props.actions
      .postOrder(
        props.userDetails._id,
        props.allDetails.restaurantID,
        props.restaurantDetails.restaurantName,
        props.restaurantDetails.images,
        props.allDetails.total,
        props.allDetails.updated,
        props.allDetails.created,
        props.allDetails.paymentMode,
        props.allDetails.paymentSuccess,
        props.allDetails.consumedFood,
        props.allDetails.completed,
        props.userDetails.name,
        props.allDetails.newItems
      )
      .then((response) => {
        if (response.success === true) {
          props.actions.clearCart();
          setOrderPlaced(true);
        }
      });
  }

  useEffect(() => {
    props.actions.getTotal();

    props.actions
      .getRestaurantDetails(props.allDetails.restaurantID)
      .then((response) => {
        setDisplay(true);
      });
  }, []);

  if (!props.userDetails._id) {
    window.location = "/login";
  } else {
    if (display === false) {
      return (
        <>
          <Preloader />
        </>
      );
    } else {
      console.log(props);
      return (
        <div className="overall-container">
          <Header />

          <div className="body-container p-4 mx-lg-4 mt-2 mx-sm-1">
            <div className="row ">
              <Fade left>
                <div className="col-12 col-lg-7">
                  <div className="cart-sign d-flex my-4 mx-auto">
                    <Image src={cartsign} fluid />
                    <p className="d-inline mt-2 px-4 py-1">Your order items </p>
                  </div>

                  {/* <div className="content_div bg-white mx-auto px-2 py-3 my-3 row border rounded my-border" >
                                <div className="d-flex justify-content-between mx-0 mx-sm-2">
                                    <div className="d-flex">
                                        <Image className="rounded-circle eatery-image" src={cartItem[0].image} fluid />
                                        <div className="mt-2 ml-sm-auto mx-3 cartrers ">
                                            <h3 className="boldest-text">Mumbai Caterers</h3>
                                            <p>12:00 PM - 6:00PM</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 ml-sm-auto mx-3 mx-md-4 mx-lg-5 cartrers">
                                        <h3 className="boldest-text">Rs.40</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="content_div bg-white mx-auto px-2 py-3 my-3 row border my-border rounded">
                                <div className="d-flex justify-content-between mx-0 mx-sm-2">
                                    <div className="d-flex">
                                        <Image className="rounded-circle eatery-image" src={cartItem[0].image} fluid />
                                        <div className="mt-2 ml-sm-auto mx-3 cartrers ">
                                            <h3 className="boldest-text">Mumbai Caterers</h3>
                                            <p>12:00 PM - 6:00PM</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 ml-sm-auto mx-3 mx-md-4 mx-lg-5 cartrers">
                                        <h3 className="boldest-text">Rs.40</h3>
                                    </div>
                                </div>
                            </div> */}
                  <div className="content_div bg-white mx-auto px-2 py-3 my-3 row border my-border rounded">
                    {props.cart.length ? (
                      <>
                        <div className="d-flex justify-content-between mx-0 mx-sm-2">
                          <div className="d-flex">
                            <Image
                              className="rounded-circle eatery-image"
                              src={props.restaurantDetails.images[0]}
                              fluid
                            />
                            <div className="mt-2 ml-sm-auto mx-3 cartrers ">
                              <h3 className="boldest-text">
                                {props.restaurantDetails.restaurantName}
                              </h3>
                              <p>{props.restaurantDetails.description}</p>{" "}
                              {/*  12:00 PM - 6:00PM */}
                            </div>
                          </div>
                          <div className="mt-2 ml-sm-auto mx-3 mx-md-4 mx-lg-5 cartrers">
                            <h3 className="boldest-text">
                              Rs. {props.allDetails.total}
                            </h3>
                          </div>
                        </div>
                        {props.cart.map((cartItem) => (
                          // getTotal(cartItem.totalPrice),
                          <div className="row my-1 my-sm-0">
                            <div className="col-sm-1"></div>
                            <div className="col-2 ml-2 imagecart">
                              <Image
                                className="rounded-circle"
                                src={cartItem.image}
                                fluid
                              />
                            </div>
                            <div className="head d-flex flex-row col-3 cartcontent mt-1">
                              <h3>{cartItem.name}</h3>
                            </div>
                            <div className="countings d-flex flex-row col-4 cartcontent mt-1">
                              <FontAwesomeIcon
                                icon={faPlusCircle}
                                className="mt-1 "
                                onClick={() => {
                                  props.actions.addToOrder(cartItem);
                                  props.actions.getTotal();
                                }}
                              />
                              <h3 className="px-2 mt-1">
                                {cartItem.price} X {cartItem.qty}
                              </h3>
                              <FontAwesomeIcon
                                icon={faMinusCircle}
                                className="mt-1 "
                                onClick={() => {
                                  props.actions.removeFromOrder(cartItem);
                                  props.actions.getTotal();
                                }}
                              />
                            </div>
                            <div className="col-auto mt-1 cartcontent px-0">
                              <h3 className="px-2 mt-1">
                                Rs. {cartItem.totalPrice}
                              </h3>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="d-flex justify-content-center mx-0 mx-sm-2">
                          <div className="d-flex justify-content-center">
                            <img
                              src={emptyCart}
                              style={{ height: "300px", width: "300px" }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Fade>
              {props.cart.length ? (
                <>
                  <div className="col-12 col-lg-1"></div>
                  <Fade right>
                    <div className="col-12 col-lg-4">
                      <div className="mt-3 d-flex justify-content-center">
                        {/* onClick={trigger} */}
                        {pickup === true ? (
                          <>
                            <button
                              onClick={() => {
                                props.actions.placeOrder(props.cart);
                              }}
                              className="dropdown-btn glyphicon glyphicon-chevron-down rounded-border text-decoration-none py-1 my-border"
                              style={{ backgroundColor: "#0DD689" }}
                              id="dropdownMenuLink"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Confirm To Proceed
                              <FontAwesomeIcon
                                icon={faChevronDown}
                                className="mx-3"
                              />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                props.actions.placeOrder(props.cart);
                                setPickup(true);
                              }}
                              className="dropdown-btn glyphicon glyphicon-chevron-down rounded-border text-decoration-none py-1 my-border"
                              id="dropdownMenuLink"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Confirm To Proceed
                              <FontAwesomeIcon
                                icon={faChevronDown}
                                className="mx-3"
                              />
                            </button>
                          </>
                        )}
                      </div>
                      {/* <OnlinePayment/> */}
                      {count === 0 ? (
                        <OnlinePayment />
                      ) : (
                        // console.log(props.allDetials),
                        <>
                          <div className="rounded-border bg-white mt-4 py-3  my-border">
                            <div className="my-5 mx-4 d-flex justify-content-center">
                              {pickup === true ? (
                                <>
                                  <button
                                    onClick={() => {
                                      orderPost();
                                    }}
                                    className="dropdown-btn text-decoration-none py-1 payBtnpickup text-white"
                                    href="#"
                                    role="link"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    Pay On Pickup
                                  </button>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Fade>
                </>
              ) : (
                <>
                  {props.allDetails.orderPlaced === true ? (
                    <>
                      <div className="col-12 col-lg-1"></div>
                      <Fade right>
                        <div className="col-12 col-lg-4">
                          <div className="mt-3 d-flex justify-content-center">
                            <button
                              onClick={() => {
                                setShowOrder(!showOrder);
                                // console.log(props.currentOrderInfo);
                              }}
                              className="dropdown-btn text-decoration-none py-1 payBtnpickup text-white"
                              href="#"
                              role="link"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Order Summary
                            </button>
                          </div>
                        </div>
                      </Fade>
                    </>
                  ) : (
                    <></>
                  )}
                  {showOrder === true ? (
                    <Summary orderSummary={props.currentOrderInfo} />
                  ) : (
                    <> </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.order.foodItems, // yeh
    allDetails: state.order,
    userDetails: state.user,
    restaurantDetails: state.menu.getRestaurantDetails,
    currentOrderInfo: state.order.currentOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        addToOrder, // yeh
        removeFromOrder, // yeh
        getTotal, // yeh
        placeOrder,
        postOrder,
        getRestaurantDetails,
        clearCart,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
