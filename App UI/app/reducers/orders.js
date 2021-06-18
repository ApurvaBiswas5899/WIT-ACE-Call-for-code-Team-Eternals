import {ActionTypes} from '../utils/actions';

const initial = {
  past: [],
  pending: [],
  orders: {},
};

export default function orders(state = initial, action) {
  switch (action.type) {
    case ActionTypes.ORDERS:
      return {...action.data};
    default:
      return state;
  }
}
