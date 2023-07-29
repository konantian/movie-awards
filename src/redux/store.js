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
      whitelist: ["user", "loading"],
      storage, // if needed, use a safer storage
      transforms: [transformCircular]
};

const initialState = {
    user : null,
    loading: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_REQUEST':
            return {...state, loading: true};
        case 'FETCH_USER_SUCCESS':
            return {...state, loading: false, user: action.payload};
        case 'FETCH_MOVIE_REQUEST':
            return {...state, loading: true};
        case 'FETCH_MOVIE_SUCCESS':
            return {...state, loading: false, imdbId: action.payload};
        case 'SEARCH_MOVIE_REQUEST':
            return {...state, loading: true};
        case 'SEARCH_MOVIE_SUCCESS':
            return {...state, loading: false, movie: action.payload};
        case 'LOGOUT':
            return {...state, loading: false, user: null};
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