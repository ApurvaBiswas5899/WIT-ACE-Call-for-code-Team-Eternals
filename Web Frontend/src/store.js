import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer.js";
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// The store now has the ability to accept thunk functions in `dispatch`
export const store = createStore(rootReducer, composedEnhancer)

export const persistor = persistStore(store)