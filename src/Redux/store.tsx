import { createStore, applyMiddleware, Store } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, Persistor } from 'redux-persist'
import logger from 'redux-logger'
import reducer from './reducer'
import thunk from 'redux-thunk';

const expireReducer = require('redux-persist-expire');

const persistedReducer = persistReducer({
    transforms : [
        expireReducer('posts', {
            expireSeconds : 10,
            expiredState : []
        })
    ],
    key: 'root', storage : AsyncStorage,
}, reducer)
// export const store: Store = createStore(persistedReducer, {}, applyMiddleware(logger, thunk))
export const store: Store = createStore(persistedReducer, {}, applyMiddleware( thunk))
export const persistor: Persistor = persistStore(store)