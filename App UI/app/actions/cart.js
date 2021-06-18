import {batch} from 'react-redux';
import Client from '../client';
import {getCart, getCartMenuItem, getCartQty} from '../selectors/cart';
import {getMenuItem, getRestaurant} from '../selectors/restaurants';
import {getUserProfile} from '../selectors/user';
import {ActionTypes} from '../utils/actions';

export function addToCart(itemId) {
  return async (dispatch, getState) => {
    const state = getState();
    if (!getCartMenuItem(state, itemId)) {
      const item = {};
      item[itemId] = getMenuItem(state, itemId);
      batch(() => {
        dispatch({
          type: ActionTypes.CART_MENU,
          data: item,
        });
        dispatch({
          type: ActionTypes.CART_ADD,
          data: itemId,
        });
      });
    } else {
      dispatch({
        type: ActionTypes.CART_ADD,
        data: itemId,
      });
    }
  };
}

export function newCart(restaurantId, restaurantName) {
  return async dispatch => {
    dispatch({
      type: ActionTypes.CART_NEW,
      data: {
        id: restaurantId,
        name: restaurantName,
      },
    });
  };
}

export function removeFromCart(itemId) {
  return async dispatch => {
    dispatch({
      type: ActionTypes.CART_REMOVE,
      data: itemId,
    });
  };
}

export function clearCart() {
  return async dispatch => {
    dispatch({
      type: ActionTypes.CART_CLEAR,
    });
  };
}

export function sendOrder() {
  return async (dispatch, getState) => {
    const state = getState();
    const cart = getCart(state);
    if (!cart?.restaurant?.id || cart.restaurant.id === '') {
      return false;
    }
    const user = getUserProfile(state);
    const restaurant = getRestaurant(state, cart.restaurant.id);
    const response = await Client.sendOrder(
      user.auth._id,
      restaurant,
      cart,
      getCartQty(state),
    );
    if (response.success) {
      dispatch({
        type: ActionTypes.CART_CLEAR,
      });
      return true;
    }
    dispatch({
      type: ActionTypes.CART_ERROR,
      data: {
        message: response.error,
        itemIds: [],
      },
    });
    return false;
  };
}

export function setCartMenu() {
  return async (dispatch, getState) => {
    const cart = getCart(getState());
    const restaurantId = cart.restaurant.id || '';
    if (restaurantId === '') {
      return;
    }
    const response = await Client.getRestaurant(restaurantId);
    if (response.success) {
      const restaurant = response.restaurants[0];
      if (restaurant.status) {
        const menuResponse = await Client.getRestaurantMenu(restaurantId);
        if (menuResponse.success) {
          const result = menuResponse.food_items;
          const menu = result.reduce((res, it) => {
            res[it._id] = it;
            return res;
          });
          const error = {
            itemIds: [],
          };
          Object.keys(cart.items).forEach(id => {
            if (!menu[id] || cart.items[id] > menu[id].qty) {
              error.itemIds.push(id);
            }
          });
          if (error.itemIds.length !== 0) {
            error.message =
              'Some items are not available in the required quantity';
          }
          if (error) {
            batch(() => {
              dispatch(clearCart);
              dispatch({
                type: ActionTypes.CART_ERROR,
                data: error,
              });
            });
          } else {
            dispatch({
              type: ActionTypes.CART_MENU,
              data: menu,
            });
          }
        }
      }
    } else {
      batch(() => {
        dispatch(clearCart);
        dispatch({
          type: ActionTypes.CART_ERROR,
          data: {
            message: 'Restaurant is Closed',
            itemIds: cart.items,
          },
        });
      });
    }
  };
}
