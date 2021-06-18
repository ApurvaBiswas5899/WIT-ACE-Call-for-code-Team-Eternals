import React from "react";
import minus from "./images/minus.svg";
import cup from "./images/cup.svg";

import { useDispatch } from "react-redux";

import { addToOrder, removeFromOrder } from "../../actions/views/order.js";

const CartItem = (props) => {
  const dispatch = useDispatch();

  console.log(props);

  const { item } = props;
  let qty = item.qty;

  const increaseQty = async () => {
    console.log("stock", item.stock);
    qty = item.stock < qty ? item.stock : qty;
    // if (qty >= item.stock) return;
    qty = qty + 1;
    const cartItem = {
      name: item.name,
      image: item.image,
      qty: qty,
      price: item.price,
      id: item.id,
      stock: item.stock,
      restaurantID: item.restaurantID,
      restaurantName: item.restaurantName,
    };
    dispatch(addToOrder(cartItem));
  };

  const decreaseQty = () => {
    qty = item.stock < qty ? item.stock : qty;
    qty = qty - 1;
    const cartItem = {
      name: item.name,
      image: item.image,
      qty: qty,
      price: item.price,
      id: item.id,
      stock: item.stock,
      restaurantID: item.restaurantID,
      restaurantName: item.restaurantName,
    };
    if (qty <= 0) {
      dispatch(removeFromOrder(cartItem));
    } else {
      dispatch(addToOrder(cartItem));
    }
  };
  return (
    <>
      <div className="row cart-controls my-2">
        <div className="col-2">
          {item.image ? (
            <img src={item.image} alt="" style={{ height: 36, width: 36 }} />
          ) : (
            <span>
              <img src={cup} alt="" style={{ height: 36, width: 36 }} />
            </span>
          )}
        </div>

        <div className="col-4 cart-text">
          <span>{item.name}</span>
        </div>

        <div className="col-3 small-screen-padding">
          <div
            className="add-to-cart d-flex flex-row justify-content-between"
            style={{ backgroundColor: "white" }}
          >
            <span className="mx-1 pointer" onClick={decreaseQty}>
              <img src={minus} alt="" style={{ width: 8 }} />
            </span>
            <span className="mx-1">{qty}</span>
            <span
              className="mx-1 pointer"
              style={{ color: "#20B941" }}
              onClick={increaseQty}
            >
              +
            </span>
          </div>
        </div>

        <div className="col-3 d-flex justify-content-end">
          <span>₹ {item.price * item.qty}</span>
        </div>
      </div>
    </>
  );
};

export default CartItem;
