import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import {productReducer} from './product';
import {cartReducer} from './cart';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // redux-persist compatibility
      }),
  });

export const persistor = persistStore(store);
