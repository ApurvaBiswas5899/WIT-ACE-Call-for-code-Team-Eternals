import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//actions
import {
  addToOrder,
  removeFromOrder,
  getTotal,
} from '../../actions/views/order.js';

import cup from './images/cup.svg';
import vegSymbol from './images/vegSymbol.svg';
import minus from './images/minus.svg';

const FoodItem = (props) => {
  const dispatch = useDispatch();

  const { foodItem } = props;

  let qty = props.quantity;

  const increaseQty = async () => {
    if (qty >= foodItem.qty) return;
    qty = qty + 1;
    const cartItem = {
      name: foodItem.name,
      image: foodItem.images[0],
      qty: qty,
      price: foodItem.price,
      id: foodItem._id,
      stock: foodItem.qty,
      restaurantID: props.restID,
      restaurantName: props.restaurantName,
    };
    dispatch(addToOrder(cartItem));
  };

  const decreaseQty = () => {
    qty = qty - 1;
    const cartItem = {
      name: foodItem.name,
      image: foodItem.images[0],
      qty: qty,
      price: foodItem.price,
      id: foodItem._id,
      stock: foodItem.qty,
      restaurantID: props.restID,
      restaurantName: props.restaurantName,
    };
    if (qty <= 0) {
      dispatch(removeFromOrder(cartItem));
    } else {
      dispatch(addToOrder(cartItem));
    }
  };
  return (
    <>
      <>
        <div className="row  border-bottom my-2  border-box">
          <div className="col-2">
            {foodItem.images.length > 0 ? (
              <img
                src={foodItem.images[0]}
                alt=""
                style={{ height: 36, width: 36 }}
              />
            ) : (
              <img src={cup} alt="" />
            )}
          </div>
          <div className="col-7 d-flex flex-column">
            <div style={{ height: 12, width: 12 }} className="info-low-margin">
              <img src={vegSymbol} alt="" className="food-type-image" />
            </div>
            <div
              className="info-heading-color info-heading-size info-low-margin my-1"
              style={{ textOverflow: 'ellipsis' }}
            >
              {foodItem.name}
            </div>
            <span className="info-subheading-color info-subheading-size info-low-margin">
              ₹ {foodItem.price}
            </span>
            <p className="info-content-color info-content-size info-low-margin">
              {foodItem.description}
            </p>
          </div>
          <div className="col-3 p-0">
            <div className="add-to-cart d-flex flex-row justify-content-between">
              <span className="mx-1 pointer" onClick={decreaseQty}>
                <img src={minus} alt="" style={{ width: 8 }} />
              </span>
              <span className="mx-1">{qty}</span>
              <span
                className="mx-1 pointer"
                style={{ color: '#20B941' }}
                onClick={increaseQty}
              >
                +
              </span>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default FoodItem;
