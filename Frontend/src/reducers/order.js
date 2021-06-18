import { ORDER } from '../utils/order';
// import cart from './cart';
import imgforcart from '../components/DishPic.png';

// const initialState = {
//   foodItems: [],

//   // orderId: 100,
//   // total: 10,
//   updated: new Date(),
//   created: new Date(),
//   paymentMode: 'Cash',
//   paymentSuccess: 'false',
//   consumedFood: 'all',
//   completed: false,

//   restaurantID: null,
//   restaurantName: null,

//   newItems: {},

//   currentOrder: {},
//   orderPlaced: false,

//   // orderHistory: [],
// };

const initialState = {
  foodItems: [],
  restaurantID: null,
  restaurantName: null,
  updated: new Date(),
  created: new Date(),
  paymentMode: 'Cash',
  paymentSuccess: 'false',
  consumedFood: 'all',
  completed: false,
  newItems: {},
  currentOrder: {},
  orderPlaced: false,
};

export default function order(state = initialState, action) {
  switch (action.type) {
    case ORDER.getOrder:
      return { ...state, ...action.data };

    case ORDER.postOrder:
      return {
        ...state,
        currentOrder: action.data.result,
        orderPlaced: action.data.success,
      };

    case ORDER.addToOrder:
      const item = action.data;
      // item.userqty += 1;

      if (item.restaurantID !== state.restaurantID) {
        // item.userqty += 1;
        return {
          ...state,
          restaurantID: item.restaurantID,
          restaurantName: item.restaurantName,
          foodItems: [item],
        };
      } else {
        const isItemExist = state.foodItems.find((i) => i.id === item.id);
        if (isItemExist) {
          return {
            ...state,
            foodItems: state.foodItems.map((i) =>
              i.id === isItemExist.id ? item : i
            ),
          };
        } else {
          return {
            ...state,
            foodItems: [...state.foodItems, item],
          };
        }
      }

      // var incart = false
      // var sameRestaurant = true
      if (state.foodItems.length) {
        incart = state.foodItems.find((item) =>
          item._id === action.data._id ? true : false
        );

        if (state.restaurantID != action.data.restaurantID) {
          // PopUp -> Remove other wala first // Data lost // Yahin pr clear cart ka button aa skta h
        }
      } else {
        return {
          ...state,
          foodItems: [
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
          restaurantID: action.data.restaurantID,
        };
      }

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
      const deleteItem = action.data;

      return {
        ...state,
        foodItems: state.foodItems.filter((i) => i.id !== deleteItem.id),
      };

      // return {
      //   ...state,
      //   foodItems:
      //     deleteItem.userqty > 1
      //       ? state.foodItems.map((item) => {
      //           if (item._id === deleteItem._id) {
      //             item.userqty -= 1;
      //             item.totalPrice -= item.price;
      //           }
      //           return item;
      //         })
      //       : state.foodItems.filter((i) => i._id !== deleteItem._id),
      // };

    //   if (ourItem.qty === 1) {
    //     if (state.foodItems.length == 1) {
    //       return {
    //         ...state,
    //         foodItems: state.foodItems.filter(
    //           (item) => item._id !== action.data._id
    //         ),
    //         restaurantID: null,
    //         restaurantName: null,
    //         newItems: {},
    //       };
    //     } else {
    //       return {
    //         ...state,
    //         foodItems: state.foodItems.filter(
    //           (item) => item._id !== action.data._id
    //         ),
    //       };
    //     }
    //   } else {
    //     return {
    //       ...state,
    //       foodItems: state.foodItems.map((item) =>
    //         item._id === action.data._id
    //           ? {
    //               ...item,
    //               qty: item.qty - 1,
    //               totalPrice: item.totalPrice - item.price,
    //             }
    //           : item
    //       ),
    //     };
    //   }

    case ORDER.getTotal:
      let { total } = state.foodItems.reduce(
        (cartTotal, foodItem) => {
          const { totalPrice } = foodItem;

          cartTotal.total += totalPrice;

          return cartTotal;
        },
        {
          total: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total };

    case ORDER.placeOrder:
      return {
        ...state,
        newItems: action.data,
      };

    case ORDER.clearCart:
      return {
        ...state,
        restaurantID: null,
        restaurantName: null,
        newItems: {},
        foodItems: [],
        // total ?
      };

    default:
      return state;
  }
}
