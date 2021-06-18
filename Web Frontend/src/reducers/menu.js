import { FOOD } from '../utils/food';

const initialState = {
  food_items: [
    // {
    //     "qty": '',
    //     "description": "",
    //     "name": "",
    //     "restaurantID": "",
    //     "price": ""
    // }
  ],

  // menu: [
  //     {
  //         id: 1,
  //         name: "Item 1",
  //         veg: "true",
  //         originalPrice: 500,
  //         text: "Item contents.............."
  //     },
  //     {
  //         id: 2,
  //         name: "Item 2",
  //         veg: "true",
  //         originalPrice: 500,
  //         text: "Item contents.............."
  //     },
  //     {
  //         id: 3,
  //         name: "Item 3",
  //         veg: "true",
  //         originalPrice: 500,
  //         text: "Item contents.............."
  //     }
  // ]
  getRestaurantDetails: '',
};

export default function menu(state = initialState, action) {
  switch (action.type) {
    case FOOD.getFood_items:
      return { ...state, food_items: action.data.food_items };

    case FOOD.getRestaurantDetails:
      return { ...state, getRestaurantDetails: action.data };

    default:
      return state;
  }
}
