import React from 'react'
import { configureStore,combineReducers } from '@reduxjs/toolkit'
import CartSlice from "./slices/cartslice"
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';

const rootReducers=combineReducers({
    cart: CartSlice
})
const persistConfig = {
    key: 'root',
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducers);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check for redux-persist
    }),
});
const persistor = persistStore(Store);

export { Store, persistor };
