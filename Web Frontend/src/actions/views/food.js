import { food } from '../../client';
import { FOOD } from '../../utils/food.js';

export function getFood_items(RestaurantID) {
  return async (dispatch) => {
    const result = await food.getFood(RestaurantID);

    if (result.success) {
      dispatch({
        type: FOOD.getFood_items,
        data: result,
      });
    }

    return result;
  };
}

export function getRestaurantDetails(RestaurantID) {
  return async (dispatch) => {
    const result = await food.getRestaurantDetails(RestaurantID);

    if (result.success) {
      dispatch({
        type: FOOD.getRestaurantDetails,
        data: result.restaurant,
      });
    }

    return result;
  };
}
