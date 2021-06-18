import { ORDER } from "../utils/order";
// import cart from './cart';
import imgforcart from "../components/DishPic.png";

const initialState = {
  foodItems: [
    {
      name: "",
      _id: "",
      description: "",
      image: "",
      price: "",
      restaurantID: "",
      qty: "",
      totalPrice: "",
    },
  ],

  // orderId: 100,
  total: 2,
  updated: new Date(),
  created: Date.now(),
  paymentMode: "COD",
  paymentSuccess: "true",
  consumedFood: "none",
  completed: false,

  userID: "601639756d483142101d6371",
  restaurantID: "6020d2d218692f00156116bb",
  userName: "t1",

  sumPrice: 0,

  newItems: {},

  // orderHistory: [],
};

export default function order(state = initialState, action) {
  switch (action.type) {
    case ORDER.getOrder:
      return { ...state, ...action.data };
    case ORDER.postOrder:
      return { ...state, ...action.data };
    case ORDER.addToOrder:
      var incart = false;
      if (state.foodItems.length)
        incart = state.foodItems.find((item) =>
          item._id === action.data._id ? true : false
        );

      return {
        ...state,
        foodItems: incart
          ? state.foodItems.map((item) =>
              item._id === action.data._id
                ? {
                    ...item,
                    qty: item.qty + 1,
                    totalPrice: item.totalPrice + item.price,
                  }
                : item
            )
          : [
              ...state.foodItems,
              {
                name: action.data.name,
                _id: action.data._id,
                description: action.data.description,
                image: action.data.images,
                price: action.data.price,
                restaurantID: action.data.restaurantID,
                qty: 1,
                totalPrice: action.data.price,
              },
            ],
      };

    case ORDER.removerFromOrder:
      const ourItem = state.foodItems.find(
        (item) => item._id === action.data._id
      );

      if (ourItem.qty === 1) {
        return {
          ...state,
          foodItems: state.foodItems.filter(
            (item) => item._id !== action.data._id
          ),
        };
      } else {
        return {
          ...state,
          foodItems: state.foodItems.map((item) =>
            item._id === action.data._id
              ? {
                  ...item,
                  qty: item.qty - 1,
                  totalPrice: item.totalPrice - item.price,
                }
              : item
          ),
        };
      }

    case ORDER.getTotal:
      // let total = state.foodItems.length ? state.foodItems.reduce(

      //     (cartTotal, foodItem) => {

      //         return cartTotal + foodItem.totalPrice;

      //     }, 0) : 0

      // total = total.totalPrice.toFixed(2);

      // total = parseFloat(total);

      let total = 0;

      return { ...state, sumPrice: total };

    case ORDER.placeOrder:
      // console.log(action.data);
      return {
        ...state,
        newItems: action.data,
      };

    default:
      return state;
  }
}

// function updateItems(foodItems, action) {
//     var foodArray = [foodItems] //foodQntyNumber
//     var index = foodArray.foodItemIds.indexOf(action.data.foodItemId)
//     if (index !== -1) {
//         foodArray.foodItemIds.splice(index, 1)
//         foodArray.foodItemQtys.splice(index, 1)

//     }

//     return cart;
// }
