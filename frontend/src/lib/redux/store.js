import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';
import logger from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};


const reducers =combineReducers({
  user: userSlice,
  cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);
