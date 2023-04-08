import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducers } from './reducers'
import sagas from './sagas'

// eslint-disable-next-line no-undef
const isDebuggingInChrome = !!window.navigator.userAgent
const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
})

const sagaMiddleware = createSagaMiddleware()
const middleware = [logger, sagaMiddleware]

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
}

const persistedReducers = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
})

sagaMiddleware.run(sagas)
const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export { persistor, store }
