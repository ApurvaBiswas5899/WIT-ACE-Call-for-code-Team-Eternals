export function getPastOrdersIds(state) {
  if (!state.orders?.past) {
    return [];
  }
  return state.orders.past;
}

export function getOrder(state, id) {
  const data = state.orders?.orders[id];
  if (!data) {
    return {};
  }
  const order = {...data, foodItems: {}};
  for (let i = 0; i < data.foodItems.foodItemIds.length; i += 1) {
    order.foodItems[data.foodItems.foodItemIds[i]] = {
      id: data.foodItems.foodItemIds[i],
      name: data.foodItems.foodItemNames[i],
      qty: data.foodItems.foodItemQtys[i],
      price: data.foodItems.foodItemPrices[i],
    };
  }
  return order;
}

export function getPendingOrdersIds(state) {
  if (!state.orders?.pending) {
    return [];
  }
  return state.orders.pending;
}
