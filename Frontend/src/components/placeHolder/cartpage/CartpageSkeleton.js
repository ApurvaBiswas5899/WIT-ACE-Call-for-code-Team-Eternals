import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import cart from "../../../pages/cartPage/images/cart.svg";

const SkeletonCartPage = () => {
  return (
    <div className="body-container">
      <div className="row ">
        <div className="checkout__container">
          <div className="cart__logo__section">
            <img src={cart} alt="cart__logo" className="cart__logo" />
            <p className="cart__logo__text">CHECKOUT </p>
          </div>
          <div className="content_div">
            <>
              <div className="restaurant__image__container">
                <div
                  alt="checkout_restaurant_image"
                  className="restaurant_image load__animation"
                />
              </div>
              {/* <div className="restaurant__details">
            <div className="restaurant">
              <div className="restaurant__name">
                {props.restaurantDetails.restaurantName}
              </div>
              <div className="restaurant__timing">12.00 PM - 06.00 PM</div>
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
                    <div className="item__name">{cartItem.name}</div>
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
                        // props.actions.getTotal();
                      }}
                    >
                      -
                    </span>
                    <span className="count">
                      <span className="count">{cartItem.qty}</span>
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
                  <div className="item__price">₹ {cartItem.price}</div>
                </div>
              ))}
            </div>
          </div> */}
            </>
          </div>
          <div className="qnas__container">
            <div className="qnas">
              <p className="heading">Order Cancel FAQs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCartPage;
