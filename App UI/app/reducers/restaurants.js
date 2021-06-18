import {ActionTypes} from '../utils/actions';

const initial = {
  order: [],
  data: {},
};

export default function restaurants(state = initial, action) {
  switch (action.type) {
    case ActionTypes.RESTAURANTS_LIST:
      return {...state, order: action.data};

    case ActionTypes.RESTAURANT_GET:
      return {...state, data: {...state.data, ...action.data}};

    case ActionTypes.RESTAURANT_FAILED:
      return {...state, error: action.data};

    default:
      return state;
  }
}
