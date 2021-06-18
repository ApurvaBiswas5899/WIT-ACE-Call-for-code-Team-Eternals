import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import user from './user';
import review from './review';
import cart from './cart';
import filter from './filter';
import order from './order';
import menu from './menu';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'order', 'filter'],
};

const rootReducer = combineReducers({
  user,
  // review,
  // cart,
  order,
  filter,
  menu,
});

export default persistReducer(persistConfig, rootReducer);
