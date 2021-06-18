import { order } from "../../client";
import { ORDER } from "../../utils/order";

export function postOrder({
  userID,
  restaurantID,
  restaurantName,
  restaurantImages,
  total,
  updated,
  created,
  paymentMode,
  paymentSuccess,
  consumedFood,
  completed,
  username,
  foodItems,
}) {
  console.log(
    userID,
    restaurantID,
    restaurantName,
    restaurantImages,
    total,
    updated,
    created,
    paymentMode,
    paymentSuccess,
    consumedFood,
    completed,
    username,
    foodItems
  );
  return async (dispatch) => {
    const result = await order.postOrder(
      userID,
      restaurantID,
      restaurantName,
      restaurantImages,
      total,
      updated,
      created,
      paymentMode,
      paymentSuccess,
      consumedFood,
      completed,
      username,
      foodItems
    );

    if (!result.success) {
      return {
        error: result.msg,
      };
    }

    // console.log(result);

    var newItem = result.result.foodItems;

    var newFormat = [];

    for (var i = 0; i < newItem.foodItemIds.length; i++) {
      newFormat.push({});
    }

    newFormat.map((item, index) => {
      item._id = newItem.foodItemIds[index];
      item.name = newItem.foodItemNames[index];
      item.price = newItem.foodItemPrices[index];
      item.image = newItem.foodItemImages[index];
      item.qty = newItem.foodItemQtys[index];
    });

    result.result.foodItems = newFormat;

    dispatch({
      type: ORDER.postOrder,
      data: result,
    });
    return result;
  };
}

export function getOrder(orderId) {
  return async (dispatch) => {
    const result = await order.getOrder(orderId);
    // for type: 'not-verified',
    if (!result.success) {
      return {
        error: result.message,
      };
    }
    dispatch({
      type: ORDER.getOrder,
      data: result.result,
    });
    return result;
  };
}

export function addToOrder(itemDetials) {
  return async (dispatch) => {
    dispatch({
      type: ORDER.addToOrder,
      data: itemDetials,
    });
    return itemDetials;
  };
}

export function removeFromOrder(itemDetials) {
  return async (dispatch) => {
    dispatch({
      type: ORDER.removerFromOrder,
      data: itemDetials,
    });
    return itemDetials;
  };
}

export function getTotal() {
  return async (dispatch) => {
    dispatch({
      type: ORDER.getTotal,
    });
    // return itemDetials;
  };
}

export function placeOrder(cartDetails) {
  return async (dispatch) => {
    // console.log(cartDetails);

    const Ids = [];
    const Qtys = [];
    const Prices = [];
    const Names = [];
    const Images = [];

    cartDetails.forEach((item) => {
      Ids.push(item._id);
      Qtys.push(item.qty);
      Prices.push(item.totalPrice);
      Names.push(item.name);
      Images.push(item.image[0]);
    });

    const modifiedCart = {
      foodItemIds: Ids,
      foodItemQtys: Qtys,
      foodItemPrices: Prices,
      foodItemNames: Names,
      foodItemImages: Images,
    };

    dispatch({
      type: ORDER.placeOrder,
      data: modifiedCart,
    });
  };
}

export function clearCart() {
  return async (dispatch) => {
    dispatch({
      type: ORDER.clearCart,
    });
  };
}
