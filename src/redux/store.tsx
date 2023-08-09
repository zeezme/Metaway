import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'persistRoot',
  storage,
  whitelist: ['user', 'login']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})

export const persistor = persistStore(store)
