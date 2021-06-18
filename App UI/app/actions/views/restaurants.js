/* eslint-disable no-underscore-dangle */
import Client from '../../client';
import {getUserLocation} from '../../selectors/user';
import {ActionTypes} from '../../utils/actions';

export function setRestaurant(restaurantId) {
  return async dispatch => {
    const response = await Client.getRestaurant(restaurantId);
    if (response.success) {
      const result = response.data;
      const data = {};
      data[restaurantId] = result;
      dispatch({
        type: ActionTypes.RESTAURANTS_GET,
        data,
      });
    }
  };
}

export function setNearRestaurants(filter = {status: true, rating: 0}) {
  return async (dispatch, getState) => {
    const location = getUserLocation(getState());
    if (!location?.coords) {
      return;
    }
    const response = await Client.getNearRestaurants(
      location.coords.latitude,
      location.coords.longitude,
    );
    if (response.success) {
      const result = response.restaurants;
      if (!result || result.length === 0) {
        return;
      }
      const order = result.map(it => it._id);
      const restaurants = result.reduce((res, it) => {
        res[it._id] = it;
        return res;
      });
      dispatch({
        type: ActionTypes.RESTAURANTS_LIST,
        data: order,
      });
      dispatch({
        type: ActionTypes.RESTAURANT_GET,
        data: restaurants,
      });
    }
  };
}

export function setRestaurantMenu(restaurantId) {
  return async dispatch => {
    const response = await Client.getRestaurantMenu(restaurantId);
    if (response.success) {
      const result = response.food_items;
      if (!result || result.length === 0) {
        return;
      }
      const order = result.map(it => it._id);
      const menu = result.reduce((res, it) => {
        res[it._id] = it;
        return res;
      });
      dispatch({
        type: ActionTypes.MENU_LIST,
        data: order,
      });
      dispatch({
        type: ActionTypes.MENU_GET,
        data: menu,
      });
    }
  };
}
