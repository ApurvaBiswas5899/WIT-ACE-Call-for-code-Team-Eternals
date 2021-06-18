import {ActionTypes} from '../utils/actions';

const initial = {
  items: {},
  restaurant: {id: '', name: ''},
  error: {},
  menu: {},
};

export default function cart(state = initial, action) {
  switch (action.type) {
    case ActionTypes.CART_ADD:
      if (state.items[action.data]) {
        return {
          ...state,
          items: {...state.items, [action.data]: state.items[action.data] + 1},
        };
      }
      return {...state, items: {...state.items, [action.data]: 1}};

    case ActionTypes.CART_REMOVE:
      if (state.items[action.data] !== 0) {
        return {
          ...state,
          items: {...state.items, [action.data]: state.items[action.data] - 1},
        };
      }
      return state;

    case ActionTypes.CART_CLEAR:
      return {...initial};

    case ActionTypes.CART_NEW:
      return {...state, restaurant: action.data, items: {}};

    case ActionTypes.CART_ERROR:
      return {...state, error: action.data};

    case ActionTypes.CART_MENU:
      return {...state, menu: {...state.menu, ...action.data}};

    default:
      return state;
  }
}
