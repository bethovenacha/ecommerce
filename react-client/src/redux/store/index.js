import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {productReducer} from './product';
import {cartReducer} from './cart';
import { shopReducer } from './shop';
import { v4 as uuidv4 } from 'uuid';

const getOrGenerateUUID = () => {
  // Check if UUID is already in localStorage
  let uuid = localStorage.getItem('shop_uuid');
  if (!uuid) {
    uuid = uuidv4();  // Generate a new UUID if not found
    localStorage.setItem('shop_uuid', uuid); // Store it in localStorage
  }
  return uuid;
};

const uuid = getOrGenerateUUID();

const cartPersistConfig = {
  key: `cartReducer_${uuid}`,
  storage,
};

const productPersistConfig = {
  key: `productReducer_${uuid}`,
  storage,
};

const shopPersistConfig = {
  key: `shopReducer_${uuid}`,
  storage,
};

const rootReducer = combineReducers({
  productReducer: persistReducer(productPersistConfig, productReducer),
  cartReducer: persistReducer(cartPersistConfig, cartReducer), // only cart is persisted
  shopReducer:persistReducer(shopPersistConfig, shopReducer)
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // redux-persist compatibility
      }),
  });

export const persistor = persistStore(store);
