//importing libraries
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { reducer as toastrReducer } from "react-redux-toastr";

//importing from components
import { AuthReducer } from "../reducers/AuthReducer";
import PostsReducer from '../reducers/PostsReducer';
import storage from 'redux-persist/lib/storage';


//combining reducers
const rootReducer = combineReducers({
  auth: AuthReducer,
  //toastr reducer for toastr
  toastr: toastrReducer,
  users: PostsReducer,
});

//persist config
const persistConfig = {
  key: "root",
  storage,
};

//persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = compose(applyMiddleware(thunk));

//create store
export const store = createStore(persistedReducer, composeWithDevTools(middleware));
export const pStore = persistStore(store)
