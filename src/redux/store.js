import thunk from 'redux-thunk';
import storage from './storage';
import { parse, stringify } from 'flatted';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';


export const transformCircular = createTransform(
      (inboundState, key) => stringify(inboundState),
      (outboundState, key) => parse(outboundState),
)

const persistConfig = {
      key: "movie",
      whitelist: ["user"],
      storage, // if needed, use a safer storage
      transforms: [transformCircular]
};

const initialState = {
    user : null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_REQUEST':
            return {...state};
        case 'FETCH_USER_SUCCESS':
            return {...state, user: action.payload};
        case 'LOGOUT':
            return {...state, user: null};
        default:
            return state;
    }
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const composeEnhancers = (typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const makeStore = () => {
      const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)));
      let persistor = persistStore(store)
      return {store, persistor};

}

export default makeStore;