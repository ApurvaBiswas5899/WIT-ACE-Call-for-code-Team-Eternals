import {ActionTypes} from '../utils/actions';

const initialState = {
  order: [],
  data: {},
};

export default function menus(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MENU_LIST:
      return {...state, order: action.data};

    case ActionTypes.MENU_GET:
      return {...state, data: {...state.data, ...action.data}};

    case ActionTypes.MENU_FAILED:
      return {...state, error: action.data};

    default:
      return state;
  }
}
