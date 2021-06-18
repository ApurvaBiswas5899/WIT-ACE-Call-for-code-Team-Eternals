import {getRestaurant} from './restaurants';

export function getCart(state) {
  return state.cart;
}

export function getItemFromCart(state, itemId) {
  return state.cart.items[itemId] || 0;
}

export function getCartRestaurant(state) {
  return state.cart.restaurant;
}

export function getCartMenuItem(state, itemId) {
  return state.cart.menu[itemId];
}

export function getCartTotal(state) {
  let sum = 0;
  Object.keys(state.cart.items).forEach(key => {
    sum += (getCartMenuItem(state, key)?.price || 0) * state.cart.items[key];
  });
  return sum;
}

export function getCartError(state) {
  return state.cart?.error || {};
}

export function getCartQty(state) {
  let sum = 0;
  Object.keys(state.cart.items).forEach(key => {
    sum += state.cart.items[key];
  });
  return sum;
}

export function getCartRestaurantName(state) {
  return getRestaurant(state, state.cart.restaurant.id).restaurantName;
}
