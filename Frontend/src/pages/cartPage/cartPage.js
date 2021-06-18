import 'bootstrap/dist/css/bootstrap.css';
import { React, useEffect, useState } from 'react';
import { Button, Card, Nav } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { bindActionCreators } from 'redux';
import { getRestaurantDetails } from '../../actions/views/food.js';
import {
  addToOrder,
  clearCart,
  getTotal,
  placeOrder,
  postOrder,
  removeFromOrder,
} from '../../actions/views/order.js';
// import paytm from "./images/Paytm.png";
// import paypal from "./images/Paypal.png";
// import payu from "./images/Payu.png";
// import razorpay from "./images/Razorpay.png";
import HeaderHomepage from '../../components/headerHomepage/headerHomepage.js';
import CartPageLoader from '../../components/placeHolder/cartpage/desktop.js';
import CartPageLoaderMobileView from '../../components/placeHolder/cartpage/mobile.js';
import './cartPage.css';
import cart from './images/cart.svg';
import emptyCart from './images/empty-cart.svg';
import paymentimg from './images/payment.png';
import razorpay from './images/reazorpay.png';
import defultResturentImg from './images/rest1.png';
import waltimg from './images/wallet.png';
import axios from 'axios';
import { API_ROOT } from '../../utils/url';

//metadata
import MetaData from '../../utils/metaData';

