
import axios from 'axios';
import state from '../store.js';

import { API_ROOT } from '../utils/url';

export default class Food {
  getFood = async (RestaurantID) => {
    const data = {
      restaurantID: RestaurantID,
    };
    try {
      const result = await axios.post(
        `${API_ROOT}/api/food_item/getFood_items`,
        data
      );
      result.data.food_items.map((food_item) => {
        food_item['userqty'] = 0;
        food_item['totalPrice'] = food_item.price;
      });
      console.log(result);
      return result.data;
    } catch (error) {
      return { error };
    }
  };

  getRestaurantDetails = async (RestaurantID) => {
    const data = {
      _id: RestaurantID,
    };
    try {
      const result = await axios.post(
        `${API_ROOT}/api/restaurants/getDetails`,
        data
      );

      return result.data;
    } catch (error) {
      return { error };
    }
  };
}
