export function getNearRestaurants(state) {
  if (!state.restaurants?.order?.length) {
    return [];
  }
  return state.restaurants.order;
}

export function getRestaurant(state, restaurantId) {
  return state.restaurants.data[restaurantId];
}

export function getFailedMsgForRestaurants(state) {
  return state.restaurants.error;
}

export function getRestaurantMenuList(state) {
  if (!state.menus?.order?.length) {
    return [];
  }
  return state.menus.order;
}

export function getMenuItem(state, itemId) {
  return state.menus.data[itemId];
}

export function getFailedMsgForMenus(state) {
  return state.menus.error;
}
