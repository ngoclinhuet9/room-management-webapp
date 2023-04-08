import { combineReducers } from 'redux'
import token from './token'
import auth from './auth'
import error from './error'

export const reducers = combineReducers({ token, auth, error })

export type ReducersType = ReturnType<typeof reducers>
