import { CART } from '../utils/cart';

const initialState = {
  cart: [
    // {
    //     name: "VEG BOX",
    //     image: imgforcart,
    //     qty: 2,
    //     price: 40,
    //     id: 1 // productId
    // },
    {
      id: 1,
      price: '40',
      name: 'dalfry',
    },
    {
      id: 2,
      price: '40',
      name: 'dalfry',
    },
  ],
};

export default function cart(state = initialState, action) {
  if (action.type === CART.addItems) {
    return { ...state, price: action.data.price, name: action.data.name };
  }
  if (action.type === CART.showCart) {
    return { ...state };
  }
  if (action.type === CART.removeItems) {
    let newsState = [...state.filter((OBJ) => OBJ.id !== action.data.id)];
    return newsState;
  }

  return state;
}
