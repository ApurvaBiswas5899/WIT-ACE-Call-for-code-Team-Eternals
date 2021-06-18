import Client from '../client';
import {getUserProfile} from '../selectors/user';
import {ActionTypes} from '../utils/actions';

export function getPastOrders() {
  return async (dispatch, getState) => {
    const user = getUserProfile(getState());
    const response = await Client.getPastOrders(user.auth._id);
    const result = response.orders;
    if (!result || result.length === 0) {
      return;
    }
    const data = {
      orders: {},
      past: [],
      pending: [],
    };
    result.forEach(it => {
      data.orders[it._id] = it;
      if (it.completed) {
        data.past.push(it._id);
      } else {
        data.pending.push(it._id);
      }
    });
    if (response.success) {
      dispatch({
        type: ActionTypes.ORDERS,
        data,
      });
    }
  };
}

export function setOrderRestaurant(restaurantId) {
  return async dispatch => {
    if (!restaurantId) {
      return;
    }
    const response = await Client.getRestaurant(restaurantId);
    if (response.success) {
      const result = response.restaurants[0];
      const data = {};
      data[restaurantId] = result;
      dispatch({
        type: ActionTypes.ORDERS_GET_RESTAURANT,
        data,
      });
    }
  };
}

export function pickUpOrder(orderId) {
  return async dispatch => {
    const response = await Client.pickUpOrder(orderId);
    if (response.success) {
      dispatch({
        type: ActionTypes.ORDER_CHANGE_STATUS,
        data: response.order._id,
      });
      return true;
    }
    return false;
  };
}
