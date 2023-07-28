import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import userReducer from './features/user/userSlice'
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
