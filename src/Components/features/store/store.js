import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { reducer as toastrReducer } from "react-redux-toastr";
import { AuthReducer } from "../reducers/AuthReducer";
import PostsReducer from '../reducers/PostsReducer';
import storage from 'redux-persist/lib/storage';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: AuthReducer,
  toastr: toastrReducer,
  users: PostsReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = compose(applyMiddleware(thunk));

export const store = createStore(persistedReducer, composeWithDevTools(middleware));
export const pStore = persistStore(store)
