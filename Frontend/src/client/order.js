import { logDOM } from "@testing-library/react";
import axios from "axios";

import { API_ROOT } from "../utils/url";

export default class Order {
  postOrder = async (
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
  ) => {
    const data = {
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
    };

    console.log(data);

    try {
      const result = await axios.post(`${API_ROOT}/api/order/postOrder_v2`, data);

      return result.data;
    } catch (error) {
      return { error };
    }
  };

  getCurrentOrder = async (orderId) => {
    const data = {
      _id: orderId,
    };

    try {
      const result = await axios.post(`${API_ROOT}/api/order/getOrder`, data);
      console.log(result, orderId, data);
      return result.data.result;
    } catch (error) {
      return { error };
    }
  };

  // getPendingOrder = async (orderId) => {
  //   const data = {
  //     orderId,
  //   };

  //   try {
  //     const result = await axios.post(`${API_ROOT}/api/order/getOrder`, data);

  //     return resul
  //   } catch (error) {
  //     return error;
  //   }
  // };
}
