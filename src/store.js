import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cart/cartSlice'
import userReducer from './slices/user/userSlice'
import orderReducer from './slices/orders/orderSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PERSIST, PURGE, REGISTER, PAUSE } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    version: 1,
    key: 'root',
    storage,
    whitelist: ['user'] // only navigation will be persisted
}

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    orders: orderReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})

export let persistor = persistStore(store)
