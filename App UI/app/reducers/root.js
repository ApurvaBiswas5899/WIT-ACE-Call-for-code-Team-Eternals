import {combineReducers} from 'redux';
import user from './user';
import restaurants from './restaurants';
import menus from './menus';
import cart from './cart';
import {USER} from '../utils/user';
import orders from './orders';

const appReducer = combineReducers({
  user,
  restaurants,
  menus,
  cart,
  orders,
});

const rootReducer = (state, action) => {
  if (action.type === USER.LOGOUT) {
    return {};
  }
  return appReducer(state, action);
};

export default rootReducer;
