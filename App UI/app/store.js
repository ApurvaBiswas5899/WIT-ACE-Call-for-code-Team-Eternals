import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/root';

const composedEnhancher = composeWithDevTools(applyMiddleware(thunkMiddleware));

const appStore = createStore(rootReducer, composedEnhancher);

export default appStore;