function CartPage(props) {
  const [display, setDisplay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [orderPlaced, setOrderPlaced] = useState(false);
  console.log(props);
  useEffect(() => {
    props.actions.getTotal();
    props.actions
      .getRestaurantDetails(props.allDetails.restaurantID)
      .then((response) => {
        setDisplay(true);
      });
  }, []);

  window.addEventListener('resize', () => setWidth(window.innerWidth));

  function postOrder() {
    console.log(props);
    // const = props;
    // console.log(allDetails, cart, userDetails, restaurantDetails);
    const postOrderObj = {
      userID: props.userDetails._id,
      restaurantID: props.allDetails.restaurantID,
      total: null,
      updated: new Date(),
      created: new Date(),
      paymentMode: 'Cash On Delivery',
      paymentSuccess: 'Pending',
      restaurantName: props.allDetails.restaurantName,
      restaurantImage: props.restaurantDetails.images,
      consumedFood: 'none',
      complete: 'false',
      userName: props.userDetails.name,
      foodItems: {
        foodItemIds: [],
        foodItemQtys: [],
        foodItemPrices: [],
        foodItemNames: [],
        foodItemImages: [],
      },
    };

    props.cart.map(
      ({ id, qty, price, name, image }) => (
        postOrderObj.foodItems.foodItemIds.push(id),
        postOrderObj.foodItems.foodItemQtys.push(qty),
        postOrderObj.foodItems.foodItemPrices.push(price),
        postOrderObj.foodItems.foodItemNames.push(name),
        postOrderObj.foodItems.foodItemImages.push(image)
      )
    );
    postOrderObj.total = props.cart.reduce(
      (accumulator, item) => accumulator + item.price * item.qty,
      0
    );
    console.log(postOrderObj, 'postOrderObj');
    props.actions.postOrder(postOrderObj).then((response) => {
      console.log(response);
      if (response.success === true) {
        props.actions.clearCart();
        setOrderPlaced(true);
      }
    });
  }

  const payHandler = async () => {
    let foodIdArray = [];
    let foodQtyArray = [];
    let totalAmount = 0;

    await props.cart.forEach((item) => {
      foodIdArray.push(item.id);
      foodQtyArray.push(item.qty);
    });

    totalAmount = await props.cart.reduce(
      (accumulator, item) => accumulator + item.price * item.qty,
      0
    );

    const orderData = JSON.stringify({
      total: totalAmount,
      foodItems: {
        foodItemIds: foodIdArray,
        foodItemQtys: foodQtyArray,
      },
      paymentMode: 'razorpay',
      userID: props.userDetails._id,
      restaurantName: props.allDetails.restaurantName,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let { data } = await axios.post(
      `${API_ROOT}/api/onlinePayment/order`,
      orderData,
      config
    );

    console.log('response', data);
    console.log('id', data.razorpay_order_id);

    var options = {
      key: 'rzp_test_wHeKhLFCmgfWbe', // Enter the Key ID generated from the Dashboard
      amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: props.userDetails.name,
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: data.razorpay_order_id,
      handler: function (response) {
        console.log('response', response);
        props.actions.clearCart();
        props.history.push('/profile');
      },
      prefill: {
        name: props.userDetails.name,
        email: props.userDetails.email,
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#ff5454',
      },
    };
    var rzp1 = new Razorpay(options);
    await rzp1.on('payment.failed', function (response) {
      alert('Payment Failed Please try once again');
    });

    await rzp1.open();
  };
  const postOrder_v2 = () => {
    const postOrderObj = {
      userID: props.userDetails._id,
      paymentMode: 'Cash On Delivery',
      complete: 'false',
      foodItems: {
        foodItemIds: [],
        foodItemQtys: [],
      },
      restaurantName: props.allDetails.restaurantName,
    };

    props.cart.map(
      ({ id, qty }) => (
        postOrderObj.foodItems.foodItemIds.push(id),
        postOrderObj.foodItems.foodItemQtys.push(qty)
      )
    );
    console.log(postOrderObj, 'postOrderObj_v2');
    props.actions.postOrder(postOrderObj).then((response) => {
      console.log(response);
      if (response.success === true) {
        props.actions.clearCart();
        setOrderPlaced(true);
      }
    });
  };

  if (!props.userDetails._id) {
    window.location = '/login';
  } else {
    // console.log(props, "cartProps");
    return (
      <div className="overall-container">
        <MetaData
          title={'Cart'}
          description={
            'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.'
          }
        />
        <HeaderHomepage />
        <div className="body-container">
          <div className="row ">
            <div className="checkout__container">
              <div className="cart__logo__section">
                <img src={cart} alt="cart__logo" className="cart__logo" />
                <p className="cart__logo__text">CHECKOUT </p>
              </div>
              <div className="content_div">
                {display === false ? (
                  <>
                    {width > 800 ? (
                      <CartPageLoader />
                    ) : (
                      <CartPageLoaderMobileView />
                    )}
                  </>
                ) : (
                  <>
                    {props.cart.length ? (
                      <>
                        <div className="restaurant__image__container">
                          <img
                            src={
                              // props.restaurantDetails.images.length >= 1
                              //   ? props.restaurantDetails.images[0]
                              //   :
                              defultResturentImg
                            }
                            alt="checkout_restaurant_image"
                            className="restaurant_image"
                          />
                        </div>
                        <div className="restaurant__details">
                          <div className="restaurant">
                            <div className="restaurant__name">
                              {props.restaurantDetails.restaurantName}
                            </div>
                            <div className="restaurant__timing">
                              12.00 PM - 06.00 PM
                            </div>
                          </div>
                          <div className="cart__item__container">
                            {props.cart.map((cartItem) => (
                              <div className="cart__item">
                                <div className="item">
                                  <img
                                    src={cartItem.image}
                                    alt="cart__item__img avatar"
                                    className="cart__item__img avatar"
                                  />
                                  <div className="item__name">
                                    {cartItem.name}
                                  </div>
                                </div>
                                <div className="item__count">
                                  <span
                                    className="subtract"
                                    onClick={() => {
                                      let qty = cartItem.qty - 1;
                                      const UpdCartItem = {
                                        name: cartItem.name,
                                        image: cartItem.image,
                                        qty: qty,
                                        price: cartItem.price,
                                        id: cartItem.id,
                                        stock: cartItem.stock,
                                        restaurantID: cartItem.restaurantID,
                                        restaurantName: cartItem.restaurantName,
                                      };
                                      if (qty <= 0) {
                                        dispatch(removeFromOrder(UpdCartItem));
                                      } else {
                                        dispatch(addToOrder(UpdCartItem));
                                      }
                                      // props.actions.removeFromOrder(cartItem);
                                      props.actions.getTotal();
                                    }}
                                  >
                                    -
                                  </span>
                                  <span className="count">
                                    <span className="count">
                                      {cartItem.qty}
                                    </span>
                                  </span>
                                  <span
                                    className="add"
                                    onClick={() => {
                                      let qty = cartItem.qty;
                                      if (qty >= cartItem.stock) return;
                                      qty = qty + 1;
                                      const UpdCartItem = {
                                        name: cartItem.name,
                                        image: cartItem.image,
                                        qty: qty,
                                        price: cartItem.price,
                                        id: cartItem.id,
                                        stock: cartItem.stock,
                                        restaurantID: cartItem.restaurantID,
                                        restaurantName: cartItem.restaurantName,
                                      };
                                      dispatch(addToOrder(UpdCartItem));

                                      // props.actions.addToOrder(UpdCartItem);
                                      // props.actions.getTotal();
                                      props.actions.getTotal();
                                    }}
                                  >
                                    +
                                  </span>
                                </div>
                                <div className="item__price">
                                  ₹ {cartItem.price * cartItem.qty}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="empty__cart">
                          <img
                            src={emptyCart}
                            alt="Empty cart Image"
                            className="empty__cart__img"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className="payment">
                  <Card
                    id="payment__card"
                    style={{
                      // border: "none",
                      borderLeft: '2px solid rgb(41, 42, 64) !important',
                    }}
                  >
                    <Card.Header className="payment__heading">
                      PAYMENT METHOD
                    </Card.Header>
                    <Card.Header>
                      <Nav
                        className="toggle__container"
                        variant="tabs"
                        defaultActiveKey="#first"
                      >
                        <Nav.Item>
                          <Nav.Link
                            href="#first"
                            onClick={(e) => {
                              e.preventDefault();
                              setPaymentMethod('COD');
                            }}
                            disable={!display}
                          >
                            <img
                              src={`${waltimg}`}
                              alt="payment"
                              className="walt"
                            />
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            href="link"
                            onClick={(e) => {
                              e.preventDefault();
                              setPaymentMethod('ONLINE');
                            }}
                            disabled={!display}
                          >
                            <img
                              src={`${paymentimg}`}
                              alt=""
                              className="online"
                            />{' '}
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Card.Header>
                    {paymentMethod === 'COD' ? (
                      <>
                        <Card.Title className="pay__on__pickup">
                          PAY ON PICKUP
                        </Card.Title>
                        <Card.Text className="paymet_qut">
                          Either pay by cash or scan the barode provied at the
                          outlet pickup point when collecting your order.
                        </Card.Text>
                        <div className="bill__details">
                          <div className="bill__heading">Bill Details</div>
                          <div className="item__total">
                            <p className="total">Item Total</p>
                            <p className="value">
                              {' '}
                              {props.cart.reduce(
                                (accumulator, cartItem) =>
                                  accumulator + cartItem.price * cartItem.qty,
                                0
                              ) + 0}
                            </p>
                          </div>
                          <div className="tax">
                            <p className="tax__and__charges">
                              Takes and Charges
                            </p>
                            {/* should add tax from server */}
                            <p className="value">$ 0 </p>
                          </div>
                          <div className="topay">
                            <p className="pay">TO PAY</p>
                            <p className="value topay__value">
                              {props.cart.reduce(
                                (accumulator, cartItem) =>
                                  accumulator + cartItem.price * cartItem.qty,
                                0
                              ) + 0}
                              {/* props.allDetails.tax} */}
                            </p>
                          </div>
                        </div>
                        <Button
                          className="book__now__button"
                          style={{
                            backgroundColor: '#20B941',
                            color: '#FFFFFF',
                          }}
                          disabled={!display || !props.cart.length > 0}
                          onClick={postOrder_v2}
                        >
                          BOOK ORDER
                        </Button>
                      </>
                    ) : (
                      <>
                        <Card.Title className="pay__on__pickup">
                          PAY ONLINE NOW
                        </Card.Title>
                        <Card.Text className="paymet_qut">
                          You will be redirected to our secure payment partner
                          Razorpay.
                          <br />
                          You can pay by UPI, Net Banking, Debit or Credit Card.
                        </Card.Text>
                        <div className="bill__details">
                          <div className="bill__heading">Bill Details</div>
                          <div className="item__total">
                            <p className="total">Item Total</p>
                            <p className="value">
                              {' '}
                              {props.cart.reduce(
                                (accumulator, cartItem) =>
                                  accumulator + cartItem.price * cartItem.qty,
                                0
                              ) + 0}
                            </p>
                          </div>
                          <div className="tax">
                            <p className="tax__and__charges">
                              Takes and Charges
                            </p>
                            <p className="value">$ 0</p>
                          </div>
                          <div className="topay">
                            <p className="pay">TO PAY</p>
                            <p className="value topay__value">
                              {props.cart.reduce(
                                (accumulator, cartItem) =>
                                  accumulator + cartItem.price * cartItem.qty,
                                0
                              ) + 0}
                            </p>
                          </div>
                        </div>
                        <Card.Text className="powerd__by">Powered by</Card.Text>
                        <img src={`${razorpay}`} alt="" className="razorpay" />
                        <Button
                          className="book__now__button"
                          style={{
                            backgroundColor: '#20B941',
                            color: '#FFFFFF',
                          }}
                          onClick={payHandler}
                          // onClick={postOrder_v2}
                          disabled={!display || !props.cart.length > 0}
                        >
                          BOOK ORDER
                        </Button>
                      </>
                    )}
                  </Card>
                </div>
              </div>
              <div className="qnas__container">
                <div className="qnas">
                  <p className="heading">Order Cancel FAQs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(state, "state cart page");
  return {
    cart: state.order.foodItems,
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
        getTotal,
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
