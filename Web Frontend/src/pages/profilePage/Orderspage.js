import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAuth,
  getOrder,
  getPendingOrder,
} from '../../actions/views/user.js';
import { Button } from 'react-bootstrap';
import fooditemimg from './images/Ellipse 45.png';
import defultResturentImg from './images/rest1.png';
import './Orderspage.css';

//placeholders
import PendingPlaceholder from '../../components/placeHolder/orderpage/pendingPlaceholder';
import PastOrderPlaceholder from '../../components/placeHolder/orderpage/pastOrdersPlaceholder';

const OrdersPage = (props) => {
  const [apiResult, setApiResult] = useState(false);
  console.log(props, 'props');
  // const [display, setDisplay] = useState(false);
  useEffect(() => {
    props.actions.getOrder(props.userInfo._id).then((res) => {
      // setDisplay(true);
      // setApiResult(true);
    });
    console.log('hai');
    props.actions.getPendingOrder(props.userInfo._id).then((res) => {
      setApiResult(true);
    });
  }, []);

  // if (props.pendingOrders.length > 0) {
  //   console.log('hai');
  //   props.actions.getPendingOrder(props.pendingOrders._id).then((res) => {
  //     setApiResult(true);
  //   });
  // }
  console.log(props, 'props');
  return (
    <div className="orders_container">
      <div className="overall__container">
        <div className="currentorders">
          {apiResult ? (
            <>
              <div className="orders__page">
                <div className="orders__page__heading">
                  <p className="orders__page__heading--text">PENDING PICKUP</p>
                </div>

                {props.pendingOrders.map((item, idx) => (
                  <>
                    <div className="details">
                      <div className="order__restaurant__image__container">
                        <img
                          src={
                            item.restaurantImages.length > 0
                              ? item.foodItemImages
                              : defultResturentImg
                          }
                          alt="checkout_restaurant_image"
                          className="restaurant_image"
                        />
                      </div>
                      <div className="top__section">
                        <div className="orders__restaurant">
                          <div className="orders__restaurant__name">
                            {/* {props.restaurantDetails.restaurantName} */}
                            {/* Mumbai Caterers */}
                            {item.restaurantName}
                          </div>
                          <div className="orders__restaurant__timing">
                            12.00 PM - 06.00 PM
                          </div>
                          <div className="payment__method">
                            {item.paymentMode}
                          </div>
                        </div>

                        <div className="order__cancel__button">
                          <Button
                            className="cancel__button"
                            style={{
                              background: '#E3E3E3',
                              color: '#ffffff',
                              borderColor: '#E3E3E3',
                            }}
                          >
                            Cancel Order
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="current__orders__container">
                      <div className="order__item__container">
                        {item.foodItems.map((foo, idx) => (
                          <>
                            <div className="cart__item">
                              <div className="item">
                                <img
                                  src={foo.foodItemImages}
                                  alt="cart__item__img avatar"
                                  className="cart__item__img avatar"
                                />
                                <div className="item__name">
                                  {foo.foodItemNames}
                                </div>
                              </div>
                              <div className="item__count">
                                <span className="PastOrder__subtract">-</span>
                                <span className="count">
                                  {foo.foodItemQtys}
                                </span>
                                <span className="PastOrder__add">+</span>
                              </div>
                              <div className="item__price">
                                ₹ {foo.foodItemQtys * foo.foodItemPrices}
                              </div>
                            </div>
                          </>
                        ))}
                      </div>

                      <div className="bill__detail">
                        <div className="heading">Bill Details</div>
                        <div className="item__total">
                          <div className="item__total--text">Item Total</div>
                          <div className="item__total--price">
                            $ {item.total}
                          </div>
                        </div>
                        <div className="tax">
                          <div className="tax--text">Taxes and Charges</div>
                          <div className="tax--price">$ 20</div>
                        </div>
                        <div className="paid">
                          <div className="paid--text">PAID</div>
                          <div className="paid--price">$ {item.total + 20}</div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          ) : (
            <>
              <PendingPlaceholder />
            </>
          )}
        </div>
      </div>

      <div className="split__line"></div>

      <div className="overall__container">
        {apiResult ? (
          <>
            <div className="currentorders">
              <div className="orders__page__heading">
                <p className="orders__page__heading--text">PAST ORDERS</p>
              </div>

              {console.log(props)}
              {props.pastOrder &&
                props.pastOrder.map((oldOrderedItem) => (
                  <>
                    <div
                      className={
                        'orders__page ' +
                        (oldOrderedItem.completed
                          ? ''
                          : 'profile__not__delivery__fade')
                      }
                    >
                      <div className="details">
                        <div className="order__restaurant__image__container">
                          <img
                            src={
                              oldOrderedItem.restaurantImages.length >= 1
                                ? oldOrderedItem.restaurantImages[0]
                                : defultResturentImg
                            }
                            alt="checkout_restaurant_image"
                            className="restaurant_image"
                          />
                        </div>
                        <div className="top__section">
                          <div className="orders__restaurant">
                            <div className="orders__restaurant__name">
                              {/* {props.restaurantDetails.restaurantName} */}
                              {/* {oldOrderedItem.restaurantName ? oldOrderedItem.restaurantName : "Mumbai Caterers"} */}
                              Mumbai Caterers
                            </div>
                            <div className="orders__restaurant__timing">
                              12.00 PM - 06.00 PM
                            </div>
                            <div className="payment__method">
                              {oldOrderedItem.paymentMode}
                            </div>
                          </div>

                          <div className="order__cancel__button">
                            <Button
                              className="cancel__button"
                              style={{
                                background: '#ffffff',
                                color: '#FF5454',
                                borderColor: '#FF5454',
                              }}
                            >
                              REVIEW ORDER
                            </Button>
                            <div className="deliveryStatus">
                              {oldOrderedItem.completed
                                ? 'Delivered'
                                : 'Order Canceled'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="current__orders__container">
                        <div className="order__item__container">
                          {oldOrderedItem.foodItems.map((foodItem) => (
                            <div className="cart__item">
                              <div className="item">
                                <img
                                  src={
                                    foodItem.images
                                      ? foodItem.images
                                      : fooditemimg
                                  }
                                  alt="cart__item__img avatar"
                                  className="cart__item__img avatar"
                                />
                                <div className="item__name">
                                  {foodItem.name}
                                </div>
                              </div>
                              <div className="item__count">
                                <span className="PastOrder__subtract">-</span>
                                <span className="count">{foodItem.qty}</span>
                                <span className="PastOrder__add">+</span>
                              </div>
                              <div className="item__price">
                                ₹ {foodItem.totalPrice}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bill__detail">
                          <div className="heading">Bill Details</div>
                          <div className="item__total">
                            <div className="item__total--text">Item Total</div>
                            <div className="item__total--price">
                              $ {oldOrderedItem.total}
                            </div>
                          </div>
                          <div className="tax">
                            <div className="tax--text">Taxes and Charges</div>
                            <div className="tax--price">$ {0}</div>
                          </div>
                          <div className="paid">
                            <div className="paid--text">PAID</div>
                            <div className="paid--price">
                              $ {oldOrderedItem.total}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </>
        ) : (
          <>
            <PastOrderPlaceholder />
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    pastOrder: state.user.orders,
    userInfo: state.user,
    pendingOrder: state.order.currentOrder,
    pendingOrders: state.user.PendingOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getAuth,
        getOrder,
        getPendingOrder,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
